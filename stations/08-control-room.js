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
  sub:   { plain:'Every instrument has a blind spot. Confidence rises when different ones agree.',
           tech :'Every sensor has a characteristic bias and failure mode' },

  drawing: { no:'MB-STN-08', rev:'A', vessel:'—',
             desc:'Instrument wall', view:'Elevation' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'trial', n:1, plain:{ name:'The Clean Gauge', fn:'Trustworthy, short, and artificial' },
                 tech :{ name:'Randomised trial', fn:'Low bias · short · small n' } },
    { k:'cohort', n:2, plain:{ name:'The Long Gauge', fn:'Real life, and hopelessly tangled' },
                  tech :{ name:'Cohort study', fn:'Long · real conditions · confounded' } },
    { k:'bias', n:3, plain:{ name:'The Tilt', fn:'The food gets credit for the whole life' },
                tech :{ name:'Healthy-user effect', fn:'Systematic · in one direction' } },
    { k:'amplifier', n:4, plain:{ name:'The Megaphone', fn:'Picks the loudest gauge and shouts' },
                     tech :{ name:'The amplifier', fn:'Funding and media · gain: high' } },
    { k:'converge', n:5, plain:{ name:'Agreement', fn:'The strongest reading on the panel' },
                    tech :{ name:'Convergence', fn:'Agreement across independent designs' } }
  ],

  modes: [
    { k:'onestudy', label:{ plain:'One study', tech:'Single instrument' }, fault:false,
      cap:{ plain:'<b>One study.</b> A single gauge, read confidently. This is what almost every headline you have ever seen is standing on.',
            tech :'<b>Single instrument.</b> One reading, taken at face value. Effect sizes in this field are typically small, and one instrument cannot tell you which way it is wrong.' } },

    { k:'allgauges', label:{ plain:'All the gauges', tech:'Full panel' }, fault:false,
      cap:{ plain:'<b>All the gauges.</b> Five instruments, five different readings. Each has a characteristic blind spot; disagreement is information about the instruments as well as the question.',
            tech :'<b>Full panel.</b> Five designs, five readings. Each carries characteristic bias and uncertainty. Picking a favourite is not a method.' } },

    { k:'converge', label:{ plain:'Convergence', tech:'Convergence' }, fault:false,
      cap:{ plain:'<b>Convergence.</b> They settle into agreement. This is what trustworthy actually looks like — undramatic, slow, and almost never in the news.',
            tech :'<b>Convergence.</b> Independent designs with different failure modes point the same way. That is among the strongest readings the panel can produce.' } },

    { k:'megaphone', label:{ plain:'With a megaphone', tech:'Amplified' }, fault:false,
      cap:{ plain:'<b>With a megaphone.</b> The most extreme gauge gets picked up and broadcast. The field looks like it keeps changing its mind because you are watching it correct itself in public, at speed, with the volume up.',
            tech :'<b>Amplified.</b> Selection for surprise picks the outlying instrument and broadcasts it. The apparent instability of the field is the error-correction being observed in public, at gain.' } }
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
    <text class="dimtext" x="370" y="330" text-anchor="middle" opacity=".7">one instrument, read confidently</text>
  </g>

  <!-- ===== full panel ===== -->
  <g class="anim a-allgauges">
    ${gauge(140, 258, 'RCT-1', 'trial', [-18, -18])}
    ${gauge(255, 258, 'COH-2', 'cohort', [10, -22])}
    ${gauge(370, 258, 'MEC-3', 'mechanism', [-4, -24])}
    ${gauge(485, 258, 'OBS-4', 'observed', [20, -14])}
    ${gauge(600, 258, 'SR-5', 'review', [-12, -21])}
    <text class="dimtext" x="370" y="352" text-anchor="middle" opacity=".7">five instruments · five readings · none of them faulty</text>
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
    <text class="dimtext techonly"  x="80" y="528">SETTLED CORE — NOT SERIOUSLY DISPUTED, NEVER IN THE NEWS</text>
    <text class="dimtext plainonly" x="80" y="528">THE BORING PART NOBODY ARGUES ABOUT</text>
    <text class="lbl-fn" x="80" y="556">Smoking causes cancer · severe energy excess over years causes harm</text>
    <text class="lbl-fn" x="80" y="574">Trans fats damage cardiovascular health</text>
    <text class="lbl-fn" x="80" y="592">Extreme deficiency of any essential nutrient causes deficiency disease</text>
  </g>

  <!-- myth annotation -->
  <g class="mythonly">
    <circle class="hazard" cx="370" cy="258" r="58"/>
    <path class="scribble" d="M340 230 L400 288 M400 230 L340 288"/>
    <path class="leader" d="M428 258 L500 470 L516 470" style="stroke:var(--chilli)" />
    <text class="hazardtext" x="522" y="466">"Nobody really knows anything"</text>
    <text class="hazardtext" x="522" y="480" opacity=".75">— the reversals are the point</text>
  </g>

  <!-- ================= HOTSPOTS ================= -->
  <g class="hot" data-k="trial" role="button" tabindex="0" aria-label="The clean gauge">
    <path class="leader" d="M140 196 L118 108 L104 108"/>
    <text class="lbl-name techonly"  x="98" y="105" text-anchor="end">Randomised trial</text>
    <text class="lbl-name plainonly" x="98" y="105" text-anchor="end">The Clean Gauge</text>
    <text class="lbl-fn techonly"    x="98" y="119" text-anchor="end">Low bias · short · small n</text>
    <text class="lbl-fn plainonly"   x="98" y="120" text-anchor="end">Trustworthy, short, artificial</text>
    <circle class="hotring" cx="140" cy="196" r="10"/>
    <circle class="hithalo" cx="140" cy="196" r="22"/>
    <circle class="hotdot" cx="140" cy="196" r="10"/>
    <text class="hotnum" x="140" y="196">1</text>
  </g>

  <g class="hot" data-k="cohort" role="button" tabindex="0" aria-label="The long gauge">
    <path class="leader" d="M255 196 L300 96 L316 96"/>
    <text class="lbl-name techonly"  x="322" y="93">Cohort study</text>
    <text class="lbl-name plainonly" x="322" y="93">The Long Gauge</text>
    <text class="lbl-fn techonly"    x="322" y="107">Decades · real conditions · confounded</text>
    <text class="lbl-fn plainonly"   x="322" y="108">Real life, hopelessly tangled</text>
    <circle class="hotring" cx="255" cy="196" r="10"/>
    <circle class="hithalo" cx="255" cy="196" r="22"/>
    <circle class="hotdot" cx="255" cy="196" r="10"/>
    <text class="hotnum" x="255" y="196">2</text>
  </g>

  <g class="hot" data-k="bias" role="button" tabindex="0" aria-label="The tilt">
    <path class="leader" d="M120 370 L96 434 L82 434"/>
    <text class="lbl-name techonly"  x="76" y="431" text-anchor="end">Healthy-user effect</text>
    <text class="lbl-name plainonly" x="76" y="431" text-anchor="end">The Tilt</text>
    <text class="lbl-fn techonly"    x="76" y="445" text-anchor="end">Systematic, in one direction</text>
    <text class="lbl-fn plainonly"   x="76" y="446" text-anchor="end">The food gets all the credit</text>
    <circle class="hotring" cx="120" cy="370" r="10"/>
    <circle class="hithalo" cx="120" cy="370" r="22"/>
    <circle class="hotdot" cx="120" cy="370" r="10"/>
    <text class="hotnum" x="120" y="370">3</text>
  </g>

  <g class="hot" data-k="amplifier" role="button" tabindex="0" aria-label="The megaphone">
    <path class="leader" d="M620 330 L668 396 L684 396"/>
    <text class="lbl-name techonly"  x="690" y="393" text-anchor="end">The amplifier</text>
    <text class="lbl-name plainonly" x="690" y="393" text-anchor="end">The Megaphone</text>
    <text class="lbl-fn techonly"    x="690" y="407" text-anchor="end">Funding and media · gain high</text>
    <text class="lbl-fn plainonly"   x="690" y="408" text-anchor="end">Picks the loudest gauge</text>
    <circle class="hotring" cx="620" cy="330" r="10"/>
    <circle class="hithalo" cx="620" cy="330" r="22"/>
    <circle class="hotdot" cx="620" cy="330" r="10"/>
    <text class="hotnum" x="620" y="330">4</text>
  </g>

  <g class="hot" data-k="converge" role="button" tabindex="0" aria-label="Agreement">
    <path class="leader" d="M370 620 L420 690 L436 690"/>
    <text class="lbl-name techonly"  x="442" y="687">Convergence</text>
    <text class="lbl-name plainonly" x="442" y="687">Agreement</text>
    <text class="lbl-fn techonly"    x="442" y="701">Agreement across independent designs</text>
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
      kicker: 'The short version',
      points: [
        { h:'No single instrument is enough.', p:'Each study design has characteristic blind spots. That is a property of measurement, not a scandal.' },
        { k:'trial', h:'The clean ones are short.',
          p:'Randomising who gets what tends to balance both known and unknown confounders between groups, which is why trials are so powerful. It does not guarantee perfect balance in one finite study, and nutrition trials are often short, expensive and hard to blind.' },
        { k:'cohort', h:'The long ones are tangled.',
          p:'It follows real people eating real food for decades, which is the timescale that actually matters. It also cannot separate the food from everyone who eats it: their income, their exercise, their smoking, their doctor.' },
        { k:'bias', h:'The Tilt',
          p:'People who take up any recommended behaviour tend to take up others at the same time. Whatever food you are studying arrives surrounded by a whole lifestyle, and the food gets the credit for all of it.' },
        { k:'amplifier', h:'The volume is not evidence.',
          p:'Industry funds research into its own products, and the findings skew accordingly. Press releases select for surprise. A modest, hedged result becomes a headline the paper&rsquo;s own authors would not sign.' },
        { k:'converge', h:'Believe them when they agree.',
          p:'When trials, long studies, mechanism and different populations point the same way, confidence rises sharply — especially when those methods fail in different ways. It is slower and less dramatic than one headline, which is exactly the point.' }
      ],
      note: '<b>Why it looks messy.</b> The reason nutrition science looks like it keeps changing its mind is that you are watching the error-correction happen in public, at speed, with a megaphone attached. The mechanism that makes it look unreliable — findings challenged, revised, sometimes reversed — is the same mechanism that makes it worth trusting over decades. A field that never reversed anything would not be more rigorous. It would just not be checking.'
    },
    tech: {
      kicker: 'Instrumentation Datasheet',
      spec: [
        { k:'Class',                  v:'Distributed instrumentation, imperfectly calibrated' },
        { k:'Randomised trial',       v:'Strong causal design · often shorter · adherence/blinding limits' },
        { k:'Cohort study',           v:'Long duration · real conditions · confounded' },
        { k:'Mechanistic work',       v:'Explains how · does not establish whether it matters in people' },
        { k:'Self-reported intake',   v:'Systematically low' },
        { k:'Effect sizes',           v:'Typically small. Hazard ratios near 1.1 mean very little alone.' },
        { k:'Relative vs absolute',   v:'"Raises risk 30%" may mean 1 in 100 becomes 1.3 in 100' },
        { k:'Funding effect',         v:'Measurable, and in the sponsor&rsquo;s direction' },
        { k:'Publication effect',     v:'Positive and surprising results are likelier to appear' },
        { k:'Trustworthy reading',    v:'<em>Agreement across independent designs</em>' }
      ],
      points: [
        { k:'trial', h:'Randomised trial',
          p:'Randomisation tends to balance measured and unmeasured baseline factors on average. It is powerful causal machinery, not a guarantee of perfect balance in a finite trial; long-term diet trials also face adherence, cost and blinding limits.' },
        { k:'cohort', h:'Cohort study',
          p:'Follows real people eating real food for decades, which is the timescale that actually matters. It cannot separate the food from everyone who eats it: their income, their exercise, their smoking, their doctor.' },
        { k:'bias', h:'Healthy-user effect',
          p:'People who take up any recommended behaviour tend to take up others at the same time. Whatever food is under study arrives surrounded by a whole lifestyle, and the food gets the credit for all of it.' },
        { k:'amplifier', h:'The amplifier',
          p:'Industry funds research into its own products, and the findings skew accordingly. Press releases select for surprise. A modest, hedged result becomes a headline that the paper&rsquo;s own authors would not sign.' },
        { k:'converge', h:'Convergence',
          p:'Convergence across trials, cohorts, mechanistic work and populations is powerful when the designs have genuinely different failure modes. Shared bias can still make several instruments agree on the wrong number.' }
      ],
      note: '<b>Design note.</b> The reason nutrition science looks like it keeps changing its mind is that you are watching the error-correction happen in public, at speed, with a megaphone attached. The mechanism that makes it look unreliable is the same mechanism that makes it worth trusting over decades. A field that never reversed anything would not be more rigorous. It would just not be checking.',
      analogy: {
        tag: 'How the panel works',
        body: 'A control room full of imperfect instruments. Operators do not solve this by choosing a favourite gauge; they compare instruments with different failure modes, check calibration, and become more confident when independent readings converge.'
      }
    }
  },

  modelLimits: [
    'Randomisation tends to balance confounders on average; it does not guarantee perfect balance in one finite trial.',
    'Convergence is most persuasive when methods have genuinely different biases. Several methods can still agree because they share the same systematic error.'
  ],

  myth: {
    claim: 'Scientists keep changing their minds, so nobody really knows anything.',
    mechanism: [
      'Some things have not changed in decades and are not seriously disputed: smoking causes cancer, severe energy excess over years causes harm, trans fats damage cardiovascular health, extreme deficiency of any essential nutrient causes deficiency disease. This is the settled core, and it is boring, which is why it is never in the news.',
      'What changes is the frontier: the marginal effect of one food, the optimal ratio of one macronutrient, the newest candidate for villain. That is where the evidence is thin and the headlines live. Mistaking the frontier for the whole field is like concluding that bridges are unreliable because engineers are still arguing about a new material.',
      'And the reversals are the point. A discipline that finds and publishes its own errors is demonstrating exactly the property that makes it worth believing. Compare it fairly — not against an imaginary source of permanent truth, but against the alternatives on offer, which change their minds just as often and never announce it.'
    ],
    whySurvives: 'Because "nobody knows" is comfortable. It converts the effort of weighing evidence into permission to believe whatever you already preferred — and there is always someone selling certainty to fill the gap.'
  }
};
