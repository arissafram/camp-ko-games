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
      <button onclick="showStart()">No</button>
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
      <button onclick="loseRound('That was too easy.')">✓ Correct</button>
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
    <button id="forbiddenBtn" onclick="nextRound()">DON'T CLICK</button>
  `;

  setTimeout(function() {
    let btn = document.getElementById("forbiddenBtn");
    if (btn) btn.textContent = "SERIOUSLY. DON'T.";
  }, 4000);
}


// ----------------------------------------
// ROUND 3 — False win
// ----------------------------------------

function showRound3() {
  game.innerHTML = `<p class="instruction">You win!</p>`;

  setTimeout(function() {
    game.innerHTML = `
      <p class="instruction">Just kidding.</p>
      <p class="hint">The real button is somewhere on this page.</p>
      <button class="invisible-btn" onclick="nextRound()">win</button>
    `;
  }, 1500);
}


// ----------------------------------------
// WIN
// ----------------------------------------

function showWin() {
  game.innerHTML = `
    <p class="instruction">Okay. Fine.</p>
    <p>You win. Probably.</p>
    <button onclick="restart()">Play Again</button>
  `;
}


// ----------------------------------------
// LOSE A ROUND
// ----------------------------------------

function loseRound(message) {
  game.innerHTML = `
    <p class="instruction">${message}</p>
    <button onclick="showRound()">Try again.</button>
  `;
}


// ----------------------------------------
// GO
// ----------------------------------------

showRound();
