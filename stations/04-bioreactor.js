/* ============================================================
   STATION 04 — THE BIOREACTOR (large intestine)
   Anterior view (§D0). The loop runs the way it runs in the body:
   caecum and ascending limb on the viewer's LEFT (the patient's
   right), transverse across the top, descending limb on the
   viewer's RIGHT, sigmoid back to the midline.
   ============================================================ */

const COLON = 'M150 612 L150 252 Q150 212 190 212 L520 212 Q560 212 560 252 L560 500 Q560 562 502 594 L426 632 L426 700';

export default {
  id: 'bioreactor', no: '04', section: 'Digestive Train',

  rail:  { plain:'Gut Microbes',     tech:'Bioreactor' },
  title: { plain:'The Gut Microbes', tech:'The Bioreactor' },
  sub:   { plain:'The microbes digest what you cannot digest.',
           tech :'Vessel B-04 · trillions of cells operate it · no operator manages them' },

  drawing: { no:'MB-STN-04', rev:'A', vessel:'B-04',
             desc:'Anaerobic fermenter', view:'Anterior view' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'feed', n:1, plain:{ name:'The Leftovers Inlet', fn:'The material that you could not digest' },
                tech :{ name:'Feed inlet', fn:'Caecum · substrate you cannot use' } },
    { k:'dewater', n:2, plain:{ name:'The Drying Section', fn:'It recovers about 1.5 litres a day' },
                   tech :{ name:'Water recovery', fn:'Colon wall · about 1.5 L a day' } },
    { k:'workforce', n:3, plain:{ name:'The Workforce', fn:'Several hundred species' },
                     tech :{ name:'Microbial consortium', fn:'About 10¹³ cells · about 200 g' } },
    { k:'offtake', n:4, plain:{ name:'The Useful Output', fn:'Acids that the wall uses as fuel' },
                   tech :{ name:'Product offtake', fn:'Butyrate, propionate and acetate' } },
    { k:'vent', n:5, plain:{ name:'The Gas Vent', fn:'Half a litre to two litres a day' },
                tech :{ name:'Gas handling', fn:'0.5 to 2 L a day · it has no smell' } }
  ],

  modes: [
    { k:'ferment', label:{ plain:'Fermenting', tech:'Fermentation' }, fault:false,
      cap:{ plain:'<b>Fermenting.</b> The microbes work on all the material that you could not digest. This is the usual condition. It continues for twelve to forty-eight hours. This is the longest time in any stage.',
            tech :'<b>Fermentation.</b> The resident microbes break down the substrate that you cannot use. They do this without oxygen. The material stays here for 12 to 48 hours. This is the longest time in any stage.' } },

    { k:'water', label:{ plain:'Water recovery', tech:'Dewatering' }, fault:false,
      cap:{ plain:'<b>Water recovery.</b> The wall recovers about one and a half litres of water each day. The contents become thicker as they move along the tube.',
            tech :'<b>Dewatering.</b> The wall recovers about 1.5 L of water and the electrolytes each day. The quantity of solid material increases along the length of the tube.' } },

    { k:'gas', label:{ plain:'Gas', tech:'Gas offtake' }, fault:false,
      cap:{ plain:'<b>Gas.</b> Fermentation makes half a litre to two litres of gas each day. The gas has no smell. It shows that the reactor operates correctly.',
            tech :'<b>Gas offtake.</b> The vessel makes 0.5 to 2 L of hydrogen, carbon dioxide and methane each day. The gas has no smell. It is a normal product of the process.' } },

    { k:'fast', label:{ plain:'Running too fast', tech:'Throughput high' }, fault:true,
      cap:{ plain:'<b>Running too fast.</b> The material moves quickly, so the wall has less time to recover the water. The discharge stays wet. This is one common cause of diarrhoea. There are other causes.',
            tech :'<b>Throughput high.</b> A short time in the vessel reduces the quantity of water that the wall recovers. Other mechanisms also cause diarrhoea. They increase the secretion, or they reduce the absorption, at a normal speed.' } },

    { k:'slow', label:{ plain:'Running too slow', tech:'Throughput low' }, fault:true,
      cap:{ plain:'<b>Running too slow.</b> A long time in the vessel lets the wall recover more water, and the stool becomes harder. The speed is one true cause of constipation. It is not the only cause.',
            tech :'<b>Throughput low.</b> A long time in the vessel usually increases the water that the wall recovers, and the stool becomes harder. Medicines and the mechanics of evacuation can also cause constipation.' } }
  ],

  svg: `<svg viewBox="-90 0 850 800" preserveAspectRatio="xMidYMid meet" role="img"
        aria-label="The large intestine drawn as an anaerobic fermentation vessel, anterior view">
  <title>The large intestine drawn as an anaerobic fermentation vessel, anterior view</title>
  <defs>
    <marker id="arw04" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0 0 L7 3.5 L0 7 Z" fill="rgba(237,228,208,.34)"/>
    </marker>
  </defs>

  <g class="techonly">
    <line class="dimline" x1="96" y1="252" x2="96" y2="612" marker-start="url(#arw04)" marker-end="url(#arw04)"/>
    <line class="dimline" x1="96" y1="252" x2="126" y2="252"/>
    <line class="dimline" x1="96" y1="612" x2="126" y2="612"/>
    <text class="dimtext" x="90" y="340" text-anchor="end">≈ 1.5 m</text>
  </g>

  <!-- gas offtake riser -->
  <path class="pipe" d="M340 212 L370 212 L370 120 L340 120 Z"/>
  <path class="vessel-inner techonly" d="M355 128 L355 204"/>

  <!-- the vessel -->
  <path class="run wide wall" d="${COLON}"/>
  <path class="run wide bore" d="${COLON}"/>
  <path class="run wide tint" d="${COLON}"/>
  <path class="run wide gloss" d="${COLON}"/>

  <!-- caecum: the receiving pouch -->
  <ellipse class="vessel" cx="150" cy="626" rx="34" ry="26"/>

  <!-- the workforce: a population, not a fluid -->
  <g class="mechonly">
    <circle class="biota" cx="142" cy="580" r="3.2"/><circle class="biota" cx="158" cy="556" r="2.6" style="animation-delay:-.6s"/>
    <circle class="biota" cx="146" cy="530" r="3"   style="animation-delay:-1.2s"/><circle class="biota" cx="157" cy="504" r="2.4" style="animation-delay:-1.8s"/>
    <circle class="biota" cx="141" cy="478" r="3.2" style="animation-delay:-2.4s"/><circle class="biota" cx="155" cy="452" r="2.6" style="animation-delay:-3s"/>
    <circle class="biota" cx="148" cy="426" r="3"   style="animation-delay:-3.6s"/><circle class="biota" cx="158" cy="400" r="2.4" style="animation-delay:-.3s"/>
    <circle class="biota" cx="142" cy="374" r="3.2" style="animation-delay:-.9s"/><circle class="biota" cx="153" cy="348" r="2.6" style="animation-delay:-1.5s"/>
    <circle class="biota" cx="146" cy="322" r="3"   style="animation-delay:-2.1s"/><circle class="biota" cx="156" cy="296" r="2.4" style="animation-delay:-2.7s"/>
    <circle class="biota" cx="150" cy="270" r="3.2" style="animation-delay:-3.3s"/>
    <circle class="biota" cx="204" cy="204" r="2.6" style="animation-delay:-.4s"/><circle class="biota" cx="228" cy="220" r="3" style="animation-delay:-1s"/>
    <circle class="biota" cx="252" cy="206" r="2.4" style="animation-delay:-1.6s"/><circle class="biota" cx="276" cy="218" r="3.2" style="animation-delay:-2.2s"/>
    <circle class="biota" cx="300" cy="204" r="2.6" style="animation-delay:-2.8s"/><circle class="biota" cx="324" cy="220" r="3" style="animation-delay:-3.4s"/>
    <circle class="biota" cx="392" cy="206" r="2.4" style="animation-delay:-.7s"/><circle class="biota" cx="416" cy="218" r="3.2" style="animation-delay:-1.3s"/>
    <circle class="biota" cx="440" cy="204" r="2.6" style="animation-delay:-1.9s"/><circle class="biota" cx="464" cy="218" r="3" style="animation-delay:-2.5s"/>
    <circle class="biota" cx="488" cy="206" r="2.4" style="animation-delay:-3.1s"/><circle class="biota" cx="512" cy="216" r="3.2" style="animation-delay:-3.7s"/>
    <circle class="biota" cx="552" cy="264" r="2.6" style="animation-delay:-.5s"/><circle class="biota" cx="566" cy="290" r="3" style="animation-delay:-1.1s"/>
    <circle class="biota" cx="553" cy="316" r="2.4" style="animation-delay:-1.7s"/><circle class="biota" cx="567" cy="342" r="3.2" style="animation-delay:-2.3s"/>
    <circle class="biota" cx="552" cy="368" r="2.6" style="animation-delay:-2.9s"/><circle class="biota" cx="566" cy="394" r="3" style="animation-delay:-3.5s"/>
    <circle class="biota" cx="554" cy="420" r="2.4" style="animation-delay:-.2s"/><circle class="biota" cx="567" cy="446" r="3.2" style="animation-delay:-.8s"/>
    <circle class="biota" cx="552" cy="472" r="2.6" style="animation-delay:-1.4s"/><circle class="biota" cx="546" cy="518" r="3" style="animation-delay:-2s"/>
    <circle class="biota" cx="522" cy="556" r="2.4" style="animation-delay:-2.6s"/><circle class="biota" cx="486" cy="590" r="3.2" style="animation-delay:-3.2s"/>
    <circle class="biota" cx="452" cy="612" r="2.6" style="animation-delay:-3.8s"/>
  </g>

  <text class="dimtext techonly"  x="355" y="316" text-anchor="middle" opacity=".8">POPULATION ~10¹³ · SEVERAL HUNDRED SPECIES</text>
  <text class="dimtext plainonly" x="355" y="316" text-anchor="middle" opacity=".8">Tens of trillions of cells. Several hundred species.</text>
  <text class="dimtext techonly"  x="355" y="338" text-anchor="middle" opacity=".55">WORKFORCE MASS ~200 g</text>
  <text class="dimtext plainonly" x="355" y="338" text-anchor="middle" opacity=".55">About 200 grams in total</text>

  <!-- ===== fermentation ===== -->
  <g class="anim a-ferment"><path class="flowline" d="${COLON}"/></g>

  <!-- ===== dewatering ===== -->
  <g class="anim a-water">
    <circle class="drip" cx="128" cy="520" r="4"   style="--dx:-42px;--dy:-8px"/>
    <circle class="drip" cx="128" cy="400" r="3.4" style="--dx:-44px;--dy:6px;animation-delay:-.8s"/>
    <circle class="drip" cx="300" cy="190" r="3.6" style="--dx:6px;--dy:-44px;animation-delay:-1.6s"/>
    <circle class="drip" cx="582" cy="420" r="3.4" style="--dx:44px;--dy:-6px;animation-delay:-.4s"/>
    <text class="dimtext" x="70" y="470" text-anchor="end" style="fill:var(--steel)">≈ 1.5 L/day reclaimed</text>
  </g>

  <!-- ===== gas offtake ===== -->
  <g class="anim a-gas">
    <circle class="drip" cx="355" cy="200" r="6"   style="--dx:0px;--dy:-76px"/>
    <circle class="drip" cx="349" cy="200" r="4.5" style="--dx:4px;--dy:-80px;animation-delay:-.8s"/>
    <circle class="drip" cx="361" cy="200" r="5"   style="--dx:-4px;--dy:-72px;animation-delay:-1.5s"/>
    <text class="dimtext" x="384" y="110" style="fill:var(--steel)">0.5–2 L a day · no smell</text>
  </g>

  <!-- ===== throughput faults ===== -->
  <g class="anim a-fast">
    <path class="flowline" d="${COLON}" style="animation-duration:.55s; stroke:var(--chilli)" />
    <circle class="faultmark" cx="426" cy="654" r="26"/>
    <path class="leader" d="M400 654 L300 700 L286 700" style="stroke:var(--chilli)" />
    <text class="faulttext" x="280" y="697" text-anchor="end">Residence too short</text>
    <text class="faulttext" x="280" y="711" text-anchor="end" opacity=".75">Water not reclaimed</text>
  </g>
  <g class="anim a-slow">
    <path class="flowline" d="${COLON}" style="animation-duration:4.4s; stroke:var(--chilli)" />
    <circle class="faultmark" cx="426" cy="654" r="26"/>
    <path class="leader" d="M400 654 L300 700 L286 700" style="stroke:var(--chilli)" />
    <text class="faulttext" x="280" y="697" text-anchor="end">Residence too long</text>
    <text class="faulttext" x="280" y="711" text-anchor="end" opacity=".75">Water over-reclaimed</text>
  </g>

  <!-- instrument (Nerd Mode only) -->
  <g class="techonly" transform="translate(660,540)">
    <circle cx="0" cy="0" r="44" fill="none" stroke="var(--line-dim)" stroke-width="1"/>
    <circle cx="0" cy="0" r="38" fill="none" stroke="var(--line-faint)" stroke-width="1"/>
    <path d="M-30 12 A34 34 0 0 1 30 12" fill="none" stroke="var(--cardamom)" stroke-width="2.5" opacity=".55"/>
    <line class="needle" x1="0" y1="12" x2="-8" y2="-20" style="stroke:var(--cardamom)" />
    <circle cx="0" cy="12" r="3" fill="var(--line)"/>
    <text class="dimtext" x="0" y="34" text-anchor="middle">12 – 48 h</text>
    <text class="dimtext" x="0" y="-30" text-anchor="middle" opacity=".6">TI-404</text>
  </g>

  <!-- the control panel this vessel does not have -->
  <g class="techonly">
    <rect class="stamp" x="596" y="638" width="150" height="54"/>
    <text class="stamptext" x="671" y="662" text-anchor="middle">Control panel</text>
    <text class="stamptext" x="671" y="678" text-anchor="middle" opacity=".8">Not fitted</text>
  </g>
  <g class="plainonly">
    <rect class="stamp" x="596" y="638" width="150" height="54"/>
    <text class="stamptext" x="671" y="662" text-anchor="middle">No control panel</text>
    <text class="stamptext" x="671" y="678" text-anchor="middle" opacity=".8">No operator drives this</text>
  </g>

  <!-- myth annotation -->
  <g class="mythonly">
    <circle class="hazard" cx="355" cy="216" r="34"/>
    <path class="scribble" d="M335 202 L375 230 M375 202 L335 230"/>
    <path class="leader" d="M355 250 L440 380 L456 380" style="stroke:var(--chilli)" />
    <text class="hazardtext" x="355" y="416" text-anchor="middle">"A probiotic will fix this"</text>
    <text class="hazardtext" x="355" y="432" text-anchor="middle" opacity=".75">an established ecosystem resists invasion</text>
  </g>

  <!-- ================= HOTSPOTS ================= -->
  <g class="hot" data-k="feed" role="button" tabindex="0" aria-label="The leftovers inlet">
    <path class="leader" d="M126 634 L80 664 L66 664"/>
    <text class="lbl-name techonly"  x="60" y="661" text-anchor="end">Feed inlet</text>
    <text class="lbl-name plainonly" x="60" y="661" text-anchor="end">The Leftovers Inlet</text>
    <text class="lbl-fn techonly"    x="60" y="675" text-anchor="end">Caecum · substrate you cannot use</text>
    <text class="lbl-fn plainonly"   x="60" y="676" text-anchor="end">What you could not digest</text>
    <circle class="hotring" cx="126" cy="634" r="10"/>
    <circle class="hithalo" cx="126" cy="634" r="22"/>
    <circle class="hotdot" cx="126" cy="634" r="10"/>
    <text class="hotnum" x="126" y="634">1</text>
  </g>

  <g class="hot" data-k="dewater" role="button" tabindex="0" aria-label="The drying section">
    <path class="leader" d="M150 410 L86 400 L66 400"/>
    <text class="lbl-name techonly"  x="60" y="397" text-anchor="end">Water recovery</text>
    <text class="lbl-name plainonly" x="60" y="397" text-anchor="end">The Drying Section</text>
    <text class="lbl-fn techonly"    x="60" y="411" text-anchor="end">Colon wall · about 1.5 L a day</text>
    <text class="lbl-fn plainonly"   x="60" y="412" text-anchor="end">Recovers about 1.5 litres a day</text>
    <circle class="hotring" cx="150" cy="410" r="10"/>
    <circle class="hithalo" cx="150" cy="410" r="22"/>
    <circle class="hotdot" cx="150" cy="410" r="10"/>
    <text class="hotnum" x="150" y="410">2</text>
  </g>

  <g class="hot" data-k="workforce" role="button" tabindex="0" aria-label="The workforce">
    <path class="leader" d="M352 216 L420 150 L470 150"/>
    <text class="lbl-name techonly"  x="476" y="147">Microbial consortium</text>
    <text class="lbl-name plainonly" x="476" y="147">The Workforce</text>
    <text class="lbl-fn techonly"    x="476" y="161">About 10¹³ cells · about 200 g</text>
    <text class="lbl-fn plainonly"   x="476" y="162">Several hundred species</text>
    <circle class="hotring" cx="352" cy="216" r="10"/>
    <circle class="hithalo" cx="352" cy="216" r="22"/>
    <circle class="hotdot" cx="352" cy="216" r="10"/>
    <text class="hotnum" x="352" y="216">3</text>
  </g>

  <g class="hot" data-k="offtake" role="button" tabindex="0" aria-label="The useful output">
    <path class="leader" d="M560 390 L594 356 L606 356"/>
    <text class="lbl-name techonly"  x="612" y="353">Product offtake</text>
    <text class="lbl-name plainonly" x="612" y="353">The Useful Output</text>
    <text class="lbl-fn techonly"    x="612" y="367">Butyrate, propionate, acetate</text>
    <text class="lbl-fn plainonly"   x="612" y="368">Acids the wall uses as fuel</text>
    <circle class="hotring" cx="560" cy="390" r="10"/>
    <circle class="hithalo" cx="560" cy="390" r="22"/>
    <circle class="hotdot" cx="560" cy="390" r="10"/>
    <text class="hotnum" x="560" y="390">4</text>
  </g>

  <g class="hot" data-k="vent" role="button" tabindex="0" aria-label="The gas vent">
    <path class="leader" d="M370 138 L440 82 L470 82"/>
    <text class="lbl-name techonly"  x="476" y="79">Gas handling</text>
    <text class="lbl-name plainonly" x="476" y="79">The Gas Vent</text>
    <text class="lbl-fn techonly"    x="476" y="93">0.5–2 L a day · no smell</text>
    <text class="lbl-fn plainonly"   x="476" y="94">Half a litre to two litres a day</text>
    <circle class="hotring" cx="370" cy="138" r="10"/>
    <circle class="hithalo" cx="370" cy="138" r="22"/>
    <circle class="hotdot" cx="370" cy="138" r="10"/>
    <text class="hotnum" x="370" y="138">5</text>
  </g>

  <text class="dimtext techonly"  x="-84" y="600">FEED — Station 03 residue ▶</text>
  <text class="dimtext plainonly" x="-84" y="600">What's left over, from before ▶</text>
  <text class="dimtext techonly"  x="426" y="734" text-anchor="middle">▼ DISCHARGE — end of line</text>
  <text class="dimtext plainonly" x="426" y="734" text-anchor="middle">▼ Out</text>
</svg>`,

  main: {
    plain: {
      kicker: 'Summary',
      points: [
        { h:'This vessel holds a habitat.', p:'You cannot give an instruction to one species. Your food, your medicines, the speed of the material and the condition of your body all change the environment in which the microbes live.' },
        { k:'feed', h:'The microbes eat what you cannot eat.',
          p:'The material that arrives here is the material that your own enzymes could not divide. It is fibre, resistant starch, and material that was held too tightly to release. You cannot use it. The microbes use it as raw material.' },
        { k:'dewater', h:'The vessel also removes water.',
          p:'The wall recovers about one and a half litres of water each day, and it recovers the salts. The speed of the material has a large effect on the result. Secretion, inflammation and medicines can also make the stool too wet or too dry.' },
        { k:'workforce', h:'The Workforce',
          p:'Several hundred species live here. There are tens of trillions of cells, and they weigh about two hundred grams. They ferment the material that you cannot digest, and they make useful acids. You do not employ them. You feed them.' },
        { k:'offtake', h:'You and the microbes exchange materials.',
          p:'The microbes make butyrate, propionate and acetate. The lining of the colon uses butyrate as its preferred fuel. The microbes thus feed the cells that hold them. This is the clearest evidence of an exchange.' },
        { k:'vent', h:'Gas shows that the vessel operates.',
          p:'Fermentation makes hydrogen, carbon dioxide and methane. None of these gases has a smell. The gas shows that the reactor operates correctly.' }
      ],
      note: '<b>Summary.</b> You cannot control this ecosystem in detail. You can change its habitat. A varied diet that contains much fibre is one useful input. Medicines, illness, the speed of the material, your age and your own body also change the result. This is more difficult to sell than a packet that promises to correct your gut.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',            v:'A fermentation vessel that operates without oxygen. It also removes water.' },
        { k:'Duty',             v:'It ferments the substrate that you cannot use. It recovers water and electrolytes. It stores the residue.' },
        { k:'Length',           v:'~1.5 m' },
        { k:'Residence time',   v:'<em>12 to 48 h</em>. This is the longest time in any stage.' },
        { k:'Population',       v:'About 10¹³ cells. Several hundred species.' },
        { k:'Workforce mass',   v:'About 200 g' },
        { k:'Water reclaimed',  v:'About 1.5 L each day' },
        { k:'Principal products', v:'Butyrate, propionate, acetate' },
        { k:'Gas production',   v:'0.5 to 2 L each day. The gas has no smell.' },
        { k:'Control system',   v:'<em>Not fitted.</em> The controls are ecological.' }
      ],
      points: [
        { k:'feed', h:'Feed inlet',
          p:'The material that arrives here is the material that your own enzymes could not divide. It is fibre, resistant starch, and material that was held too tightly to release. You cannot use it. The microbes use it as raw material.' },
        { k:'dewater', h:'Water recovery',
          p:'The wall recovers about 1.5 litres of water each day. It also recovers sodium and other electrolytes. The time in the vessel changes the quantity of water that the wall can recover. Secretion, inflammation and medicines also cause diarrhoea and constipation.' },
        { k:'workforce', h:'Microbial consortium',
          p:'Several hundred species live here. There are tens of trillions of cells, and they weigh about two hundred grams. They ferment the material that you cannot digest, and they make short-chain fatty acids.' },
        { k:'offtake', h:'Product offtake',
          p:'The microbes make butyrate, propionate and acetate. The lining of the colon uses butyrate as its preferred fuel. The microbes thus feed the cells that hold them. This is the clearest evidence of an exchange.' },
        { k:'vent', h:'Gas handling',
          p:'Fermentation makes 0.5 to 2 L of gas each day. The gas is mostly hydrogen, carbon dioxide and methane, and none of these has a smell. The gas shows that the vessel operates correctly.' }
      ],
      note: '<b>Design note.</b> This vessel holds an ecosystem. You cannot program it. Your food changes the available substrate. Medicines, the speed of the material, your own physiology and the previous ecology also change the community. No single measurement of diversity gives a universal indication of health.',
      analogy: {
        tag: 'Process analogue',
        body: 'An anaerobic digester at a sewage treatment plant. This is a comparison of the process chemistry. Both are closed vessels that contain no oxygen. In both, mixed populations of microbes break down material that nothing else can use. Both make gas and useful organic acids. The engineers who operate digesters give the same statement as the doctors: you do not control the population directly. You control the material that goes in, and the ecosystem then finds its own balance.'
      }
    }
  },

  modelLimits: [
    'The microbial population differs greatly between healthy persons. One measurement of diversity does not give a universal indication of health.',
    'The time in the vessel has a large effect on the water in the stool. Secretion, inflammation, medicines and the mechanics of evacuation also cause diarrhoea and constipation.'
  ],

  myth: {
    claim: 'Take this probiotic to fix your gut health.',
    mechanism: [
      'Many probiotic strains stay for a short time only. They do not become permanent residents. They are not inactive: an organism that passes through can change the local chemistry, and it can interact with your body. The claim to repopulate your gut is too strong.',
      'Some probiotics do work. The effect is specific to the strain and to the condition. Some preparations reduce the diarrhoea that antibiotics cause, when the risk is high. Such a product has a named strain, a dose and a stated condition. A packet labelled for gut health has none of these.',
      'The substrate is one control that you do have. Varied plant foods that contain much fibre supply different substrates for fermentation. They can change the activity and the composition of the microbes. This recommendation is much stronger than a general product that claims to correct the microbes of every person.'
    ],
    whySurvives: 'The words "your gut" became a marketing category before the science was settled. A category that is not specific can accept any claim. Also, the correct advice is to eat a wider range of plants. Nobody can put that in a packet, give it a price, or patent it.'
  }
};
