// Step 1: The score variable is ready for you
var score = 0;

// Step 2: These grab elements from the HTML — already done!
var scoreEl = document.getElementById('score');
var clickBtn = document.getElementById('click-btn');
var resetBtn = document.getElementById('reset-btn');

// Step 3: This function updates what's shown on screen — already done!
function updateDisplay() {
  scoreEl.textContent = score;
}

// Step 4: Add a click event listener to clickBtn
// When clicked: add 1 to score, then call updateDisplay()
clickBtn.addEventListener('click', function () {
  // TODO: score = score + ???
  // TODO: call updateDisplay()
});

// Step 5: Add a click event listener to resetBtn
// When clicked: set score back to 0, then call updateDisplay()
resetBtn.addEventListener('click', function () {
  // TODO: score = ???
  // TODO: call updateDisplay()
});
