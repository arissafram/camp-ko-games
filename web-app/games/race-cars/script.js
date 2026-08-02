// ----------------------------------------
// POSITIONS
// Each player's position — 0 (start) to 85 (finish)
// ----------------------------------------

let player1Pos = 0;
let player2Pos = 0;


// ----------------------------------------
// CONTROLS
// Change these to use different keys
// ----------------------------------------

let player1Key = "a";
let player2Key = "l";


// ----------------------------------------
// GAME STATE
// ----------------------------------------

let gameOver = false;


// ----------------------------------------
// FIND THINGS ON THE PAGE
// ----------------------------------------

let car1 = document.getElementById("car1");
let car2 = document.getElementById("car2");
let status = document.getElementById("status");


// ----------------------------------------
// MOVE A CAR
// ----------------------------------------

function moveCar(player) {
  if (gameOver) return;

  if (player === 1) {
    player1Pos += 5;
    car1.style.left = player1Pos + "%";
    if (player1Pos >= 85) win(1);
  }

  if (player === 2) {
    player2Pos += 5;
    car2.style.left = player2Pos + "%";
    if (player2Pos >= 85) win(2);
  }
}


// ----------------------------------------
// WIN
// ----------------------------------------

function win(player) {
  gameOver = true;
  status.textContent = "Player " + player + " wins!";
}


// ----------------------------------------
// RESET
// ----------------------------------------

function resetRace() {
  player1Pos = 0;
  player2Pos = 0;
  gameOver = false;

  car1.style.left = "0%";
  car2.style.left = "0%";
  status.textContent = "";
}


// ----------------------------------------
// LISTEN FOR KEY PRESSES
// ----------------------------------------

document.addEventListener("keydown", function(event) {
  if (event.key.toLowerCase() === player1Key) moveCar(1);
  if (event.key.toLowerCase() === player2Key) moveCar(2);
});
