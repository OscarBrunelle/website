let CURSOR_WIDTH = 32, CURSOR_HEIGHT = 32;
let PLANT_WIDTH = 64, PLANT_HEIGHT = 64;
let PEA_WIDTH = 16, PEA_HEIGHT = 16;
let ZOMBIE_WIDTH = 64, ZOMBIE_HEIGHT = 64;

class Drawable {
    constructor(id, type, x = 0, y = 0) {
        this.id = id;
        let width, height;
        switch (type) {
            case 0:
                this.width = CURSOR_WIDTH;
                this.height = CURSOR_HEIGHT;
                break;
            case 1:
                this.width = PLANT_WIDTH;
                this.height = PLANT_HEIGHT;
                break;
            case 2:
                this.width = PEA_WIDTH;
                this.height = PEA_HEIGHT;
                break;
            case 3:
                this.width = ZOMBIE_WIDTH;
                this.height = ZOMBIE_HEIGHT;
                break;

            default:
                console.log("Unknown type " + type);
                break;
        }
        this.name = entitiesCharacteristics[id].name;
        this.image = new Image(width, height);
        this.image.src = "images/" + this.name + ".png";
        this.x = x;
        this.y = y;
    }

    draw(x = this.x, y = this.y) {
        gameContext.drawImage(this.image, x, y, this.width, this.height);
    }
}

class Plant extends Drawable {
    constructor(id, x, y) {
        super(id, 1, x, y);
        this.cost = entitiesCharacteristics[id].cost;
        this.hp = entitiesCharacteristics[id].hp;
        this.shotSpeed = entitiesCharacteristics[id].shotSpeed;
        this.cooldown = this.shotSpeed;
    }

    update() {
        this.cooldown--;
        if (this.cooldown <= 0) {
            this.cooldown = this.shotSpeed;
            peas.push(new Pea(201, this.x + 64, this.y + 10));
            playPlopSound();
        }
        this.draw();
    }
}

class Pea extends Drawable {
    constructor(id, x, y, speed) {
        super(id, 2, x, y);
        this.speed = entitiesCharacteristics[id].speed;
        this.damage = entitiesCharacteristics[id].damage;
    }

    update() {
        this.x += this.speed;
        this.draw();
    }
}

class Zombie extends Drawable {
    constructor(id, x = 0, y = 0) {
        super(id, 3, x, y);
        this.hp = entitiesCharacteristics[id].hp;
        this.speed = entitiesCharacteristics[id].speed;
        this.attack = entitiesCharacteristics[id].attack;
    }

    update() {
        if (this.x < 0) {
            finishGame(false);
        } else {
            this.x -= this.speed;
            this.draw();
            const initialHP = entitiesCharacteristics[this.id].hp;
            gameContext.fillStyle = "red";
            gameContext.fillRect(this.x, this.y, 50 * (this.hp / initialHP), 10);
        }
    }
}