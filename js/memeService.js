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
            h: 0,
            w: 0
        }
    ]
};

function createImg(url, keywords){
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

function getGmeme(){
    return gMeme;
}