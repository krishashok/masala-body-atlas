/* Ordered manifest. app.js knows nothing station-specific beyond this. */

import preface      from './00-preface.js';
import intake       from './01-intake.js';
import reactor      from './02-reactor.js';
import refinery     from './03-refinery.js';
import bioreactor   from './04-bioreactor.js';
import reprocessing from './05-reprocessing.js';
import logistics    from './06-logistics.js';
import meter        from './07-meter.js';
import controlRoom  from './08-control-room.js';
import closing      from './09-closing.js';
import applyEditorialPass from './editorial-pass.js';

const stations = [
  preface, intake, reactor, refinery, bioreactor,
  reprocessing, logistics, meter, controlRoom, closing
];

export default applyEditorialPass(stations);
