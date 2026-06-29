var HOLES = 9;
var GAME_TIME = 30;
var MOLE_DURATION = 800;

var score = 0;
var timeLeft = GAME_TIME;
var moleHole = -1;
var moleTimeout = null;
var countdownInterval = null;
var running = false;

var scoreEl = document.getElementById('score');
var timerEl = document.getElementById('timer');
var grid = document.getElementById('grid');
var startScreen = document.getElementById('start-screen');
var endScreen = document.getElementById('end-screen');
var finalScoreEl = document.getElementById('final-score');
var startBtn = document.getElementById('start-btn');
var playAgainBtn = document.getElementById('play-again-btn');

// Build grid
for (var i = 0; i < HOLES; i++) {
  var hole = document.createElement('div');
  hole.className = 'hole';
  hole.dataset.index = i;
  grid.appendChild(hole);
}

var holes = grid.querySelectorAll('.hole');

function showMole() {
  if (!running) return;

  // Clear current mole
  if (moleHole >= 0) {
    holes[moleHole].classList.remove('has-mole');
    holes[moleHole].textContent = '';
  }

  // Pick a new random hole (different from current)
  var next;
  do { next = Math.floor(Math.random() * HOLES); } while (next === moleHole);
  moleHole = next;

  holes[moleHole].classList.add('has-mole');
  holes[moleHole].textContent = '🐹';

  moleTimeout = setTimeout(showMole, MOLE_DURATION);
}

grid.addEventListener('click', function (e) {
  var hole = e.target.closest('.hole');
  if (!hole || !running) return;
  var idx = Number(hole.dataset.index);
  if (idx !== moleHole) return;

  score++;
  scoreEl.textContent = score;
  moleHole = -1;
  hole.classList.remove('has-mole');
  hole.classList.add('hit');
  hole.textContent = '';

  clearTimeout(moleTimeout);
  setTimeout(function () {
    hole.classList.remove('hit');
    showMole();
  }, 150);
});

function startGame() {
  score = 0;
  timeLeft = GAME_TIME;
  scoreEl.textContent = 0;
  timerEl.textContent = GAME_TIME;
  moleHole = -1;
  running = true;

  holes.forEach(function (h) {
    h.classList.remove('has-mole', 'hit');
    h.textContent = '';
  });

  startScreen.style.display = 'none';
  endScreen.style.display = 'none';

  showMole();

  countdownInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  running = false;
  clearInterval(countdownInterval);
  clearTimeout(moleTimeout);

  if (moleHole >= 0) {
    holes[moleHole].classList.remove('has-mole');
    holes[moleHole].textContent = '';
    moleHole = -1;
  }

  finalScoreEl.textContent = score;
  endScreen.style.display = '';
}

startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', startGame);
