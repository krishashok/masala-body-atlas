/* ============================================================
   STATION 06 — LOGISTICS (bloodstream, fuel, fat and the signals)
   A distribution network, not an organ, so there is no anatomical
   left/right to get wrong. The dispatcher's booth is drawn small
   and conspicuously empty: that is the entire visual argument.
   ============================================================ */

export default {
  id: 'logistics', no: '06', section: 'Distribution',

  rail:  { plain:'Blood & Fat',     tech:'Logistics' },
  title: { plain:'Blood & Fat',     tech:'Logistics' },
  sub:   { plain:'Insulin is a traffic controller. It does not manufacture anything.',
           tech :'Network D-06 · traffic coordination, not moral accounting' },

  drawing: { no:'MB-STN-06', rev:'A', vessel:'D-06',
             desc:'Distribution network', view:'Schematic' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'line', n:1, plain:{ name:'The Line', fn:'About four grams, total' },
                tech :{ name:'Circulating glucose', fn:'~4 g, whole body' } },
    { k:'dispatcher', n:2, plain:{ name:'The Dispatcher', fn:'Signals only. Carries nothing.' },
                      tech :{ name:'Dispatcher', fn:'Insulin · signalling only' } },
    { k:'muscle', n:3, plain:{ name:'The Biggest Customer', fn:'The one bay you can enlarge' },
                  tech :{ name:'Primary customer', fn:'Muscle · ~400 g glycogen' } },
    { k:'adipose', n:4, plain:{ name:'The Reserve', fn:'Weeks of fuel, and it talks back' },
                   tech :{ name:'Buffer storage', fn:'Adipose · tens of thousands of kcal' } },
    { k:'loop', n:5, plain:{ name:'The Control Loop', fn:'Long delays, strong defaults' },
                tech :{ name:'The control loop', fn:'Leptin · ghrelin · integration' } }
  ],

  modes: [
    { k:'aftermeal', label:{ plain:'After a meal', tech:'Dispatch active' }, fault:false,
      cap:{ plain:'<b>After a meal.</b> Product arrives on the line, insulin rises, and tissues switch toward uptake and storage. The signal changes routing and metabolism; it does not create the incoming energy.',
            tech :'<b>Dispatch active.</b> Post-prandial insulin changes transport and metabolism across muscle, adipose tissue and liver. It allocates incoming substrate; it does not create substrate.' } },

    { k:'fasted', label:{ plain:'Fasted', tech:'Stores releasing' }, fault:false,
      cap:{ plain:'<b>Fasted.</b> Incoming fuel falls, insulin drops, and stored fuel contributes more to the line. The bays are not literally shut; the whole network has shifted operating mode.',
            tech :'<b>Stores releasing.</b> Inbound load is low, insulin falls, hepatic glucose output rises and stored substrate is mobilised. Basal uptake continues throughout.' } },

    { k:'exercise', label:{ plain:'Exercising', tech:'Insulin-independent uptake' }, fault:false,
      cap:{ plain:'<b>Exercising.</b> Working muscle has another way to open the bay: contraction recruits glucose transport partly independently of insulin. That is one reason movement helps blood sugar.',
            tech :'<b>Contraction-mediated uptake.</b> Contracting muscle recruits GLUT4 through signalling pathways that are partly independent of insulin, while exercise also improves later insulin sensitivity.' } },

    { k:'sticking', label:{ plain:'Bays sticking', tech:'Reduced insulin response' }, fault:true,
      cap:{ plain:'<b>Bays sticking.</b> The dispatcher signals harder and the doors still open slowly. That is insulin resistance — a mechanical fault in the doors, not a failure of character.',
            tech :'<b>Reduced insulin response.</b> A given insulin signal produces less of the expected metabolic response across several tissues. The defect is distributed across signalling and metabolism, not simply a broken receptor.' } }
  ],

  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="Fuel distribution drawn as a logistics network with receiving bays and a dispatcher">
  <title>Fuel distribution drawn as a logistics network with receiving bays and a dispatcher</title>
  <defs>
    <marker id="arw06" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.34)"/>
    </marker>
  </defs>

  <!-- the line -->
  <path class="pipe" d="M-70 300 L700 300 L700 336 L-70 336 Z"/>
  <text class="dimtext techonly"  x="-64" y="290">CIRCULATING GLUCOSE ≈ 4 g, WHOLE BODY</text>
  <text class="dimtext plainonly" x="-64" y="290">About four grams in the whole body. A teaspoon.</text>

  <!-- spurs down to the three receiving bays -->
  <path class="pipe" d="M150 336 L178 336 L178 430 L150 430 Z"/>
  <path class="pipe" d="M366 336 L394 336 L394 430 L366 430 Z"/>
  <path class="pipe" d="M582 336 L610 336 L610 430 L582 430 Z"/>

  <!-- bay 1 — muscle -->
  <rect class="bay" x="72" y="430" width="184" height="128"/>
  <rect class="shutter" x="96" y="430" width="136" height="16" style="transform-origin:164px 438px"/>
  <text class="dimtext techonly"  x="164" y="500" text-anchor="middle">MUSCLE · ~400 g</text>
  <text class="dimtext plainonly" x="164" y="500" text-anchor="middle">MUSCLE</text>
  <text class="dimtext" x="164" y="516" text-anchor="middle" opacity=".6">bay 1</text>

  <!-- bay 2 — liver -->
  <rect class="bay" x="288" y="430" width="184" height="128"/>
  <rect class="shutter" x="312" y="430" width="136" height="16" style="transform-origin:380px 438px"/>
  <text class="dimtext techonly"  x="380" y="500" text-anchor="middle">LIVER · ~100 g</text>
  <text class="dimtext plainonly" x="380" y="500" text-anchor="middle">LIVER</text>
  <text class="dimtext" x="380" y="516" text-anchor="middle" opacity=".6">bay 2</text>

  <!-- bay 3 — adipose -->
  <rect class="bay" x="504" y="430" width="184" height="128"/>
  <rect class="shutter" x="528" y="430" width="136" height="16" style="transform-origin:596px 438px"/>
  <text class="dimtext techonly"  x="596" y="500" text-anchor="middle">ADIPOSE · weeks of fuel</text>
  <text class="dimtext plainonly" x="596" y="500" text-anchor="middle">FAT STORE</text>
  <text class="dimtext" x="596" y="516" text-anchor="middle" opacity=".6">bay 3</text>

  <!-- the dispatcher: small, and empty -->
  <rect class="booth" x="300" y="176" width="164" height="72"/>
  <text class="dimtext techonly" x="382" y="202" text-anchor="middle" style="fill:var(--steel)">INSULIN</text>
  <text class="dimtext plainonly" x="382" y="202" text-anchor="middle" style="fill:var(--steel)">INSULIN</text>
  <text class="dimtext techonly" x="382" y="218" text-anchor="middle" opacity=".75" style="fill:var(--steel)">SIGNALLING ONLY</text>
  <text class="dimtext plainonly" x="382" y="218" text-anchor="middle" opacity=".75" style="fill:var(--steel)">SIGNALS ONLY</text>
  <text class="dimtext techonly" x="382" y="234" text-anchor="middle" opacity=".75" style="fill:var(--steel)">NO PRODUCT HELD</text>
  <text class="dimtext plainonly" x="382" y="234" text-anchor="middle" opacity=".75" style="fill:var(--steel)">CARRIES NOTHING</text>

  <!-- signal wires from the booth to each shutter -->
  <path class="leader" d="M300 224 L164 224 L164 424" style="stroke:var(--steel); stroke-dasharray:3 4" />
  <path class="leader" d="M382 248 L382 424" style="stroke:var(--steel); stroke-dasharray:3 4" />
  <path class="leader" d="M464 224 L596 224 L596 424" style="stroke:var(--steel); stroke-dasharray:3 4" />

  <!-- the appetite loop, running the long way round -->
  <g class="mechonly">
    <path class="leader" d="M596 566 C640 640 400 690 220 660 C120 642 96 600 110 566" marker-end="url(#arw06)" style="stroke:var(--cardamom)" />
    <text class="dimtext techonly" x="356" y="706" text-anchor="middle" style="fill:var(--cardamom)">APPETITE LOOP — LEPTIN · GHRELIN · LONG DELAY</text>
    <text class="dimtext plainonly" x="356" y="706" text-anchor="middle" style="fill:var(--cardamom)">The appetite loop. Slow, and it defends what is already stored.</text>
  </g>

  <!-- ===== dispatch active ===== -->
  <g class="anim a-aftermeal">
    <path class="flowline" d="M-60 318 L690 318"/>
    <path class="flowline" d="M164 344 L164 424"/>
    <path class="flowline" d="M380 344 L380 424"/>
    <path class="flowline" d="M596 344 L596 424"/>
    <circle class="chyme" cx="240" cy="318" r="6"/>
    <circle class="chyme" cx="470" cy="318" r="5" style="animation-delay:-2.2s"/>
  </g>

  <!-- ===== stores releasing ===== -->
  <g class="anim a-fasted">
    <path class="flowline" d="M164 424 L164 344"/>
    <path class="flowline" d="M380 424 L380 344"/>
    <text class="dimtext" x="700" y="404" text-anchor="end" style="fill:var(--turmeric)">bays shut · stores feeding the line</text>
  </g>

  <!-- ===== insulin-independent uptake ===== -->
  <g class="anim a-exercise">
    <path class="flowline" d="M-60 318 L690 318"/>
    <path class="flowline" d="M164 344 L164 424"/>
    <rect class="shutter" x="96" y="430" width="136" height="16" style="opacity:.25"/>
    <path class="leader" d="M300 212 L268 150 L254 150" style="stroke:var(--cardamom)" />
    <text class="dimtext" x="248" y="147" text-anchor="end" style="fill:var(--cardamom)">dispatcher idle</text>
    <path class="leader" d="M120 440 L96 388 L82 388" style="stroke:var(--cardamom)" />
    <text class="dimtext techonly" x="76" y="385" text-anchor="end" style="fill:var(--cardamom)">bay opens anyway</text>
    <text class="dimtext plainonly" x="76" y="385" text-anchor="end" style="fill:var(--cardamom)">bay opens anyway</text>
  </g>

  <!-- ===== reduced insulin response ===== -->
  <g class="anim a-sticking">
    <path class="flowline" d="M-60 318 L690 318" style="stroke:var(--chilli)" />
    <path class="leader" d="M300 224 L164 224 L164 424" style="stroke-width:2; stroke:var(--chilli); stroke-dasharray:2 2" />
    <path class="leader" d="M464 224 L596 224 L596 424" style="stroke-width:2; stroke:var(--chilli); stroke-dasharray:2 2" />
    <circle class="faultmark" cx="164" cy="438" r="26"/>
    <circle class="faultmark" cx="596" cy="438" r="26"/>
    <path class="leader" d="M382 260 L440 268 L456 268" style="stroke:var(--chilli)" />
    <text class="faulttext" x="462" y="264">Signalling harder</text>
    <text class="faulttext" x="462" y="278" opacity=".75">Doors opening slower</text>
  </g>

  <!-- instrument (Nerd Mode only) -->
  <g class="techonly" transform="translate(680,158)">
    <circle cx="0" cy="0" r="44" fill="none" stroke="var(--line-dim)" stroke-width="1"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="var(--line-faint)" stroke-width="1"/>
    <path d="M-30 12 A34 34 0 0 1 30 12" fill="none" stroke="var(--steel)" stroke-width="2.5" opacity=".55"/>
    <line class="needle" x1="0" y1="12" x2="-4" y2="-22" style="stroke:var(--steel)" />
    <circle cx="0" cy="12" r="3" fill="var(--line)"/>
    <text class="dimtext" x="0" y="34" text-anchor="middle">≈ 4 g on the line</text>
    <text class="dimtext" x="0" y="-30" text-anchor="middle" opacity=".6">AI-606</text>
  </g>

  <!-- myth annotation -->
  <g class="mythonly">
    <circle class="hazard" cx="382" cy="212" r="46"/>
    <path class="scribble" d="M356 190 L408 234 M408 190 L356 234"/>
    <path class="leader" d="M428 212 L470 150 L486 150" style="stroke:var(--chilli)" />
    <text class="hazardtext" x="492" y="146">"Insulin makes you fat"</text>
    <text class="hazardtext" x="492" y="160" opacity=".75">— the booth is empty. Look in it.</text>
  </g>

  <!-- ================= HOTSPOTS =================
       Markers only. The line, the booth and every bay already carry their
       own label; a callout would just say it again and drag a leader across
       the drawing to do it. -->
  <g class="hot" data-k="line" role="button" tabindex="0" aria-label="The line">
    <circle class="hotring" cx="270" cy="318" r="10"/><circle class="hithalo" cx="270" cy="318" r="22"/>
    <circle class="hotdot" cx="270" cy="318" r="10"/><text class="hotnum" x="270" y="318">1</text>
  </g>
  <g class="hot" data-k="dispatcher" role="button" tabindex="0" aria-label="The dispatcher">
    <circle class="hotring" cx="296" cy="188" r="10"/><circle class="hithalo" cx="296" cy="188" r="22"/>
    <circle class="hotdot" cx="296" cy="188" r="10"/><text class="hotnum" x="296" y="188">2</text>
  </g>
  <g class="hot" data-k="muscle" role="button" tabindex="0" aria-label="The biggest customer">
    <circle class="hotring" cx="94" cy="466" r="10"/><circle class="hithalo" cx="94" cy="466" r="22"/>
    <circle class="hotdot" cx="94" cy="466" r="10"/><text class="hotnum" x="94" y="466">3</text>
  </g>
  <g class="hot" data-k="adipose" role="button" tabindex="0" aria-label="The reserve">
    <circle class="hotring" cx="526" cy="466" r="10"/><circle class="hithalo" cx="526" cy="466" r="22"/>
    <circle class="hotdot" cx="526" cy="466" r="10"/><text class="hotnum" x="526" y="466">4</text>
  </g>
  <g class="hot" data-k="loop" role="button" tabindex="0" aria-label="The control loop">
    <circle class="hotring" cx="356" cy="672" r="10"/><circle class="hithalo" cx="356" cy="672" r="22"/>
    <circle class="hotdot" cx="356" cy="672" r="10"/><text class="hotnum" x="356" y="672">5</text>
  </g>

  <text class="dimtext techonly"  x="-64" y="360">◀ FEED — uptake from Station 03, release from Station 05</text>
  <text class="dimtext plainonly" x="-64" y="360">◀ Fuel arrives from the gut, and from your own stores</text>
</svg>`,

  main: {
    plain: {
      kicker: 'The short version',
      points: [
        { k:'line', h:'There is almost nothing on the line.',
          p:'At any moment your entire bloodstream holds about four grams of glucose. A teaspoon. Everything else is in storage or in transit. The system is defending a very small number very tightly, which is why the controls are so aggressive.' },
        { k:'dispatcher', h:'Insulin cannot create calories.',
          p:'Insulin cannot create calories, but it does change what tissues do with incoming fuel: it promotes glucose uptake in muscle and fat, supports storage, and suppresses fuel release. The dispatcher metaphor is about routing, not passivity.' },
        { k:'muscle', h:'Muscle is a bay you can train.',
          p:'Skeletal muscle is a major destination for post-meal glucose and a reservoir you can deliberately enlarge. More active muscle also creates more demand, which is why resistance training improves glucose handling even without weight loss.' },
        { k:'adipose', h:'Fat is not inert padding.',
          p:'A strategic reserve of remarkable capacity — tens of thousands of Calories, enough for weeks. Fat tissue is not inert padding: it secretes signals of its own, and both how much you carry and where it sits matter.' },
        { k:'loop', h:'Appetite is a control loop, not a choice.',
          p:'Signals including leptin and ghrelin are integrated with sleep, stress, illness, learned cues and many other inputs. Energy deficit also triggers strong biological responses that can raise hunger and reduce expenditure. Appetite is not a straightforward matter of choosing.' }
      ],
      note: '<b>The useful model.</b> Every argument about diet that turns into an argument about willpower has quietly assumed this station works by choice. It does not. It is a control system with delayed feedback, strong responses to energy deficit and a heavy inheritance — and control systems are not improved by being shouted at. Understanding the loop is more useful than blaming the operator.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',                v:'Distributed logistics network with hormonal dispatch' },
        { k:'Duty',                 v:'Fuel routing · storage allocation · demand signalling' },
        { k:'Circulating glucose',  v:'<em>~4 g, whole body</em>' },
        { k:'Dispatcher half-life', v:'~5 minutes' },
        { k:'Store: liver',         v:'~100 g glycogen' },
        { k:'Store: muscle',        v:'~300–500 g glycogen' },
        { k:'Store: adipose',       v:'Tens of thousands of kcal' },
        { k:'Response time',        v:'Minutes for dispatch; hours to days for the appetite loop' },
        { k:'Regional note',        v:'At the same BMI, South Asian bodies tend to carry more fat and more of it abdominally, with metabolic risk appearing at lower weights' },
        { k:'Useful instruments',   v:'Waist measurement, muscle mass, blood markers' },
        { k:'Misleading instrument', v:'<em>Bodyweight alone</em>' }
      ],
      points: [
        { k:'line', h:'Circulating glucose',
          p:'At any moment the whole circulation contains about 4 g of glucose. Everything else is in storage or in transit. The system defends a very small quantity very tightly, which is why the control action is so aggressive.' },
        { k:'dispatcher', h:'Dispatcher',
          p:'Insulin is a short-lived signal that changes transport and metabolism across tissues: it promotes GLUT4-mediated uptake in muscle and adipose tissue, favours glycogen and lipid storage, and suppresses hepatic glucose output and lipolysis. It cannot create energy.' },
        { k:'muscle', h:'Primary customer',
          p:'Skeletal muscle is a major site of post-prandial glucose disposal and stores several hundred grams of glycogen. Training increases glucose transport capacity and insulin sensitivity; more muscle also provides more storage and demand.' },
        { k:'adipose', h:'Buffer storage',
          p:'A strategic reserve of remarkable capacity: tens of thousands of Calories, enough for weeks. Adipose is endocrine tissue as well as storage; total amount matters, and visceral/abdominal distribution carries additional metabolic risk compared with subcutaneous depots.' },
        { k:'loop', h:'The control loop',
          p:'Leptin broadly signals longer-term energy stores; ghrelin is one meal-related hunger signal among several. Central circuits integrate these with gut hormones, sleep, stress, illness and learned cues; sustained energy deficit can increase hunger and reduce expenditure.' }
      ],
      note: '<b>Design note.</b> Appetite and fuel handling emerge from interacting control loops, not a single dial. The dispatcher analogy is useful for insulin only if you remember that insulin also changes the machinery inside each receiving bay.',
      analogy: {
        tag: 'Closest machine',
        body: 'A dispatcher at a distribution hub, with one biological twist: the dispatcher also changes how the receiving bays operate. Insulin routes and stores incoming fuel, suppresses release from stores, and changes liver output. What it still cannot do is manufacture energy from nothing.'
      }
    }
  },

  modelLimits: [
    'Insulin is more than a door-opener. It changes glucose transport, glycogen synthesis, lipid metabolism, hepatic glucose output and lipolysis in tissue-specific ways.',
    'Insulin resistance is a distributed metabolic phenotype, not literally a set of sticky doors or broken insulin receptors.'
  ],

  myth: {
    claim: 'Insulin makes you fat.',
    mechanism: [
      'Insulin helps decide where incoming energy goes and whether stored fuel is released. It is not a source of energy. The useful correction to “insulin makes you fat” is not that insulin does nothing to storage; it is that storage still obeys whole-body energy balance.',
      'The version of this claim with something behind it is narrower and worth stating fairly: carbohydrate raises insulin more than fat does, insulin does promote storage and suppress release, and for people with impaired glucose handling this matters clinically. What does not follow is that carbohydrate is uniquely fattening. Controlled feeding studies that match total energy and protein, then vary the carbohydrate-to-fat ratio, find fat loss tracks the energy deficit, not the ratio.',
      'South Asians are also a useful reminder that insulin resistance and metabolic risk are not reducible to one macronutrient. Risk often appears at lower BMI and with more central adiposity than European-derived cut-offs suggest; genetics, body composition, activity and the wider diet all sit inside the model.'
    ],
    whySurvives: 'Because it names a villain, and a villain is more usable than a system. It also contains just enough real physiology to survive a first inspection, which is the most durable kind of wrong.'
  }
};
