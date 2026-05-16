// logic related to display update

import { DISPLAY_TEXT } from "./config.js";
import { getOperationText } from "./state.js";

function updateDisplay() {
    DISPLAY_TEXT.textContent = getOperationText();
}

export { updateDisplay };