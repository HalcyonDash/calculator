let answerValue = 0;
let inputValue = 0;
let newValue = 0;
let currentOperation = "none";

const answerDisplay = document.querySelector("#answer-display");
const inputDisplay = document.querySelector("#input-display");
const operatorDisplay = document.querySelector("#operator-display");
inputDisplay.textContent = inputValue;
answerDisplay.textContent = answerValue;
operatorDisplay.textContent = " "


function add() {
    return Number(answerValue) + Number(inputValue);
}

function subtract() {
    return Number(answerValue) - Number(inputValue)
}

function multiply() {
    return Number(answerValue) * Number(inputValue)
}

function divide() {
    if (inputValue == 0) {
        return "Err";
    } else {
        return (Math.floor((Number(answerValue) / Number(inputValue)) * 100)) / 100;
    }
}

function backspace() {
    if (inputValue == 0) { return; }; //skips if readout is zero
    let processedInput = inputValue.toString().split("");
    processedInput.pop();
    if (processedInput.length == 0) {
        processedInput.push(0);
    };
    processedInput = processedInput.join("");
    inputValue = processedInput;

    update(answerValue, processedInput);
}

function numberInput(newValue) {
    let processedInput = inputValue.toString().split(""); //turns current input display value into an array
    if (inputValue == 0) { //if the readout is currently "0", gets rid of it
        processedInput.pop();
    }
    processedInput.push(newValue); //adds new number to end of array
    processedInput = processedInput.join(""); //turns array back into a string
    inputValue = processedInput;

    update(answerValue, processedInput);
}

function operatorInput(keyValue) {
    switch (keyValue) {
        case "equals":
            equals();
            currentOperation = "none";
            break;
        default:
            currentOperation = keyValue;
            equals();
            break;
    }
    operatorDisplayUpdate();
}

function operatorDisplayUpdate() {
    switch (currentOperation) {
        case "none":
            operatorDisplay.textContent = " ";
            break;
        case "add":
            operatorDisplay.textContent = "+";
            break;
        case "subtract":
            operatorDisplay.textContent = "-";
            break;
        case "multiply":
            operatorDisplay.textContent = "x";
            break;
        case "divide":
            operatorDisplay.textContent = "÷";
            break;
    }
}

function otherInput(keyValue) {
    switch (keyValue) {
        case "clear":
            clear();
            break;
        case "back":
            backspace();
            break;
    }
}

function equals() {
    switch (currentOperation) {
        case "add":
            update(add(), 0);
            break;
        case "subtract":
            update(subtract(), 0);
            break;
        // case "multiply":
        //     update(multiply(), 0);
        //     break;
        // case "divide":
        //     update(divide(), 0);
        //     break;
        case "none":
            // update(answerValue, 0);
            // inputValue = 0;
            break;
    }
}

function clear() {
    answerValue = 0;
    inputValue = 0;
    newValue = 0;
    currentOperation = "none";
    update(answerValue, inputValue);
    operatorDisplayUpdate();
}

function update(newAnswerValue, newInputValue) {
    answerValue = newAnswerValue;
    inputValue = newInputValue;
    answerDisplay.textContent = newAnswerValue;
    inputDisplay.textContent = newInputValue;
    newValue = 0;
}

const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const otherKeys = document.querySelectorAll(".other");

numberKeys.forEach((key) => {
    key.addEventListener("click", () => {
        numberInput(`${key.value}`);
    });
});

otherKeys.forEach((key) => {
    key.addEventListener("click", () => {
        otherInput(`${key.value}`);
    });
});

operatorKeys.forEach((key) => {
    key.addEventListener("click", () => {
        operatorInput(`${key.value}`);
    });
});