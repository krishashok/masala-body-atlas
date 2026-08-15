/* ============================================================
   STATION 03 — THE MAIN REFINERY (small intestine)
   Anterior view (§D0). Feed arrives from Station 02's pylorus at the
   upper LEFT, the duodenal C sweeps right around the pancreas head,
   the coil fills the frame, and discharge to the caecum leaves at the
   lower LEFT — the patient's right lower quadrant.
   ============================================================ */

/* The process line, authored once and stroked three times (wall/bore/tint)
   and again as the flow indication. */
const LINE = 'M170 100 C242 104 298 134 316 180 C330 218 318 254 288 272 C252 292 196 290 156 288 C150 292 150 296 150 300 L500 300 A28 28 0 0 1 500 356 L150 356 A28 28 0 0 0 150 412 L500 412 A28 28 0 0 1 500 468 L96 468';

export default {
  id: 'refinery', no: '03', section: 'Digestive Train',

  rail:  { plain:'Small Intestine',     tech:'Main Refinery' },
  title: { plain:'The Small Intestine', tech:'The Main Refinery' },
  sub:   { plain:'This station makes the food into part of your body.',
           tech :'Vessel R-03 · the station makes the feedstock into your tissue' },

  drawing: { no:'MB-STN-03', rev:'A', vessel:'R-03',
             desc:'Continuous-flow reactor', view:'Anterior view' },

  /* ---------------- hotspots ---------------- */
  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'neutralise', n:1, plain:{ name:'The Acid Fix', fn:'It removes the stomach acid quickly' },
                      tech :{ name:'Neutralisation zone', fn:'Duodenum · pH 2 to pH 6 or 7' } },
    { k:'bile', n:2, plain:{ name:'The Detergent Line', fn:'It breaks the fat into droplets' },
                tech :{ name:'Emulsifier injection', fn:'Bile · the body stores it and supplies it when necessary' } },
    { k:'catalyst', n:3, plain:{ name:'The Enzyme Line', fn:'It supplies all three tool types together' },
                    tech :{ name:'Catalyst injection', fn:'Pancreas · amylase, proteases and lipase' } },
    { k:'surface', n:4, plain:{ name:'The Folded Surface', fn:'Folds carry smaller folds' },
                   tech :{ name:'Surface amplification', fn:'Villi and microvilli · approximately 30 m²' } },
    { k:'turnstiles', n:5, plain:{ name:'The Border Control', fn:'The wall has several routes through it' },
                      tech :{ name:'Selective membrane', fn:'Carriers, channels and diffusion' } }
  ],

  modes: [
    { k:'flow', label:{ plain:'Normal flow', tech:'Normal flow' }, fault:false,
      cap:{ plain:'<b>Normal flow.</b> The material moves along the tube at a steady rate. The station removes the acid, adds the enzymes, and moves the useful parts through the wall. The material needs two to six hours to pass through.',
            tech :'<b>Normal flow.</b> The station operates continuously. It neutralises the acid when the material arrives, adds the catalysts, and absorbs selected molecules through the wall. The material stays in the station for 2 to 6 hours.' } },

    { k:'fatty', label:{ plain:'Fatty meal', tech:'Emulsification' }, fault:false,
      cap:{ plain:'<b>Fatty meal.</b> The bile line opens. The bile breaks the fat into small droplets. The enzymes can then reach the fat. If this step does not occur, the fat stays as one mass and the enzymes cannot reach it.',
            tech :'<b>Emulsification.</b> Sensors find the fat, and the gallbladder releases the bile. The bile breaks the fat into droplets, and the lipase can then reach them. Without the bile the contact area is too small.' } },

    { k:'closeup', label:{ plain:'Close up', tech:'Detail view' }, fault:false,
      cap:{ plain:'<b>Close up.</b> Look at the wall closely. It is not a smooth tube. Folds carry fringes, and those fringes carry smaller fringes. The membrane gives a different route to each type of molecule.',
            tech :'<b>Detail view.</b> The folds increase the surface area, and the membrane selects the molecules. Two windows show the detail. The first shows the shape of the wall. The second shows one membrane and its carriers.' } },

    { k:'lactose', label:{ plain:'Lactose not absorbed', tech:'Uptake shortfall' }, fault:true,
      cap:{ plain:'<b>Lactose not absorbed.</b> The enzyme that divides this sugar is absent, so the sugar cannot cross the wall. It continues to Station 04. The microbes there ferment it, and this makes the gas and the pain.',
            tech :'<b>Uptake shortfall.</b> Lactase is absent, so the station cannot divide the sugar and the sugar cannot cross the wall. It passes to Station 04 as substrate for fermentation. The symptoms occur downstream. Water movement and microbial fermentation cause them.' } }
  ],

  /* ---------------- the drawing ---------------- */
  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="The small intestine drawn as a folded continuous-flow refinery, anterior view">
  <title>The small intestine drawn as a folded continuous-flow refinery, anterior view</title>
  <defs>
    <marker id="arw03" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.34)"/>
    </marker>
  </defs>

  <!-- dimension line: developed length (Nerd Mode only) -->
  <g class="techonly">
    <line class="dimline" x1="76" y1="300" x2="76" y2="468" marker-start="url(#arw03)" marker-end="url(#arw03)"/>
    <line class="dimline" x1="76" y1="300" x2="116" y2="300"/>
    <line class="dimline" x1="76" y1="468" x2="116" y2="468"/>
    <text class="dimtext" x="70" y="380" text-anchor="end">≈ 3 m in life</text>
    <text class="dimtext" x="70" y="399" text-anchor="end" opacity=".6">6–7 m relaxed</text>
  </g>

  <!-- ===== the process line ===== -->
  <path class="run wall" d="${LINE}"/>
  <path class="run bore" d="${LINE}"/>
  <path class="run tint" d="${LINE}"/>
  <path class="run gloss" d="${LINE}"/>

  <!-- emulsifier: gallbladder and its duct -->
  <ellipse class="vessel" cx="128" cy="140" rx="25" ry="16"/>
  <path class="pipe" d="M152 146 C198 155 252 168 302 186 L299 194 C250 176 197 163 151 154 Z"/>

  <!-- catalyst: pancreas and its duct -->
  <path class="vessel" d="M350 214 C398 190 456 176 514 182 C522 192 520 204 508 210 C456 216 398 230 352 226 Z"/>
  <path class="pipe" d="M350 208 C342 204 336 200 330 194 L327 202 C334 208 341 212 349 216 Z"/>

  <!-- ===== normal flow ===== -->
  <g class="anim a-flow">
    <path class="flowline" d="${LINE}"/>
    <circle class="chyme"   cx="300" cy="300" r="5"   style="animation-delay:-.4s"/>
    <circle class="chyme b" cx="380" cy="356" r="4"   style="animation-delay:-2.1s"/>
    <circle class="chyme"   cx="250" cy="412" r="4.5" style="animation-delay:-3.4s"/>
    <circle class="chyme b" cx="330" cy="468" r="3.6" style="animation-delay:-1.2s"/>
  </g>

  <!-- ===== emulsification ===== -->
  <g class="anim a-fatty">
    <path class="flowline" d="M152 150 C198 159 252 172 300 190"/>
    <circle class="frag-big" cx="330" cy="300" r="14"/>
    <circle class="frag-bit" cx="330" cy="300" r="3.4" style="--dx:-30px;--dy:-10px"/>
    <circle class="frag-bit" cx="330" cy="300" r="3"   style="--dx:34px;--dy:-8px;animation-delay:-.2s"/>
    <circle class="frag-bit" cx="330" cy="300" r="2.8" style="--dx:24px;--dy:12px;animation-delay:-.4s"/>
    <circle class="frag-big" cx="420" cy="300" r="10" style="animation-delay:-1.3s"/>
    <circle class="frag-bit" cx="420" cy="300" r="2.8" style="--dx:-26px;--dy:12px;animation-delay:-1.3s"/>
  </g>

  <!-- ===== detail view ===== -->
  <g class="anim a-closeup">
    <path class="insetline" d="M260 481 L260 540"/>
    <path class="insetline" d="M430 481 L560 540"/>

    <!-- detail A: the wall, folded and fringed -->
    <rect class="inset" x="150" y="540" width="270" height="130"/>
    <text class="dimtext techonly"  x="162" y="560">DETAIL A — WALL GEOMETRY</text>
    <text class="dimtext plainonly" x="162" y="560">THE WALL, CLOSE UP</text>
    <path class="fringe" d="M162 640 C186 606 210 640 234 606 C258 640 282 606 306 640 C330 606 354 640 378 606 C396 632 404 640 408 636"/>
    <path class="fringe" d="M164 612 L164 592 M172 608 L172 588 M180 612 L180 592 M188 604 L188 584 M196 608 L196 588
                            M204 600 L204 580 M212 604 L212 584 M220 596 L220 576 M228 604 L228 584 M236 608 L236 588
                            M244 612 L244 592 M252 616 L252 596 M260 612 L260 592 M268 608 L268 588 M276 612 L276 592
                            M284 616 L284 596 M292 608 L292 588 M300 600 L300 580 M308 604 L308 584 M316 596 L316 576
                            M324 604 L324 584 M332 608 L332 588 M340 600 L340 580 M348 608 L348 588 M356 616 L356 596
                            M364 612 L364 592 M372 604 L372 584 M380 608 L380 588 M388 616 L388 596 M396 622 L396 602"/>
    <text class="lbl-fn" x="162" y="658">folds, fringes and smaller fringes</text>

    <!-- detail B: one membrane, one carrier per molecule -->
    <rect class="inset" x="440" y="540" width="300" height="130"/>
    <text class="dimtext techonly"  x="452" y="560">DETAIL B — MEMBRANE</text>
    <text class="dimtext plainonly" x="452" y="560">ONE GATE, CLOSE UP</text>
    <line class="fringe" x1="452" y1="612" x2="728" y2="612"/>
    <line class="fringe" x1="452" y1="628" x2="728" y2="628"/>
    <rect class="turnstile" x="502" y="606" width="16" height="28"/>
    <rect class="turnstile" x="580" y="606" width="16" height="28"/>
    <rect class="turnstile" x="658" y="606" width="16" height="28"/>
    <circle class="frag-bit" cx="588" cy="648" r="4.5" style="--dx:0px;--dy:-52px"/>
    <circle class="frag-bit" cx="510" cy="648" r="4"   style="--dx:0px;--dy:-52px;animation-delay:-1.1s"/>
    <circle class="chyme b"  cx="666" cy="648" r="5" style="animation:none"/>
    <text class="lbl-fn" x="452" y="658">one carrier for each molecule · limited rate</text>
  </g>

  <!-- ===== uptake shortfall (fault) ===== -->
  <g class="anim a-lactose">
    <path class="flowline" d="${LINE}" style="stroke:var(--chilli)" />
    <circle class="faultmark" cx="300" cy="356" r="24"/>
    <path class="leader" d="M300 380 L300 505 L286 505" style="stroke:var(--chilli)" />
    <text class="faulttext" x="280" y="502" text-anchor="end">Not split, cannot cross</text>
    <text class="faulttext" x="280" y="516" text-anchor="end" opacity=".75">Passes on to Station 04</text>
  </g>

  <!-- instrument (Nerd Mode only) -->
  <g class="techonly" transform="translate(650,360)">
    <circle cx="0" cy="0" r="44" fill="none" stroke="var(--line-dim)" stroke-width="1"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="var(--line-faint)" stroke-width="1"/>
    <path d="M-30 12 A34 34 0 0 1 30 12" fill="none" stroke="var(--cardamom)" stroke-width="2.5" opacity=".55"/>
    <line class="needle" x1="0" y1="12" x2="2" y2="-22" style="stroke:var(--cardamom)" />
    <circle cx="0" cy="12" r="3" fill="var(--line)"/>
    <text class="dimtext" x="0" y="34" text-anchor="middle">pH 6 – 7</text>
    <text class="dimtext" x="0" y="-30" text-anchor="middle" opacity=".6">AI-303</text>
  </g>

  <!-- myth annotation -->
  <g class="mythonly">
    <circle class="hazard" cx="300" cy="356" r="30"/>
    <path class="scribble" d="M282 342 L318 370 M318 342 L282 370"/>
    <path class="leader" d="M300 386 L300 499 L286 499" style="stroke:var(--chilli)" />
    <text class="hazardtext" x="250" y="318" text-anchor="end">"Never mix protein and carbs"</text>
    <text class="hazardtext" x="250" y="334" text-anchor="end" opacity=".75">— all three tools, same stream</text>
  </g>

  <!-- ================= HOTSPOTS ================= -->
  <g class="hot" data-k="neutralise" role="button" tabindex="0" aria-label="The acid fix">
    <path class="leader" d="M300 150 L400 96 L470 96"/>
    <text class="lbl-name techonly"  x="476" y="93">Neutralisation zone</text>
    <text class="lbl-name plainonly" x="476" y="93">The Acid Fix</text>
    <text class="lbl-fn techonly"    x="476" y="107">Duodenum · pH 2 → 6–7</text>
    <text class="lbl-fn plainonly"   x="476" y="108">Removes the stomach acid</text>
    <circle class="hotring" cx="300" cy="150" r="10"/>
    <circle class="hithalo" cx="300" cy="150" r="22"/>
    <circle class="hotdot" cx="300" cy="150" r="10"/>
    <text class="hotnum" x="300" y="150">1</text>
  </g>

  <g class="hot" data-k="bile" role="button" tabindex="0" aria-label="The detergent line">
    <path class="leader" d="M128 140 L100 200 L94 200"/>
    <text class="lbl-name techonly"  x="88" y="197" text-anchor="end">Emulsifier injection</text>
    <text class="lbl-name plainonly" x="88" y="197" text-anchor="end">The Detergent Line</text>
    <text class="lbl-fn techonly"    x="88" y="211" text-anchor="end">Bile · supplied when needed</text>
    <text class="lbl-fn plainonly"   x="88" y="212" text-anchor="end">Breaks fat into droplets</text>
    <circle class="hotring" cx="128" cy="124" r="10"/>
    <circle class="hithalo" cx="128" cy="124" r="22"/>
    <circle class="hotdot" cx="128" cy="124" r="10"/>
    <text class="hotnum" x="128" y="124">2</text>
  </g>

  <g class="hot" data-k="catalyst" role="button" tabindex="0" aria-label="The enzyme line">
    <path class="leader" d="M430 198 L540 155 L566 155"/>
    <text class="lbl-name techonly"  x="572" y="152">Catalyst injection</text>
    <text class="lbl-name plainonly" x="572" y="152">The Enzyme Line</text>
    <text class="lbl-fn techonly"    x="572" y="166">Pancreas · 3 classes together</text>
    <text class="lbl-fn plainonly"   x="572" y="167">All three tool types together</text>
    <circle class="hotring" cx="430" cy="198" r="10"/>
    <circle class="hithalo" cx="430" cy="198" r="22"/>
    <circle class="hotdot" cx="430" cy="198" r="10"/>
    <text class="hotnum" x="430" y="198">3</text>
  </g>

  <g class="hot" data-k="surface" role="button" tabindex="0" aria-label="The folded surface">
    <path class="leader" d="M380 300 L540 240 L566 240"/>
    <text class="lbl-name techonly"  x="572" y="237">Surface amplification</text>
    <text class="lbl-name plainonly" x="572" y="237">The Folded Surface</text>
    <text class="lbl-fn techonly"    x="572" y="251">Villi and microvilli · about 30 m²</text>
    <text class="lbl-fn plainonly"   x="572" y="252">Folds carry smaller folds</text>
    <circle class="hotring" cx="380" cy="300" r="10"/>
    <circle class="hithalo" cx="380" cy="300" r="22"/>
    <circle class="hotdot" cx="380" cy="300" r="10"/>
    <text class="hotnum" x="380" y="300">4</text>
  </g>

  <g class="hot" data-k="turnstiles" role="button" tabindex="0" aria-label="The turnstiles">
    <path class="leader" d="M470 468 L556 468 L576 448"/>
    <text class="lbl-name techonly"  x="582" y="445">Selective membrane</text>
    <text class="lbl-name plainonly" x="582" y="445">The Border Control</text>
    <text class="lbl-fn techonly"    x="582" y="459">Carriers, channels, diffusion</text>
    <text class="lbl-fn plainonly"   x="582" y="460">Several routes through the wall</text>
    <circle class="hotring" cx="470" cy="468" r="10"/>
    <circle class="hithalo" cx="470" cy="468" r="22"/>
    <circle class="hotdot" cx="470" cy="468" r="10"/>
    <text class="hotnum" x="470" y="468">5</text>
  </g>

  <!-- feed / discharge tags -->
  <text class="dimtext techonly"  x="190" y="44">▼ FEED — acid chyme, Station 02</text>
  <text class="dimtext plainonly" x="190" y="44">▼ Acid mush from the stomach</text>
  <text class="dimtext techonly"  x="40" y="494" text-anchor="end">◀ TO STATION 04</text>
  <text class="dimtext plainonly" x="68" y="494" text-anchor="end">◀ To the gut microbes</text>
</svg>`,

  /* ---------------- main panel ---------------- */
  main: {
    plain: {
      kicker: 'Summary',
      points: [
        { h:'This station does most of the work.', p:'People give the stomach the reputation. Almost all the food that you have eaten became part of your body here, across this surface.' },
        { k:'neutralise', h:'The station removes the acid quickly.',
          p:'The material from the stomach is strongly acidic. Bicarbonate raises the pH quickly. The enzymes from the pancreas and the wall then operate at their best pH. This is a large change, and the station makes it continuously in a moving stream.' },
        { k:'bile', h:'Bile is a detergent.',
          p:'Fat and water do not mix. This is a problem, because the enzymes are in water and the fat is not. Bile breaks the fat into small droplets, and the enzymes can then reach them. Dish soap does the same thing to a greasy pan.' },
        { k:'catalyst', h:'The station handles all the food types together.',
          p:'One enzyme acts on the starch, other enzymes act on the protein, and another acts on the fat. The station supplies all of them into the same stream at the same time. It has always operated in this manner.' },
        { k:'surface', h:'The Folded Surface',
          p:'Folds carry fringes, and those fringes carry smaller fringes. The fins on a radiator use the same method. Both put the largest contact area into the smallest space. This makes a plain tube into a working surface.' },
        { k:'turnstiles', h:'The wall selects what crosses it.',
          p:'The wall does not use one type of gate. Many nutrients use a carrier or a channel that is specific to them. Others move through the cells, or between them. The route depends on the molecule.' }
      ],
      note: '<b>Summary.</b> People give Station 02 the reputation. This station does most of the digestion and most of the absorption. Food goes into the stomach. This station makes it into part of your body.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',              v:'A continuous-flow catalytic reactor. It has a membrane that separates selected molecules.' },
        { k:'Duty',               v:'It neutralises the acid, breaks down the food, emulsifies the fat and absorbs selected molecules.' },
        { k:'Length',             v:'Approximately 3 m in a living person. Approximately 6 to 7 m when the muscle is relaxed.' },
        { k:'Absorptive surface', v:'<em>~30 m²</em>' },
        { k:'Inlet pH',           v:'~2' },
        { k:'Operating pH',       v:'6 to 7. The station corrects the pH when the material arrives.' },
        { k:'Catalysts',          v:'Amylase, proteases and lipase. The pancreas supplies them; they do not stay in the tube.' },
        { k:'Surfactant',         v:'Bile salts. The body recovers them and uses them again.' },
        { k:'Residence time',     v:'2 – 6 h' },
        { k:'Uptake duty',        v:'<em>Approximately 95%</em> of the available macronutrient.' },
        { k:'Selectivity',        v:'Carriers, channels, diffusion through the cells, and routes between the cells.' }
      ],
      points: [
        { k:'neutralise', h:'Neutralisation zone',
          p:'Acidic material arrives from Station 02. Secretions that contain bicarbonate raise the pH to approximately 6 or 7. Most enzymes from the pancreas need this pH. The change occurs quickly, and the stream continues to move.' },
        { k:'bile', h:'Emulsifier injection',
          p:'Fat and water do not mix. This is a serious process problem, because the catalysts dissolve in water and the feedstock does not. Bile is a detergent. It breaks the fat into droplets that lipase can reach. The liver makes the bile. The gallbladder stores it and concentrates it, then releases it when the station needs it.' },
        { k:'catalyst', h:'Catalyst injection',
          p:'Amylase acts on the carbohydrate, proteases act on the protein, and lipase acts on the fat. The pancreas supplies all of them into the same stream at the same time. The station has always processed the macronutrients together.' },
        { k:'surface', h:'Surface amplification',
          p:'Folds carry fringes, and those fringes carry smaller fringes. The fins on a heat exchanger use the same method. Both put the largest contact area into the smallest volume. This makes a tube into a processing surface.' },
        { k:'turnstiles', h:'Selective membrane',
          p:'The wall uses several routes. These are active transport, facilitated transport, channels, diffusion through the cells and movement between the cells. Many carriers have a maximum rate, and the body controls them. A molecule does not always need a carrier of its own.' }
      ],
      note: '<b>Design note.</b> This is the principal stage for digestion and absorption. Transporters, channels, the permeability of the membrane, and the routes between the cells together select what crosses. There is not one gate for each molecule.',
      analogy: {
        tag: 'Process analogue',
        body: 'A catalytic reactor with a membrane that separates selected molecules. The station corrects the pH of the feedstock and adds the catalysts. A surfactant holds the fat in the water. The products then cross a membrane that admits some molecules and refuses others. Chemical engineers build each of these steps in a separate vessel. This station does all the steps at the same time, in a moving stream, in a soft tube.'
      }
    }
  },

  modelLimits: [
    'The gate in the drawing is a simplification. The intestine absorbs material through active carriers, facilitated carriers, channels, diffusion through the cells, and routes between the cells.',
    'The wall puts long-chain fat into chylomicrons. Most of this fat leaves through the lymph of the intestine, and it enters the blood after that.'
  ],

  /* ---------------- myth ---------------- */
  myth: {
    claim: 'Do not eat protein and carbohydrate together. The body cannot digest both at the same time.',
    mechanism: [
      'The body can digest both, and it has always done so. Amylase, proteases and lipase enter the same length of intestine. They act on different substrates at the same time. A mixed meal is a usual operating condition.',
      'This idea comes from food-combining systems of the early twentieth century. Those systems used one true fact: different enzymes operate best at different pH. This is true in a test tube. It is not a reason to separate the foods. The gut makes the necessary pH at each location, and it releases several enzymes into the same mixed meal.',
      'You also have some thousands of years of practical evidence: dal with rice, roti with sabzi, idli with sambar. Almost all human food is a mixed meal. Controlled studies show no advantage in digestion when a person separates the protein from the carbohydrate.'
    ],
    whySurvives: 'It makes a complicated system into a simple rule. A rule is easier to obey than a mechanism is to understand. Almost every food fear that you know is a true but narrow fact that somebody made into a universal law.'
  }
};
