var currentColorShower = document.getElementById('currentColor');
var cctext = document.getElementById('cctext');
var currentColor;

window.addEventListener('load', startUp);



function startUp() {
    pallet.addEventListener('click', changeColor);
    canvas.addEventListener('click', paint);
    canvas.addEventListener('mousedown', startPaint);
    document.addEventListener('mouseup', stopPaint);
    menu.addEventListener('click', changeMenu);
    saverb.addEventListener('click', ()=>{
      saver.style.display = 'block';
    });
    loaderb.addEventListener('click', generateLoader);
    startOver.addEventListener('click', newCanvas);
    more.addEventListener('click', generateCanvas);
    cancelSave.addEventListener('click', () => {
        saver.style.display = 'none';
    })
    cancelLoad.addEventListener('click', clearLoadList);
    saveIt.addEventListener('click', save);
    currentColor = randomColor();
    currentColorShower.style.backgroundColor = currentColor;
    if (currentColor == 'black') {
        cctext.style.color = 'white';
    } else {
        cctext.style.color = 'black';
    }
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
        if (currentColor == 'black') {
            console.log();
            cctext.style.color = 'white';
        } else {
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

function changeMenu() {
    if (controlBar.style.display === "") {
        controlBar.style.display = "none";
    } else if (controlBar.style.display === "none") {
        controlBar.style.display = "";
    }
}

function save() {
    saver.style.display = 'block';
    let random = Math.random();
    if (saveName.value in localStorage){
      if(confirm('That save name already exists. Overwrite?')){
        localStorage.setItem(saveName.value, random);
      }
    }else{
      localStorage.setItem(saveName.value, random);
    }
    console.log(localStorage);
    saver.style.display = 'none';
}


function generateLoader() {
    loader.style.display = 'block';
    loadIt.style.display = "";
    if (localStorage.length === 0) {
        let thePs = loader.getElementsByTagName('div')[0].getElementsByTagName('p')
        thePs[0].innerHTML = 'You do not have any saved works of art!';
        loadIt.style.display = "none";

    } else {
        loader.getElementsByTagName('div')[0].getElementsByTagName('p')[0].innerHTML = 'Which file?';
        for (let saves in localStorage) {
            let newItem = document.createElement('p');
            newItem.innerHTML = saves;
            newItem.className = "aSave"
            loadList.appendChild(newItem);
        }
    }

    console.log(localStorage);
}

function newCanvas() {
    if (confirm('Are you sure that you want to start over? All unsaved progress will be lost.')) {
        deleteCanvas();
        generateCanvas();
    }
}

function deleteCanvas() {
    while (document.getElementById('canvas').getElementsByTagName('tr').length > 0) {
        let current = document.getElementById('canvas').firstChild
        document.getElementById('canvas').removeChild(current);
    }
}

function clearLoadList(){
  loader.style.display = 'none';
  while (loadList.getElementsByClassName('aSave').length>0){
    let current = document.getElementById('loadList').firstChild
    // console.log(current);
    document.getElementById('loadList').removeChild(current);
  }
  // let toRemove = loadList.getElementsByClassName('aSave').length;
  // for (i=0; i< toRemove ;i++){
  //   loadList.removeChild(loadList.getElementsByClassName('aSave')[i])
  //   console.log('a save');
  // }
}
