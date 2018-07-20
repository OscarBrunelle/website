var money=0;
var click_value=1;

function Building(base_price=0,price){
  this.base_price=base_price;
  this.price=price;
  this.free=0;
}

function update(){
  document.getElementById('money').innerHTML = "Money: "+money+" $";
}

function button_click(){
  money+=click_value;
  update();
}

function cursor_function(obj){
  if (money >= obj.price) {
    buy(obj);
  }
}

function buy(building){
  money-=building.price;
  click_value++;
  //building.price*=1.1;
  building.price= building.base_price * 1.15^(building.owned - building.free);
  document.getElementById("cursor_price").innerHTML = "Price: "+building.price+" $";

  update();
}

var cursor = new Building(10,10);

/* http://cookieclicker.wikia.com/wiki/Buildings */
