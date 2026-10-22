const products=[
  {
    "name": "Princess Celebration",
    "cat": "Tiered cakes",
    "image": "gravity-1.jpg",
    "desc": "A pink tiered cake decorated with princess toppers, butterflies and pastel spheres. Discuss your preferred colours, message, flavour and serving size."
  },
  {
    "name": "Rainbow Character Party",
    "cat": "Tiered cakes",
    "image": "gravity-4.jpg",
    "desc": "A three-tier celebration cake with colourful character toppers, rainbow details and a personalised name. Ask about custom themes and portion sizes."
  },
  {
    "name": "Purple & Gold Celebration",
    "cat": "Celebration cakes",
    "image": "gravity-5.jpg",
    "desc": "A white cake finished with a vivid purple drip, pink roses and gold accents. A photographed celebration design; confirm flavour and decoration options."
  },
  {
    "name": "Rainbow Garden Birthday",
    "cat": "Kids’ cakes",
    "image": "gravity-6.jpg",
    "desc": "A bright garden-themed birthday cake with a rainbow, character figures, flowers and a number topper. Share the birthday age and your design preferences."
  },
  {
    "name": "Pastel Unicorn Birthday",
    "cat": "Kids’ cakes",
    "image": "gravity-7.jpg",
    "desc": "A pastel-striped cake with a unicorn decoration, stars, clouds and a birthday topper. Enquire about personalising the name, colours, flavour and size."
  }
];
const nav=document.querySelector('#navigation');const toggle=document.querySelector('.menu-toggle');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation')}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
const cards=[...document.querySelectorAll('#catalog .cake-card')];document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});let count=0;cards.forEach(card=>{card.hidden=button.dataset.filter!=='All'&&card.dataset.category!==button.dataset.filter;if(!card.hidden){count++;card.classList.add('visible')}});document.querySelector('#result-count').textContent=count+' cake design'+(count===1?'':'s')}));
const params=new URLSearchParams(location.search);const param=params.get('cake');const index=param!==null&&/^\d+$/.test(param)?Number(param):-1;
const dialog=document.querySelector('#cake-dialog');let lastTrigger=null;
function showCake(i,trigger){const p=products[i];if(!p||!dialog)return;lastTrigger=trigger||null;const image=document.createElement('img');image.src='assets/'+p.image;image.alt=p.name+' photographed by Gravity Cakes';image.width=381;image.height=677;document.querySelector('#dialog-image').replaceChildren(image);document.querySelector('#dialog-title').textContent=p.name;document.querySelector('#dialog-category').textContent=p.cat;document.querySelector('#dialog-description').textContent=p.desc;document.querySelector('#dialog-enquire').href='contact.html?cake='+i+'#enquiry';dialog.showModal();document.body.classList.add('dialog-open')}
if(dialog){document.querySelectorAll('#catalog a[href^="cakes.html?cake="]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showCake(Number(new URL(a.href).searchParams.get('cake')),a)}));dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(lastTrigger)lastTrigger.focus()});if(products[index])showCake(index)}
const form=document.querySelector('#inquiry');if(form){const date=form.querySelector('[name="date"]');const now=new Date();const today=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');date.min=today;if(products[index])form.querySelector('[name="cake"]').value=products[index].name;form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const message=['Hello Gravity Bakery! I would like to enquire about a cake.','', 'Name: '+data.get('name'),'Phone: '+data.get('phone'),'Occasion: '+data.get('occasion'),'Date: '+data.get('date'),'Design: '+data.get('cake'),'Guests: '+(data.get('guests')||'Please advise'),'Details: '+(data.get('details')||'Please help me choose.'),'','Please confirm flavour options, ingredients, price, availability and collection or delivery details.'].join('\n');const url='https://wa.me/919677262032?text='+encodeURIComponent(message);const status=document.querySelector('#form-status');status.hidden=false;const messageText=document.createElement('div');messageText.textContent='Your enquiry is ready. Continue to WhatsApp, review the message and tap Send to contact the bakery.';const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Review & send in WhatsApp ↗';status.replaceChildren(messageText,link);link.focus();status.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});});}

// Open full original photos without leaving the visitor's place on the page.
const previewImages=[...document.querySelectorAll('.editorial-photo > img')];
if(previewImages.length){
 const viewer=document.createElement('dialog');viewer.id='photo-viewer';viewer.setAttribute('aria-label','Bakery photograph preview');
 const closer=document.createElement('button');closer.className='dialog-close';closer.type='button';closer.setAttribute('aria-label','Close photo preview');closer.textContent='×';
 const figure=document.createElement('figure');const fullImage=document.createElement('img');const caption=document.createElement('figcaption');figure.append(fullImage,caption);viewer.append(closer,figure);document.body.append(viewer);let photoOpener=null;
 previewImages.forEach(image=>{const button=document.createElement('button');button.type='button';button.className='photo-preview';button.setAttribute('aria-label','View full photo: '+image.alt);button.setAttribute('aria-haspopup','dialog');image.replaceWith(button);button.append(image);button.addEventListener('click',()=>{photoOpener=button;fullImage.src=image.currentSrc||image.src;fullImage.alt=image.alt;caption.textContent=image.alt+' · Photo: Gravity Cakes';viewer.showModal();document.body.classList.add('dialog-open')})});
 closer.addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()}});viewer.addEventListener('close',()=>{document.body.classList.remove('dialog-open');photoOpener?.focus()});
}
document.querySelectorAll('.cake-photo,.photo-preview').forEach(photo=>{let releaseTimer;const release=()=>{clearTimeout(releaseTimer);photo.classList.remove('photo-pressed')};photo.addEventListener('pointerdown',()=>{photo.classList.add('photo-pressed');releaseTimer=setTimeout(release,450)});['pointerup','pointercancel','pointerleave','blur'].forEach(event=>photo.addEventListener(event,release))});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{cards.forEach(card=>card.classList.remove('filter-enter'));requestAnimationFrame(()=>cards.filter(card=>!card.hidden).forEach(card=>card.classList.add('filter-enter')))}));

// A single click gives the hero cake a gentle rise and settle.
const heroImage=document.querySelector('.hero-photo > img');
if(heroImage){const button=document.createElement('button');button.className='hero-cake-button';button.type='button';button.setAttribute('aria-label','Animate the celebration cake');heroImage.replaceWith(button);button.append(heroImage);button.addEventListener('click',()=>{const frame=button.closest('.hero-photo');frame.getAnimations().forEach(a=>a.cancel());if(!matchMedia('(prefers-reduced-motion: reduce)').matches){frame.animate([{transform:'translateY(0)'},{transform:'translateY(-18px)',offset:.35},{transform:'translateY(5px)',offset:.72},{transform:'translateY(0)'}],{duration:1050,easing:'cubic-bezier(.22,.61,.36,1)'});}else{frame.animate([{boxShadow:'0 0 0 0 #a782b940'},{boxShadow:'0 0 0 5px #a782b940'}],{duration:180})}});}
const marquee=document.querySelector('.occasion-strip');const marqueeToggle=document.querySelector('.marquee-toggle');if(marqueeToggle){marqueeToggle.addEventListener('click',()=>{const paused=marquee.classList.toggle('is-paused');marqueeToggle.setAttribute('aria-pressed',String(paused));marqueeToggle.setAttribute('aria-label',paused?'Play occasions animation':'Pause occasions animation');marqueeToggle.textContent=paused?'▷':'Ⅱ'});}
