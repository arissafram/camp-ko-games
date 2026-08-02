// ----------------------------------------
// REMEMBER THE SCORE
// ----------------------------------------

let score = 0;


// ----------------------------------------
// FIND THINGS ON THE PAGE
// ----------------------------------------

let scoreDisplay = document.getElementById("score");
let clickButton = document.getElementById("clickButton");
let resetButton = document.getElementById("resetButton");


// ----------------------------------------
// SHOW THE SCORE
// ----------------------------------------

function updateDisplay() {
  scoreDisplay.textContent = "Score: " + score;
}


// ----------------------------------------
// WHEN THE CLICK BUTTON IS CLICKED...
// ----------------------------------------

clickButton.addEventListener("click", function () {
  score = score + 1;
  updateDisplay();
});


// ----------------------------------------
// WHEN THE RESET BUTTON IS CLICKED...
// ----------------------------------------

resetButton.addEventListener("click", function () {
  score = 0;
  updateDisplay();
});
