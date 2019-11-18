const letters = ["A", "B", "C", "D", "E"];

var canvas, context;

var numberVariables = 1;
var tableStates = [];
var expression = "( NOT A AND B )";
var tableData = [];

function setup(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    let select = document.getElementById("selectNumVar");
    select.addEventListener("change", update);
    for (let i = 1; i < 6; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
    
    update();
}

function update(){
    let select = document.getElementById("selectNumVar");
    numberVariables = parseInt(select.options[select.selectedIndex].value);
    expression = document.getElementById("expression").innerHTML;
    updateTable();
    drawGraph();
}

function drawGraph(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < (numberVariables + 1); i++) {
        let frequency = 20;
        let x = 10;
        let y = 25 * (i + 1);
        context.fillText(tableData[0][i], x, y);

        x = 50;

        for (let j = 1; j < tableData.length; j++) {
            context.beginPath();
            context.moveTo(x, y);
            if (tableData[j][i] == 1) y -= 10;
            context.lineTo(x, y);
            x += frequency;
            context.lineTo(x, y);
            if (tableData[j][i] == 1) y += 10;
            context.lineTo(x, y);
            context.stroke();
        }
    }
}

////////////////////////////

const ports = ["NOT", "AND", "OR"];

function getResult(values, expressionArray = expression.split(" ")) {
    let keywordStack = [], variableStack = [], parentheseCounter = 0;
    let allStack = [];
    
    if (expressionArray[0] != '(') {
        console.log("Expression must start with a (");
        return "Error";
    }
    
    while (expressionArray.length > 0) {
        let evaluating = expressionArray.pop();
        if (ports.includes(evaluating)) {
            keywordStack.push(evaluating);
        } else if (evaluating == '(') {
            parentheseCounter++;
        } else if (evaluating == ')') {
            parentheseCounter--;
        } else if (letters.includes(evaluating)) {
            variableStack.push(evaluating);
            evaluating = values[letters.indexOf(evaluating)];
        } else {
            console.log("Error: Can't evaluate expression - " + evaluating);
        }
        
        allStack.push(evaluating);
    }
    
    if (parentheseCounter != 0) return null;
    
    return evaluate(allStack) ? 1 : 0;
}

function evaluate(expr) {
    let varStack = [], portStack = [];

    while (expr.length > 0) {
        let ev = expr.pop();
        if (ev === 0 || ev === 1) {
            varStack.push((ev === 1 ? true : false));
            if (portStack.length > 0) {
                if (ev == "NOT") {
                    let r = gate(portStack.pop(), [varStack.pop()]);
                    varStack.push(r);
                } else {
                    let arr = [];
                    arr.push(varStack.pop());
                    arr.push(varStack.pop())
                    let r = gate(portStack.pop(), arr);
                    varStack.push(r);
                }
            }
        } else if (ports.includes(ev)) {
            portStack.push(ev);
        } else {
            console.log("Error: Can't evaluate - " + ev);
        }
    }

    return varStack.pop();
}

function gate(type, values) {
    let retValue;
    
    if (type == "NOT") {
        retValue = !values[0];
    } else if (type == "AND") {
        retValue = !values.includes(false);
    } else if (type == "OR") {
        retValue = values.includes(true);
    }
    
    return retValue;
}

//////////////////////////////

function updateTable() {
    let table = document.getElementById("table");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    tableData = [];
    
    let names = [];
    let headerRow = document.createElement("tr");
    for (let i = 0; i < numberVariables; i++) {
        let headerData = document.createElement("th");
        headerData.innerHTML = letters[i];
        names.push(letters[i]);
        headerRow.appendChild(headerData);
    }
    let resultHeader = document.createElement("th");
    resultHeader.innerHTML = "Result";
        names.push("Result");
    headerRow.appendChild(resultHeader);
    table.appendChild(headerRow);
    tableData.push(names);
    
    for (let i = 0; i < 2 ** numberVariables; i++) {
        let binaryArray = convertToBinaryArray(i);
        let stateRow = document.createElement("tr");
        for (let j = 0; j < numberVariables; j++) {
            let stateData = document.createElement("td");
            let data = i === 0 ? 0 : binaryArray[j];
            stateData.innerHTML = data;
            stateRow.appendChild(stateData);
        }
        let resultData = document.createElement("td");
        let result = getResult(binaryArray);
        resultData.innerHTML = result;
        stateRow.appendChild(resultData);
        table.appendChild(stateRow);

        binaryArray.push(result);
        tableData.push(binaryArray);
    }
}

function convertToBinaryArray(number) {
    let array = [];
    
    while (number !== 0) {
        number /= 2
        let bit;
        if (number % 1 === 0) {
            bit = 0;
        } else {
            bit = 1;
            number = Math.floor(number);
        }
        array.unshift(bit);
    }
    
    while(array.length < numberVariables) {
        array.unshift(0);
    }

    return array;
}