var currentColorShower = document.getElementById('currentColor');
var cctext = document.getElementById('cctext');
var currentColor;

window.addEventListener('load', startUp);



function startUp() {
  // test.addEventListener('click', reformat(localStorage.doNotErase))



    pallet.addEventListener('click', changeColor);
    canvas.addEventListener('click', paint);
    canvas.addEventListener('mousedown', startPaint);
    document.addEventListener('mouseup', stopPaint);
    menu.addEventListener('click', changeMenu);
    loadList.addEventListener('click', loadListUpdate);
    saverb.addEventListener('click', ()=>{
      saver.style.display = 'block';
    });
    loaderb.addEventListener('click', generateLoader);
    startOver.addEventListener('click', newCanvas);
    more.addEventListener('click', generateCanvas);
    cancelSave.addEventListener('click', () => {
        saver.style.display = 'none';
    })
    deleter.addEventListener('click', deleteSave);
    loadIt.addEventListener('click',load);
    document.getElementById('saveForm').onsubmit = ()=>{
      console.log(document.getElementById('canvas').childNodes);
      return false;};
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
            let newCell = document.createElement('td');
            newCell.style.backgroundColor = "white";
            rowToAdd.appendChild(newCell);
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
    let currentPic = copyCanvas();
    if (saveName.value in localStorage){
      if(confirm('That save name already exists. Overwrite?')){
        localStorage.setItem(saveName.value, currentPic);
      }
    }else{
      localStorage.setItem(saveName.value, currentPic);
    }
    saver.style.display = 'none';
}

function generateLoader() {
  clearLoadList();
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
}

function loadListUpdate(){
  if (event.target.nodeName == 'P'){
  for (let i = 0; i< loadList.getElementsByTagName('p').length; i++){
    loadList.getElementsByTagName('p')[i].className= "aSave";
  }
  event.target.className = "selected"
  }
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
  // debugger;
  // loader.style.display = 'none';
  if (loadList.getElementsByClassName('selected').length > 0){
    for (let i =0; i< loadList.getElementsByClassName('selected').length; i++){
      loadList.getElementsByClassName('selected')[i].className = 'aSave';
    }
  }
  while (loadList.getElementsByClassName('aSave').length>0){
    let current = document.getElementById('loadList').firstChild
    document.getElementById('loadList').removeChild(current);
  }
  loader.style.display = 'none';
}

function load(){
  if (loadList.getElementsByClassName("selected").length != 1){
    alert('Please select a canvas to load.');
    return;
  }
  let selected = loadList.getElementsByClassName("selected")[0].innerHTML;
  pasteCanvas(reformat(localStorage[selected]));
  clearLoadList();
  // loader.style.display = 'none';
}

function copyCanvas(){
  let savedCanvas = [];
  let rows = canvas.getElementsByTagName('tr');
  for (let i = 0; i<rows.length;i++){
    let currentRowStyle = [];
    for (let j = 0; j< rows[i].getElementsByTagName('td').length; j++){
      let currentCell = rows[i].getElementsByTagName('td')[j]
      let currentColor = currentCell.style.backgroundColor;
      currentRowStyle.push(currentColor)
    }
    savedCanvas.push(currentRowStyle);
    }
    return savedCanvas;
  }

function reformat(input){
  saveFile = input.split(',');
  let reformatted = [];
  while (saveFile.length > 0){
    let lineStyle = [];
    for (let i = 0; i < 31; i++){
      lineStyle.push(saveFile[0]);
      saveFile.shift()
    }
    reformatted.push(lineStyle)
  }
  return reformatted
}

function pasteCanvas(canvas){
  deleteCanvas()
  for (let i = 0; i<canvas.length;i++){
    let newRow = document.createElement('tr');
    for (let j = 0; j < canvas[i].length;j++){
      let newCell = document.createElement('td');
      newCell.style.backgroundColor = canvas[i][j];
      newRow.appendChild(newCell);
    }
    document.getElementById('canvas').appendChild(newRow);

  }
}

function deleteSave(){
  if (confirm(`Are you sure that you want to delete "${loadList.getElementsByClassName("selected")[0].innerHTML}"? Once you delete it, it cannot be recovered.`)){
    localStorage.removeItem(loadList.getElementsByClassName("selected")[0].innerHTML);
    clearLoadList();
  }
}
