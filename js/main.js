'use strict'

let gCanvas
let gCtx
function init() {
    renderHomePage()
}
//********on funcs*******//
function onChooseImg(id) {
    setSelectedImgId(id)
    renderEditor(id)
}
function onTxtInputChange(currValue, ev) {
    if (ev.keyCode !== 13) {
        setSelectedTxtLine(currValue)
        drawTexts()
    }
}
function onRemoveTxt() {
    removeSelectedTxt()
    drawTexts()
}
function onChangeAlign(el) {
    let alignStr = el.dataset.align
    setSelectedTxtAlign(alignStr)
    drawTexts()
}
function onChangeSize(el) {
    let sign = el.dataset.font
    setSelectedTxtSize(sign)
    drawTexts()
}
function onChangeOutline(color) {
    setSelectedTxtOutLine(color)
    drawTexts()
}
function onChangeFill(color) {
    setSelectedTxtFill(color)
    drawTexts()
}
function onAddTxt(){
    document.querySelector('.txt-line').value=''
    let meme =getMemeObj()
    let height; 
    if(meme.txts.length=1) height =gCanvas.height-150
    else if(meme.txts.length>1) height= gCanvas.height/2
    let txtObj= {
        line:'',
        size: 20, 
        align: 'left',
        color: document.getElementById('fill-color').value,
        outline:document.getElementById('outline-color').value,
        pos: { x: 100, y:height }
    }
    addTxtObj(txtObj)
}
//********canvas funcs*******//
function drawTexts() {
    let meme = getMemeObj()
    drawImg(meme.selectedImgId)
    meme.txts.forEach(txtObj => {
        gCtx.textAlign = txtObj.align
        gCtx.font = `${txtObj.size}px ${txtObj.font}`;
        gCtx.fillStyle = txtObj.color;
        gCtx.fillText(txtObj.line, txtObj.pos.x, txtObj.pos.y);
        gCtx.strokeStyle = txtObj.outline
        gCtx.strokeText(txtObj.line, txtObj.pos.x, txtObj.pos.y);
    })
}
function drawImg(imgId) {
    let imgs = getImgs()
    let ImgIdx = imgs.findIndex(imgObj => {
        return imgObj.id === imgId
    })
    const img = document.getElementById('temp-img');
    img.src = imgs[ImgIdx].url
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

}
function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}
function resizeCanvas() {
    let elContainer = document.querySelector('.canvas-container.container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = gCanvas.width
    //elContainer.offsetHeight
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
    <input class="search-input" type="text" name="" id="" placeholder="Enter search keyword"></input>
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
const newLocal = `
<div class="editor">
    <section class="display">
        <div class="canvas-container container">
            <canvas class="main-canvas"></canvas>
        </div>
    </section>
    <section class="controls">
        <input type="text" class="txt-line" onkeyup="onTxtInputChange(this.value,event)" id="" placeholder="Add text Line">
        <div class="btn-container container">
            <div class="add-remove-btns">
                <button class="remove" onclick="onRemoveTxt()"><img src="assets/img/ICONS/trash.png"/></button>
                <button class="add" onclick="onAddTxt()"><img src="assets/img/ICONS/add.png"/></button>
            </div>
            <div class="txt-style-btns">
                <button class="align" onclick="onChangeAlign(this)" data-align="right"><img src="assets/img/ICONS/align-right.png"/></button>
                <button class="align" onclick="onChangeAlign(this)" data-align="center"><img src="assets/img/ICONS/align-center.png"/></button>
                <button class="align" onclick="onChangeAlign(this)" data-align="left"><img src="assets/img/ICONS/align-left.png"/></button>
                <button class="fontsize" onclick="onChangeSize(this)" data-font="-"><img src="assets/img/ICONS/font-size-.png"/></button>
                <button class="fontsize" onclick="onChangeSize(this)" data-font="+"><img src="assets/img/ICONS/font-size+.png"/></button>
                <select id="font-select" onchange="onSetFont(this.value)">
                    <option value="">font1</option>
                    <option value="">font2</option>
                </select>
                <label for="fill-color"><img src="assets/img/ICONS/txt-color.png"/></label>
                <input type="color" id="fill-color" onchange="onChangeFill(this.value)"></input>
                <label for="outline-color"><img src="assets/img/ICONS/text-stroke.png"/></label>
                <input type="color" id="outline-color" onchange="onChangeOutline(this.value)"></input>
            </div>
            <div class="stickers"></div>
        </div>
    </section>
</div>`
function renderEditor(bgImgId) {
    let elMainContent = document.querySelector('main')
    let strHtml = newLocal
    elMainContent.innerHTML = strHtml
    gCanvas = document.querySelector('.main-canvas');
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
    drawImg(bgImgId)
}




































// couldent finish this solution on time so i went with simpler version, will probably make it work this weekend

// function renderTxtCanvas() {
//     let meme = getMemeObj()
//     let selectedTxtObj = meme.txts[meme.selectedTxtIdx]
//     let selectedTxtIdx = meme.selectedTxtIdx
//     let elTxtCanvas = document.getElementById(`txt-${selectedTxtIdx}`)
//     if (elTxtCanvas) {
//         gTxtBoxes[selectedTxtIdx].ctx.restore()
//         console.log('imhere');
//         console.log(gTxtBoxes[selectedTxtIdx].ctx);
//         drawText(selectedTxtObj, selectedTxtIdx)
//         drawImg(meme.selectedImgId)
//     } else {
//         let elCanvasContainer = document.querySelector('.canvas-container.container')

//         elCanvasContainer.innerHTML += `<canvas class="txt-canvas" id="txt-${selectedTxtIdx}" width="${gCanvas.width / 100 * 80}" height="${gCanvas.height / 100 * 30}">`
//         gTxtBoxes.push(createTxtCanvas(selectedTxtIdx))
//         drawImg(meme.selectedImgId)
//         drawText(selectedTxtObj, selectedTxtIdx)
//     }

// }
// function createTxtCanvas(idx) {
//     return {
//         canvas: document.getElementById(`txt-${idx}`),
//         ctx: document.getElementById(`txt-${idx}`).getContext('2d')
//     }
// }
// let ctx = gTxtBoxes[idx].ctx
// let canvas = gTxtBoxes[idx].canvas