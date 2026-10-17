import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {assertContent} from '../core.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=async name=>JSON.parse(await fs.readFile(path.join(root,'content',name),'utf8'));
const [course,terms,decks]=await Promise.all(['course.json','glossary.json','source-slides.json'].map(read));
assertContent(course,terms,decks);
const errors=[];const expected=decks.flatMap(d=>d.slides);
if(decks.length!==2||expected.length!==30||course.lessons.length!==16||course.questions.length!==10)errors.push('The supplied course must retain 2 decks, 30 slides, 16 teaching lessons and 10 questions.');
if(new Set(terms.map(t=>t.id)).size!==terms.length)errors.push('Duplicate glossary IDs.');
for(const s of expected){if(!s.text.length)errors.push('Empty source '+s.id);for(const p of [s.preview,...s.pictures.map(p=>p.path)])try{const bytes=await fs.readFile(path.join(root,p));if(bytes.length<100||bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP')errors.push('Invalid WebP image '+p);}catch{errors.push('Missing image '+p);}}
for(const d of decks)try{await fs.access(path.join(root,d.download));}catch{errors.push('Missing source deck '+d.id);}
for(const l of course.lessons){const source=expected.find(s=>s.id===l.sourceId);if(JSON.stringify(l.sourceText)!==JSON.stringify(source.text))errors.push('Source wording mismatch '+l.id);for(const t of l.figure.terms)if(!terms.some(x=>x.id===t))errors.push('Missing diagram term '+t);}
for(const q of course.questions){const s=expected.find(s=>s.id===q.sourceId);if(q.prompt!==s.text[1]||JSON.stringify(q.options)!==JSON.stringify(s.text.slice(2)))errors.push('Question wording mismatch '+q.id);}
const represented=new Set([...course.lessons.map(l=>l.sourceId),...course.questions.map(q=>q.sourceId)]);if(represented.size!==26)errors.push('Teaching/question coverage mismatch.');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Content verified: ${decks.length} decks, ${expected.length} source slides, ${course.objectives.length} objectives, ${course.lessons.length} lessons, ${course.questions.length} questions, ${terms.length} glossary terms. All local content assets are present.`);
