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
  sub:   { plain:'Insulin controls the traffic. It does not make anything.',
           tech :'Network D-06 · the station coordinates the traffic' },

  drawing: { no:'MB-STN-06', rev:'A', vessel:'D-06',
             desc:'Distribution network', view:'Schematic' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'line', n:1, plain:{ name:'The Line', fn:'About four grams in total' },
                tech :{ name:'Circulating glucose', fn:'About 4 g in the whole body' } },
    { k:'dispatcher', n:2, plain:{ name:'The Dispatcher', fn:'It sends signals. It carries nothing.' },
                      tech :{ name:'Dispatcher', fn:'Insulin · it sends signals only' } },
    { k:'muscle', n:3, plain:{ name:'The Biggest Customer', fn:'You can make this bay larger' },
                  tech :{ name:'Primary customer', fn:'Muscle · about 400 g of glycogen' } },
    { k:'adipose', n:4, plain:{ name:'The Reserve', fn:'Weeks of fuel. It also sends signals.' },
                   tech :{ name:'Buffer storage', fn:'Adipose · tens of thousands of kcal' } },
    { k:'loop', n:5, plain:{ name:'The Control Loop', fn:'Long delays and strong responses' },
                tech :{ name:'The control loop', fn:'Leptin and ghrelin · the brain combines them' } }
  ],

  modes: [
    { k:'aftermeal', label:{ plain:'After a meal', tech:'Dispatch active' }, fault:false,
      cap:{ plain:'<b>After a meal.</b> The product arrives on the line. The insulin level increases, and the tissues start to absorb and store the fuel. The signal changes the route and the chemistry. It does not make the energy.',
            tech :'<b>Dispatch active.</b> After the meal, insulin changes the transport and the chemistry in the muscle, the fat tissue and the liver. It sends the arriving substrate to each tissue. It does not make substrate.' } },

    { k:'fasted', label:{ plain:'Fasted', tech:'Stores releasing' }, fault:false,
      cap:{ plain:'<b>Fasted.</b> Less fuel arrives, so the insulin level falls. The stores then supply more of the fuel on the line. The bays do not close. The full network changes to a different operating condition.',
            tech :'<b>Stores releasing.</b> The inbound load is low and the insulin level falls. The liver increases its glucose output, and the stores release their substrate. The tissues continue to absorb fuel at a low rate.' } },

    { k:'exercise', label:{ plain:'Exercising', tech:'Insulin-independent uptake' }, fault:false,
      cap:{ plain:'<b>Exercising.</b> A muscle that works has a second method to open the bay. The contraction itself starts the glucose transport, and it needs less insulin to do this. This is one reason that movement helps your blood sugar.',
            tech :'<b>Contraction-mediated uptake.</b> A muscle that contracts moves GLUT4 to the surface. It uses pathways that do not need insulin. Exercise also improves the response to insulin later.' } },

    { k:'sticking', label:{ plain:'Bays sticking', tech:'Reduced insulin response' }, fault:true,
      cap:{ plain:'<b>Bays sticking.</b> The dispatcher sends a stronger signal, but the doors still open slowly. This condition is insulin resistance. It is a fault in the machinery.',
            tech :'<b>Reduced insulin response.</b> The same insulin signal now causes a smaller response in several tissues. The fault is in the signal pathways and in the chemistry of the cell. One broken receptor does not explain it.' } }
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
  <text class="dimtext techonly"  x="164" y="500" text-anchor="middle">MUSCLE · about 400 g</text>
  <text class="dimtext plainonly" x="164" y="500" text-anchor="middle">MUSCLE</text>
  <text class="dimtext" x="164" y="516" text-anchor="middle" opacity=".6">bay 1</text>

  <!-- bay 2 — liver -->
  <rect class="bay" x="288" y="430" width="184" height="128"/>
  <rect class="shutter" x="312" y="430" width="136" height="16" style="transform-origin:380px 438px"/>
  <text class="dimtext techonly"  x="380" y="500" text-anchor="middle">LIVER · about 100 g</text>
  <text class="dimtext plainonly" x="380" y="500" text-anchor="middle">LIVER</text>
  <text class="dimtext" x="380" y="516" text-anchor="middle" opacity=".6">bay 2</text>

  <!-- bay 3 — adipose -->
  <rect class="bay" x="504" y="430" width="184" height="128"/>
  <rect class="shutter" x="528" y="430" width="136" height="16" style="transform-origin:596px 438px"/>
  <text class="dimtext techonly"  x="596" y="500" text-anchor="middle">ADIPOSE · fuel for weeks</text>
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
    <text class="dimtext plainonly" x="356" y="706" text-anchor="middle" style="fill:var(--cardamom)">The appetite loop is slow. It defends the fuel already stored.</text>
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
    <text class="dimtext" x="700" y="404" text-anchor="end" style="fill:var(--turmeric)">bays shut · stores feed the line</text>
  </g>

  <!-- ===== insulin-independent uptake ===== -->
  <g class="anim a-exercise">
    <path class="flowline" d="M-60 318 L690 318"/>
    <path class="flowline" d="M164 344 L164 424"/>
    <rect class="shutter" x="96" y="430" width="136" height="16" style="opacity:.25"/>
    <path class="leader" d="M300 212 L268 150 L254 150" style="stroke:var(--cardamom)" />
    <text class="dimtext" x="248" y="147" text-anchor="end" style="fill:var(--cardamom)">dispatcher idle</text>
    <path class="leader" d="M120 440 L96 388 L82 388" style="stroke:var(--cardamom)" />
    <text class="dimtext techonly" x="76" y="385" text-anchor="end" style="fill:var(--cardamom)">the bay still opens</text>
    <text class="dimtext plainonly" x="76" y="385" text-anchor="end" style="fill:var(--cardamom)">the bay still opens</text>
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
    <text class="hazardtext" x="492" y="160" opacity=".75">the booth is empty</text>
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
      kicker: 'Summary',
      points: [
        { k:'line', h:'The line holds very little glucose.',
          p:'Your full blood volume holds about four grams of glucose at any moment. This is one teaspoon. All the remainder is in a store or in transport. The system holds a very small quantity within narrow limits. This is why the controls act so strongly.' },
        { k:'dispatcher', h:'Insulin cannot create calories.',
          p:'Insulin cannot make calories. It changes what the tissues do with the fuel that arrives. It increases the glucose uptake in the muscle and the fat, it supports storage, and it stops the release of stored fuel. The dispatcher comparison describes the routing.' },
        { k:'muscle', h:'You can make the muscle bay larger.',
          p:'The skeletal muscle receives much of the glucose after a meal, and it is a store that you can make larger. More active muscle also makes more demand. Resistance training therefore improves your glucose control, and you do not have to lose weight.' },
        { k:'adipose', h:'Fat tissue is active tissue.',
          p:'This is a reserve of very large capacity. It holds tens of thousands of Calories, which is sufficient for some weeks. The tissue also makes its own signals. The quantity that you carry and the position of that fat both change the result.' },
        { k:'loop', h:'Appetite operates as a control loop.',
          p:'The brain combines signals such as leptin and ghrelin with your sleep, your stress, illness, learned signals and many other inputs. A shortage of energy also causes strong responses in the body. These can increase your hunger and reduce the energy that you use. You do not simply decide your appetite.' }
      ],
      note: '<b>Summary.</b> Many arguments about diet become arguments about willpower. Those arguments assume that you control this station by choice. You do not. It is a control system with delayed feedback, strong responses to a shortage of energy, and a large inherited component. You cannot improve a control system when you shout at it. It is more useful to understand the loop than to blame the operator.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',                v:'A distributed logistics network. Hormones dispatch the traffic.' },
        { k:'Duty',                 v:'It routes the fuel, allocates the storage and signals the demand.' },
        { k:'Circulating glucose',  v:'<em>About 4 g in the whole body</em>' },
        { k:'Dispatcher half-life', v:'About 5 minutes' },
        { k:'Store: liver',         v:'About 100 g of glycogen' },
        { k:'Store: muscle',        v:'About 300 to 500 g of glycogen' },
        { k:'Store: adipose',       v:'Tens of thousands of kcal' },
        { k:'Response time',        v:'Minutes for the dispatch. Hours or days for the appetite loop.' },
        { k:'Regional note',        v:'At the same BMI, South Asian bodies usually carry more fat, and more of it is in the abdomen. The metabolic risk appears at a lower weight.' },
        { k:'Useful instruments',   v:'The waist measurement, the muscle mass and the blood markers.' },
        { k:'Misleading instrument', v:'<em>Bodyweight alone</em>' }
      ],
      points: [
        { k:'line', h:'Circulating glucose',
          p:'The full circulation contains about 4 g of glucose at any moment. All the remainder is in a store or in transport. The system holds this very small quantity within narrow limits. This is why the control action is so strong.' },
        { k:'dispatcher', h:'Dispatcher',
          p:'Insulin is a signal with a short life. It changes the transport and the chemistry in several tissues. It increases the GLUT4 uptake in the muscle and the fat tissue. It supports the storage of glycogen and lipid. It reduces the glucose output of the liver and the release of fat. It cannot make energy.' },
        { k:'muscle', h:'Primary customer',
          p:'The skeletal muscle removes much of the glucose after a meal, and it stores several hundred grams of glycogen. Training increases the glucose transport capacity and improves the response to insulin. More muscle also gives more storage and more demand.' },
        { k:'adipose', h:'Buffer storage',
          p:'A reserve of very large capacity. It holds tens of thousands of Calories, which is sufficient for some weeks. The fat tissue stores fuel and it also makes hormones. The total quantity changes the risk. Fat in the abdomen carries more metabolic risk than fat below the skin.' },
        { k:'loop', h:'The control loop',
          p:'Leptin signals the size of the long-term stores. Ghrelin is one of several hunger signals related to a meal. Circuits in the brain combine these with the gut hormones, your sleep, your stress, illness and learned signals. A long shortage of energy can increase your hunger and reduce the energy that you use.' }
      ],
      note: '<b>Design note.</b> Several control loops interact and together produce your appetite and your fuel handling. There is no single control. The dispatcher comparison is useful for insulin, but remember that insulin also changes the machinery inside each receiving bay.',
      analogy: {
        tag: 'Closest machine',
        body: 'A dispatcher at a distribution centre, with one difference. This dispatcher also changes the operation of the receiving bays. Insulin routes the arriving fuel and stores it. It stops the release from the stores, and it changes the output of the liver. It cannot make energy from nothing.'
      }
    }
  },

  modelLimits: [
    'Insulin does more than open a door. It changes the glucose transport, the synthesis of glycogen, the chemistry of lipids, the glucose output of the liver and the release of fat. The effect is different in each tissue.',
    'Insulin resistance is a condition that occurs across many tissues. It is not a set of doors that stick, and it is not a set of broken receptors.'
  ],

  myth: {
    claim: 'Insulin makes you fat.',
    mechanism: [
      'Insulin helps to select the destination of the arriving energy. It also controls the release of stored fuel. It is not a source of energy. Insulin does change the storage. But the total storage still follows the energy balance of the whole body.',
      'A narrower form of this claim is correct, and it is fair to state it. Carbohydrate raises the insulin more than fat does. Insulin does support storage and stop release. For a person with poor glucose control this is clinically important. But this does not show that carbohydrate alone makes you fat. Controlled feeding studies keep the total energy and the protein the same, and change the ratio of carbohydrate to fat. In those studies the fat loss follows the energy deficit. It does not follow the ratio.',
      'South Asian bodies show that one macronutrient does not explain insulin resistance and metabolic risk. The risk often appears at a lower BMI, and with more fat in the abdomen, than the European limits indicate. Your genetics, your body composition, your activity and your full diet are all part of the model.'
    ],
    whySurvives: 'The claim names one guilty substance, and that is easier to use than a system. It also contains sufficient true physiology to pass a first examination. This is the most durable type of error.'
  }
};
