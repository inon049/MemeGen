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
            color: 'red'
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


//***********gMeme funcs***********//
function setSelectedImgId(id) {
    gMeme.selectedImgId = id
}
function addMemeText(txtObj) {
    gMeme.txts.push(txtObj)
}

function editMemeText(txtObj){
    gMeme.txts[gMeme.selectedTxtIdx]=txtObj
}