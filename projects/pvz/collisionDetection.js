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

function collideMouse(evt, array) {
    let positions = getMousePos(gameCanvas, evt);
    let x = positions.x, y = positions.y;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (x > element.x && x < element.x + element.width && obj.y > element.y && obj.y < element.y + element.height) {
            return index;
        }
    }
    return -1;
}