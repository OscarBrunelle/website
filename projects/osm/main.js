"use strict"

var input = document.getElementById("myFile");
var output = document.getElementById("output");

input.addEventListener("change", function () {
	if (this.files && this.files[0]) {
		var myFile = this.files[0];
		var reader = new FileReader();

		reader.addEventListener("loadend", load_file);

		reader.readAsArrayBuffer(myFile);
	}
});

function get_current_position() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;

		console.log('Votre position actuelle est :');
		console.log(`Latitude : ${crd.latitude}`);
		console.log(`Longitude : ${crd.longitude}`);
		console.log(`La précision est de ${crd.accuracy} mètres.`);
	}

	function error(err) {
		console.warn(`ERREUR (${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
}

function load() {
	// var monWorker = new Worker('worker.js');
	// monWorker.onmessage = function(e) {
	// 	console.log(e.data);
	// };
	// monWorker.postMessage("test")
}

document.onload = load();