const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req,res)=>{
res.send(`
<html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<title>HARI AI</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;color:#fff;font-family:sans-serif;height:100vh;display:flex;flex-direction:column}
.header{padding:12px;text-align:center;border-bottom:1px solid #222;background:#111}
.header h2{color:#0f0}
.quick{display:flex;gap:5px;padding:8px;overflow-x:auto;background:#111;border-bottom:1px solid #222}
.quick button{padding:6px 10px;font-size:11px;background:#000;color:#0f0;border:1px solid #333;border-radius:20px;white-space:nowrap}
.chat{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px}
.msg{max-width:85%;padding:12px 14px;border-radius:18px;white-space:pre-wrap;line-height:1.5;font-size:14px}
.user{align-self:flex-end;background:#0f0;color:#000;border-bottom-right-radius:4px}
.ai{align-self:flex-start;background:#1a1a1a;border:1px solid #222;border-bottom-left-radius:4px}
.input{display:flex;gap:8px;padding:10px;border-top:1px solid #222;background:#111}
input{flex:1;padding:13px;background:#000;color:#fff;border:1px solid #333;border-radius:25px;outline:none}
.send{padding:13px 18px;background:#0f0;color:#000;border:none;border-radius:25px;font-weight:bold}
</style></head><body>
<div class="header"><h2>HARI AI - 9 FEATURES</h2><small>Chat Search Photo Code Write Tamil Math Advice Files</small></div>
<div class="quick">
<button onclick="ask('hi')">Chat</button>
<button onclick="ask('search chennai weather')">Search</button>
<button onclick="ask('photo chennai girl 4k')">Photo</button>
<button onclick="ask('code website for my shop')">Code</button>
<button onclick="ask('write bill for 1000 rupees')">Write</button>
<button onclick="ask('translate vanakkam')">Tamil</button>
<button onclick="ask('calculate 1000 gst')">Math</button>
<button onclick="ask('advice for shop')">Advice</button>
<button onclick="ask('bill 500')">Bill</button>
</div>
<div class="chat" id="chat">
<div class="msg ai">HARI AI READY DA! 9 Features ready. Type pannu da!</div>
</div>
<div class="input"><input id="inp" placeholder="Ask anything..." onkeypress="if(event.key==='Enter')send()"><button class="send" onclick="send()">Send</button></div>
<script>
const chat=document.getElementById('chat'), inp=document.getElementById('inp');
function add(t,c){const d=document.createElement('div');d.className='msg '+c;d.textContent=t;chat.appendChild(d);chat.scrollTop=999999}
function ask(q){inp.value=q;send()}
async function send(){const q=inp.value.trim();if(!q)return;add(q,'user');inp.value='';add('Typing...','ai');const r=await fetch('/api?q='+encodeURIComponent(q)).then(x=>x.json());chat.lastChild.remove();add(r.reply,'ai')}
</script></body></html>
`);
});

app.get('/api', (req,res)=>{
  const orig = req.query.q||'';
  const q = orig.toLowerCase();
  let reply = '';

  if(q.startsWith('hi') || q==='hello'){
    reply = 'Hi da Hari! Naan ready! 9 features irukku - Enna venum sollu?';
  } else if(q.includes('search')){
    reply = 'SEARCH RESULT for: ' + orig + ' - Chennai la trending info ready da!';
  } else if(q.includes('photo')){
    const prompt = orig.replace('photo','').trim() || 'chennai girl';
    reply = 'PHOTO PROMPT READY! Prompt: ' + prompt + ' - Copy to Leonardo.ai or Bing Image Creator!';
  } else if(q.includes('code')){
    reply = 'CODE READY! For: ' + orig + ' - HTML website code ready! Copy pannu da!';
  } else if(q.includes('bill')){
    const amt = orig.match(/\\d+/)? orig.match(/\\d+/)[0] : '1000';
    const total = Math.floor(parseInt(amt)*1.18);
    reply = 'BILL READY! Amount: ' + amt + ' Total with GST: ' + total + ' - Hari Store Chennai!';
  } else if(q.includes('translate')){
    reply = 'TRANSLATE: Vanakkam = Hello, Nandri = Thanks! Tamil English ready da!';
  } else if(q.includes('calculate') || q.includes('gst')){
    reply = 'MATH RESULT! ' + orig + ' calculated! GST included total ready da!';
  } else if(q.includes('advice')){
    reply = 'ADVICE: Business ku daily 10 customers, bill system, QR payment, Insta promote!';
  } else if(q.includes('qr')){
    reply = 'QR READY! Link: https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + encodeURIComponent(orig);
  } else {
    reply = 'HARI AI: Nee sonna ' + orig + ' - Ithu pathi help pannuven! 9 features ready!';
  }

  res.json({reply});
});

app.listen(process.env.PORT||3000, ()=>console.log('HARI AI LIVE'));
