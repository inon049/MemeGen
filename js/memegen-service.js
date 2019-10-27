'use strict'
let gImgCount = 10
let gKeywords = {
    'funny': 6,
    'comics': 4,
    'dogs': 2
}
let gImgs = createImgs()
let gMeme = {
    selectedImgId: 5,
    selectedTxtIdx: 0,
    txts: []
}
let gDefaultTxtObj = {
    line: '',
    size: 30,
    align: 'center',
    color: 'white',
    outline: 'black',
    font: 'Impact',
    pos: { x: 0, y: 60 }
}

//***********dataBase funcs***********//

function createImg(id, keywords) {
    return {
        id,
        url: `assets/img/meme-imgs/${id}.jpg`,
        keywords
    }
}

function createImgs() {
    let imgs = []
    let nextId = 1
    for (let i = 0; i < gImgCount; i++) {
        imgs.push(createImg(nextId++, ['happy']))
    }
    return imgs
}

function getImgs() {
    return gImgs
}

function getKeywords() {
    return gKeywords
}
function getMemeObj() {
    return gMeme
}

//***********gMeme update funcs***********//
function setSelectedTxtLine(currValStr) {
    gDefaultTxtObj.pos.x = gCanvas.width / 2

    if (gMeme.txts.length === 0) {
        gMeme.txts.push(gDefaultTxtObj)
    }

    gMeme.txts[gMeme.selectedTxtIdx].line = currValStr
}

function setSelectedTxtSize(sign) {
    let size = gMeme.txts[gMeme.selectedTxtIdx].size
    gMeme.txts[gMeme.selectedTxtIdx].size = (sign === '-') ? size - 1 : size + 1
}
function setSelectedTxtAlign(alignStr) {
    gMeme.txts[gMeme.selectedTxtIdx].align = alignStr
}
function setSelectedTxtFill(color) {
    gMeme.txts[gMeme.selectedTxtIdx].color = color
}
function setSelectedTxtFont(fontName) {
    gMeme.txts[gMeme.selectedTxtIdx].font = fontName
}
function setSelectedTxtOutLine(color) {
    gMeme.txts[gMeme.selectedTxtIdx].outline = color
}
function removeSelectedTxt() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1)
    document.querySelector('.txt-line').value = ''
    console.log(gMeme.txts);
    drawTexts()
    gMeme.selectedTxtIdx--
    if (gMeme.txts.length === 0) {
        gDefaultTxtObj.line = ''
        gMeme.txts.push(gDefaultTxtObj)
        gMeme.selectedTxtIdx = 0

        console.log(gMeme.txts);
    }
}
function setSelectedImgId(id) {
    gMeme.selectedImgId = id
}
function setSelectedTxtIdx(idx) {
    gMeme.selectedTxtIdx = idx
    return gMeme.txts[idx].line
}
function setTxtObjPosByIdx(idx, x, y) {
    gMeme.txts[idx].pos = { x, y }
}

function addTxtObj() {
    let height;
    let width = gCanvas.width / 2
    if (gMeme.txts.length === 1) height = gCanvas.height - 60
    else if (gMeme.txts.length >= 2) height = gCanvas.height / 2
    var lastTxt = gMeme.txts[gMeme.selectedTxtIdx]
    let txtObj = {}
    txtObj.size = lastTxt.size
    txtObj.align = lastTxt.align
    txtObj.color = lastTxt.color
    txtObj.outline = lastTxt.outline
    txtObj.font = lastTxt.font
    txtObj.pos = { x: width, y: height }
    gMeme.txts.push(txtObj)
    gMeme.selectedTxtIdx++
}

function editMemeText(txtObj) {
    gMeme.txts[gMeme.selectedTxtIdx] = txtObj
}


