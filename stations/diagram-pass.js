const byId = stations => Object.fromEntries(stations.map(s => [s.id, s]));

function replaceAll(svg, pairs){
  for (const [from, to] of pairs) svg = svg.split(from).join(to);
  return svg;
}

function meterSvg(){
  const row = (k, n, y, plainName, plainFn, techName, techFn) => `
  <g>
    <rect class="bay" x="72" y="${y-28}" width="318" height="62" rx="3"/>
    <text class="lbl-name plainonly" x="122" y="${y-5}">${plainName}</text>
    <text class="lbl-fn plainonly" x="122" y="${y+16}">${plainFn}</text>
    <text class="lbl-name techonly" x="122" y="${y-5}">${techName}</text>
    <text class="lbl-fn techonly" x="122" y="${y+16}">${techFn}</text>
    <g class="hot" data-k="${k}" role="button" tabindex="0" aria-label="${plainName}">
      <circle class="hotring" cx="96" cy="${y}" r="10"/>
      <circle class="hithalo" cx="96" cy="${y}" r="22"/>
      <circle class="hotdot" cx="96" cy="${y}" r="10"/>
      <text class="hotnum" x="96" y="${y}">${n}</text>
    </g>
  </g>`;

  return `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="Energy balance shown as estimated energy in and energy out feeding a calculated deficit">
  <title>Energy balance: estimated energy in minus estimated energy out</title>
  <defs>
    <marker id="arw07b" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.45)"/>
    </marker>
  </defs>

  <text class="blk-h plainonly" x="72" y="92">ENERGY IN</text>
  <text class="blk-h techonly" x="72" y="92">INTAKE ESTIMATE</text>
  ${row('intake', 1, 142, 'Food eaten', 'Hard to measure exactly', 'Intake estimate', 'Portion + recipe + database + memory')}

  <text class="blk-h plainonly" x="72" y="238">ENERGY OUT</text>
  <text class="blk-h techonly" x="72" y="238">EXPENDITURE ESTIMATES</text>
  ${row('base', 2, 286, 'Resting use', 'Biggest part', 'Resting metabolism', 'Usually the largest component')}
  ${row('tef', 3, 378, 'Digesting food', 'Small share', 'Thermic effect', 'Protein > carbohydrate > fat')}
  ${row('neat', 4, 470, 'Daily movement', 'Varies a lot', 'Incidental movement', 'Highly variable and adaptive')}
  ${row('exercise', 5, 562, 'Exercise', 'Useful beyond calories', 'Planned exercise', 'Often a smaller share in non-athletes')}

  <path class="leader" d="M390 142 L458 142 L458 286" marker-end="url(#arw07b)"/>
  <path class="leader" d="M390 286 L430 286 L430 418"/>
  <path class="leader" d="M390 378 L430 378"/>
  <path class="leader" d="M390 470 L430 470 L430 418"/>
  <path class="leader" d="M390 562 L430 562 L430 418"/>
  <text class="dimtext plainonly" x="448" y="212">IN</text>
  <text class="dimtext techonly" x="448" y="212">INTAKE</text>
  <text class="dimtext plainonly" x="410" y="430" text-anchor="end">OUT</text>
  <text class="dimtext techonly" x="410" y="430" text-anchor="end">EXPENDITURE</text>

  <circle class="vessel" cx="486" cy="354" r="38"/>
  <text class="stamptext" x="486" y="350" text-anchor="middle">IN</text>
  <text class="stamptext" x="486" y="370" text-anchor="middle">− OUT</text>
  <path class="leader" d="M524 354 L552 354" marker-end="url(#arw07b)"/>

  <rect class="vessel" x="552" y="260" width="212" height="206" rx="5"/>
  <rect class="readoutbox" x="576" y="292" width="164" height="74"/>
  <text class="dimtext plainonly" x="658" y="396" text-anchor="middle">CALCULATED DEFICIT</text>
  <text class="dimtext techonly" x="658" y="396" text-anchor="middle">CALCULATED BALANCE</text>
  <text class="dimtext" x="658" y="420" text-anchor="middle" opacity=".6">kcal / day</text>

  <g class="anim a-reading">
    <text class="digits" x="658" y="346" text-anchor="middle">350</text>
    <text class="dimtext plainonly" x="658" y="448" text-anchor="middle">Looks exact</text>
    <text class="dimtext techonly" x="658" y="448" text-anchor="middle">DISPLAY PRECISION ≠ INPUT ACCURACY</text>
  </g>

  <g class="anim a-errorbars">
    <text class="digits" x="658" y="346" text-anchor="middle" opacity=".45">≈350</text>
    <text class="dimtext plainonly" x="658" y="448" text-anchor="middle" style="fill:var(--chilli)">Both sides are estimates</text>
    <text class="dimtext techonly" x="658" y="448" text-anchor="middle" style="fill:var(--chilli)">UNCERTAINTY DIFFERS BY INPUT</text>
    <g style="fill:var(--ink);stroke:var(--chilli);stroke-width:1">
      <rect x="300" y="124" width="72" height="20" rx="2"/>
      <rect x="300" y="268" width="72" height="20" rx="2"/>
      <rect x="300" y="360" width="72" height="20" rx="2"/>
      <rect x="300" y="452" width="72" height="20" rx="2"/>
      <rect x="300" y="544" width="72" height="20" rx="2"/>
    </g>
    <g class="faulttext" text-anchor="middle">
      <text x="336" y="138">ESTIMATE</text>
      <text x="336" y="282">ESTIMATE</text>
      <text x="336" y="374">ESTIMATE</text>
      <text x="336" y="466">ESTIMATE</text>
      <text x="336" y="558">ESTIMATE</text>
    </g>
  </g>

  <g class="anim a-months">
    <text class="digits" x="658" y="346" text-anchor="middle" opacity=".55">350</text>
    <text class="dimtext plainonly" x="658" y="448" text-anchor="middle" style="fill:var(--chilli)">The gap can shrink</text>
    <text class="dimtext techonly" x="658" y="448" text-anchor="middle" style="fill:var(--chilli)">EXPENDITURE ADAPTS</text>
    <path class="leader" d="M360 286 L360 316" marker-end="url(#arw07b)" style="stroke:var(--chilli)"/>
    <path class="leader" d="M360 470 L360 500" marker-end="url(#arw07b)" style="stroke:var(--chilli)"/>
    <text class="faulttext plainonly" x="286" y="320" text-anchor="end">can fall</text>
    <text class="faulttext plainonly" x="286" y="504" text-anchor="end">can fall</text>
    <text class="faulttext techonly" x="286" y="320" text-anchor="end">resting use ↓</text>
    <text class="faulttext techonly" x="286" y="504" text-anchor="end">NEAT ↓</text>
  </g>

  <g class="mythonly">
    <rect class="hazard" x="548" y="256" width="220" height="214" rx="5"/>
    <path class="scribble" d="M590 302 L726 424 M726 302 L590 424"/>
    <text class="hazardtext" x="658" y="508" text-anchor="middle">"App − watch = exact deficit"</text>
    <text class="hazardtext" x="658" y="528" text-anchor="middle" opacity=".75">both inputs are estimates</text>
  </g>

  <text class="dimtext plainonly" x="72" y="650">Exact law. Approximate inputs.</text>
  <text class="dimtext techonly" x="72" y="650">CONSERVATION LAW EXACT · MEASUREMENTS APPROXIMATE</text>
</svg>`;
}

export default function applyDiagramPass(stations){
  const S = byId(stations);

  const globalPairs = [
    ['and no operator watched', 'no operator input'],
    ['No operator drives this', 'No direct control'],
    ['The appetite loop is slow. It defends the fuel already stored.', 'APPETITE CONTROL · SLOW FEEDBACK'],
    ['dispatcher idle', 'insulin low'],
    ['the bay still opens', 'muscle uptake rises'],
    ['Signalling harder', 'Higher insulin signal'],
    ['Doors opening slower', 'Smaller tissue response'],
    ['one instrument, read with confidence', 'SINGLE STUDY'],
    ['five instruments · five readings · none is faulty', 'FIVE METHODS · DIFFERENT RESULTS'],
    ['Convergence — clustered, not identical', 'METHODS CLUSTER'],
    ['One outlier, selected and broadcast', 'OUTLIER AMPLIFIED'],
    ['THE PART NOBODY DISPUTES', 'SETTLED FINDINGS'],
    ['The Clean Gauge', 'Trial'],
    ['The Long Gauge', 'Long study'],
    ['The Tilt', 'Confounding'],
    ['The Megaphone', 'Amplifier'],
    ['The strongest reading on the panel', 'Agreement across methods'],
    ['Selects the extreme gauge', 'Selects an extreme result'],
    ['Selection + amplification', 'Selection / amplification']
  ];
  for (const s of stations) s.svg = replaceAll(s.svg, globalPairs);

  {
    const s = S.meter;
    s.hotspots = [
      { k:'intake', n:1, plain:{ name:'Food eaten', fn:'Hard to measure exactly' }, tech:{ name:'Intake estimate', fn:'Portion · recipe · database · memory' } },
      { k:'base', n:2, plain:{ name:'Resting use', fn:'Biggest part' }, tech:{ name:'Resting metabolism', fn:'Usually the largest component' } },
      { k:'tef', n:3, plain:{ name:'Digesting food', fn:'Small share' }, tech:{ name:'Thermic effect', fn:'Protein > carbohydrate > fat' } },
      { k:'neat', n:4, plain:{ name:'Daily movement', fn:'Varies a lot' }, tech:{ name:'Incidental movement', fn:'Highly variable and adaptive' } },
      { k:'exercise', n:5, plain:{ name:'Exercise', fn:'Useful beyond calories' }, tech:{ name:'Planned exercise', fn:'Often a smaller share in non-athletes' } }
    ];
    s.modes = [
      { k:'reading', label:{ plain:'Looks precise', tech:'Display value' }, fault:false,
        cap:{ plain:'<b>Looks precise.</b> A calculated deficit can appear as a clean number. The arithmetic may be exact even when the inputs are estimates.',
              tech :'<b>Display value.</b> The calculation can show more precision than the intake and expenditure measurements justify.' } },
      { k:'errorbars', label:{ plain:'Show the estimates', tech:'Input uncertainty' }, fault:false,
        cap:{ plain:'<b>Show the estimates.</b> Food intake and energy use are both measured imperfectly. The error is not the same for every input or every person.',
              tech :'<b>Input uncertainty.</b> Portion estimates, databases, prediction equations and wearables have different error structures. There is no universal ± percentage.' } },
      { k:'months', label:{ plain:'After months', tech:'Adaptive expenditure' }, fault:false,
        cap:{ plain:'<b>After months.</b> Weight loss can lower resting energy use, and daily movement can fall without you noticing. The gap can become smaller than the original plan.',
              tech :'<b>Adaptive expenditure.</b> Lower body mass reduces resting cost, while adaptive changes in NEAT can reduce expenditure further. The achieved deficit is dynamic.' } }
    ];
    s.svg = meterSvg();
  }

  {
    const s = S['control-room'];
    s.svg = replaceAll(s.svg, [
      ['FIVE WAYS OF MEASURING THE SAME THING', 'FIVE METHODS'],
      ['INSTRUMENT WALL — FIVE DESIGNS, FIVE BIASES', 'FIVE METHODS · DIFFERENT BIASES'],
      ['Convergence — the trustworthy reading', 'METHODS CLUSTER'],
      ['Funding and media · high gain', 'Selection / amplification'],
      ['THE PART NOBODY DISPUTES', 'SETTLED FINDINGS']
    ]);
  }

  return stations;
}
