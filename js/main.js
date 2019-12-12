let gCurrImg;
let gIsProcessing = 0;
let gIsMainPage = true;

function init() {
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d')

    gCanvas.width = window.innerWidth - (window.innerWidth / 9);
    gCanvas.height = window.innerWidth - (window.innerWidth / 9);

    document.querySelector('.fill-color').value = '#ffffff';
    renderPictures();

    gCanvas.addEventListener('click', check, false);
    gCanvas.addEventListener("mousemove", checkPointer);

    window.addEventListener('resize',
        function () {
            gCanvas.width = window.innerWidth - (window.innerWidth / 9);
            gCanvas.height = window.innerWidth - (window.innerWidth / 9);
            renderAll();
        });
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
    if (++gIsProcessing >= 3) {
        return;
    } else {
        gIsProcessing = 0;
    }
    gCtx.save();
    gCtx.font = `bold ${txt.size}px Impact`;
    let meme = getGmeme();
    gCtx.textAlign = meme.txts[meme.selectedTxtIdx].align;
    gCtx.fillStyle = meme.txts[meme.selectedTxtIdx].color;
    gCtx.strokeStyle = meme.txts[meme.selectedTxtIdx].stroke;
    gCtx.fillText(txt.line.toUpperCase(), txt.x, txt.y);
    gCtx.strokeText(txt.line.toUpperCase(), txt.x, txt.y);
    meme.txts[meme.selectedTxtIdx].w = gCtx.measureText(txt.line.toUpperCase()).width;
    meme.txts[meme.selectedTxtIdx].h = meme.txts[meme.selectedTxtIdx].size;
    gCtx.restore();
}

function renderPictures() {
    let imgs = getImgsToRender();
    if (window.innerWidth <= 480) {
        imgs = imgs.slice(0, 8);
    }
    let elImgContaier = document.querySelector('.gallery-bg');
    let renderImgs = imgs.map((img) => {
        return `<img src=${img.url} onclick="onSelectImg(${img.id});onContentToggler()"> \n`
    });

    elImgContaier.innerHTML = renderImgs.join('');


}

function onSelectImg(id) {
    let img = getImgById(id);
    let meme = getGmeme();
    gCurrImg = new Image();
    gCurrImg.src = img.url;

    meme.selectedImgId = id;
    meme.selectedTxtIdx = 0;

    renderAll();
}

function onSetColor() {
    let meme = getGmeme();
    meme.txts[meme.selectedTxtIdx].stroke = document.querySelector('.color').value;
    renderAll();
}

function onSetFillColor() {
    let meme = getGmeme();
    meme.txts[meme.selectedTxtIdx].color = document.querySelector('.fill-color').value;
    renderAll();
}


function onSetFontSize(diff) {
    let meme = getGmeme();
    meme.txts[meme.selectedTxtIdx].size += diff;
    renderAll();
}

function renderTxtsOnCanvas() {
    let meme = getGmeme();
    if (meme.txts.length > 0) {
        meme.txts.forEach(txt => drawText(txt));
    };
}

function onSetTxtYPos(diff) {
    let meme = getGmeme();
    meme.txts[meme.selectedTxtIdx].y += diff;
    renderAll();
}

function onSetTxtXPos(diff) {
    let meme = getGmeme();
    meme.txts[meme.selectedTxtIdx].x += diff;
    renderAll();
}


function onSetTxt(elTxt) {
    let meme = getGmeme();
    let txt = elTxt.value;
    meme.txts[meme.selectedTxtIdx].line = txt;
    renderAll()
}


function renderAll() {
    drawImg();
    renderTxtsOnCanvas();
}



function check(ev) {
    let pos = { x: ev.offsetX, y: ev.offsetY };
    let meme = getGmeme();

    let selectedIdx = meme.txts.findIndex(txt => {
        return (pos.x >= txt.x && pos.x <= txt.x + txt.w &&
            pos.y <= txt.y && pos.y >= txt.y - txt.h);
    });

    meme.selectedTxtIdx = selectedIdx;
    document.querySelector('.txt-editor').value = meme.txts[meme.selectedTxtIdx].line;
}

function checkPointer(ev) {
    let pos = { x: ev.offsetX, y: ev.offsetY };
    let meme = getGmeme();

    meme.txts.forEach(txt => {
        if (pos.x >= txt.x && pos.x <= txt.x + txt.w &&
            pos.y <= txt.y && pos.y >= txt.y - txt.h) {
            document.body.style.cursor = "pointer";
        }
    });
    document.body.style.cursor = "";
}

function onAddText() {
    let meme = getGmeme();
    if (meme.txts.length > 2) return;

    let txt = {
        id: gTxtId++,
        line: 'New Text',
        size: 35,
        align: 'left',
        color: '#ffffff',
        stroke: '#000000',
        x: 20,
        y: 0,
        h: 0,
        w: 0
    }
    meme.selectedTxtIdx = meme.txts.length ? ++meme.selectedTxtIdx : 0;
    switch (meme.selectedTxtIdx) {
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
    meme.txts.push(txt);
    drawText(meme.txts[meme.selectedTxtIdx]);
    document.querySelector('.txt-editor').value = meme.txts[meme.selectedTxtIdx].line;
}

function onDeleteTxt() {
    let meme = getGmeme();
    if (meme.selectedTxtIdx < 0) return;
    meme.txts.splice(meme.selectedTxtIdx--, 1);
    renderAll();
}

function onHamburger() {
    document.querySelector('.mobile-menu-modal').classList.toggle('menu-open');
    document.querySelector('.mobile-menu-btn').classList.toggle('menu-close');
}

function onToggleMenu() {
    if (gIsMainPage) {
        document.querySelector('.mobile-menu-modal').classList.toggle('menu-open');
        document.querySelector('.mobile-menu-btn').classList.toggle('menu-close');
    } else {
        document.querySelector('.mobile-menu-modal').classList.toggle('menu-open');
        document.querySelector('.mobile-menu-btn').classList.toggle('menu-close');
        onContentToggler();
    }

}

function onContentToggler() {
    gIsMainPage = !gIsMainPage;
    document.querySelector('.mobile-home').classList.toggle('menu-close');
    document.querySelector('.editor-container').classList.toggle('flex');
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.png';
}

function onToggleShare() {
    document.querySelector('.share-modal').classList.toggle('flex');
}