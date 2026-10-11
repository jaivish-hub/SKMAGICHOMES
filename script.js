'use strict';
// Add a reservation URL here when ready (Airbnb, Vrbo, or your booking website).
const BOOKING_URL = 'https://www.airbnb.com/rooms/689805654769199319';
const field = document.getElementById('sparkles');
for (let i = 0; i < 38; i++) {
  const star = document.createElement('span');
  star.className = 'spark';
  star.textContent = i % 3 === 0 ? '✧' : '✦';
  star.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--size:${8+Math.random()*16}px;--duration:${3+Math.random()*5}s;--delay:${-Math.random()*8}s`;
  field.appendChild(star);
}
const toggle = document.querySelector('.sparkle-toggle');
let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateSparkles() {
  document.body.classList.toggle('no-sparkles', paused);
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.setAttribute('aria-label', paused ? 'Turn sparkle animations on' : 'Pause sparkle animations');
  toggle.querySelector('span').textContent = paused ? 'Sparkles off' : 'Sparkles on';
}
toggle.addEventListener('click', () => { paused = !paused; updateSparkles(); });
updateSparkles();
document.getElementById('year').textContent = new Date().getFullYear();
if (BOOKING_URL && /^https:\/\//.test(BOOKING_URL)) {
  const link = document.getElementById('booking-link');
  link.href = BOOKING_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.getElementById('booking-note').textContent = 'Explore availability and reservation details on our booking page.';
}
