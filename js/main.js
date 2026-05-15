import { CALCULATOR_CNTR } from './config.js';
import { handleKeyPress } from './keyboard.js';

function init() {
    CALCULATOR_CNTR.addEventListener('click', handleKeyPress);
}

init();
