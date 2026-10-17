// Pure logic shared by the app and the dependency-free test suite.
export const VERSION = 1;
export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function parseRoute(hash) {
  const [path, query=''] = String(hash || '#/home').replace(/^#\/?/,'').split('?');
  const bits=path.split('/').map(x=>{try{return decodeURIComponent(x)}catch{return ''}});
  const allowed=['home','objective','lesson','glossary','slides','practice','notes','search','about','guide','developer'];
  const params=new URLSearchParams(query);
  return {view:allowed.includes(bits[0])?bits[0]:'not-found',id:bits[1]||'',page:bits[2]||'',q:params.get('q')||'',overlay:params.get('explain')||''};
}
export function routeHash(route) {
  const p=[route.view,route.id,route.page].filter(Boolean).map(encodeURIComponent).join('/');
  const q=new URLSearchParams();if(route.q)q.set('q',route.q);if(route.overlay)q.set('explain',route.overlay);
  return '#/'+p+(q.size?'?'+q:'');
}
export const routeKey = route => routeHash({...route,overlay:''});
export function blankState(){return {version:VERSION,theme:'light',readingMode:'full',sidebarCollapsed:false,fontSize:'normal',complete:[],answers:{},notes:{},bookmarks:[],lastLesson:null,contexts:{}};}
export function cleanState(value) {
  const base=blankState();if(!value||value.version!==VERSION)return base;
  const textMap=v=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).filter(([k,t])=>typeof t==='string'&&k.length<100).map(([k,t])=>[k,t.slice(0,20000)])):{};
  const cleanContext=c=>c&&typeof c==='object'&&typeof c.route?.view==='string'?{route:parseRoute(routeHash({view:c.route.view,id:typeof c.route.id==='string'?c.route.id:'',page:typeof c.route.page==='string'?c.route.page:'',q:typeof c.route.q==='string'?c.route.q:''})),scrollY:Number.isFinite(c.scrollY)?Math.max(0,c.scrollY):0,focusId:typeof c.focusId==='string'?c.focusId:'',openDetails:Array.isArray(c.openDetails)?c.openDetails.filter(x=>typeof x==='string'):[],savedAt:Number.isFinite(c.savedAt)?c.savedAt:0}:null;
  const contexts=value.contexts&&typeof value.contexts==='object'?Object.fromEntries(Object.entries(value.contexts).map(([k,v])=>[k,cleanContext(v)]).filter(([,v])=>v)):{};
  return {...base,sidebarCollapsed:value.sidebarCollapsed===true,readingMode:value.readingMode==='quick'?'quick':'full',theme:['light','dark','color'].includes(value.theme)?value.theme:'light',fontSize:value.fontSize==='large'?'large':'normal',complete:Array.isArray(value.complete)?[...new Set(value.complete.filter(x=>typeof x==='string'))]:[],bookmarks:Array.isArray(value.bookmarks)?value.bookmarks.filter(x=>typeof x==='string'):[],answers:value.answers&&typeof value.answers==='object'?Object.fromEntries(Object.entries(value.answers).filter(([k,v])=>Number.isInteger(v)&&v>=0&&v<4)):{},notes:textMap(value.notes),lastLesson:value.lastLesson?.route?.view==='lesson'?cleanContext(value.lastLesson):null,contexts};
}
export function createStorage(storage,key='meiosis-learning-v1') {
  let memory=blankState(),persistent=true;
  return {load(){try{const raw=storage?.getItem(key);memory=cleanState(raw?JSON.parse(raw):memory)}catch{persistent=false}return memory;},save(state){memory=cleanState(state);try{if(!storage)throw Error();storage.setItem(key,JSON.stringify(memory));return true}catch{persistent=false;return false}},get persistent(){return persistent},reset(){memory=blankState();try{storage?.removeItem(key)}catch{persistent=false}return memory}};
}
export function makeContext(route,scrollY,focusId='',openDetails=[]) {
  return {route:{...route,overlay:''},scrollY:Math.max(0,Number(scrollY)||0),focusId,openDetails:[...openDetails],savedAt:Date.now()};
}
export function toggleValue(list,value){return list.includes(value)?list.filter(x=>x!==value):[...list,value];}
export function progress(course,state,objectiveId) {
  const lessons=course.lessons.filter(l=>!objectiveId||l.objectiveId===objectiveId);
  const done=lessons.filter(l=>state.complete.includes(l.id)).length;
  return {done,total:lessons.length,percent:lessons.length?Math.round(done/lessons.length*100):0};
}
export function quizResult(questions,answers){let attempted=0,correct=0;for(const q of questions){if(Number.isInteger(answers[q.id])){attempted++;if(answers[q.id]===q.correct)correct++;}}return {attempted,correct,total:questions.length};}
export function termMarkup(text,terms){
  const aliases=terms.flatMap(t=>[t.term,...(t.aliases||[])].filter(a=>a.length>2).map(alias=>({alias,id:t.id}))).sort((a,b)=>b.alias.length-a.alias.length);
  if(!aliases.length)return escapeHTML(text);
  const map=new Map(aliases.map(a=>[a.alias.toLowerCase(),a.id]));
  const rx=new RegExp('(?<![\\p{L}\\p{N}_])('+[...new Set(aliases.map(a=>escapeRegExp(a.alias)))].join('|')+')(?![\\p{L}\\p{N}_])','giu');
  let result='',last=0;for(const m of String(text).matchAll(rx)){result+=escapeHTML(text.slice(last,m.index));result+=`<button class="term" data-term="${escapeHTML(map.get(m[0].toLowerCase()))}" aria-label="Explain ${escapeHTML(m[0])}">${escapeHTML(m[0])}</button>`;last=m.index+m[0].length;}return result+escapeHTML(text.slice(last));
}
export function searchContent(query,course,terms){
  const words=query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);if(!words.length)return {lessons:[],terms:[],objectives:[]};
  const has=text=>words.every(w=>text.toLocaleLowerCase().includes(w));
  return {lessons:course.lessons.filter(l=>has([l.title,...l.body,l.figure.description].join(' '))),terms:terms.filter(t=>has([t.term,...t.aliases,t.simple,t.how,t.memory].join(' '))),objectives:course.objectives.filter(o=>has(o.title+' '+o.goal))};
}
export function assertContent(course,terms,decks){
  const fail=[];const ids=new Set();for(const l of course.lessons){if(ids.has(l.id))fail.push('Duplicate lesson '+l.id);ids.add(l.id);if(!course.objectives.some(o=>o.id===l.objectiveId))fail.push('Missing objective '+l.id);if(!decks.some(d=>d.slides.some(s=>s.id===l.sourceId)))fail.push('Missing source '+l.id);}
  const tids=new Set(terms.map(t=>t.id));for(const t of terms){for(const r of t.related)if(!tids.has(r))fail.push('Unknown related term '+r);}
  for(const q of course.questions)if(q.options.length!==4||q.correct<0||q.correct>3||!ids.has(q.lessonId))fail.push('Invalid question '+q.id);
  if(fail.length)throw Error(fail.join('\n'));return true;
}
