let gKeywordCountMap = {};
let gNextId = 1;
let gImgs = [
    { id: gNextId++, url: 'imgs/003.jpg', keywords: ['trump'] },
    { id: gNextId++, url: 'imgs/004.jpg', keywords: ['puppy'] }
];



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