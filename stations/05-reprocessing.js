/* ============================================================
   STATION 05 — REPROCESSING (liver and kidneys)
   Anterior view (§D0). The liver sits on the patient's right, so it
   is drawn on the viewer's LEFT, wedge thick end outboard. The
   filtration skid stands to the viewer's right.
   ============================================================ */

const COIL = 'M560 294 L560 320 Q602 320 602 346 Q602 372 560 372 Q518 372 518 398 Q518 424 560 424 Q602 424 602 450 Q602 476 560 476 L560 492';
const RETURN = 'M600 348 C680 340 698 248 618 224 C558 206 498 214 454 230';

export default {
  id: 'reprocessing', no: '05', section: 'Chemical Plant',

  rail:  { plain:'Liver & Kidneys',     tech:'Reprocessing' },
  title: { plain:'The Liver & Kidneys', tech:'Reprocessing' },
  sub:   { plain:'Two units already do, continuously, what a detox product claims to sell you',
           tech :'Vessels L-05 & K-05 · transformation, then ruthless editing' },

  drawing: { no:'MB-STN-05', rev:'A', vessel:'L-05 / K-05',
             desc:'Refinery + filtration skid', view:'Block schematic' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'firstpass', n:1, plain:{ name:'The Inspection Inlet', fn:'Most water-soluble cargo comes here first' },
                     tech :{ name:'First-pass inlet', fn:'Portal vein · most water-soluble product' } },
    { k:'transform', n:2, plain:{ name:'The Rewrite Floor', fn:'Rebuilds molecules to order' },
                     tech :{ name:'Transformation', fn:'Hepatocytes · rewrite and package' } },
    { k:'warehouse', n:3, plain:{ name:'The Warehouse', fn:'About 100 g of sugar, held back' },
                     tech :{ name:'Glycogen store', fn:'~100 g · released between meals' } },
    { k:'filter', n:4, plain:{ name:'The Filter', fn:'~180 litres a day, thrown out' },
                  tech :{ name:'The filter', fn:'Glomerulus · ~180 L/day' } },
    { k:'reclaim', n:5, plain:{ name:'The Reclaim', fn:'Buys back over 99%' },
                   tech :{ name:'The reclaim', fn:'Tubules · >99% recovered' } }
  ],

  modes: [
    { k:'fed', label:{ plain:'Fed', tech:'Storing' }, fault:false,
      cap:{ plain:'<b>Fed.</b> Product arrives, gets inspected and rewritten, and the warehouse fills. This is the hour or two after a meal.',
            tech :'<b>Storing.</b> First-pass load arriving; surplus glucose committed to glycogen. Warehouse level rising.' } },

    { k:'fasted', label:{ plain:'Fasted', tech:'Releasing' }, fault:false,
      cap:{ plain:'<b>Fasted.</b> Dietary input has stopped. Liver glycogen feeds the bloodstream and new glucose production increasingly joins in, helping hold blood sugar steady overnight.',
            tech :'<b>Releasing.</b> Dietary first-pass load is low; glycogenolysis and gluconeogenesis support hepatic glucose output through the overnight fast.' } },

    { k:'alcohol', label:{ plain:'Alcohol', tech:'Priority queue' }, fault:false,
      cap:{ plain:'<b>Alcohol.</b> It goes to the front of the oxidation queue because the body has little capacity to store it. While that load is being cleared, handling of other fuels shifts.',
            tech :'<b>Priority queue.</b> Ethanol oxidation is prioritised; the resulting redox shift suppresses fat oxidation and alters handling of other substrates until the load clears.' } },

    { k:'filter', label:{ plain:'Filter and reclaim', tech:'Filtration duty' }, fault:false,
      cap:{ plain:'<b>Filter and reclaim.</b> A hundred and eighty litres a day thrown out of the blood, and nearly all of it bought straight back. Look at the two pipes: that is the whole joke.',
            tech :'<b>Filtration duty.</b> ~180 L/day filtered, >99% reclaimed, 1–2 L/day discharged. The inlet and outlet are drawn to scale relative to each other.' } },

    { k:'dry', label:{ plain:'Dehydrated', tech:'Reclaim elevated' }, fault:false,
      cap:{ plain:'<b>Dehydrated.</b> Reclaim is dialled up and the output concentrates. That is what the colour is telling you — a control system working, not an alarm.',
            tech :'<b>Reclaim elevated.</b> Water recovery raised against volume status; discharge concentrates. A control response, not a fault.' } }
  ],

  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="The liver and kidneys drawn as two process blocks: a refinery with a store, and a filtration skid">
  <title>The liver and kidneys drawn as two process blocks: a refinery with a store, and a filtration skid</title>
  <defs>
    <marker id="arw05" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 Z" fill="var(--label)"/>
    </marker>
    <clipPath id="storeClip"><rect x="148" y="312" width="244" height="88"/></clipPath>
  </defs>

  <!-- ===== inlet ===== -->
  <path class="pipe h" d="M-70 300 L120 300 L120 348 L-70 348 Z"/>
  <text class="blk-h" x="-70" y="286">FIRST PASS</text>
  <text class="dimtext techonly"  x="-70" y="378">MOST WATER-SOLUBLE CARGO</text>
  <text class="dimtext plainonly" x="-70" y="378">Most soluble cargo</text>

  <!-- long-chain fat does not take this road -->
  <path class="leader" d="M-40 348 L-40 470 L250 470" style="stroke:var(--steel);stroke-dasharray:5 5" marker-end="url(#arw05)"/>
  <text class="dimtext techonly"  x="-34" y="462" style="fill:var(--steel)">LONG-CHAIN FAT · VIA LYMPH</text>
  <text class="dimtext plainonly" x="-34" y="462" style="fill:var(--steel)">Fat takes the lymph road</text>

  <!-- ===== L-05 : the refinery ===== -->
  <rect class="vessel" x="120" y="150" width="300" height="280"/>
  <text class="blk-h techonly"  x="136" y="180">L-05 · REFINERY</text>
  <text class="blk-h plainonly" x="136" y="180">THE REFINERY</text>

  <rect class="bay" x="148" y="200" width="244" height="82"/>
  <text class="lbl-name techonly"  x="270" y="238" text-anchor="middle">Transformation</text>
  <text class="lbl-name plainonly" x="270" y="238" text-anchor="middle">The Rewrite Floor</text>
  <text class="lbl-fn" x="270" y="262" text-anchor="middle">Rebuilds molecules to order</text>

  <rect class="bay" x="148" y="312" width="244" height="88"/>
  <text class="lbl-name techonly"  x="270" y="350" text-anchor="middle">Glycogen store</text>
  <text class="lbl-name plainonly" x="270" y="350" text-anchor="middle">The Warehouse</text>
  <text class="lbl-fn" x="270" y="374" text-anchor="middle">About 100 g, held back</text>

  <path class="pipe v" d="M250 430 L290 430 L290 540 L250 540 Z"/>

  <!-- ===== the circulation both units hang off ===== -->
  <path class="pipe h" d="M-70 540 L660 540 L660 584 L-70 584 Z"/>
  <text class="blk-h techonly"  x="-64" y="614">SYSTEMIC CIRCULATION</text>
  <text class="blk-h plainonly" x="-64" y="614">THE BLOODSTREAM</text>

  <!-- ===== K-05 : the filtration skid ===== -->
  <rect class="vessel" x="450" y="150" width="250" height="280"/>
  <text class="blk-h techonly"  x="466" y="180">K-05 · FILTRATION</text>
  <text class="blk-h plainonly" x="466" y="180">THE FILTER SKID</text>

  <rect class="bay" x="475" y="200" width="200" height="82"/>
  <text class="lbl-name" x="575" y="238" text-anchor="middle">The Filter</text>
  <text class="lbl-fn techonly"  x="575" y="262" text-anchor="middle">≈ 180 L/day filtered</text>
  <text class="lbl-fn plainonly" x="575" y="262" text-anchor="middle">~180 litres a day</text>

  <rect class="bay" x="475" y="312" width="200" height="88"/>
  <text class="lbl-name" x="575" y="350" text-anchor="middle">The Reclaim</text>
  <text class="lbl-fn techonly"  x="575" y="374" text-anchor="middle">&gt; 99% recovered</text>
  <text class="lbl-fn plainonly" x="575" y="374" text-anchor="middle">Buys back over 99%</text>

  <!-- two fat pipes and a hairline: the whole argument of this station -->
  <path class="pipe v" d="M472 430 L516 430 L516 540 L472 540 Z"/>
  <path class="pipe v" d="M596 430 L640 430 L640 540 L596 540 Z"/>
  <path class="pipe" d="M675 353 L743 353 L743 660 L736 660 L736 360 L675 360 Z"/>
  <text class="dimtext techonly"  x="464" y="472" text-anchor="end">≈ 180 L/day in</text>
  <text class="dimtext plainonly" x="464" y="472" text-anchor="end">180 litres in</text>
  <text class="dimtext techonly"  x="648" y="472">≈ 178 back</text>
  <text class="dimtext plainonly" x="636" y="472">nearly all back</text>
  <text class="dimtext" x="730" y="690" text-anchor="end" style="fill:var(--turmeric)">1–2 L/day out</text>

  <!-- ===== storing ===== -->
  <g class="anim a-fed">
    <path class="flowline" d="M-60 324 L112 324"/>
    <g clip-path="url(#storeClip)"><rect class="level" x="148" y="312" width="244" height="88"/></g>
  </g>

  <!-- ===== releasing ===== -->
  <g class="anim a-fasted">
    <path class="flowline" d="M270 438 L270 532"/>
    <g clip-path="url(#storeClip)"><rect class="level" x="148" y="312" width="244" height="88" style="animation-direction:reverse"/></g>
  </g>

  <!-- ===== priority queue ===== -->
  <g class="anim a-alcohol">
    <path class="flowline" d="M-60 324 L112 324" style="stroke:var(--chilli);animation-duration:.7s"/>
    <circle class="chyme b" cx="20" cy="324" r="8"/>
    <circle class="chyme b" cx="66" cy="324" r="7" style="animation-delay:-1.8s"/>
    <circle class="faultmark" cx="270" cy="241" r="30"/>
  </g>

  <!-- ===== filtration duty ===== -->
  <g class="anim a-filter">
    <path class="flowline" d="M494 532 L494 438" style="stroke-width:11"/>
    <path class="flowline" d="M618 438 L618 532" style="stroke-width:11"/>
    <path class="flowline" d="M739 372 L739 652" style="stroke-width:1.4"/>
  </g>

  <!-- ===== reclaim elevated ===== -->
  <g class="anim a-dry">
    <path class="flowline" d="M618 438 L618 532" style="stroke-width:11;animation-duration:.7s"/>
    <path class="flowline" d="M739 372 L739 652" style="stroke-width:1.4;animation-duration:4s"/>
  </g>

  <!-- instrument (Nerd Mode only) -->
  <g class="techonly" transform="translate(300,690)">
    <circle cx="0" cy="0" r="44" fill="none" stroke="var(--line-dim)" stroke-width="1"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="var(--line-faint)" stroke-width="1"/>
    <path d="M-30 12 A34 34 0 0 1 30 12" fill="none" style="stroke:var(--steel);stroke-width:2.5" opacity=".55"/>
    <line class="needle" x1="0" y1="12" x2="10" y2="-20" style="stroke:var(--steel)"/>
    <circle cx="0" cy="12" r="3" fill="var(--line)"/>
    <text class="dimtext" x="0" y="34" text-anchor="middle">&gt; 99% recovery</text>
    <text class="dimtext" x="0" y="-30" text-anchor="middle" opacity=".6">FI-505</text>
  </g>

  <!-- myth annotation -->
  <g class="mythonly">
    <rect class="hazard" x="120" y="150" width="300" height="280"/>
    <path class="scribble" d="M158 190 L382 390 M382 190 L158 390"/>
    <path class="leader" d="M420 190 L452 116 L468 116" style="stroke:var(--chilli)"/>
    <text class="hazardtext" x="474" y="112">"Do a detox cleanse"</text>
    <text class="hazardtext" x="474" y="128" opacity=".75">— this unit has never stopped</text>
  </g>

  <!-- ================= HOTSPOTS — markers only; every block is labelled ===== -->
  <g class="hot" data-k="firstpass" role="button" tabindex="0" aria-label="The inspection inlet">
    <circle class="hotring" cx="40" cy="324" r="10"/><circle class="hithalo" cx="40" cy="324" r="22"/>
    <circle class="hotdot" cx="40" cy="324" r="10"/><text class="hotnum" x="40" y="324">1</text>
  </g>
  <g class="hot" data-k="transform" role="button" tabindex="0" aria-label="The rewrite floor">
    <circle class="hotring" cx="134" cy="222" r="10"/><circle class="hithalo" cx="134" cy="222" r="22"/>
    <circle class="hotdot" cx="134" cy="222" r="10"/><text class="hotnum" x="134" y="222">2</text>
  </g>
  <g class="hot" data-k="warehouse" role="button" tabindex="0" aria-label="The warehouse">
    <circle class="hotring" cx="134" cy="334" r="10"/><circle class="hithalo" cx="134" cy="334" r="22"/>
    <circle class="hotdot" cx="134" cy="334" r="10"/><text class="hotnum" x="134" y="334">3</text>
  </g>
  <g class="hot" data-k="filter" role="button" tabindex="0" aria-label="The filter">
    <circle class="hotring" cx="479" cy="222" r="10"/><circle class="hithalo" cx="479" cy="222" r="22"/>
    <circle class="hotdot" cx="479" cy="222" r="10"/><text class="hotnum" x="479" y="222">4</text>
  </g>
  <g class="hot" data-k="reclaim" role="button" tabindex="0" aria-label="The reclaim">
    <circle class="hotring" cx="479" cy="334" r="10"/><circle class="hithalo" cx="479" cy="334" r="22"/>
    <circle class="hotdot" cx="479" cy="334" r="10"/><text class="hotnum" x="479" y="334">5</text>
  </g>
</svg>`,

  main: {
    plain: {
      kicker: 'The short version',
      points: [
        { h:'You cannot feel any of it.', p:'There are no instruments on this station you can read. Both units also hide damage until a large fraction of capacity is gone.' },
        { k:'firstpass', h:'Most soluble cargo gets a first pass.',
          p:'Most water-soluble nutrients and swallowed drugs enter the portal vein and reach the liver before the rest of the circulation. Long-chain dietary fat takes a famous side road: chylomicrons enter lymph first and reach the liver later.' },
        { k:'transform', h:'It rewrites molecules.',
          p:'Molecules are chemically rewritten — made easier to excrete, converted into something usable, or packaged for transport. The same machinery handles nutrients, medicines, alcohol and hormones, which is exactly why they interfere with each other.' },
        { k:'warehouse', h:'There is a warehouse and a factory attached.',
          p:'Roughly a hundred grams of liver glycogen can be mobilised between meals. As fasting continues, the liver also makes new glucose from other substrates. Overnight blood glucose is defended by both routes.' },
        { k:'filter', h:'The kidney design is genuinely strange.',
          p:'About 180 litres of ultrafiltrate are made per day. The filter passes water and many small solutes while keeping blood cells and most large proteins in circulation; the tubules then reclaim nearly everything useful.' },
        { k:'reclaim', h:'The Reclaim',
          p:'Around 178 of those 180 litres are recovered, along with the glucose, amino acids and salts worth keeping. Over ninety-nine per cent, adjusted continuously against how much you drank, how much you sweated, and what your blood is doing.' }
      ],
      note: '<b>The detox problem.</b> Both units here perform continuous detoxification, unpaid and unsupervised, every second you have been alive — including while you were reading the word "detox". There is no queue of accumulated toxins waiting for a juice to arrive. If these units were genuinely not clearing your blood, you would not be shopping. You would be in hospital.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',              v:'Multi-stage transformation refinery (L-05) + filtration/reclaim skid (K-05)' },
        { k:'Duty',               v:'Chemical transformation · storage · packaging · filtration · pH and volume control' },
        { k:'L-05 mass',          v:'~1.5 kg' },
        { k:'L-05 throughput',    v:'~1.5 L blood/min' },
        { k:'L-05 stored fuel',   v:'<em>~100 g glycogen</em>' },
        { k:'K-05 filtration',    v:'<em>~180 L/day</em>' },
        { k:'K-05 recovery',      v:'&gt; 99%' },
        { k:'Net discharge',      v:'1–2 L/day' },
        { k:'Regeneration',       v:'L-05 has exceptional capacity to restore mass after injury or resection' },
        { k:'Instrumentation',    v:'None visible to the operator. You cannot feel any of this happening.' },
        { k:'Failure signalling', v:'Late. Both units mask damage until a large fraction of capacity is gone.' }
      ],
      points: [
        { k:'firstpass', h:'First-pass inlet',
          p:'Portal blood carries most absorbed water-soluble nutrients and many oral drugs to the liver before systemic circulation. Long-chain lipids are packaged into chylomicrons and initially travel by intestinal lymph, bypassing hepatic first pass.' },
        { k:'transform', h:'Transformation',
          p:'Molecules are chemically rewritten: made more water-soluble for excretion, converted into something the body can use, or packaged for transport. The same machinery handles nutrients, medicines, alcohol and hormones, which is why they interfere with each other.' },
        { k:'warehouse', h:'Glycogen store',
          p:'Roughly 100 g of glycogen is stored in the liver. Between meals the liver uses glycogenolysis and, increasingly with fasting, gluconeogenesis to defend blood glucose.' },
        { k:'filter', h:'The filter',
          p:'About 180 litres of ultrafiltrate are formed per day. The glomerular barrier has high conductance for water and small solutes but excludes cells and most macromolecules; tubular transport then performs the fine editing.' },
        { k:'reclaim', h:'The reclaim',
          p:'Around 178 of the 180 litres are recovered, along with glucose, amino acids and salts worth keeping. Over 99% recovery, adjusted continuously against intake, losses and blood pH.' }
      ],
      note: "<b>Design note.</b> The kidney's strategy is the strange one. A sensible engineer separating waste from a valuable stream might extract only the waste. The glomeruli instead filter enormous volumes of plasma water and small solutes, then the tubules buy back almost everything worth keeping. It is energetically expensive, but it gives exquisite control over the final output and helps keep blood chemistry within a tight operating range.",
      analogy: {
        tag: 'Engineering analogue',
        body: 'A refinery with a bonded warehouse attached, feeding a reverse-osmosis plant that runs its permeate back through recovery. The unusual feature is the "reject everything, then reclaim" architecture, which real plants avoid because it wastes energy — and which biology uses because it buys extraordinarily precise control.'
      }
    }
  },

  modelLimits: [
    'Portal first-pass applies to most water-soluble gut products, not all absorbed material. Long-chain dietary fat largely reaches systemic blood through lymph first.',
    'The kidney does not filter blood indiscriminately: cells and most large proteins are retained while water and many small solutes enter the filtrate.'
  ],

  myth: {
    claim: 'Do a detox cleanse to flush out the toxins.',
    mechanism: [
      'Both units in this drawing perform continuous detoxification, unpaid and unsupervised, every second you have been alive, including while you were reading the word "detox". There is no queue of accumulated toxins waiting for a juice to arrive. If these units were genuinely not clearing your blood, you would not be shopping — you would be in hospital.',
      'Ask the specific question and the category collapses: which toxin, measured how, cleared by what mechanism, demonstrated in whom? Products in this category never answer it, because the word "toxin" is doing marketing work, not chemistry.',
      'The sharper point is that this is not merely a waste of money. Herbal and dietary supplements are now a documented and rising cause of drug-induced liver injury — the exact organ the product claims to be helping. Some botanical extracts at concentrated doses, and some traditional preparations found to be contaminated with heavy metals, have put people in liver failure.'
    ],
    whySurvives: 'Because "cleansing" is an old and emotionally satisfying idea that long predates any knowledge of what the liver does, and because feeling slightly unwell is universal while its causes are usually boring. A cleanse offers agency. The truthful version — this is already handled, go to bed earlier — offers none.'
  }
};
