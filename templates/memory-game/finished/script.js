var SYMBOLS = ['🎸', '🚀', '🌈', '🦊', '🍕', '⚡', '🎮', '🌊'];

var cards = [];
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
  cards = [];
  flipped = [];
  matched = 0;
  moves = 0;
  locked = false;
  pairsEl.textContent = '0 / 8';
  movesEl.textContent = '0';
  winScreen.style.display = 'none';

  var deck = shuffle(SYMBOLS.concat(SYMBOLS));

  deck.forEach(function (symbol, i) {
    var card = document.createElement('div');
    card.className = 'card';
    card.dataset.symbol = symbol;
    card.dataset.index = i;
    card.textContent = '';
    grid.appendChild(card);
    cards.push(card);
  });
}

grid.addEventListener('click', function (e) {
  var card = e.target.closest('.card');
  if (!card || locked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;
  flipped.push(card);

  if (flipped.length === 2) {
    locked = true;
    moves++;
    movesEl.textContent = moves;

    if (flipped[0].dataset.symbol === flipped[1].dataset.symbol) {
      // Match
      flipped[0].classList.add('matched');
      flipped[1].classList.add('matched');
      flipped = [];
      locked = false;
      matched++;
      pairsEl.textContent = matched + ' / 8';
      if (matched === 8) {
        setTimeout(function () {
          winMovesEl.textContent = moves + ' move' + (moves === 1 ? '' : 's');
          winScreen.style.display = '';
        }, 400);
      }
    } else {
      // No match — flip back after delay
      setTimeout(function () {
        flipped[0].classList.remove('flipped');
        flipped[1].classList.remove('flipped');
        flipped[0].textContent = '';
        flipped[1].textContent = '';
        flipped = [];
        locked = false;
      }, 900);
    }
  }
});

playAgainBtn.addEventListener('click', buildGrid);

buildGrid();
