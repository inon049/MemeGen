'use strict'

let gCanvas
let gCtx

function init() {
    renderHomePage()



}
//********on funcs*******//
function onChooseImg(id) {
    setSelectedImgId(id)
    renderEditor()
}


//********canvas funcs*******//

function resizeCanvas() {
    let elContainer = document.querySelector('.canvas-container.container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetWidth
}

// sampleCanvas('.canvas-container.container','panleft pandown panright panup doubletap swipe tap press',funcName)
function sampleCanvas(selectorStr, eventsStr, funcName) {
    const elCanvas = document.querySelector(selectorStr);
    const hmrCanvas = new Hammer(elDrawingBoard);

    hmrDrawingBoard.on(eventsStr, funcName(ev))
}
//******canvas event funcs******//
function onMainCanvasEvent(ev) {
    //todo- sort events//
}
function onTextCanvasEvent(ev) {
    //todo- sort events//
}

//******renders******//
function renderHomePage() {
    let elMainContent = document.querySelector('main')
    let imgs = getImgs()
    let keywordsObj = getKeywords()
    let strHtml = `
    <section class="search flex">
    <div class="search-bar">
    <input class="search-input"type="text" name="" id="" placeholder="Enter search keyword"></input>
    <img src="assets/img/ICONS/search-icon.png" alt="" class="search-btn">
    </div>
    <div class="key-words flex container">`

    for (const keyword in keywordsObj) {
        let count = 1
        if (count < 4) {
            strHtml += `<a class="keyword" style="font-size:${keywordsObj[keyword] * 0.5}em">${keyword}<a>`
            count++
        }
    }
    strHtml += `<a class="more-keywords">more...</a></div>
</section>
    <section class="img-gal">
    <div class="container flex">`
    imgs.forEach(imgObj => {
        strHtml += `<img src="${imgObj.url}" data-id="${imgObj.id}" onclick="onChooseImg(${imgObj.id})">`
    });

    strHtml += ' </div></section>'

    elMainContent.innerHTML = strHtml
}

function renderEditor() {
    let elMainContent = document.querySelector('main')
    let strHtml = `
<div class="editor">
    <section class="display">
        <div class="canvas-container container">
            <canvas class="main-canvas"></canvas>
        </div>
    </section>
    <section class="controls">
        <input type="text" name="" class="txt-line" id="" placeholder="Add text Line">
        <div class="btn-container container">
            <div class="add-remove-btns">
                <button class="remove">remove</button>
                <button class="add">add</button>
            </div>
            <div class="txt-style-btns">
                <button class="align" data-align="right">right</button>
                <button class="align" data-align="center">center</button>
                <button class="align" data-align="left">left</button>
                <button class="fontsize" data-font="-">-</button>
                <button class="fontsize" data-font="+">+</button>
                <select name="" id="" aria-placeholder="Text font">
                    <option value="">font1</option>
                    <option value="">font2</option>
                </select>
                <input type="color" name="" id="fill-color">
                <input type="color" name="" id="outline-color">
            </div>
            <div class="stickers"></div>
        </div>
    </section>
</div>`
    elMainContent.innerHTML = strHtml
    gCanvas = document.querySelector('.main-canvas');
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
}
