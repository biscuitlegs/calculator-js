function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

const display = document.querySelector('.display');
const NumericAndOperatorButtons = document.querySelectorAll('.operator, .numeric');
const equalsButton = document.querySelector('.equals');
const backspaceButton = document.querySelector('.backspace');
const clearButton = document.querySelector('.clear');

NumericAndOperatorButtons.forEach(button => button.addEventListener('click', (e) => {
    display.textContent += e.target.textContent;
}));

equalsButton.addEventListener('click', () => {
    display.textContent = evaluate(display.textContent);
});

backspaceButton.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1)
});

clearButton.addEventListener('click', () => {
    display.textContent = '';
});

function evaluate(string) {
    let stringArr = string.split(/([+−×÷])/g);
    let total = 0;

    while (stringArr.length > 0) {
        let operation = stringArr.splice(0, 3);
        total += operate(operation);

        if (stringArr.length > 0) {
            stringArr.unshift(operate(operation).toString());
            total = 0;
        }
    }

    return total;
}

function operate(arr) {
    let [operandA, operator, operandB] = arr;
    
    switch (true) {
        case operator === "+":
            return add(+operandA, +operandB);
        case operator === "−":
            return subtract(+operandA, +operandB);
        case operator === "×":
            return multiply(+operandA, +operandB);
        case operator === "÷":
            return divide(+operandA, +operandB);
    }
}

//console.log(evaluate("5+5"));