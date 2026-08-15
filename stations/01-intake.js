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
  sub:   { plain:'The station makes the food smaller and wetter, then sends it to the correct pipe.',
           tech :'Vessel M-01 · the station reduces the size, adds fluid and protects the airway' },

  drawing: { no:'MB-STN-01', rev:'A', vessel:'M-01',
             desc:'Wet mill with dosing', view:'Sagittal section' },

  /* ---------------- hotspots ----------------
     Markers and drawing labels only. The prose that used to live here now
     sits in main.*.points, keyed by `k`, so each component is described
     once and the panel and the drawing are the same list. */
  hotspots: [
    { k:'crusher',  n:1, plain:{ name:'The Crusher',        fn:'It breaks the food into small pieces' },
                         tech :{ name:'Dentition',          fn:'It reduces the size · several hundred N' } },
    { k:'dosing',   n:2, plain:{ name:'The Wetting Jets',   fn:'It adds saliva when necessary' },
                         tech :{ name:'Salivary glands',    fn:'Dosing line · 0.5 to 1.5 L each day' } },
    { k:'qc',       n:3, plain:{ name:'The Taste Check',    fn:'It makes a quick check of the material' },
                         tech :{ name:'Tongue',             fn:'Sensor · it measures five channels' } },
    { k:'diverter', n:4, plain:{ name:'The Airway Interlock', fn:'It protects the air pipe when you swallow' },
                         tech :{ name:'Airway protection',  fn:'The larynx closes in sequence' } },
    { k:'conveyor', n:5, plain:{ name:'The Conveyor',       fn:'It pushes the food down in 8 to 10 seconds' },
                         tech :{ name:'Oesophagus',         fn:'Conveyor · 2 to 4 cm each second' } }
  ],

  /* ---------------- process modes ---------------- */
  modes: [
    { k:'chew', label:{ plain:'Chewing', tech:'Milling' }, fault:false,
      cap:{ plain:'<b>Chewing.</b> The teeth break the food and the glands add saliva. The teeth do most of the work. The saliva has already started to break down the starch.',
            tech :'<b>Milling.</b> The teeth reduce the size of the material. The glands add 0.5 to 1.5 L of saliva each day at the same time. There is no target particle size. The swallow reflex starts when the material holds together.' } },

    { k:'swallow', label:{ plain:'Swallowing', tech:'Transfer cycle' }, fault:false,
      cap:{ plain:'<b>Swallowing.</b> The airway closes in a sequence. A wave of muscle then carries the food down. The full sequence takes a few seconds, and you give it no attention.',
            tech :'<b>Transfer cycle.</b> The larynx closes and protects the airway. A wave of muscle then moves the food down the oesophagus. The transfer takes a few seconds.' } },

    { k:'inverted', label:{ plain:'Upside down', tech:'Inverted transfer' }, fault:false,
      cap:{ plain:'<b>Upside down.</b> Gravity now pulls in the wrong direction, but the food still arrives. The tube pushes the food along it. The food does not fall down the tube.',
            tech :'<b>Inverted transfer.</b> Gravity opposes the movement, but the wave of muscle still moves the food. The transfer does not need a specific body position. The position can change the speed.' } },

    { k:'aspirate', label:{ plain:'Gone down the wrong way', tech:'Diverter mistiming' }, fault:true,
      cap:{ plain:'<b>Gone down the wrong way.</b> The valve closes at the wrong time. A small quantity of food enters the air pipe. The cough reflex then starts. It is strong, it is effective, and you do not control it.',
            tech :'<b>Airway-protection failure.</b> The airway does not close fully, or it closes at the wrong time. Material then enters the airway. The cough reflex usually removes it. The reflex is strong and you do not control it.' } }
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
    <text class="lbl-fn techonly"    x="476" y="77">Reduces size · several hundred N</text>
    <text class="lbl-fn plainonly"   x="476" y="78">Breaks food into small pieces</text>
    <circle class="hotring" cx="180" cy="198" r="10"/>
    <circle class="hithalo" cx="180" cy="198" r="22"/>
    <circle class="hotdot" cx="180" cy="198" r="10"/>
    <text class="hotnum" x="180" y="198">1</text>
  </g>

  <g class="hot" data-k="dosing" role="button" tabindex="0" aria-label="The wetting jets">
    <path class="leader" d="M126 332 L104 420 L98 420"/>
    <text class="lbl-name techonly"  x="92" y="417" text-anchor="end">Salivary glands</text>
    <text class="lbl-name plainonly" x="92" y="417" text-anchor="end">The Wetting Jets</text>
    <text class="lbl-fn techonly"    x="92" y="431" text-anchor="end">Dosing line · 0.5–1.5 L a day</text>
    <text class="lbl-fn plainonly"   x="92" y="432" text-anchor="end">Adds saliva when needed</text>
    <circle class="hotring" cx="126" cy="332" r="10"/>
    <circle class="hithalo" cx="126" cy="332" r="22"/>
    <circle class="hotdot" cx="126" cy="332" r="10"/>
    <text class="hotnum" x="126" y="332">2</text>
  </g>

  <g class="hot" data-k="qc" role="button" tabindex="0" aria-label="The taste check">
    <path class="leader" d="M198 276 L152 500 L98 500"/>
    <text class="lbl-name techonly"  x="92" y="497" text-anchor="end">Tongue</text>
    <text class="lbl-name plainonly" x="92" y="497" text-anchor="end">The Taste Check</text>
    <text class="lbl-fn techonly"    x="92" y="511" text-anchor="end">Sensor · five channels</text>
    <text class="lbl-fn plainonly"   x="92" y="512" text-anchor="end">A quick, approximate check</text>
    <circle class="hotring" cx="198" cy="276" r="10"/>
    <circle class="hithalo" cx="198" cy="276" r="22"/>
    <circle class="hotdot" cx="198" cy="276" r="10"/>
    <text class="hotnum" x="198" y="276">3</text>
  </g>

  <g class="hot" data-k="diverter" role="button" tabindex="0" aria-label="The airway gate">
    <path class="leader" d="M372 306 L470 250 L516 250"/>
    <text class="lbl-name techonly"  x="522" y="247">Airway protection</text>
    <text class="lbl-name plainonly" x="522" y="247">The Airway Interlock</text>
    <text class="lbl-fn techonly"    x="522" y="261">The larynx closes in sequence</text>
    <text class="lbl-fn plainonly"   x="522" y="262">Protects the air pipe</text>
    <circle class="hotring" cx="372" cy="306" r="10"/>
    <circle class="hithalo" cx="372" cy="306" r="22"/>
    <circle class="hotdot" cx="372" cy="306" r="10"/>
    <text class="hotnum" x="372" y="306">4</text>
  </g>

  <g class="hot" data-k="conveyor" role="button" tabindex="0" aria-label="The conveyor">
    <path class="leader" d="M399 470 L500 512 L546 512"/>
    <text class="lbl-name techonly"  x="552" y="509">Oesophagus</text>
    <text class="lbl-name plainonly" x="552" y="509">The Conveyor</text>
    <text class="lbl-fn techonly"    x="552" y="523">Conveyor · 2–4 cm a second</text>
    <text class="lbl-fn plainonly"   x="552" y="524">Pushes food down in 8–10 s</text>
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
      kicker: 'Summary',
      points: [
        { k:'crusher', h:'Chewing reduces the size of the food.',
          p:'Small pieces give more surface to the saliva, which has already started to break down the starch. Your back teeth can apply several hundred newtons of force.' },
        { k:'dosing', h:'Saliva does more than make the food wet.',
          p:'The glands make half a litre to one and a half litres each day, and they make it when you need it. The saliva lubricates the food and controls the acidity. It kills some bacteria. It also carries an enzyme that starts on the starch immediately. The acid at Station 02 then stops that enzyme.' },
        { k:'qc', h:'Taste gives you a quick check.',
          p:'Sweet, salt, sour, bitter and umami are quick chemical signals. They are not a list of ingredients. They tell the nervous system a small quantity of information about the material that arrived. It is easy to give them a false signal.' },
        { k:'diverter', h:'Your food and your air use the same junction.',
          p:'This is the critical part. Each swallow starts a protection sequence. The larynx moves up, the vocal folds close, and the epiglottis folds back. If the sequence occurs at the wrong time, the cough reflex starts.' },
        { k:'conveyor', h:'The tube pushes the food down.',
          p:'A wave of muscle pushes the food along a tube approximately 25 cm long. You can thus swallow when you lie down, and also against gravity. Your body position can change the speed of the transfer.' }
      ],
      note: '<b>Summary.</b> No engineer puts a food line and an air line through the same junction. It is a bad plant layout. We have this layout because we inherited the machinery, and nobody designed it. The pipework was made long before an animal had to breathe, eat and speak through the same opening. The protection sequence is an excellent solution to a problem that should not exist.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',              v:'A wet mill. It also doses fluid and checks the material.' },
        { k:'Duty',               v:'It reduces the size, lubricates the food, starts to break it down, and transfers it safely.' },
        { k:'Dosing rate',        v:'<em>0.5 to 1.5 L each day</em>. The glands supply it when you need it.' },
        { k:'Dosing pH',          v:'6.2 – 7.6' },
        { k:'Catalyst',           v:'Salivary amylase. It starts on the starch. The acid at Station 02 stops most of it.' },
        { k:'Transfer time',      v:'A few seconds. <em>It does not need gravity.</em>' },
        { k:'Transfer mechanism', v:'A wave of muscle at approximately 2 to 4 cm each second.' },
        { k:'Particle spec',      v:'No fixed target. The reflex starts when the material holds together.' },
        { k:'Failure mode',       v:'The airway closes at the wrong time. The cough reflex then clears it.' }
      ],
      points: [
        { k:'crusher', h:'Dentition',
          p:'The teeth reduce the size of the material. Small particles give more area to the enzymes. The shape of the particles and the mixing both change the rate. The back teeth apply several hundred newtons.' },
        { k:'dosing', h:'Salivary glands',
          p:'The glands supply 0.5 to 1.5 L each day when you need it. The saliva carries amylase, lubricant, buffer and antimicrobial agents. The amylase acts on the starch immediately. The acid at Station 02 then stops most of it.' },
        { k:'qc', h:'Tongue',
          p:'A quick and approximate measurement. The sweet receptors respond to sugars and to other sweet molecules. The salt receptors respond to sodium ions, and the sour receptors respond to acidity. The umami receptors respond to glutamate and to nucleotides. The bitter receptors respond to many compounds. The signal is useful, but it does not give you the composition.' },
        { k:'diverter', h:'Airway protection',
          p:'This is more than one flap valve. A safe swallow coordinates four actions: the vocal folds close, the larynx moves up, the epiglottis folds back, and the pressure changes around the food. If the sequence fails, material can enter the airway.' },
        { k:'conveyor', h:'Oesophagus',
          p:'A tube approximately 25 cm long. The wall contracts in sequence and moves the food. Gravity is not necessary. You can swallow when you are upside down, but your body position changes the speed and the pressure.' }
      ],
      note: '<b>Design note.</b> No engineer routes a food line and an air line through the same junction. It is a very bad plant layout, and it would fail a design review. We have this layout because we inherited the machinery, and nobody designed it. The pipework was made long before an animal had to breathe, eat and speak through the same opening.',
      analogy: {
        tag: 'What it actually resembles',
        body: 'A peristaltic pump. Dialysis machines and laboratory dosing equipment use this type of pump. It moves fluid when it presses the outside of a flexible tube. No mechanical part touches the material, and gravity does no work. This is why you can drink a glass of water when you lie down.'
      }
    }
  },

  myth: {
    claim: 'Chew every mouthful thirty-two times.',
    mechanism: [
      'There is no evidence for thirty-two, or for any other specific number. The figure comes from Victorian diet advice. It does not come from physiology. The mill has no counter.',
      'Chewing reduces the particle size and mixes in the lubricant. It continues until the material holds together. The swallow reflex then starts by itself, and your count makes no difference. A soft idli needs a few chews. Raw carrot needs many more. The correct number is the number that makes the material ready, and your jaw already knows it.',
      'One small true finding is below this advice. Slow eating can reduce the quantity that some persons eat. But there is no twenty-minute timer for the sensation of a full stomach. Signals from the mouth, the stomach, the intestine and the brain overlap during the full meal. This supports a slow speed. It does not support a count.'
    ],
    whySurvives: 'A number feels like knowledge. The words "chew the food fully" are advice. The words "chew thirty-two times" sound like a measurement. A precise number persuades you even when somebody invented it. You will see this pattern at each remaining station.'
  }
};
