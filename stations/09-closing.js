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
  sub:   { plain:'Understand the system. Do not trust certainty. Then eat.',
           tech :'All systems nominal · no operator attends it · 80 years' },

  drawing: { no:'MB-STN-09', rev:'A', vessel:'—',
             desc:'Facility overview', view:'Site plan' },

  modes: [
    { k:'nominal', label:{ plain:'All systems nominal', tech:'All systems nominal' }, fault:false,
      cap:{ plain:'<b>All systems nominal.</b> Eight stages operate without an operator for about eighty years. This screen has no control for you to adjust.',
            tech :'<b>All systems nominal.</b> Eight stages operate in series without an operator. The design life is about 80 years. This station accepts no operator input, and this is intended.' } }
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
        { h:'The plant operated for the full period.', p:'Eight stages ran without supervision. They accepted all the material that you sent them, while you thought about other subjects.' },
        { h:'That performance is the argument.', p:'A chilli, rice at night, or fruit in a different order does not endanger a machine of this strength. A strong machine can still be damaged. But an ordinary meal does not damage it.' },
        { h:'The controls that work are ordinary.', p:'These are the quantity that you eat, the variety of your food, the muscle that you carry, the movement that you make, your sleep, and the persons who eat with you.' },
        { h:'Nobody sells these controls.', p:'None of these controls is a special ingredient. It is therefore difficult to put them in a jar and sell them.' },
        { h:'Food is not a test of your character.', p:'Food is chemistry, culture and pleasure. Your body does not judge you.' }
      ],
      note: '<b>Trust the biological engineering. Ignore the noise. Eat the biryani.</b>'
    },
    tech: {
      kicker: 'Status Board',
      spec: [
        { k:'Facility status',    v:'<em>All systems nominal</em>' },
        { k:'Operating mode',     v:'Unattended' },
        { k:'Stages online',      v:'8 of 8' },
        { k:'Time in service',    v:'About 80 years, by design' },
        { k:'Operator input',     v:'The station needs none, and it accepts none.' },
        { k:'Outstanding actions', v:'Eat the biryani.' }
      ],
      note: 'You have examined eight stages of a plant that has operated since before you could remember. It corrected very large changes of pH. It held acid beside living tissue. It rebuilt itself while it operated. It ran an ecosystem of microbes. It filtered very large volumes of fluid, and it held a few grams of glucose within narrow limits. You were not aware of most of this work.',
      analogy: {
        tag: 'And then',
        body: 'That performance is the argument. A chilli, rice at night, or fruit in a different order does not damage a strong system. The system can still be damaged: allergy, intolerance, infection, toxins and disease are all real. The controls that matter most are ordinary and well supported by evidence. They are your total intake, the quality and variety of your food, your muscle, your movement, your sleep, your clinical risk and the persons around you. Food is chemistry, culture and pleasure. It does not measure your character, and your body does not judge you. Trust the biological engineering. Ignore the noise. Eat the biryani.'
      }
    }
  },
  modelLimits: [
    'A strong system can still be damaged. Allergy, intolerance, infection, a toxic dose, an interaction with a medicine, and disease can each make an ordinary exposure very important for a particular person.',
    'This closing argument applies to universal food rules that have no importance. It does not apply to medical advice for one person, and it does not apply to a true hazard that depends on the dose.'
  ],

};
