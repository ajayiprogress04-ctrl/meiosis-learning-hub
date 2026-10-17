import './validate.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
if(process.exitCode)process.exit(process.exitCode);
const out=path.join(root,'dist');
await fs.rm(out,{recursive:true,force:true});await fs.mkdir(out,{recursive:true});
for(const name of ['index.html','app.js','core.mjs','styles.css','reference-design.css','assets','content','sources'])await fs.cp(path.join(root,name),path.join(out,name),{recursive:true});
console.log('Static deployment files created in dist/. No dependencies or API keys required.');

// Vercel provides the stable production host even for preview builds.
const publicHost=process.env.SITE_URL||process.env.VERCEL_PROJECT_PRODUCTION_URL;
if(publicHost){
 const url=new URL(publicHost.startsWith('http')?publicHost:'https://'+publicHost);
 if(url.protocol!=='https:'&&url.hostname!=='localhost')throw Error('SITE_URL must use HTTPS.');
 const origin=url.origin;const index=path.join(out,'index.html');let html=await fs.readFile(index,'utf8');
 html=html.replaceAll('content="/assets/share-logo.png"','content="'+origin+'/assets/share-logo.png"');
 html=html.replace('</head>','<link rel="canonical" href="'+origin+'/"><meta property="og:url" content="'+origin+'/"></head>');
 await fs.writeFile(index,html);
 await fs.writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\n');
 console.log('Sharing metadata configured for the production domain.');
}else console.log('Set SITE_URL to your public production URL if Vercel does not provide VERCEL_PROJECT_PRODUCTION_URL.');
