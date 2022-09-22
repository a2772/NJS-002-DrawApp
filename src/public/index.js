const socket = io()
var click = false
var movingMouse = false
var xPos = 0
var yPos = 0
var posPrevious = null
var color = 'black'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = window.innerWidth
const heigth = window.innerHeight

canvas.width = width
canvas.heigth = heigth

const users = document.getElementById('users')

console.log(`Heigth: Inner=${heigth}, canvas=${canvas.heigth}`)
console.log(`Width: Inner=${width}, canvas=${canvas.width}`)

canvas.addEventListener('mousedown', ()=>{
    click = true
})

canvas.addEventListener('mouseup', ()=>{
    click = false
})

canvas.addEventListener('mousemove', (e)=>{
    xPos = e.clientX
    yPos = e.clientY
    movingMouse = true
})

function changeColor(col){
    color = col
    context.strokeStyle = color
    context.stroke()
}
function deleteDrawing(){
    socket.emit('delete')
}
function createDrawing(){
    if(click && movingMouse && posPrevious!=null){
        let drawing = {
            xPos:xPos,
            yPos:yPos,
            color:color,
            posPrevious:posPrevious
        }
        //showDrawing(drawing)
        socket.emit('drawing',drawing)
    }
    posPrevious = {xPos:xPos,yPos:yPos}
    setTimeout(createDrawing,25)
}

socket.on('showDrawing',(drawing)=>{
    if(drawing!=null){
        context.beginPath()
        context.lineWidth = 3
        context.strokeStyle = drawing.color
        context.moveTo(drawing.xPos,drawing.yPos)
        context.lineTo(drawing.posPrevious.xPos,drawing.posPrevious.yPos)
        context.stroke()
    }else{
        context.clearRect(0,0,canvas.width,canvas.heigth)
    }
})

socket.on('users',(number)=>{
    var content = `<p>`
    content+=`Número de usuarios conectados: ${number}</p>`
    users.innerHTML = content
})

createDrawing()