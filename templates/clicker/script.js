// Keep track of the score
let score = 0;

// Find elements on the page
let scoreDisplay = document.getElementById('score');
let clickButton = document.getElementById('clickButton');
let resetButton = document.getElementById('resetButton');

window.addEventListener('load', function () {
  console.log('page loaded!');
  updateDisplay();
});

// start here — call this any time the score changes
function updateDisplay() {
  scoreDisplay.textContent = 'Score: ' + score;
}

// When the click button is clicked...
clickButton.addEventListener('click', function () {
  // Tip: add 1 to score, then call updateDisplay()

});

// When the reset button is clicked...
resetButton.addEventListener('click', function () {
  // Tip: set score back to 0, then call updateDisplay()

});
