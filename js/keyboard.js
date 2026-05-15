// logic related to keyboard management

import { CALCULATOR_CNTR, SAMPLE_LIBRARY } from "./config.js";

function playSound(sampleKey) {
    const sampleReference = SAMPLE_LIBRARY[sampleKey];
    const sound = sampleReference.sound;
    sound.currentTime = sampleReference.startingPoint;
    sound.play();
}

function handleKeyPress(event) {
    if (event.target.tagName !== "BUTTON") return;
    const typedKeyValue = event.target.dataset.value;

    playSound("click");
    console.log(typedKeyValue);
}

export { handleKeyPress };
