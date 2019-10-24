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
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'black',
            outline: 'blue',
            pos: { x: 100, y: 50 }
        }
    ]
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
    gMeme.txts[gMeme.selectedTxtIdx].line = currValStr
}
function setSelectedTxtOutLine(color) {
    gMeme.txts[gMeme.selectedTxtIdx].line = color
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
function setSelectedTxtOutLine(color) {
    gMeme.txts[gMeme.selectedTxtIdx].outline = color
}
function removeSelectedTxt() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1)
    if (gMeme.txts.length === 0) gMeme.txts.push({
        line: 'I never eat Falafel',
        size: 20, align: 'rigth',
        color: 'red',
        outline: 'blue',
        pos: { x: 100, y: 50 }
    })
}
function setSelectedImgId(id) {
    gMeme.selectedImgId = id
}
function addTxtObj(txtObj) {
   gMeme.txts.push(txtObj)
   gMeme.selectedTxtIdx++
}
function editMemeText(txtObj) {
    gMeme.txts[gMeme.selectedTxtIdx] = txtObj
}


