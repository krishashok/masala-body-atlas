/* Station-specific interactive controls for Stations 07 and 08.
   The core shell stays station-agnostic; this module observes route/mode changes
   and mounts controls only when one of the interactive stations is active. */

const $ = (sel, root=document) => root.querySelector(sel);

const ENERGY_DEFAULTS = {
  intake:2300,
  base:1550,
  tef:200,
  neat:350,
  exercise:250
};

const ENERGY_LIMITS = {
  intake:[1400,3500,50],
  base:[1000,2400,25],
  tef:[100,350,10],
  neat:[100,900,25],
  exercise:[0,900,25]
};

const ENERGY_LABELS = {
  intake:'Food eaten',
  base:'Resting use',
  tef:'Digesting food',
  neat:'Daily movement',
  exercise:'Exercise'
};

const ENERGY_UNCERTAINTY = {
  intake:.10,
  base:.05,
  tef:.15,
  neat:.25,
  exercise:.25
};

let energy = {...ENERGY_DEFAULTS};
let mediaGain = 45;
let lastKey = '';

function stationId(){
  return (location.hash.match(/#\/([\w-]+)/) || [])[1] || '';
}

function currentMode(){
  const m = [...document.body.classList].find(x => x.startsWith('mode-'));
  return m ? m.slice(5) : '';
}

function fmt(n){
  const sign = n > 0 ? '+' : n < 0 ? '−' : '';
  return sign + Math.abs(Math.round(n)).toLocaleString('en-US');
}

function ensureTray(){
  const surface = $('#surface');
  if(!surface) return null;
  let tray = $('#stationControls');
  if(!tray){
    tray = document.createElement('section');
    tray.id = 'stationControls';
    tray.className = 'station-controls';
    tray.setAttribute('aria-label','Interactive station controls');
    surface.appendChild(tray);
  }
  return tray;
}

function clearTray(){
  const tray = $('#stationControls');
  if(tray){
    tray.innerHTML = '';
    tray.className = 'station-controls';
    tray.style.display = 'none';
  }
}

function energyBalance(values=energy){
  return values.intake - values.base - values.tef - values.neat - values.exercise;
}

function energyRange(){
  const lo = {};
  const hi = {};
  for(const k of Object.keys(energy)){
    const p = ENERGY_UNCERTAINTY[k];
    lo[k] = energy[k] * (1-p);
    hi[k] = energy[k] * (1+p);
  }
  // Smallest balance = lowest intake minus highest expenditure.
  const min = lo.intake - hi.base - hi.tef - hi.neat - hi.exercise;
  const max = hi.intake - lo.base - lo.tef - lo.neat - lo.exercise;
  return [min,max];
}

function adaptedEnergy(){
  // Teaching scenario only: resting use -8%, incidental movement -15%.
  const v = {...energy, base:energy.base*.92, neat:energy.neat*.85};
  return energyBalance(v);
}

function updateEnergyDrawing(){
  const drawing = $('#drawing');
  if(!drawing) return;
  for(const [k,v] of Object.entries(energy)){
    const t = $(`[data-meter-value="${k}"]`, drawing);
    if(t) t.textContent = Math.round(v).toLocaleString('en-US');
  }
  const balance = energyBalance();
  const out = $('[data-meter-balance]', drawing);
  if(out) out.textContent = fmt(balance);
  const status = $('[data-meter-status]', drawing);
  if(status) status.textContent = balance < 0 ? 'estimated deficit' : balance > 0 ? 'estimated surplus' : 'estimated balance';

  const r = energyRange();
  const range = $('[data-meter-range]', drawing);
  if(range) range.textContent = `example range: ${fmt(r[0])} to ${fmt(r[1])} kcal/day`;

  const ad = $('[data-meter-adapted]', drawing);
  if(ad) ad.textContent = `same plan → ${fmt(adaptedEnergy())} kcal/day in this example`;

  const trayResult = $('[data-energy-result]');
  if(trayResult) trayResult.textContent = `${fmt(balance)} kcal/day`;
}

function mountEnergy(){
  const tray = ensureTray();
  if(!tray) return;
  tray.style.display = '';
  tray.className = 'station-controls energy-controls';
  tray.innerHTML = `
    <div class="controls-head">
      <b>Try the calculation</b>
      <button type="button" class="controls-reset" data-energy-reset>Reset</button>
    </div>
    <div class="energy-sliders">
      ${Object.keys(ENERGY_DEFAULTS).map(k => {
        const [min,max,step] = ENERGY_LIMITS[k];
        return `<label class="control-row">
          <span>${ENERGY_LABELS[k]}</span>
          <input type="range" min="${min}" max="${max}" step="${step}" value="${energy[k]}" data-energy="${k}">
          <output data-energy-output="${k}">${energy[k].toLocaleString('en-US')}</output>
        </label>`;
      }).join('')}
    </div>
    <div class="controls-result"><span>Calculated balance</span><strong data-energy-result>—</strong></div>
    <p class="controls-note">These are teaching values, not a personal calorie prescription.</p>`;

  tray.querySelectorAll('[data-energy]').forEach(input => {
    input.addEventListener('input', () => {
      const k = input.dataset.energy;
      energy[k] = Number(input.value);
      const out = tray.querySelector(`[data-energy-output="${k}"]`);
      if(out) out.textContent = energy[k].toLocaleString('en-US');
      updateEnergyDrawing();
    });
  });
  $('[data-energy-reset]', tray)?.addEventListener('click', () => {
    energy = {...ENERGY_DEFAULTS};
    mountEnergy();
    updateEnergyDrawing();
  });
  updateEnergyDrawing();
}

function updateMediaGain(){
  const drawing = $('#drawing');
  if(!drawing) return;
  const mode = currentMode();
  const gain = mediaGain / 100;
  const methods = drawing.querySelectorAll('.evidence-method');
  methods.forEach(g => {
    const isOutlier = g.classList.contains('outlier');
    const content = $('.gauge-content', g);
    if(mode === 'megaphone'){
      g.style.opacity = isOutlier ? '1' : String(1 - gain*.72);
      if(content) content.style.transform = isOutlier ? `scale(${1 + gain*.42})` : `scale(${1 - gain*.08})`;
    }else{
      g.style.opacity = '';
      if(content) content.style.transform = '';
    }
  });
  const megaphone = $('.evidence-megaphone', drawing);
  if(megaphone) megaphone.style.opacity = String(.25 + gain*.75);
  const headline = $('[data-headline]', drawing);
  if(headline){
    headline.style.opacity = String(.35 + gain*.65);
    headline.style.fontSize = `${13 + gain*5}px`;
  }
  const out = $('[data-gain-output]');
  if(out) out.textContent = `${mediaGain}%`;
}

function mountEvidence(){
  const tray = ensureTray();
  if(!tray) return;
  tray.style.display = '';
  tray.className = 'station-controls evidence-controls';
  const isHeadline = currentMode() === 'megaphone';
  tray.innerHTML = isHeadline ? `
    <div class="controls-head"><b>Media Gain</b><output data-gain-output>${mediaGain}%</output></div>
    <label class="gain-control">
      <span>quiet</span>
      <input type="range" min="0" max="100" step="1" value="${mediaGain}" data-media-gain aria-label="Media gain">
      <span>loud</span>
    </label>
    <p class="controls-note">Gain changes attention. It does not change the studies.</p>` : `
    <div class="controls-head"><b>Evidence control room</b></div>
    <p class="controls-note">Use the operating states below: one study → compare methods → convergence → headline.</p>`;

  $('[data-media-gain]', tray)?.addEventListener('input', e => {
    mediaGain = Number(e.target.value);
    updateMediaGain();
  });
  updateMediaGain();
}

function mountForCurrentState(){
  const id = stationId();
  const mode = currentMode();
  const drawingReady = $('#drawing svg');
  if(!drawingReady){ clearTray(); return; }
  const key = `${id}:${mode}:${drawingReady.getAttribute('aria-label') || ''}`;
  if(key === lastKey){
    if(id === 'meter') updateEnergyDrawing();
    if(id === 'control-room') updateMediaGain();
    return;
  }
  lastKey = key;
  if(id === 'meter') mountEnergy();
  else if(id === 'control-room') mountEvidence();
  else clearTray();
}

const observer = new MutationObserver(() => requestAnimationFrame(mountForCurrentState));
observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
window.addEventListener('hashchange', () => requestAnimationFrame(mountForCurrentState));
requestAnimationFrame(mountForCurrentState);
