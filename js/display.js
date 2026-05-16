// logic related to display update

import { DISPLAY_TEXT } from "./config.js";
import { getOperationText } from "./state.js";

/**
 * Refresh the calculator screen with the current operation text.
 * @returns {void}
 */
function updateDisplay() {
    DISPLAY_TEXT.textContent = getOperationText();
}

export { updateDisplay };