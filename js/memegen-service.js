'use strict'
let gImgCount=10
let gKeywords = { 'happy': 12, 'funny puk': 1 }
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

function createImg(id, keywords) {
    return {
        id,
        url: `assets/img/meme-imgs/${id}.jpg`,
        keywords
    }
}

function createImgs(){
    let imgs=[]
    let nextId=1
for (let i=0;i<gImgCount;i++){
imgs.push(createImg(nextId++,['happy']))
}
  return imgs
}
function getImgs(){
    return gImgs
}
function getKeywords(){
    return gKeywords
}