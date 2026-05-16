// logic related to state management and related update 

import { INITIAL_STATE, OPERATORS } from "./config.js";
import { operate } from './calculations.js';

// copy initial state, ready to update
const state = structuredClone(INITIAL_STATE);

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

function setCurrentEntry(typedKeyValue) {
    const typedKeyText = String(typedKeyValue);
    const currentEntryValue = state.currentEntry.value;

    const currentEntryText = (
        (currentEntryValue === null) ? typedKeyText : String(currentEntryValue).concat(typedKeyText)
    );
    setStateSlot("currentEntry", currentEntryText);
    setOperation();
}

function correctCurrentEntry() {
    setStateSlot("currentEntry", state.currentEntry.text.slice(0, -1));
    setOperation();
}

function setMember(value) {
    if (state.firstMember.value === null) {
        setStateSlot("firstMember", value);
    } else {
        setStateSlot("secondMember", value);
    };
}

function shiftCurrentEntryToMember() {
    setMember(state.currentEntry.value);
    setStateSlot("currentEntry", null);
    setOperation();
}

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

function forceOperationResolution() {
    // shift current entry so the three slots (firstMember, operator, secondMember) are ready for tryToCalculate
    if (state.currentEntry.value === null) return;
    if (state.firstMember.value === null || state.operator.value === null) return;
    shiftCurrentEntryToMember();
}

function tryToCalculate() {
    const isInfinity = (state.firstMember.value === Infinity);
    // if any calculation is tried base on infinity value: reset
    if (isInfinity) reset();
    // if all members and the operator is set, compute intermediate result and update member
    if (state.firstMember.value !== null && state.secondMember.value !== null && state.operator.value !== null){
        resolvePendingOperation();
    }
    else {
        return
    };
}

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

function reset() {
    Object.assign(state, structuredClone(INITIAL_STATE));
}

function checkInfinityOperation() {
    const isInfinity = (state.firstMember.value === Infinity);
    if (isInfinity) {
        setStateSlot("operation", "don't do that!");
    }
}

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