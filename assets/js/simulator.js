const capital=document.getElementById('capital');
const rate=document.getElementById('rate');
const days=document.getElementById('days');
const rateValue=document.getElementById('rateValue');
const outDaily=document.getElementById('outDaily');
const outTotal=document.getElementById('outTotal');
const outCap=document.getElementById('outCap');
const outDays=document.getElementById('outDays');
const bar=document.getElementById('capBar');
const warn=document.getElementById('capWarn');
const fmt=n=>Number(n).toLocaleString('en-US',{minimumFractionDigits:4,maximumFractionDigits:4});
function getLang(){return localStorage.getItem('vme-lang')||document.documentElement.lang||'ms'}
function calc(){
  if(!capital||!rate||!days)return;
  let c=Math.max(1,Number(capital.value)||1);
  let r=Math.min(.9,Math.max(.6,Number(rate.value)||.75));
  let d=Math.min(540,Math.max(1,Number(days.value)||1));
  capital.value=c;rate.value=r;days.value=d;rateValue.textContent=r.toFixed(2)+'%';
  const daily=c*(r/100),cap=c*2.5,proj=daily*d,total=Math.min(proj,cap),toCap=Math.ceil(cap/daily),pct=Math.min(100,(total/cap)*100);
  outDaily.textContent=fmt(daily)+' USDT';
  outTotal.textContent=fmt(total)+' USDT';
  outCap.textContent=fmt(cap)+' USDT';
  outDays.textContent=toCap+' '+(getLang()==='en'?'days':'hari');
  bar.style.width=pct+'%';
  warn.classList.toggle('show',d>toCap);
}
[capital,rate,days].forEach(i=>i&&i.addEventListener('input',calc));
document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.preset;if(v==='cap'){let c=Number(capital.value)||1, r=Number(rate.value)||.75;days.value=Math.ceil((c*2.5)/(c*(r/100)))}else days.value=v;calc()}));
window.addEventListener('vme:lang',calc);
calc();
