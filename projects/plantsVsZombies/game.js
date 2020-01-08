var gameCanvas = document.getElementById("gameCanvas");
var gameContext = gameCanvas.getContext("2d");

var interval;
var currentLevel;

var templateEntities = [];
var plants = [], peas = [], zombies = [], suns = [];

var levelSelectedPlants = [101, 301], selectionBar = [];
var selectedEntity = null;

var money;

gameCanvas.addEventListener("click", clickCanvas);

function preloadGame() {}

function reset() {
    clearInterval(interval);
    plants = [];
    peas = [];
    zombies = [];
    selectionBar = [];
    selectedEntity = null;
    money = 100;
    let selectionBarNode = document.getElementById("entitySelectionBar");
    while (selectionBarNode.firstChild) {
        selectionBarNode.removeChild(selectionBarNode.firstChild);
    }
}

function nextLevel() {
    startLevel(currentLevel + 1);
}

function startLevel(levelNumber = currentLevel) {
    reset();
    showDiv("gameDiv");
    updateMoney();

    currentLevel = levelNumber;
    interval = setInterval(update, 1000 / 60);

    let selectionBarNode = document.getElementById("entitySelectionBar");
    for (let index = 0; index < levelSelectedPlants.length; index++) {
        let id = levelSelectedPlants[index];
        selectionBar[id] = new Drawable(id, 0);

        let selectionDiv = document.createElement("div");
        let selectionImg = document.createElement("img");

        selectionDiv.className = "entitySelectionDiv";
        selectionImg.style.width = "64px";
        selectionImg.style.height = "64px";
        selectionImg.src = "images/" + selectionBar[id].name + ".png";
        selectionImg.onclick = function(){selectEntity(id);};

        selectionDiv.appendChild(selectionImg);
        selectionBarNode.appendChild(selectionDiv);
    }
}

function update() {
    gameContext.clearRect(0, 0, gameCanvas.clientWidth, gameCanvas.height);

    for (let index = 0; index < plants.length; index++) {
        plants[index].update();
    }
    for (let index = 0; index < peas.length; index++) {
        let zIndex = collide(peas[index], zombies);
        if (peas[index].x > gameCanvas.width) {
            peas.splice(index--, 1);
        } else if (zIndex !== -1) {
            zombies[zIndex].hp -= peas[index].damage;
            if (zombies[zIndex].hp <= 0) zombies.splice(zIndex, 1);
            peas.splice(index--, 1);
        } else {
            peas[index].update();
        }
    }
    for (let index = 0; index < zombies.length; index++) {
        zombies[index].update();
    }
}

function updateMoney() {
    document.getElementById("money").innerHTML = money;
}

function finishGame(won) {
    reset();
    if (won) {
        showDiv("levelCompleteScreen");
    } else {
        showDiv("retryScreen");
    }
}