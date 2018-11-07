window.onload = createMenu();

function createMenu() {
  var div = document.createElement('div');
  div.setAttribute('id', 'menu');

  var play = document.createElement('button');
  play.setAttribute('id', 'play');
  play.setAttribute('onclick', 'play()');

  var options = document.createElement('button');
  options.setAttribute('id', 'options');
  options.setAttribute('onclick', 'options()');

  var instructions = document.createElement('button');
  instructions.setAttribute('id', 'instructions');
  instructions.setAttribute('onclick', 'instructions()');

  var exit = document.createElement('a');
  exit.setAttribute('id', 'exit');
  exit.setAttribute('href', '../../index.html');

  div.appendChild(play);
  div.appendChild(options);
  div.appendChild(instructions);
  div.appendChild(exit);
  document.body.appendChild(div);
}
