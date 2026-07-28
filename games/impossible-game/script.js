// ----------------------------------------
// STAGE
// Keep track of which round we're on
// ----------------------------------------

let round = 0;

let game = document.getElementById("game");


// ----------------------------------------
// SHOW THE CURRENT ROUND
// ----------------------------------------

function showRound() {
  if (round === 0) showStart();
  else if (round === 1) showRound1();
  else if (round === 2) showRound2();
  else if (round === 3) showRound3();
  else showWin();
}

function nextRound() {
  round = round + 1;
  showRound();
}

function restart() {
  round = 0;
  showRound();
}


// ----------------------------------------
// START
// ----------------------------------------

function showStart() {
  game.innerHTML = `
    <p class="instruction">Are you ready?</p>
    <div class="choices">
      <button onclick="nextRound()">Yes</button>
      <button onclick="showLose()">No</button>
    </div>
  `;
}


// ----------------------------------------
// ROUND 1 — Pick the correct button
// ----------------------------------------

function showRound1() {
  game.innerHTML = `
    <p class="instruction">Pick the correct button.</p>
    <div class="choices">
      <button onclick="showLose()">✓ Correct</button>
      <button onclick="nextRound()">✗ Wrong</button>
    </div>
  `;
}


// ----------------------------------------
// ROUND 2 — Don't click the button
// ----------------------------------------

function showRound2() {
  game.innerHTML = `
    <p class="instruction">Whatever you do, do NOT click the button.</p>
    <button id="forbiddenBtn">DON'T CLICK</button>
  `;

  let btn = document.getElementById("forbiddenBtn");

  // Clicking the button loses the game
  function handleButtonClick(event) {
    event.stopPropagation();
    document.removeEventListener("click", handleOutsideClick);
    showLose();
  }

  // Clicking anywhere else moves on
  function handleOutsideClick() {
    document.removeEventListener("click", handleOutsideClick);
    nextRound();
  }

  btn.addEventListener("click", handleButtonClick);

  // Wait a beat so the click that opened this round doesn't
  // immediately count as an outside click
  setTimeout(function() {
    document.addEventListener("click", handleOutsideClick);
  }, 0);

  setTimeout(function() {
    let btn = document.getElementById("forbiddenBtn");
    if (btn) btn.textContent = "SERIOUSLY. DON'T.";
  }, 4000);
}


// ----------------------------------------
// ROUND 3 — False win
// ----------------------------------------

function showRound3() {
  game.innerHTML = `
    <p class="instruction">The real <button class="invisible-btn" onclick="nextRound()">button</button> is somewhere on this page.</p>
    <div class="choices">
      <button onclick="randomColor(this)">button</button>
      <button onclick="fadeButton(this)">button</button>
      <button onclick="this.style.transform = this.style.transform ? '' : 'rotate(180deg)'">button</button>
    </div>
  `;
}

// Decoy button behaviors — none of these move the game forward

function randomColor(el) {
  let hue = Math.floor(Math.random() * 360);
  el.style.background = "hsl(" + hue + ", 70%, 70%)";
}

function fadeButton(el) {
  el.style.transition = "opacity 0.3s";
  el.style.opacity = 0;
  setTimeout(function() {
    el.style.opacity = 1;
  }, 300);
}


// ----------------------------------------
// WIN
// ----------------------------------------

function showWin() {
  game.innerHTML = `
    <p class="instruction">You Win!</p>
    <button onclick="restart()">Play Again</button>
  `;
}


// ----------------------------------------
// LOSE
// ----------------------------------------

function showLose() {
  game.innerHTML = `
    <p class="instruction">You lose!</p>
    <button onclick="restart()">Play Again</button>
  `;
}


// ----------------------------------------
// GO
// ----------------------------------------

showRound();
