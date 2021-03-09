//dec var
const display = document.querySelector('.display-txt');
const displayOpp = document.querySelector('.opp-display');
const numberButtons = document.querySelectorAll('.number-btn');
const clearAllBtn = document.querySelector('.clear');
const operateButtons = document.querySelectorAll('.opp');
const equals = document.querySelector('.equals');
const dec = document.querySelector('.dec');
let currentOperation = null;
let firstOperator = '';
let secondOperator = '';
let shouldResetScreen = false;

//set operator
function setOperator (operator) {
    if (currentOperation !== null) evaluate()
    firstOperator = display.textContent;
    currentOperation = operator;  
    shouldResetScreen = true;
}
operateButtons.forEach(button => {
    button.addEventListener("click",() => setOperator(button.textContent));
})

//update display
numberButtons.forEach(button => { 
    button.addEventListener('click', () => appendNumber(button.textContent)) 
})
       
function appendNumber (number) {
    if(display.textContent === '0' ||shouldResetScreen) resetScreen();
        display.textContent += number;
    if (display.textContent.length = 17) {
        display.textContent = display.textContent.toString().slice(0, 16)
    }
}

//dec check
function addDec() {
    if(shouldResetScreen)resetScreen();
    if (display.textContent === '') display.textContent = '0';
    if (display.textContent.includes('.')) return;
    display.textContent += '.'
    }

dec.addEventListener('click', addDec)

//reset screen
function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}

// delete button
const deleteBtn = document.querySelector('.delete');

function deleteNum () {
    display.textContent = display.textContent.toString().slice(0, -1);
}

deleteBtn.addEventListener('click', deleteNum)

//clear all
function clearAll () {
    display.textContent = '0';
    firstOperator = '';
    secondOperator = '';
    currentOperation = null;
}

clearAllBtn.addEventListener('click', clearAll);

//calculate number
function evaluate () {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "÷" && display.textContent === "0") {
        alert("Cannot divide by zero");
        clearAll();
        return;
        }
    secondOperator = display.textContent;
    console.log(firstOperator, currentOperation, secondOperator)
    console.log(operate(currentOperation, firstOperator, secondOperator))
    display.textContent = roundResult(operate(currentOperation, firstOperator, secondOperator))
    currentOperation = null;
    shouldResetScreen = true;
    }

function roundResult (number) {
    return Math.round(number * 1000)/1000
}
equals.addEventListener('click', evaluate);

//operators
function addition (a, b) {
   return a + b;
}

function subtraction (a, b) {
    return a - b;
}

function multi (a, b) {
    return a * b;
}

function division (a, b) {
    return a/b;
}

function operate (operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
            return addition(a, b);
            break;
        case '-' :
            return subtraction(a, b);
            break;
        case '×':
            return multi(a, b);
            break;
        case '÷':
            if (b === 0) return null;
            else return a / b;
            break;
        default:
            return null;
    }
}

//keyboard funcionality
function setInput (e) {
    if(e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if(e.key === '.') addDec();
    if(e.key === "=" || e.key ==="Enter") evaluate();
    if(e.key === "Backspace") deleteNum();
    if(e.key ==="Escape") clearAll();
    if (e.key ==="+" || e.key === "-" || e.key ==="*" || e.key === "/") {
        setOperator(oppKey(e.key))
    }
}

function oppKey (opp) {
    if (opp === "+") return "+";
    if (opp === "-") return "-";
    if (opp === "*") return "×";
    if (opp === "/") return "÷";
}

window.addEventListener('keydown', setInput);