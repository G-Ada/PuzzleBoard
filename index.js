const PIEZAS = document.getElementsByClassName('pieza');
const CONTENT = document.getElementsByClassName('content')
const DISPLAY_BUTTON = document.getElementsByClassName('displayButton')
const FORM_BUTTON = document.getElementById('getFormData')
const FORM = document.getElementById('form')
var TASKS = document.getElementsByClassName('tasks')
const BACKGROUND_IMAGE = document.getElementById('userImage')
const GAME_CONTAINER = document.getElementById('gameContainer')
const GET_IMAGE_BUTTON = document.getElementById('getUserImage')
const REFRESH_BUTTON = document.getElementById('refresh')
const SELECT_PIECES_NUMBER = document.getElementById('piecesNumber')
const TASKS_CONTAINER = document.getElementById('tasksContainer')
const GAME = document.getElementById('game')
const BUILD_GAME = document.getElementById('buildGame')

//FUNCIONES
var tasksArray = []
function getFormData() {
    for (let i = 0; i < TASKS.length; i++) {
        tasksArray.push(TASKS[i].value)
    }
    return tasksArray
}

function placeTask(task, cont, num) {
    console.log(task[num])
    if ((task[num] == undefined) || (task[num] == "")) {
        task[num] = "Coloque una consigna"
    }
    setTimeout(() => {
        cont.style.fontWeight = '400'
        cont.style.fontSize = '18px'
        cont.innerHTML = task[num]
    }, 200);
}

function changePieza(pieza) {
    pieza.style.transition = "all 0.2s ease 0.2s"
    pieza.style.backgroundColor = 'rgb(246, 239, 49)'
}

function showButton(pieza) {
    let displayButton = pieza.lastElementChild;
    displayButton.style.display = 'block'
}

function placeNumbers() {
    for (let i = 0; i < CONTENT.length; i++) {
        CONTENT[i].innerHTML = i + 1
    }
}

function adjustContainer(width, height) {
    if (width < screen.width) {
        GAME_CONTAINER.style.width = width + 'px'
    }
    if (height < screen.height) {
        GAME_CONTAINER.style.height = height + 'px'
    }

}

function placeUserImage() {
    let file = BACKGROUND_IMAGE.files[0]
    let reader = new FileReader()

    reader.onloadend = function () {
        let img = new Image()
        img.onload = function () {
            adjustContainer(img.width, img.height)
        }
        img.src = reader.result
        GAME_CONTAINER.style.backgroundImage = "url(" + reader.result + ")"
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

function changePiecesCuantity() {
    switch (SELECT_PIECES_NUMBER.value) {
        case "12":
            if (TASKS.length > 12) {
                removeTaskForm(12)
            }
            break;
        case "15":
            if (TASKS.length > 15) {
                removeTaskForm(15)
            }
            createTaskForm(15)
            break;
        case "20":
            createTaskForm(20)
            break;
        default:
            break;
    }
}

function removeTaskForm(num) {
    let tasks = TASKS.length
    let task = TASKS_CONTAINER.children
    for (let i = tasks - 1; i >= num; i--) {
        task[i].remove()
    }
}

function createTaskForm(num) {
    let tasks = TASKS.length
    for (let i = (tasks + 1); i < (num + 1); i++) {
        let div = document.createElement('div')
        let label = document.createElement("label")
        let input = document.createElement('input')
        label.setAttribute('for', 'pieceContent')
        label.innerHTML = i
        input.setAttribute('class', 'tasks')
        input.setAttribute('type', 'textarea')
        div.appendChild(label)
        div.appendChild(input)
        TASKS_CONTAINER.appendChild(div)
    }

}

function addPieces() {
    let num = SELECT_PIECES_NUMBER.value
    let dif = num - PIEZAS.length
    let onePiece = PIEZAS[0]
    if (dif > 0) {
        for (let i = 0; i < dif; i++) {
            let newPiece = onePiece.cloneNode(true)
            GAME_CONTAINER.appendChild(newPiece)
        }
        for (let i = 0; i < PIEZAS.length; i++) {
            PIEZAS[i].style.width = 'calc((100%) / 5)'
        }
    }
}

function startGame(){
BUILD_GAME.style.display = 'none'
GAME.style.display = 'block'
}

function event(){
    for (let i = 0; i < PIEZAS.length; i++) {
        console.log(PIEZAS.length)
        PIEZAS[i].addEventListener('click', (ev) => {
            changePieza(PIEZAS[i])
            placeTask(tasksArray, CONTENT[i], i)
            setTimeout(() => {
                showButton(PIEZAS[i])
            }, 200);
        })
    }
    for (let i = 0; i < DISPLAY_BUTTON.length; i++) {
        DISPLAY_BUTTON[i].addEventListener('click', (ev) => {
            PIEZAS[i].style.transition = 'all 0.2s ease 0.2s'
            PIEZAS[i].style.visibility = 'hidden'
        })
    }
}

//EVENTOS

FORM_BUTTON.addEventListener('click', () => {
    getFormData()
    placeUserImage()
    addPieces()
    placeNumbers()
    event()
    startGame()
})

REFRESH_BUTTON.addEventListener('click', () => {
    window.location.reload()
})

SELECT_PIECES_NUMBER.addEventListener('change', changePiecesCuantity)

//LLAMANDO RESTO DE LAS FUNCIONES
