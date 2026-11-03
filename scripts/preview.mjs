import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.PORT)||4173;
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8','.md':'text/markdown; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer((request,response)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(request.url||'/',`http://127.0.0.1:${port}`).pathname);}catch{response.writeHead(400).end('Bad request');return;}
  const relative=pathname.replace(/^\/+/, '')||'index.html';
  let target=path.resolve(root,relative);
  if(target!==root&&!target.startsWith(root+path.sep)){response.writeHead(403).end('Forbidden');return;}
  try{
    if(fs.statSync(target).isDirectory())target=path.join(target,'index.html');
    const body=fs.readFileSync(target);
    response.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'}).end(body);
  }catch{response.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local preview: http://127.0.0.1:${port}`));
