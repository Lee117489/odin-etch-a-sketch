const DEFAULT_SIZE = 25;
const DEFAULT_COLOR = `#000000`;
const DEFAULT_MODE = `color`;

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setCurentSize(newSize) {
    currentSize = newSize;
}

function setCurentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    currentMode = newMode;
}


const container = document.querySelector('.box');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const reset = document.getElementById('resetGrid');
const colorPicker = document.getElementById('colorPicker');
const rainbowBtn = document.getElementById('rainbow');
const randomBtn = document.getElementById('random');


colorPicker.onchange = (e) => {
    setCurentColor(e.target.value);
    setCurrentMode(`color`);
}
randomBtn.onclick = () => {
    setCurentColor(randomColor());
    setCurrentMode(`color`);
    colorPicker.value = currentColor;
}
rainbowBtn.onclick = () => setCurrentMode(`rainbow`);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
reset.onclick = () => resetGrid();

let isClicked = false;
document.body.addEventListener('mousedown', () => isClicked = true);
document.body.addEventListener('mouseup', () => isClicked = false);

function createGrid(size) {
    const squareSize = 600 / size;
    for (let i = 0; i < size*size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.style.width = squareSize + 'px';
        pixel.style.height = squareSize + 'px';
        pixel.addEventListener('mouseover', paintIt);
        pixel.addEventListener('mousedown', paintIt);
        container.appendChild(pixel);
    }
}

function resetGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid(currentSize);
}

function changeSize(value) {
    setCurentSize(value);
    updateSizeValue(value);
    resetGrid();
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}


function paintIt(e) {
    if (e.type === 'mouseover' && !isClicked) return;
    if (currentMode === `rainbow`) {
        setCurentColor(randomColor());
        e.target.style.backgroundColor = currentColor;
    }
    if (currentMode === `color`) {
        e.target.style.backgroundColor = currentColor;
    }
}

function randomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
window.onload = () => {
    createGrid(DEFAULT_SIZE);
}


