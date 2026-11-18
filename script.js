const track = document.getElementById('track');
const cards = [...track.querySelectorAll('.card')];
const dots  = document.getElementById('dots');

cards.forEach(() => dots.appendChild(document.createElement('i')));
const dotEls = [...dots.children];

function current(){
  const mid = track.scrollLeft + track.clientWidth / 2;
  let best = 0, dist = Infinity;
  cards.forEach((c,i) => {
    const d = Math.abs(c.offsetLeft + c.offsetWidth/2 - mid);
    if (d < dist){ dist = d; best = i; }
  });
  return best;
}
function paint(){ const i = current(); dotEls.forEach((d,k)=>d.classList.toggle('on',k===i)); }
function go(i){
  i = Math.max(0, Math.min(cards.length-1, i));
  const c = cards[i];
  track.scrollTo({left: c.offsetLeft - (track.clientWidth - c.offsetWidth)/2, behavior:'smooth'});
}
track.addEventListener('scroll', () => requestAnimationFrame(paint), {passive:true});
document.querySelector('.arrow.prev').onclick = () => go(current()-1);
document.querySelector('.arrow.next').onclick = () => go(current()+1);
window.addEventListener('load', () => { go(0); paint(); });
