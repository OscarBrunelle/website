var Hero = player();
var Monster = player();

function player(attack = 1, defense = 1, hp = 10, magic = 2){
  this.attack = attack;
  this.defense = defense;
  this.hp = hp;
  this.magic = magic;
  var defend = false;
}

function attack(){
  if(!Monster.defend){
    Monster.hp-=Hero.attack;
  } else {
    Monster.hp-=(Hero.attack-Monster.defense);
  }
  update();
}

function update(){
  document.getElementById("hero_health").innerHtml = Hero.health;
  document.getElementById("monster_health").innerHtml = Monster.health;
}

update();
