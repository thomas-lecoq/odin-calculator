// logic related to keyboard management

import { CALCULATOR_CNTR, SAMPLE_LIBRARY, DIGITS, OPERATORS } from "./config.js";
import { setCurrentEntry, correctCurrentEntry, reset, setOperator, equal, tryToCalculate, stateStatus} from "./state.js";

function playSound(sampleKey) {
    const sampleReference = SAMPLE_LIBRARY[sampleKey];
    const sound = sampleReference.sound;
    sound.currentTime = sampleReference.startingPoint;
    sound.play();
}

function handleKeyPress(event) {
    if (event.target.tagName !== "BUTTON") return;
    const typedKeyValue = event.target.dataset.value;

    // play sound if a button is clicked
    switch(event.target.id) {
        case ("equal-btn"):
            playSound("kaching");
            break;
        default:
            playSound("click");
    };

    // execute appropriate functions depending on clicked button
    switch(true) {
        case (DIGITS.includes(typedKeyValue)):
            setCurrentEntry(typedKeyValue);
            break;
        case (typedKeyValue in OPERATORS):
            setOperator(typedKeyValue);
            break;
        case (typedKeyValue === "equal"):
            equal();
            break;
        case (typedKeyValue === "correct"):
            correctCurrentEntry();
            break;
        case (typedKeyValue === "clear"):
            reset();
            break;
    };
    tryToCalculate()
    stateStatus()
}

export { handleKeyPress };
