validNum=0
lastNan=true
preDec=true
isNeg=false
sqrt=false
op=""
display=""

function updateScreen() {
    document.getElementById("screen").innerHTML = display
}

function rad() {
    changeColor("sqrt")
    if(display=="" && sqrt==false) {
        op="sqrt"
        display=display + op
        sqrt=true
    }
    updateScreen()
}

function operation(oper) {
    changeColor(oper)
    if(validNum==2 || (sqrt==true && validNum==1)) { calculate() }
    if(validNum > 0 && lastNan==false && sqrt==false) {
        op=oper
        display = display + op
        lastNan=true
        preDec=true
        isNeg=false
        updateScreen()
    }
}

function decimal() {
    changeColor(".")
    if(preDec==true && lastNan==false) {
        display = display + "."
        preDec=false
        updateScreen()
    }
}

function negative() {
    changeColor("neg")
    if(lastNan==true && isNeg==false) {
        display = display + "-"
        
        updateScreen()
    }
    isNeg=true
}

function numClick(value) {
    changeColor(value)
    display = display + value
    if(lastNan) { validNum++ }
    lastNan=false
    updateScreen()
}

function rem() {
    changeColor("del")
    if(display!="") {
        if(display.length==1) { 
            clearQueue() 
        }
        else {
            remChar=display.substring(display.length - 1)
            preRemChar=display.substring(display.length - 2, display.length - 1)
            if(validNum==2 && remChar=="-" && isNeg==true) {
                isNeg==false
            }
            else if(preRemChar=="+" || preRemChar=="-" || preRemChar=="x" || preRemChar=="/" || preRemChar=="%") { 
                validNum--
                lastNan = true
            }
            else if(remChar==".") { 
                preDec = true 
                lastNan=false
            }
            else if(remChar=="+" || remChar=="-" || remChar=="x" || remChar=="/" || remChar=="%") { 
                op="" 
                lastNan=false
            }
            else if(remChar=="t") {
                clearQueue()
            }

            if(display!="") {
                display = display.substring(0, display.length - 1)
            }
        }
    }
    updateScreen()
}

function clean() {
    changeColor("C")
    clearQueue()
}

function clearQueue() {
    validNum=0
    lastNan=true
    preDec=true
    isNeg=false
    sqrt=false
    display=""
    updateScreen()
}

function equals() {
    changeColor("=")
    calculate()
}

function calculate() {
    if(op!="" && validNum==2) {
        firstNum=parseFloat(display)
        secondNum=parseFloat(display.substring(firstNum.toString().length + 1))
        temp=doOp(firstNum, secondNum, op)
        clearQueue()
        display=temp.toString()
        lastNan=false
        for(i=0; i < display.length; i++) {
            if(display.substring(i, i+1)==".") {
                preDec=false
            }
        }
        if(display.substring(0, 1)=="-") { isNeg=true }
        validNum++
        updateScreen()
    }
    else if(op=="sqrt" && validNum==1) {
        num=parseFloat(display.substring(4))
        num = Math.sqrt(num)
        clearQueue()
        display=num.toString()
        lastNan=false
        for(i=0; i < display.length; i++) {
            if(display.substring(i, i+1)==".") {
                preDec=false
            }
        }
        validNum++
        updateScreen()
    }
}

function doOp(firstNum, secondNum, oper) {
    total=0
    if(oper=="+") {
        total=firstNum+secondNum
    }
    else if(oper=="-") {
        total=firstNum-secondNum
    }
    else if(oper=="x") {
        total=firstNum*secondNum
    }
    else if(oper=="/" && secondNum != 0) {
        total=firstNum/secondNum
    }
    else if(oper=="%") {
        total=firstNum%secondNum
    }
    return total;
}

function changeColor(id) {
    document.getElementById(id).style.background='#ff8c00'
    timerId = setTimeout(() => { 
        if(id=="C") {
            document.getElementById(id).style.background='red'
        }
        else if(id=="=") {
            document.getElementById(id).style.background='#39a039'
        }
        else {
            document.getElementById(id).style.background='#000ba0'
        }}, 100)
}