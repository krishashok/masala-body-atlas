/* ============================================================
   STATION 09 — EAT THE BIRYANI
   The preface drawing again, every node green, closing the loop.
   One mode, permanently on: the absence of controls is the point.
   No myth panel — the argument has already been made.
   ============================================================ */

import { facilityPlan } from './00-preface.js';

export default {
  id: 'closing', no: '09', section: 'Discharge',

  rail:  { plain:'Eat the Biryani', tech:'Discharge' },
  title: { plain:'Eat the Biryani', tech:'Eat the Biryani' },
  sub:   { plain:'Understand the system, distrust certainty, then eat',
           tech :'All systems nominal · unattended operation · 80 years' },

  drawing: { no:'MB-STN-09', rev:'A', vessel:'—',
             desc:'Facility overview', view:'Site plan' },

  modes: [
    { k:'nominal', label:{ plain:'All systems nominal', tech:'All systems nominal' }, fault:false,
      cap:{ plain:'<b>All systems nominal.</b> Eight stages, running, unattended, for about eighty years. There is nothing to adjust on this screen — which is the point.',
            tech :'<b>All systems nominal.</b> Unattended operation, eight stages in series, ~80 years design life. No operator input available on this station by design.' } }
  ],

  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="The whole facility again, every station running, closing the tour">
  <title>The whole facility again, every station running, closing the tour</title>
  <defs>
    <marker id="arw00" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.34)"/>
    </marker>
  </defs>

  ${facilityPlan({ nominal: true })}

  <g class="anim a-nominal">
    <path class="flowline" d="M200 118 L200 500" style="stroke:var(--cardamom)"/>
    <path class="flowline" d="M214 338 L416 338" style="stroke:var(--cardamom)"/>
    <path class="flowline" d="M430 353 L430 459" style="stroke:var(--cardamom)"/>
  </g>

  <text class="dimtext techonly"  x="236" y="96">▼ FEED — still whatever you decide</text>
  <text class="dimtext plainonly" x="236" y="96">▼ Still whatever you decide</text>
  <text class="dimtext techonly"  x="236" y="548">▼ DISCHARGE</text>
  <text class="dimtext plainonly" x="236" y="548">▼ Out</text>
</svg>`,

  main: {
    plain: {
      kicker: 'Closing',
      points: [
        { h:'It worked the whole time.', p:'Eight stages, running unsupervised, accepting whatever you sent it, while you thought about something else entirely.' },
        { h:'That competence is the argument.', p:'A machine this robust is not endangered by a chilli, rice at night, or fruit eaten in the “wrong” order. Robust does not mean invulnerable; it means ordinary meals are not sabotage.' },
        { h:'What moves the needle is dull.', p:'How much you eat, how varied it is, how much muscle you carry, how much you move, how you sleep, and who you eat with.' },
        { h:'Most of it is inconveniently unbranded.', p:'None of those levers is a miracle ingredient, which makes them difficult to sell in a jar.' },
        { h:'Food is not a moral test.', p:'It is chemistry, culture and pleasure. Your body is not a court.' }
      ],
      note: '<b>Trust the biological engineering, ignore the noise, and eat the biryani.</b>'
    },
    tech: {
      kicker: 'Status Board',
      spec: [
        { k:'Facility status',    v:'<em>All systems nominal</em>' },
        { k:'Operating mode',     v:'Unattended' },
        { k:'Stages online',      v:'8 of 8' },
        { k:'Time in service',    v:'~80 years, design' },
        { k:'Operator input',     v:'None required. None available.' },
        { k:'Outstanding actions', v:'Eat the biryani.' }
      ],
      note: 'You have just walked through eight stages of a plant that has been running since before you could form a memory. It neutralised enormous pH swings, contained acid beside living tissue, rebuilt itself while operating, ran a microbial ecosystem, filtered vast volumes of fluid and defended a few grams of circulating glucose — mostly outside your awareness.',
      analogy: {
        tag: 'And then',
        body: 'That competence is the argument. A robust system is not sabotaged by a chilli, rice at night or fruit in the wrong order. It is not invulnerable either: allergy, intolerance, infection, toxins and disease are real. The levers that matter most are dull and well-supported — total intake, dietary quality and variety, muscle, movement, sleep, clinical risk and social context. Food is chemistry, culture and pleasure. It is not a measure of moral purity, and your body is not a court. Trust the biological engineering, ignore the noise, and eat the biryani.'
      }
    }
  },
  modelLimits: [
    'Robustness is not invulnerability. Allergy, intolerance, infection, toxic dose, medication interactions and disease can make ordinary-looking exposures matter a great deal to a particular person.',
    'The closing argument targets trivial universal food rules, not individual medical advice or genuine dose-dependent hazards.'
  ],

};
