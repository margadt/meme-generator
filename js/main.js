let gCurrImg;
let gMeme = {
    selectedImgId: 1, selectedTxtIdx: 0,
    txts: [
        {
            line: 'Mother Fu....',
            size: 20,
            align: 'left',
            color: 'white'
        }
    ]
};




function init() {
    gCanvas = document.querySelector('.my-canvas');
    gCtx = gCanvas.getContext('2d')

    gCanvas.width = 500;
    gCanvas.height = 500;

    // window.addEventListener('resize',
    //     function () {
    //         gCanvas.width = window.innerWidth - (window.innerWidth / 5);
    //         gCanvas.height = window.innerHeight - (window.innerHeight / 5);
    //         drawImg()
    //     })
}


function drawImg() {
    // const img = document.querySelector('img');
    // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    if (gCurrImg)
        gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
    else {
        gCurrImg = new Image();
        gCurrImg.onload = () => {
            gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height)
        };
        gCurrImg.src = getImgUrlToDraw();
    }
    // NOTE: the proportion of the image - should be as the canvas,
    // otherwise the image gets distorted
}

function drawText(txt, x, y) { 
    gCtx.save();
    gCtx.font = "bold 40px Impact";
    gCtx.fillStyle = 'white';
    gCtx.fillText(`${txt}`.toUpperCase(), x, y);
    gCtx.strokeText(`${txt}`.toUpperCase(), x, y);
    gCtx.restore()
}

function renderPictures(){
    let imgs = getImgsToRender();
    let elImgContaier = document.querySelector('.imgs-container');
    let renderImgs = imgs.map((img) => {
        return `<img src=${img.url} onclick="onSelectImg(${img.id})"> \n`
    });

    elImgContaier.innerHTML = renderImgs.join('');


}

function onSelectImg(id){
    let img = getImgById(id);
    gCurrImg = new Image();
    gCurrImg.src = img.url;

    drawImg();
}