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

const GUEST_GUIDES = [
 {"key":"parking","title":"Arrival & parking","sub":"Your first few minutes","icon":"◇","stage":"arrival","words":"driveway address directions gate arrival parking car vehicle","desc":"Driveway parking is available at the home. Your reservation is the place to check your arrival instructions before you travel.","items":["Ask your host to confirm the permitted number of vehicles and parking locations.","Get the directions, arrival instructions, and any access details through your reservation.","Running late? Use Contact your host below to prepare an arrival update."]},
 {"key":"wifi","title":"Connect to Wi-Fi","sub":"Online in a moment","icon":"⌁","stage":"stay","words":"wifi wi-fi internet password network","desc":"High-speed Wi-Fi is available in the home. Ask your host for the network name and password through your reservation.","items":["Select the network confirmed by your host in your device’s Wi-Fi settings.","Enter the password exactly as provided.","If you cannot connect, tell your host which device you are using and what error you see."]},
 {"key":"rules","title":"House rules","sub":"A happy home for everyone","icon":"♧","stage":"stay","words":"rules quiet pets smoking parties visitors trash garbage","desc":"Review the house rules attached to your reservation. Those are the confirmed terms for your stay.","items":["Check the rules for occupancy, visitors, quiet hours, pets, and smoking.","Review pool safety, trash, and recycling instructions.","If anything is unclear, ask your host before making plans. A concise on-site rules guide is coming soon."]},
 {"key":"toaster","title":"Toaster & kitchen","sub":"Where breakfast begins","icon":"♨","stage":"stay","words":"toaster coffee utensils kitchen pots pans","desc":"The home has an equipped kitchen. Exact storage locations and appliance photos are being prepared for this guide.","items":["Ask your host where the toaster or another kitchen item is stored.","Include the item name in your message so your host can point you to the right place.","Follow the instructions on the appliance before use."]},
 {"key":"stroller","title":"Stroller & baby gear","sub":"Plan for your little guests","icon":"♡","stage":"stay","words":"stroller baby gear crib cot high chair","desc":"Please confirm stroller and baby-equipment availability with your host before relying on it for your trip.","items":["Ask which items are available for your dates.","Request the storage location and setup instructions for any provided equipment.","Availability, photos, and model-specific instructions will be added once confirmed."]},
 {"key":"waffle","title":"Waffle maker","sub":"A sweeter start","icon":"✧","stage":"stay","words":"waffle maker kitchen breakfast appliance","desc":"Ask your host to confirm the waffle maker’s availability and location. A photo-led guide is coming once the appliance details are confirmed.","items":["Confirm the model and read its instructions before using it.","Ask your host for help if the controls are unfamiliar.","Let your host know if the appliance appears damaged or does not work."]},
 {"key":"pool","title":"Pool & heater","sub":"Your poolside guide","icon":"≈","stage":"stay","words":"pool heater heat hot tub spa temperature controls","desc":"Enjoy the private pool and hot tub. The listing describes pool and spa heat as included; your host can confirm the heating arrangements for your stay.","items":["Ask your host which pool and spa controls guests may use.","Follow the safety instructions provided with your reservation.","For a heating issue, describe what is happening and contact your host. Equipment and control instructions are being prepared."]},
 {"key":"washer","title":"Washer & dryer","sub":"Fresh clothes, easy days","icon":"◉","stage":"stay","words":"washing machine washer dryer laundry detergent","desc":"In-home laundry is available. Photos of the controls, detergent location, and model-specific steps will be added to this guide.","items":["Follow your clothing care labels and the appliance’s instructions.","Ask your host where laundry supplies are stored.","If a cycle stops or an error appears, note the error message and contact your host."]},
 {"key":"checkout","title":"Checkout checklist","sub":"An easy goodbye","icon":"☷","stage":"departure","words":"checkout check-out check out leaving departure towels dishes rubbish","desc":"Check your reservation for your confirmed checkout time and departure instructions.","items":["Follow your host’s directions for dishes, trash, and used linens.","Check that you have your belongings and follow the lock-up instructions.","Need extra time? Prepare a late-checkout request below. Your original checkout time applies until your host approves a change."]}
];

// Public guest guide: keep passwords, door codes, and reservation data out of this file.
(() => {
  const tabs = Array.from(document.querySelectorAll('[data-persona]'));
  const plan = document.getElementById('plan-view');
  const stay = document.getElementById('guest-view');
  function selectPersona(persona, writeHash = true) {
    const isGuest = persona === 'stay';
    plan.hidden = isGuest;
    stay.hidden = !isGuest;
    tabs.forEach(button => button.setAttribute('aria-selected', String(button.dataset.persona === persona)));
    if (writeHash) history.pushState(null, '', isGuest ? '#my-stay' : '#plan-your-stay');
    if (writeHash) window.scrollTo({top: 0, behavior: 'instant'});
  }
  tabs.forEach((button, index) => {
    button.addEventListener('click', () => selectPersona(button.dataset.persona));
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      selectPersona(tabs[next].dataset.persona);
    });
  });
  document.querySelectorAll('.brand').forEach(link => link.addEventListener('click', event => {event.preventDefault(); selectPersona('plan');}));
  window.addEventListener('hashchange', () => selectPersona(location.hash === '#my-stay' ? 'stay' : 'plan', false));
  window.addEventListener('popstate', () => selectPersona(location.hash === '#my-stay' ? 'stay' : 'plan', false));
  selectPersona(location.hash === '#my-stay' ? 'stay' : 'plan', false);

  const root = document.getElementById('sk-dual');
  const search = root.querySelector('#sk-search');
  const grid = root.querySelector('#sk-guide-grid');
  const detail = root.querySelector('#sk-guide-detail');
  let stage = 'all';
  function showGuide(guide) {
    root.querySelector('#sk-guide-title').textContent = guide.title;
    root.querySelector('#sk-guide-description').textContent = guide.desc;
    const list = root.querySelector('#sk-guide-list');
    list.replaceChildren();
    guide.items.forEach(text => {const item = document.createElement('li'); item.textContent = text; list.append(item);});
    detail.hidden = false;
    detail.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest'});
  }
  function renderGuides() {
    const query = search.value.trim().toLowerCase();
    const results = GUEST_GUIDES.filter(guide => (stage === 'all' || guide.stage === stage) && `${guide.title} ${guide.words}`.toLowerCase().includes(query));
    grid.replaceChildren();
    results.forEach(guide => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'sk-guide'; button.setAttribute('aria-controls', 'sk-guide-detail');
      const icon = document.createElement('span'); icon.className = 'guide-symbol'; icon.textContent = guide.icon; icon.setAttribute('aria-hidden', 'true');
      const text = document.createElement('span');
      const title = document.createElement('b'); title.textContent = guide.title;
      const sub = document.createElement('small'); sub.textContent = guide.sub;
      text.append(title, sub); button.append(icon, text);
      button.addEventListener('click', () => showGuide(guide)); grid.append(button);
    });
    if (!results.length) {const empty = document.createElement('p'); empty.className = 'sk-empty'; empty.textContent = 'No matches. Try another term or select All essentials. Your host can help with anything else.'; grid.append(empty);}
    root.querySelector('#sk-result-count').textContent = `${results.length} guide ${results.length === 1 ? 'topic' : 'topics'}`;
  }
  root.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => {
    stage = button.dataset.stage;
    root.querySelectorAll('[data-stage]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    detail.hidden = true; renderGuides();
  }));
  search.addEventListener('input', () => {detail.hidden = true; renderGuides();});
  root.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => {root.querySelector('#' + button.dataset.close).hidden = true;}));

  let feedback = false;
  const message = root.querySelector('#sk-request-message');
  const preview = root.querySelector('#sk-message-preview');
  const actions = root.querySelector('#sk-message-actions');
  const copyStatus = root.querySelector('#sk-copy-status');
  function clearDraft() {preview.hidden = true; actions.hidden = true; copyStatus.textContent = '';}
  root.querySelectorAll('[data-form]').forEach(button => button.addEventListener('click', () => {
    feedback = button.dataset.form === 'feedback';
    root.querySelector('#sk-request-title').textContent = feedback ? 'How is your stay going?' : 'Contact your host';
    root.querySelector('#sk-request-type-label').hidden = feedback;
    root.querySelector('#sk-time-label').hidden = feedback;
    root.querySelector('#sk-approval-note').textContent = feedback ? 'Share a compliment, suggestion, or something that needs attention.' : 'Early check-in and late checkout require host approval. Preparing a message does not change your reservation.';
    root.querySelector('#sk-request-time').value = ''; message.value = ''; clearDraft();
    const panel = root.querySelector('#sk-request-panel'); panel.hidden = false;
    panel.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest'});
  }));
  root.querySelector('#sk-request-form').addEventListener('input', clearDraft);
  root.querySelector('#sk-request-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!message.value.trim()) {message.setCustomValidity('Please add a short message for your host.'); message.reportValidity(); return;}
    message.setCustomValidity('');
    const types = {arrival: 'Arrival update: I’m arriving late', checkout: 'Request for late checkout', checkin: 'Request for early check-in', help: 'Help with something in the home'};
    const time = root.querySelector('#sk-request-time').value;
    const formattedTime = time ? new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: '2-digit', timeZone: 'UTC'}).format(new Date(`2000-01-01T${time}:00Z`)) : '';
    preview.textContent = `Hello!\n\n${feedback ? 'Feedback about my stay' : types[root.querySelector('#sk-request-type').value]}${time && !feedback ? `\nPreferred / expected time: ${formattedTime} (Florida time)` : ''}\n\n${message.value.trim()}\n\nThank you!`;
    preview.hidden = false; actions.hidden = false; copyStatus.textContent = 'Your message is ready. Copy it, open your Airbnb reservation, and send it to your host. Nothing has been sent yet.';
  });
  message.addEventListener('input', () => message.setCustomValidity(''));
  root.querySelector('#sk-copy-message').addEventListener('click', async () => {
    try {await navigator.clipboard.writeText(preview.textContent); copyStatus.textContent = 'Copied. Paste and send this message to your host through your Airbnb reservation.';}
    catch {copyStatus.textContent = 'Please select and copy the message above, then paste it into your Airbnb reservation chat.';}
  });
  renderGuides();
})();
