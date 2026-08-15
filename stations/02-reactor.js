/* ============================================================
   STATION 02 — THE ACID REACTOR (the stomach)
   Anterior view (§D0): fundus balloons to the viewer's RIGHT,
   pylorus and duodenum exit to the viewer's LEFT.
   ============================================================ */

export default {
  id: 'reactor', no: '02', section: 'Digestive Train',

  rail:  { plain:'Stomach',     tech:'Acid Reactor' },
  title: { plain:'The Stomach', tech:'The Acid Reactor' },
  sub:   { plain:'A muscular bag of acid, and tougher than you think',
           tech :'Vessel R-02 · commonly, "the stomach"' },

  drawing: { no:'MB-STN-02', rev:'D', vessel:'R-02',
             desc:'Lined batch reactor', view:'Anterior view' },

  /* ---------------- hotspots ---------------- */
  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'cardia', n:1, plain:{ name:'The Top Gate', fn:'Stops food coming back up' },
                  tech :{ name:'Cardia / LES', fn:'Inlet check valve' } },
    { k:'fundus', n:2, plain:{ name:'The Stretchy Top', fn:'Makes room for a big meal' },
                  tech :{ name:'Fundus', fn:'Surge tank · gas headspace' } },
    { k:'body', n:3, plain:{ name:'The Acid Bath', fn:'Where the acid goes in' },
                tech :{ name:'Body', fn:'Acid dosing · agitation' } },
    { k:'antrum', n:4, plain:{ name:'The Grinder', fn:'Squeezes food into mush' },
                  tech :{ name:'Antrum', fn:'3 strokes/min' } },
    { k:'pylorus', n:5, plain:{ name:'The Bottom Gate', fn:'Lets a little out at a time' },
                   tech :{ name:'Pylorus', fn:'Metering valve · 2–3 mL/stroke' } }
  ],

  modes: [
    { k:'normal', label:{ plain:'Resting', tech:'Normal operation' }, fault:false,
      cap:{ plain:"<b>Resting.</b> Contents churn slowly and the bottom gate lets a little through at a time. This is what it's doing for most of the two to four hours after a meal.",
            tech :'<b>Normal operation.</b> Ambient agitation with antral peristalsis at ~3/min and metered discharge through the pylorus. Residence time 2–4 h for a mixed meal.' } },

    { k:'grind', label:{ plain:'Grinding', tech:'Grind cycle' }, fault:false,
      cap:{ plain:'<b>Grinding.</b> Squeezing waves drive solid food at the almost-closed exit; big pieces bounce back and get torn apart. Liquids pass more easily; most solids wait until they&rsquo;re small enough.',
            tech :'<b>Grind cycle.</b> Retropulsion against a closed pylorus shears particles. Recirculation continues until material passes the &lt;2 mm spec.' } },

    { k:'empty', label:{ plain:'Emptying', tech:'Discharge' }, fault:false,
      cap:{ plain:'<b>Emptying.</b> The bottom gate opens in pulses and the level drops over hours. Liquids leave fast; a heavy, fatty meal takes far longer.',
            tech :'<b>Discharge.</b> Metered emptying, 2–3 mL/stroke. Rate is modulated downstream by fat and acid sensing in the duodenum — feedback control, not a timer.' } },

    { k:'vent', label:{ plain:'Burp', tech:'Vent cycle' }, fault:false,
      cap:{ plain:"<b>Burp.</b> Air you swallowed with your food collects at the top, the top gate relaxes for a moment, and the gas goes back up the pipe. That's all a burp is.",
            tech :'<b>Vent cycle.</b> Gas accumulates in the fundic headspace; transient LES relaxation opens the inlet and the gas is expelled up the oesophagus.' } },

    { k:'reflux', label:{ plain:'Reflux', tech:'Valve fault' }, fault:true,
      cap:{ plain:"<b>Reflux.</b> The anti-reflux barrier gives way and acid reaches the food pipe, whose lining is far less acid-resistant than the stomach's. That's heartburn: primarily a barrier problem, not a chilli burning tissue.",
            tech :'<b>Valve fault.</b> Failure of the anti-reflux barrier permits retrograde gastric contents into the oesophagus. LES pressure, transient relaxations, hiatal anatomy, meal size and posture can all contribute.' } }
  ],

  /* ---------------- the drawing ---------------- */
  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="The stomach drawn as an industrial acid reactor, anterior view">
  <title>The stomach drawn as an industrial acid reactor, anterior view</title>
  <defs>
    <marker id="arw" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.34)"/>
    </marker>
    <clipPath id="vesselClip">
      <path d="M374 78 L374 190 C419 134 484 149 491 244 C499 324 481 404 429 456 C377 509 297 512 245 482 L237 452 C287 476 327 466 349 424 C367 392 355 304 345 214 L343 190 L343 78 Z"/>
    </clipPath>
  </defs>

  <!-- dimension line (Nerd Mode only) -->
  <g class="techonly">
    <line class="dimline" x1="56" y1="190" x2="56" y2="500" marker-start="url(#arw)" marker-end="url(#arw)"/>
    <line class="dimline" x1="56" y1="190" x2="120" y2="190"/>
    <line class="dimline" x1="56" y1="500" x2="120" y2="500"/>
    <text class="dimtext" x="50" y="348" text-anchor="end">≈ 250 mm</text>
  </g>

  <!-- duodenum outlet (exits to viewer's LEFT — anterior view) -->
  <path class="pipe" d="M245 482 C204 508 148 505 100 476 L113 450 C154 474 202 474 237 452 Z"/>

  <!-- vessel -->
  <path class="vessel" d="M374 78 L374 190 C419 134 484 149 491 244 C499 324 481 404 429 456 C377 509 297 512 245 482 L237 452 C287 476 327 466 349 424 C367 392 355 304 345 214 L343 190 L343 78 Z"/>

  <!-- the wall, seen edge-on, and the sheen off a wet surface. Both are
       clipped to the vessel, so neither can spill past the outline. -->
  <path class="wall" clip-path="url(#vesselClip)" d="M374 78 L374 190 C419 134 484 149 491 244 C499 324 481 404 429 456 C377 509 297 512 245 482 L237 452 C287 476 327 466 349 424 C367 392 355 304 345 214 L343 190 L343 78 Z"/>
  <ellipse class="sheen" clip-path="url(#vesselClip)" cx="416" cy="248" rx="104" ry="128"/>

  <!-- contents -->
  <g clip-path="url(#vesselClip)">
    <g class="anim a-empty"><rect class="level" x="170" y="190" width="400" height="322"/></g>

    <path class="mucus mechonly" d="M484 250 C492 330 474 402 424 452 C374 502 300 504 250 476"/>

    <g class="anim a-vent"><ellipse class="gascloud" cx="452" cy="230" rx="42" ry="34"/></g>

    <circle class="chyme"   cx="444" cy="330" r="6"   style="animation-delay:-.2s"/>
    <circle class="chyme b" cx="412" cy="368" r="4.5" style="animation-delay:-1.1s"/>
    <circle class="chyme"   cx="460" cy="392" r="5"   style="animation-delay:-2.3s"/>
    <circle class="chyme b" cx="394" cy="420" r="6.5" style="animation-delay:-3.0s"/>
    <circle class="chyme"   cx="362" cy="452" r="4"   style="animation-delay:-1.7s"/>
    <circle class="chyme"   cx="426" cy="286" r="4.5" style="animation-delay:-4.1s"/>
    <circle class="chyme b" cx="340" cy="466" r="3.6" style="animation-delay:-2.7s"/>
    <circle class="chyme"   cx="388" cy="330" r="3.4" style="animation-delay:-.9s"/>

    <g class="wavegrp"><path class="wave" d="M488 336 C472 348 464 352 454 354"/>
      <path class="wave" d="M348 320 C362 334 370 342 378 346"/></g>
    <g class="wavegrp" style="animation-delay:-1.7s"><path class="wave" d="M488 336 C472 348 464 352 454 354"/>
      <path class="wave" d="M348 320 C362 334 370 342 378 346"/></g>

    <g class="anim a-grind">
      <circle class="frag-big" cx="392" cy="438" r="13"/>
      <circle class="frag-bit" cx="392" cy="438" r="3.5" style="--dx:-34px;--dy:-26px"/>
      <circle class="frag-bit" cx="392" cy="438" r="3"   style="--dx:26px;--dy:-32px;animation-delay:-.15s"/>
      <circle class="frag-bit" cx="392" cy="438" r="2.6" style="--dx:38px;--dy:14px;animation-delay:-.3s"/>
      <circle class="frag-big" cx="440" cy="380" r="10" style="animation-delay:-1.3s"/>
      <circle class="frag-bit" cx="440" cy="380" r="3" style="--dx:30px;--dy:-24px;animation-delay:-1.3s"/>
      <circle class="frag-bit" cx="440" cy="380" r="2.6" style="--dx:-28px;--dy:-18px;animation-delay:-1.15s"/>
      <path class="recirc" d="M300 470 C330 420 400 400 452 420" marker-end="url(#arw)"/>
    </g>

    <g class="anim a-reflux"><rect class="refluxcol" x="347" y="70" width="23" height="126"/></g>
  </g>

  <path class="vessel-inner techonly" d="M470 240 C478 320 462 396 416 442"/>

  <path class="flowline" d="M359 82 L359 188"/>

  <g class="anim a-normal">
    <circle class="squirt" cx="228" cy="470" r="4"/>
    <circle class="squirt" cx="228" cy="470" r="3" style="animation-delay:-1.7s"/>
  </g>

  <g class="anim a-empty">
    <circle class="out" cx="232" cy="470" r="4"/>
    <circle class="out" cx="232" cy="470" r="3.4" style="animation-delay:-.5s"/>
    <circle class="out" cx="232" cy="470" r="3"   style="animation-delay:-1s"/>
  </g>

  <g class="anim a-vent"><circle class="bubble" cx="452" cy="248" r="13"/></g>

  <g class="anim a-reflux">
    <circle class="faultmark" cx="358" cy="198" r="22"/>
    <path class="leader" d="M336 198 L250 156 L212 156" style="stroke:var(--chilli)" />
    <text class="faulttext" x="206" y="153" text-anchor="end">Valve not sealing</text>
    <text class="faulttext" x="206" y="167" text-anchor="end" opacity=".75">Acid entering the pipe</text>
  </g>

  <!-- instrument (Nerd Mode only) -->
  <g class="techonly" transform="translate(610,626)">
    <circle cx="0" cy="0" r="44" fill="none" stroke="var(--line-dim)" stroke-width="1"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="var(--line-faint)" stroke-width="1"/>
    <path d="M-30 12 A34 34 0 0 1 30 12" fill="none" stroke="var(--chilli)" stroke-width="2.5" opacity=".55"/>
    <line class="needle" x1="0" y1="12" x2="-2" y2="-22"/>
    <circle cx="0" cy="12" r="3" fill="var(--line)"/>
    <text class="dimtext" x="0" y="34" text-anchor="middle">pH 1.5–3.5</text>
    <text class="dimtext" x="0" y="-30" text-anchor="middle" opacity=".6">PI-201</text>
  </g>

  <g class="techonly mechonly">
    <path class="leader" d="M474 300 L552 268 L588 268"/>
    <text class="lbl-fn" x="584" y="264">Bicarbonate mucus gel</text>
    <text class="lbl-fn" x="594" y="283">0.2–0.5 mm · renewed q3–5 d</text>
  </g>

  <g class="mythonly">
    <path class="scribble" d="M425 325 L455 355 M455 325 L425 355"/>
    <circle class="hazard" cx="440" cy="340" r="26"/>
    <path class="leader" d="M466 340 L556 312 L596 312" style="stroke:var(--chilli)" />
    <text class="hazardtext" x="602" y="308">"Chilli burns a hole"</text>
    <text class="hazardtext" x="602" y="327" opacity=".75">— citation needed</text>
  </g>

  <!-- ================= HOTSPOTS ================= -->
  <g class="hot" data-k="cardia" role="button" tabindex="0" aria-label="Top gate">
    <path class="leader" d="M358 192 L440 122 L492 122"/>
    <text class="lbl-name techonly"  x="498" y="119">Cardia / LES</text>
    <text class="lbl-name plainonly" x="498" y="119">The Top Gate</text>
    <text class="lbl-fn techonly"    x="498" y="133">Inlet check valve</text>
    <text class="lbl-fn plainonly"   x="498" y="134">Stops food coming back up</text>
    <circle class="hotring" cx="358" cy="192" r="10"/>
    <circle class="hithalo" cx="358" cy="192" r="22"/>
    <circle class="hotdot" cx="358" cy="192" r="10"/>
    <text class="hotnum" x="358" y="192">1</text>
  </g>

  <g class="hot" data-k="fundus" role="button" tabindex="0" aria-label="Stretchy top">
    <path class="leader" d="M444 226 L560 196 L600 196"/>
    <text class="lbl-name techonly"  x="606" y="193">Fundus</text>
    <text class="lbl-name plainonly" x="606" y="193">The Stretchy Top</text>
    <text class="lbl-fn techonly"    x="606" y="207">Surge tank · gas headspace</text>
    <text class="lbl-fn plainonly"   x="606" y="208">Makes room for a big meal</text>
    <circle class="hotring" cx="444" cy="226" r="10"/>
    <circle class="hithalo" cx="444" cy="226" r="22"/>
    <circle class="hotdot" cx="444" cy="226" r="10"/>
    <text class="hotnum" x="444" y="226">2</text>
  </g>

  <g class="hot" data-k="body" role="button" tabindex="0" aria-label="Acid bath">
    <path class="leader" d="M418 372 L540 404 L586 404"/>
    <text class="lbl-name techonly"  x="592" y="401">Body</text>
    <text class="lbl-name plainonly" x="592" y="401">The Acid Bath</text>
    <text class="lbl-fn techonly"    x="592" y="415">Acid dosing · agitation</text>
    <text class="lbl-fn plainonly"   x="592" y="416">Where the acid goes in</text>
    <circle class="hotring" cx="418" cy="372" r="10"/>
    <circle class="hithalo" cx="418" cy="372" r="22"/>
    <circle class="hotdot" cx="418" cy="372" r="10"/>
    <text class="hotnum" x="418" y="372">3</text>
  </g>

  <g class="hot" data-k="antrum" role="button" tabindex="0" aria-label="Grinder">
    <path class="leader" d="M348 478 L360 578 L360 600"/>
    <text class="lbl-name techonly"  x="360" y="618" text-anchor="middle">Antrum</text>
    <text class="lbl-name plainonly" x="360" y="618" text-anchor="middle">The Grinder</text>
    <text class="lbl-fn techonly"    x="360" y="632" text-anchor="middle">3 strokes/min</text>
    <text class="lbl-fn plainonly"   x="360" y="633" text-anchor="middle">Squeezes food into mush</text>
    <circle class="hotring" cx="348" cy="478" r="10"/>
    <circle class="hithalo" cx="348" cy="478" r="22"/>
    <circle class="hotdot" cx="348" cy="478" r="10"/>
    <text class="hotnum" x="348" y="478">4</text>
  </g>

  <g class="hot" data-k="pylorus" role="button" tabindex="0" aria-label="Bottom gate">
    <path class="leader" d="M241 466 L170 548 L128 548"/>
    <text class="lbl-name techonly"  x="122" y="545" text-anchor="end">Pylorus</text>
    <text class="lbl-name plainonly" x="122" y="545" text-anchor="end">The Bottom Gate</text>
    <text class="lbl-fn techonly"    x="122" y="559" text-anchor="end">Metering valve · 2–3 mL/stroke</text>
    <text class="lbl-fn plainonly"   x="122" y="560" text-anchor="end">Lets a little out at a time</text>
    <circle class="hotring" cx="241" cy="466" r="10"/>
    <circle class="hithalo" cx="241" cy="466" r="22"/>
    <circle class="hotdot" cx="241" cy="466" r="10"/>
    <text class="hotnum" x="241" y="466">5</text>
  </g>

  <!-- feed / discharge tags -->
  <text class="dimtext techonly"  x="390" y="96">◀ FEED — masticated bolus, Station 01</text>
  <text class="dimtext plainonly" x="390" y="96">◀ Food arrives from the mouth</text>
  <text class="dimtext techonly"  x="214" y="436" text-anchor="end">◀ DISCHARGE to Station 03</text>
  <text class="dimtext plainonly" x="214" y="436" text-anchor="end">◀ Out to the small intestine</text>
</svg>`,

  /* ---------------- main panel ---------------- */
  main: {
    plain: {
      kicker: 'The short version',
      points: [
        { h:'It is mostly a holding and mixing reactor.', p:'Protein digestion starts here, along with some fat digestion, but very little of the meal is absorbed here. The main refinery is downstream.' },
        { h:'It does not dissolve itself.', p:'A layer of slime coats the inside, and the whole lining is replaced every few days while it keeps working.' },
        { k:'cardia', h:'The Top Gate',
          p:"A ring of muscle that stays clamped shut so the contents stay in. When it leaks, you feel it as heartburn — a valve that isn't sealing, not a punishment for dinner." },
        { k:'fundus', h:'It buys you time.',
          p:"This part relaxes as food arrives, so even a large meal can be accommodated with surprisingly little rise in pressure. Swallowed air collects up here too — which is where a burp comes from." },
        { k:'body', h:'The acid is genuinely strong.',
          p:'Acid strong enough to strip metal is made right here, on demand, by cells sitting in the wall. It kills many swallowed microbes and starts unravelling protein.' },
        { k:'antrum', h:'The Grinder',
          p:"Three squeezes a minute drive food at a nearly-shut exit. Most solid food bounces back and gets sheared apart on the way. Liquids can leave sooner; larger solid particles usually wait until they are small enough." },
        { k:'pylorus', h:'The exit valve is the clever part.',
          p:'The most underrated part. It releases small spurts at a time, which helps explain why a solid meal takes hours to clear while liquids can leave much faster.' }
      ],
      note: '<b>The point.</b> Most of what you have been told to fear about your stomach — spice, acid, "burning a hole" — misunderstands what it is. It is a reinforced mixing tank designed to handle exactly this, and it has been doing it every day of your life without your involvement.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',            v:'Lined muscular batch reactor' },
        { k:'Duty',             v:'Surge storage · acid hydrolysis · homogenisation · metered discharge' },
        { k:'Charge volume',    v:'50 mL empty → 1 L rated → <em>4 L surge</em>' },
        { k:'Operating pH',     v:'1.5 – 3.5' },
        { k:'Reagent',          v:'Hydrochloric acid, generated in situ' },
        { k:'Catalyst',         v:'Pepsin — activated by the acid it swims in' },
        { k:'Lining',           v:'Bicarbonate mucus gel, 0.2–0.5 mm' },
        { k:'Lining turnover',  v:'<em>3–5 days</em>, full replacement, no downtime' },
        { k:'Agitation',        v:'3 contractions/min, antral peristalsis' },
        { k:'Discharge valve',  v:'Pylorus, 2–3 mL per stroke' },
        { k:'Particle spec',    v:'&lt; 2 mm passes; larger material recirculated' },
        { k:'Residence time',   v:'2–4 h mixed meal · 20 min glucose solution' },
        { k:'Absorption duty',  v:'Limited. Most nutrient absorption is downstream.' },
        { k:'Service life',     v:'<em>~80 years continuous</em>, unscheduled maintenance only' }
      ],
      points: [
        { k:'cardia', h:'Cardia / LES',
          p:'Lower oesophageal sphincter. A one-way inlet valve holding against a pressurised, acidic vessel. Failure to seat presents as reflux.' },
        { k:'fundus', h:'Fundus',
          p:'Surge capacity with receptive relaxation: accepts a large charge with relatively little pressure rise. Gas headspace collects here and is vented upward.' },
        { k:'body', h:'Body',
          p:'Parietal cells pump hydrogen ions against a millionfold gradient — the steepest your body maintains anywhere. Chief cells add pepsinogen, which the acid then activates.' },
        { k:'antrum', h:'Antrum',
          p:'Antral peristalsis at ~3 cycles/min drives material at a near-closed pylorus; retropulsion shears it. Recirculation is by design, not failure.' },
        { k:'pylorus', h:'Pylorus',
          p:'Metering valve, 2–3 mL per stroke, so the downstream refinery is never flooded. Explains gastric emptying kinetics and the liquid-vs-solid difference.' }
      ],
      note: '<b>Design note.</b> This vessel gets more credit for digestion than it deserves. It stores, mixes, acidifies and starts protein digestion, then meters the meal into <b>Station 03</b>, where most enzymatic digestion and absorption happen.',
      analogy: {
        tag: 'Closest machine',
        body: 'A glass-lined batch reactor. Chemical plants line steel vessels with enamel because the contents would eat the walls. Your stomach does the same thing, except the lining is wet, alive, and rebuilds itself every few days while the reactor keeps running. No industrial vessel on earth manages that.'
      }
    }
  },

  modelLimits: [
    'The stomach is not merely storage: protein digestion begins here and gastric lipase contributes to fat digestion. It is simply not the main site of nutrient absorption.',
    'The “faulty valve” model explains reflux mechanics, but meal size, body position, hiatal anatomy and transient sphincter relaxations can change when reflux occurs.'
  ],

  /* ---------------- myth (shared across layers, §D2) ---------------- */
  myth: {
    claim: 'Chillies burn holes in your stomach.',
    mechanism: [
      "Capsaicin does not chemically burn a hole. It activates <b>TRPV1</b> — a heat-sensitive pain channel that also responds around noxious temperatures. The molecule picks the lock, so your nerves can report fire without corrosive tissue injury.",
      'Ulcers are overwhelmingly caused by <em>Helicobacter pylori</em> and by long-term NSAID use. Barry Marshall proved the first one in 1984 by drinking a beaker of the bacteria, giving himself gastritis, and collecting a Nobel Prize in 2005.',
      'Spicy food can aggravate symptoms in some people with reflux or dyspepsia, but it is not a usual cause of peptic ulcers. Pain and tissue injury are different questions.'
    ],
    whySurvives: "Because pain feels like proof. The sensation is real and vivid, so damage seems self-evident. A smoke alarm can be screaming while the house is still intact."
  }
};
