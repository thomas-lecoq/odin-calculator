// logic related to display update

import { DISPLAY_TEXT } from "./config.js";

function updateDisplay(text) {
    DISPLAY_TEXT.textContent = text;
}

export { updateDisplay };