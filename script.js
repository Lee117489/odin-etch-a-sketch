const DEFAULT_SIZE = 25;

let currentSize = DEFAULT_SIZE;

function setCurentSize(newSize) {
    currentSize = newSize;
}


const container = document.querySelector('.container');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const reset = document.getElementById('resetGrid');




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
        pixel.addEventListener('mouseover', paintBlack);
        pixel.addEventListener('mousedown', paintBlack);
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


function paintBlack(e) {
    if (e.type === 'mouseover' && !isClicked) return;
    e.target.classList.add('black');
}


window.onload = () => {
    createGrid(DEFAULT_SIZE);
}


