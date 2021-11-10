"use strict"

function load() {
	let main = document.getElementById("main");

	let data = docp(main, `Réseau`);
	docspan(data, `Type de réseau: ${navigator.connection.effectiveType}`);
	docspan(data, `Vitesse du réseau: ${navigator.connection.downlink} Mbps`);
	docspan(data, `Économie données: ${navigator.connection.saveData}`);

	let cookies = docp(main, `Cookies: ${navigator.cookieEnabled}`);

	docp(main, `Mémoire RAM : ${navigator.deviceMemory}`);
	docp(main, `Préférence 'Ne pas me traquer' : ${navigator.doNotTrack}`);
	docp(main, `Nombre de cœurs logiques du processeur : ${navigator.hardwareConcurrency}`);
	docp(main, `Langue préférée: ${navigator.language}`);
	docp(main, `Langues connues: ${navigator.languages}`);
	docp(main, `Nombre de contacts simultanés (si > 0, l'appareil possède au moins un écran tactile): ${navigator.maxTouchPoints}`);
	docp(main, `Ouvrir les fichiers PDF dans le navigateur: ${navigator.pdfViewerEnabled}`);
	docp(main, `OS: ${navigator.userAgentData.platform} / ${navigator.platform}`);
	docp(main, `Appareil mobile: ${navigator.userAgentData.mobile}`);
	docp(main, `Navigateur: ${navigator.userAgentData.brands[0].brand} / Version: ${navigator.userAgentData.brands[0].version}`);
	docp(main, `Navigateur autre: ${navigator.userAgentData.brands[1].brand} / Version: ${navigator.userAgentData.brands[1].version}`);
	docp(main, `Navigateur contrôlé par un outil automatisé: ${navigator.webdriver}`);

	console.log(navigator);
}

document.onload = load();