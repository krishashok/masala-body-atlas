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
  sub:   { plain:"What you can't digest, they can",
           tech :'Vessel B-04 · staffed by trillions, managed by nobody' },

  drawing: { no:'MB-STN-04', rev:'A', vessel:'B-04',
             desc:'Anaerobic fermenter', view:'Anterior view' },

  /* Markers and drawing labels. The prose lives once, in main.*.points. */
  hotspots: [
    { k:'feed', n:1, plain:{ name:'The Leftovers Inlet', fn:"What you couldn't digest" },
                tech :{ name:'Feed inlet', fn:'Caecum · unavailable substrate' } },
    { k:'dewater', n:2, plain:{ name:'The Drying Section', fn:'Reclaims about 1.5 litres a day' },
                   tech :{ name:'Water recovery', fn:'Colon wall · ~1.5 L/day' } },
    { k:'workforce', n:3, plain:{ name:'The Workforce', fn:'Several hundred species' },
                     tech :{ name:'Microbial consortium', fn:'~10¹³ cells · ~200 g' } },
    { k:'offtake', n:4, plain:{ name:'The Useful Output', fn:'Acids the wall itself burns' },
                   tech :{ name:'Product offtake', fn:'SCFAs · butyrate, propionate, acetate' } },
    { k:'vent', n:5, plain:{ name:'The Gas Vent', fn:'Half a litre to two litres a day' },
                tech :{ name:'Gas handling', fn:'0.5–2 L/day · odourless in bulk' } }
  ],

  modes: [
    { k:'ferment', label:{ plain:'Fermenting', tech:'Fermentation' }, fault:false,
      cap:{ plain:'<b>Fermenting.</b> The residents work on everything you could not. This is the default state, and it runs for twelve to forty-eight hours — the longest stay of any stage.',
            tech :'<b>Fermentation.</b> Anaerobic breakdown of unavailable substrate by the resident consortium. Residence time 12–48 h, the longest of any stage.' } },

    { k:'water', label:{ plain:'Water recovery', tech:'Dewatering' }, fault:false,
      cap:{ plain:'<b>Water recovery.</b> About a litre and a half of water is pulled back through the wall each day, and the contents thicken as they travel.',
            tech :'<b>Dewatering.</b> ~1.5 L/day of water and electrolyte recovered across the wall; solids fraction rises along the run.' } },

    { k:'gas', label:{ plain:'Gas', tech:'Gas offtake' }, fault:false,
      cap:{ plain:'<b>Gas.</b> Fermentation makes gas, half a litre to two litres a day, and in bulk it has no smell at all. This is the reactor working, not the reactor failing.',
            tech :'<b>Gas offtake.</b> 0.5–2 L/day of hydrogen, carbon dioxide and methane. Odourless in bulk. An output, not a fault condition.' } },

    { k:'fast', label:{ plain:'Running too fast', tech:'Throughput high' }, fault:true,
      cap:{ plain:'<b>Running too fast.</b> Fast transit can leave less time for water recovery, so the discharge stays wet. It is one common route to diarrhoea, not the only one.',
            tech :'<b>Throughput high.</b> Short residence can reduce net water recovery. Other diarrhoeal mechanisms can increase secretion or impair absorption even without unusually fast transit.' } },

    { k:'slow', label:{ plain:'Running too slow', tech:'Throughput low' }, fault:true,
      cap:{ plain:'<b>Running too slow.</b> Longer residence usually means more water is reclaimed, which can leave harder stool. Constipation is broader than transit time alone, but the rate effect is real.',
            tech :'<b>Throughput low.</b> Extended residence generally increases net water recovery and stool hardness. Constipation can also reflect evacuation and medication effects.' } }
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
  <text class="dimtext plainonly" x="355" y="316" text-anchor="middle" opacity=".8">Tens of trillions of them. Several hundred kinds.</text>
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
    <text class="dimtext" x="384" y="110" style="fill:var(--steel)">0.5–2 L/day · odourless</text>
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
    <text class="stamptext" x="671" y="678" text-anchor="middle" opacity=".8">Nobody drives this</text>
  </g>

  <!-- myth annotation -->
  <g class="mythonly">
    <circle class="hazard" cx="355" cy="216" r="34"/>
    <path class="scribble" d="M335 202 L375 230 M375 202 L335 230"/>
    <path class="leader" d="M355 250 L440 380 L456 380" style="stroke:var(--chilli)" />
    <text class="hazardtext" x="355" y="416" text-anchor="middle">"A probiotic will fix this"</text>
    <text class="hazardtext" x="355" y="432" text-anchor="middle" opacity=".75">— an established ecosystem resists invasion</text>
  </g>

  <!-- ================= HOTSPOTS ================= -->
  <g class="hot" data-k="feed" role="button" tabindex="0" aria-label="The leftovers inlet">
    <path class="leader" d="M126 634 L80 664 L66 664"/>
    <text class="lbl-name techonly"  x="60" y="661" text-anchor="end">Feed inlet</text>
    <text class="lbl-name plainonly" x="60" y="661" text-anchor="end">The Leftovers Inlet</text>
    <text class="lbl-fn techonly"    x="60" y="675" text-anchor="end">Caecum · unavailable substrate</text>
    <text class="lbl-fn plainonly"   x="60" y="676" text-anchor="end">What you couldn't digest</text>
    <circle class="hotring" cx="126" cy="634" r="10"/>
    <circle class="hithalo" cx="126" cy="634" r="22"/>
    <circle class="hotdot" cx="126" cy="634" r="10"/>
    <text class="hotnum" x="126" y="634">1</text>
  </g>

  <g class="hot" data-k="dewater" role="button" tabindex="0" aria-label="The drying section">
    <path class="leader" d="M150 410 L86 400 L66 400"/>
    <text class="lbl-name techonly"  x="60" y="397" text-anchor="end">Water recovery</text>
    <text class="lbl-name plainonly" x="60" y="397" text-anchor="end">The Drying Section</text>
    <text class="lbl-fn techonly"    x="60" y="411" text-anchor="end">Colon wall · ~1.5 L/day</text>
    <text class="lbl-fn plainonly"   x="60" y="412" text-anchor="end">Reclaims ~1.5 litres a day</text>
    <circle class="hotring" cx="150" cy="410" r="10"/>
    <circle class="hithalo" cx="150" cy="410" r="22"/>
    <circle class="hotdot" cx="150" cy="410" r="10"/>
    <text class="hotnum" x="150" y="410">2</text>
  </g>

  <g class="hot" data-k="workforce" role="button" tabindex="0" aria-label="The workforce">
    <path class="leader" d="M352 216 L420 150 L470 150"/>
    <text class="lbl-name techonly"  x="476" y="147">Microbial consortium</text>
    <text class="lbl-name plainonly" x="476" y="147">The Workforce</text>
    <text class="lbl-fn techonly"    x="476" y="161">~10¹³ cells · ~200 g</text>
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
    <text class="lbl-fn techonly"    x="612" y="367">SCFAs · butyrate first</text>
    <text class="lbl-fn plainonly"   x="612" y="368">Acids the wall burns</text>
    <circle class="hotring" cx="560" cy="390" r="10"/>
    <circle class="hithalo" cx="560" cy="390" r="22"/>
    <circle class="hotdot" cx="560" cy="390" r="10"/>
    <text class="hotnum" x="560" y="390">4</text>
  </g>

  <g class="hot" data-k="vent" role="button" tabindex="0" aria-label="The gas vent">
    <path class="leader" d="M370 138 L440 82 L470 82"/>
    <text class="lbl-name techonly"  x="476" y="79">Gas handling</text>
    <text class="lbl-name plainonly" x="476" y="79">The Gas Vent</text>
    <text class="lbl-fn techonly"    x="476" y="93">0.5–2 L/day · odourless</text>
    <text class="lbl-fn plainonly"   x="476" y="94">Half a litre to two a day</text>
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
      kicker: 'The short version',
      points: [
        { h:'It is a habitat, not a machine.', p:'You cannot command individual species. Diet, medicines, transit and the rest of the host environment change the conditions they live in.' },
        { k:'feed', h:'They eat what you cannot.',
          p:"What arrives here is everything your own enzymes could not take apart: fibre, resistant starch, and whatever was bound too tightly to release. Useless to you. Raw material to the residents." },
        { k:'dewater', h:'It is also a dewatering plant.',
          p:'This is a dewatering plant. Around a litre and a half of water is reclaimed each day, along with salts. Transit speed strongly affects the result, but secretion, inflammation, medicines and other factors can also make stools too wet or too dry.' },
        { k:'workforce', h:'The Workforce',
          p:'Several hundred species, tens of trillions of cells, a couple of hundred grams in total. They ferment what you cannot digest and produce useful acids as a by-product. You do not employ them; you feed them.' },
        { k:'offtake', h:'The trade is real.',
          p:'Butyrate, propionate, acetate. Butyrate is the preferred fuel of the colon lining itself — the cells here are partly fed by their own tenants. That is the clearest evidence the relationship is a trade, not an infestation.' },
        { k:'vent', h:'Gas means it is working.',
          p:'Fermentation makes gas — mostly hydrogen, carbon dioxide and methane, all of it odourless. Gas is a sign the reactor is working, which is an uncomfortable thing to be told and true anyway.' }
      ],
      note: '<b>The useful rule.</b> You do not micromanage this ecosystem. You change its habitat. A varied, fibre-rich diet is one useful input, but medicines, illness, transit, age and the host matter too. That is less marketable than a sachet promising to “fix the gut”.'
    },
    tech: {
      kicker: 'Equipment Datasheet',
      spec: [
        { k:'Class',            v:'Anaerobic fermentation vessel with integrated dewatering' },
        { k:'Duty',             v:'Fermentation of unavailable substrate · water and electrolyte recovery · storage' },
        { k:'Length',           v:'~1.5 m' },
        { k:'Residence time',   v:'<em>12–48 h</em> — the longest of any stage' },
        { k:'Population',       v:'~10¹³ cells, several hundred species' },
        { k:'Workforce mass',   v:'~200 g' },
        { k:'Water reclaimed',  v:'~1.5 L/day' },
        { k:'Principal products', v:'Butyrate, propionate, acetate' },
        { k:'Gas production',   v:'0.5–2 L/day, odourless in bulk' },
        { k:'Control system',   v:'<em>Not fitted.</em> Ecological, not mechanical.' }
      ],
      points: [
        { k:'feed', h:'Feed inlet',
          p:'What arrives here is everything your own enzymes could not take apart: fibre, resistant starch, some of what was bound too tightly to release. Useless to you. Raw material to the residents.' },
        { k:'dewater', h:'Water recovery',
          p:'Around 1.5 litres of water reclaimed per day, along with sodium and other electrolytes. Transit time changes how much water can be recovered, but diarrhoea and constipation also have secretory, inflammatory, medication-related and other mechanisms.' },
        { k:'workforce', h:'Microbial consortium',
          p:'Several hundred species, tens of trillions of cells, a couple of hundred grams in total. They ferment what you cannot digest and produce short-chain fatty acids as a by-product.' },
        { k:'offtake', h:'Product offtake',
          p:'Butyrate, propionate, acetate. Butyrate is the preferred fuel of the colon lining itself — the cells here are partly fed by their own tenants. This is the clearest evidence that the relationship is a trade, not an infestation.' },
        { k:'vent', h:'Gas handling',
          p:'Fermentation produces gas: 0.5–2 L/day, mostly hydrogen, carbon dioxide and methane, all odourless. Gas is an indication that the vessel is operating, not that it is faulty.' }
      ],
      note: '<b>Design note.</b> This is an ecosystem, not a programmable unit. Diet changes available substrate, but drugs, transit time, host physiology and prior ecology also shape the community; no single diversity score is a universal health gauge.',
      analogy: {
        tag: 'Process analogue',
        body: 'An anaerobic digester at a sewage treatment works. Not as an insult — as literal process chemistry. Both are sealed, oxygen-free vessels where mixed microbial populations break down material that nothing else can use, producing gas and useful organic acids. Engineers who run digesters will tell you the same thing gastroenterologists will: you do not control the population directly. You control what goes in, and the ecosystem settles.'
      }
    }
  },

  modelLimits: [
    'Microbiomes vary enormously between healthy people. A single “diversity” number is not a universal health score.',
    'Transit time strongly affects stool water, but diarrhoea and constipation also have secretory, inflammatory, medication-related and evacuation mechanisms.'
  ],

  myth: {
    claim: 'Take this probiotic to fix your gut health.',
    mechanism: [
      'Many probiotic strains are temporary visitors rather than permanent settlers. That does not make them inert: a transient organism can still change local chemistry or interact with the host while it passes through. “Repopulate your gut” is the overclaim.',
      'This is not a blanket dismissal. Probiotic effects are strain- and indication-specific; some preparations reduce antibiotic-associated diarrhoea in settings where baseline risk is meaningful. That is a named strain or combination, a dose and an indication — very different from a sachet labelled “gut health”.',
      'Substrate is one of the clearest levers you do have. Varied, fibre-rich plant foods provide different fermentable substrates and can shift microbial activity and composition. That is a much more defensible general recommendation than a generic product claiming to “fix” everybody&rsquo;s microbiome.'
    ],
    whySurvives: 'Because "your gut" became a marketing category before it became a settled science, and a category that vague can absorb any claim. Also because the honest advice — eat a wider range of plants — cannot be packaged, priced, or patented.'
  }
};
