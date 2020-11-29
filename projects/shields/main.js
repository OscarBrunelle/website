function play_song(path) {
	new Audio(path).play();
}

// play_song("sounds/jackson_michael-billie_jean.mp3");

function collide(obj, array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (obj.x > element.x && obj.x < element.x + element.width ||
            obj.x + obj.width > element.x && obj.x + obj.width < element.x + element.width) {
            if (obj.y > element.y && obj.y < element.y + element.height ||
                obj.y + obj.height > element.y && obj.y + obj.height < element.y + element.height) {
                return index;
            }
        }
    }
    return -1;
}

class GameElement {
	constructor() {

	}
}

class Box extends GameElement{
	constructor() {
		super();
	}
}