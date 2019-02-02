var canvas, canvasContext;
var normalKeys = [],
  specialKeys = [];
var keyWidth = 30;
var sequence = [];
var clicking = false,
  playing = false,
  registering = false;
var previousKey = null;
var playingInterval, metronomeInterval;
var tempo;

//var simpleNotesOrder = ['C0', 'D0', 'E0', 'F0', 'G0', 'A0', 'B0'];

//var specialNotesOrder = ['C#0', 'Db0', 'D#0', 'Eb0', 'F#0', 'Gb0', 'G#0', 'Ab0', 'A#0', 'Bb0'];

var notesOrder = ['C0', 'C#0', 'Db0', 'D0', 'D#0', 'Eb0', 'E0', 'F0', 'F#0', 'Gb0', 'G0', 'G#0', 'Ab0', 'A0', 'A#0', 'Bb0', 'B0'];

function setTempo(bpm = 90) {
  tempo = 60000 / bpm;
}

var noteValues = {
  'C0': 16.35,
  'C#0': 17.32,
  'Db0': 17.32,
  'D0': 18.35,
  'D#0': 19.45,
  'Eb0': 19.45,
  'E0': 20.60,
  'F0': 21.83,
  'F#0': 23.12,
  'Gb0': 23.12,
  'G0': 24.50,
  'G#0': 25.96,
  'Ab0': 25.96,
  'A0': 27.50,
  'A#0': 29.14,
  'Bb0': 29.14,
  'B0': 30.87
}

function toggleMetronome() {
  if (metronomeInterval != null) {
    clearInterval(metronomeInterval);
  } else {
    metronomeInterval = setInterval(function () {
      playSound(220);
    }, tempo);
  }
}

function playSound(frequency) {
  var context = new window.AudioContext();
  var gainNode = context.createGain();
  gainNode.connect(context.destination);
  var loudness = 0.5;
  gainNode.gain.value = loudness;
  gainNode.gain.setValueAtTime(loudness, context.currentTime);
  var oscillatorNode = context.createOscillator();
  oscillatorNode.type = 'sine';
  oscillatorNode.connect(gainNode);
  oscillatorNode.frequency.value = frequency;
  var stopAt = context.currentTime + 0.7;
  gainNode.gain.exponentialRampToValueAtTime(0.00001, stopAt);
  oscillatorNode.start();
  oscillatorNode.stop(stopAt);
  oscillatorNode.onended = function () {
    oscillatorNode.onended = null;
    context.close();
  }
}

function playSequence() {
  console.log("Playing sequence");
  playing = true;
  let index = 0;
  interval = setInterval(function () {
    if (index < sequence.length) {
      playSound(sequence[index]);
    } else {
      console.log("Stopped playing");
      clearInterval(interval);
    }
    index++;
  }, tempo);
}

function stopPlaying() {
  console.log("Stopped playing");
  clearInterval(interval);
  playing = false;
}

function registerSequence() {
  registering = !registering;
  if (registering) {
    console.log("Registering. Press again to stop.");
  } else {
    console.log("Stopped registering");
  }
}

function generateKeyboard() {
  canvas = document.createElement('canvas');
  canvas.width = 1475;
  canvas.style.backgroundColor = 'grey';
  canvasContext = canvas.getContext('2d');
  canvas.addEventListener('mousedown', mouseDownEvent);
  document.body.addEventListener('mouseup', mouseUpEvent);
  canvas.addEventListener('mousemove', mouseMoveEvent);
  document.body.appendChild(canvas);

  var x = 0;
  for (let pow = 3; pow < 7; pow++) {
    for (i = 0; i < notesOrder.length; i++) {
      const noteName = notesOrder[i];
      if (noteName.length > 2) {
        x -= keyWidth / 2;
        specialKeys.push(new Key(x, 0, false, noteValues[noteName] * Math.pow(2, pow)));
        x -= keyWidth / 2;
      } else {
        normalKeys.push(new Key(x, 0, true, noteValues[noteName] * Math.pow(2, pow)));
      }
      x += keyWidth;
    }
  }
  drawKeyboard();
  setTempo();
}

function drawKeyboard() {
  normalKeys.forEach(key => {
    key.draw();
  });
  specialKeys.forEach(key => {
    key.draw();
  });
}

function mouseUpEvent(e) {
  clicking = false;
  previousKey = null;
}

function mouseDownEvent(e) {
  clicking = true;
  let key = findKey(e);
  if (key != null) {
    playKey(key);
  }
}

function mouseMoveEvent(e) {
  if (clicking == true) {
    let key = findKey(e);
    if (key != null && key != previousKey) {
      playKey(key);
    }
  }
}

function playKey(key) {
  playSound(key.frequency);
  if (registering) {
    sequence.push(key.frequency);
  }
  previousKey = key;
}

function findKey(e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  var index = (x - (x % keyWidth)) / keyWidth;
  if (y > canvas.height / 3 && index < normalKeys.length) {
    return normalKeys[index];
  } else if (index < specialKeys.length) {
    return specialKeys[index];
  } else if (index < normalKeys.length) {
    return normalKeys[index];
  } else {
    return null;
  }
}

class Key {
  constructor(x, y, isSimple, freq) {
    this.x = x;
    this.y = y;
    this.frequency = freq;
    this.width = keyWidth - 2;
    if (isSimple) {
      this.height = canvas.height * 2 / 3;
      this.color = 'rgb(255,255,255)';
    } else {
      this.height = canvas.height / 3;
      this.color = 'rgb(0,0,0)';
    }
  }

  draw() {
    canvasContext.fillStyle = this.color;
    canvasContext.fillRect(this.x + 1, 0, this.width, this.height);
  }
}

document.onload = generateKeyboard();