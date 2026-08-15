/* ============================================================
   MASALA BODY — THE FACILITY TOUR
   Shell: router, layer switch, mode strip, panel rendering.
   Station modules follow the contract in addendum §D2. Nothing
   in here is station-specific.
   ============================================================ */

import STATIONS from './stations/index.js';

const LS_LAYER = 'mb.layer';
const LS_HINT  = 'mb.hint.seen';

const $ = id => document.getElementById(id);
const el = {
  drawing:$('drawing'), modebtns:$('modebtns'), modecap:$('modecap'),
  titleblock:$('titleblock'), modeflag:$('modeflag'), rail:$('rail'),
  stationno:$('stationno'), ptitle:$('ptitle'), psub:$('psub'),
  bodyPlain:$('bodyPlain'), bodyTech:$('bodyTech'), bodyMyth:$('bodyMyth'),
  toggle:$('toggle'), btnMain:$('btnMain'), btnMyth:$('btnMyth'),
  roTag:$('roTag'), roName:$('roName'), roText:$('roText'), readout:$('readout'),
  btnPlain:$('btnPlain'), btnTech:$('btnTech'), btnShare:$('btnShare'),
  btnPrev:$('btnPrev'), btnNext:$('btnNext'), firsthint:$('firsthint'), modelwrap:$('modelwrap')
};

/* ---------------- state ---------------- */
let layer   = localStorage.getItem(LS_LAYER) === 'tech' ? 'tech' : 'plain';
let station = null;
let mode    = null;
let active  = null;
let routing = false;

function dismissHint(){
  if(!el.firsthint) return;
  el.firsthint.classList.add('gone');
  localStorage.setItem(LS_HINT, '1');
}

function stateQuery(){
  const q = new URLSearchParams();
  q.set('layer', layer);
  if(mode) q.set('mode', mode);
  if(active) q.set('part', active);
  if(document.body.classList.contains('myth')) q.set('panel', 'myth');
  return q;
}

function syncStateUrl(){
  if(routing || !station) return;
  history.replaceState(null, '', `#/${station.id}?${stateQuery().toString()}`);
}

async function shareView(){
  if(!station) return;
  const path = location.pathname.endsWith('/index.html')
    ? location.pathname.slice(0, -'index.html'.length)
    : (location.pathname.endsWith('/') ? location.pathname : location.pathname.replace(/[^/]+$/, ''));
  const url = new URL(`${path}${station.id}/?${stateQuery().toString()}`, location.origin).href;
  const data = { title: `Masala Body — Station ${station.no}: ${station.rail.plain}`, text: station.sub.plain, url };
  try{
    if(navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(url); el.btnShare.textContent='Copied'; setTimeout(()=>el.btnShare.textContent='Share this view',1200); }
  }catch(e){ if(e.name !== 'AbortError') location.href = url; }
}

/* ---------------- render ---------------- */
function render(){
  if(!station) return;

  const h = (station.hotspots || []).find(x => x.k === active);
  if(h && el.readout.style.display !== 'none' && h[layer].text){
    el.roTag.textContent  = (layer === 'tech' ? 'Component ' : 'Part ') + h.n + ' of ' + station.hotspots.length;
    // innerHTML, not textContent: every other panel field is authored HTML,
    // and a stray &rsquo; in a readout otherwise renders literally
    el.roName.innerHTML = h[layer].name;
    el.roText.innerHTML = h[layer].text;
  }

  const m = station.modes.find(x => x.k === mode);
  el.modecap.innerHTML = m ? m.cap[layer] : '';

  el.ptitle.innerHTML    = station.title[layer];
  el.psub.innerHTML      = station.sub[layer];
  el.btnMain.textContent = layer === 'tech' ? 'Spec Sheet' : 'What It Does';
}

/* The title block owns the bottom-right corner in Nerd Mode. Publish its
   height so the mode strip can sit above it (see app.css). Hidden in Simple,
   where the strip drops back to the plain inset. */
function measureTitleblock(){
  const h = el.titleblock.offsetHeight;
  document.documentElement.style.setProperty('--tb-h', (h || 0) + 'px');
}

/* Reserve the bottom furniture's height so the drawing is letterboxed
   above it rather than behind it. Strip height varies with viewport
   width and caption length, so this is measured, not assumed. */
/* Narrow windows need a margin that a wide one does not.

   Drawing type is set in viewBox units, so it shrinks with the sheet — but
   glyph advances round up at small sizes, which means a label takes up
   proportionally MORE of the sheet the smaller the sheet gets. Labels near
   an edge therefore run off it, and the narrower the window the worse it
   gets: clean at 1440, nineteen labels over the edge at 1024, and worse
   again on a phone where the labels are also deliberately set larger.

   Padding the viewBox by an amount that grows as the window narrows gives
   every sheet the same relief from one place, instead of nudging labels
   inward across ten station files and hoping none of them lands on
   something else. The sheet scales down a few percent to pay for it. */
function padSheet(){
  const svg = el.drawing.querySelector('svg');
  if(!svg) return;
  const base = svg.dataset.vb || (svg.dataset.vb = svg.getAttribute('viewBox'));
  const [x, y, w, h] = base.split(/[\s,]+/).map(Number);
  const vw = window.innerWidth;
  const pad = vw <= 700  ? 96
            : vw >= 1500 ? 0
            : Math.round(96 - (vw - 700) * 96 / 800);
  svg.setAttribute('viewBox', `${x - pad} ${y} ${w + pad * 2} ${h}`);
  /* The stacked layout sizes the drawing box by aspect ratio so it does not
     letterbox the sheet. Padding changes that ratio, so it is published here
     rather than hard-coded in the stylesheet. */
  document.documentElement.style.setProperty('--sheet-ar', ((w + pad * 2) / h).toFixed(4));
}

/* Phones render the sheet at about 0.4, where a long in-drawing note is both
   unreadable and wider than the sheet it sits on. Anything that wide is prose,
   and prose already has a home in the panel — so it is tagged here and hidden
   by CSS at phone widths.

   Measured rather than counted in characters: the same string is a different
   width in mono and in sans, and the phone rules resize several text classes.
   It lives inside measureFurniture so it re-runs on every layer, mode and
   resize change — which is exactly when a different set of text is visible.
   Elements measuring zero are hidden right now, so they keep whatever tag
   they were last given and get re-measured when they come back. */
function tagSheetProse(){
  const svg = el.drawing.querySelector('svg');
  if(!svg || !svg.dataset.vb) return;
  const limit = Number(svg.dataset.vb.split(/[\s,]+/)[2]) * 0.30;
  if(!limit) return;
  svg.querySelectorAll('text').forEach(t => {
    let w = 0;
    try { w = t.getBBox().width; } catch(e) { return; }
    if(w) t.classList.toggle('sheetprose', w > limit);
  });

  /* An annotation block is a heading and the lines under it. If every line
     went, the heading is left pointing at nothing — so it goes too. */
  svg.querySelectorAll('.blk-h').forEach(h => {
    let body = 0, kept = 0;
    for(let n = h.nextElementSibling; n && !n.classList.contains('blk-h'); n = n.nextElementSibling){
      if(!n.classList.contains('blk-p')) continue;
      body++;
      if(!n.classList.contains('sheetprose')) kept++;
    }
    h.classList.toggle('sheetprose', body > 0 && kept === 0);
  });
}

function measureFurniture(){
  const surface = document.querySelector('.surface');
  if(!surface) return;
  const bottom = surface.getBoundingClientRect().bottom;
  const tops = [el.modebtns, el.modecap, el.titleblock]
    .filter(n => n && n.getClientRects().length)
    .map(n => n.getBoundingClientRect().top);
  const h = tops.length ? Math.max(0, bottom - Math.min(...tops) + 10) : 0;
  document.documentElement.style.setProperty('--furniture-h', Math.round(h) + 'px');

  // the mode flag sits above the drawing and only exists in Nerd Mode
  const top = surface.getBoundingClientRect().top;
  const f = el.modeflag.getClientRects().length ? el.modeflag.getBoundingClientRect() : null;
  document.documentElement.style.setProperty('--flag-h',
    (f ? Math.round(Math.max(0, f.bottom - top + 10)) : 0) + 'px');
  padSheet();
  tagSheetProse();
}

function setLayer(l){
  layer = l;
  localStorage.setItem(LS_LAYER, l);
  document.body.classList.toggle('plain', l === 'plain');
  document.body.classList.toggle('tech',  l === 'tech');
  measureTitleblock();
  el.btnPlain.classList.toggle('on', l === 'plain');
  el.btnTech.classList.toggle('on',  l === 'tech');
  el.btnPlain.setAttribute('aria-pressed', l === 'plain');
  el.btnTech.setAttribute('aria-pressed',  l === 'tech');
  render();
  measureFurniture();
  syncStateUrl();
}

/* §D4 — body carries mode-<k>; the drawing's .a-<k> groups are
   revealed by CSS, which also restarts their animations on switch. */
function setMode(m){
  mode = m;
  document.body.className = document.body.className.replace(/\bmode-\S+/g, '').trim() + ' mode-' + m;
  [...el.modebtns.children].forEach(b => { const on=b.dataset.m === m; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  render();
  measureFurniture();
  syncStateUrl();
}

function selectPart(k, scroll = true){
  active = k;
  el.drawing.querySelectorAll('g.hot').forEach(g => {
    const on = g.dataset.k === k;
    g.classList.toggle('on', on);
    g.setAttribute('aria-pressed', on);
  });
  document.querySelectorAll('.plainlist li.linked').forEach(li => {
    const on = li.dataset.k === k;
    li.classList.toggle('on', on);
    li.setAttribute('aria-pressed', on);
    if(on && scroll && li.offsetParent) li.scrollIntoView({block:'nearest'});
  });
  render();
  syncStateUrl();
}

function setPanel(showMyth){
  const hasMyth = !!(station && station.myth);
  const on = showMyth && hasMyth;
  document.body.classList.toggle('myth', on);
  el.bodyMyth.style.display  = on ? '' : 'none';
  el.bodyPlain.style.display = on ? 'none' : '';
  el.bodyTech.style.display  = on ? 'none' : '';
  el.modelwrap.style.display = !on && (station?.modelLimits?.length) ? '' : 'none';
  el.btnMyth.classList.toggle('on', on);
  el.btnMain.classList.toggle('on', !on);
  el.btnMyth.setAttribute('aria-pressed', on);
  el.btnMain.setAttribute('aria-pressed', !on);
  el.modeflag.textContent = on ? 'Myth View — not to be trusted' : 'Mechanism View';
  syncStateUrl();
}

/* ---------------- rail ---------------- */
function buildRail(activeId){
  el.rail.innerHTML = STATIONS.map(s => `
    <a class="chip${s.id === activeId ? ' on' : ''}" href="#/${s.id}"${s.id === activeId ? ' aria-current="page"' : ''}>
      <b>${s.no}</b><span class="techonly">${s.rail.tech}</span><span class="plainonly">${s.rail.plain}</span>
    </a>`).join('');
  requestAnimationFrame(() => el.rail.querySelector('.chip.on')?.scrollIntoView({block:'nearest', inline:'center'}));
}

/* ---------------- mount ---------------- */
function mount(s){
  buildRail(s.id);
  document.title = `Masala Body — Station ${s.no}: ${s.rail.plain}`;
  const ix = STATIONS.indexOf(s);
  el.btnPrev.disabled = ix <= 0;
  el.btnNext.disabled = ix >= STATIONS.length - 1;

  if(s.pending){
    station = null;
    el.drawing.innerHTML = `<div class="pending">Station ${s.no} — ${s.rail.tech}<br>Drawing not yet issued</div>`;
    el.modebtns.innerHTML = el.modecap.innerHTML = el.titleblock.innerHTML = '';
    el.stationno.textContent = `Station ${s.no}`;
    el.ptitle.textContent = s.rail.plain;
    el.psub.textContent = 'Not drawn yet.';
    el.bodyPlain.innerHTML = el.bodyTech.innerHTML = '<p class="kicker">Awaiting drawing</p>';
    el.bodyMyth.innerHTML = '';
    el.roTag.textContent = el.roName.textContent = el.roText.textContent = '';
    el.toggle.style.display = 'none';
    return;
  }

  station = s;
  el.toggle.style.display = '';
  el.drawing.innerHTML = s.svg;

  // title block
  const d = s.drawing;
  el.titleblock.innerHTML =
    `<div><span>Drawing</span><span><b>${d.no}</b></span>${d.rev ? `<span>Rev <b>${d.rev}</b></span>` : ''}</div>
     <div><span>Vessel <b>${d.vessel}</b></span><span>${d.desc}</span><span>${d.view}</span></div>`;

  // mode strip — labels authored twice, swapped by CSS (§D3)
  el.modebtns.innerHTML = s.modes.map(m =>
    `<button data-m="${m.k}"${m.fault ? ' class="fault"' : ''}>
       <span class="plainonly">${m.label.plain}</span><span class="techonly">${m.label.tech}</span>
     </button>`).join('');
  [...el.modebtns.children].forEach(b => {
    b.setAttribute('aria-pressed', 'false');
    b.onclick = () => { dismissHint(); setMode(b.dataset.m); };
  });

  // panel head
  el.stationno.textContent = `Station ${s.no} — ${s.section}`;

  // main panel, both layers, built from data. A point carrying `k` belongs to
  // a numbered component, so it gets the badge and becomes selectable.
  const P = s.main.plain, T = s.main.tech;
  const list = pts => `<ul class="plainlist">${(pts || []).map(p => {
    const hot = p.k ? (s.hotspots || []).find(x => x.k === p.k) : null;
    return hot
      ? `<li class="linked" data-k="${p.k}" role="button" tabindex="0" aria-pressed="false">
           <span class="num">${hot.n}</span><div><b>${p.h}</b><span>${p.p}</span></div></li>`
      : `<li><div><b>${p.h}</b><span>${p.p}</span></div></li>`;
  }).join('')}</ul>`;

  el.bodyPlain.innerHTML =
    `<p class="kicker">${P.kicker}</p>${list(P.points)}<div class="note">${P.note}</div>`;
  el.bodyTech.innerHTML =
    `<p class="kicker">${T.kicker}</p>
     <div class="spec">${T.spec.map(r =>
       `<div class="row"><span class="k">${r.k}</span><i class="dots"></i><span class="v">${r.v}</span></div>`).join('')}</div>
     ${T.points ? list(T.points) : ''}
     <div class="note">${T.note}</div>
     <div class="analogy"><div class="tag">${T.analogy.tag}</div><p>${T.analogy.body}</p></div>`;

  // clicking the text selects the component, same as clicking the marker
  document.querySelectorAll('.plainlist li.linked').forEach(li => {
    const pick = () => selectPart(li.dataset.k, false);
    li.onclick = pick;
    li.onkeydown = e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); pick(); } };
  });

  // myth panel — shared across layers (§D2)
  el.btnMyth.style.display = s.myth ? '' : 'none';
  el.bodyMyth.innerHTML = s.myth ? `
    <div class="mythcard"><div class="tag">Myth</div><p>"${s.myth.claim}"</p></div>
    <div class="mechcard"><div class="tag">Mechanism</div>${s.myth.mechanism.map(p => `<p>${p}</p>`).join('')}</div>
    <div class="analogy"><div class="tag">Why the myth survives</div><p>${s.myth.whySurvives}</p></div>` : '';

  // Nerd Mode gets the caveats without forcing them into the Simple copy.
  const limits = s.modelLimits || [];
  el.modelwrap.style.display = limits.length ? '' : 'none';
  el.modelwrap.innerHTML = limits.length ? `
    <details class="modellimits">
      <summary>Where the model bends <span>${limits.length}</span></summary>
      <div>${limits.map(x => `<p>${x}</p>`).join('')}</div>
    </details>` : '';

  // hotspots
  el.drawing.querySelectorAll('g.hot').forEach(g => {
    g.setAttribute('aria-pressed', 'false');
    g.addEventListener('click', () => { dismissHint(); selectPart(g.dataset.k); });
    g.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); dismissHint(); selectPart(g.dataset.k); }
    });
  });

  setPanel(false);                    // toggle resets on navigation (§D1, A6)
  setMode(s.modes[0].k);              // first mode is the default (§D2)

  /* hotspots are optional. The two site-plan sheets have no components to
     point at — their markers only restated the panel — so they render as a
     diagram plus animation and the readout is hidden. */
  const hs = s.hotspots || [];
  const inPanel = new Set([...(P.points || []), ...(T.points || [])].map(p => p.k).filter(Boolean));
  const merged = hs.length > 0 && hs.every(h => inPanel.has(h.k));
  el.readout.style.display = (hs.length && !merged) ? '' : 'none';
  if(hs.length) selectPart(hs[0].k, false); else active = null;
  measureTitleblock();
  measureFurniture();
}

/* ---------------- router ----------------
   #/reactor selects the station (A6). Optional query params make any
   state addressable — ?layer=tech&mode=grind&panel=myth — which is what
   the screenshot sweep drives. */
function route(){
  routing = true;
  const hash = location.hash;
  const slug = (hash.match(/#\/([\w-]+)/) || [])[1];
  const q = new URLSearchParams(hash.includes('?') ? hash.slice(hash.indexOf('?') + 1) : '');

  if(q.get('layer') === 'tech' || q.get('layer') === 'plain') setLayer(q.get('layer'));

  mount(STATIONS.find(s => s.id === slug) || STATIONS[0]);

  if(!station){ routing = false; return; }
  const m = q.get('mode');
  if(m && station.modes.some(x => x.k === m)) setMode(m);
  const p = q.get('part');
  if(p && (station.hotspots || []).some(x => x.k === p)) selectPart(p);
  if(q.get('panel') === 'myth') setPanel(true);
  routing = false;
  syncStateUrl();
}

/* prev / next station (A6) */
function step(dir){
  const slug = (location.hash.match(/#\/([\w-]+)/) || [])[1];
  const i = STATIONS.findIndex(s => s.id === slug);
  const next = STATIONS[Math.min(STATIONS.length - 1, Math.max(0, (i < 0 ? 0 : i) + dir))];
  location.hash = '#/' + next.id;
}

document.addEventListener('keydown', e => {
  if(e.metaKey || e.ctrlKey || e.altKey) return;
  if(e.target.closest('button,a,input,textarea,select,[contenteditable="true"]')) return;
  if(e.key === 'ArrowLeft')  step(-1);
  if(e.key === 'ArrowRight') step(1);
});

el.btnPlain.onclick = () => setLayer('plain');
el.btnTech.onclick  = () => setLayer('tech');
el.btnMain.onclick  = () => setPanel(false);
el.btnMyth.onclick  = () => setPanel(true);
el.btnPrev.onclick  = () => step(-1);
el.btnNext.onclick  = () => step(1);
el.btnShare.onclick = shareView;
window.addEventListener('hashchange', route);
window.addEventListener('resize', measureFurniture);

if(localStorage.getItem(LS_HINT)) el.firsthint.classList.add('gone');
setLayer(layer);
route();
