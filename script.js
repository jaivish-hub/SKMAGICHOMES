"use strict";
const BOOKING_URL = 'https://www.airbnb.com/rooms/689805654769199319';
const field = document.getElementById('sparkles');
const toggle = document.querySelector('.sparkle-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
let showerTimer;
let openingTimers = [];
function clearShower() {
  clearTimeout(showerTimer);
  openingTimers.forEach(clearTimeout);
  openingTimers = [];
  field.replaceChildren();
}
function dropStar(opening = false) {
  if (paused || document.hidden) return;
  const star = document.createElement('span');
  star.className = 'spark';
  star.textContent = Math.random() > .65 ? '✧' : '✦';
  // Quiet showers stay near the edges, away from the reading area.
  const x = opening ? 3 + Math.random() * 94 : (Math.random() > .5 ? 88 + Math.random() * 10 : 2 + Math.random() * 10);
  const duration = opening ? 4.5 + Math.random() * 1.5 : 6 + Math.random() * 2;
  star.style.cssText = `left:${x}%;--size:${opening ? 8 + Math.random()*7 : 7 + Math.random()*3}px;--duration:${duration}s;--opacity:${opening ? .42 : .22};--drift:${Math.random()*40-20}px;--fall:${Math.min(window.innerHeight*.7,520)}px`;
  field.appendChild(star);
  star.addEventListener('animationend', () => star.remove(), {once:true});
}
function scheduleQuietShower() {
  if (paused || document.hidden) return;
  showerTimer = setTimeout(() => {dropStar();scheduleQuietShower();}, 5500 + Math.random()*4000);
}
function startShower(opening = false) {
  clearShower();
  if (paused || document.hidden) return;
  if (opening) {
    for(let i=0;i<22;i++) openingTimers.push(setTimeout(()=>dropStar(true),i*90));
    showerTimer=setTimeout(scheduleQuietShower,8000);
  } else scheduleQuietShower();
}
function updateToggle() {
  toggle.setAttribute('aria-pressed',String(paused));
  toggle.setAttribute('aria-label',paused ? 'Turn gentle sparkle shower on' : 'Pause gentle sparkle shower');
  toggle.querySelector('span').textContent=paused ? 'Magic off' : 'Magic on';
}
toggle.addEventListener('click',()=>{paused=!paused;updateToggle();startShower();});
reducedMotion.addEventListener('change',event=>{paused=event.matches;updateToggle();startShower();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearShower();else startShower();});
let firstOpen=true;
try{firstOpen=sessionStorage.getItem('sk-magic-welcomed')!=='yes';sessionStorage.setItem('sk-magic-welcomed','yes');}catch{}
updateToggle();startShower(firstOpen);
document.getElementById('year').textContent = new Date().getFullYear();
if (BOOKING_URL && /^https:\/\//.test(BOOKING_URL)) {
 const link=document.getElementById('booking-link');link.href=BOOKING_URL;link.target='_blank';link.rel='noopener noreferrer';
 document.getElementById('booking-note').textContent='Explore availability and reservation details on our booking page.';
}
