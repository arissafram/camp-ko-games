// Each emoji must appear TWICE
let cards = [
  '🐶', '🐶',
  '🐸', '🐸',
  '🐱', '🐱',
  '🐻', '🐻',
];

// Game state — track which cards are flipped
let firstCard = null;
let secondCard = null;
let locked = false;
let matches = 0;

// Find elements on the page
let grid = document.getElementById('grid');
let status = document.getElementById('status');
let resetButton = document.getElementById('resetButton');

window.addEventListener('load', function () {
  console.log('page loaded!');
  setup();

  resetButton.addEventListener('click', setup);
});

// Tip: this shuffle function mixes up an array randomly — you don't need to change it!
function shuffle(array) {
  let a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

// start here — builds the grid and resets state
function setup() {
  grid.innerHTML = '';
  firstCard = null;
  secondCard = null;
  locked = false;
  matches = 0;
  status.textContent = '';

  let shuffled = shuffle(cards);

  shuffled.forEach(function (emoji) {
    let card = document.createElement('div');
    card.className = 'card';
    card.textContent = emoji;
    card.dataset.emoji = emoji;

    card.addEventListener('click', function () {
      flipCard(card);
    });

    grid.appendChild(card);
  });
}

function flipCard(card) {
  // Tip: use `locked` to block clicks while checking a pair
  if (locked) return;
  if (card === firstCard) return;
  if (card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
    return;
  }

  // This is the second card — check for a match!
  secondCard = card;
  locked = true;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    // It's a match! Mark both cards and reset for next pair.
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard = null;
    secondCard = null;
    locked = false;
    matches++;

    // Tip: check if matches === cards.length / 2 to know if the game is done

  } else {
    // Not a match — flip them back after a short wait
    // Tip: save firstCard and secondCard before the timeout,
    //   since they'll be reset to null inside it
    let a = firstCard;
    let b = secondCard;
    setTimeout(function () {
      a.classList.remove('flipped');
      b.classList.remove('flipped');
      firstCard = null;
      secondCard = null;
      locked = false;
    }, 800);
  }
}
