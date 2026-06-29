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

// Build the grid — already done for you!
for (var i = 0; i < HOLES; i++) {
  var hole = document.createElement('div');
  hole.className = 'hole';
  hole.dataset.index = i;
  grid.appendChild(hole);
}
var holes = grid.querySelectorAll('.hole');

// showMole: pick a random hole, show the mole there, then repeat
function showMole() {
  if (!running) return;

  // Clear the current mole
  if (moleHole >= 0) {
    holes[moleHole].classList.remove('has-mole');
    holes[moleHole].textContent = '';
  }

  // TODO: Pick a new random hole index (0 to HOLES-1)
  // Make sure it's different from moleHole
  // Hint: Math.floor(Math.random() * HOLES)
  var next = 0; // replace this line!
  moleHole = next;

  // Show the mole
  holes[moleHole].classList.add('has-mole');
  holes[moleHole].textContent = '🐹';

  // Call showMole again after MOLE_DURATION milliseconds
  moleTimeout = setTimeout(showMole, MOLE_DURATION);
}

// Click listener — already wired up, fill in the hit logic
grid.addEventListener('click', function (e) {
  var hole = e.target.closest('.hole');
  if (!hole || !running) return;
  var idx = Number(hole.dataset.index);

  // TODO: Check if idx === moleHole (the player hit the mole!)
  // If yes:
  //   score++
  //   scoreEl.textContent = score
  //   Set moleHole = -1
  //   Remove 'has-mole' class and clear textContent from this hole
  //   clearTimeout(moleTimeout)
  //   Call showMole() to immediately show the next mole
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

  // TODO: Use setInterval to count down every 1000ms
  // Each tick: timeLeft--, update timerEl, call endGame() when timeLeft <= 0
  countdownInterval = setInterval(function () {
    // YOUR CODE HERE
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
