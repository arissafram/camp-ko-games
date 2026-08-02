// ----------------------------------------
// REMEMBER THE SCORE AND TIME
// ----------------------------------------

let score = 0;
let highScore = Number(localStorage.getItem("clickerHighScore")) || 0;
let timeLeft = 5;
let countdownValue = 3;
let gameTimerId = null;
let countdownTimerId = null;


// ----------------------------------------
// FIND THINGS ON THE PAGE
// ----------------------------------------

let scoreDisplay = document.getElementById("score");
let highScoreDisplay = document.getElementById("highScore");
let timerDisplay = document.getElementById("timer");
let countdownDisplay = document.getElementById("countdown");
let startButton = document.getElementById("startButton");
let playControls = document.getElementById("playControls");
let clickButton = document.getElementById("clickButton");
let resetButton = document.getElementById("resetButton");


// ----------------------------------------
// SHOW THE SCORE, HIGH SCORE, AND TIME
// ----------------------------------------

function updateScoreDisplay() {
  scoreDisplay.textContent = "Score: " + score;
}

function updateHighScoreDisplay() {
  highScoreDisplay.textContent = "High Score: " + highScore;
}

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft + "s";
}

updateHighScoreDisplay();


// ----------------------------------------
// WHEN THE START BUTTON IS CLICKED...
// ----------------------------------------

startButton.addEventListener("click", function () {
  startButton.classList.add("is-hidden");

  countdownValue = 3;
  countdownDisplay.classList.remove("is-hidden");
  countdownDisplay.textContent = countdownValue;

  countdownTimerId = setInterval(function () {
    countdownValue = countdownValue - 1;

    if (countdownValue > 0) {
      countdownDisplay.textContent = countdownValue;
    } else {
      clearInterval(countdownTimerId);
      countdownDisplay.classList.add("is-hidden");
      startGame();
    }
  }, 1000);
});


// ----------------------------------------
// START THE GAME
// ----------------------------------------

function startGame() {
  playControls.classList.remove("is-hidden");
  clickButton.disabled = false;

  timeLeft = 5;
  updateTimerDisplay();

  gameTimerId = setInterval(function () {
    timeLeft = timeLeft - 1;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(gameTimerId);
      clickButton.disabled = true;
      resetButton.classList.remove("is-hidden");
    }
  }, 1000);
}


// ----------------------------------------
// WHEN THE CLICK BUTTON IS CLICKED...
// ----------------------------------------

clickButton.addEventListener("click", function () {
  score = score + 1;
  updateScoreDisplay();

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("clickerHighScore", highScore);
    updateHighScoreDisplay();
  }
});


// ----------------------------------------
// WHEN THE RESET BUTTON IS CLICKED...
// ----------------------------------------

resetButton.addEventListener("click", function () {
  clearInterval(gameTimerId);
  clearInterval(countdownTimerId);

  score = 0;
  timeLeft = 5;
  updateScoreDisplay();
  updateTimerDisplay();

  playControls.classList.add("is-hidden");
  clickButton.disabled = false;
  resetButton.classList.add("is-hidden");
  startButton.classList.remove("is-hidden");
});
