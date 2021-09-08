"use strict"

function load() {
	for (let i = 1; i <= 16; i++) {
		if (i == 2 || i == 3 || i == 13) continue;
		const indiv_audio_div = docdiv(document.getElementById("main"), "audio_container");
		docspan(indiv_audio_div, `Russian Doomer - Vol ${i}`);
		const a = docaudio(indiv_audio_div, `music/russian_doomer-${i}.mp3`);
		a.setAttribute("controls", true);
		a.setAttribute("loop", true);
	}
}

document.onload = load();