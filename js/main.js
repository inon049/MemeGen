'use strict'

let gCanvas
let gCtx
let gSelection = true
let gIsDragging = false
function init() {
    renderHomePage()
}
//********on funcs*******//
function onSetFont(fontName) {
    setSelectedTxtFont(fontName)
    drawTexts()
}

function onChooseImg(id) {
    setSelectedImgId(id)
    renderEditor(id)
}


function onTxtInputChange(currValue, ev) {
    if (ev.keyCode !== 13) {
        setSelectedTxtLine(currValue)
        drawTexts()
    } else {
        onAddTxt()
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

function onAddTxt() {
    let line = document.querySelector('.txt-line')
    if (line.value) {
        line.value = ''
        console.log('test');
        line.focus()
        addTxtObj()
    }
}
//********canvas funcs*******//
function drawTexts() {
    let meme = getMemeObj()
    let count = 0
    drawImg(meme.selectedImgId)
    meme.txts.forEach(txtObj => {
        gCtx.textAlign = txtObj.align
        gCtx.font = `${txtObj.size}px ${txtObj.font}`;
        gCtx.fillStyle = txtObj.color;
        gCtx.fillText(txtObj.line, txtObj.pos.x, txtObj.pos.y);
        gCtx.strokeStyle = txtObj.outline
        txtObj.txtWidth = gCtx.measureText(txtObj.line).width
        if (count === meme.selectedTxtIdx && gSelection) {
            markSelectedTxt(txtObj)

        }
        gCtx.fillStyle = txtObj.color;
        gCtx.fillText(txtObj.line, txtObj.pos.x, txtObj.pos.y);
        gCtx.strokeText(txtObj.line, txtObj.pos.x, txtObj.pos.y);
        count++
    })
}
function markSelectedTxt(txtObj) {
    let txtRange = getTxtCoordsRange(txtObj)
    gCtx.fillStyle = 'rgba(0,0,0,0.3)';
    gCtx.fillRect(txtRange.startX, txtRange.startY, txtObj.txtWidth, txtObj.size);

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
    gCanvas.height = elContainer.offsetHeight
}
//------canvas events--------//
function sampleCanvas() {
    const elCanvas = document.querySelector('.canvas-container.container');
    const hmrCanvas = new Hammer(elCanvas);

    hmrCanvas.on('tap', (ev) => {
        onCanvasTapEvent(ev.srcEvent.offsetX, ev.srcEvent.offsetY)
    })
    hmrCanvas.on('pan', (ev) => {
        onCanvasPanEvent(ev.srcEvent.offsetX, ev.srcEvent.offsetY, ev)
    })
}
function onCanvasPanEvent(x, y, ev) {
    let draggedTxtIdx = checkIfTxt(x, y)
    if (draggedTxtIdx !== -1 && !ev.isFinal) {
        gIsDragging = true
        console.log(gIsDragging, '<draggin');
        setTxtObjPosByIdx(draggedTxtIdx, x, y)
        drawTexts()
    } else {
        gIsDragging = false
    }
}

function onCanvasTapEvent(x, y) {
    let clickedTxtIdx = checkIfTxt(x, y)
    if (clickedTxtIdx !== -1) {
        let line = document.querySelector('.txt-line')
        let txt = setSelectedTxtIdx(clickedTxtIdx)
        line.value = txt
        gSelection = true
        drawTexts()
        line.focus()
    } else {
        gSelection = false
        drawTexts()
    }
}
function checkIfTxt(x, y) {
    let meme = getMemeObj()
    return meme.txts.findIndex(txtObj => {
        let txtRange = getTxtCoordsRange(txtObj)
        return (x <= txtRange.endX && x >= txtRange.startX && y <= txtRange.endY && y >= txtRange.startY)
    })
}
function getTxtCoordsRange(txtObj) {
    let txtAling = txtObj.align
    let txtXpos = txtObj.pos.x
    let txtWidth = txtObj.txtWidth
    let txtRange = {
        startX: txtXpos,
        endX: txtXpos + txtObj.txtWidth,
        startY: txtObj.pos.y - txtObj.size,
        endY: txtObj.pos.y

    }
    if (txtAling === 'center') {
        txtRange.startX = txtXpos - txtWidth / 2
    }
    else if (txtAling === 'right') {
        txtRange.startX = txtXpos - txtWidth
    }
    else if (txtAling === 'left') {
        txtRange.startX = txtXpos
    }
    return txtRange
}

//******renders funcs******//
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
function renderEditor(bgImgId) {
    let elMainContent = document.querySelector('main')
    let strHtml = `
    <div class="editor">
        <section class="display">
            <div class="canvas-container container">
                <canvas class="main-canvas"></canvas>
            </div>
        </section>
        <section class="controls">  
            <div class="btn-container ">
            <input type="text" class="txt-line" style="position:relative" onkeyup="onTxtInputChange(this.value,event)" id="" placeholder="Add text Line">
                <div class="add-remove-btns flex">
                    <button class="remove" onclick="onRemoveTxt()"><img src="assets/img/ICONS/trash.png"/></button>
                    <button class="add" onclick="onAddTxt()"><img src="assets/img/ICONS/add.png"/></button>
                </div>
                <div class="txt-style-btns flex">
                    <button class="align" onclick="onChangeAlign(this)" data-align="right"><img src="assets/img/ICONS/align-left.png"/></button>
                    <button class="align" onclick="onChangeAlign(this)" data-align="center"><img src="assets/img/ICONS/align-center.png"/></button>
                    <button class="align" onclick="onChangeAlign(this)" data-align="left"><img src="assets/img/ICONS/align-right.png"/></button>
                    <button class="fontsize" onclick="onChangeSize(this)" data-font="-"><img src="assets/img/ICONS/font-size-.png"/></button>
                    <button class="fontsize" onclick="onChangeSize(this)" data-font="+"><img src="assets/img/ICONS/font-size+.png"/></button>
                    <select id="font-select" onchange="onSetFont(this.value)">
                        <option value=" Impact"> Impact</option>
                        <option value="Arial">Arial</option>
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
    elMainContent.innerHTML = strHtml
    gCanvas = document.querySelector('.main-canvas');
    gCtx = gCanvas.getContext('2d')
    resizeCanvas()
    sampleCanvas()
    drawImg(bgImgId)
}

