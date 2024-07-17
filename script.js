// <----- REFERENCES ----->
const pixelContainer = document.querySelector('.pixel-container');
const resetBtn = document.querySelector('.reset-btn');
const colorBtn = document.querySelector('.color-btn');
const classicBtn = document.querySelector('.classic-btn');
const eraserBtn = document.querySelector('.eraser-btn');
const newGridBtn = document.querySelector('.new-grid-btn');

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
let defaultPixelCount = 16;
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
        pixels.addEventListener('mouseover', changeColorOnDrag);
        pixelContainer.appendChild(pixels);
    }
}

function changeColorOnDrag(event) {
    if (mouseIsDown) {
        if (eraserIsOn) {
            event.target.style.backgroundColor = 'white';
        } else {
            event.target.style.backgroundColor = 'indigo';
        }
    }
}

// <----- CONTROLS SETUP ----->
resetBtn.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixels');
    pixels.forEach(pixel => pixel.style.backgroundColor = 'white');
});

let eraserIsOn = false;
eraserBtn.addEventListener('click', () => {
    eraserIsOn ^= true;
});

// <----- MAIN ----->
createGrid(pixelCount);