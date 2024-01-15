let totalAmount = document.getElementById("total-amount")
let userAmount = document.getElementById("user-amount")
const checkAmountButton = document.getElementById("check-amount")
const totalAmountButton = document.getElementById("total-amount-button")
const productTitle = document.getElementById("product-title")
const errorMessage = document.getElementById("budget-error")
const productTitleError = document.getElementById("product-title-error")
const productCostError = document.getElementById("product-cost-error")
const amount = document.getElementById("amount")
const expenditureValue = document.getElementById("expenditure-value")
const list = document.getElementById("list")
const balanceValue = document.getElementById("balance-amount")
let tempAmount = 0
/**
 * Funciones para el presupesto
 */
totalAmountButton.addEventListener('click', () => {
    tempAmount = totalAmount.value
    /**
     * Nos aseguramos de que tenemos un valor valido
     */
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide")
    } else {
        errorMessage.classList.add("hide")
        amount.innerHTML = tempAmount
        balanceValue.innerText = tempAmount - expenditureValue.innerText
        totalAmount.value = ""
    }
})
/**
 * habilitamos los botones para editar y borrar cargos
 */
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit")
    Array.from(editButtons).forEach(element => {
        element.disable = bool
    })
}
/**
 * Modificamos la lista de elementos
 */
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement
    let currentBalance = balanceValue.innerText
    let currentExpense = expenditureValue.innerText
    let parentAmount = parentDiv.querySelector(".amount").innerText
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText
        productTitle.value = parentText
        userAmount.value = parentAmount
        disableButtons(true)
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount)
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount)
    parentDiv.remove()
}
/**
 * Creamos la lista de funciones
 */
const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement("div")
    subListContent.classList.add("sublist-content", "flex-space")
    list.appendChild(subListContent)
    subListContent.innerHTML = `<p class='product'>${expenseName}</p><p class='amount'>${expenseValue}</p>`
    let editButton = document.createElement("button")
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit")
    editButton.style.fontSize="1.2em"
    editButton.addEventListener('click', () => {
        modifyElement(editButton, true)
    })
    let deleteButton = document.createElement("button") 
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete")
    deleteButton.style.fontSize = "1.2em"
    deleteButton.addEventListener('click', () => {
        modifyElement(deleteButton)
    })
    subListContent.appendChild(editButton)
    subListContent.appendChild(deleteButton)
    document.getElementById("list").appendChild(subListContent)
}
/**
 * Agregamos las funciones para gastos
 */
checkAmountButton.addEventListener('click', () => {
    /**
     * comprobamos si esta vacio
     */
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove("hide")
        return false
    }
    disableButtons(false)
    let expenditure  = parseInt(userAmount.value)
    let sum = parseInt(expenditureValue.innerText) + expenditure
    expenditureValue.innerText = sum
    balanceValue.innerText = totalBalance
    listCreator(productTitle.value, userAmount.value)
    productTitle.value=""
    userAmount.value=""
})