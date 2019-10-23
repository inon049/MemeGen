'use strict';

let gCanvas
let gCtx

function init() {
    gCanvas = document.querySelector('.drawing-board');
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
    sampleCanvas()
}


function resizeCanvas() {
    let elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

// sampleCanvas('.canvas-container.container','panleft pandown panright panup doubletap swipe tap press',funcName)
function sampleCanvas(selectorStr, eventsStr, funcName) {
    const elCanvas = document.querySelector(selectorStr);
    const hmrCanvas = new Hammer(elDrawingBoard);

    hmrDrawingBoard.on('panleft pandown panright panup doubletap swipe tap press', funcName(ev))
}
