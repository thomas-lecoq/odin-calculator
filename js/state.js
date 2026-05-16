// logic related to state management and related update 

import { INITIAL_STATE, OPERATORS } from "./config.js";
import { operate } from './calculations.js';

// copy initial state, ready to update
const state = structuredClone(INITIAL_STATE);

/**
 * Update one slot of the calculator state. Passing `null` clears the slot.
 * - For numeric slots ("currentEntry", "firstMember", "secondMember"),
 *   `value` is stored as a Number and `text` as the raw string.
 * - For "operator", `slotValue` is an OPERATORS key.
 * - For "operation", only the displayable `text` is stored.
 * @param {"currentEntry"|"firstMember"|"secondMember"|"operator"|"operation"} slotName
 * @param {string|number|null} slotValue
 * @returns {void}
 */
function setStateSlot(slotName, slotValue) {
    const isSlotValueNull = (slotValue !== null);
    switch(slotName) {
        case "currentEntry":
        case "firstMember":
        case "secondMember":
            state[slotName].value = isSlotValueNull ? Number(slotValue) : null;
            state[slotName].text = isSlotValueNull ? String(slotValue) : "";
            break;
        case "operator":
            state[slotName].value = isSlotValueNull ? OPERATORS[slotValue].value : null;
            state[slotName].text = isSlotValueNull ? OPERATORS[slotValue].text : "";
            break;
        case "operation" :
            state[slotName].text = isSlotValueNull ? String(slotValue): "";
    };
}

/**
 * Append a typed digit (or `.`) to the current entry, ignoring a second `.`.
 * @param {string|number} typedKeyValue - Digit character or `.`.
 * @returns {void}
 */
function setCurrentEntry(typedKeyValue) {
    const typedKeyText = String(typedKeyValue);
    // after `=`, firstMember holds the result with no operator: start a new calculation
    if (state.firstMember.value !== null && state.operator.value === null) reset();
    // prevent multiple decimal points in the same number
    if (typedKeyText === '.' && state.currentEntry.text.includes('.')) return;

    const currentEntryText = state.currentEntry.text.concat(typedKeyText);
    setStateSlot("currentEntry", currentEntryText);
    setOperation();
}

/**
 * Remove the last character of the current entry (backspace).
 * @returns {void}
 */
function correctCurrentEntry() {
    setStateSlot("currentEntry", state.currentEntry.text.slice(0, -1));
    setOperation();
}

/**
 * Store a number into the first available member slot (first then second).
 * @param {number|null} value
 * @returns {void}
 */
function setMember(value) {
    if (state.firstMember.value === null) {
        setStateSlot("firstMember", value);
    } else {
        setStateSlot("secondMember", value);
    };
}

/**
 * Move the current entry value into the next member slot and clear the entry.
 * @returns {void}
 */
function shiftCurrentEntryToMember() {
    setMember(state.currentEntry.value);
    setStateSlot("currentEntry", null);
    setOperation();
}

/**
 * Set the pending operator. Promotes the current entry to a member first,
 * and resolves any pending chained operation before storing the new operator.
 * @param {keyof typeof OPERATORS} operatorName
 * @returns {void}
 */
function setOperator(operatorName) {
    // if a current entry is typed and we want to set the operator, first shift current entry to member
    if (state.currentEntry.value !== null) shiftCurrentEntryToMember();
    // if we press an operator but there is no member define for the operation, do nothing
    if (state.firstMember.value === null) return;
    // if we're chaining operations, we must solve pending operations before setting a new operator
    if (state.secondMember.value !== null && state.operator.value !== null) {
        resolvePendingOperation();
    }
    setStateSlot("operator", operatorName);
    setOperation();
}

/**
 * Compute firstMember <op> secondMember, store the result back into
 * firstMember, and clear the other slots.
 * @returns {void}
 */
function resolvePendingOperation() {
    const firstMemberValue = state.firstMember.value;
    const secondMemberValue = state.secondMember.value;
    const operatorValue = state.operator.value;

    const pendingOperationResult = operate(
        operatorValue, firstMemberValue, secondMemberValue
    );
    setStateSlot("firstMember", pendingOperationResult);
    setStateSlot("secondMember", null);
    setStateSlot("currentEntry", null);
    setStateSlot("operator", null);
    setOperation();
}

/**
 * Triggered by `=`: shift the current entry into a member so the operation
 * is ready to be resolved by `tryToCalculate`.
 * @returns {void}
 */
function forceOperationResolution() {
    // shift current entry so the three slots (firstMember, operator, secondMember) are ready for tryToCalculate
    if (state.currentEntry.value === null) return;
    if (state.firstMember.value === null || state.operator.value === null) return;
    shiftCurrentEntryToMember();
}

/**
 * Resolve the pending operation if both members and the operator are set.
 * Resets the state first if the previous result was Infinity.
 * @returns {void}
 */
function tryToCalculate() {
    // if any calculation is tried base on infinity value: reset
    const isInfinity = (state.firstMember.value === Infinity);
    if (isInfinity) reset();
    // if all members and the operator is set, compute intermediate result and update member
    if (state.firstMember.value !== null && state.secondMember.value !== null && state.operator.value !== null){
        resolvePendingOperation();
    }
    else {
        return
    };
}

/**
 * Rebuild the displayable operation text from the current state slots.
 * @returns {void}
 */
function setOperation() {
    let operationText;
    const isFirstMemberNull = (state.firstMember.value === null);
    switch(isFirstMemberNull) {
        case true:
        operationText = (
            state.currentEntry.text
            .concat(state.operator.text)
        );
        break;
        case false:
        operationText = (
            state.firstMember.text
            .concat(state.operator.text)
            .concat(state.currentEntry.text)
        );
        break;
    };
    setStateSlot("operation", operationText);
}

/**
 * Reset the whole state to its initial values.
 * @returns {void}
 */
function reset() {
    Object.assign(state, structuredClone(INITIAL_STATE));
}

/**
 * Replace the operation display with a warning message when firstMember is
 * Infinity (typically after a divide-by-zero).
 * @returns {void}
 */
function checkInfinityOperation() {
    const isInfinity = (state.firstMember.value === Infinity);
    if (isInfinity) {
        setStateSlot("operation", "don't do that!");
    }
}

/**
 * Get the current operation text to display on the calculator screen.
 * @returns {string}
 */
function getOperationText() {
    return state.operation.text
}

export { 
    setCurrentEntry, 
    correctCurrentEntry, 
    setOperator, 
    forceOperationResolution, 
    tryToCalculate, 
    getOperationText, 
    reset ,
    checkInfinityOperation,
};