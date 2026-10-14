"use strict";
// Restore Elementor's original background photo slideshows without its server plugins.
document.querySelectorAll('[data-settings]').forEach(section=>{
 let settings;try{settings=JSON.parse(section.getAttribute('data-settings'));}catch{return;}
 const photos=settings.background_slideshow_gallery;
 if(settings.background_background!=='slideshow'||!Array.isArray(photos)||!photos.length)return;
 const layer=document.createElement('div');layer.setAttribute('aria-hidden','true');layer.style.cssText='position:absolute;inset:0;z-index:0;background-size:cover;background-position:center;pointer-events:none;';section.style.position='relative';section.prepend(layer);
 const overlay=section.querySelector(':scope > .elementor-background-overlay');if(overlay)overlay.style.zIndex='1';
 section.querySelectorAll(':scope > .elementor-container,:scope > .e-con-inner').forEach(content=>{content.style.position='relative';content.style.zIndex='2';});
 let index=0;const show=()=>{layer.style.backgroundImage=`url("${photos[index].url}")`;};show();
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(()=>{if(document.hidden)return;index=(index+1)%photos.length;show();},Number(settings.background_slideshow_slide_duration)||5000);
});
document.querySelectorAll('[data-archive-form]').forEach(form=>form.addEventListener('submit',event=>event.preventDefault()));
const archiveMenu=document.querySelector('.archive-fallback-menu');
const archivePopup=document.querySelector('.elementor-location-popup');
if(archivePopup){const close=document.createElement('button');close.type='button';close.className='archive-menu-close';close.textContent='Close';archivePopup.prepend(close);close.addEventListener('click',()=>archivePopup.classList.remove('archive-popup-open'));document.addEventListener('keydown',event=>{if(event.key==='Escape')archivePopup.classList.remove('archive-popup-open');});}
document.querySelectorAll('a[href*="#elementor-action"]').forEach(button=>{button.setAttribute('aria-label','Open archived site navigation');button.addEventListener('click',event=>{event.preventDefault();const menu=archivePopup||archiveMenu;const open=menu.classList.toggle(archivePopup?'archive-popup-open':'is-open');button.setAttribute('aria-expanded',String(open));if(open&&archivePopup)archivePopup.querySelector('button').focus();});});
document.querySelectorAll('.elementor-tab-title').forEach(title=>{
 title.setAttribute('role','button');title.setAttribute('tabindex','0');
 function toggle(){const content=title.nextElementSibling;if(!content||!content.classList.contains('elementor-tab-content'))return;const open=title.getAttribute('aria-expanded')!=='true';title.setAttribute('aria-expanded',String(open));title.classList.toggle('elementor-active',open);content.classList.toggle('elementor-active',open);content.style.display=open?'block':'none';}
 title.addEventListener('click',toggle);title.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}});
});
document.querySelectorAll('a[data-elementor-open-lightbox="yes"]').forEach(link=>link.addEventListener('click',event=>{
 const src=link.getAttribute('href');if(!src||!(/\.(?:jpe?g|png|webp|gif)(?:\?|$)/i.test(src)))return;event.preventDefault();
 const dialog=document.createElement('dialog');dialog.className='archive-gallery-dialog';const close=document.createElement('button');close.type='button';close.textContent='Close';const img=document.createElement('img');img.src=src;img.alt=link.querySelector('img')?.alt||'Property photo';dialog.append(close,img);document.body.append(dialog);close.addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>dialog.remove());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.showModal();
}));
