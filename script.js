const container = document.querySelector('.container');

let isClicked = false;
container.addEventListener('mousedown', () => isClicked = true);
container.addEventListener('mouseup', () => isClicked = false);

function createGrid(size) {
    const squareSize = 600 / size;
    for (let i = 0; i < size*size; i++) {
        const box = document.createElement('div');
        box.classList.add('pixel');
        box.style.width = squareSize + 'px';
        box.style.height = squareSize + 'px';
        container.appendChild(box);
    }
}

function paintPixels() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.addEventListener('mouseover', paintBlack));
}

function paintBlack(e) {
    if (isClicked === true) e.target.classList.add('black');
}

createGrid(16);
paintPixels();
