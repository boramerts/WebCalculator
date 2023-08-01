/*
 * Created on Tue Aug 01 2023
 *
 * 2023 Bora Mert Şahin
 */

let input;
let formula = [];
let btnValue = "";
let hasSpace = true;
let fs = 64;
const screen = document.querySelector('#display');

function getNumber(ele) {
    var input = ele.innerText;
        if(input === "+" || input === "-" || input === "x" || input === "%") {
            formula.push(btnValue);
            formula.push(input);
            btnValue = ""
            hasSpace = true;
        }
        else if (input === "=") {
            formula.push(btnValue);
            btnValue = getResult();
            formula = [];
            formula.push(btnValue);
            onScreen();
        }
        else if (hasSpace){
            btnValue += input
             onScreen();
        }
}

function onScreen() {
    console.log("btnVal:" + btnValue);
    console.log(formula);
    screen.innerText = btnValue;
    scaleFontSize()
}

function clearScreen() {
    screen.innerText = "";
    btnValue = "";
    formula = [];
    hasSpace = true;
    fs = 64;
}

function scaleFontSize() {
    // Reset font-size to begin
    screen.style.fontSize = fs + "px";


    if (screen.scrollWidth > screen.clientWidth && hasSpace) {
        console.log(fs);
        fs -= 5;
        screen.style.fontSize = fs + "px";

        if (fs < 45) {
            hasSpace = false;
        }
    }
}

function getResult() {
    var result = 0;
    result += parseFloat(formula[0]);

    for (let i = 1; i < formula.length; i++) {
        console.log("Result: " + result);
        if (isNaN(parseFloat(formula[i]))) {
            result = evaluate(formula[i], formula[i+1], result);
        }
    }
    return result;
}

function evaluate(symbol, number, result) {
    switch (symbol) {
        case "+":
            return result + parseFloat(number);

        case "-":
            return result - parseFloat(number);

        case "x":
            return result * parseFloat(number);

        case "%":
            try {
                return result / parseFloat(number);
            } catch (error) {
                screen.innerText = "ERROR";
                return "error"
            }
            
    
        default:
            return result;
    }
}