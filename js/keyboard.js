// logic related to keyboard management

import { CALCULATOR_CTNR_ID } from "./config.js";

function getTypedKeyValue() {
    const calculatorCtnr = document.querySelector(`#${CALCULATOR_CTNR_ID}`);
    
    calculatorCtnr.addEventListener('click', (e) => {
        if (e.target.tagName !== "BUTTON") return;
        const typedKeyValue = e.target.dataset.value;
        console.log(typedKeyValue);
        return typedKeyValue
    });
}

export { getTypedKeyValue };