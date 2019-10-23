'use strict'

let gCanvas
let gCtx

function init() {
    renderHomePage()
    // gCanvas = document.querySelector('.drawing-board');
    // gCtx = gCanvas.getContext('2d')
    // resizeCanvas()
    // sampleCanvas()
}
function renderHomePage() {
    let elMainContent = document.querySelector('main')
    let imgs=getImgs()
    let keywordsObj =getKeywords()
    let strHtml=`
    <section class="search flex">
    <input type="text" name="" id="" placeholder="Enter search keyword">
    <img src="" alt="" class="search-btn">
    <div class="key-words">`

    for(const keyword in keywordsObj){
        strHtml+=`<span class="keyword" style="font-size:${keywordsObj[keyword]*0.5}em">${keyword}</span>`
    }
    strHtml+=`</div>
</section>
    <section class="img-gal flex">`
 imgs.forEach(imgObj => {
     strHtml+=`<img src="${imgObj.url}" data-id="${imgObj.id}" onclick="onChooseImg(${imgObj.id})">`
 });
    
    strHtml+=' </section>'

    elMainContent.innerHTML=strHtml
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
