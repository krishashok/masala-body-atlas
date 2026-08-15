/* ============================================================
   STATION 08 — THE CONTROL ROOM
   A wall of instruments, each wrong in its own direction. The
   composition should make the argument before the text does.
   ============================================================ */

const gauge = (x, y, tag, reading, needle, cls) => `
  <g class="${cls || ''}" transform="translate(${x},${y})">
    <circle cx="0" cy="0" r="40" fill="none" stroke="var(--line-dim)" stroke-width="1"/>
    <circle cx="0" cy="0" r="34" fill="none" stroke="var(--line-faint)" stroke-width="1"/>
    <path d="M-27 11 A31 31 0 0 1 27 11" fill="none" stroke="var(--line-dim)" stroke-width="2.5" opacity=".45"/>
    <line x1="0" y1="11" x2="${needle[0]}" y2="${needle[1]}" stroke="var(--turmeric)" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="0" cy="11" r="2.6" fill="var(--line)"/>
    <text class="dimtext" x="0" y="31" text-anchor="middle">${reading}</text>
    <text class="dimtext" x="0" y="-26" text-anchor="middle" opacity=".6">${tag}</text>
  </g>`;

export default {
  id: 'control-room', no: '08', section: 'Instrumentation',

  rail:  { plain:"Why It's Hard",  tech:'Control Room' },
  title: { plain:"Why It's Hard",  tech:'The Control Room' },
  sub:   { plain:'Each instrument has a blind spot. Your confidence increases when different instruments agree.',
           tech :'Each sensor has its own bias and its own failure mode' },

  drawing: { no:'MB-STN-08', rev:'A', vessel:'—',
             desc:'Instrument wall', view:'Elevation' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'trial', n:1, plain:{ name:'The Clean Gauge', fn:'It is reliable, short and artificial' },
                 tech :{ name:'Randomised trial', fn:'Low bias · short · few subjects' } },
    { k:'cohort', n:2, plain:{ name:'The Long Gauge', fn:'Real life. Many factors are mixed together.' },
                  tech :{ name:'Cohort study', fn:'Long · real conditions · many mixed factors' } },
    { k:'bias', n:3, plain:{ name:'The Tilt', fn:'The food receives the credit for a full life' },
                tech :{ name:'Healthy-user effect', fn:'Systematic · always in one direction' } },
    { k:'amplifier', n:4, plain:{ name:'The Megaphone', fn:'It selects the extreme gauge and broadcasts it' },
                     tech :{ name:'The amplifier', fn:'Funding and media · high gain' } },
    { k:'converge', n:5, plain:{ name:'Agreement', fn:'The strongest reading on the panel' },
                    tech :{ name:'Convergence', fn:'Independent designs agree' } }
  ],

  modes: [
    { k:'onestudy', label:{ plain:'One study', tech:'Single instrument' }, fault:false,
      cap:{ plain:'<b>One study.</b> One gauge, read with confidence. Almost every headline that you have seen stands on one gauge.',
            tech :'<b>Single instrument.</b> One reading, accepted without a check. The effects in this field are usually small. One instrument cannot tell you the direction of its own error.' } },

    { k:'allgauges', label:{ plain:'All the gauges', tech:'Full panel' }, fault:false,
      cap:{ plain:'<b>All the gauges.</b> Five instruments give five different readings. Each has its own blind spot. The disagreement tells you about the instruments and about the question.',
            tech :'<b>Full panel.</b> Five designs give five readings. Each has its own bias and its own uncertainty. To select your preferred gauge is not a method.' } },

    { k:'converge', label:{ plain:'Convergence', tech:'Convergence' }, fault:false,
      cap:{ plain:'<b>Convergence.</b> The instruments come into agreement. This is the appearance of a reliable result. It is slow, it is not dramatic, and it is almost never in the news.',
            tech :'<b>Convergence.</b> Independent designs with different failure modes give the same result. This is one of the strongest readings that the panel can give.' } },

    { k:'megaphone', label:{ plain:'With a megaphone', tech:'Amplified' }, fault:false,
      cap:{ plain:'<b>With a megaphone.</b> The media select the most extreme gauge and broadcast it. The field appears to change its opinion continuously. You are watching it correct itself in public, at speed, and at high volume.',
            tech :'<b>Amplified.</b> The media select the instrument that gives a surprising result, and they broadcast it. The field appears unstable. You are observing its error correction in public, at high gain.' } }
  ],

  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="Nutrition evidence drawn as a control room wall of disagreeing gauges">
  <title>Nutrition evidence drawn as a control room wall of disagreeing gauges</title>
  <defs>
    <marker id="arw08" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.34)"/>
    </marker>
  </defs>

  <!-- the panel -->
  <rect class="vessel" x="60" y="150" width="620" height="220" rx="3"/>
  <text class="dimtext techonly"  x="70" y="140">INSTRUMENT WALL — FIVE DESIGNS, FIVE BIASES</text>
  <text class="dimtext plainonly" x="70" y="140">FIVE WAYS OF MEASURING THE SAME THING</text>

  <!-- ===== one study ===== -->
  <g class="anim a-onestudy">
    ${gauge(370, 258, 'RCT-1', 'reads high', [-16, -20])}
    <text class="dimtext" x="370" y="330" text-anchor="middle" opacity=".7">one instrument, read with confidence</text>
  </g>

  <!-- ===== full panel ===== -->
  <g class="anim a-allgauges">
    ${gauge(140, 258, 'RCT-1', 'trial', [-18, -18])}
    ${gauge(255, 258, 'COH-2', 'cohort', [10, -22])}
    ${gauge(370, 258, 'MEC-3', 'mechanism', [-4, -24])}
    ${gauge(485, 258, 'OBS-4', 'observed', [20, -14])}
    ${gauge(600, 258, 'SR-5', 'review', [-12, -21])}
    <text class="dimtext" x="370" y="352" text-anchor="middle" opacity=".7">five instruments · five readings · none is faulty</text>
  </g>

  <!-- ===== convergence ===== -->
  <g class="anim a-converge">
    ${gauge(140, 258, 'RCT-1', 'trial', [-2, -24])}
    ${gauge(255, 258, 'COH-2', 'cohort', [-1, -24])}
    ${gauge(370, 258, 'MEC-3', 'mechanism', [0, -24])}
    ${gauge(485, 258, 'OBS-4', 'observed', [1, -24])}
    ${gauge(600, 258, 'SR-5', 'review', [2, -24])}
    <rect class="stamp" x="200" y="404" width="340" height="46" style="stroke:var(--cardamom)" />
    <text class="stamptext" x="370" y="433" text-anchor="middle" style="fill:var(--cardamom)">Convergence — the trustworthy reading</text>
  </g>

  <!-- ===== amplified ===== -->
  <g class="anim a-megaphone">
    ${gauge(140, 258, 'RCT-1', 'trial', [-18, -18])}
    ${gauge(255, 258, 'COH-2', 'cohort', [10, -22])}
    ${gauge(370, 258, 'MEC-3', 'mechanism', [-4, -24])}
    ${gauge(485, 258, 'OBS-4', 'observed', [26, -8])}
    ${gauge(600, 258, 'SR-5', 'review', [-12, -21])}
    <circle class="faultmark" cx="485" cy="258" r="50"/>
    <path class="hazard" d="M556 300 L610 276 L610 344 L556 320 Z"/>
    <path class="hazard" d="M610 292 C640 292 640 328 610 328"/>
    <text class="stamptext" x="584" y="368" text-anchor="middle">Gain: high</text>
    <path class="leader" d="M520 292 L556 306" style="stroke:var(--chilli)" />
    <text class="faulttext" x="370" y="440" text-anchor="middle">One outlier, selected and broadcast</text>
  </g>

  <!-- the settled core, always on the wall -->
  <g class="mechonly">
    <rect class="bay" x="60" y="500" width="620" height="120"/>
    <text class="dimtext techonly"  x="80" y="528">SETTLED CORE — FEW DISPUTE IT, NEVER IN THE NEWS</text>
    <text class="dimtext plainonly" x="80" y="528">THE PART NOBODY DISPUTES</text>
    <text class="lbl-fn" x="80" y="556">Smoking causes cancer · a large energy excess over years causes harm</text>
    <text class="lbl-fn" x="80" y="574">Trans fats damage cardiovascular health</text>
    <text class="lbl-fn" x="80" y="592">Extreme deficiency of any essential nutrient causes deficiency disease</text>
  </g>

  <!-- myth annotation -->
  <g class="mythonly">
    <circle class="hazard" cx="370" cy="258" r="58"/>
    <path class="scribble" d="M340 230 L400 288 M400 230 L340 288"/>
    <path class="leader" d="M428 258 L500 470 L516 470" style="stroke:var(--chilli)" />
    <text class="hazardtext" x="522" y="466">"Nobody really knows anything"</text>
    <text class="hazardtext" x="522" y="480" opacity=".75">the reversals show the quality</text>
  </g>

  <!-- ================= HOTSPOTS ================= -->
  <g class="hot" data-k="trial" role="button" tabindex="0" aria-label="The clean gauge">
    <path class="leader" d="M140 196 L118 108 L104 108"/>
    <text class="lbl-name techonly"  x="98" y="105" text-anchor="end">Randomised trial</text>
    <text class="lbl-name plainonly" x="98" y="105" text-anchor="end">The Clean Gauge</text>
    <text class="lbl-fn techonly"    x="98" y="119" text-anchor="end">Low bias · short · few subjects</text>
    <text class="lbl-fn plainonly"   x="98" y="120" text-anchor="end">Reliable, short, artificial</text>
    <circle class="hotring" cx="140" cy="196" r="10"/>
    <circle class="hithalo" cx="140" cy="196" r="22"/>
    <circle class="hotdot" cx="140" cy="196" r="10"/>
    <text class="hotnum" x="140" y="196">1</text>
  </g>

  <g class="hot" data-k="cohort" role="button" tabindex="0" aria-label="The long gauge">
    <path class="leader" d="M255 196 L300 96 L316 96"/>
    <text class="lbl-name techonly"  x="322" y="93">Cohort study</text>
    <text class="lbl-name plainonly" x="322" y="93">The Long Gauge</text>
    <text class="lbl-fn techonly"    x="322" y="107">Decades · real conditions · mixed factors</text>
    <text class="lbl-fn plainonly"   x="322" y="108">Real life · many mixed factors</text>
    <circle class="hotring" cx="255" cy="196" r="10"/>
    <circle class="hithalo" cx="255" cy="196" r="22"/>
    <circle class="hotdot" cx="255" cy="196" r="10"/>
    <text class="hotnum" x="255" y="196">2</text>
  </g>

  <g class="hot" data-k="bias" role="button" tabindex="0" aria-label="The tilt">
    <path class="leader" d="M120 370 L96 434 L82 434"/>
    <text class="lbl-name techonly"  x="76" y="431" text-anchor="end">Healthy-user effect</text>
    <text class="lbl-name plainonly" x="76" y="431" text-anchor="end">The Tilt</text>
    <text class="lbl-fn techonly"    x="76" y="445" text-anchor="end">Systematic · one direction</text>
    <text class="lbl-fn plainonly"   x="76" y="446" text-anchor="end">The food receives all the credit</text>
    <circle class="hotring" cx="120" cy="370" r="10"/>
    <circle class="hithalo" cx="120" cy="370" r="22"/>
    <circle class="hotdot" cx="120" cy="370" r="10"/>
    <text class="hotnum" x="120" y="370">3</text>
  </g>

  <g class="hot" data-k="amplifier" role="button" tabindex="0" aria-label="The megaphone">
    <path class="leader" d="M620 330 L668 396 L684 396"/>
    <text class="lbl-name techonly"  x="690" y="393" text-anchor="end">The amplifier</text>
    <text class="lbl-name plainonly" x="690" y="393" text-anchor="end">The Megaphone</text>
    <text class="lbl-fn techonly"    x="690" y="407" text-anchor="end">Funding and media · high gain</text>
    <text class="lbl-fn plainonly"   x="690" y="408" text-anchor="end">Selects the extreme gauge</text>
    <circle class="hotring" cx="620" cy="330" r="10"/>
    <circle class="hithalo" cx="620" cy="330" r="22"/>
    <circle class="hotdot" cx="620" cy="330" r="10"/>
    <text class="hotnum" x="620" y="330">4</text>
  </g>

  <g class="hot" data-k="converge" role="button" tabindex="0" aria-label="Agreement">
    <path class="leader" d="M370 620 L420 690 L436 690"/>
    <text class="lbl-name techonly"  x="442" y="687">Convergence</text>
    <text class="lbl-name plainonly" x="442" y="687">Agreement</text>
    <text class="lbl-fn techonly"    x="442" y="701">Independent designs agree</text>
    <text class="lbl-fn plainonly"   x="442" y="702">The strongest reading on the panel</text>
    <circle class="hotring" cx="370" cy="620" r="10"/>
    <circle class="hithalo" cx="370" cy="620" r="22"/>
    <circle class="hotdot" cx="370" cy="620" r="10"/>
    <text class="hotnum" x="370" y="620">5</text>
  </g>

  <text class="dimtext techonly"  x="-84" y="680">▶ INPUT — the same question, asked five ways</text>
  <text class="dimtext plainonly" x="-84" y="680">▶ One question, five ways of asking it</text>
</svg>`,

  main: {
    plain: {
      kicker: 'Summary',
      points: [
        { h:'One instrument is not sufficient.', p:'Each study design has its own blind spots. This is a property of measurement.' },
        { k:'trial', h:'The reliable studies are short.',
          p:'A trial selects each group by chance. This usually balances the known factors and the unknown factors between the groups, and it makes a trial powerful. It does not give a perfect balance in one small study. Nutrition trials are also short and expensive, and it is difficult to hide the treatment from the subjects.' },
        { k:'cohort', h:'The long studies contain mixed factors.',
          p:'This design follows real persons who eat real food for decades. That is the correct period to study. It cannot separate the food from the persons who eat it. Their income, their exercise, their smoking and their doctor all change the result.' },
        { k:'bias', h:'The Tilt',
          p:'A person who starts one recommended behaviour usually starts other recommended behaviours at the same time. The food that you study thus arrives with a full set of habits. The food then receives the credit for all of them.' },
        { k:'amplifier', h:'A loud claim is not evidence.',
          p:'Industry pays for research into its own products, and the results move in that direction. Press offices select the surprising results. A small result with careful limits becomes a headline that the authors of the paper would not sign.' },
        { k:'converge', h:'Accept the result when the designs agree.',
          p:'Trials, long studies, mechanism and different populations can give the same result. Your confidence then increases greatly, and it increases most when those methods fail in different ways. This is slower and less dramatic than one headline.' }
      ],
      note: '<b>Summary.</b> Nutrition science appears to change its opinion continuously. You are watching its error correction in public, at speed, and at high volume. Other scientists challenge a finding, revise it, and sometimes reverse it. That process makes the field appear unreliable. The same process makes it reliable across decades. A field that reversed nothing would not be more careful. It would not be checking its work.'
    },
    tech: {
      kicker: 'Instrumentation Datasheet',
      spec: [
        { k:'Class',                  v:'Distributed instruments. None of them is perfectly calibrated.' },
        { k:'Randomised trial',       v:'A strong design for cause · usually short · the subjects do not always comply, and it is difficult to hide the treatment' },
        { k:'Cohort study',           v:'Long period · real conditions · many mixed factors' },
        { k:'Mechanistic work',       v:'It explains the mechanism. It does not show that the effect is important in a person.' },
        { k:'Self-reported intake',   v:'Always too low' },
        { k:'Effect sizes',           v:'Usually small. A hazard ratio near 1.1 means very little by itself.' },
        { k:'Relative vs absolute',   v:'A rise of 30% can mean that 1 person in 100 becomes 1.3 persons in 100.' },
        { k:'Funding effect',         v:'Measurable. The result moves toward the interest of the sponsor.' },
        { k:'Publication effect',     v:'Journals publish positive and surprising results more often.' },
        { k:'Trustworthy reading',    v:'<em>Independent designs that agree</em>' }
      ],
      points: [
        { k:'trial', h:'Randomised trial',
          p:'Selection by chance usually balances the measured factors and the unmeasured factors. It is a powerful method to show cause. It does not guarantee a perfect balance in one small trial. A long diet trial also has problems with compliance, with cost, and with the concealment of the treatment.' },
        { k:'cohort', h:'Cohort study',
          p:'This design follows real persons who eat real food for decades. That is the correct period to study. It cannot separate the food from the persons who eat it. Their income, their exercise, their smoking and their doctor all change the result.' },
        { k:'bias', h:'Healthy-user effect',
          p:'A person who starts one recommended behaviour usually starts other recommended behaviours at the same time. The food under study thus arrives with a full set of habits. The food then receives the credit for all of them.' },
        { k:'amplifier', h:'The amplifier',
          p:'Industry pays for research into its own products, and the results move in that direction. Press offices select the surprising results. A small result with careful limits becomes a headline that the authors of the paper would not sign.' },
        { k:'converge', h:'Convergence',
          p:'Agreement between trials, cohorts, mechanism studies and populations is powerful, but only when those designs fail in different ways. A bias that they share can still make several instruments agree on the wrong value.' }
      ],
      note: '<b>Design note.</b> Nutrition science appears to change its opinion continuously. You are watching its error correction in public, at speed, and at high volume. The process that makes the field appear unreliable is the process that makes it reliable across decades. A field that reversed nothing would not be more careful. It would not be checking its work.',
      analogy: {
        tag: 'How the panel works',
        body: 'A control room that contains many imperfect instruments. An operator does not select a preferred gauge. The operator compares instruments that fail in different ways, checks the calibration, and accepts a reading with more confidence when independent instruments agree.'
      }
    }
  },

  modelLimits: [
    'Selection by chance usually balances the mixed factors. It does not guarantee a perfect balance in one small trial.',
    'Agreement is most persuasive when the methods have different biases. Several methods can also agree because they share the same systematic error.'
  ],

  myth: {
    claim: 'Scientists change their opinion continuously, so nobody knows anything.',
    mechanism: [
      'Some results have not changed for decades, and few scientists dispute them. Smoking causes cancer. A large excess of energy over many years causes harm. Trans fats damage the heart and the blood vessels. A severe shortage of an essential nutrient causes a deficiency disease. This is the settled core. It is not interesting, and it is therefore never in the news.',
      'The new work changes. This includes the small effect of one food, the best ratio of one macronutrient, and the newest substance to blame. The evidence there is weak, and the headlines come from there. Do not judge the full field by its newest work. You would not call all bridges unsafe because engineers still discuss a new material.',
      'The reversals are the evidence of quality. A discipline that finds its own errors and publishes them shows the property that makes it reliable. Compare it fairly. Do not compare it with an imaginary source of permanent truth. Compare it with the alternatives, which change their opinion as often and never state that they have done so.'
    ],
    whySurvives: 'The statement that nobody knows is comfortable. It removes the work of weighing the evidence, and it permits you to keep the opinion that you already had. Somebody is always available to sell you certainty in that space.'
  }
};
