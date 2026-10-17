"""Extract source text, tables, notes and images without changing the PPTX files.
Usage: python scripts/extract_sources.py /path/to/folder-with-both-pptx
Pillow is needed only to optimise image assets. The app itself has no dependencies.
"""
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import json, re, posixpath, shutil, io, sys
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
NS = {'a':'http://schemas.openxmlformats.org/drawingml/2006/main',
      'p':'http://schemas.openxmlformats.org/presentationml/2006/main',
      'r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
source = Path(sys.argv[1])
decks=[]
for index,path in enumerate(sorted(source.glob('*.pptx')),1):
    class_id=f'class{index}'
    shutil.copy2(path,ROOT/'sources'/f'{class_id}.pptx')
    with ZipFile(path) as z:
        slides=sorted([n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml',n)],key=lambda n:int(re.search(r'slide(\d+)',n).group(1)))
        deck={'id':class_id,'title':f'Class {index}','filename':path.name,'download':f'sources/{class_id}.pptx','slides':[]}
        for number,name in enumerate(slides,1):
            root=ET.fromstring(z.read(name))
            texts=[''.join(t.text or '' for t in p.findall('.//a:t',NS)) for p in root.findall('.//a:p',NS)]
            texts=[t for t in texts if t.strip()]
            rel_name=posixpath.join(posixpath.dirname(name),'_rels',posixpath.basename(name)+'.rels')
            rels={r.attrib['Id']:r.attrib for r in ET.fromstring(z.read(rel_name))}
            pictures=[]
            for k,pic in enumerate(root.findall('.//p:pic',NS),1):
                blip=pic.find('.//a:blip',NS)
                if blip is None:continue
                rel=rels.get(blip.attrib.get('{'+NS['r']+'}embed'))
                if not rel or rel.get('TargetMode')=='External':continue
                target=posixpath.normpath(posixpath.join(posixpath.dirname(name),rel['Target']))
                asset=f'assets/figures/{class_id}-{number:02}-{k}.webp'
                im=Image.open(io.BytesIO(z.read(target))).convert('RGB');im.thumbnail((2200,1600))
                dest=ROOT/asset;temp=dest.with_suffix('.tmp.webp')
                im.save(temp,'WEBP',quality=94,method=4)
                with Image.open(temp) as check: check.load()
                temp.replace(dest)
                desc=pic.find('.//p:cNvPr',NS)
                pictures.append({'path':asset,'alt':desc.attrib.get('descr','') if desc is not None else '', 'width':im.width,'height':im.height})
            tables=[]
            for table in root.findall('.//a:tbl',NS):
                tables.append([[''.join(t.text or '' for t in cell.findall('.//a:t',NS)) for cell in row.findall('a:tc',NS)] for row in table.findall('a:tr',NS)])
            notes=[]
            for rel in rels.values():
                if rel.get('Type','').endswith('/notesSlide'):
                    nt=posixpath.normpath(posixpath.join(posixpath.dirname(name),rel['Target']))
                    nr=ET.fromstring(z.read(nt))
                    for shape in nr.findall('.//p:sp',NS):
                        ph=shape.find('.//p:ph',NS)
                        if ph is not None and ph.attrib.get('type') in ('sldNum','hdr','ftr','dt'):continue
                        notes += [''.join(t.text or '' for t in p.findall('.//a:t',NS)) for p in shape.findall('.//a:p',NS)]
            deck['slides'].append({'id':f'{class_id}-s{number:02}','number':number,'title':texts[0] if texts else f'Slide {number}', 'text':texts,'pictures':pictures,'tables':tables,'notes':[n for n in notes if n.strip()],'preview':f'assets/slides/{class_id}-{number:02}.webp'})
        decks.append(deck)
(ROOT/'content/source-slides.json').write_text(json.dumps(decks,ensure_ascii=False,indent=2))
print(f'Extracted {sum(len(d["slides"]) for d in decks)} slides, {sum(len(s["pictures"]) for d in decks for s in d["slides"])} pictures')
