// Integration harness for the actual app module. This is a minimal DOM simulation,
// not a browser renderer. Device layout, native dialog behaviour and focus trapping
// still require the manual browser checklist in README.md.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const elements=new Map();
class Classes{constructor(){this.set=new Set()}add(...x){x.forEach(v=>this.set.add(v))}remove(...x){x.forEach(v=>this.set.delete(v))}contains(x){return this.set.has(x)}}
class Element{
 constructor(tag='div',attrs={}){this.tagName=tag.toUpperCase();this.attrs={...attrs};this.dataset={};for(const [k,v]of Object.entries(attrs))if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=v;this.classList=new Classes();this.handlers={};this.children=[];this.open=false;this.value='';this._html='';this.textContent='';if(attrs.id)this.id=attrs.id;}
 set id(v){this.attrs.id=v;elements.set(v,this)}get id(){return this.attrs.id||''}
 set innerHTML(html){this._html=html;this.children=[];const rx=/<(button|a|input|textarea|select|img|details|h1|p)\b([^>]*)>(?:([\s\S]*?)<\/\1>)?/g;for(const m of html.matchAll(rx)){const attrs={};for(const a of m[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g))attrs[a[1]]=a[2]??'';const el=m[1]==='details'?new Detail(m[1],attrs):new Element(m[1],attrs);el.textContent=(m[3]||'').replace(/<[^>]+>/g,'');el.parentElement=this;el.value=attrs.value||'';this.children.push(el);}}
 get innerHTML(){return this._html}
 querySelector(s){return this.querySelectorAll(s)[0]||null}
 querySelectorAll(s){return this.children.filter(el=>el.matches(s))}
 matches(s){if(s==='button,a')return ['BUTTON','A'].includes(this.tagName);if(s==='details[open][id]')return this instanceof Detail&&this.open&&this.id;if(s==='[data-term]:not([id])')return 'term'in this.dataset&&!this.id;if(s==='img'||s==='h1')return this.tagName===s.toUpperCase();if(s.startsWith('#'))return this.id===s.slice(1);const m=s.match(/^\[data-([^\]]+)\]$/);if(m)return m[1].replace(/-([a-z])/g,(_,c)=>c.toUpperCase())in this.dataset;if(s==='a[href^="#/"]')return this.tagName==='A'&&this.attrs.href?.startsWith('#/');return false;}
 closest(s){return this.matches(s)?this:null}
 setAttribute(k,v){this.attrs[k]=String(v)}getAttribute(k){return this.attrs[k]??null}
 addEventListener(type,fn){(this.handlers[type]??=[]).push(fn)}
 emit(type,event={}){for(const fn of this.handlers[type]||[])fn({target:this,preventDefault(){},...event})}
 focus(){document.activeElement=this}showModal(){this.open=true}close(){this.open=false}append(el){this.children.push(el)}click(){document.emit('click',{target:this})}
 getBoundingClientRect(){return {left:0,right:800,top:0,bottom:800}}
}
class Detail extends Element{}
const ids=['main','explainer','storage-warning','theme','text-size','desktop-nav','mobile-nav','side-progress','global-back','mobile-menu','close-explainer','close-x','explain-body','toast','search-form','global-search','menu-toggle','menu-close'];
ids.forEach(id=>new Element(id==='explainer'||id==='mobile-menu'?'dialog':id==='main'?'main':'div',{id}));
const documentStub=new Element();documentStub.documentElement={dataset:{}};documentStub.activeElement=elements.get('main');documentStub.querySelector=s=>s.startsWith('#')?elements.get(s.slice(1))||null:null;documentStub.getElementById=id=>elements.get(id)||null;documentStub.querySelectorAll=s=>[...elements.values()].filter(el=>el.matches(s));documentStub.createElement=tag=>new Element(tag);
globalThis.document=documentStub;globalThis.HTMLDetailsElement=Detail;
const memory=new Map(),events={};
globalThis.window={scrollY:0,localStorage:{getItem:k=>memory.get(k),setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)},addEventListener(t,fn){(events[t]??=[]).push(fn)},scrollTo(opts){this.scrollY=opts.top},emit(t){(events[t]||[]).forEach(fn=>fn())}};
globalThis.requestAnimationFrame=fn=>fn();globalThis.confirm=()=>true;
let url=new URL('http://localhost/#/home'),stack=[{url:url.href,state:null}],at=0;
globalThis.location={get hash(){return url.hash},reload(){}};
globalThis.history={scrollRestoration:'auto',get state(){return stack[at].state},pushState(state,_,hash){url=new URL(hash,url);stack=stack.slice(0,at+1);stack.push({url:url.href,state});at++;},replaceState(state,_,hash){url=new URL(hash,url);stack[at]={url:url.href,state}},back(){if(at){at--;url=new URL(stack[at].url);window.emit('popstate');}}};
globalThis.fetch=async relative=>{try{const str=await fs.readFile(new URL('../'+relative,import.meta.url),'utf8');return {ok:true,json:async()=>JSON.parse(str)}}catch{return {ok:false,status:404}}};
const tick=()=>new Promise(r=>setTimeout(r,15));
const action=(attrs,tag='button')=>new Element(tag,attrs).click();
const link=hash=>action({href:hash},'a');
test('actual app module boots and responds to navigation, overlays and learning interactions',async t=>{
 await import('../app.js');await tick();
 await t.test('home loads all eight objectives',()=>{assert.match(elements.get('main').innerHTML,/Your learning path/);assert.equal((elements.get('main').innerHTML.match(/class="objective-card"/g)||[]).length,8);});
 await t.test('objective navigation and lesson rendering use real content',()=>{link('#/objective/o1');assert.match(elements.get('main').innerHTML,/Genes and inheritance/);link('#/lesson/lesson-01');assert.match(elements.get('main').innerHTML,/Original slide wording/);assert.match(elements.get('main').innerHTML,/data-term="meiosis"/);});
 await t.test('term and related term retain the exact underlying lesson DOM and scroll',()=>{window.scrollY=641;const original=elements.get('main').innerHTML;action({'data-term':'meiosis',id:'test-trigger'});assert.equal(elements.get('explainer').open,true);assert.match(elements.get('explain-body').innerHTML,/Homologs first/);action({'data-term':'meiosis-i'});elements.get('close-explainer').emit('click');assert.equal(elements.get('explainer').open,false);assert.equal(elements.get('main').innerHTML,original);assert.equal(window.scrollY,641);});
 await t.test('diagram to term and back to diagram keeps the lesson intact',()=>{window.scrollY=422;action({'data-figure':'lesson-11'});assert.match(elements.get('explain-body').innerHTML,/EXPLORE THE LABELS/);action({'data-term':'chiasma'});assert.match(elements.get('explain-body').innerHTML,/Back to diagram/);action({'data-return-figure':'lesson-11'});assert.match(elements.get('explain-body').innerHTML,/Read the symbols carefully/);elements.get('close-x').emit('click');assert.equal(window.scrollY,422);});
 await t.test('completion and notes update saved state',()=>{action({'data-complete':'lesson-01'});let saved=JSON.parse(memory.get('meiosis-learning-v1'));assert(saved.complete.includes('lesson-01'));const note=new Element('textarea',{'data-note':'lesson-01'});note.value='One set per gamete';new Element('div',{id:'note-status-lesson-01'});document.emit('input',{target:note});saved=JSON.parse(memory.get('meiosis-learning-v1'));assert.equal(saved.notes['lesson-01'],'One set per gamete');});
 await t.test('original question answer triggers actual feedback and storage',()=>{link('#/practice/all');action({'data-answer':'q-1','data-choice':'0',id:'q-1-option-0'});assert.match(elements.get('main').innerHTML,/Correct\./);assert.equal(JSON.parse(memory.get('meiosis-learning-v1')).answers['q-1'],0);});
 await t.test('original slides and glossary return action restore the lesson',()=>{link('#/slides/class2/15');assert.match(elements.get('main').innerHTML,/class2-15.webp/);link('#/lesson/lesson-02');window.scrollY=387;link('#/glossary');assert.match(elements.get('main').innerHTML,/The simple glossary/);action({'data-last-lesson':''});assert.equal(location.hash,'#/lesson/lesson-02');assert.equal(window.scrollY,387);});
 await t.test('appearance and larger text controls persist preferences',()=>{const theme=elements.get('theme');theme.value='dark';theme.emit('change');assert.equal(document.documentElement.dataset.theme,'dark');elements.get('text-size').emit('click');assert.equal(document.documentElement.dataset.font,'large');});
 await t.test('Escape and browser Back close explanations without moving the lesson',()=>{window.scrollY=271;action({'data-term':'locus'});elements.get('explainer').emit('cancel');assert.equal(elements.get('explainer').open,false);assert.equal(window.scrollY,271);action({'data-term':'gene'});history.back();assert.equal(elements.get('explainer').open,false);assert.equal(window.scrollY,271);});
 await t.test('mobile navigation opens and closes its modal',()=>{elements.get('menu-toggle').emit('click');assert.equal(elements.get('mobile-menu').open,true);elements.get('menu-close').emit('click');assert.equal(elements.get('mobile-menu').open,false);});
 await t.test('quick revision preserves the complete lesson and existing saved work',()=>{link('#/lesson/lesson-01');action({'data-reading-mode':''});assert.match(elements.get('main').innerHTML,/Read the complete lesson/);assert.match(elements.get('main').innerHTML,/QUICK REVISION/);const saved=JSON.parse(memory.get('meiosis-learning-v1'));assert.equal(saved.readingMode,'quick');assert.equal(saved.notes['lesson-01'],'One set per gamete');assert.equal(saved.answers['q-1'],0);action({'data-reading-mode':''});assert.doesNotMatch(elements.get('main').innerHTML,/Read the complete lesson/);assert.match(elements.get('main').innerHTML,/Explain this diagram simply/);});
 await t.test('previous term returns through related explanations without leaving the lesson',()=>{window.scrollY=194;action({'data-term':'gene'});action({'data-term':'locus'});assert.match(elements.get('explain-body').innerHTML,/Previous term/);action({'data-previous-term':''});assert.match(elements.get('explain-body').innerHTML,/>Gene<\/h2>/i);elements.get('close-x').emit('click');assert.equal(window.scrollY,194);});
 await t.test('help and selected text lookup preserve return context',()=>{window.scrollY=213;action({'data-guide':''});assert.match(elements.get('explain-body').innerHTML,/A simple way to learn/);elements.get('close-x').emit('click');window.getSelection=()=> 'locus';action({'data-lookup':''});assert.match(elements.get('explain-body').innerHTML,/>Locus<\/h2>/i);elements.get('close-x').emit('click');assert.equal(window.scrollY,213);});

 await t.test('reference navigation exposes eight objectives and labels inferred goals',()=>{link('#/objective/o5');assert.match(elements.get('main').innerHTML,/Inferred learning objective/);assert.equal((elements.get('desktop-nav').innerHTML.match(/objective-side/g)||[]).length,8);assert.match(elements.get('main').innerHTML,/aria-label="Choose learning objective"/);});

});
