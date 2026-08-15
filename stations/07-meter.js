/* ============================================================
   STATION 07 — THE ENERGY METER
   An instrument, not a vessel. The gag is visual and should land
   before a word is read: a four-digit display fed by inputs that
   all carry error bars.
   ============================================================ */

export default {
  id: 'meter', no: '07', section: 'Instrumentation',

  rail:  { plain:'Calories',        tech:'Energy Meter' },
  title: { plain:'Calories',        tech:'The Energy Meter' },
  sub:   { plain:'The physics is exact. The measurement is not. Those are different problems.',
           tech :'Instrument FI-07 · exact physics, approximate readings' },

  drawing: { no:'MB-STN-07', rev:'A', vessel:'FI-07',
             desc:'Energy balance instrument', view:'Schematic' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'intake', n:1, plain:{ name:'What Went In', fn:'The least reliable number here' },
                  tech :{ name:'Intake metering', fn:'−20 to −30% typical, self-reported' } },
    { k:'base', n:2, plain:{ name:'The Base Load', fn:'Most of the total, and not yours to set' },
                tech :{ name:'Base load', fn:'BMR · 60–70% of total' } },
    { k:'tef', n:3, plain:{ name:'The Handling Charge', fn:'It costs energy to process energy' },
               tech :{ name:'Processing cost', fn:'TEF · ~10% of intake' } },
    { k:'neat', n:4, plain:{ name:'Fidgeting', fn:'The term that ruins the arithmetic' },
                tech :{ name:'Incidental movement', fn:'NEAT · highly variable, adapts down' } },
    { k:'exercise', n:5, plain:{ name:'Actual Exercise', fn:'A modest slice, and the wrong output to judge' },
                    tech :{ name:'Deliberate exercise', fn:'Modest slice · major off-meter effect' } }
  ],

  modes: [
    { k:'reading', label:{ plain:'Reading the meter', tech:'Indicated value' }, fault:false,
      cap:{ plain:'<b>Reading the meter.</b> A confident four-digit number, displayed to the nearest unit. This is what the app shows you, and it looks exactly like a measurement.',
            tech :'<b>Indicated value.</b> Four significant figures, displayed without qualification. The law it rests on is exact; the display implies the inputs are too.' } },

    { k:'errorbars', label:{ plain:'Show the error bars', tech:'With uncertainty' }, fault:false,
      cap:{ plain:'<b>Show the error bars.</b> The same number, honestly. For many people, uncertainty in daily intake and expenditure can be comparable to the deficit they think they have created.',
            tech :'<b>With uncertainty.</b> Input uncertainty rendered on the same reading. Depending on the person and method, it can be comparable to a modest target deficit.' } },

    { k:'months', label:{ plain:'Months of eating less', tech:'Adaptive response' }, fault:false,
      cap:{ plain:'<b>Months of eating less.</b> Expenditure quietly adapts downward — the base load drifts, the fidgeting falls, and the gap you calculated is not the gap you are running. Nobody cheated.',
            tech :'<b>Adaptive response.</b> Sustained restriction lowers base load and incidental movement. The realised deficit falls below the calculated one without any change in reported intake.' } }
  ],

  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="Energy balance drawn as a plant meter whose every input carries an error bar">
  <title>Energy balance drawn as a plant meter whose every input carries an error bar</title>
  <defs>
    <marker id="arw07" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.34)"/>
    </marker>
  </defs>

  <!-- ===== the meter ===== -->
  <rect class="vessel" x="250" y="286" width="300" height="180" rx="4"/>
  <rect class="readoutbox" x="276" y="316" width="248" height="72"/>
  <text class="dimtext techonly"  x="400" y="430" text-anchor="middle">ENERGY BALANCE · FI-07</text>
  <text class="dimtext plainonly" x="400" y="430" text-anchor="middle">TODAY'S TOTAL</text>
  <text class="dimtext" x="400" y="448" text-anchor="middle" opacity=".55">kcal / day</text>

  <!-- input lines, all four of them feeding the same display -->
  <path class="pipe" d="M60 150 L236 150 L236 320 L222 320 L222 164 L60 164 Z"/>
  <path class="pipe" d="M60 224 L222 224 L222 348 L236 348 L236 238 L60 238 Z"/>
  <path class="pipe" d="M60 560 L236 560 L236 404 L222 404 L222 546 L60 546 Z"/>
  <path class="pipe" d="M60 636 L222 636 L222 430 L236 430 L236 622 L60 622 Z"/>
  <path class="pipe" d="M550 372 L640 372 L640 388 L550 388 Z"/>

  <!-- ===== indicated value ===== -->
  <g class="anim a-reading">
    <text class="digits" x="400" y="366" text-anchor="middle">1,847</text>
    <text class="dimtext" x="400" y="474" text-anchor="middle" opacity=".7">to the nearest Calorie</text>
  </g>

  <!-- ===== with uncertainty ===== -->
  <g class="anim a-errorbars">
    <rect class="errband" x="286" y="322" width="228" height="60"/>
    <text class="digits" x="400" y="366" text-anchor="middle" opacity=".45">1,847</text>
    <line class="errbar" x1="286" y1="352" x2="514" y2="352"/>
    <line class="errbar" x1="286" y1="336" x2="286" y2="368"/>
    <line class="errbar" x1="514" y1="336" x2="514" y2="368"/>
    <text class="dimtext techonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">SOMEWHERE BETWEEN 1,500 AND 2,300</text>
    <text class="dimtext plainonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">Somewhere between 1,500 and 2,300</text>
    <text class="dimtext" x="400" y="490" text-anchor="middle" opacity=".7" style="fill:var(--chilli)">and the deficit you were aiming at is smaller than that</text>
  </g>

  <!-- ===== adaptive response ===== -->
  <g class="anim a-months">
    <text class="digits" x="400" y="366" text-anchor="middle">1,847</text>
    <path class="leader" d="M60 592 C160 592 200 604 236 616" marker-end="url(#arw07)" style="stroke:var(--chilli)" />
    <path class="leader" d="M60 196 C160 196 200 206 236 214" marker-end="url(#arw07)" style="stroke:var(--chilli)" />
    <text class="dimtext techonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">EXPENDITURE ADAPTING DOWN · DEFICIT SHRINKING</text>
    <text class="dimtext plainonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">Spending quietly drifts down. The gap closes on its own.</text>
    <text class="dimtext" x="400" y="490" text-anchor="middle" opacity=".7">Nobody cheated. This is a control system doing what control systems do.</text>
  </g>

  <!-- error bars sit on every input, always -->
  <g class="mechonly">
    <line class="errbar" x1="96" y1="157" x2="180" y2="157" opacity=".7"/>
    <line class="errbar" x1="96" y1="149" x2="96"  y2="165" opacity=".7"/>
    <line class="errbar" x1="180" y1="149" x2="180" y2="165" opacity=".7"/>
    <line class="errbar" x1="110" y1="231" x2="164" y2="231" opacity=".7"/>
    <line class="errbar" x1="110" y1="223" x2="110" y2="239" opacity=".7"/>
    <line class="errbar" x1="164" y1="223" x2="164" y2="239" opacity=".7"/>
    <line class="errbar" x1="88" y1="553" x2="192" y2="553" opacity=".7"/>
    <line class="errbar" x1="88" y1="545" x2="88"  y2="561" opacity=".7"/>
    <line class="errbar" x1="192" y1="545" x2="192" y2="561" opacity=".7"/>
    <line class="errbar" x1="122" y1="629" x2="158" y2="629" opacity=".7"/>
    <line class="errbar" x1="122" y1="621" x2="122" y2="637" opacity=".7"/>
    <line class="errbar" x1="158" y1="621" x2="158" y2="637" opacity=".7"/>
  </g>

  <!-- instrument tag (Nerd Mode only) -->
  <g class="techonly" transform="translate(672,560)">
    <circle cx="0" cy="0" r="44" fill="none" stroke="var(--line-dim)" stroke-width="1"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="var(--line-faint)" stroke-width="1"/>
    <path d="M-30 12 A34 34 0 0 1 30 12" fill="none" stroke="var(--chilli)" stroke-width="2.5" opacity=".55"/>
    <line class="needle" x1="0" y1="12" x2="4" y2="-22" style="stroke:var(--chilli)" />
    <circle cx="0" cy="12" r="3" fill="var(--line)"/>
    <text class="dimtext" x="0" y="34" text-anchor="middle">± 25% on inputs</text>
    <text class="dimtext" x="0" y="-30" text-anchor="middle" opacity=".6">QI-707</text>
  </g>

  <!-- myth annotation -->
  <g class="mythonly">
    <circle class="hazard" cx="400" cy="352" r="52"/>
    <path class="scribble" d="M370 326 L430 378 M430 326 L370 378"/>
    <path class="leader" d="M452 352 L450 250 L464 250" style="stroke:var(--chilli)"/>
    <text class="hazardtext" x="470" y="246">"My app says 1,847"</text>
    <text class="hazardtext" x="452" y="260" opacity=".75">— it says that. It does not know that.</text>
  </g>

  <!-- ================= HOTSPOTS ================= -->
  <g class="hot" data-k="intake" role="button" tabindex="0" aria-label="What went in">
    <path class="leader" d="M138 150 L220 92 L236 92"/>
    <text class="lbl-name techonly"  x="242" y="89">Intake metering</text>
    <text class="lbl-name plainonly" x="242" y="89">What Went In</text>
    <text class="lbl-fn techonly"    x="242" y="105">−20 to −30% typical, self-reported</text>
    <text class="lbl-fn plainonly"   x="242" y="106">The least reliable number here</text>
    <circle class="hotring" cx="138" cy="150" r="10"/>
    <circle class="hithalo" cx="138" cy="150" r="22"/>
    <circle class="hotdot" cx="138" cy="150" r="10"/>
    <text class="hotnum" x="138" y="150">1</text>
  </g>

  <g class="hot" data-k="base" role="button" tabindex="0" aria-label="The base load">
    <path class="leader" d="M138 231 L100 276 L86 276"/>
    <text class="lbl-name techonly"  x="80" y="273" text-anchor="end">Base load</text>
    <text class="lbl-name plainonly" x="80" y="273" text-anchor="end">The Base Load</text>
    <text class="lbl-fn techonly"    x="80" y="287" text-anchor="end">BMR · 60–70% of total</text>
    <text class="lbl-fn plainonly"   x="80" y="288" text-anchor="end">Most of the total</text>
    <circle class="hotring" cx="138" cy="231" r="10"/>
    <circle class="hithalo" cx="138" cy="231" r="22"/>
    <circle class="hotdot" cx="138" cy="231" r="10"/>
    <text class="hotnum" x="138" y="231">2</text>
  </g>

  <g class="hot" data-k="tef" role="button" tabindex="0" aria-label="The handling charge">
    <path class="leader" d="M596 380 L640 300 L656 300"/>
    <text class="lbl-name techonly"  x="662" y="297">Processing cost</text>
    <text class="lbl-name plainonly" x="608" y="297">Handling Charge</text>
    <text class="lbl-fn techonly"    x="662" y="311">TEF · ~10%</text>
    <text class="lbl-fn plainonly"   x="662" y="312">~10% of intake</text>
    <circle class="hotring" cx="596" cy="380" r="10"/>
    <circle class="hithalo" cx="596" cy="380" r="22"/>
    <circle class="hotdot" cx="596" cy="380" r="10"/>
    <text class="hotnum" x="596" y="380">3</text>
  </g>

  <g class="hot" data-k="neat" role="button" tabindex="0" aria-label="Fidgeting">
    <path class="leader" d="M138 553 L96 508 L82 508"/>
    <text class="lbl-name techonly"  x="76" y="505" text-anchor="end">Incidental movement</text>
    <text class="lbl-name plainonly" x="76" y="505" text-anchor="end">Fidgeting</text>
    <text class="lbl-fn techonly"    x="76" y="519" text-anchor="end">NEAT · adapts downward</text>
    <text class="lbl-fn plainonly"   x="76" y="520" text-anchor="end">Ruins the arithmetic</text>
    <circle class="hotring" cx="138" cy="553" r="10"/>
    <circle class="hithalo" cx="138" cy="553" r="22"/>
    <circle class="hotdot" cx="138" cy="553" r="10"/>
    <text class="hotnum" x="138" y="553">4</text>
  </g>

  <g class="hot" data-k="exercise" role="button" tabindex="0" aria-label="Actual exercise">
    <path class="leader" d="M138 629 L138 700 L152 700"/>
    <text class="lbl-name techonly"  x="158" y="697">Deliberate exercise</text>
    <text class="lbl-name plainonly" x="158" y="697">Actual Exercise</text>
    <text class="lbl-fn techonly"    x="158" y="711">Modest slice · major off-meter effect</text>
    <text class="lbl-fn plainonly"   x="158" y="712">A modest slice on the meter</text>
    <circle class="hotring" cx="138" cy="629" r="10"/>
    <circle class="hithalo" cx="138" cy="629" r="22"/>
    <circle class="hotdot" cx="138" cy="629" r="10"/>
    <text class="hotnum" x="138" y="629">5</text>
  </g>

  <text class="dimtext techonly"  x="-84" y="128">▶ INPUTS — every one with a tolerance</text>
  <text class="dimtext plainonly" x="-84" y="128">▶ Everything feeding the number</text>
  <text class="dimtext techonly"  x="648" y="410">READING ▶</text>
  <text class="dimtext plainonly" x="648" y="410">THE NUMBER ▶</text>
</svg>`,

  main: {
    plain: {
      kicker: 'The short version',
      points: [
        { h:'The physics is not negotiable.', p:'Energy balances. Nothing here is a loophole, and anyone selling you one is selling you something else.' },
        { k:'intake', h:'The instrument is noisy.',
          p:'Self-reported intake often underestimates true intake, sometimes substantially, because portions are hard to estimate and items are forgotten. Packet labels and food databases add their own uncertainty. Every number you type into an app inherits some of it.' },
        { k:'base', h:'Most of the spending is not yours to set.',
          p:'Resting metabolism is usually the largest slice; in many sedentary adults it is around sixty to seventy per cent of total expenditure. It varies with body size, lean mass, age and other factors, and falls as mass is lost.' },
        { k:'tef', h:'The Handling Charge',
          p:'Around ten per cent of what you eat is spent digesting what you eat. Protein costs the most to process. This is a real effect and a small one, and it is regularly sold as though it were large.' },
        { k:'neat', h:'Fidgeting is the wild card.',
          p:'Standing, walking about, gesturing, shifting in your chair. A highly variable component: it can differ by hundreds of Calories a day between people, and it can quietly fall during sustained energy restriction.' },
        { k:'exercise', h:'Exercise is not the whole meter.',
          p:'For most non-athletes, deliberate exercise is a modest slice of total expenditure, while its important effects extend well beyond Calories: muscle, glucose handling, fitness, mood and ageing. Judging exercise by the calorie counter is measuring the wrong output.' }
      ],
      note: '<b>Read the trend.</b> Both popular positions are wrong. "Calories do not matter" claims energy can be created, which it cannot. "Just count your Calories" claims the meter can be read to the nearest unit, which it cannot either. The law is exact; the instrument is not. You are steering a real system with a blurred gauge — which is an argument for consistent habits and long time-frames, and against re-weighing your rice.'
    },
    tech: {
      kicker: 'Instrument Datasheet',
      spec: [
        { k:'Class',                v:'Energy balance instrument' },
        { k:'Governing law',        v:'Thermodynamics. Exact. Not negotiable.' },
        { k:'Intake reading error', v:'Self-report often biased low; magnitude varies' },
        { k:'Label values',         v:'Estimated; rounding and regulatory tolerances vary' },
        { k:'Base load share',      v:'Often ~60–70% in sedentary adults' },
        { k:'Processing cost share', v:'~10%' },
        { k:'Incidental movement',  v:'Highly variable; adapts downward under restriction' },
        { k:'Available ≠ label',    v:'Whole nuts and high-fibre foods deliver measurably less than their Atwater figures' },
        { k:'Combined uncertainty', v:'Can be comparable to a modest daily target deficit' },
        { k:'Display precision',    v:'Four significant figures. Entirely fictional.' }
      ],
      points: [
        { k:'intake', h:'Intake metering',
          p:'Often the noisiest input in the system. Self-reported intake commonly underestimates measured energy intake, with the size of the error varying by method and population. Label and database values add further uncertainty.' },
        { k:'base', h:'Base load',
          p:'Usually the largest component of total expenditure; often around 60–70% in sedentary adults. It varies with body size, lean mass, age and physiology, and declines as body mass falls.' },
        { k:'tef', h:'Processing cost',
          p:'Around 10% of intake is expended processing that intake. Protein carries the highest thermic cost. A real effect, and a small one.' },
        { k:'neat', h:'Incidental movement',
          p:'Fidgeting, standing, ambulation, gesture. A highly variable component of expenditure: it can differ by hundreds of Calories a day between people and can fall under energy restriction. This is the term that ruins the arithmetic.' },
        { k:'exercise', h:'Deliberate exercise',
          p:'For most non-athletes, deliberate exercise is a modest component of total expenditure, with major effects this instrument does not capture: muscle mass, glucose handling, cardiovascular fitness, mood and ageing. Judging it by the calorie counter is reading the wrong output.' }
      ],
      note: '<b>Design note.</b> Both popular positions here are wrong. "Calories don&rsquo;t matter" is a claim that energy can be created, which it cannot. "Just count your Calories" is a claim that the meter can be read to the nearest unit, which it cannot either. The law is exact; the instrument is not.',
      analogy: {
        tag: 'How to read it',
        body: 'A plant energy meter whose inputs have different, imperfect tolerances. No process engineer would deny that energy balances, or pretend every input is known to four digits. They would watch the trend over time and recalibrate against the actual output.'
      }
    }
  },

  modelLimits: [
    'The uncertainty shown here is pedagogical, not a fixed ±25% applied to every person or every input. Some quantities can be measured far more accurately than others.',
    'Energy balance is exact over time; the practical problem is estimating the changing inputs and outputs closely enough to steer behaviour.'
  ],

  myth: {
    claim: 'My app says I ate 1,847 Calories today.',
    mechanism: [
      'It says that. It does not know that. That number is the sum of a portion estimate, a database entry, and a label tolerance, each carrying error, and it is displayed without any of them.',
      'Food-energy numbers ultimately come from calorimetry plus average metabolizable-energy factors; nobody burns your exact idli before lunch. Your body is not a bomb calorimeter: absorption is incomplete, microbes get a share, and Atwater factors are population averages that can miss the usable energy of particular foods and food structures.',
      'On the other side of the meter, expenditure adapts. Eat less for long enough and incidental movement falls, base load drifts down, and the deficit you calculated is not the deficit you are running. This is not the body "holding on to fat" out of spite. It is a control system doing what control systems do. None of this creates a loophole in physics — it means the arithmetic is real and the inputs are soft, which is a very different problem from the one the app is pretending to solve.'
    ],
    whySurvives: 'Because the app displays a number and numbers feel like measurements. A range with uncertainty is less satisfying than 1,847, even when the range is the more honest description.'
  }
};
