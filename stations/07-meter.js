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
  sub:   { plain:'The physics is exact. The measurement is not exact. These are two different problems.',
           tech :'Instrument FI-07 · the physics is exact and the readings are approximate' },

  drawing: { no:'MB-STN-07', rev:'A', vessel:'FI-07',
             desc:'Energy balance instrument', view:'Schematic' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'intake', n:1, plain:{ name:'What Went In', fn:'The least reliable number here' },
                  tech :{ name:'Intake metering', fn:'Self-reported · usually 20 to 30% too low' } },
    { k:'base', n:2, plain:{ name:'The Base Load', fn:'Most of the total. You do not set it.' },
                tech :{ name:'Base load', fn:'BMR · 60 to 70% of the total' } },
    { k:'tef', n:3, plain:{ name:'The Handling Charge', fn:'Your body uses energy to process energy' },
               tech :{ name:'Processing cost', fn:'TEF · about 10% of the intake' } },
    { k:'neat', n:4, plain:{ name:'Fidgeting', fn:'This term makes the arithmetic unreliable' },
                tech :{ name:'Incidental movement', fn:'NEAT · it varies greatly and it decreases' } },
    { k:'exercise', n:5, plain:{ name:'Actual Exercise', fn:'A small part. Do not judge exercise by it.' },
                    tech :{ name:'Deliberate exercise', fn:'A small part · large effects this meter misses' } }
  ],

  modes: [
    { k:'reading', label:{ plain:'Reading the meter', tech:'Indicated value' }, fault:false,
      cap:{ plain:'<b>Reading the meter.</b> The display shows a four-digit number to the nearest unit. The app shows you this number, and it looks like a measurement.',
            tech :'<b>Indicated value.</b> The display shows four significant figures and gives no limits. The law below the number is exact. The display suggests that the inputs are also exact.' } },

    { k:'errorbars', label:{ plain:'Show the error bars', tech:'With uncertainty' }, fault:false,
      cap:{ plain:'<b>Show the error bars.</b> This is the same number with its limits. For many persons the uncertainty in the daily intake and the daily expenditure is as large as the deficit that they believe they made.',
            tech :'<b>With uncertainty.</b> The same reading now shows the uncertainty of the inputs. The uncertainty changes with the person and with the method. It can be as large as a small target deficit.' } },

    { k:'months', label:{ plain:'Months of eating less', tech:'Adaptive response' }, fault:false,
      cap:{ plain:'<b>Months of eating less.</b> Your expenditure decreases. The base load falls, and you move less without your knowledge. The deficit that you calculated is larger than the deficit that you have. Nobody made an error.',
            tech :'<b>Adaptive response.</b> A long period of restriction reduces the base load and the incidental movement. The true deficit becomes smaller than the calculated deficit. The reported intake does not change.' } }
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
    <text class="dimtext" x="400" y="490" text-anchor="middle" opacity=".7" style="fill:var(--chilli)">the deficit is smaller than you intended</text>
  </g>

  <!-- ===== adaptive response ===== -->
  <g class="anim a-months">
    <text class="digits" x="400" y="366" text-anchor="middle">1,847</text>
    <path class="leader" d="M60 592 C160 592 200 604 236 616" marker-end="url(#arw07)" style="stroke:var(--chilli)" />
    <path class="leader" d="M60 196 C160 196 200 206 236 214" marker-end="url(#arw07)" style="stroke:var(--chilli)" />
    <text class="dimtext techonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">EXPENDITURE ADAPTING DOWN · DEFICIT SHRINKING</text>
    <text class="dimtext plainonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">The expenditure falls. The gap closes without your action.</text>
    <text class="dimtext" x="400" y="490" text-anchor="middle" opacity=".7">Nobody made an error. This is normal control-system behaviour.</text>
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
    <text class="hazardtext" x="452" y="260" opacity=".75">It states that. It does not know that.</text>
  </g>

  <!-- ================= HOTSPOTS ================= -->
  <g class="hot" data-k="intake" role="button" tabindex="0" aria-label="What went in">
    <path class="leader" d="M138 150 L220 92 L236 92"/>
    <text class="lbl-name techonly"  x="242" y="89">Intake metering</text>
    <text class="lbl-name plainonly" x="242" y="89">What Went In</text>
    <text class="lbl-fn techonly"    x="242" y="105">Self-reported · usually 20–30% too low</text>
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
    <text class="lbl-fn techonly"    x="80" y="287" text-anchor="end">BMR · 60–70% of the total</text>
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
    <text class="lbl-fn techonly"    x="662" y="311">TEF · about 10%</text>
    <text class="lbl-fn plainonly"   x="662" y="312">About 10% of intake</text>
    <circle class="hotring" cx="596" cy="380" r="10"/>
    <circle class="hithalo" cx="596" cy="380" r="22"/>
    <circle class="hotdot" cx="596" cy="380" r="10"/>
    <text class="hotnum" x="596" y="380">3</text>
  </g>

  <g class="hot" data-k="neat" role="button" tabindex="0" aria-label="Fidgeting">
    <path class="leader" d="M138 553 L96 508 L82 508"/>
    <text class="lbl-name techonly"  x="76" y="505" text-anchor="end">Incidental movement</text>
    <text class="lbl-name plainonly" x="76" y="505" text-anchor="end">Fidgeting</text>
    <text class="lbl-fn techonly"    x="76" y="519" text-anchor="end">NEAT · it decreases</text>
    <text class="lbl-fn plainonly"   x="76" y="520" text-anchor="end">Makes the arithmetic unreliable</text>
    <circle class="hotring" cx="138" cy="553" r="10"/>
    <circle class="hithalo" cx="138" cy="553" r="22"/>
    <circle class="hotdot" cx="138" cy="553" r="10"/>
    <text class="hotnum" x="138" y="553">4</text>
  </g>

  <g class="hot" data-k="exercise" role="button" tabindex="0" aria-label="Actual exercise">
    <path class="leader" d="M138 629 L138 700 L152 700"/>
    <text class="lbl-name techonly"  x="158" y="697">Deliberate exercise</text>
    <text class="lbl-name plainonly" x="158" y="697">Actual Exercise</text>
    <text class="lbl-fn techonly"    x="158" y="711">A small part · large effects not measured</text>
    <text class="lbl-fn plainonly"   x="158" y="712">A small part of the meter</text>
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
      kicker: 'Summary',
      points: [
        { h:'You cannot change the physics.', p:'The energy balances. There is no exception here. A person who offers you an exception offers you something different.' },
        { k:'intake', h:'The instrument is not accurate.',
          p:'A person who reports their own intake usually reports a value that is too low, and sometimes much too low. It is difficult to estimate a portion, and it is easy to forget an item. The labels on packets and the food databases add more uncertainty. Each number that you type into an app carries some of this error.' },
        { k:'base', h:'You do not set most of the expenditure.',
          p:'The resting metabolism is usually the largest part. In many adults who do not exercise it is sixty to seventy per cent of the total. It changes with your body size, your lean mass and your age. It falls when you lose mass.' },
        { k:'tef', h:'The Handling Charge',
          p:'Your body uses about ten per cent of the food that you eat to digest that food. Protein needs the most energy. The effect is true, and it is small. Many products describe it as a large effect.' },
        { k:'neat', h:'Small movements change the total greatly.',
          p:'This includes standing, walking, gesturing and movement in your chair. The quantity varies greatly. It can differ by hundreds of Calories a day between two persons, and it falls during a long period of restriction.' },
        { k:'exercise', h:'Exercise is one part of the meter.',
          p:'For most persons who are not athletes, planned exercise is a small part of the total expenditure. Its important effects are not measured in Calories. They are your muscle, your glucose control, your fitness, your mood and how you age. If you judge exercise by the calorie counter, you measure the wrong output.' }
      ],
      note: '<b>Summary.</b> Both common positions are wrong. The statement that Calories do not matter claims that you can make energy. You cannot. The statement that you must count your Calories claims that you can read the meter to the nearest unit. You cannot do that either. The law is exact and the instrument is not. You control a real system with an inaccurate gauge. Use consistent habits over long periods, and do not weigh your rice again.'
    },
    tech: {
      kicker: 'Instrument Datasheet',
      spec: [
        { k:'Class',                v:'Energy balance instrument' },
        { k:'Governing law',        v:'Thermodynamics. It is exact and you cannot change it.' },
        { k:'Intake reading error', v:'A self-report is usually too low. The size of the error varies.' },
        { k:'Label values',         v:'Estimated. The rounding and the legal tolerances vary.' },
        { k:'Base load share',      v:'Usually 60 to 70% in adults who do not exercise' },
        { k:'Processing cost share', v:'About 10%' },
        { k:'Incidental movement',  v:'It varies greatly. It decreases during restriction.' },
        { k:'Available ≠ label',    v:'Whole nuts and foods with much fibre supply measurably less energy than the Atwater figures state.' },
        { k:'Combined uncertainty', v:'It can be as large as a small daily target deficit.' },
        { k:'Display precision',    v:'Four significant figures. The precision is false.' }
      ],
      points: [
        { k:'intake', h:'Intake metering',
          p:'This is usually the least accurate input in the system. A self-report is usually lower than the measured intake. The size of the error changes with the method and with the group of persons. The labels and the databases add more uncertainty.' },
        { k:'base', h:'Base load',
          p:'This is usually the largest part of the total expenditure. It is 60 to 70% in many adults who do not exercise. It changes with your body size, your lean mass, your age and your physiology. It falls when your body mass falls.' },
        { k:'tef', h:'Processing cost',
          p:'Your body uses about 10% of the intake to process that intake. Protein has the highest cost. The effect is true and it is small.' },
        { k:'neat', h:'Incidental movement',
          p:'This includes small movements, standing, walking and gesture. The quantity varies greatly. It can differ by hundreds of Calories a day between two persons, and it falls during energy restriction. This term makes the arithmetic unreliable.' },
        { k:'exercise', h:'Deliberate exercise',
          p:'For most persons who are not athletes, planned exercise is a small part of the total expenditure. It has large effects that this instrument does not measure. These are your muscle mass, your glucose control, your cardiovascular fitness, your mood and how you age. If you judge exercise by the calorie counter, you read the wrong output.' }
      ],
      note: '<b>Design note.</b> Both common positions here are wrong. The statement that Calories do not matter claims that you can make energy. You cannot. The statement that you must count your Calories claims that you can read the meter to the nearest unit. You cannot do that either. The law is exact and the instrument is not.',
      analogy: {
        tag: 'How to read it',
        body: 'An energy meter in a plant. Each of its inputs has a different tolerance, and none of them is exact. A process engineer does not deny that the energy balances. The engineer also does not claim that each input is known to four digits. The engineer watches the trend over a long period and calibrates the meter against the true output.'
      }
    }
  },

  modelLimits: [
    'The uncertainty in this drawing is an example for teaching. It is not a fixed value of 25% for every person and every input. Some quantities can be measured much more accurately than others.',
    'The energy balance is exact over a long period. The practical problem is different: you must estimate the inputs and the outputs accurately enough to control your behaviour, and both of them change.'
  ],

  myth: {
    claim: 'My app says I ate 1,847 Calories today.',
    mechanism: [
      'The app states that number. It does not know that number. The number is the sum of a portion estimate, a database entry and a label tolerance. Each of these carries an error, and the display shows none of them.',
      'The energy values for food come from calorimetry and from average factors for metabolizable energy. Nobody burns your idli before you eat it. Your body is not a calorimeter. It does not absorb all the material, the microbes take a part, and the Atwater factors are averages for a population. Those averages can be wrong for a particular food or a particular food structure.',
      'The expenditure also changes. If you eat less for a long period, your incidental movement falls and your base load decreases. The deficit that you calculated is then larger than the deficit that you have. Your body does not hold the fat to oppose you. This is the normal behaviour of a control system. None of this makes an exception in the physics. The arithmetic is correct, and the inputs are uncertain. This is a different problem from the problem that the app offers to solve.'
    ],
    whySurvives: 'The app shows a number, and a number feels like a measurement. A range with limits satisfies you less than the value 1,847. The range is the more correct description.'
  }
};
