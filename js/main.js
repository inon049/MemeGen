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
    <div class="search-bar">
    <input class="search-input"type="text" name="" id="" placeholder="Enter search keyword"></input>
    <img src="assets/img/ICONS/search-icon.png" alt="" class="search-btn">
    </div>
    <div class="key-words flex container">`

    for(const keyword in keywordsObj){
        let count =1
        if(count<4){
            strHtml+=`<a class="keyword" style="font-size:${keywordsObj[keyword]*0.5}em">${keyword}<a>`
            count++
        }
    }
    strHtml+=`<a class="more-keywords">more...</a></div>
</section>
    <section class="img-gal">
    <div class="container flex">`
 imgs.forEach(imgObj => {
     strHtml+=`<img src="${imgObj.url}" data-id="${imgObj.id}" onclick="onChooseImg(${imgObj.id})">`
 });
    
    strHtml+=' </div></section>'

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
