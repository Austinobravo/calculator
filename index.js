class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand= ''
        this.operation = null

    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }
    appendNumber(number){
        if (number == '.' && this.currentOperand.includes('.'))return {
            
        }
        this.currentOperand = this.currentOperand.toString()+number.toString()

    }
    typeOfOperation(operation){
        if (this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const currenttNumber = parseFloat(this.currentOperand)
        if(prev == '' || currenttNumber =='') return 
        switch (this.operation) {
            case '+':
                computation= prev+currenttNumber
                break;
            case '-':
                computation= prev-currenttNumber
                break;
            case '//':
                computation= prev/currenttNumber
                break;
            case '*':
                computation= prev*currenttNumber
                break;
        
            default:
                //return
                break;
        }
        this.currentOperand = computation
        this.operation =null
        this.previousOperand= ''

    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integer = parseFloat(stringNumber.split('.')[0])
        const decimal = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integer)){
            integerDisplay=''
        }else{
            integerDisplay=integer.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if (decimal != null) {
            return integerDisplay + '.' + decimal
        }else{
            return integerDisplay
        }

    //     const floatNumber = parseFloat(number)
    //     if(isNaN(floatNumber))return ''
    //     return floatNumber.toLocaleString('en')
    //     return number
     }
    updateDisplay(){
        this.currentOperationText.innerText= this.getDisplayNumber(this.currentOperand) 
        if (this.operation != null) {
            this.previousOperationText.innerText = this.getDisplayNumber(this.previousOperand)  + " " + this.operation
            
        }else{
            this.previousOperationText.innerText = ''
        }

    }
}

const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperationText = document.querySelector('[data-previous]')
const currentOperationText = document.querySelector('[data-current]')

const calculator = new Calculator(previousOperationText, currentOperationText)

numberButton.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.typeOfOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button=>{
    calculator.delete()
    calculator.updateDisplay()
})