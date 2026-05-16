import { CALCULATOR_CNTR } from './config.js';
import { handleKeyPress } from './keyboard.js';

/**
 * Entry point: bind the calculator container to the keypress handler.
 * @returns {void}
 */
function init() {
    CALCULATOR_CNTR.addEventListener('click', handleKeyPress);
}

init();
