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
  game.innerHTML = `
    <p class="instruction">Are you ready?</p>
    <div class="choices">
      <button id="yesButton">Yes</button>
      <button id="noButton">No</button>
    </div>
  `;

  // Tip: since these buttons were just created, find them and
  // add their event listeners here, after setting innerHTML
  document.getElementById('yesButton').addEventListener('click', nextRound);
  document.getElementById('noButton').addEventListener('click', showLose);
}

// Add your own tricky round here!
function showRound1() {
  game.innerHTML = `
    <p class="instruction">[Your challenge here]</p>
    <div class="choices">
      <button id="round1YesButton">...</button>
      <button id="round1NoButton">...</button>
    </div>
  `;

  document.getElementById('round1YesButton').addEventListener('click', nextRound);
  document.getElementById('round1NoButton').addEventListener('click', showLose);
}

function showWin() {
  game.innerHTML = `
    <p class="instruction">You Win! 🎉</p>
    <button id="playAgainButton">Play Again</button>
  `;

  document.getElementById('playAgainButton').addEventListener('click', restart);
}

function showLose() {
  game.innerHTML = `
    <p class="instruction">You Lose! 😢</p>
    <button id="tryAgainButton">Try Again</button>
  `;

  document.getElementById('tryAgainButton').addEventListener('click', restart);
}
