var SYMBOLS = ['🎸', '🚀', '🌈', '🦊', '🍕', '⚡', '🎮', '🌊'];

var flipped = [];
var matched = 0;
var moves = 0;
var locked = false;

var grid = document.getElementById('grid');
var pairsEl = document.getElementById('pairs');
var movesEl = document.getElementById('moves');
var winScreen = document.getElementById('win-screen');
var winMovesEl = document.getElementById('win-moves');
var playAgainBtn = document.getElementById('play-again-btn');

// Shuffle helper — already written for you
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function buildGrid() {
  grid.innerHTML = '';
  flipped = [];
  matched = 0;
  moves = 0;
  locked = false;
  pairsEl.textContent = '0 / 8';
  movesEl.textContent = '0';
  winScreen.style.display = 'none';

  // Create the deck: each symbol appears twice, then shuffle
  var deck = shuffle(SYMBOLS.concat(SYMBOLS));

  deck.forEach(function (symbol) {
    var card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.textContent = '';
    grid.appendChild(card);
  });
}

grid.addEventListener('click', function (e) {
  var card = e.target.closest('.card');
  if (!card || locked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  // Flip this card face-up
  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    movesEl.textContent = moves;

    // TODO: Check if flipped[0].dataset.symbol === flipped[1].dataset.symbol
    // If they MATCH:
    //   - Add 'matched' class to both
    //   - Reset flipped to []
    //   - matched++
    //   - Update pairsEl.textContent
    //   - If matched === 8: show win screen after a short timeout

    // If they DON'T match:
    //   - Set locked = true
    //   - After 900ms: remove 'flipped' class from both, clear textContent, reset flipped, set locked = false

    // YOUR CODE HERE
  }
});

playAgainBtn.addEventListener('click', buildGrid);

buildGrid();
