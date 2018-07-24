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

var money = 100;
var click_value = 1;
var total_cookies_per_sec = 10;

update();

function Building(price = 0, cookies_per_sec = 0, free = 0, owned = 0) {
  this.price = price;
  this.cookies_per_sec = cookies_per_sec;
  this.free = free;
  this.owned = owned;
}

function update(/*e*/) {
  document.getElementById('money').innerHTML = "Money: " + money + " $";
  money += total_cookies_per_sec;
  /*var tag = "element id: " + e.target;
  alert(tag);*/
}

function button_click() {
  money += click_value;
  update();
}

function cursor_function(obj) {
  if (money >= obj.price) {
    buy(obj);
  }
}

function buy(building) {
  money -= building.price;
  total_cookies_per_sec += this.cookies_per_sec;
  building.price = building.price * 1.15 ^ (building.owned - building.free);
  building.owned++;
  document.getElementById("cursor_img").setAttribute("title","Cursor [owned: "+building.owned+"]&#013;Number needed for next amelioration: 1&#013;Each cursor produces 0.1 cookies per second&#013;Autoclicks once every 10 seconds");
  document.getElementById("cursor_price").innerHTML = "Price: " + building.price;

  update();
}

var cursor = new Building(15, 0.1);
var grandma = new Building(100, 1);
var farm = new Building(1100, 8);
var mine = new Building(12000, 47);
var factory = new Building(130000, 260);
var bank = new Building(1400000, 1400);
var temple = new Building(20000000, 7800);
var wizardTower = new Building(330000000, 44000);
var shipment = new Building(5100000000, 260000);
var grandma = new Building(75000000000, 1600000);



window.setInterval(update, 1000);

/* http://cookieclicker.wikia.com/wiki/Buildings */
