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
  sub:   { plain:'These two units already do the work that a detox product offers to sell you.',
           tech :'Vessels L-05 and K-05 · the first unit rewrites, the second selects' },

  drawing: { no:'MB-STN-05', rev:'A', vessel:'L-05 / K-05',
             desc:'Refinery + filtration skid', view:'Block schematic' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'firstpass', n:1, plain:{ name:'The Inspection Inlet', fn:'Most soluble material arrives here first' },
                     tech :{ name:'First-pass inlet', fn:'Portal vein · most soluble product' } },
    { k:'transform', n:2, plain:{ name:'The Rewrite Floor', fn:'It rebuilds molecules' },
                     tech :{ name:'Transformation', fn:'Hepatocytes · they rewrite and package' } },
    { k:'warehouse', n:3, plain:{ name:'The Warehouse', fn:'It holds about 100 g of sugar' },
                     tech :{ name:'Glycogen store', fn:'About 100 g · released between meals' } },
    { k:'filter', n:4, plain:{ name:'The Filter', fn:'It removes about 180 litres a day' },
                  tech :{ name:'The filter', fn:'Glomerulus · about 180 L a day' } },
    { k:'reclaim', n:5, plain:{ name:'The Reclaim', fn:'It recovers more than 99%' },
                   tech :{ name:'The reclaim', fn:'Tubules · they recover more than 99%' } }
  ],

  modes: [
    { k:'fed', label:{ plain:'Fed', tech:'Storing' }, fault:false,
      cap:{ plain:'<b>Fed.</b> The product arrives. The liver examines it and rewrites it, and the store fills. This occurs in the hour or two after a meal.',
            tech :'<b>Storing.</b> The first-pass load arrives. The liver converts the surplus glucose into glycogen. The level in the store increases.' } },

    { k:'fasted', label:{ plain:'Fasted', tech:'Releasing' }, fault:false,
      cap:{ plain:'<b>Fasted.</b> No food arrives. The liver releases its glycogen into the blood. It also makes new glucose, and it makes more of it as the fast continues. These two supplies hold the blood sugar steady overnight.',
            tech :'<b>Releasing.</b> The first-pass load is low. The liver breaks down its glycogen, and it also makes new glucose. Both processes hold the glucose output steady through the overnight fast.' } },

    { k:'alcohol', label:{ plain:'Alcohol', tech:'Priority queue' }, fault:false,
      cap:{ plain:'<b>Alcohol.</b> The liver oxidises the alcohol first, because your body cannot store much of it. While the liver clears that load, it changes how it handles the other fuels.',
            tech :'<b>Priority queue.</b> The liver oxidises the ethanol first. This changes the chemical balance in the cell. The liver then oxidises less fat, and it handles the other substrates differently, until it clears the load.' } },

    { k:'filter', label:{ plain:'Filter and reclaim', tech:'Filtration duty' }, fault:false,
      cap:{ plain:'<b>Filter and reclaim.</b> The kidney removes one hundred and eighty litres from the blood each day. It then recovers almost all of it. Look at the two pipes and compare their sizes.',
            tech :'<b>Filtration duty.</b> The kidney filters about 180 L each day. It recovers more than 99% and discharges 1 to 2 L. The inlet pipe and the outlet pipe are drawn to the same scale.' } },

    { k:'dry', label:{ plain:'Dehydrated', tech:'Reclaim elevated' }, fault:false,
      cap:{ plain:'<b>Dehydrated.</b> The kidney increases the recovery of water, and the discharge becomes more concentrated. The colour shows you that the control system operates correctly.',
            tech :'<b>Reclaim elevated.</b> The kidney increases the water recovery because the volume in your body is low. The discharge becomes more concentrated. This is a normal control response.' } }
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
  <text class="dimtext techonly"  x="-70" y="378">MOST SOLUBLE MATERIAL</text>
  <text class="dimtext plainonly" x="-70" y="378">Most soluble material</text>

  <!-- long-chain fat does not take this road -->
  <path class="leader" d="M-40 348 L-40 470 L250 470" style="stroke:var(--steel);stroke-dasharray:5 5" marker-end="url(#arw05)"/>
  <text class="dimtext techonly"  x="-34" y="462" style="fill:var(--steel)">LONG-CHAIN FAT · VIA LYMPH</text>
  <text class="dimtext plainonly" x="-34" y="462" style="fill:var(--steel)">Fat travels by the lymph</text>

  <!-- ===== L-05 : the refinery ===== -->
  <rect class="vessel" x="120" y="150" width="300" height="280"/>
  <text class="blk-h techonly"  x="136" y="180">L-05 · REFINERY</text>
  <text class="blk-h plainonly" x="136" y="180">THE REFINERY</text>

  <rect class="bay" x="148" y="200" width="244" height="82"/>
  <text class="lbl-name techonly"  x="270" y="238" text-anchor="middle">Transformation</text>
  <text class="lbl-name plainonly" x="270" y="238" text-anchor="middle">The Rewrite Floor</text>
  <text class="lbl-fn" x="270" y="262" text-anchor="middle">Rebuilds molecules</text>

  <rect class="bay" x="148" y="312" width="244" height="88"/>
  <text class="lbl-name techonly"  x="270" y="350" text-anchor="middle">Glycogen store</text>
  <text class="lbl-name plainonly" x="270" y="350" text-anchor="middle">The Warehouse</text>
  <text class="lbl-fn" x="270" y="374" text-anchor="middle">About 100 g, held in store</text>

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
  <text class="lbl-fn techonly"  x="575" y="262" text-anchor="middle">About 180 L a day filtered</text>
  <text class="lbl-fn plainonly" x="575" y="262" text-anchor="middle">About 180 litres a day</text>

  <rect class="bay" x="475" y="312" width="200" height="88"/>
  <text class="lbl-name" x="575" y="350" text-anchor="middle">The Reclaim</text>
  <text class="lbl-fn techonly"  x="575" y="374" text-anchor="middle">&gt; 99% recovered</text>
  <text class="lbl-fn plainonly" x="575" y="374" text-anchor="middle">Recovers over 99%</text>

  <!-- two fat pipes and a hairline: the whole argument of this station -->
  <path class="pipe v" d="M472 430 L516 430 L516 540 L472 540 Z"/>
  <path class="pipe v" d="M596 430 L640 430 L640 540 L596 540 Z"/>
  <path class="pipe" d="M675 353 L743 353 L743 660 L736 660 L736 360 L675 360 Z"/>
  <text class="dimtext techonly"  x="464" y="472" text-anchor="end">About 180 L a day in</text>
  <text class="dimtext plainonly" x="464" y="472" text-anchor="end">180 litres in</text>
  <text class="dimtext techonly"  x="648" y="472">≈ 178 back</text>
  <text class="dimtext plainonly" x="636" y="472">almost all back</text>
  <text class="dimtext" x="730" y="690" text-anchor="end" style="fill:var(--turmeric)">1–2 L a day out</text>

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
    <text class="hazardtext" x="474" y="128" opacity=".75">this unit has never stopped</text>
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
      kicker: 'Summary',
      points: [
        { h:'You cannot feel any of this work.', p:'This station has no instrument that you can read. Both units also continue to operate after damage. They give no signal until a large part of their capacity is gone.' },
        { k:'firstpass', h:'Most soluble material goes to the liver first.',
          p:'Most soluble nutrients and most medicines that you swallow enter the portal vein. They reach the liver before they reach the rest of the blood. Long-chain fat uses a different route. The wall packs it into chylomicrons, which enter the lymph first and reach the liver later.' },
        { k:'transform', h:'The liver rewrites molecules.',
          p:'The liver changes the chemistry of a molecule. It can make the molecule easier to discharge, change it into a usable form, or pack it for transport. The same machinery handles nutrients, medicines, alcohol and hormones. They therefore interfere with each other.' },
        { k:'warehouse', h:'The liver has a store and a factory.',
          p:'The liver can release about one hundred grams of glycogen between meals. As the fast continues, it also makes new glucose from other substrates. Both routes hold your blood glucose steady overnight.' },
        { k:'filter', h:'The design of the kidney is unusual.',
          p:'The kidney makes about 180 litres of filtrate each day. The filter lets water and many small molecules through. It keeps the blood cells and most large proteins in the blood. The tubules then recover almost all the useful material.' },
        { k:'reclaim', h:'The Reclaim',
          p:'The tubules recover about 178 of those 180 litres. They also recover the glucose, the amino acids and the necessary salts. This is more than ninety-nine per cent. The kidney adjusts the quantity continuously against the fluid that you drank, the fluid that you lost, and the condition of your blood.' }
      ],
      note: '<b>Summary.</b> Both units remove unwanted substances continuously. They have done this every second of your life, and nobody pays them or supervises them. No quantity of toxins waits in your body for a juice to arrive. If these units did not clear your blood, you would be in hospital.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',              v:'A refinery with several stages (L-05), and a filter and reclaim unit (K-05).' },
        { k:'Duty',               v:'It changes the chemistry, stores material, packs it for transport, filters the blood, and controls the pH and the volume.' },
        { k:'L-05 mass',          v:'About 1.5 kg' },
        { k:'L-05 throughput',    v:'About 1.5 L of blood each minute' },
        { k:'L-05 stored fuel',   v:'<em>~100 g glycogen</em>' },
        { k:'K-05 filtration',    v:'<em>About 180 L each day</em>' },
        { k:'K-05 recovery',      v:'&gt; 99%' },
        { k:'Net discharge',      v:'1 to 2 L each day' },
        { k:'Regeneration',       v:'L-05 can grow again after injury or after surgery.' },
        { k:'Instrumentation',    v:'None. You cannot feel this work.' },
        { k:'Failure signalling', v:'Late. Both units continue to operate until a large part of the capacity is gone.' }
      ],
      points: [
        { k:'firstpass', h:'First-pass inlet',
          p:'The portal blood carries most soluble nutrients and many swallowed medicines to the liver. They arrive there before they enter the general circulation. The wall packs long-chain fat into chylomicrons. These travel first in the lymph of the intestine and do not pass through the liver at that stage.' },
        { k:'transform', h:'Transformation',
          p:'The liver changes the chemistry of a molecule. It can make the molecule more soluble so that the body can discharge it, change it into a usable form, or pack it for transport. The same machinery handles nutrients, medicines, alcohol and hormones. They therefore interfere with each other.' },
        { k:'warehouse', h:'Glycogen store',
          p:'The liver stores about 100 g of glycogen. Between meals it breaks down that glycogen. As the fast continues it also makes new glucose. Both processes hold the blood glucose steady.' },
        { k:'filter', h:'The filter',
          p:'The kidney makes about 180 litres of filtrate each day. The filter passes water and small molecules easily. It stops the cells and most large molecules. The tubules then make the fine adjustment.' },
        { k:'reclaim', h:'The reclaim',
          p:'The tubules recover about 178 of the 180 litres. They also recover the glucose, the amino acids and the necessary salts. The recovery is more than 99%. The kidney adjusts it continuously against your intake, your losses and the pH of your blood.' }
      ],
      note: '<b>Design note.</b> The method of the kidney is unusual. An engineer who separates waste from a valuable stream usually removes the waste only. The kidney does the opposite. The filters remove very large volumes of water and small molecules, and the tubules then recover almost all the useful material. This method uses much energy. It also gives very precise control of the final output, and it holds the blood chemistry in a narrow range.',
      analogy: {
        tag: 'Engineering analogue',
        body: 'A refinery with a store attached. It feeds a reverse-osmosis plant that sends its output back through a recovery stage. The unusual feature is the method: the plant removes everything and then recovers what it needs. Industrial plants avoid this method because it wastes energy. Biology uses it because it gives very precise control.'
      }
    }
  },

  modelLimits: [
    'The first pass through the liver applies to most soluble products from the gut. It does not apply to all absorbed material. Most long-chain fat reaches the blood through the lymph first.',
    'The kidney does not filter the blood without selection. The filter keeps the cells and most large proteins in the blood. Water and many small molecules enter the filtrate.'
  ],

  myth: {
    claim: 'Do a detox cleanse to flush out the toxins.',
    mechanism: [
      'Both units in this drawing remove unwanted substances continuously. They have done this every second of your life, and nobody pays them or supervises them. No quantity of toxins waits in your body for a juice to arrive. If these units did not clear your blood, you would be in hospital.',
      'Ask four specific questions. Which toxin? How did you measure it? Which mechanism removes it? In which persons did you show this? These products never answer these questions. The word "toxin" is a marketing term here, and it has no chemical meaning.',
      'These products can also do damage. Herbal and dietary supplements are a recorded cause of liver injury, and the number of cases increases. This is the same organ that the product offers to help. Some plant extracts at high doses have caused liver failure. Some traditional preparations that contained heavy metals have also caused it.'
    ],
    whySurvives: 'The idea of a cleanse is old, and it satisfies people. It is much older than any knowledge of the liver. Also, every person feels unwell sometimes, and the causes are usually ordinary. A cleanse gives you an action to take. The correct answer gives you none: the work is already done, so go to bed earlier.'
  }
};
