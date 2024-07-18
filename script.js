// <----- REFERENCES ----->
const pixelContainer = document.querySelector('.pixel-container');
const resetBtn = document.querySelector('.reset-btn');
const colorBtn = document.querySelector('.color-btn');
const eraserBtn = document.querySelector('.eraser-btn');
const newGridBtn = document.querySelector('.new-grid-btn');
const classicBtn = document.querySelector('.classic-btn');
const sketchBtn = document.querySelector('.sketch-btn');

// <----- MODAL SETUP ----->
const closeModalButton = document.querySelector('.close-btn');
const overlay = document.getElementById('overlay');
const saveButton = document.querySelector('.save-btn');

newGridBtn.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    openModal(modal);
})

closeModalButton.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    closeModal(modal);
})

saveButton.addEventListener('click', () => {
    const gridSize = document.getElementById('grid-size').value;
    if (gridSize > 100) {
        gridSize = 100;
    }
    else if (gridSize && gridSize > 0) {
        createGrid(gridSize);
        const modal = document.querySelector('.modal');
        closeModal(modal);
    }
    turnOffEraser();
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// <----- MOUSE STUFFS ----->
let mouseIsDown = false;
document.addEventListener('mousedown', () => mouseIsDown = true);
document.addEventListener('mouseup', () => mouseIsDown = false);

// <----- PIXEL SETUP ----->
let defaultPixelCount = 32;
createGrid(defaultPixelCount);


// <----- GRID SETUP ----->
function createGrid(pixelCount) {
    pixelContainer.innerHTML = '';
    let pixelWidth = 560 / pixelCount + 'px';
    let pixelHeight = 560 / pixelCount + 'px';
    for (let i = 0; i < pixelCount * pixelCount; i++) {
        const pixels = document.createElement('div');
        pixels.classList.add('pixels');
        pixels.style.height = pixelHeight;
        pixels.style.width = pixelWidth;
        pixels.style.opacity = 0;
        pixels.addEventListener('mousedown', changeColor);
        pixels.addEventListener('mouseover', changeColorOnDrag);
        pixelContainer.appendChild(pixels);
    }
}

function changeColor(event) {
    let pixel = event.target;
    if (eraserIsOn) {
        pixel.style.backgroundColor = 'white';
        pixel.style.opacity = 1; 
    } 
    else {
        if (sketchIsOn) {
            let currentOpacity = parseFloat(pixel.style.opacity);
            if (currentOpacity < 1) {
                pixel.style.opacity = currentOpacity + 0.1;
                pixel.style.backgroundColor = 'black'; 
            } 
        }
        else {
            pixel.style.backgroundColor = 'indigo';
            pixel.style.opacity = 1; 
        }
    }
}

function changeColorOnDrag(event) {
    if (mouseIsDown) {
        changeColor(event);
    }
}

// <----- CONTROLS SETUP ----->
function reset() {
    const pixels = document.querySelectorAll('.pixels');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white';
        pixel.style.opacity = 0; // Reset opacity
    });
    turnOffEraser();

}

function turnOffEraser() {
    eraserIsOn = false;
    pixelContainer.classList.remove('eraser-cursor');
}

resetBtn.addEventListener('click', reset);

let eraserIsOn = false;
eraserBtn.addEventListener('click', () => {
    eraserIsOn ^= true;
    eraserIsOn ? pixelContainer.classList.add('eraser-cursor') : pixelContainer.classList.remove('eraser-cursor');
});

let sketchIsOn = false;
sketchBtn.addEventListener('click', () => {
    if (!sketchIsOn) reset();
    sketchIsOn = true;
    classicIsOn = false;
    turnOffEraser();
});

let classicIsOn = true;
classicBtn.addEventListener('click', () => {
    if (!classicIsOn) reset();
    classicIsOn = true;
    sketchIsOn = false;
    turnOffEraser();
});