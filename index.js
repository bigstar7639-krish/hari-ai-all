const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req,res)=>res.send(`
<html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<title>HARI AI - All Features</title>
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
img{max-width:100%;border-radius:10px;margin-top:8px}
</style></head><body>
<div class="header"><h2>🤖 HARI AI - 9 FEATURES</h2><small>Chat | Search | Photo | Code | Write | Tamil | Math | Advice | Files</small></div>
<div class="quick">
<button onclick="ask('hi')">💬 Chat</button>
<button onclick="ask('search chennai weather')">🔍 Search</button>
<button onclick="ask('create photo chennai girl 4k')">🎨 Photo</button>
<button onclick="ask('code website for my shop')">💻 Code</button>
<button onclick="ask('write bill for 1000 rupees')">✍️ Write</button>
<button onclick="ask('translate vanakkam to english')">🌐 Tamil</button>
<button onclick="ask('calculate 1000 + 18% gst')">📊 Math</button>
<button onclick="ask('advice for my shop business')">💡 Advice</button>
<button onclick="ask('bill 500')">🧾 Bill</button>
</div>
<div class="chat" id="chat">
<div class="msg ai">🔥 HARI AI - ALL 9 FEATURES READY DA!

1. 💬 Chat - Ena vena pesu
2. 🔍 Search - Latest info
3. 🎨 Photo - Image create
4. 💻 Code - Website/app code
5. ✍️ Write - Essay/bill/mail
6. 🌐 Translate - Tamil/English
7. 📊 Math - Calculation/chart
8. 💡 Advice - Business/life
9. 📁 File - PDF/Excel

Type pannu da - Eg: "bill 500", "create photo chennai", "code my shop website"!
</div>
</div>
<div class="input"><input id="inp" placeholder="Ask anything... bill, photo, code, search..." onkeypress="if(event.key==='Enter')send()"><button class="send" onclick="send()">Send</button></div>
<script>
const chat=document.getElementById('chat'), inp=document.getElementById('inp');
function add(t,c){const d=document.createElement('div');d.className='msg '+c;d.textContent=t;chat.appendChild(d);chat.scrollTop=999999}
function ask(q){inp.value=q;send()}
async function send(){const q=inp.value.trim();if(!q)return;add(q,'user');inp.value='';add('Typing...','ai');const r=await fetch('/api?q='+encodeURIComponent(q)).then(x=>x.json());chat.lastChild.remove();add(r.reply,'ai')}
</script></body></html>
`));

app.get('/api', (req,res)=>{
  const orig = req.query.q||'';
  const q = orig.toLowerCase();
  let reply = '';

  if(q.startsWith('hi') || q=='hello'){
    reply = "Hi da Hari! 🙏 Naan ready! 9 features irukku - Enna venum sollu?";
  }
  else if(q.includes('search')){
    reply = "🔍 SEARCH RESULT for: "+orig.replace('search','')+"\\n\\nChennai la ippo trending ah irukku! Latest info: This is real-time search style answer. Full details venumna specific ah ketu da! (Real search ku Google API add pannalam)";
  }
  else if(q.includes('create photo') || q.startsWith('photo')){
    const prompt = orig.replace('create photo','').replace('photo','').trim()||'chennai girl';
    reply = "🎨 PHOTO PROMPT READY!\\n\\nPrompt: \\""+prompt+"\\"\\n\\nItha copy panni Leonardo.ai / Bing Image Creator la paste pannu - 4K photo varum!\\n\\nDirect link: https://www.bing.com/images/create?q="+encodeURIComponent(prompt);
  }
  else if(q.includes('code')){
    reply = "💻 CODE READY DA!\\n\\nFor: "+orig+"\\n\\n```html\\n<html><body><h1>Hari Shop</h1><p>Welcome to my shop!</p></body></html>\\n```\\n\\nItha copy panni index.html nu save pannu - Website ready! Full code venumna sollu da!";
  }
  else if(q.includes('write') || q.includes('bill') || q.includes('essay') || q.includes('mail')){
    if(q.includes('bill')){
      const amt = parseInt(orig.match(/\\d+/)?.[0])||1000;
      reply = "🧾 BILL WRITING:\\n\\nHARI STORE - CHENNAI\\nAmount: ₹"+amt+"\\nGST 18%: ₹"+Math.floor(amt*0.18)+"\\nTotal: ₹"+Math.floor(amt*1.18)+"\\nThanks da!";
    } else {
      reply = "✍️ WRITING DONE for: "+orig+"\\n\\nReady ah eluthi tharen da! Professional mail/essay/bill ready! Copy pannikalam.";
    }
  }
  else if(q.includes('translate')){
    reply = "🌐 TRANSLATE:\\n\\n'Vanakkam' = Hello\\n'Nandri' = Thank you\\n'Enna venum' = What do you want\\n\\nTamil to English, English to Tamil - Edhu vena ketu da!";
  }
  else if(q.includes('calculate') || q.includes('gst') || q.includes('+') || q.includes('%')){
    const amt = parseInt(orig.match(/\\d+/)?.[0])||1000;
    reply = "📊 MATH RESULT:\\n\\n"+orig+" = ₹"+Math.floor(amt*1.18)+" (with GST)\\n\\nCalculation correct da! Vera calculation venumna sollu!";
  }
  else if(q.includes('advice') || q.includes('business') || q.includes('idea')){
    reply = "💡 ADVICE FOR YOU:\\n\\nBusiness Idea: Chennai la shop ku -\\n1. Daily 10 customers target\\n2. Bill system use pannu\\n3. QR payment vechukko\\n4. Insta la promote pannu\\n\\nFull plan venumna sollu da!";
  }
  else if(q.includes('qr')){
    const txt = orig.split(' ').slice(1).join(' ')||'hari';
    reply = "📁 QR READY:\\n\\nhttps://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+encodeURIComponent(txt)+"\\n\\nItha open panni download pannu da!";
  }
  else {
    reply = "🤖 HARI AI:\\n\\nNee: "+orig+"\\n\\nIthu pathi full ah help pannuven da!\\n\\n9 features la edhu venum:\\n• Chat - pesalam\\n• Search - info\\n• Photo - image\\n• Code - website\\n• Write - bill/mail\\n• Tamil - translate\\n• Math - calc\\n• Advice - idea\\n• File - pdf\\n\\nSpecific ah ketu da!";
  }

  res.json({reply});
});

app.listen(process.env.PORT||3000, ()=>console.log('HARI AI ALL 9 LIVE'));
