const byId = stations => Object.fromEntries(stations.map(s => [s.id, s]));

function energySvg(){
  const row = (k,n,y,label,sub) => `
    <g class="meter-row" data-row="${k}">
      <rect class="bay" x="72" y="${y-30}" width="330" height="62" rx="3"/>
      <text class="lbl-name" x="124" y="${y-6}">${label}</text>
      <text class="lbl-fn" x="124" y="${y+16}">${sub}</text>
      <text class="dimtext meter-value" x="378" y="${y+2}" text-anchor="end" data-meter-value="${k}">—</text>
      <g class="hot" data-k="${k}" role="button" tabindex="0" aria-label="${label}">
        <circle class="hotring" cx="96" cy="${y}" r="10"/>
        <circle class="hithalo" cx="96" cy="${y}" r="22"/>
        <circle class="hotdot" cx="96" cy="${y}" r="10"/>
        <text class="hotnum" x="96" y="${y}">${n}</text>
      </g>
    </g>`;

  return `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
    aria-label="Energy balance shown as adjustable estimates for energy in and energy out">
    <title>Energy balance simulator: energy in minus energy out</title>
    <defs>
      <marker id="arw07i" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.45)"/>
      </marker>
    </defs>

    <text class="blk-h" x="72" y="72">ESTIMATED INPUTS</text>
    ${row('intake',1,126,'Food eaten','hard to measure exactly')}
    ${row('base',2,226,'Resting use','usually the biggest part')}
    ${row('tef',3,326,'Digesting food','a smaller part')}
    ${row('neat',4,426,'Daily movement','varies a lot')}
    ${row('exercise',5,526,'Exercise','useful beyond calories')}

    <path class="leader" d="M402 126 L458 126 L458 318" marker-end="url(#arw07i)"/>
    <path class="leader" d="M402 226 L438 226 L438 360"/>
    <path class="leader" d="M402 326 L438 326"/>
    <path class="leader" d="M402 426 L438 426 L438 360"/>
    <path class="leader" d="M402 526 L438 526 L438 360"/>

    <circle class="vessel" cx="494" cy="344" r="38"/>
    <text class="stamptext" x="494" y="339" text-anchor="middle">IN</text>
    <text class="stamptext" x="494" y="359" text-anchor="middle">− OUT</text>
    <path class="leader" d="M532 344 L560 344" marker-end="url(#arw07i)"/>

    <rect class="vessel" x="560" y="236" width="212" height="220" rx="5"/>
    <text class="dimtext" x="666" y="270" text-anchor="middle">CALCULATED BALANCE</text>
    <rect class="readoutbox" x="584" y="292" width="164" height="78"/>
    <text class="digits meter-balance" x="666" y="348" text-anchor="middle" data-meter-balance>—</text>
    <text class="dimtext" x="666" y="392" text-anchor="middle">kcal / day</text>
    <text class="dimtext meter-status" x="666" y="426" text-anchor="middle" data-meter-status>Adjust the controls</text>

    <g class="anim a-reading">
      <text class="dimtext" x="72" y="622">The display looks more exact than the inputs.</text>
    </g>

    <g class="anim a-errorbars">
      <text class="faulttext" x="72" y="622">Illustrative uncertainty shown below the controls.</text>
      <text class="faulttext" x="666" y="482" text-anchor="middle" data-meter-range>—</text>
      <text class="dimtext" x="666" y="504" text-anchor="middle">example range, not a personal measurement</text>
    </g>

    <g class="anim a-months">
      <path class="leader" d="M360 226 L360 256" marker-end="url(#arw07i)" style="stroke:var(--chilli)"/>
      <path class="leader" d="M360 426 L360 456" marker-end="url(#arw07i)" style="stroke:var(--chilli)"/>
      <text class="faulttext" x="334" y="270" text-anchor="end">can fall</text>
      <text class="faulttext" x="334" y="470" text-anchor="end">can fall</text>
      <text class="faulttext" x="666" y="482" text-anchor="middle" data-meter-adapted>—</text>
      <text class="dimtext" x="666" y="504" text-anchor="middle">illustrative adaptation</text>
    </g>

    <g class="mythonly">
      <rect class="hazard" x="556" y="232" width="220" height="228" rx="5"/>
      <path class="scribble" d="M598 284 L734 410 M734 284 L598 410"/>
      <text class="hazardtext" x="666" y="502" text-anchor="middle">"App − watch = exact deficit"</text>
      <text class="hazardtext" x="666" y="522" text-anchor="middle" opacity=".75">both sides are estimates</text>
    </g>

    <text class="dimtext" x="72" y="678">Exact law. Approximate measurements.</text>
  </svg>`;
}

function gauge(x,y,tag,reading,needle,k,n,extra=''){
  return `<g class="evidence-method ${extra}" data-method="${k}" transform="translate(${x},${y})">
    <g class="gauge-content">
      <circle class="gauge-shell" cx="0" cy="0" r="46" fill="rgba(16,15,12,.55)" stroke="var(--line-dim)" stroke-width="1.2"/>
      <path d="M-31 14 A35 35 0 0 1 31 14" fill="none" stroke="var(--line-dim)" stroke-width="3" opacity=".55"/>
      <line class="gauge-needle" x1="0" y1="14" x2="${needle[0]}" y2="${needle[1]}" stroke="var(--turmeric)" stroke-width="2" stroke-linecap="round"/>
      <circle cx="0" cy="14" r="3" fill="var(--line)"/>
      <text class="lbl-name" x="0" y="-64" text-anchor="middle">${tag}</text>
      <text class="dimtext" x="0" y="70" text-anchor="middle">${reading}</text>
    </g>
    <g class="hot" data-k="${k}" role="button" tabindex="0" aria-label="${tag}">
      <circle class="hotring" cx="-39" cy="-39" r="10"/>
      <circle class="hithalo" cx="-39" cy="-39" r="22"/>
      <circle class="hotdot" cx="-39" cy="-39" r="10"/>
      <text class="hotnum" x="-39" y="-39">${n}</text>
    </g>
  </g>`;
}

function evidenceSvg(){
  const methods = (readings) => [
    gauge(112,278,'Trial',readings[0][0],readings[0][1],'trial',1),
    gauge(254,278,'Long study',readings[1][0],readings[1][1],'cohort',2, readings[1][2]||''),
    gauge(396,278,'Mechanism',readings[2][0],readings[2][1],'mechanism',3),
    gauge(538,278,'Population',readings[3][0],readings[3][1],'population',4),
    gauge(680,278,'Review',readings[4][0],readings[4][1],'review',5)
  ].join('');

  const single = [
    ['one result',[-17,-22]],['', [0,-24]],['',[0,-24]],['',[0,-24]],['',[0,-24]]
  ];
  const spread = [
    ['leans up',[-18,-18]],['outlier',[22,-10],'outlier'],['unclear',[-4,-24]],['leans up',[12,-20]],['mixed',[-9,-22]]
  ];
  const cluster = [
    ['same direction',[-8,-23]],['same direction',[-3,-24]],['same direction',[2,-24]],['same direction',[7,-22]],['same direction',[0,-24]]
  ];

  return `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
    aria-label="Five evidence methods shown as gauges, with modes for one study, disagreement, convergence and media amplification">
    <title>Evidence control room: one question measured five ways</title>

    <text class="blk-h" x="72" y="84">ONE QUESTION · FIVE METHODS</text>
    <text class="dimtext" x="72" y="108">No method is perfect. Their weaknesses differ.</text>

    <g class="anim a-onestudy evidence-state">
      ${gauge(396,278,'Trial','one result',[-17,-22],'trial',1)}
      <text class="stamptext" x="396" y="392" text-anchor="middle">ONE RESULT</text>
      <text class="dimtext" x="396" y="418" text-anchor="middle">Too early to conclude</text>
    </g>

    <g class="anim a-allgauges evidence-state">
      ${methods(spread)}
      <text class="stamptext" x="396" y="392" text-anchor="middle">COMPARE METHODS</text>
      <text class="dimtext" x="396" y="418" text-anchor="middle">Different methods · different errors</text>
    </g>

    <g class="anim a-converge evidence-state">
      ${methods(cluster)}
      <rect class="stamp" x="274" y="374" width="244" height="50" style="stroke:var(--cardamom)"/>
      <text class="stamptext" x="396" y="405" text-anchor="middle" style="fill:var(--cardamom)">METHODS CONVERGE</text>
      <text class="dimtext" x="396" y="452" text-anchor="middle">Compatible direction, not identical numbers</text>
    </g>

    <g class="anim a-megaphone evidence-state" data-evidence-headline>
      ${methods(spread)}
      <path class="hazard evidence-megaphone" d="M560 454 L628 424 L628 506 L560 476 Z"/>
      <path class="hazard evidence-megaphone" d="M628 444 C670 444 670 486 628 486"/>
      <text class="faulttext evidence-headline" x="396" y="530" text-anchor="middle" data-headline>
        NEW STUDY: ONE RESULT LOOKS DRAMATIC
      </text>
      <text class="dimtext" x="396" y="556" text-anchor="middle">Turn up Media Gain below</text>
    </g>

    <g class="mechonly evidence-core">
      <rect class="bay" x="72" y="610" width="648" height="102"/>
      <text class="blk-h" x="92" y="638">HIGH CONFIDENCE</text>
      <text class="lbl-fn" x="92" y="666">Smoking → cancer · trans fats → cardiovascular harm</text>
      <text class="lbl-fn" x="92" y="690">Severe nutrient deficiency → deficiency disease</text>
      <text class="dimtext" x="708" y="638" text-anchor="end">built from convergence</text>
    </g>

    <g class="mythonly">
      <text class="hazardtext" x="396" y="590" text-anchor="middle">"Science changed again, so nobody knows anything"</text>
    </g>
  </svg>`;
}

export default function applyInteractivePass(stations){
  const S = byId(stations);

  {
    const s = S.meter;
    s.svg = energySvg();
    s.drawing.desc = 'Interactive energy balance instrument';
    s.hotspots = [
      { k:'intake', n:1, plain:{name:'Food eaten',fn:'Hard to measure exactly'}, tech:{name:'Intake estimate',fn:'Portion · recipe · database · memory'} },
      { k:'base', n:2, plain:{name:'Resting use',fn:'Usually the biggest part'}, tech:{name:'Resting metabolism',fn:'Largest component in many adults'} },
      { k:'tef', n:3, plain:{name:'Digesting food',fn:'A smaller part'}, tech:{name:'Thermic effect',fn:'Protein > carbohydrate > fat'} },
      { k:'neat', n:4, plain:{name:'Daily movement',fn:'Varies a lot'}, tech:{name:'Incidental movement',fn:'Highly variable and adaptive'} },
      { k:'exercise', n:5, plain:{name:'Exercise',fn:'Useful beyond calories'}, tech:{name:'Planned exercise',fn:'Often a smaller share in non-athletes'} }
    ];
    s.modes = [
      { k:'reading', label:{plain:'Looks precise',tech:'Display value'}, fault:false,
        cap:{plain:'<b>Looks precise.</b> Turn the five controls. The subtraction is exact, but the values you entered are estimates.',tech:'<b>Display value.</b> A deterministic calculation can display more precision than its measurements justify.'} },
      { k:'errorbars', label:{plain:'Show uncertainty',tech:'Measurement uncertainty'}, fault:false,
        cap:{plain:'<b>Show uncertainty.</b> The same settings now produce an illustrative range. The range is a teaching example, not a personal measurement.',tech:'<b>Measurement uncertainty.</b> Each input has a different error structure. The ranges here are deliberately illustrative rather than universal tolerances.'} },
      { k:'months', label:{plain:'Three months later',tech:'Adaptive expenditure'}, fault:false,
        cap:{plain:'<b>Three months later.</b> In this example, resting use and daily movement fall. The planned gap becomes smaller without the laws of physics changing.',tech:'<b>Adaptive expenditure.</b> Lower body mass and reduced incidental movement can shrink an achieved deficit. The example values are not universal.'} }
    ];
    s.interactive = { type:'energy' };
  }

  {
    const s = S['control-room'];
    s.svg = evidenceSvg();
    s.drawing.desc = 'Interactive evidence control room';
    s.hotspots = [
      { k:'trial', n:1, plain:{name:'Trial',fn:'Good for cause · usually shorter'}, tech:{name:'Randomised trial',fn:'Randomisation reduces confounding on average'} },
      { k:'cohort', n:2, plain:{name:'Long study',fn:'Real life · confounding remains'}, tech:{name:'Cohort study',fn:'Long follow-up · residual confounding possible'} },
      { k:'mechanism', n:3, plain:{name:'Mechanism',fn:'Shows how something could work'}, tech:{name:'Mechanistic evidence',fn:'Plausibility · not human effect size by itself'} },
      { k:'population', n:4, plain:{name:'Population',fn:'A different real-world angle'}, tech:{name:'Population evidence',fn:'Different settings · different biases'} },
      { k:'review', n:5, plain:{name:'Review',fn:'Combines many studies'}, tech:{name:'Systematic review',fn:'Depends on the studies underneath'} }
    ];
    s.modes = [
      { k:'onestudy', label:{plain:'One study',tech:'Single instrument'}, fault:false,
        cap:{plain:'<b>One study.</b> One gauge gives one answer. That can be useful, but it is too early to treat it as the final word.',tech:'<b>Single instrument.</b> One estimate cannot reveal all of its own bias, random error and measurement error.'} },
      { k:'allgauges', label:{plain:'Compare methods',tech:'Full panel'}, fault:false,
        cap:{plain:'<b>Compare methods.</b> Different methods give different answers because they ask the question differently and fail differently.',tech:'<b>Full panel.</b> Trial, cohort, mechanism, population and review evidence expose different error structures.'} },
      { k:'converge', label:{plain:'Convergence',tech:'Triangulation'}, fault:false,
        cap:{plain:'<b>Convergence.</b> The gauges do not need to show the same number. Confidence rises when different methods point in the same direction.',tech:'<b>Triangulation.</b> Compatible estimates from methods with different biases are more persuasive than repeated copies of one design.'} },
      { k:'megaphone', label:{plain:'Headline',tech:'Media amplification'}, fault:false,
        cap:{plain:'<b>Headline.</b> Turn up Media Gain. One extreme result becomes visually dominant while the rest of the evidence is still sitting on the panel.',tech:'<b>Media amplification.</b> Gain changes attention, not the underlying evidence. The outlier is enlarged; the other instruments have not disappeared.'} }
    ];
    s.interactive = { type:'evidence' };
  }

  return stations;
}
