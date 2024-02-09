let answerValue = 0;
let inputValue = 0;
let currentOperation = "none";
let negativePressed = false;

const answerDisplay = document.querySelector("#answer-display");
const inputDisplay = document.querySelector("#input-display");
const negativeDisplay = document.querySelector("#negative-display");
const operatorDisplay = document.querySelector("#operator-display");
inputDisplay.textContent = inputValue;
answerDisplay.textContent = answerValue;
operatorDisplay.textContent = " "


function add() {
    return Number(answerValue) + Number(inputValue);
}

function subtract() {
    return Number(answerValue) - Number(inputValue);
}

function multiply() {
    return Number(answerValue) * Number(inputValue);
}

function divide() {
    if (inputValue == 0) {
        return "Err";
    } else {
        return Number(answerValue) / Number(inputValue);
    }
}

function equals() {
    switch (currentOperation) {
        case "add":
            answerValue = add();
            break;
        case "subtract":
            answerValue = subtract();
            break;
        case "multiply":
            answerValue = multiply();
            break;
        case "divide":
            answerValue = divide();
            break;
        case "none":
            answerValue = inputValue == 0 ? answerValue : inputValue;
            break;
    }

    inputValue = 0;
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

    update();
}

function numberInput(newValue) {
    let processedInput = inputValue.toString().split(""); //turns current input display value into an array

    if (newValue == ".") { //checks if number is a decimal and doesn't allow more decimals if so.
        for (let i = 0; i < processedInput.length; i++) {
            if (processedInput[i] == ".") {
               return; 
            }
        }
    }

    if (inputValue == 0) { //if the readout is currently "0", gets rid of it
        processedInput.shift();
    }

    processedInput.push(newValue); //adds new number to end of array
    
    if (processedInput[0] == ".") { //checks if number is a decimal without a ones place and adds a 0 at the beginning
        processedInput.unshift("0");
    };
    
    inputValue = processedInput.join(""); //turns array back into a string
    if (negativePressed) { inputValue *= -1};
    negativePressed = false;
    update();
}

function operatorInput(keyValue) {
    equals();
    switch (keyValue) {
        case "equals":
            currentOperation = "none";
            break;
        default:
            currentOperation = keyValue;
            break;
    }

    // equals();
    // currentOperation = keyValue == "equals" ? "none" : keyValue;
    
    update();
}

function otherInput(keyValue) {
    switch (keyValue) {
        case "clear":
            clear();
            break;
        case "negative":
            if (inputValue == 0) {
                negativePressed = !negativePressed;
            };
            inputValue *= -1;
            update();
            break;
        case "back":
            backspace();
            break;
    }
}

function clear() {
    answerValue = 0;
    inputValue = 0;
    currentOperation = "none";
    update();
    operatorDisplayUpdate();
}

function update() {
    let processedAnswer = answerValue.toString().split("");
    for (let i = 0; i < processedAnswer.length; i++) {
        if (processedAnswer[i] == ".") {
            while (processedAnswer[processedAnswer.length-1] == "0") {
                processedAnswer.pop();
            }
        }
    };
    while (processedAnswer[processedAnswer.length-1] == ".") {
        processedAnswer.pop();
    };
    answerValue = processedAnswer.join("");
    answerValue = Math.floor(answerValue * 100) / 100;

    answerDisplay.textContent = answerValue;
    inputDisplay.textContent = inputValue;
    negativeDisplay.textContent = negativePressed ? "+/-" : "";
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