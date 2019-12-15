let gKeywordCountMap = {};
let gNextId = 1;
let gTxtId = 1;
let gImgs = [
    createImg('imgs/001.jpg', ['trump']),
    createImg('imgs/002.jpg', ['puppy']),
    createImg('imgs/003.jpg', ['kid', 'succesful']),
    createImg('imgs/004.jpg', ['baby', 'dog', 'sleep']),
    createImg('imgs/005.jpg', ['cat', 'sleep']),
    createImg('imgs/006.jpg', ['wonka']),
    createImg('imgs/007.jpg', ['kid', 'evil']),
    createImg('imgs/008.jpg', ['oldman']),
    createImg('imgs/009.jpg', ['alien', 'history']),
    createImg('imgs/010.jpg', ['kid']),
    createImg('imgs/011.jpg', ['obama', 'laugh']),
    createImg('imgs/012.jpg', ['kiss', 'boxing']),
    createImg('imgs/013.jpg', ['leonardo']),
    createImg('imgs/014.jpg', ['morpheous']),
    createImg('imgs/015.jpg', ['lotr', 'one does not simply']),
    createImg('imgs/016.jpg', ['star trek']),
    createImg('imgs/017.jpg', ['putin']),
    createImg('imgs/018.jpg', ['buzz'])
];

let gMeme = {
    selectedImgId: 1, selectedTxtIdx: 0,
    txts: [
        {
            id: gTxtId++,
            line: 'Lorem ipsum dolor sit amet',
            size: 22,
            align: 'left',
            color: '#ffffff',
            stroke: '#000000',
            x: 20,
            y: 50,
            h: 22,
            w: 0
        }
    ]
};

function createImg(url, keywords) {
    return {
        id: gNextId++,
        url,
        keywords
    };
}

function getImgUrlToDraw(id) {
    return gImgs[getImgIdxById(id)].url;
}

function getImgIdxById(id) {
    return gImgs.findIndex(function (img) {
        return img.id === id;
    });
}

function getImgById(id) {
    return gImgs.find((img) => {
        return img.id === id;
    });
}

function getImgsToRender() {
    return gImgs;
}

function getGmeme() {
    return gMeme;
}

function setGmemeId(id) {
    gMeme.selectedImgId = id;
}

function setGmemeTxtIdx(idx) {
    gMeme.selectedTxtIdx = idx;
}

function setCurrTxtStroke(val) {
    gMeme.txts[gMeme.selectedTxtIdx].stroke = val;
}

function setCurrTxtFillColor(val) {
    gMeme.txts[gMeme.selectedTxtIdx].color = val;
}

function setCurrTxtFontSize(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].size += diff;
}

function setCurrTxtYPos(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].y += diff;
}

function setCurrTxtXPos(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].x += diff;
}

function setCurrTxtLine(elTxt) {
    let txt = elTxt.value;
    gMeme.txts[gMeme.selectedTxtIdx].line = txt;
}

function addTxt() {
    if (gMeme.txts.length > 2) return;

    let txt = {
        id: gTxtId++,
        line: 'New Text',
        size: 35,
        align: 'left',
        color: '#ffffff',
        stroke: '#000000',
        x: 20,
        y: 0,
        h: 35,
        w: 0
    }
    gMeme.selectedTxtIdx = gMeme.txts.length ? ++gMeme.selectedTxtIdx : 0;
    switch (gMeme.selectedTxtIdx) {
        case 0:
            txt.y = (gCanvas.height / 5);
            break;
        case 1:
            txt.y = (gCanvas.height - (gCanvas.height / 4));
            break;
        case 2:
            txt.y = (gCanvas.height / 2);
            break;
    }
    gMeme.txts.push(txt);
    drawText(gMeme.txts[gMeme.selectedTxtIdx]);
    document.querySelector('.txt-editor').value = gMeme.txts[gMeme.selectedTxtIdx].line;
}

function deleteCurrTxt() {
    if (gMeme.selectedTxtIdx < 0) return;
    gMeme.txts.splice(gMeme.selectedTxtIdx--, 1);
}

function setCurrTxtWidth(num){
    gMeme.txts[gMeme.selectedTxtIdx].w = num;
}

function setCurrTxtHeight(num){
    gMeme.txts[gMeme.selectedTxtIdx].h = num;
}

function getCurrTxt(){
    return gMeme.txts[gMeme.selectedTxtIdx];
}