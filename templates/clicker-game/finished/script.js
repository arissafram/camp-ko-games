var score = 0;
var highScore = Number(localStorage.getItem('clicker-high')) || 0;

var clickTimes = [];

var scoreEl = document.getElementById('score');
var cpsEl = document.getElementById('cps');
var highScoreEl = document.getElementById('high-score');
var clickBtn = document.getElementById('click-btn');
var resetBtn = document.getElementById('reset-btn');

highScoreEl.textContent = highScore;

function updateDisplay() {
  scoreEl.textContent = score;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('clicker-high', highScore);
    highScoreEl.textContent = highScore;
  }
}

function updateCPS() {
  var now = Date.now();
  clickTimes = clickTimes.filter(function (t) { return now - t < 1000; });
  cpsEl.textContent = clickTimes.length;
}

clickBtn.addEventListener('click', function () {
  score = score + 1;
  clickTimes.push(Date.now());
  updateDisplay();
  updateCPS();
});

resetBtn.addEventListener('click', function () {
  score = 0;
  clickTimes = [];
  updateDisplay();
  cpsEl.textContent = 0;
});

setInterval(updateCPS, 200);
