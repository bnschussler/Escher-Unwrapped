/*For processing strings as numbers*/

// from https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

/*Update Things*/

function updatePText(){
  document.getElementById("p1").value=Math.floor(p1[0]*100)/100;
  document.getElementById("p2").value=Math.floor(p2[0]*100)/100;
}

function updateP(){
  temp=[document.getElementById("p1").value,document.getElementById("p2").value];
  if(isNumeric(temp[0])){
    p1=[parseInt(temp[0]),parseInt(temp[0])];
  }
  if(isNumeric(temp[1])){
    p2=[parseInt(temp[1]),parseInt(temp[1])];
  }
}

function updateRes(){
  if(isNumeric(document.getElementById("resX").value) && isNumeric(document.getElementById("resY").value)){
    //res=[canvas.width/document.getElementById("resX").value,canvas.height/document.getElementById("resY").value];
    document.getElementById("canvas_div").setAttribute("style","width:"+document.getElementById("canvas_div").offsetWidth+"px;"+"height:"+document.getElementById("canvas_div").offsetHeight+"px;");

    canvas.width=document.getElementById("resX").value;
    canvas.height=document.getElementById("resY").value;

    canvasDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvasData=canvasDataObj.data;
    canvasData.fill(255);
  }
}

function updateCanvasSize(){
  temp=[document.getElementById("canvWidth").value,document.getElementById("canvHeight").value];
  div=document.getElementById("canvas_div");
  if(isNumeric(temp[0]) && isNumeric(temp[1])){
    //canvas.width=temp[0];
    //canvas.height=temp[1];
    div.setAttribute("style","min-width:"+temp[0]+"px;"+"width:"+temp[0]+"px;"+"height:"+temp[1]+"px;");
    //updateRes();
    //drawScreen();
  }
}

/*Lock Pointer Code*/

//lock pointer code from https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
};

// pointer lock event listeners

// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
canvas.addEventListener("touchmove",updatePositionTouch);

function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    document.addEventListener("mousemove", updatePosition, false);
  } else {
    document.removeEventListener("mousemove", updatePosition, false);
  }
}

var tracker = document.getElementById('tracker');

function updatePosition(e) {
  mX += e.movementX;
  mY += e.movementY;
}

function updatePositionTouch(e){
  e.preventDefault();
  mX = e.targetTouches[0].clientX; 
  mY = e.targetTouches[0].clientY;
}

/*Keyboard Inputs*/

window.addEventListener('keydown',this.keyPressed,false);
window.addEventListener('keyup',this.keyReleased,false);

function keyPressed(e) {
  switch(e.key){
    case('w'):
      p1[1]++;
      break;
    case('s'):
      p1[1]--;
      break;
    case('a'):
      p2[1]--;
      break;
    case('d'):
      p2[1]++;
      break;
  }
}

