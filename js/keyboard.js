// logic related to keyboard management

import { CALCULATOR_CNTR, SAMPLE_LIBRARY } from "./config.js";

function getTypedKeyValue() {  
    CALCULATOR_CNTR.addEventListener('click', (e) => {
        if (e.target.tagName !== "BUTTON") return;
        const typedKeyValue = e.target.dataset.value;
        console.log(typedKeyValue);
        return typedKeyValue
    });
}

function playSound(sampleKey) {
    const sampleReference = SAMPLE_LIBRARY[sampleKey];
    const sound = sampleReference.sound;
    sound.currentTime = sampleReference.startingPoint;
    sound.play();
}

function playKeypressFeedback() {
    CALCULATOR_CNTR.addEventListener('click', (e) => {
        if (e.target.tagName !== "BUTTON") return
        playSound("click");
    });
}

export { getTypedKeyValue, playKeypressFeedback};