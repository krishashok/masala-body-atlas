/* ============================================================
   STATION 00 — THE PLANT
   The site plan. Every downstream station is a numbered node on
   one connected line, and each node is a link: clicking it routes
   there. Station 09 re-uses this same drawing to close the loop,
   which is why the plan is exported rather than inlined.
   ============================================================ */

const NODES = [
  // the alimentary canal — one continuous line, mouth to exit
  { no:'01', slug:'intake',       plain:'Mouth',           tech:'Intake & Wet Mill', x:200, y:158, side:'left' },
  { no:'02', slug:'reactor',      plain:'Stomach',         tech:'Acid Reactor',      x:200, y:248, side:'left' },
  { no:'03', slug:'refinery',     plain:'Small Intestine', tech:'Main Refinery',     x:200, y:338, side:'left' },
  { no:'04', slug:'bioreactor',   plain:'Gut Microbes',    tech:'Bioreactor',        x:200, y:428, side:'left' },
  // off the line: what is absorbed at 03 goes here, then out to the body
  { no:'05', slug:'reprocessing', plain:'Liver & Kidneys', tech:'Reprocessing',      x:430, y:338, side:'above' },
  { no:'06', slug:'logistics',    plain:'Blood & Fat',     tech:'Logistics',         x:430, y:474, side:'below' },
  // not plumbing at all: these read the plant
  { no:'07', slug:'meter',        plain:'Calories',        tech:'Energy Meter',      x:560, y:610, side:'right' },
  { no:'08', slug:'control-room', plain:"Why It's Hard",   tech:'Control Room',      x:560, y:670, side:'right' }
];

/* The plan, shared by Station 00 and Station 09.

   Topology matters here. The process line runs mouth to exit — stations
   01 to 04 — and nothing else is on it. What is absorbed at 03 branches
   to the liver and on to the bloodstream, which is a different circuit.
   07 and 08 are instruments: they measure the plant and are not part of
   it. Drawing all eight in one column asserted a falsehood. */
export function facilityPlan({ nominal = false } = {}) {
  const stroke = nominal ? 'var(--cardamom)' : 'var(--line)';

  const label = n => {
    if(n.side === 'left')  return `<path class="leader" d="M${n.x-16} ${n.y} L${n.x-30} ${n.y}"/>
      <text class="lbl-node techonly"  x="${n.x-36}" y="${n.y+5}" text-anchor="end">${n.tech}</text>
      <text class="lbl-node plainonly" x="${n.x-36}" y="${n.y+5}" text-anchor="end">${n.plain}</text>`;
    if(n.side === 'right') return `<path class="leader" d="M${n.x+16} ${n.y} L${n.x+30} ${n.y}"/>
      <text class="lbl-node techonly"  x="${n.x+36}" y="${n.y+5}">${n.tech}</text>
      <text class="lbl-node plainonly" x="${n.x+36}" y="${n.y+5}">${n.plain}</text>`;
    const dy = n.side === 'above' ? -34 : 38;
    return `<text class="lbl-node techonly"  x="${n.x}" y="${n.y+dy}" text-anchor="middle">${n.tech}</text>
      <text class="lbl-node plainonly" x="${n.x}" y="${n.y+dy}" text-anchor="middle">${n.plain}</text>`;
  };

  const nodes = NODES.map(n => `
    <a href="#/${n.slug}" aria-label="Station ${n.no} — ${n.plain}">
      ${label(n)}
      <circle cx="${n.x}" cy="${n.y}" r="15" style="fill:var(--ink);stroke:${stroke};stroke-width:1.6"/>
      <text class="nodenum" x="${n.x}" y="${n.y}">${n.no}</text>
    </a>`).join('');

  return `
  <!-- the process line: mouth to exit, and nothing else on it -->
  <path class="pipe v" d="M186 118 L214 118 L214 500 L186 500 Z"/>

  <!-- the branch: what is absorbed at 03 leaves the line here -->
  <path class="pipe h" d="M214 324 L416 324 L416 352 L214 352 Z"/>
  <path class="pipe v" d="M416 353 L444 353 L444 459 L416 459 Z"/>
  <text class="dimtext techonly"  x="310" y="378" text-anchor="middle">ABSORBED PRODUCT →</text>
  <text class="dimtext plainonly" x="310" y="378" text-anchor="middle">absorbed material →</text>
  <text class="dimtext" x="430" y="558" text-anchor="middle" opacity=".85">and on to every tissue</text>

  ${nodes}

  <!-- the line is measured over the canal only, not the branch -->
  <path class="leader" d="M186 486 L120 552 L104 552"/>
  <g class="techonly">
    <text class="blk-h" x="98" y="548" text-anchor="end">PROCESS LINE</text>
    <text class="blk-p" x="98" y="570" text-anchor="end">≈ 5 m in life, mouth to exit</text>
    <text class="blk-p" x="98" y="589" text-anchor="end" opacity=".62">folded into ~30 cm of torso</text>
  </g>
  <g class="plainonly">
    <text class="blk-h" x="98" y="548" text-anchor="end">THE LINE</text>
    <text class="blk-p" x="98" y="570" text-anchor="end">About five metres of it</text>
    <text class="blk-p" x="98" y="589" text-anchor="end" opacity=".62">folded into a foot of torso</text>
  </g>

  <!-- instrumentation: reads the plant, is not part of it -->
  <path class="leader" d="M540 592 L756 592" style="stroke-dasharray:3 4"/>
  <text class="blk-h" x="540" y="560">INSTRUMENTATION</text>
  <text class="dimtext techonly"  x="540" y="580" opacity=".85">NOT PART OF THE LINE</text>
  <text class="dimtext plainonly" x="540" y="580" opacity=".85">Measures, not plumbing.</text>

  ${nominal ? `
  <rect class="stamp" x="540" y="300" width="216" height="112" style="stroke:var(--cardamom)"/>
  <text class="stamptext" x="648" y="332" text-anchor="middle" style="fill:var(--cardamom)">All systems nominal</text>
  <text class="stamptext" x="648" y="356" text-anchor="middle" opacity=".8" style="fill:var(--cardamom)">Unattended operation</text>
  <text class="stamptext" x="648" y="380" text-anchor="middle" opacity=".8" style="fill:var(--cardamom)">80 years</text>
  <text class="blk-p"     x="648" y="402" text-anchor="middle" opacity=".5">and nobody was watching</text>
  ` : `
  <rect class="stamp" x="540" y="150" width="216" height="58"/>
  <text class="stamptext" x="648" y="174" text-anchor="middle">Control room</text>
  <text class="stamptext" x="648" y="194" text-anchor="middle" opacity=".8">Not fitted</text>

  <g class="techonly">
    <text class="blk-h" x="540" y="268">REPAIR STRATEGY</text>
    <text class="blk-p" x="540" y="290">Continuous self-replacement,</text>
    <text class="blk-p" x="540" y="309">while running. No shutdown.</text>
    <text class="blk-h" x="540" y="392">DESIGN LIFE</text>
    <text class="blk-p" x="540" y="414">~80 years, unattended</text>
  </g>
  <g class="plainonly">
    <text class="blk-h" x="540" y="268">IT REBUILDS ITSELF</text>
    <text class="blk-p" x="540" y="290">While it is running.</text>
    <text class="blk-p" x="540" y="309">It has never stopped.</text>
    <text class="blk-h" x="540" y="392">DESIGN LIFE</text>
    <text class="blk-p" x="540" y="414">About eighty years, unattended</text>
  </g>
  `}`;
}

export default {
  id: 'preface', no: '00', section: 'Orientation',

  rail:  { plain:'Start Here', tech:'Preface · The Plant' },
  title: { plain:'The Plant',  tech:'The Plant' },
  sub:   { plain:'Your body is a processing plant, and it has never once been switched off',
           tech :'Facility overview · continuous operation since commissioning' },

  drawing: { no:'MB-STN-00', rev:'A', vessel:'—',
             desc:'Facility overview', view:'Site plan' },

  modes: [
    { k:'running', label:{ plain:'Running', tech:'Continuous operation' }, fault:false,
      cap:{ plain:'<b>Running.</b> All eight stages, in series, right now. This is the default and it has no off switch — the plant has been in this state since before you could form a memory.',
            tech :'<b>Continuous operation.</b> Eight principal stages in series, no shutdown state defined. The facility has never been offline since commissioning.' } },

    { k:'postmeal', label:{ plain:'Just after a meal', tech:'Post-charge' }, fault:false,
      cap:{ plain:'<b>Just after a meal.</b> The upstream stations are all busy at once — milling, acid, refining, fermenting. Most of what you feel as "full" is happening in the first four.',
            tech :'<b>Post-charge.</b> Upstream stages loaded simultaneously: size reduction, acid hydrolysis, catalytic refining, fermentation. Peak concurrent duty.' } },

    { k:'overnight', label:{ plain:'Overnight', tech:'Fasted state' }, fault:false,
      cap:{ plain:'<b>Overnight.</b> Nothing is coming in, and the plant is still working — stores releasing, blood sugar held steady, filtering and rebuilding all night. Not eating is not the same as not working.',
            tech :'<b>Fasted state.</b> No inbound charge. Downstream stages continue: store mobilisation, glucose regulation, filtration and tissue turnover. Absence of feed is not absence of duty.' } }
  ],

  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="The whole facility drawn as a site plan, eight numbered stations on one connected line">
  <title>The whole facility drawn as a site plan, eight numbered stations on one connected line</title>
  <defs>
    <marker id="arw00" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.34)"/>
    </marker>
  </defs>

  ${facilityPlan()}

  <!-- ===== continuous operation ===== -->
  <g class="anim a-running">
    <path class="flowline" d="M200 118 L200 500"/>
    <path class="flowline" d="M214 338 L416 338"/>
    <path class="flowline" d="M430 353 L430 459"/>
  </g>

  <!-- ===== post-charge ===== -->
  <g class="anim a-postmeal">
    <path class="flowline" d="M200 118 L200 470" style="animation-duration:.8s"/>
    <path class="flowline" d="M214 338 L416 338" style="animation-duration:.8s"/>
    <circle class="hotring" cx="200" cy="158" r="19" style="opacity:1"/>
    <circle class="hotring" cx="200" cy="248" r="19" style="opacity:1;animation-delay:-.5s"/>
    <circle class="hotring" cx="200" cy="338" r="19" style="opacity:1;animation-delay:-1s"/>
    <circle class="hotring" cx="430" cy="338" r="19" style="opacity:1;animation-delay:-1.5s"/>
    <text class="blk-p" x="540" y="470" style="fill:var(--turmeric)">Upstream stages loaded,</text>
    <text class="blk-p" x="540" y="489" style="fill:var(--turmeric)">and the branch busy with them.</text>
  </g>

  <!-- ===== fasted state ===== -->
  <g class="anim a-overnight">
    <path class="flowline" d="M430 459 L430 353" style="animation-duration:2.6s"/>
    <circle class="hotring" cx="430" cy="338" r="19" style="opacity:1;stroke:var(--cardamom)"/>
    <circle class="hotring" cx="430" cy="474" r="19" style="opacity:1;stroke:var(--cardamom);animation-delay:-.8s"/>
    <text class="blk-p techonly"  x="540" y="470" style="fill:var(--cardamom)">No inbound charge.</text>
    <text class="blk-p plainonly" x="540" y="470" style="fill:var(--cardamom)">Nothing coming in.</text>
    <text class="blk-p" x="540" y="489" opacity=".62">Stores releasing, blood sugar held,</text>
    <text class="blk-p" x="540" y="508" opacity=".62">filtering and rebuilding all night.</text>
  </g>

  <!-- myth annotation: the tennis-court claim is about the refinery -->
  <g class="mythonly">
    <circle class="hazard" cx="200" cy="338" r="38"/>
    <path class="scribble" d="M178 318 L222 358 M222 318 L178 358"/>
    <path class="leader" d="M226 372 L238 596 L244 596" style="stroke:var(--chilli)"/>
    <text class="hazardtext" x="250" y="596">"Surface area of a tennis court"</text>
    <text class="hazardtext" x="250" y="616" opacity=".75">— nearer half a badminton court</text>
  </g>

  <!-- feed / discharge tags -->
  <text class="dimtext techonly"  x="236" y="96">▼ FEED — composition unknown</text>
  <text class="dimtext plainonly" x="236" y="96">▼ Whatever you decided was food</text>
  <text class="dimtext techonly"  x="236" y="548">▼ DISCHARGE</text>
  <text class="dimtext plainonly" x="236" y="548">▼ Out</text>
</svg>`,

  main: {
    plain: {
      kicker: 'The short version',
      points: [
        { h:'It has never been switched off.', p:'Commissioned at birth, no trials, no shakedown period, and no shutdown since. It is running right now while you read this.' },
        { h:'Nobody is at the controls.', p:'Most regulation is automatic: local loops, nerves, hormones and central integration keep negotiating while your attention is elsewhere.' },
        { h:'It rebuilds itself while running.', p:'Components are replaced continuously, during operation, out of the material currently being processed.' },
        { h:'The feedstock spec is: anything.', p:'Composition varies without notice, several times a day, and the plant is never told in advance.' },
        { h:'Eight stages, five metres, one torso.', p:'In life the gut is roughly five metres end to end, with considerable variation, folded into about thirty centimetres of you.' }
      ],
      note: '<b>Start here.</b> No industrial plant on earth is built this way. Every real refinery has a control room, a maintenance schedule, planned shutdowns and a documented feedstock spec. This one has none of those, accepts unknown material several times a day, rebuilds its own walls while operating, and has never been switched off. That is the thing worth being amazed by — not any single organ, but that it keeps running while you pay it no attention at all.'
    },
    tech: {
      kicker: 'Facility Datasheet',
      spec: [
        { k:'Commissioned',        v:'At birth. No commissioning trials, no shakedown period.' },
        { k:'Operating schedule',  v:'Continuous. No shutdown, no maintenance window, no operator.' },
        { k:'Feedstock',           v:'Anything you decide is food. Composition varies without notice.' },
        { k:'Throughput',          v:'Roughly a tonne of material per year' },
        { k:'Process line length', v:'~5 m oro-anal in vivo; considerable variation' },
        { k:'Absorptive surface',  v:'<em>~30 m²</em>, refinery section' },
        { k:'Stages',              v:'8 principal, plus continuous chemical processing downstream' },
        { k:'Control system',      v:'Distributed + hierarchical: local, neural, endocrine and central loops' },
        { k:'Repair strategy',     v:'Continuous self-replacement while running' },
        { k:'Design life',         v:'<em>~80 years</em>, unattended' }
      ],
      note: '<b>Design note.</b> No industrial plant on earth is built this way. Every real refinery has a control room, a maintenance schedule, planned shutdowns, and a documented feedstock spec. This one has none of those, accepts unknown material several times a day, rebuilds its own walls while operating, and has never been switched off.',
      analogy: {
        tag: 'Engineering analogue',
        body: 'A chemical processing plant, in the specific sense that it takes heterogeneous raw material, reduces it, reacts it, separates what is useful from what is not, distributes the products, and disposes of the residue. The difference is that a plant is built once and then maintained. This one is built continuously, out of the material it processes.'
      }
    }
  },

  modelLimits: [
    'The control-room metaphor is deliberately incomplete. The body has central integration in the brain and endocrine system as well as enormous local autonomy; there is no single master controller analogous to an industrial operator.',
    'The ~5 m line length is an in-vivo average with large individual variation. Relaxed or post-mortem measurements, especially of small bowel, are much longer.'
  ],

  myth: {
    claim: 'Your small intestine has the surface area of a tennis court.',
    mechanism: [
      'Everybody repeats this, including a lot of textbooks. It came from an early estimate that multiplied out the folds, villi and microvilli on idealised geometry. When Helander and Fändriks did the measurement properly in 2014 using actual human tissue, the answer came out around 30 m² — more like a large living room than a tennis court.',
      'The correction does not make the organ less impressive. Around thirty square metres is still an enormous sheet of chemically active membrane folded into your abdomen. It makes the point that a number repeated confidently for decades can simply be wrong, and that finding this out is science working, not science failing.'
    ],
    whySurvives: 'Because it is a good line. Tennis court is vivid, memorable, and quotable, and nobody who repeats it has any reason to check. Most nutrition folklore propagates for exactly this reason — not because anyone is lying, but because a good sentence travels faster than a correction.'
  }
};
