// var pallet = document.getElementById('pallet');
// var red = document.getElementById('red');
// var blue = document.getElementById('blue');
var currentColorShower = document.getElementById('currentColor');
// var canvas = document.getElementById
var currentColor;

window.addEventListener('load', startUp);
pallet.addEventListener('click', changeColor);
canvas.addEventListener('click', paint);
canvas.addEventListener('mousedown', startPaint);
canvas.addEventListener('mouseup', stopPaint);



function startUp() {
    currentColor = randomColor();
    currentColorShower.style.backgroundColor = currentColor;
    generateCanvas();

}

function randomColor() {
    let colors = ["red", "orange", 'yellow', 'green', 'blue', 'purple', 'black', 'gray', 'white'];
    return colors[Math.floor(Math.random() * 9)];
}

function generateCanvas() {
    let table = document.getElementById('canvas');
    for (let i = 0; i < 31; i++) {
        let rowToAdd = document.createElement('tr')
        for (let i = 0; i < 31; i++) {
            rowToAdd.appendChild(document.createElement('td'));
        }
        canvas.appendChild(rowToAdd);
    }
}

function changeColor(event) {
    // console.log(event.target.id);
    if (event.target.matches('.colorPicker')) {
        if (event.target.id == 'mystery') {
            currentColor = randomColor();
        } else {
            currentColor = event.target.id;
        }
        // console.log(`Current Color: ${currentColor}`);
        currentColorShower.style.backgroundColor = currentColor;

    }
}

function paint(event) {
    if (event.target.nodeName == 'TD') {
        let cell = event.target;
        cell.style.backgroundColor = currentColor;
    }

}

function startPaint() {
    canvas.addEventListener('mouseover', paint);
}

function stopPaint() {
    canvas.removeEventListener('mouseover', paint)
}
