const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
  const file=path.resolve(root,pathname.replace(/^\/+/, '')||'index.html');
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  const stream=fs.createReadStream(file);
  stream.on('error',()=>{if(!res.headersSent)res.writeHead(404);res.end('Not found');});
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  stream.pipe(res);
}).listen(4173,'127.0.0.1',()=>console.log('Voca Sprint em http://127.0.0.1:4173/'));
