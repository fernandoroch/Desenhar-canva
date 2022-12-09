const buttonColor = document.querySelector("#escolher-cor button");
const buttonClear = document.querySelector('.clear-canvas')
const selectColor = document.querySelector("#escolher-cor #ecolher-cor");
const espesuraLinha = document.querySelector('#input-espesura #espesura-linha')
const allColors = document.querySelector(".colorArea");
let colorEscolhido = '#000000'
let espesuraEscolhida = 5
let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let mouseX 
let mouseY 


/* Selecionando novas cores */
function todasAsCores() {
  let last = color[color.length - 1];
  allColors.innerHTML += `<div data-color="${last}" style="background-color: ${last}" class="color"></div>`;
}

function escolherCor(e) {
  e.preventDefault();
  color.push(selectColor.value);
  todasAsCores();
  eventoSelecaoCores()
}

function eventoSelecaoCores() {
    document.querySelectorAll('.color').forEach((e) => {
        e.addEventListener('click', selecionandoCor)
    })
}
eventoSelecaoCores()

/* Definindo cor para desenhar */
function selecionandoCor(e) {
    colorEscolhido = e.target.getAttribute('data-color')
    console.log(colorEscolhido);
}

/* definir espesura da linha */

function definirEspesura(e) {
    espesuraEscolhida = espesuraLinha.value
}

/* Movimentando a caneta do canvas */

function mouseDown(e) {
    mouseX = e.pageX - canvas.offsetLeft
    mouseY = e.pageY - canvas.offsetTop
    canvas.addEventListener('mousemove', mouseMove)
}

function mouseMove(e) {
    let poiterX = e.pageX - canvas.offsetLeft
    let poiterY = e.pageY - canvas.offsetTop

    
    ctx.beginPath()
    ctx.lineWidth = espesuraEscolhida;
    ctx.lineJoin = "round"
    ctx.moveTo(mouseX, mouseY)
    ctx.lineTo(poiterX, poiterY)
    ctx.closePath();
    ctx.strokeStyle = colorEscolhido;
    ctx.stroke()
    
    mouseX = poiterX
    mouseY = poiterY
}


function mouseUp(e){
    canvas.removeEventListener('mousemove', mouseMove)
}

/* Todos os eventos adicionados*/

canvas.addEventListener('mousedown', mouseDown)
canvas.addEventListener('mouseup', mouseUp)

buttonColor.addEventListener("click", escolherCor);
buttonClear.addEventListener('click', clearCanvas)
espesuraLinha.addEventListener('click',definirEspesura)

function clearCanvas(){
    ctx.setTransform(1,0,0,1,0,0)
    ctx.clearRect(0,0, ctx.canvas.width , ctx.canvas.height)
}
