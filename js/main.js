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
    let maxWidth = gCanvas.width; // Max width for the image
    let maxHeight = gCanvas.height;    // Max height for the image
    let ratio = 0;  // Used for aspect ratio
    let width = gCurrImg.width;    // Current image width
    let height = gCurrImg.height;  // Current image height

    // Check if the current width is larger than the max
    if (width > height) {
        ratio = maxWidth / width;   // get ratio for scaling image
        gCurrImg.width = maxWidth; // Set new width
        gCurrImg.height = height * ratio;  // Scale height based on ratio
        gCanvas.height = gCurrImg.height;    // Reset height to match scaled image
        gCanvas.width = gCurrImg.width;    // Reset width to match scaled image
    } else {  // Check if current height is larger than max
        ratio = maxHeight / height; // get ratio for scaling image
        gCurrImg.height = maxHeight;   // Set new height
        gCurrImg.width = width * ratio;    // Scale width based on ratio
        gCanvas.width = gCurrImg.width;    // Reset width to match scaled image
        gCanvas.height = gCurrImg.height;    // Reset height to match scaled image
    }

    if (gCurrImg)
        gCtx.drawImage(gCurrImg, 0, 0, gCurrImg.width, gCurrImg.height);
    else {
        gCurrImg = new Image();
        gCurrImg.onload = () => {
            gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height);
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
    setCurrTxtWidth(gCtx.measureText(txt.line.toUpperCase()).width);
    setCurrTxtHeight(meme.txts[meme.selectedTxtIdx].size);
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
    gCurrImg = new Image();
    gCurrImg.src = img.url;

    setGmemeId(id);
    setGmemeTxtIdx(0);

    renderAll();
}

function onSetColor() {
    let val = document.querySelector('.color').value;
    setCurrTxtStroke(val);
    renderAll();
}

function onSetFillColor() {
    let val = document.querySelector('.fill-color').value;
    setCurrTxtFillColor(val);
    renderAll();
}


function onSetFontSize(diff) {
    setCurrTxtFontSize(diff);
    renderAll();
}

function renderTxtsOnCanvas() {
    let meme = getGmeme();
    if (meme.txts.length > 0) {
        meme.txts.forEach(txt => drawText(txt));
    };
}

function onSetTxtYPos(diff) {
    setCurrTxtYPos(diff);
    txtContainer()
    renderAll();
}

function onSetTxtXPos(diff) {
    setCurrTxtXPos(diff);
    txtContainer();
    renderAll();
}

function onSetTxt(elTxt) {
    setCurrTxtLine(elTxt);
    renderAll()
    txtContainer();
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

    if (selectedIdx !== -1) {
        setGmemeTxtIdx(selectedIdx);
        txtContainer();
        document.querySelector('.txt-editor').value = `${getCurrTxt().line}`;
    }else{
        document.querySelector('.txt-container').style.display = 'none';
    }
}

function checkPointer(ev) {
    let pos = { x: ev.offsetX, y: ev.offsetY };
    let meme = getGmeme();

    meme.txts.forEach(txt => {
        if (pos.x >= txt.x && pos.x <= txt.x + txt.w &&
            pos.y <= txt.y && pos.y >= txt.y - txt.h) {
            console.log('cursor');
            return document.body.style.cursor = "pointer";
        } else {
            return document.body.style.cursor = "";
        }
    });

}

function onAddText() {
    addTxt();
}

function onDeleteTxt() {
    deleteCurrTxt();
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

function getCurrTxtWidth() {
    let txt = getCurrTxt();
    return gCtx.measureText(txt.line.toUpperCase()).width;
}

function txtContainer() {
    let container = document.querySelector('.txt-container');
    let txt = getCurrTxt();
    let canvas = document.querySelector('.my-canvas');

    container.style.display = 'block';
    container.style.position = 'fixed';
    container.style.width = (txt.w + 5) + 'px';
    container.style.height = (txt.h + 5) + 'px';
    container.style.top = (canvas.offsetTop + txt.y - txt.size) + 'px';
    container.style.left = (canvas.offsetLeft + txt.x) + 'px';

}

function onLogo(){
    document.querySelector('.mobile-home').classList.remove('menu-close');
    document.querySelector('.editor-container').classList.remove('flex');
    document.querySelector('.mobile-menu-modal').classList.remove('menu-open');
    document.querySelector('.mobile-menu-btn').classList.remove('menu-close');

}