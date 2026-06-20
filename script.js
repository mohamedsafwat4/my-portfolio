/* ═══════════════════════════════════════════════════════
   SCRIPT.JS — Mohamed El-Menshawy Portfolio v4
   6 Projects · Custom Cursor · Tilt · Starfield · All
═══════════════════════════════════════════════════════ */

/* ── PROJECT DATA (6 projects — T-Lab, Salah, Ahmed removed) ── */
const PROJECTS = [
  {
    id:1, title:"GTA Barber Promo", client:"Barbershop",
    category:"Commercial Ad", filter:"commercial",
    desc:"A viral GTA-inspired promo that made the salon impossible to ignore on social media.",
    goal:"Drive brand awareness and foot traffic through entertainment-first content that stands out in a crowded feed.",
    role:"Video Editor & Motion Designer",
    approach:"GTA-style kinetic text, sound design callbacks, and dynamic cuts timed to musical beats — built to capture attention in the first 2 seconds and retain it through humour and visual surprise.",
    outcome:"Significant increase in social media reach, brand identity modernisation, and increased bookings driven by virality.",
    software:["Premiere Pro","After Effects"],
    tags:["Motion Design","Commercial","Viral"],
    video:"videos/vid1.mp4", thumb:"pics/thumb1.jpg"
  },
  {
    id:2, title:"Dental Awareness Film", client:"Dental Clinic",
    category:"Healthcare", filter:"healthcare",
    desc:"Simplifying the science of tooth loss to build patient trust and drive consultations.",
    goal:"Increase clinic credibility and build trust by delivering clear, accessible information about the consequences of tooth loss.",
    role:"Video Editor & Information Designer",
    approach:"Translated complex medical information into a simple visual narrative. Motion graphics explained concepts without jargon, keeping pacing educational yet engaging.",
    outcome:"Improved audience understanding, elevated clinic authority, and measurably higher consultation bookings.",
    software:["Premiere Pro","After Effects"],
    tags:["Healthcare","Motion Graphics","Education"],
    video:"videos/vid2.mp4", thumb:"pics/thumb2.jpg"
  },
  {
    id:3, title:"Bug-Out App Campaign", client:"Tech Startup",
    category:"App Marketing", filter:"commercial",
    desc:"A clear, compelling case for downloading an insect management app.",
    goal:"Increase app awareness and highlight the value proposition for users dealing with insect problems.",
    role:"Video Editor & Visual Storyteller",
    approach:"Simplified a complex technical service into a relatable human problem with a clear solution — features presented visually without overwhelming the viewer.",
    outcome:"Boosted user confidence, increased download intent, and improved platform discoverability.",
    software:["Premiere Pro","After Effects"],
    tags:["App Marketing","Short-Form","Storytelling"],
    video:"videos/vid3.mp4", thumb:"pics/thumb3.jpg"
  },
  {
    id:4, title:"ProMed Clinic Showcase", client:"ProMed Clinic",
    category:"Healthcare", filter:"healthcare",
    desc:"Showcasing the clinic's advanced medical capabilities with cinematic precision.",
    goal:"Position the clinic as a premium medical destination — highlighting the space, doctor expertise, and modern equipment.",
    role:"Video Editor & Brand Storyteller",
    approach:"Slow, deliberate pacing and cinematic framing to give the clinic a premium feel. Highlighted doctor credentials through visual storytelling rather than text.",
    outcome:"Enhanced brand appeal, stronger trust signals, and measurably higher inquiry and booking rates.",
    software:["Premiere Pro","After Effects"],
    tags:["Healthcare","Brand Film","Cinematic"],
    video:"videos/vid4.mp4", thumb:"pics/thumb4.jpg"
  },
  {
    id:5, title:"Barber Brand Film", client:"Barbershop",
    category:"Commercial Ad", filter:"commercial",
    desc:"A professional brand film that reflects the quality and craft of every cut.",
    goal:"Establish the barbershop as a professional, high-quality destination through polished visual storytelling.",
    role:"Video Editor & Brand Videographer",
    approach:"Warm, professional cinematography that showcases the atmosphere, services, and client experience. Every edit communicates craftsmanship and attention to detail.",
    outcome:"Stronger first impressions, increased brand credibility, and improved social media presence.",
    software:["Premiere Pro","After Effects"],
    tags:["Brand Film","Commercial","Lifestyle"],
    video:"videos/vid5.mp4", thumb:"pics/thumb5.jpg"
  },
  {
    id:6, title:"Patient Trust Video", client:"Dental Clinic",
    category:"Healthcare", filter:"healthcare",
    desc:"A patient journey that reassures before they even walk through the door.",
    goal:"Build trust and reduce appointment anxiety by showing a real, positive patient experience inside the clinic.",
    role:"Video Editor & Narrative Director",
    approach:"Focused on the emotional journey: arrival, care, and satisfaction. Calm pacing and ambient sound design reflect the comfort of the actual experience.",
    outcome:"Increased patient confidence, higher booking conversion, and a notable reduction in appointment cancellations.",
    software:["Premiere Pro","After Effects"],
    tags:["Healthcare","Testimonial","Brand Trust"],
    video:"videos/vid6.mp4", thumb:"pics/thumb6.jpg"
  }
];

/* ── THEME: init immediately to prevent flash ─────────── */
(function(){
  const t = localStorage.getItem('mtheme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();

/* ═══════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════ */
function setupCursor(){
  if(window.matchMedia('(hover:none)').matches) return;

  const outer = document.createElement('div'); outer.className='cursor-outer';
  const inner = document.createElement('div'); inner.className='cursor-inner';
  document.body.appendChild(outer);
  document.body.appendChild(inner);

  let mX=window.innerWidth/2, mY=window.innerHeight/2;
  let oX=mX, oY=mY;

  document.addEventListener('mousemove', e=>{
    mX=e.clientX; mY=e.clientY;
    inner.style.left=mX+'px'; inner.style.top=mY+'px';
  },{passive:true});

  (function lag(){
    oX += (mX-oX)*.11; oY += (mY-oY)*.11;
    outer.style.left=oX+'px'; outer.style.top=oY+'px';
    requestAnimationFrame(lag);
  })();

  const SEL='a,button,.ft,.pc,.testi-card,.polaroid,[role="button"],[role="tab"],.filter-btn,.nb-drop-link,.clink';
  document.addEventListener('mouseover', e=>{ if(e.target.closest(SEL)) document.body.classList.add('ch'); });
  document.addEventListener('mouseout',  e=>{ if(e.target.closest(SEL)) document.body.classList.remove('ch'); });
  document.addEventListener('mousedown', ()=>document.body.classList.add('cc'));
  document.addEventListener('mouseup',   ()=>document.body.classList.remove('cc'));
}

/* ═══════════════════════════════════════════════════════
   CANVAS STARFIELD
═══════════════════════════════════════════════════════ */
function setupStarfield(){
  const canvas=document.getElementById('starCanvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');

  function resize(){
    canvas.width =window.innerWidth;
    canvas.height=Math.max(document.body.scrollHeight, window.innerHeight);
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  const stars=Array.from({length:360},()=>({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*1.1+0.15,
    o:Math.random()*0.7+0.15,
    d:(Math.random()-0.5)*0.007,
  }));

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    stars.forEach(s=>{
      s.o+=s.d;
      if(s.o>0.85||s.o<0.08) s.d*=-1;
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(242,237,229,${s.o.toFixed(3)})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ═══════════════════════════════════════════════════════
   3D TILT EFFECT
   Mouse left → leans left, right → leans right, etc.
═══════════════════════════════════════════════════════ */
function applyTilt(selector, maxY=12, maxX=8){
  document.querySelectorAll(selector).forEach(el=>{
    el.addEventListener('mousemove', e=>{
      const r=el.getBoundingClientRect();
      const x=e.clientX-r.left, y=e.clientY-r.top;
      const cx=r.width/2, cy=r.height/2;
      const rotY = ((x-cx)/cx)*maxY;
      const rotX = -((y-cy)/cy)*maxX;
      el.style.transition='transform 0.1s ease';
      el.style.transform=`perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    });
    el.addEventListener('mouseleave',()=>{
      el.style.transition='transform 0.65s cubic-bezier(0.16,1,0.3,1)';
      el.style.transform='perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

/* ═══════════════════════════════════════════════════════
   PRELOADER
═══════════════════════════════════════════════════════ */
function runPreloader(onDone){
  const el   =document.getElementById('preloader');
  const icon =document.getElementById('preIcon');
  const name =document.getElementById('preName');
  const sub  =document.querySelector('.pre-sub');
  const barW =document.getElementById('preBarWrap');
  const bar  =document.getElementById('preBar');
  if(!el){ onDone(); return; }

  setTimeout(()=>icon&&icon.classList.add('go'), 160);
  setTimeout(()=>name&&name.classList.add('go'), 420);
  setTimeout(()=>sub &&sub.classList.add('go'),  720);
  setTimeout(()=>barW&&barW.classList.add('go'), 900);

  let pct=0;
  const iv=setInterval(()=>{
    pct+=Math.random()*3.8+1.2;
    if(pct>=100){pct=100; clearInterval(iv);}
    if(bar) bar.style.width=pct+'%';
  },25);

  setTimeout(()=>{
    el.classList.add('exit');
    setTimeout(()=>{
      el.hidden=true; el.style.display='none';
      document.body.classList.add('site-ready');
      onDone();
    },970);
  },2700);
}

/* ═══════════════════════════════════════════════════════
   GSAP INTRO + PARALLAX
═══════════════════════════════════════════════════════ */
function animateIn(){
  if(typeof gsap==='undefined') return;
  gsap.fromTo('.hero-body',{opacity:0,y:28},{opacity:1,y:0,duration:.9,ease:'power3.out'});
  gsap.fromTo('.ft',{opacity:0,scale:.82,y:18},{
    opacity:1,scale:1,y:0,
    stagger:{amount:.9,from:'random'},
    duration:.7,ease:'power3.out',delay:.35
  });
}

function setupParallax(){
  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.ft').forEach((el,i)=>{
    gsap.to(el,{
      y:(i%2===0?-1:1)*50, ease:'none',
      scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1+i*.15}
    });
  });
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════ */
let revObs;
function setupReveal(){
  revObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('in');revObs.unobserve(e.target);}
    });
  },{threshold:0.08,rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));
}
function reObserve(){
  document.querySelectorAll('.reveal:not(.in)').forEach(el=>revObs?.observe(el));
}

/* ═══════════════════════════════════════════════════════
   COUNTER ANIMATION
═══════════════════════════════════════════════════════ */
function setupCounters(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){countUp(e.target,parseInt(e.target.dataset.count));obs.unobserve(e.target);}
    });
  },{threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(el=>obs.observe(el));
}
function countUp(el,target){
  const dur=1600,t0=performance.now();
  const run=ts=>{
    const p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3);
    el.textContent=Math.round(e*target);
    if(p<1) requestAnimationFrame(run); else el.textContent=target;
  };
  requestAnimationFrame(run);
}

/* ═══════════════════════════════════════════════════════
   NAV — sticky + scroll progress + active links
═══════════════════════════════════════════════════════ */
function setupNav(){
  const nav =document.getElementById('navbar');
  const fill=document.getElementById('scrollFill');

  window.addEventListener('scroll',()=>{
    if(nav)  nav.classList.toggle('stuck', window.scrollY>55);
    if(fill){
      const total=document.documentElement.scrollHeight-window.innerHeight;
      fill.style.width=(total>0?window.scrollY/total*100:0)+'%';
    }
  },{passive:true});

  const sections=document.querySelectorAll('section[id]');
  const dropLinks=document.querySelectorAll('.nb-drop-link');
  new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const id=e.target.id;
        dropLinks.forEach(l=>l.classList.toggle('active-link',l.getAttribute('href')==='#'+id));
      }
    });
  },{threshold:0.3}).observe; // observe all sections
  sections.forEach(s=>{
    new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const id=e.target.id;
          dropLinks.forEach(l=>l.classList.toggle('active-link',l.getAttribute('href')==='#'+id));
        }
      });
    },{threshold:0.35}).observe(s);
  });
}

/* ═══════════════════════════════════════════════════════
   DROPDOWN MENU
═══════════════════════════════════════════════════════ */
function setupDropdown(){
  const btn =document.getElementById('menuBtn');
  const drop=document.getElementById('menuDropdown');
  if(!btn||!drop) return;

  btn.addEventListener('click',e=>{
    e.stopPropagation();
    const open=drop.classList.toggle('open');
    btn.setAttribute('aria-expanded',open);
  });
  drop.querySelectorAll('.nb-drop-link').forEach(link=>{
    link.addEventListener('click',()=>{
      drop.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    });
  });
  document.addEventListener('click',e=>{
    if(!btn.contains(e.target)&&!drop.contains(e.target)){
      drop.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){drop.classList.remove('open');btn.setAttribute('aria-expanded','false');}
  });
}

/* ═══════════════════════════════════════════════════════
   THEME TOGGLE
═══════════════════════════════════════════════════════ */
function setupTheme(){
  const btn=document.getElementById('themeToggle');
  if(!btn) return;
  btn.addEventListener('click',()=>{
    const html=document.documentElement;
    const next=html.getAttribute('data-theme')==='dark'?'light':'dark';
    html.setAttribute('data-theme',next);
    localStorage.setItem('mtheme',next);
  });
}

/* ═══════════════════════════════════════════════════════
   NAV FORM
═══════════════════════════════════════════════════════ */
function submitForm(e){
  e.preventDefault();
  const input=document.getElementById('nbEmail');
  const email=input?input.value.trim():'';
  if(!email) return;
  window.location.href=`mailto:Elmenshawy486@gmail.com?subject=Project Enquiry from Portfolio&body=Hello Mohamed,%0A%0AI found your portfolio and would like to discuss a project.%0A%0AMy email: ${email}`;
  if(input) input.value='';
}

/* ═══════════════════════════════════════════════════════
   SMOOTH ANCHOR SCROLL
═══════════════════════════════════════════════════════ */
function setupSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id&&id.length>1){
        const el=document.querySelector(id);
        if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════
   PROJECTS GRID
═══════════════════════════════════════════════════════ */
function renderProjects(filter){
  const grid=document.getElementById('projGrid');
  if(!grid) return;
  const list=filter==='all'?PROJECTS:PROJECTS.filter(p=>p.filter===filter);

  grid.innerHTML=list.map(p=>`
    <div class="pc reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="Open: ${p.title}">
      <div class="pc-thumb">
        <img src="${p.thumb}" alt="${p.title}" loading="lazy"
             onerror="this.onerror=null;this.style.opacity='0'"/>
        <div class="pc-overlay">
          <div class="pc-play">
            <svg viewBox="0 0 24 24" fill="white" width="14" height="14"><path d="M8 5.14v14l11-7-11-7z"/></svg>
          </div>
        </div>
      </div>
      <div class="pc-label">
        <span class="pc-name">${p.title}</span>
        <button class="pc-pill" tabindex="-1">
          ${p.category}
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" width="10" height="10">
            <path stroke-linecap="round" d="M2 6h8M7 3l3 3-3 3"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.pc').forEach(card=>{
    const id=parseInt(card.dataset.id);
    card.addEventListener('click',()=>openModal(id));
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(id);}
    });
    card.querySelector('.pc-pill')?.addEventListener('click',e=>{e.stopPropagation();openModal(id);});
  });

  applyTilt('.pc',10,7);
  reObserve();
}

function setupFilters(){
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-selected','false');});
      btn.classList.add('active');btn.setAttribute('aria-selected','true');
      renderProjects(btn.dataset.filter||'all');
    });
  });
}

/* ═══════════════════════════════════════════════════════
   HERO THUMBNAILS → MODAL
═══════════════════════════════════════════════════════ */
function setupHeroThumbs(){
  document.querySelectorAll('.ft').forEach(el=>{
    const id=parseInt(el.dataset.id);
    el.addEventListener('click',()=>openModal(id));
    el.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(id);}
    });
  });
}

/* Force-play all muted hero preview videos (autoplay, no sound, loop) */
function playHeroPreviews(){
  document.querySelectorAll('.ft-video').forEach(v=>{
    v.muted=true; v.defaultMuted=true; v.volume=0;
    const tryPlay=()=>v.play().catch(()=>{});
    if(v.readyState>=2) tryPlay();
    else v.addEventListener('loadeddata',tryPlay,{once:true});
    setTimeout(tryPlay,400);
  });
}

/* ═══════════════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════════════ */
function openModal(id){
  const p=PROJECTS.find(x=>x.id===id);
  if(!p) return;

  document.getElementById('modalCat').textContent  =p.category;
  document.getElementById('modalTitle').textContent =p.title;

  const tagsEl=document.getElementById('modalTags');
  if(tagsEl) tagsEl.innerHTML=[p.client,...p.tags].map(t=>`<span class="modal-tag">${t}</span>`).join('');

  const detEl=document.getElementById('modalDetails');
  if(detEl) detEl.innerHTML=[
    {h:'Project Goal',    t:p.goal},
    {h:'My Role',         t:p.role},
    {h:'Editing Approach',t:p.approach},
    {h:'Outcome',         t:p.outcome},
  ].map(d=>`<div class="mdi"><h4>${d.h}</h4><p>${d.t}</p></div>`).join('');

  const swEl=document.getElementById('modalSw');
  if(swEl) swEl.innerHTML=p.software.map(s=>`<span class="sw-tag">${s}</span>`).join('');

  const extEl=document.getElementById('modalExtLink');
  if(extEl) extEl.innerHTML=p.extLink
    ?`<a href="${p.extLink}" target="_blank" rel="noopener" class="modal-ext-link">Watch on LinkedIn →</a>`:'';

  const vid  =document.getElementById('modalVideo');
  const noVid=document.getElementById('modalNoVid');
  if(vid&&noVid){
    if(p.video){vid.src=p.video;vid.load();vid.style.display='block';noVid.hidden=true;}
    else{vid.src='';vid.style.display='none';noVid.hidden=false;}
  }

  const panel  =document.getElementById('descPanel');
  const descBtn=document.getElementById('descBtn');
  if(panel) panel.classList.remove('open');
  if(descBtn) descBtn.setAttribute('aria-expanded','false');

  document.getElementById('modalBackdrop').hidden=false;
  document.getElementById('modalWrap').hidden=false;
  document.body.style.overflow='hidden';
  setTimeout(()=>document.getElementById('modalClose')?.focus(),120);
}

function closeModal(){
  const vid=document.getElementById('modalVideo');
  if(vid){vid.pause();vid.src='';}
  document.getElementById('modalBackdrop').hidden=true;
  document.getElementById('modalWrap').hidden=true;
  document.body.style.overflow='';
}

function toggleDesc(){
  const panel  =document.getElementById('descPanel');
  const descBtn=document.getElementById('descBtn');
  if(!panel||!descBtn) return;
  const open=panel.classList.toggle('open');
  descBtn.setAttribute('aria-expanded',open);
}

/* ═══════════════════════════════════════════════════════
   DOM READY
═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>{

  setupStarfield();
  setupCursor();
  setupTheme();

  runPreloader(()=>{
    setupReveal();
    setupCounters();
    setupParallax();
    animateIn();
    applyTilt('.ft',12,8);
    applyTilt('.polaroid',10,7);
    applyTilt('.testi-card',8,5);
    playHeroPreviews();
  });

  setupNav();
  setupDropdown();
  setupSmoothScroll();
  setupHeroThumbs();

  renderProjects('all');
  setupFilters();

  /* Modal events */
  document.getElementById('modalClose')  ?.addEventListener('click',closeModal);
  document.getElementById('modalBackdrop')?.addEventListener('click',closeModal);
  document.getElementById('descBtn')     ?.addEventListener('click',toggleDesc);
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});

  /* Re-apply tilt when project grid re-renders */
  const grid=document.getElementById('projGrid');
  if(grid) new MutationObserver(()=>applyTilt('.pc',10,7)).observe(grid,{childList:true});
});
