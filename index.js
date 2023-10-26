import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: "https://todolist-444a9-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

// aqui é o botao que tem a funcao de adicionar o que esta escrito e chama a funcao *appendItemToShoppingListEl*
addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    clearInputFieldEl() 
})
//essa funcao roda toda vez que tem uma alteracao no banco de dados do firebase
onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())

    clearShoppingListEl()

    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingListEl(currentItem)
    }
})

//funcao pra limpar a lista abaixo do botao
function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

//essa funcao limpa o campo INPUT toda vez que é clicado
function clearInputFieldEl() {
    inputFieldEl.value= ""
}

//essa funcao adiciona em formato de lista os itens
function appendItemToShoppingListEl(item) {
    let itemID = item
    let itemValue = itemID

    let newEl = document.createElement("li")
    newEl.textContent = itemID

    newEl.addEventListener("click", function (){
        console.log(itemValue)
    })

    shoppingListEl.append(newEl)
}
