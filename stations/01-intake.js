/* ============================================================
   STATION 01 — INTAKE & WET MILL (mouth, pharynx, oesophagus)
   Sagittal section, subject facing the viewer's left. The airway
   crossing is a front-to-back relationship and cannot be shown in
   an anterior view; the station has no left/right asymmetry, so
   §D0's rule is not at risk. Title block states the view honestly.
   Anterior is to the LEFT: trachea in front, oesophagus behind.
   ============================================================ */

export default {
  id: 'intake', no: '01', section: 'Digestive Train',

  rail:  { plain:'Mouth',     tech:'Intake & Wet Mill' },
  title: { plain:'The Mouth', tech:'Intake & Wet Mill' },
  sub:   { plain:'Where food gets smaller, wetter, and safely aimed',
           tech :'Vessel M-01 · size reduction, dosing, and a swallow interlock' },

  drawing: { no:'MB-STN-01', rev:'A', vessel:'M-01',
             desc:'Wet mill with dosing', view:'Sagittal section' },

  /* ---------------- hotspots ----------------
     Markers and drawing labels only. The prose that used to live here now
     sits in main.*.points, keyed by `k`, so each component is described
     once and the panel and the drawing are the same list. */
  hotspots: [
    { k:'crusher',  n:1, plain:{ name:'The Crusher',        fn:'Breaks food into smaller bits' },
                         tech :{ name:'Dentition',          fn:'Size reduction · several hundred N' } },
    { k:'dosing',   n:2, plain:{ name:'The Wetting Jets',   fn:'Adds spit, on demand' },
                         tech :{ name:'Salivary glands',    fn:'Dosing line · 0.5–1.5 L/day' } },
    { k:'qc',       n:3, plain:{ name:'The Taste Check',    fn:'A fast, rough quality check' },
                         tech :{ name:'Tongue',             fn:'QC sensor · five-channel assay' } },
    { k:'diverter', n:4, plain:{ name:'The Airway Interlock', fn:'Protects the air pipe as you swallow' },
                         tech :{ name:'Airway protection',  fn:'Coordinated laryngeal closure' } },
    { k:'conveyor', n:5, plain:{ name:'The Conveyor',       fn:'Squeezes food down, 8–10 seconds' },
                         tech :{ name:'Oesophagus',         fn:'Peristaltic conveyor · 2–4 cm/s' } }
  ],

  /* ---------------- process modes ---------------- */
  modes: [
    { k:'chew', label:{ plain:'Chewing', tech:'Milling' }, fault:false,
      cap:{ plain:'<b>Chewing.</b> The crusher works and the jets dose. Most of the action is mechanical, while salivary chemistry has already begun on starch.',
            tech :'<b>Milling.</b> Size reduction with simultaneous dosing at 0.5–1.5 L/day. No particle-size target: the transfer reflex fires on bolus cohesion, not on a spec.' } },

    { k:'swallow', label:{ plain:'Swallowing', tech:'Transfer cycle' }, fault:false,
      cap:{ plain:'<b>Swallowing.</b> The airway closes in a coordinated sequence and the wave carries the mouthful down. The whole thing takes seconds and you do not think about any of it.',
            tech :'<b>Transfer cycle.</b> Laryngeal closure protects the airway while a peristaltic wave conveys the bolus down the oesophagus. Typical transit is on the order of seconds.' } },

    { k:'inverted', label:{ plain:'Upside down', tech:'Inverted transfer' }, fault:false,
      cap:{ plain:'<b>Upside down.</b> Gravity is now pulling the wrong way and the mouthful still arrives. The tube squeezes it along — it was never falling in the first place.',
            tech :'<b>Inverted transfer.</b> Gravity is opposed, but peristalsis can still convey the bolus. Orientation is not required for transfer, although it can alter transit dynamics.' } },

    { k:'aspirate', label:{ plain:'Gone down the wrong way', tech:'Diverter mistiming' }, fault:true,
      cap:{ plain:'<b>Gone down the wrong way.</b> The gate mistimes, a bit of food enters the air pipe, and the cough reflex fires. Violent, effective, and entirely involuntary.',
            tech :'<b>Airway-protection failure.</b> Closure is incomplete or mistimed and material enters the airway. Recovery is often by cough reflex — violent, effective, involuntary.' } }
  ],

  /* ---------------- the drawing ---------------- */
  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="The mouth, throat and food pipe drawn as an industrial wet mill, sagittal section">
  <title>The mouth, throat and food pipe drawn as an industrial wet mill, sagittal section</title>
  <defs>
    <marker id="arw01" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.34)"/>
    </marker>
    <marker id="grav01" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 Z" fill="var(--steel)"/>
    </marker>
    <!-- the bolus travels mouth → pharynx → pipe, so it must be clipped to
         all three, not just the pipe it ends up in -->
    <clipPath id="swallowClip">
      <path d="M62 130 C140 118 246 142 302 178 L302 288 C244 306 140 310 62 290 Z"/>
      <path d="M302 146 C368 154 424 190 430 244 C435 292 430 322 426 340 L306 340 C302 320 302 210 302 146 Z"/>
      <rect x="374" y="340" width="50" height="262"/>
    </clipPath>
    <clipPath id="misrouteClip">
      <path d="M62 130 C140 118 246 142 302 178 L302 288 C244 306 140 310 62 290 Z"/>
      <path d="M302 146 C368 154 424 190 430 244 C435 292 430 322 426 340 L306 340 C302 320 302 210 302 146 Z"/>
      <rect x="306" y="340" width="46" height="262"/>
    </clipPath>
    <clipPath id="cavityClip">
      <path d="M62 130 C140 118 246 142 302 178 L302 288 C244 306 140 310 62 290 Z"/>
    </clipPath>
  </defs>

  <!-- dimension line: conveyor length (Nerd Mode only) -->
  <g class="techonly">
    <line class="dimline" x1="276" y1="340" x2="276" y2="600" marker-start="url(#arw01)" marker-end="url(#arw01)"/>
    <line class="dimline" x1="276" y1="340" x2="306" y2="340"/>
    <line class="dimline" x1="276" y1="600" x2="306" y2="600"/>
    <text class="dimtext" x="270" y="470" text-anchor="end">≈ 250 mm</text>
  </g>

  <!-- air path (trachea) — anterior, so drawn to the LEFT of the material path -->
  <path class="pipe v" d="M306 340 L352 340 L352 600 L306 600 Z"/>
  <path class="vessel-inner techonly" d="M329 356 L329 586"/>

  <!-- material path (oesophagus) — posterior -->
  <path class="pipe v" d="M374 340 L424 340 L424 600 L374 600 Z"/>

  <!-- nasal passage: the air inlet, entering above the palate -->
  <path class="pipe" d="M62 96 C140 84 246 108 302 146 L302 178 C246 142 140 118 62 130 Z"/>

  <!-- pharynx: the chamber both lines pass through -->
  <path class="vessel" d="M302 146 C368 154 424 190 430 244 C435 292 430 322 426 340 L306 340 C302 320 302 210 302 146 Z"/>

  <!-- oral cavity -->
  <path class="vessel" d="M62 130 C140 118 246 142 302 178 L302 288 C244 306 140 310 62 290 Z"/>

  <!-- ===== the crossing — the whole point of this station =====
       Air runs from the nose (upper, behind) down and FORWARD to the
       windpipe. Material runs from the mouth (upper, in front) down and
       BACK to the food pipe. The two routes intersect, and one valve
       decides which is open. -->
  <g class="mechonly">
    <path class="vessel-inner" d="M366 154 C358 220 336 292 329 340" style="stroke:var(--steel); stroke-width:1.6; stroke-dasharray:5 5" />
    <path class="vessel-inner" d="M240 236 C316 250 372 296 399 340" style="stroke:var(--turmeric); stroke-width:1.6; stroke-dasharray:5 5" />
  </g>

  <!-- crusher: two tooth rows, driven in the milling cycle -->
  <g clip-path="url(#cavityClip)">
    <g class="jaw" style="--bite:10px">
      <path class="vessel" d="M96 186 L108 210 L120 186 L132 210 L144 186 L156 210 L168 186 L180 210 L192 186 L204 210 L216 186 L228 210 L240 186 L252 210 L264 186 L276 210 L288 186 L288 166 L96 166 Z"/>
    </g>
    <g class="jaw" style="--bite:-10px">
      <path class="vessel" d="M96 284 L108 260 L120 284 L132 260 L144 284 L156 260 L168 284 L180 260 L192 284 L204 260 L216 284 L228 260 L240 284 L252 260 L264 284 L276 260 L288 284 L288 304 L96 304 Z"/>
    </g>
  </g>

  <!-- QC sensor (tongue) -->
  <path class="pipe" d="M104 268 C160 256 236 256 292 264 L292 284 C236 294 160 294 104 286 Z"/>

  <!-- dosing line: glands under the jaw, ducts opening upward into the mill -->
  <ellipse class="vessel" cx="126" cy="332" rx="26" ry="17"/>
  <ellipse class="vessel" cx="208" cy="344" rx="22" ry="14"/>
  <ellipse class="vessel" cx="284" cy="352" rx="20" ry="13"/>
  <path class="leader" d="M126 315 L132 294"/>
  <path class="leader" d="M208 330 L206 298"/>
  <path class="leader" d="M284 339 L290 298"/>
  <path class="flowline" d="M132 294 L138 276"/>

  <!-- diverter valve (epiglottis), hinged at the crossing -->
  <g class="mechonly flapidle">
    <path class="vessel" d="M348 336 L352 288 L364 288 L364 336 Z"/>
  </g>

  <!-- ===== milling cycle ===== -->
  <g class="anim a-chew">
    <g clip-path="url(#cavityClip)">
      <circle class="frag-big" cx="180" cy="238" r="15"/>
      <circle class="frag-bit" cx="180" cy="238" r="3.4" style="--dx:-34px;--dy:-16px"/>
      <circle class="frag-bit" cx="180" cy="238" r="3"   style="--dx:32px;--dy:-20px;animation-delay:-.2s"/>
      <circle class="frag-bit" cx="180" cy="238" r="2.6" style="--dx:26px;--dy:22px;animation-delay:-.4s"/>
      <circle class="frag-big" cx="246" cy="244" r="11" style="animation-delay:-1.3s"/>
      <circle class="frag-bit" cx="246" cy="244" r="2.8" style="--dx:-28px;--dy:18px;animation-delay:-1.3s"/>
      <circle class="drip" cx="132" cy="292" r="4"   style="--dx:10px;--dy:-40px"/>
      <circle class="drip" cx="206" cy="296" r="3.4" style="--dx:-8px;--dy:-44px;animation-delay:-.9s"/>
      <circle class="drip" cx="290" cy="296" r="3.6" style="--dx:-16px;--dy:-38px;animation-delay:-1.6s"/>
    </g>
  </g>

  <!-- ===== transfer cycle =====
       Starts in the mouth. The valve shuts at 30% of the cycle, the bolus
       reaches the crossing at 46%, and the valve reopens at 68% once it has
       gone by. One bolus, so the sequence reads as a single swallow. -->
  <g class="anim a-swallow">
    <g class="flap" style="transform-origin:356px 336px">
      <path class="vessel" d="M348 336 L352 288 L364 288 L364 336 Z" style="fill:rgba(232,166,60,.32)"/>
    </g>
    <g clip-path="url(#swallowClip)">
      <ellipse class="bolus route" cx="180" cy="240" rx="21" ry="15"/>
    </g>
  </g>

  <!-- ===== inverted transfer ===== -->
  <g class="anim a-inverted">
    <g clip-path="url(#swallowClip)">
      <ellipse class="bolus route" cx="180" cy="240" rx="21" ry="15"/>
    </g>
    <line class="dimline" x1="470" y1="530" x2="470" y2="370" style="stroke:var(--steel); stroke-width:1.6" marker-end="url(#grav01)"/>
    <text class="dimtext" x="478" y="448" style="fill:var(--steel)">GRAVITY</text>
    <text class="dimtext" x="478" y="467" style="fill:var(--steel)" opacity=".7">opposed</text>
    <text class="dimtext techonly"  x="478" y="482">Transit persists; timing changes</text>
    <text class="dimtext plainonly" x="478" y="492">It still arrives</text>
  </g>

  <!-- ===== diverter mistiming (fault) =====
       Identical journey with the valve left open, so the bolus takes the
       air line instead. The resting valve stays visible and open — that is
       the fault. -->
  <g class="anim a-aspirate">
    <g clip-path="url(#misrouteClip)">
      <ellipse class="bolus misroute" cx="180" cy="240" rx="15" ry="11" style="fill:var(--chilli)"/>
    </g>
    <circle class="faultmark" cx="356" cy="326" r="26"/>
    <path class="leader" d="M338 346 L250 545 L236 545" style="stroke:var(--chilli)"/>
    <text class="faulttext" x="230" y="542" text-anchor="end">Valve not seated</text>
    <text class="faulttext" x="230" y="558" text-anchor="end" opacity=".75">Material in the air line</text>
  </g>

  <!-- instrument (Nerd Mode only) -->
  <g class="techonly" transform="translate(650,586)">
    <circle cx="0" cy="0" r="44" fill="none" stroke="var(--line-dim)" stroke-width="1"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="var(--line-faint)" stroke-width="1"/>
    <path d="M-30 12 A34 34 0 0 1 30 12" fill="none" stroke="var(--cardamom)" stroke-width="2.5" opacity=".55"/>
    <line class="needle" x1="0" y1="12" x2="6" y2="-22" style="stroke:var(--cardamom)" />
    <circle cx="0" cy="12" r="3" fill="var(--line)"/>
    <text class="dimtext" x="0" y="34" text-anchor="middle">0.5–1.5 L/day</text>
    <text class="dimtext" x="0" y="-30" text-anchor="middle" opacity=".6">FI-101</text>
  </g>

  <!-- myth annotation -->
  <g class="mythonly">
    <circle class="hazard" cx="180" cy="238" r="34"/>
    <path class="scribble" d="M160 224 L200 252 M200 224 L160 252"/>
    <path class="leader" d="M154 264 L110 592 L98 592" style="stroke:var(--chilli)" />
    <text class="hazardtext" x="92" y="589" text-anchor="end">"Chew it 32 times"</text>
    <text class="hazardtext" x="92" y="603" text-anchor="end" opacity=".75">— no counter fitted</text>
  </g>

  <!-- ================= HOTSPOTS ================= -->
  <g class="hot" data-k="crusher" role="button" tabindex="0" aria-label="The crusher">
    <path class="leader" d="M180 198 L250 66 L470 66"/>
    <text class="lbl-name techonly"  x="476" y="63">Dentition</text>
    <text class="lbl-name plainonly" x="476" y="63">The Crusher</text>
    <text class="lbl-fn techonly"    x="476" y="77">Size reduction · several hundred N</text>
    <text class="lbl-fn plainonly"   x="476" y="78">Breaks food into smaller bits</text>
    <circle class="hotring" cx="180" cy="198" r="10"/>
    <circle class="hithalo" cx="180" cy="198" r="22"/>
    <circle class="hotdot" cx="180" cy="198" r="10"/>
    <text class="hotnum" x="180" y="198">1</text>
  </g>

  <g class="hot" data-k="dosing" role="button" tabindex="0" aria-label="The wetting jets">
    <path class="leader" d="M126 332 L104 420 L98 420"/>
    <text class="lbl-name techonly"  x="92" y="417" text-anchor="end">Salivary glands</text>
    <text class="lbl-name plainonly" x="92" y="417" text-anchor="end">The Wetting Jets</text>
    <text class="lbl-fn techonly"    x="92" y="431" text-anchor="end">Dosing line · 0.5–1.5 L/day</text>
    <text class="lbl-fn plainonly"   x="92" y="432" text-anchor="end">Adds spit, on demand</text>
    <circle class="hotring" cx="126" cy="332" r="10"/>
    <circle class="hithalo" cx="126" cy="332" r="22"/>
    <circle class="hotdot" cx="126" cy="332" r="10"/>
    <text class="hotnum" x="126" y="332">2</text>
  </g>

  <g class="hot" data-k="qc" role="button" tabindex="0" aria-label="The taste check">
    <path class="leader" d="M198 276 L152 500 L98 500"/>
    <text class="lbl-name techonly"  x="92" y="497" text-anchor="end">Tongue</text>
    <text class="lbl-name plainonly" x="92" y="497" text-anchor="end">The Taste Check</text>
    <text class="lbl-fn techonly"    x="92" y="511" text-anchor="end">QC sensor · five-channel assay</text>
    <text class="lbl-fn plainonly"   x="92" y="512" text-anchor="end">A fast, rough quality check</text>
    <circle class="hotring" cx="198" cy="276" r="10"/>
    <circle class="hithalo" cx="198" cy="276" r="22"/>
    <circle class="hotdot" cx="198" cy="276" r="10"/>
    <text class="hotnum" x="198" y="276">3</text>
  </g>

  <g class="hot" data-k="diverter" role="button" tabindex="0" aria-label="The airway gate">
    <path class="leader" d="M372 306 L470 250 L516 250"/>
    <text class="lbl-name techonly"  x="522" y="247">Airway protection</text>
    <text class="lbl-name plainonly" x="522" y="247">The Airway Interlock</text>
    <text class="lbl-fn techonly"    x="522" y="261">Coordinated laryngeal closure</text>
    <text class="lbl-fn plainonly"   x="522" y="262">Protects the air pipe as you swallow</text>
    <circle class="hotring" cx="372" cy="306" r="10"/>
    <circle class="hithalo" cx="372" cy="306" r="22"/>
    <circle class="hotdot" cx="372" cy="306" r="10"/>
    <text class="hotnum" x="372" y="306">4</text>
  </g>

  <g class="hot" data-k="conveyor" role="button" tabindex="0" aria-label="The conveyor">
    <path class="leader" d="M399 470 L500 512 L546 512"/>
    <text class="lbl-name techonly"  x="552" y="509">Oesophagus</text>
    <text class="lbl-name plainonly" x="552" y="509">The Conveyor</text>
    <text class="lbl-fn techonly"    x="552" y="523">Peristaltic conveyor · 2–4 cm/s</text>
    <text class="lbl-fn plainonly"   x="552" y="524">Squeezes food down, 8–10 seconds</text>
    <circle class="hotring" cx="399" cy="470" r="10"/>
    <circle class="hithalo" cx="399" cy="470" r="22"/>
    <circle class="hotdot" cx="399" cy="470" r="10"/>
    <text class="hotnum" x="399" y="470">5</text>
  </g>

  <!-- feed / discharge tags -->
  <text class="dimtext techonly"  x="-84" y="156">AIR IN — nasal ▶</text>
  <text class="dimtext plainonly" x="-84" y="156">Air comes in here ▶</text>
  <text class="dimtext techonly"  x="-84" y="232">FEED — as delivered ▶</text>
  <text class="dimtext plainonly" x="-84" y="232">Food goes in here ▶</text>
  <!-- one tick per pipe, labels splayed outward. A centre-anchored "▼ …"
       puts the arrow at the string's left edge, not under the pipe, and at
       this size the two strings overlapped each other. -->
  <line class="dimline" x1="329" y1="604" x2="329" y2="628"/>
  <line class="dimline" x1="399" y1="604" x2="399" y2="628"/>
  <text class="dimtext techonly"  x="320" y="646" text-anchor="end">AIR — to lungs</text>
  <text class="dimtext plainonly" x="320" y="646" text-anchor="end">Air to the lungs</text>
  <text class="dimtext techonly"  x="408" y="646">DISCHARGE to Station 02</text>
  <text class="dimtext plainonly" x="408" y="646">Down to the stomach</text>
</svg>`,

  /* ---------------- main panel ---------------- */
  main: {
    plain: {
      kicker: 'The short version',
      points: [
        { k:'crusher', h:'Chewing is the mill.',
          p:'Chewing is size reduction. It exposes more surface to the chemistry that has already started in your saliva, and your back teeth can bite with several hundred newtons.' },
        { k:'dosing', h:'Spit is not just water.',
          p:'Half a litre to a litre and a half a day, delivered when needed. It lubricates, buffers, kills some bacteria, and carries an enzyme that starts on starch straight away — briefly, because the acid downstream stops it.' },
        { k:'qc', h:'Taste is a quick check, not a label.',
          p:'Sweet, salty, sour, bitter and umami are fast chemical clues, not an ingredient list. They tell the nervous system something about what just arrived, and they are easy to fool.' },
        { k:'diverter', h:'Your food and your air share a junction.',
          p:'The critical part. Every swallow triggers a coordinated airway-protection sequence: the larynx rises, the vocal folds close and the epiglottis folds back. Mistime that choreography and the cough reflex takes over.' },
        { k:'conveyor', h:'Swallowing is not falling.',
          p:'It does not simply drop food. A squeezing wave pushes it along a tube about 25 cm long, so swallowing can work lying down or even against gravity. Posture can still change how fast and smoothly the trip goes.' }
      ],
      note: '<b>The odd bit.</b> No engineer would ever run a food line and an air line through the same junction — it is a genuinely bad piece of plant layout. We have it because the machinery was inherited, not designed: the plumbing was laid down long before anything needed to breathe and eat and talk through the same opening. The protection sequence is a superb solution to a problem that should not exist.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',              v:'Wet mill with integrated dosing and QC' },
        { k:'Duty',               v:'Size reduction · lubrication · initial hydrolysis · safe transfer' },
        { k:'Dosing rate',        v:'<em>0.5–1.5 L/day</em>, demand-triggered' },
        { k:'Dosing pH',          v:'6.2 – 7.6' },
        { k:'Catalyst',           v:'Salivary amylase — begins on starch, largely denatured at Station 02' },
        { k:'Transfer time',      v:'Seconds, <em>not gravity-dependent</em>' },
        { k:'Transfer mechanism', v:'Peristaltic wave, ~2–4 cm/s' },
        { k:'Particle spec',      v:'No fixed target. The reflex fires on bolus cohesion.' },
        { k:'Failure mode',       v:'Airway-protection mistiming. Recovery: violent, effective, involuntary.' }
      ],
      points: [
        { k:'crusher', h:'Dentition',
          p:'Mechanical size reduction. Smaller particles expose more area to enzymes; the exact rate change depends on particle geometry and mixing. Molar bite force runs to several hundred newtons.' },
        { k:'dosing', h:'Salivary glands',
          p:'Demand-triggered dosing at 0.5–1.5 L/day, carrying amylase, lubricant, buffer and antimicrobials. The amylase acts on starch immediately; most of it is denatured by the acid at Station 02.' },
        { k:'qc', h:'Tongue',
          p:'A crude, fast assay: sweet receptors respond to sugars and other sweet molecules; salt to sodium ions; sour to acidity; umami especially to glutamate and nucleotides; bitter to a broad range of compounds. Useful signal, not composition analysis.' },
        { k:'diverter', h:'Airway protection',
          p:'Not a single flap-valve: safe swallowing coordinates true-vocal-fold closure, laryngeal elevation, epiglottic inversion and pressure changes around the bolus. Failure of that sequence can allow penetration or aspiration.' },
        { k:'conveyor', h:'Oesophagus',
          p:'A peristaltic tube roughly 25 cm long. Transfer is driven by coordinated wall contraction rather than gravity alone. Swallowing can work inverted, although posture measurably affects transit and pressure.' }
      ],
      note: '<b>Design note.</b> No engineer would route a food line and an air line through the same junction. It is an appalling piece of plant layout that would fail any design review. We have it because the machinery is inherited, not designed — the plumbing was laid down long before anything needed to breathe and eat and talk through the same opening.',
      analogy: {
        tag: 'What it actually resembles',
        body: 'A peristaltic pump, the kind used in dialysis machines and laboratory dosing rigs. It moves fluid by squeezing the outside of a flexible tube, so nothing mechanical ever touches the material and gravity is not doing the work. This is why you can drink a glass of water lying down.'
      }
    }
  },

  myth: {
    claim: 'Chew every mouthful thirty-two times.',
    mechanism: [
      'There is no evidence for thirty-two, or for any specific number. The figure traces back to Victorian-era diet advocacy, not to physiology. The mill has no counter.',
      "What chewing actually does is reduce particle size and mix in lubricant until the material is cohesive enough to trigger the swallow reflex — which fires on its own, when it's ready, whether you counted or not. A soft idli needs a handful of chews. A mouthful of raw carrot needs many more. The correct number is \"until it's ready,\" which your jaw already knows.",
      'There is a modest real finding underneath: slower eating can reduce intake for some people. But there is no magic twenty-minute satiety timer; signals from the mouth, stomach, intestine and brain overlap throughout a meal. That is an argument for pace, not arithmetic.'
    ],
    whySurvives: 'Because a number feels like knowledge. "Chew thoroughly" is advice; "chew thirty-two times" sounds like a finding. Precision is persuasive even when it is invented, which is a pattern you will see at every remaining station.'
  }
};
