// <----- REFERENCE ----->
const pixelContainer = document.querySelector('.pixel-container');
const resetBtn = document.querySelector('.reset-btn');
const colorBtn = document.querySelector('.color-btn');
const classicBtn = document.querySelector('.classic-btn');
const eraserBtn = document.querySelector('.eraser-btn');
const dimensionBtn = document.querySelector('.dimension-btn');



// <----- PIXEL SETUP ----->
let pixelCount = 64;
let pixelWidth = 560 / pixelCount + 'px';
let pixelHeight = 560 / pixelCount + 'px';

// <----- MOUSE STUFFS ----->
let mouseIsDown = false;
document.addEventListener('mousedown', () => mouseIsDown = true);
document.addEventListener('mouseup', () => mouseIsDown = false);

// <----- FUNCTIONS ----->
function createGrid(pixelCount) {
    for (let i = 0; i < pixelCount * pixelCount; i++) {
        const pixels = document.createElement('div');
        pixels.classList.add('pixels');
        pixels.style.height = pixelHeight;
        pixels.style.width = pixelWidth;
        pixels.addEventListener('mouseover', () => {
            if (mouseIsDown) {
                pixels.style.backgroundColor = 'indigo';
            }
        })
        pixelContainer.appendChild(pixels);
    }
}

// <----- MAIN ----->
createGrid(pixelCount);