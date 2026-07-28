// Tracks which round the player is on
let round = 0;

let game = document.getElementById('game');

window.addEventListener('load', function () {
  console.log('page loaded!');
  showRound();
});

// Tip: call nextRound() to move forward, restart() to go back to the start
function nextRound() {
  round = round + 1;
  showRound();
}

function restart() {
  round = 0;
  showRound();
}

// Tip: use round to decide which screen to show
function showRound() {
  if (round === 0) showStart();
  else if (round === 1) showRound1();
  else showWin();
}

// start here — the first screen players see
function showStart() {
  // Tip: set game.innerHTML to put HTML inside the game div
  // Use backticks ` ` to write multi-line HTML strings
  // Use onclick="functionName()" to call a function when a button is clicked
  game.innerHTML = `
    <p class="instruction">Are you ready?</p>
    <div class="choices">
      <button onclick="nextRound()">Yes</button>
      <button onclick="showLose()">No</button>
    </div>
  `;
}

// Add your own tricky round here!
function showRound1() {
  game.innerHTML = `
    <p class="instruction">[Your challenge here]</p>
    <div class="choices">
      <button onclick="nextRound()">...</button>
      <button onclick="showLose()">...</button>
    </div>
  `;
}

function showWin() {
  game.innerHTML = `
    <p class="instruction">You Win! 🎉</p>
    <button onclick="restart()">Play Again</button>
  `;
}

function showLose() {
  game.innerHTML = `
    <p class="instruction">You Lose! 😢</p>
    <button onclick="restart()">Try Again</button>
  `;
}
