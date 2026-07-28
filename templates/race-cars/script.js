// Position of each car — 0 (start) to 85 (finish)
let player1Pos = 0;
let player2Pos = 0;

// Change these to use different keys
let player1Key = 'a';
let player2Key = 'l';

let gameOver = false;

// Find elements on the page
let car1 = document.getElementById('car1');
let car2 = document.getElementById('car2');
let status = document.getElementById('status');

window.addEventListener('load', function () {
  console.log('page loaded!');
});

// start here — move one car forward each time a key is pressed
function moveCar(player) {
  if (gameOver) return;

  if (player === 1) {
    // Tip: increase player1Pos by some amount, then update the car's position:
    //   car1.style.left = player1Pos + '%';
    // Then check if player1Pos >= 85 to call win(1)

  }

  if (player === 2) {
    // Same idea for player 2

  }
}

function win(player) {
  gameOver = true;
  status.textContent = 'Player ' + player + ' wins!';
}

function resetRace() {
  player1Pos = 0;
  player2Pos = 0;
  gameOver = false;
  car1.style.left = '0%';
  car2.style.left = '0%';
  status.textContent = '';
}

// Tip: keydown fires whenever a key is pressed — check which key with event.key
document.addEventListener('keydown', function (event) {
  if (event.key.toLowerCase() === player1Key) moveCar(1);
  if (event.key.toLowerCase() === player2Key) moveCar(2);
});
