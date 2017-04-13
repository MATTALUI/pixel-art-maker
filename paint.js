var currentColorShower = document.getElementById('currentColor');
var cctext = document.getElementById('cctext');
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
    if (event.target.matches('.colorPicker')) {
        if (event.target.id == 'mystery') {
            currentColor = randomColor();
        } else {
            currentColor = event.target.id;
        }
        currentColorShower.style.backgroundColor = currentColor;
        if (currentColor == 'black'){
          console.log();
          cctext.style.color = 'white';
        }else{
          cctext.style.color = 'black';
        }
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
