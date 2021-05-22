function operate(operation) {
    let [operandA, operator, operandB] = operation;
    
    switch (true) {
        case operator === "+":
            return +operandA + +operandB;
        case operator === "−":
            return +operandA - +operandB;
        case operator === "×":
            return +operandA * +operandB;
        case operator === "÷":
            return +operandA / +operandB;
    }
}

function evaluate(string, entireResult=0) {
    let entireOperation = string.split(/([+−×÷])/g);

    while (!isFinished(entireOperation)) {
        let subOperation = entireOperation.splice(0, 3);
        let subOperationResult = operate(subOperation);
        entireResult += subOperationResult;

        if (!isFinished(entireOperation)) {
            unshiftSubResult(entireOperation, subOperationResult);
            entireResult = 0;
        }
    }

    return entireResult;
}

function isFinished(operation) {
    return operation.length > 0 ? false : true;
}

function unshiftSubResult(main, unshift) {
    return main.unshift(unshift.toString());
}

function clearDisplay() {
    display.textContent = '';
}

function backspaceDisplay() {
    display.textContent = display.textContent.slice(0, -1);
}

const display = document.querySelector('.display');
const numericAndOperatorButtons = document.querySelectorAll('.operator, .numeric');
const equalsButton = document.querySelector('.equals');
const backspaceButton = document.querySelector('.backspace');
const clearButton = document.querySelector('.clear');

numericAndOperatorButtons.forEach(button => button.addEventListener('click', (e) => {
    display.textContent += e.target.textContent;
}));

equalsButton.addEventListener('click', () => {
    display.textContent = evaluate(display.textContent);
});

backspaceButton.addEventListener('click', () => {
    backspaceDisplay();
});

clearButton.addEventListener('click', () => {
    clearDisplay();
});

window.addEventListener('keydown', (e) => {
    switch(true) {
        case e.key.match(/\d/) ? true : false:
            display.textContent += e.key;
            break;
        case e.key.match(/\+/) ? true : false:
            display.textContent += "+";
            break;
        case e.key.match(/\-/) ? true : false:
            display.textContent += "−";
            break;
        case e.key.match(/\*/) ? true : false:
            display.textContent += "×";
            break;
        case e.key.match(/\//) ? true : false:
            display.textContent += "÷";
            break;
        case e.key.match(/\./) ? true : false:
            display.textContent += ".";
            break;
        case e.key.match(/(\=|Enter)/) ? true : false:
            display.textContent = evaluate(display.textContent);
            break;
        case e.key.match(/Backspace/) ? true : false:
            backspaceDisplay();
            break;
    }
});