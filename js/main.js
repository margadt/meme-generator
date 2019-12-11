let gCurrImg;
let gStrokeColor = '#000000';
let gFillColor = '#ffffff';
let gTxtId = 1;
let isProcessing = 0;
let gMeme = {
    selectedImgId: 1, selectedTxtIdx: 0,
    txts: [
        {
            id: gTxtId++,
            line: 'Mother Fu....',
            size: 35,
            align: 'left',
            color: 'white',
            x: 50,
            y: 50,
            h: 0,
            w: 0
        }
    ]
};


function init() {
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d')

    gCanvas.width = 500;
    gCanvas.height = 500;

    document.querySelector('.fill-color').value = '#ffffff';
    renderPictures();

    gCanvas.addEventListener('click', check, false);

    // window.addEventListener('resize',
    //     function () {
    //         gCanvas.width = window.innerWidth - (window.innerWidth / 5);
    //         gCanvas.height = window.innerHeight - (window.innerHeight / 5);
    //         drawImg()
    //     })
}


function drawImg() {
    if (gCurrImg)
        gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
    else {
        gCurrImg = new Image();
        gCurrImg.onload = () => {
            gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
        };
        gCurrImg.src = getImgUrlToDraw(1);
    }
}

function drawText(txt) {
    if (++isProcessing >= 3) {
        return;
    } else {
        isProcessing = 0;
    }
    gCtx.save();
    gCtx.font = `bold ${txt.size}px Impact`;
    gCtx.textAlign = gMeme.txts[gMeme.selectedTxtIdx].align;
    gCtx.fillStyle = gFillColor;
    gCtx.strokeStyle = gStrokeColor;
    gCtx.fillText(txt.line.toUpperCase(), txt.x, txt.y);
    gCtx.strokeText(txt.line.toUpperCase(), txt.x, txt.y);
    gMeme.txts[gMeme.selectedTxtIdx].w = gCtx.measureText(txt.line.toUpperCase()).width;
    gMeme.txts[gMeme.selectedTxtIdx].h = gMeme.txts[gMeme.selectedTxtIdx].size;
    gCtx.restore();
}

function renderPictures() {
    let imgs = getImgsToRender();
    let elImgContaier = document.querySelector('.imgs-container');
    let renderImgs = imgs.map((img) => {
        return `<img src=${img.url} onclick="onSelectImg(${img.id})"> \n`
    });

    elImgContaier.innerHTML = renderImgs.join('');


}

function onSelectImg(id) {
    let img = getImgById(id);
    gCurrImg = new Image();
    gCurrImg.src = img.url;

    gMeme.selectedImgId = id;
    gMeme.selectedTxtIdx = 0;

    renderAll();
}

function onSetColor() {
    gStrokeColor = document.querySelector('.color').value;
    renderAll();
}

function onSetFillColor() {
    gFillColor = document.querySelector('.fill-color').value;
    renderAll();
}


function onSetFontSize(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].size += diff;
    renderAll();
}

function renderTxtsOnCanvas() {
    if (gMeme.txts.length > 0) {
        gMeme.txts.forEach(txt => drawText(txt));
    };
}

function onSetTxtYPos(diff) {
    gMeme.txts[gMeme.selectedTxtIdx].y += diff;

    renderAll()
}

function onSetTxt(elTxt) {
    let txt = elTxt.value;
    gMeme.txts[gMeme.selectedTxtIdx].line = txt;
    renderAll()
}


function renderAll() {
    drawImg();
    renderTxtsOnCanvas();
}



function check(ev) {
    let pos = { x: ev.offsetX, y: ev.offsetY };

    let selectedIdx = gMeme.txts.findIndex(txt => {
        return (pos.x >= txt.x && pos.x <= txt.x + txt.w &&
            pos.y <= txt.y && pos.y >= txt.y - txt.h);
    });

    gMeme.selectedTxtIdx = selectedIdx;
    document.querySelector('.txt-editor').value = gMeme.txts[gMeme.selectedTxtIdx].line;
}


function onAddText() {
    if (gMeme.txts.length > 4) return;

    let txt = {
        id: gTxtId++,
        line: 'New Text',
        size: 35,
        align: 'left',
        color: 'white',
        x: 50,
        y: gMeme.txts[gMeme.selectedTxtIdx].y + gMeme.txts[gMeme.selectedTxtIdx].size,
        h: 0,
        w: 0
    }
    gMeme.txts.push(txt)
    gMeme.selectedTxtIdx++;
    drawText(gMeme.txts[gMeme.selectedTxtIdx]);
    document.querySelector('.txt-editor').value = gMeme.txts[gMeme.selectedTxtIdx].line;
}


// let gMeme = {
//     selectedImgId: 1, selectedTxtIdx: 0,
//     txts: [
//         {
//             id: gTxtId++,
//             line: 'Mother Fu....',
//             size: 35,
//             align: 'left',
//             color: 'white',
//             x: 50,
//             y: 50,
//             h: 0,
//             w: 0
//         }
//     ]
// };
