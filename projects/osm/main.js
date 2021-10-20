"use strict"

var input = document.getElementById("myFile");
var output = document.getElementById("output");

input.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    var myFile = this.files[0];
    var reader = new FileReader();
    
    reader.addEventListener("loadend", read_file);
    
    reader.readAsArrayBuffer(myFile);
  }   
});

function load() {}

document.onload = load();