/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

/////////////////////////////////////////////////////////////////////////////////

var money=0;
var click_value=1;

function Building(price = 0){
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
  building.price= building.price * 1.15^(building.owned - building.free);
  document.getElementById("cursor_price").innerHTML = "Price: "+building.price+" $";

  update();
}

var cursor = new Building(10);

/* http://cookieclicker.wikia.com/wiki/Buildings */
