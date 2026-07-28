// Tip: querySelectorAll finds ALL elements matching a selector
const spots = document.querySelectorAll('.spot');
const message = document.querySelector('#message');
const playAgainButton = document.querySelector('#play-again');

// Tip: Math.random() picks a number from 0 up to (but not including) spots.length
const treasureSpot = Math.floor(Math.random() * spots.length);

window.addEventListener('load', function () {
  console.log('page loaded!');
  startGame();
});

// start here
function startGame() {
  message.textContent = '';
  playAgainButton.style.display = 'none';

  // Reset all spots
  spots.forEach(function (spot) {
    spot.disabled = false;
    spot.textContent = '❔';
  });
}

function checkSpot(index, spot) {
  if (spot.disabled) return;

  if (index === treasureSpot) {
    // Found it!
    spot.textContent = '💰';
    message.textContent = 'You found the treasure!';
    playAgainButton.style.display = 'inline-block';
    spots.forEach(function (s) {
      s.disabled = true;
    });
  } else {
    // Wrong spot — add your own reaction here!
    spot.textContent = '❌';
    spot.disabled = true;
    message.textContent = 'Nope! Keep looking...';
  }
}

// Tip: forEach gives you each spot AND its index (position number)
spots.forEach(function (spot, index) {
  spot.addEventListener('click', function () {
    checkSpot(index, spot);
  });
});

playAgainButton.addEventListener('click', startGame);
