const byId = stations => Object.fromEntries(stations.map(s => [s.id, s]));

function swap(svg, from, to){
  if(!svg.includes(from)) console.warn('Editorial SVG replacement missed:', from.slice(0, 80));
  return svg.replace(from, to);
}

function gauge(x, y, tag, reading, needle){
  return `<g transform="translate(${x},${y})">
    <circle cx="0" cy="0" r="40" fill="none" stroke="var(--line-dim)" stroke-width="1"/>
    <circle cx="0" cy="0" r="34" fill="none" stroke="var(--line-faint)" stroke-width="1"/>
    <path d="M-27 11 A31 31 0 0 1 27 11" fill="none" stroke="var(--line-dim)" stroke-width="2.5" opacity=".45"/>
    <line x1="0" y1="11" x2="${needle[0]}" y2="${needle[1]}" stroke="var(--turmeric)" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="0" cy="11" r="2.6" fill="var(--line)"/>
    <text class="dimtext" x="0" y="31" text-anchor="middle">${reading}</text>
    <text class="dimtext" x="0" y="-26" text-anchor="middle" opacity=".6">${tag}</text>
  </g>`;
}

export default function applyEditorialPass(stations){
  const S = byId(stations);

  /* 00 — the plant: Simple is a mental model; Nerd is topology + control. */
  {
    const s = S.preface;
    s.sub.plain = 'Your body is a processing plant. It runs, adjusts and repairs itself without an operator.';
    s.modes = [
      { k:'running', label:{ plain:'Running', tech:'Continuous operation' }, fault:false,
        cap:{ plain:'<b>Running.</b> Digestion, circulation, storage, repair and control continue while you do something else. There is no master switch for you to operate.',
              tech :'<b>Continuous operation.</b> The digestive line, metabolic branch and control systems operate together. Local control loops work inside a larger neural and hormonal hierarchy.' } },
      { k:'postmeal', label:{ plain:'Just after a meal', tech:'Post-meal load' }, fault:false,
        cap:{ plain:'<b>Just after a meal.</b> Several parts become busy at once. Food is chewed, acidified, digested, absorbed and routed while older material is still moving farther down the gut.',
              tech :'<b>Post-meal load.</b> Mechanical processing, gastric mixing, intestinal digestion, absorption and fuel routing overlap in time. The system is parallel, not a single batch moving through one stage at a time.' } },
      { k:'overnight', label:{ plain:'Overnight', tech:'Fasted state' }, fault:false,
        cap:{ plain:'<b>Overnight.</b> No food arrives, but the body does not shut down. Stored fuel is released, blood chemistry is controlled, waste is filtered and tissues keep repairing themselves.',
              tech :'<b>Fasted state.</b> Gut input falls. Liver glucose output, fat release, renal control and tissue turnover continue. Different control loops shift the system into a new steady state.' } }
    ];
    s.main.plain = {
      kicker:'Summary',
      points:[
        { h:'No one runs this plant.', p:'Nerves, hormones and local feedback loops adjust it automatically. You do not tell the stomach when to mix or the kidneys how much water to keep.' },
        { h:'The input changes every day.', p:'Rice, idli, biryani, fruit, coffee and medicines all arrive with different chemistry. The body measures what arrives and responds.' },
        { h:'It repairs itself while it works.', p:'Cells are replaced continuously. The system does not wait for a maintenance shutdown.' },
        { h:'Several jobs happen at the same time.', p:'Digestion is not a row of eight machines taking turns. The gut, liver, kidneys, blood, fat and brain work together.' },
        { h:'The digestive tube is about five metres long in life.', p:'Most of it is folded into the abdomen. The exact length varies between people.' }
      ],
      note:'<b>Start here.</b> The useful question is not “Which food rule will protect this fragile system?” The useful question is “What does this system already handle every day?”'
    };
    s.main.tech = {
      kicker:'Facility Datasheet',
      spec:[
        { k:'Process line', v:'Mouth → stomach → small intestine → colon · about 5 m in life' },
        { k:'Metabolic branch', v:'Absorbed nutrients → liver / lymph → blood → tissues' },
        { k:'Control', v:'Distributed and hierarchical · local, neural, endocrine and central loops' },
        { k:'Feed', v:'Mixed composition · changes several times a day' },
        { k:'Absorptive surface', v:'About 30 m² in the small intestine' },
        { k:'Repair', v:'Continuous cell turnover while the system operates' },
        { k:'Operating state', v:'Continuous · fed, fasted, active, resting and ill states overlap' },
        { k:'Design constraint', v:'No single operator and no planned shutdown' }
      ],
      points:[
        { h:'Parallel operation', p:'The drawing is a map, not a literal series process. Material moves through the gut in sequence, but metabolic and control systems operate in parallel.' },
        { h:'Hierarchical control', p:'Local reflexes can act without the brain, while the nervous and endocrine systems coordinate the whole body. “No operator” means no conscious operator, not no central integration.' },
        { h:'Changing feedstock', p:'The system senses volume, acidity, osmolarity and nutrient signals. It changes secretion, motility, absorption and storage in response.' },
        { h:'Continuous maintenance', p:'Different tissues turn over at different rates. The important engineering point is that repair occurs while the system remains online.' }
      ],
      note:'<b>Design note.</b> An industrial plant normally needs a known feed, scheduled maintenance and an operator. Biology instead combines local autonomy, central coordination and continuous repair.',
      analogy:{ tag:'Engineering analogue', body:'A network of process units with local controllers and supervisory control. No single comparison is exact. The value of the plant metaphor is that it makes flows, feedback, storage and failure modes visible.' }
    };
    s.modelLimits = [
      'The body does have central integration. The brain and endocrine system coordinate many functions, while local circuits also control themselves.',
      'The stations are not eight machines in a literal series. The digestive tube is sequential, but circulation, metabolism and control operate in parallel.'
    ];
    s.myth = {
      claim:'Digestion is fragile. One wrong food combination or timing can confuse the system.',
      mechanism:[
        'A normal meal is already a complicated mixture of starch, protein, fat, fibre, water, salt and thousands of other molecules. The digestive system evolved to handle mixtures, not purified ingredients eaten one at a time.',
        'Real problems exist: allergy, intolerance, infection, toxins, disease and drug interactions. Those problems have a mechanism. “Do not mix these two ordinary foods” needs the same standard: what changes when the foods meet, and what evidence shows harm?',
        'Before you fear fish with curd, fruit after a meal or rice at night, look at the operating range of the system. It routinely changes pH by several orders of magnitude, sorts mixed nutrients, hosts trillions of microbes and keeps blood chemistry within narrow limits.'
      ],
      whySurvives:'A simple prohibition is easier to remember than a complicated mechanism. It also turns an ordinary meal into a test that you can pass or fail.'
    };
    s.svg = swap(s.svg,
      '<text class="hazardtext" x="250" y="596">"Surface area of a tennis court"</text>\n    <text class="hazardtext" x="250" y="616" opacity=".75">closer to half a badminton court</text>',
      '<text class="hazardtext" x="250" y="596">"One wrong food combination"</text>\n    <text class="hazardtext" x="250" y="616" opacity=".75">mixed meals are the normal input</text>');
  }

  /* 01 — mouth: the picture and text now teach an interlock, not one flap. */
  {
    const s = S.intake;
    s.sub.plain = 'It chews, wets and checks food, then moves it past the airway into the food pipe.';
    s.modes = [
      { k:'chew', label:{ plain:'Chewing', tech:'Mastication' }, fault:false,
        cap:{ plain:'<b>Chewing.</b> Teeth break food into smaller pieces. Saliva wets it and starts starch digestion. You stop when the food forms a swallowable lump.',
              tech :'<b>Mastication.</b> Teeth reduce particle size while saliva lubricates, buffers and adds amylase. Swallowing begins when sensory and motor circuits judge the bolus ready.' } },
      { k:'swallow', label:{ plain:'Swallowing', tech:'Transfer cycle' }, fault:false,
        cap:{ plain:'<b>Swallowing.</b> Several protections close the airway together. The food then passes behind it, and a wave of muscle carries it down the oesophagus.',
              tech :'<b>Transfer cycle.</b> Vocal-fold closure, laryngeal elevation and epiglottic movement overlap. Pharyngeal pressure transfers the bolus, followed by oesophageal peristalsis.' } },
      { k:'inverted', label:{ plain:'Against gravity', tech:'Position changed' }, fault:false,
        cap:{ plain:'<b>Against gravity.</b> The oesophagus pushes food. Gravity can change the speed, but it is not the motor.',
              tech :'<b>Position changed.</b> Peristalsis still moves the bolus when gravity opposes it. Body position can change transit time and pressure.' } },
      { k:'aspirate', label:{ plain:'Wrong pipe', tech:'Airway-protection failure' }, fault:true,
        cap:{ plain:'<b>Wrong pipe.</b> If the airway-protection sequence mistimes, material can enter the airway. Coughing is the backup system.',
              tech :'<b>Airway-protection failure.</b> Incomplete or mistimed closure can allow penetration or aspiration. A cough can clear material, but it is not always effective.' } }
    ];
    s.main.plain = {
      kicker:'Summary',
      points:[
        { k:'crusher', h:'Chewing makes food easier to work on.', p:'Smaller pieces expose more surface to saliva and later enzymes.' },
        { k:'dosing', h:'Saliva is more than water.', p:'It lubricates food, buffers acids, protects the mouth and starts starch digestion.' },
        { k:'qc', h:'Taste is a quick chemical check.', p:'Sweet, salty, sour, bitter and umami are signals. They do not tell you the full composition of the food.' },
        { k:'diverter', h:'Swallowing protects the airway with several actions.', p:'The larynx rises, the vocal folds close and the epiglottis folds back. No single flap does the whole job.' },
        { k:'conveyor', h:'The oesophagus pushes food to the stomach.', p:'A wave of muscle does the work. This is why you can swallow while lying down or even against gravity.' }
      ],
      note:'<b>Summary.</b> The mouth does three jobs before the stomach sees the meal: it changes the size, adds fluid and moves the food safely past the airway.'
    };
    s.main.tech = {
      kicker:'Equipment Datasheet',
      spec:[
        { k:'Mechanical step', v:'Mastication · molars can produce several hundred newtons' },
        { k:'Saliva', v:'About 0.5–1.5 L/day · flow rises sharply during eating' },
        { k:'Salivary enzyme', v:'Amylase · starts starch hydrolysis before gastric acid suppresses most activity' },
        { k:'Swallow control', v:'Coordinated sensory-motor sequence · partly voluntary, then reflexive' },
        { k:'Airway protection', v:'Vocal folds + laryngeal elevation + epiglottic movement' },
        { k:'Oesophagus', v:'About 25 cm · peristaltic transport over a few seconds' },
        { k:'Gravity', v:'Helpful but not required · position changes transit' },
        { k:'Failure mode', v:'Penetration / aspiration when protection is incomplete or mistimed' }
      ],
      points:[
        { k:'crusher', h:'Dentition', p:'Particle size changes the area available to enzymes and the ease with which a cohesive bolus forms.' },
        { k:'dosing', h:'Salivary glands', p:'Saliva carries water, mucus, bicarbonate, antimicrobial proteins and amylase. Flow and composition change with stimulation.' },
        { k:'qc', h:'Tongue and oral sensors', p:'Taste receptors sample a few chemical features. Touch, temperature and smell add other information before swallowing.' },
        { k:'diverter', h:'Airway interlock', p:'Safe swallowing is a timed sequence, not one trapdoor. Multiple closures and pressure changes protect the laryngeal inlet while the bolus passes.' },
        { k:'conveyor', h:'Oesophageal peristalsis', p:'Sequential smooth-muscle contraction moves the bolus. Gravity modifies the journey but is not the drive mechanism.' }
      ],
      note:'<b>Design note.</b> The difficult junction is where breathing and swallowing share space. Biology solves it with coordinated timing and redundancy rather than a single valve.',
      analogy:{ tag:'Closest machine', body:'A wet mill feeding a peristaltic conveyor through a safety interlock. The analogy is useful for sequence and flow; the real airway protection uses several moving structures and reflexes.' }
    };
    s.modelLimits = [
      'The epiglottis is not a lone trapdoor. Vocal-fold closure, laryngeal movement, pressure and timing all contribute to airway protection.',
      'Peristalsis can move food against gravity, but body position still changes transit time and pressure.'
    ];
    s.myth = {
      claim:'Chew every mouthful thirty-two times.',
      mechanism:[
        'There is no physiological counter set to thirty-two. Different foods need different amounts of chewing. A soft idli and a raw carrot obviously do not need the same number.',
        'Chewing reduces particle size and mixes food with saliva. Swallowing begins when the bolus has the right texture and shape for you. Sensory and motor circuits handle that continuously.',
        'Eating more slowly can help some people notice satiety and eat less. That does not create a magic chew count, and there is no universal twenty-minute timer that suddenly switches fullness on.'
      ],
      whySurvives:'A precise number sounds measured. “Chew well” sounds like advice; “thirty-two times” sounds like science.'
    };
    s.svg = swap(s.svg,
      '<!-- diverter valve (epiglottis), hinged at the crossing -->\n  <g class="mechonly flapidle">\n    <path class="vessel" d="M348 336 L352 288 L364 288 L364 336 Z"/>\n  </g>',
      '<!-- airway interlock: epiglottic movement plus laryngeal closure -->\n  <g class="mechonly flapidle">\n    <path class="vessel" d="M348 336 L352 288 L364 288 L364 336 Z"/>\n    <line class="vessel-inner" x1="314" y1="326" x2="342" y2="334"/>\n    <line class="vessel-inner" x1="314" y1="338" x2="342" y2="334"/>\n    <text class="dimtext techonly" x="468" y="302">AIRWAY INTERLOCK</text>\n    <text class="dimtext plainonly" x="468" y="302">SEVERAL PARTS CLOSE TOGETHER</text>\n  </g>');
    s.svg = swap(s.svg,
      '<g class="flap" style="transform-origin:356px 336px">\n      <path class="vessel" d="M348 336 L352 288 L364 288 L364 336 Z" style="fill:rgba(232,166,60,.32)"/>\n    </g>',
      '<g class="flap" style="transform-origin:356px 336px">\n      <path class="vessel" d="M348 336 L352 288 L364 288 L364 336 Z" style="fill:rgba(232,166,60,.32)"/>\n    </g>\n    <line class="vessel-inner" x1="314" y1="332" x2="342" y2="334" style="stroke:var(--turmeric);stroke-width:2"/>\n    <line class="vessel-inner" x1="314" y1="336" x2="342" y2="334" style="stroke:var(--turmeric);stroke-width:2"/>');
  }

  /* 02 — stomach: simpler Simple copy; Nerd adds physiology instead of synonyms. */
  {
    const s = S.reactor;
    s.sub.plain = 'It stores, mixes and grinds a meal, adds acid, and releases the result a little at a time.';
    s.modes = [
      { k:'normal', label:{ plain:'After a meal', tech:'Post-meal mixing' }, fault:false,
        cap:{ plain:'<b>After a meal.</b> The stomach stretches, mixes the meal and starts digestion. Emptying takes hours, not a fixed countdown.',
              tech :'<b>Post-meal mixing.</b> Receptive relaxation limits the pressure rise while antral contractions mix the contents. Duodenal feedback helps set the emptying rate.' } },
      { k:'grind', label:{ plain:'Grinding', tech:'Antral grinding' }, fault:false,
        cap:{ plain:'<b>Grinding.</b> Muscle waves push solid food toward a nearly closed exit. Large pieces are thrown back and broken up again.',
              tech :'<b>Antral grinding.</b> Peristaltic waves drive particles toward the pylorus. Retropulsion recirculates larger solids until they are small enough to pass more readily.' } },
      { k:'empty', label:{ plain:'Emptying', tech:'Gastric emptying' }, fault:false,
        cap:{ plain:'<b>Emptying.</b> Liquids usually leave sooner than solids. Fat, acidity, meal size and the small intestine all affect the rate.',
              tech :'<b>Gastric emptying.</b> Pyloric opening, antral pressure and duodenal feedback meter delivery. Caloric liquids, solids and high-fat meals follow different time courses.' } },
      { k:'vent', label:{ plain:'Burp', tech:'Belch reflex' }, fault:false,
        cap:{ plain:'<b>Burp.</b> Swallowed air collects at the top. A brief relaxation lets it travel back up the oesophagus.',
              tech :'<b>Belch reflex.</b> Gastric gas triggers transient lower-oesophageal-sphincter relaxation and retrograde gas flow.' } },
      { k:'reflux', label:{ plain:'Reflux', tech:'Reflux event' }, fault:true,
        cap:{ plain:'<b>Reflux.</b> Stomach contents move back into the oesophagus. That lining is much less protected against acid, so you may feel heartburn.',
              tech :'<b>Reflux event.</b> Transient sphincter relaxation, low sphincter pressure, hiatal anatomy, meal size and posture can all increase reflux.' } }
    ];
    s.main.plain = {
      kicker:'Summary',
      points:[
        { h:'The stomach is mainly a store, mixer and grinder.', p:'It starts protein digestion and some fat digestion, but most digestion and absorption happen later.' },
        { k:'fundus', h:'It stretches to make room.', p:'The upper stomach relaxes as a meal arrives, so volume can rise a lot without the pressure rising as much.' },
        { k:'body', h:'It makes acid and protects itself from that acid.', p:'Mucus, bicarbonate, tight cell barriers and rapid cell replacement protect the stomach wall.' },
        { k:'antrum', h:'It grinds solid food.', p:'Muscle waves drive food toward the exit and throw larger pieces back for another pass.' },
        { k:'pylorus', h:'It meters food into the small intestine.', p:'The exit opens in small pulses. Liquids usually leave sooner than solid food.' },
        { k:'cardia', h:'Reflux is a barrier problem, not a moral judgement on dinner.', p:'If stomach contents move back into the oesophagus, the less-protected lining can hurt.' }
      ],
      note:'<b>Summary.</b> The stomach is built for acid, mixing and changing meal sizes. Spicy food can cause symptoms in some people, but pain is not the same thing as an ulcer.'
    };
    s.main.tech = {
      kicker:'Equipment Datasheet',
      spec:[
        { k:'Resting volume', v:'Tens of millilitres · expands greatly during a meal' },
        { k:'Luminal pH', v:'Often about 1.5–3.5 between and during parts of digestion' },
        { k:'Protein digestion', v:'Pepsin activated from pepsinogen in acid' },
        { k:'Fat digestion', v:'Gastric lipase contributes before pancreatic digestion' },
        { k:'Antral rhythm', v:'About 3 contractions/minute' },
        { k:'Barrier', v:'Mucus + bicarbonate + epithelial junctions + blood flow + cell turnover' },
        { k:'Emptying control', v:'Pylorus + antrum + duodenal neural/hormonal feedback' },
        { k:'Reflux control', v:'LES pressure + diaphragm + anatomy + transient relaxations' }
      ],
      points:[
        { k:'cardia', h:'Gastro-oesophageal barrier', p:'The lower oesophageal sphincter works with the diaphragm and the geometry of the hiatus. Many reflux episodes occur during transient relaxations rather than a permanently “open valve”.' },
        { k:'fundus', h:'Fundic accommodation', p:'Vagovagal reflexes allow the proximal stomach to relax during filling. This stores volume without a proportional pressure rise.' },
        { k:'body', h:'Acid secretion and protection', p:'Parietal cells secrete hydrogen ions through the H+/K+ ATPase. The mucosal barrier protects tissue with mucus, bicarbonate, tight junctions, blood flow and repair.' },
        { k:'antrum', h:'Antral mill', p:'Peristaltic waves mix and shear solids. Retropulsion occurs when the pylorus narrows as the wave reaches the distal stomach.' },
        { k:'pylorus', h:'Duodenal feedback', p:'Fat, acid, osmolarity and nutrient signals in the duodenum can slow gastric emptying. The stomach therefore does not empty on one universal schedule.' }
      ],
      note:'<b>Design note.</b> Calling the stomach an acid tank is useful, but incomplete. It is also a compliant reservoir, a grinder, a secretory organ and a metering system.',
      analogy:{ tag:'Closest machine', body:'A lined, stirred batch reactor with a flexible surge volume and a metered outlet. Unlike an industrial vessel, its protective wall is living tissue with continuous repair and active blood supply.' }
    };
    s.myth = {
      claim:'Chillies burn holes in your stomach or cause ulcers.',
      mechanism:[
        'Capsaicin activates TRPV1, a sensor used by pain and heat-sensing nerves. That is why chilli can feel hot even though its temperature is not high.',
        'The burning sensation does not mean that the chilli has burned a hole in the stomach. The common major causes of peptic ulcers include <em>Helicobacter pylori</em> infection and NSAID medicines.',
        'Spicy food can worsen reflux or indigestion symptoms in some people. Symptoms matter. They still do not prove that capsaicin is eating through the stomach wall.'
      ],
      whySurvives:'The sensation is vivid. The brain naturally treats pain as evidence of damage, even when a chemical is activating a sensor rather than burning tissue.'
    };
    s.svg = swap(s.svg,
      '<text class="hazardtext" x="602" y="327" opacity=".75">— citation needed</text>',
      '<text class="hazardtext" x="602" y="327" opacity=".75">pain ≠ a hole in the tissue</text>');
  }

  /* 03 — small intestine: representative Indian combination myth + real transport routes. */
  {
    const s = S.refinery;
    s.sub.plain = 'Most digestion and absorption happen here.';
    s.main.plain = {
      kicker:'Summary',
      points:[
        { h:'This is the main digestion and absorption station.', p:'The stomach gets the fame. The small intestine does most of the chemical breakdown and moves most nutrients into the body.' },
        { k:'neutralise', h:'First, it neutralises the stomach acid.', p:'Bicarbonate raises the pH so pancreatic and intestinal enzymes can work well.' },
        { k:'bile', h:'Bile helps water and fat work together.', p:'It disperses fat into tiny structures that make digestion and absorption much easier.' },
        { k:'catalyst', h:'Carbohydrate, protein and fat are processed together.', p:'Different enzymes work on different molecules in the same mixed meal.' },
        { k:'surface', h:'The wall has a huge folded surface.', p:'Folds, villi and microvilli pack about 30 square metres of absorptive surface into the abdomen.' },
        { k:'turnstiles', h:'Different molecules cross by different routes.', p:'Some use carriers or channels. Others diffuse through cells or move between them.' }
      ],
      note:'<b>Summary.</b> A normal Indian meal is a mixture. The intestine does not ask dal, rice, curd and vegetables to queue in separate chemical lanes.'
    };
    s.main.tech = {
      kicker:'Equipment Datasheet',
      spec:[
        { k:'Length', v:'About 3 m in life · longer when relaxed after death' },
        { k:'Surface', v:'About 30 m² · folds + villi + microvilli' },
        { k:'pH transition', v:'Acidic gastric contents → roughly pH 6–7 downstream' },
        { k:'Bicarbonate', v:'Pancreatic and biliary secretions help neutralise gastric acid' },
        { k:'Pancreatic enzymes', v:'Amylase · proteases · lipase and cofactors' },
        { k:'Bile salts', v:'Emulsification + micelle formation · largely recycled in ileum' },
        { k:'Transport', v:'Active transport · facilitated transport · channels · diffusion · paracellular routes' },
        { k:'Fat route', v:'Long-chain fat → chylomicrons → intestinal lymph → systemic blood' },
        { k:'Residence time', v:'Usually hours, with large person-to-person variation' }
      ],
      points:[
        { k:'neutralise', h:'Neutralisation', p:'Bicarbonate-rich secretion counters gastric acid. pH changes along the duodenum rather than jumping instantly to one fixed value.' },
        { k:'bile', h:'Bile salts and micelles', p:'Bile salts are amphipathic molecules. They help form small lipid structures that keep fat digestion products accessible in an aqueous environment.' },
        { k:'catalyst', h:'Enzyme systems', p:'Pancreatic enzymes and brush-border enzymes act in parallel. Protein, starch and fat digestion are not mutually exclusive operating modes.' },
        { k:'surface', h:'Surface amplification', p:'Circular folds, villi and microvilli increase exchange area. The old tennis-court estimate was much too large; modern anatomical estimates are around 30 m².' },
        { k:'turnstiles', h:'Membrane transport', p:'Glucose, amino acids, ions, water and lipid products use different transport mechanisms. No single “gate” model explains them all.' }
      ],
      note:'<b>Design note.</b> The useful engineering picture is a reactor coupled to a selective membrane. The important complication is that the membrane contains several transport mechanisms and fat takes a special lymphatic route.',
      analogy:{ tag:'Process analogue', body:'A continuous reactor coupled to a membrane separator. pH correction, enzymatic reactions, emulsification and selective transfer happen together along one moving tube.' }
    };
    s.modelLimits = [
      'The border-control drawing is schematic. Molecules can use carriers, channels, diffusion through cells and routes between cells.',
      'Long-chain dietary fat is packaged into chylomicrons and enters intestinal lymph before reaching systemic blood.'
    ];
    s.myth = {
      claim:'Fish with curd, milk with banana, or fruit after a meal becomes toxic because the foods are combined.',
      mechanism:[
        'The intestine expects mixed meals. Carbohydrate, protein and fat arrive together, and different enzymes work on them at the same time. Dal-rice, idli-sambar and curd rice are not special exceptions to human physiology.',
        'For a combination to create a new danger, ask what changed. Did the two foods make a new toxic molecule? Did one block an essential digestive pathway? Did controlled studies show harm? A traditional prohibition is not itself a mechanism.',
        'Real exceptions exist. A person can have an allergy, lactose intolerance, coeliac disease, a drug-food interaction or an infection. Those are specific mechanisms that can be tested. “These two ordinary foods should never meet” is a much larger claim.'
      ],
      whySurvives:'The rule is memorable and culturally transmissible. If someone feels unwell after a meal, the unusual combination is also easier to blame than dose, infection, individual intolerance or coincidence.'
    };
    s.svg = swap(s.svg,
      '<rect class="turnstile" x="502" y="606" width="16" height="28"/>\n    <rect class="turnstile" x="580" y="606" width="16" height="28"/>\n    <rect class="turnstile" x="658" y="606" width="16" height="28"/>',
      '<rect class="turnstile" x="502" y="606" width="16" height="28"/>\n    <line class="fringe" x1="580" y1="606" x2="580" y2="634"/>\n    <line class="fringe" x1="596" y1="606" x2="596" y2="634"/>\n    <path class="leader" d="M666 646 L666 592" marker-end="url(#arw03)"/>');
    s.svg = swap(s.svg,
      '<text class="lbl-fn" x="452" y="658">one carrier for each molecule · limited rate</text>',
      '<text class="lbl-fn" x="452" y="658">carrier · channel · diffusion · between cells</text>');
    s.svg = swap(s.svg,
      '<text class="hazardtext" x="250" y="318" text-anchor="end">"Never mix protein and carbs"</text>\n    <text class="hazardtext" x="250" y="334" text-anchor="end" opacity=".75">— all three tools, same stream</text>',
      '<text class="hazardtext" x="250" y="318" text-anchor="end">"Fish + curd? Milk + banana?"</text>\n    <text class="hazardtext" x="250" y="334" text-anchor="end" opacity=".75">same digestive machinery</text>');
  }

  /* 04 — colon: gas corrected; daily-poop toxin myth replaces the probiotic panel. */
  {
    const s = S.bioreactor;
    s.sub.plain = 'The large intestine recovers water and houses microbes that ferment what your enzymes left behind.';
    s.modes = [
      { k:'ferment', label:{ plain:'Fermenting', tech:'Fermentation' }, fault:false,
        cap:{ plain:'<b>Fermenting.</b> Microbes break down fibre and other material that your own enzymes could not digest. This can continue for many hours.',
              tech :'<b>Fermentation.</b> Anaerobic communities metabolise resistant carbohydrates and other substrates. Transit through the colon varies widely, often over tens of hours.' } },
      { k:'water', label:{ plain:'Taking back water', tech:'Water absorption' }, fault:false,
        cap:{ plain:'<b>Taking back water.</b> Water and salts move back into the body as the contents travel through the colon.',
              tech :'<b>Water absorption.</b> Colonic ion transport creates osmotic water absorption. Transit time, secretion and absorption together determine stool water.' } },
      { k:'gas', label:{ plain:'Gas', tech:'Fermentation gas' }, fault:false,
        cap:{ plain:'<b>Gas.</b> Fermentation normally makes gas. Most of the major gases are odourless; tiny amounts of other compounds cause the smell.',
              tech :'<b>Fermentation gas.</b> Hydrogen and carbon dioxide are common; methane is important in some people. These major gases are odourless. Trace sulfur and other volatile compounds create odour.' } },
      { k:'fast', label:{ plain:'Moving fast', tech:'Fast transit' }, fault:true,
        cap:{ plain:'<b>Moving fast.</b> Less time can mean less water absorption, so stool may stay loose. Diarrhoea has several other mechanisms too.',
              tech :'<b>Fast transit.</b> Short residence time can reduce net water absorption. Secretory, osmotic and inflammatory mechanisms can also produce diarrhoea.' } },
      { k:'slow', label:{ plain:'Moving slowly', tech:'Slow transit' }, fault:true,
        cap:{ plain:'<b>Moving slowly.</b> More time usually lets more water leave the stool, so it can become harder. Constipation also has other causes.',
              tech :'<b>Slow transit.</b> Longer residence often increases water removal. Pelvic-floor mechanics, medicines, diet, disease and neural factors can also cause constipation.' } }
    ];
    s.main.plain = {
      kicker:'Summary',
      points:[
        { k:'feed', h:'What reaches the colon is not simply “waste”.', p:'It includes fibre, resistant starch, water, salts, microbes and material that escaped digestion higher up.' },
        { k:'dewater', h:'The colon takes back water and salts.', p:'How wet the stool remains depends partly on transit speed and partly on secretion and absorption.' },
        { k:'workforce', h:'A large microbial ecosystem lives here.', p:'Its composition differs greatly between healthy people. Food, medicines, illness and your existing microbes all change it.' },
        { k:'offtake', h:'Microbes make molecules that your body can use.', p:'Fermentation produces short-chain fatty acids such as acetate, propionate and butyrate. Colon cells use butyrate as an important fuel.' },
        { k:'vent', h:'Gas is a normal product of fermentation.', p:'Most major gut gases are odourless. Trace compounds are responsible for the smell.' }
      ],
      note:'<b>Summary.</b> There is no single “perfect microbiome”. The most useful levers are ordinary: enough fibre, a varied diet when tolerated, appropriate medicines, movement and treatment of real disease.'
    };
    s.main.tech = {
      kicker:'Equipment Datasheet',
      spec:[
        { k:'Length', v:'About 1.5 m' },
        { k:'Transit', v:'Highly variable · often tens of hours' },
        { k:'Microbial load', v:'Roughly 10¹³ cells · hundreds of taxa detected across people' },
        { k:'Main substrates', v:'Fibre · resistant starch · host mucus · undigested residues' },
        { k:'Main products', v:'Acetate · propionate · butyrate · gases · many minor metabolites' },
        { k:'Water handling', v:'Net absorption depends on ion transport, secretion and transit' },
        { k:'Gas', v:'Major gases mostly odourless · trace volatile compounds create smell' },
        { k:'Control', v:'Ecological + host neural, immune and hormonal influences' },
        { k:'Healthy state', v:'No universal single composition or diversity threshold' }
      ],
      points:[
        { k:'feed', h:'Substrate delivery', p:'Fermentable carbohydrate that escapes small-intestinal digestion becomes microbial substrate. Host mucus and other endogenous material also feed the community.' },
        { k:'dewater', h:'Ion and water transport', p:'Sodium and chloride handling, secretion, osmotic load and transit all affect stool water. “The colon just dries stool” is useful but incomplete.' },
        { k:'workforce', h:'Microbial ecology', p:'Different species compete, cooperate and exchange metabolites. Stable adult communities often resist permanent invasion by a new strain, although transient strains can still have effects.' },
        { k:'offtake', h:'Short-chain fatty acids', p:'Butyrate is an important fuel for colonocytes. Acetate and propionate enter host metabolism through other routes. Their effects depend on dose and context.' },
        { k:'vent', h:'Gas chemistry', p:'Hydrogen and carbon dioxide are common fermentation gases; methane production varies. Odour comes mainly from low-concentration sulfur and other volatile molecules.' }
      ],
      note:'<b>Design note.</b> This is an ecosystem coupled to a water-handling organ. Transit, secretion, host physiology and microbial metabolism interact, so one stool test cannot reduce “gut health” to a single score.',
      analogy:{ tag:'Process analogue', body:'An anaerobic bioreactor whose population is not directly programmable. You can change the substrate and the environment; the ecology then responds in ways that depend on the community already present.' }
    };
    s.modelLimits = [
      'Healthy microbiomes vary greatly. A single diversity number is not a universal health score.',
      'Transit time affects stool water, but diarrhoea and constipation also arise from secretion, osmotic effects, inflammation, medicines and evacuation mechanics.'
    ];
    s.myth = {
      claim:'You must poop every day. Otherwise toxins build up inside you.',
      mechanism:[
        'Normal bowel frequency varies a lot between healthy people. Some go more than once a day; others go only a few times a week. Frequency matters less than your usual pattern, stool consistency, symptoms and difficulty passing stool.',
        'The colon stores stool temporarily. That does not mean ordinary stool is leaking vague “toxins” into the body because you skipped one day. If constipation is persistent, painful, new or severe, that is a real problem for specific reasons—not because a detox clock reached twenty-four hours.',
        'Transit does affect stool. Longer transit usually allows more water to leave it, which can make it harder. That is a mechanical and physiological explanation. It does not require a theory of accumulated poison.'
      ],
      whySurvives:'A daily event is easy to turn into a cleanliness rule. “Not today” then feels like something dirty is being stored, even though bowel frequency naturally varies.'
    };
    s.svg = swap(s.svg, '0.5–2 L a day · no smell', '0.5–2 L a day · mostly odourless');
    s.svg = swap(s.svg,
      '<text class="hazardtext" x="355" y="416" text-anchor="middle">"A probiotic will fix this"</text>\n    <text class="hazardtext" x="355" y="432" text-anchor="middle" opacity=".75">an established ecosystem resists invasion</text>',
      '<text class="hazardtext" x="355" y="416" text-anchor="middle">"Miss one day = toxins"</text>\n    <text class="hazardtext" x="355" y="432" text-anchor="middle" opacity=".75">normal bowel frequency varies</text>');
  }

  /* 05 — liver/kidneys: detox stays; kidney analogy becomes ultrafiltration. */
  {
    const s = S.reprocessing;
    s.sub.plain = 'The liver changes chemicals and manages fuel. The kidneys filter blood and keep what the body still needs.';
    s.main.plain = {
      kicker:'Summary',
      points:[
        { k:'firstpass', h:'Most water-soluble material from the gut reaches the liver first.', p:'Many nutrients and swallowed medicines enter the portal blood. Long-chain fat takes a lymph route first.' },
        { k:'transform', h:'The liver changes molecules.', p:'It can modify medicines and hormones, process nutrients, make proteins, package fat and convert chemicals into forms that are easier to use or remove.' },
        { k:'warehouse', h:'The liver stores and makes glucose.', p:'It stores glycogen after meals. Between meals it releases glucose from glycogen and also makes new glucose.' },
        { k:'filter', h:'The kidneys filter an enormous amount of fluid.', p:'About 180 litres of filtrate can be formed in a day. Blood cells and most large proteins stay in the blood.' },
        { k:'reclaim', h:'Then the kidneys take almost all of that fluid back.', p:'Tubules recover water, glucose, amino acids and salts in controlled amounts. Only a small fraction becomes urine.' }
      ],
      note:'<b>Summary.</b> “Detox” is already a set of continuous liver, kidney, lung, gut and cellular processes. A product must show which substance it changes and how—not simply use the word toxin.'
    };
    s.main.tech = {
      kicker:'Equipment Datasheet',
      spec:[
        { k:'Liver blood flow', v:'Roughly 1.5 L/min from portal vein + hepatic artery' },
        { k:'First pass', v:'Most soluble gut products · long-chain fat initially bypasses via lymph' },
        { k:'Liver functions', v:'Biotransformation · protein synthesis · bile · fuel storage and release · lipid handling' },
        { k:'Liver glycogen', v:'Order of 100 g · varies with body size and feeding state' },
        { k:'Renal filtration', v:'About 180 L/day in a typical healthy adult' },
        { k:'Filter barrier', v:'Water/small solutes pass readily · cells and most large proteins retained' },
        { k:'Tubular recovery', v:'More than 99% of filtered water normally reabsorbed' },
        { k:'Final urine', v:'Commonly about 1–2 L/day, strongly dependent on intake and losses' },
        { k:'Control', v:'Hormonal + neural + local control of volume, electrolytes, acid-base balance and pressure' }
      ],
      points:[
        { k:'firstpass', h:'Portal first pass', p:'The portal vein sends absorbed water-soluble nutrients and many oral drugs directly to the liver. Chylomicrons carrying long-chain dietary fat reach systemic blood through lymph first.' },
        { k:'transform', h:'Biotransformation', p:'Hepatic enzymes can oxidise, reduce, hydrolyse or conjugate molecules. These reactions can inactivate a compound, activate it, or make elimination easier.' },
        { k:'warehouse', h:'Glucose buffer', p:'Glycogenolysis dominates early fasting, while gluconeogenesis contributes and becomes more important as fasting continues.' },
        { k:'filter', h:'Glomerular ultrafiltration', p:'Hydrostatic pressure drives water and small solutes across a size- and charge-selective filtration barrier. It is not reverse osmosis.' },
        { k:'reclaim', h:'Tubular reabsorption and secretion', p:'Different nephron segments recover needed solutes and water and also secrete selected substances. Hormones tune the final urine rather than a single filter deciding everything.' }
      ],
      note:'<b>Design note.</b> The kidney uses pressure-driven ultrafiltration followed by selective reabsorption and secretion. The apparently wasteful high flow gives the body fine control over the final composition.',
      analogy:{ tag:'Engineering analogue', body:'The liver resembles a chemical refinery with storage and packaging. The kidney is closer to an ultrafiltration skid followed by multiple recovery and dosing stages—not a reverse-osmosis plant.' }
    };
    s.modelLimits = [
      '“Detox” is not one liver reaction. Different compounds use different metabolic and excretory pathways, and some exposures can overwhelm or damage those systems.',
      'The kidney filter is selective. Cells and most large proteins remain in blood while water and many small solutes enter the filtrate.'
    ];
    s.myth = {
      claim:'Do a detox cleanse to flush out toxins.',
      mechanism:[
        'A useful detox claim must name the substance. Which chemical is being removed? How was it measured? Which pathway changes? What happened in people who used the treatment?',
        'Your liver and kidneys already process and excrete many unwanted substances continuously. A juice does not provide a missing universal “flush” pathway.',
        'Specific poisonings are different. Medicine can use antidotes, chelation, dialysis or other targeted treatment when there is a known toxin and a known mechanism. That is exactly why the vague word “detox” is not enough.'
      ],
      whySurvives:'It turns an invisible continuous process into a visible ritual: drink this, feel cleansed, start again. The ritual is easier to sell than normal physiology.'
    };
  }

  /* 06 — insulin: fix the fasting diagram and make the myth recognisably Indian. */
  {
    const s = S.logistics;
    s.sub.plain = 'Insulin is one of the signals that helps route fuel. Muscle, liver and fat respond in different ways.';
    s.modes = [
      { k:'aftermeal', label:{ plain:'After a meal', tech:'Post-meal signalling' }, fault:false,
        cap:{ plain:'<b>After a meal.</b> Glucose and other fuels arrive. Insulin rises and changes how muscle, liver and fat use and store them.',
              tech :'<b>Post-meal signalling.</b> Insulin increases GLUT4-mediated uptake in muscle and adipose tissue, promotes glycogen synthesis, suppresses hepatic glucose output and reduces lipolysis.' } },
      { k:'fasted', label:{ plain:'Between meals', tech:'Low-insulin state' }, fault:false,
        cap:{ plain:'<b>Between meals.</b> Insulin falls. The liver supports blood glucose, while fat tissue releases more fatty acids for other tissues to use.',
              tech :'<b>Low-insulin state.</b> Hepatic glycogenolysis and gluconeogenesis maintain blood glucose. Adipose lipolysis rises. Muscle glycogen stays inside muscle for local use.' } },
      { k:'exercise', label:{ plain:'Exercising', tech:'Contraction-mediated uptake' }, fault:false,
        cap:{ plain:'<b>Exercising.</b> Working muscle can increase glucose uptake through contraction signals even when insulin is low. Exercise also improves insulin response later.',
              tech :'<b>Contraction-mediated uptake.</b> Muscle contraction recruits GLUT4 through pathways that are partly independent of insulin and increases insulin sensitivity after activity.' } },
      { k:'sticking', label:{ plain:'Insulin resistance', tech:'Reduced insulin response' }, fault:true,
        cap:{ plain:'<b>Insulin resistance.</b> The same amount of insulin produces a smaller effect in several tissues, so the body often sends a stronger signal.',
              tech :'<b>Reduced insulin response.</b> Muscle, liver and adipose tissue can each become less responsive through different cellular mechanisms. One faulty receptor does not explain the syndrome.' } }
    ];
    s.main.plain = {
      kicker:'Summary',
      points:[
        { k:'line', h:'Only a few grams of glucose circulate in the blood at one time.', p:'The body keeps that small pool within a narrow range by moving fuel into and out of tissues.' },
        { k:'dispatcher', h:'Insulin is a signal, not a source of calories.', p:'It changes glucose uptake, storage and fuel release. It cannot create energy from nothing.' },
        { k:'muscle', h:'Muscle is a large glucose user and glycogen store.', p:'Training gives you more capacity to use glucose and improves insulin sensitivity even without weight loss.' },
        { k:'adipose', h:'Body fat is storage and also living tissue.', p:'It stores a large amount of energy and releases hormones and other signals. Fat location also matters for metabolic risk.' },
        { k:'loop', h:'Appetite is regulated, not simply chosen.', p:'The brain integrates signals from stored energy, meals, sleep, stress, illness, learning and the environment.' }
      ],
      note:'<b>Summary.</b> Insulin matters. So do energy intake, muscle, fat distribution, activity, sleep, genetics and many other signals. One hormone is not the whole control system.'
    };
    s.main.tech = {
      kicker:'Network Datasheet',
      spec:[
        { k:'Circulating glucose', v:'About 4 g in ~5 L of blood near normal fasting concentration' },
        { k:'Insulin half-life', v:'Only a few minutes' },
        { k:'Muscle uptake', v:'Insulin-sensitive GLUT4 + contraction-mediated GLUT4 recruitment' },
        { k:'Liver', v:'Glucose enters largely through GLUT2; insulin changes hepatic metabolism and output' },
        { k:'Adipose', v:'Insulin promotes storage and suppresses lipolysis; low insulin permits greater fatty-acid release' },
        { k:'Liver glycogen', v:'Order of 100 g' },
        { k:'Muscle glycogen', v:'Several hundred grams · stored for local muscle use' },
        { k:'Insulin resistance', v:'Multi-tissue state · not one broken receptor' },
        { k:'South Asian note', v:'Metabolic risk often appears at lower BMI and with more central adiposity' }
      ],
      points:[
        { k:'line', h:'Glucose pool', p:'A fasting concentration near 80 mg/dL across roughly 5 L of blood corresponds to only about 4 g of circulating glucose. Rapid turnover keeps the concentration stable.' },
        { k:'dispatcher', h:'Insulin signalling', p:'Insulin has tissue-specific effects. It stimulates GLUT4 uptake in muscle/adipose, promotes glycogen and lipid synthesis, suppresses hepatic glucose production and inhibits lipolysis.' },
        { k:'muscle', h:'Muscle glycogen', p:'Muscle stores glycogen for itself because it lacks meaningful glucose-6-phosphatase activity for exporting free glucose to blood. The liver performs that buffering role.' },
        { k:'adipose', h:'Adipose tissue', p:'Adipocytes store triacylglycerol and release fatty acids during lower-insulin states. Visceral and ectopic fat are more strongly associated with metabolic risk than subcutaneous fat alone.' },
        { k:'loop', h:'Appetite control', p:'Leptin, ghrelin, gut peptides, reward circuits, sleep and learned cues are among many inputs. Energy restriction can also trigger compensatory hunger and reduced expenditure.' }
      ],
      note:'<b>Design note.</b> The dispatcher analogy is useful only if the receiving bays are allowed to behave differently. Muscle, liver and fat do not all “open a glucose door” in the same way.',
      analogy:{ tag:'Closest machine', body:'A distribution network with several dispatch signals and different receiving depots. Insulin changes routing and storage, but each tissue has its own transporters, enzymes and local control.' }
    };
    s.modelLimits = [
      'Insulin has different effects in muscle, liver and fat. The liver is not simply another insulin-gated glucose door.',
      'Muscle glycogen is mainly local fuel. During fasting, liver—not skeletal muscle—supports blood glucose with exported glucose.'
    ];
    s.myth = {
      claim:'Rice and other carbohydrates make you fat because they spike insulin.',
      mechanism:[
        'Carbohydrate usually raises insulin more than fat does. Insulin also promotes storage and suppresses the release of stored fuel. Those facts are real.',
        'The larger claim does not follow automatically. Insulin cannot create energy. In controlled diets, changing carbohydrate and fat while keeping energy and protein comparable does not make energy balance disappear.',
        'For South Asians, glucose control and central fat are important at relatively low BMI. That makes muscle, activity, total diet quality, sleep and clinical risk more important—not less. It does not make one bowl of rice a hormonal fat-making switch.'
      ],
      whySurvives:'It starts with true physiology, then promotes one control signal into the cause of the entire system. That makes a complicated problem feel simple.'
    };
    s.svg = swap(s.svg,
      '<g class="anim a-fasted">\n    <path class="flowline" d="M164 424 L164 344"/>\n    <path class="flowline" d="M380 424 L380 344"/>\n    <text class="dimtext" x="700" y="404" text-anchor="end" style="fill:var(--turmeric)">bays shut · stores feed the line</text>\n  </g>',
      '<g class="anim a-fasted">\n    <path class="flowline" d="M380 424 L380 344"/>\n    <path class="leader" d="M596 558 L676 620" style="stroke:var(--turmeric)" marker-end="url(#arw06)"/>\n    <text class="dimtext techonly" x="700" y="404" text-anchor="end" style="fill:var(--turmeric)">liver supports blood glucose</text>\n    <text class="dimtext plainonly" x="700" y="404" text-anchor="end" style="fill:var(--turmeric)">liver sends glucose to the blood</text>\n    <text class="dimtext techonly" x="690" y="646" text-anchor="end" style="fill:var(--turmeric)">adipose releases fatty acids</text>\n    <text class="dimtext plainonly" x="690" y="646" text-anchor="end" style="fill:var(--turmeric)">fat store releases fatty acids</text>\n  </g>');
    s.svg = swap(s.svg,
      '<text class="hazardtext" x="492" y="146">"Insulin makes you fat"</text>\n    <text class="hazardtext" x="492" y="160" opacity=".75">the booth is empty</text>',
      '<text class="hazardtext" x="492" y="146">"Rice → insulin → fat"</text>\n    <text class="hazardtext" x="492" y="160" opacity=".75">a signal is not an energy source</text>');
  }

  /* 07 — calories: show uncertainty without manufacturing a fake confidence interval. */
  {
    const s = S.meter;
    s.sub.plain = 'Energy balance is real. Your app and watch only estimate the numbers that go into it.';
    s.main.plain = {
      kicker:'Summary',
      points:[
        { h:'Energy still has to balance.', p:'No diet creates energy from nothing or makes stored energy vanish without leaving the body.' },
        { k:'intake', h:'Food intake is hard to measure exactly.', p:'Portions are estimated, labels are rounded and people forget things. The error changes from meal to meal and person to person.' },
        { k:'base', h:'Most energy use happens without deliberate exercise.', p:'Keeping organs, temperature and basic body functions running is usually the largest part of daily expenditure.' },
        { k:'neat', h:'Ordinary movement can change a lot.', p:'Standing, walking, fidgeting and chores vary between people and can fall when someone diets for a long time.' },
        { k:'exercise', h:'Exercise matters for much more than its calorie readout.', p:'It improves fitness, muscle, glucose control, mood and long-term health even when the watch reports a modest number.' }
      ],
      note:'<b>Summary.</b> The law is exact. The meter is not. Use trends, repeated habits and real outcomes instead of treating a four-digit app number as laboratory data.'
    };
    s.main.tech = {
      kicker:'Instrument Datasheet',
      spec:[
        { k:'Governing law', v:'Conservation of energy · exact' },
        { k:'Food intake', v:'Estimated from portions, labels, databases and memory · error varies' },
        { k:'Resting expenditure', v:'Usually the largest component · depends strongly on body size and lean mass' },
        { k:'Thermic effect', v:'Protein > carbohydrate > fat on average · total contribution modest' },
        { k:'NEAT', v:'Highly variable · can adapt during restriction or overfeeding' },
        { k:'Exercise expenditure', v:'Important but often smaller than resting + incidental movement in non-athletes' },
        { k:'Wearables', v:'Useful for trends · energy-expenditure error depends on device, activity and person' },
        { k:'Food energy factors', v:'Population averages · food structure and digestibility can shift metabolizable energy' },
        { k:'Practical control signal', v:'Long-term weight/waist trend + performance + clinical markers' }
      ],
      points:[
        { k:'intake', h:'Intake error', p:'Under-reporting is common in self-reported dietary data, but the direction and size of error vary. Package labels and food-composition tables add separate uncertainty.' },
        { k:'base', h:'Resting expenditure', p:'Prediction equations estimate rather than directly measure it. Indirect calorimetry can measure it better under controlled conditions.' },
        { k:'tef', h:'Thermic effect', p:'Protein has a higher thermic effect than carbohydrate or fat. This changes expenditure, but it does not create a large loophole in energy balance.' },
        { k:'neat', h:'Adaptive movement', p:'Incidental movement can change without conscious intent. This is one reason a planned deficit and the achieved deficit can diverge.' },
        { k:'exercise', h:'Wearable interpretation', p:'Watches can be useful for consistency and trends. Their calorie estimates are not equivalent to direct calorimetry and can be wrong in person-specific ways.' }
      ],
      note:'<b>Design note.</b> A process engineer separates the law from the instruments. The energy equation can be exact while every real-world input carries uncertainty.',
      analogy:{ tag:'How to read it', body:'A balance calculation built from imperfect meters. You do not solve that problem by denying conservation of energy; you solve it by calibrating against repeated real outcomes.' }
    };
    s.modelLimits = [
      'The uncertainty is not one universal percentage. Some inputs and methods are much more accurate than others.',
      'Energy balance is exact over time, while both intake and expenditure are dynamic and difficult to estimate precisely in free-living people.'
    ];
    s.myth = {
      claim:'My app says I ate 1,847 Calories and my watch says I burned 600. So I know my calorie deficit.',
      mechanism:[
        'Both numbers are estimates. Food intake depends on portion size, recipe, database values and what you remembered to log. Wearable expenditure depends on the device, the activity and your individual physiology.',
        'Subtracting two precise-looking estimates does not create a precise answer. The arithmetic can be perfect while the inputs are uncertain.',
        'Use the app as a control aid if it helps you stay consistent. Then calibrate it against trends over weeks: body weight, waist, training performance, hunger, and any clinical goal you actually care about.'
      ],
      whySurvives:'A screen shows exact digits, so the number feels measured. Interfaces are very good at hiding the uncertainty that produced the number.'
    };
    s.svg = swap(s.svg, 'Self-reported · usually 20–30% too low', 'Often under-reported · error varies');
    s.svg = swap(s.svg,
      '<text class="dimtext techonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">SOMEWHERE BETWEEN 1,500 AND 2,300</text>\n    <text class="dimtext plainonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">Somewhere between 1,500 and 2,300</text>\n    <text class="dimtext" x="400" y="490" text-anchor="middle" opacity=".7" style="fill:var(--chilli)">the deficit is smaller than you intended</text>',
      '<text class="dimtext techonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">INPUT UNCERTAINTY NOT SHOWN</text>\n    <text class="dimtext plainonly" x="400" y="474" text-anchor="middle" style="fill:var(--chilli)">The app hides the uncertainty</text>\n    <text class="dimtext" x="400" y="490" text-anchor="middle" opacity=".7" style="fill:var(--chilli)">the range depends on how each input was measured</text>');
    s.svg = swap(s.svg, '± 25% on inputs', 'uncertainty varies');
    s.svg = swap(s.svg,
      '<text class="hazardtext" x="470" y="246">"My app says 1,847"</text>\n    <text class="hazardtext" x="452" y="260" opacity=".75">It states that. It does not know that.</text>',
      '<text class="hazardtext" x="470" y="246">"App − watch = exact deficit"</text>\n    <text class="hazardtext" x="452" y="260" opacity=".75">both inputs are estimates</text>');
  }

  /* 08 — evidence: convergence becomes clustering, not identical needles. */
  {
    const s = S['control-room'];
    s.sub.plain = 'Every study has blind spots. Confidence rises when different methods point in the same direction.';
    s.main.plain = {
      kicker:'Summary',
      points:[
        { h:'One study is one measurement.', p:'A good study can still be wrong by chance or limited by its design. Headlines often hide that.' },
        { k:'trial', h:'Randomised trials are strong for cause, but they have limits.', p:'Chance assignment reduces many differences between groups. Nutrition trials can still be short, expensive and hard to keep blinded or compliant.' },
        { k:'cohort', h:'Long studies see real life, but real life is messy.', p:'People who eat differently also differ in income, exercise, smoking, health care and many other ways.' },
        { k:'bias', h:'Healthy habits travel in packs.', p:'A food can receive credit for the lifestyle of the people who tend to eat it.' },
        { k:'amplifier', h:'Selection happens after the study too.', p:'Sponsors, journals, press offices and social media can all favour results that are positive, surprising or useful to them.' },
        { k:'converge', h:'Look for agreement across different methods.', p:'Confidence rises most when methods with different weaknesses point in the same direction—not when five identical studies repeat the same bias.' }
      ],
      note:'<b>Summary.</b> Science changing its mind is not automatically a weakness. The important question is what changed: one noisy headline, or the weight of evidence across many independent methods?'
    };
    s.main.tech = {
      kicker:'Evidence Datasheet',
      spec:[
        { k:'Randomisation', v:'Reduces confounding on average · does not guarantee perfect balance in one trial' },
        { k:'Cohorts', v:'Long follow-up and real behaviour · residual confounding remains possible' },
        { k:'Mechanism', v:'Supports plausibility · does not establish meaningful effect size in people by itself' },
        { k:'Diet measurement', v:'Often self-reported · error can be systematic and correlated with participant traits' },
        { k:'Effect size', v:'Small relative effects need careful attention to bias and absolute risk' },
        { k:'Funding', v:'Can influence questions, comparators, analysis and publication' },
        { k:'Publication', v:'Positive/surprising results are more likely to become visible' },
        { k:'Media layer', v:'Selects novelty and conflict · often strips uncertainty from the claim' },
        { k:'Strongest pattern', v:'Convergence across independent designs, populations and failure modes' }
      ],
      points:[
        { k:'trial', h:'Randomised trial', p:'Randomisation makes treatment assignment independent of baseline characteristics in expectation. Small trials can still be imbalanced by chance, and adherence or blinding can fail.' },
        { k:'cohort', h:'Cohort study', p:'Long follow-up can capture chronic exposure and rare outcomes. Residual confounding, reverse causation and exposure-measurement error remain important threats.' },
        { k:'bias', h:'Healthy-user effect', p:'Behavioural clustering can make an exposure look protective because it tags a wider lifestyle. Statistical adjustment helps but cannot guarantee removal of unmeasured confounding.' },
        { k:'amplifier', h:'Selection and amplification', p:'Funding bias, publication bias and media selection are separate stages. Each can tilt what gets studied, published or amplified even when no individual fabricates data.' },
        { k:'converge', h:'Convergence', p:'Agreement is persuasive when designs fail differently and the estimated effects are compatible, not necessarily identical. Shared bias can still produce false agreement.' }
      ],
      note:'<b>Design note.</b> “Hierarchy of evidence” is useful but incomplete. A robust conclusion often comes from triangulation: different methods, different biases, compatible answers.',
      analogy:{ tag:'How the panel works', body:'A control room with several imperfect instruments. You trust a conclusion more when independent gauges with different error modes cluster around the same region and survive calibration checks.' }
    };
    s.modelLimits = [
      'Randomisation reduces confounding in expectation; it does not guarantee identical groups in one small trial.',
      'Convergence means compatible evidence, not identical numbers. Shared systematic bias can still make several methods agree incorrectly.'
    ];
    s.myth = {
      claim:'Nutrition science keeps changing its mind, so nobody really knows anything.',
      mechanism:[
        'Separate the settled core from the moving frontier. Severe nutrient deficiency causes disease. Trans fats harm cardiovascular health. Smoking causes cancer. Long-term excess adiposity raises health risk. Those conclusions do not reset every week.',
        'The noisy frontier asks smaller questions: one food, one replacement, one biomarker, one subgroup. Effects are often modest and measurements difficult, so new results disagree more often.',
        'A reversal can be evidence that the correction system works. The right response is not “believe every new paper” or “believe none of them”. Ask how many independent methods support the claim and how large the remaining uncertainty is.'
      ],
      whySurvives:'News selects change. Nobody writes a headline saying “the boring result still holds”, so the public sees the unstable edge of science far more often than the stable centre.'
    };
    s.svg = s.svg.replace(/<!-- ===== convergence ===== -->[\s\S]*?<!-- ===== amplified ===== -->/, `<!-- ===== convergence ===== -->
  <g class="anim a-converge">
    ${gauge(140, 258, 'RCT-1', 'trial', [-8, -22])}
    ${gauge(255, 258, 'COH-2', 'cohort', [-3, -24])}
    ${gauge(370, 258, 'MEC-3', 'mechanism', [2, -23])}
    ${gauge(485, 258, 'OBS-4', 'observed', [7, -21])}
    ${gauge(600, 258, 'SR-5', 'review', [0, -24])}
    <rect class="stamp" x="200" y="404" width="340" height="46" style="stroke:var(--cardamom)" />
    <text class="stamptext" x="370" y="433" text-anchor="middle" style="fill:var(--cardamom)">Convergence — clustered, not identical</text>
  </g>

  <!-- ===== amplified ===== -->`);
    s.svg = swap(s.svg, 'Funding and media · high gain', 'Selection + amplification');
  }

  /* 09 — closing: keep the energy, lose the overclaim and serial-stage language. */
  {
    const s = S.closing;
    s.sub.plain = 'Understand the system. Distrust fake certainty. Then eat.';
    s.modes = [
      { k:'nominal', label:{ plain:'All systems nominal', tech:'All systems nominal' }, fault:false,
        cap:{ plain:'<b>All systems nominal.</b> The systems you just saw keep working without conscious supervision. There is no secret nutrition control panel for you to operate.',
              tech :'<b>All systems nominal.</b> Digestive, metabolic and control systems remain online together. Conscious operator input is not part of their normal control architecture.' } }
    ];
    s.main.plain = {
      kicker:'Closing',
      points:[
        { h:'The body handles large chemical changes every day.', p:'It moves from stomach acid to near-neutral intestine, processes mixed meals, hosts microbes and keeps blood chemistry within narrow limits.' },
        { h:'That does not make the body invincible.', p:'Allergy, intolerance, infection, toxins, disease and drug interactions are real. They have specific mechanisms.' },
        { h:'Most universal food rules need stronger evidence.', p:'Rice at night, fruit in the “wrong” order or an ordinary food combination does not become dangerous merely because a rule says so.' },
        { h:'The useful controls are boring.', p:'Total intake, food quality and variety, muscle, movement, sleep, medical care and the people around you matter far more than ritual purity.' },
        { h:'Food is also culture and pleasure.', p:'A meal is not a test of your character, and your body is not keeping score.' }
      ],
      note:'<b>Trust the biological engineering. Ignore the noise. Eat the biryani.</b>'
    };
    s.main.tech = {
      kicker:'Status Board',
      spec:[
        { k:'Facility status', v:'<em>Operating</em>' },
        { k:'Control architecture', v:'Distributed + hierarchical' },
        { k:'Conscious operator', v:'Not required for normal operation' },
        { k:'Real hazards', v:'Dose-dependent toxins · pathogens · allergy · intolerance · disease · interactions' },
        { k:'High-value controls', v:'Diet pattern · energy balance · muscle · activity · sleep · clinical risk' },
        { k:'Outstanding action', v:'Eat the biryani.' }
      ],
      note:'You have seen mechanical processing, acid secretion, neutralisation, enzymatic digestion, selective absorption, microbial fermentation, hepatic metabolism, renal filtration, fuel routing and imperfect measurement. Each system has limits. None supports a universal catalogue of magical food combinations and timings.',
      analogy:{ tag:'And then', body:'Engineering teaches you to ask for the failure mode. What changed? At what dose? Which component failed? What measurement shows it? Apply the same discipline to nutrition claims. Then leave room for culture, pleasure and dinner. Trust the biological engineering. Ignore the noise. Eat the biryani.' }
    };
    s.modelLimits = [
      'Robust physiology does not mean invulnerability. A real hazard can matter greatly when the dose, organism, allergy, disease state or medicine interaction is specific.',
      'The closing argument rejects unsupported universal food rules. It does not replace personalised medical advice.'
    ];
  }

  return stations;
}
