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
    display.textContent = display.textContent.slice(0, -1);
});

clearButton.addEventListener('click', () => {
    display.textContent = '';
});
