(()=>{
const seq=document.querySelector('.sequence');if(!seq)return;
const stage=seq.querySelector('.sequence-stage'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,chapters=[...seq.querySelectorAll('[data-chapter]')];
let paused=reduce,queued=false;
const names={0:'00 — THE AWAKENING',2:'01 — THE EDGE',3:'02 — THE FRAME'};
function update(){queued=false;const r=seq.getBoundingClientRect(),range=seq.offsetHeight-innerHeight,p=range>0?Math.max(0,Math.min(1,-r.top/range)):0,ch=p<.34?0:p<.67?2:3;
stage.style.setProperty('--p',p);stage.dataset.scene=ch;
chapters.forEach(el=>{const current=Number(el.dataset.chapter)===ch;el.classList.toggle('current',current);el.inert=!current;el.setAttribute('aria-hidden',String(!current))});
stage.style.setProperty('--face-scale',1+p*2.5);stage.style.setProperty('--slash',Math.max(0,Math.min(1,(p-.34)/.16)));stage.style.setProperty('--fang-scale',.7+Math.max(0,p-.67)*1.5);
seq.querySelector('.seq-progress i').style.transform='scaleX('+p+')';document.querySelector('#chapter-name').textContent=names[ch];document.querySelector('#frame-count').textContent=String(Math.round(p*648)).padStart(4,'0');}
function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
addEventListener('resize',schedule);addEventListener('scroll',schedule,{passive:true});
const button=document.querySelector('#seq-motion');function setMotion(){stage.classList.toggle('seq-paused',paused);button.textContent=paused?'MOTION OFF ○':'MOTION ON ◉';button.setAttribute('aria-pressed',String(!paused))}button.addEventListener('click',()=>{paused=!paused;setMotion()});setMotion();update();
})();
