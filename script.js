let answerValue = 8675309;
let inputValue = 12;
let newValue = 3;

const answerDisplay = document.querySelector("#answer-display");
const inputDisplay = document.querySelector("#input-display");
inputDisplay.textContent = inputValue;
answerDisplay.textContent = answerValue;

function add(inputValue, newValue) {
    return inputValue + newValue;
}

function subtract(inputValue, newValue) {
    return inputValue - newValue;
}

function multiply(inputValue, newValue) {
    return inputValue * newValue;
}

function divide(inputValue, newValue) {
    if (newValue == 0) {
        return "Err";
    } else {
        return (Math.floor((inputValue / newValue) * 100)) / 100;
    }
}

function numberInput(newValue) {
    let processedInput = inputValue.toString().split(""); //turns current input display value into an array
    // console.log("Length: " + processedInput.length);
    // console.log("First Number: " + processedInput[0]);
    if (inputValue == 0) { //if the readout is currently "0", gets rid of it
        processedInput.pop();
    }
    processedInput.push(newValue); //adds new number to end of array
    processedInput = processedInput.join(""); //turns array back into a string
    inputValue = processedInput;

    update(answerValue, processedInput);
}

function clear() {
    answerValue = 0;
    inputValue = 0;
    newValue = 0;
    update(answerValue, inputValue);
}

function update(answerValue, inputValue) {
    answerDisplay.textContent = answerValue;
    inputDisplay.textContent = inputValue;
}

const numberKeys = document.querySelectorAll(".number");
numberKeys.forEach((numberKey) => {
    numberKey.addEventListener("click", () => {
        numberInput(`${numberKey.textContent}`);
    });
})