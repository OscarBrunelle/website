function resizeWindow() {
  canvas.width = window.innerWidth - 30;
  canvas.height = window.innerHeight - 140;
  initializeFruit();
  update();
}
window.addEventListener("resize", resizeWindow);

function checkSize(){
  resizeWindow();
  if (window.innerWidth < 200) {
    
  } else {
    
  }
}

window.onload = checkSize();