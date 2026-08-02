// ----------------------------------------
// CARDS
// Add or change the pairs here.
// Each emoji needs to appear twice.
// ----------------------------------------

let cards = [
  "🐶", "🐶",
  "🐸", "🐸",
  "🐱", "🐱",
  "🐻", "🐻",
  "🐯", "🐯",
  "🦊", "🦊"
];


// ----------------------------------------
// GAME STATE
// ----------------------------------------

let firstCard = null;
let secondCard = null;
let locked = false;
let matches = 0;


// ----------------------------------------
// FIND THINGS ON THE PAGE
// ----------------------------------------

let grid = document.getElementById("grid");
let status = document.getElementById("status");


// ----------------------------------------
// SHUFFLE
// ----------------------------------------

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


// ----------------------------------------
// SET UP THE GAME
// ----------------------------------------

function setup() {
  grid.innerHTML = "";
  firstCard = null;
  secondCard = null;
  locked = false;
  matches = 0;
  status.textContent = "";

  let shuffled = shuffle(cards);

  shuffled.forEach(function(emoji) {
    let card = document.createElement("div");
    card.className = "card";
    card.textContent = "?";
    card.dataset.emoji = emoji;

    card.addEventListener("click", function() {
      flipCard(card);
    });

    grid.appendChild(card);
  });
}


// ----------------------------------------
// FLIP A CARD
// ----------------------------------------

function flipCard(card) {
  if (locked) return;
  if (card.classList.contains("matched")) return;
  if (card === firstCard) return;

  card.textContent = card.dataset.emoji;
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  locked = true;

  // Check for a match
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard = null;
    secondCard = null;
    locked = false;
    matches++;

    if (matches === cards.length / 2) {
      status.textContent = "You found them all!";
    }

  } else {
    // Not a match — flip back after a moment
    let a = firstCard;
    let b = secondCard;

    setTimeout(function() {
      a.textContent = "?";
      b.textContent = "?";
      a.classList.remove("flipped");
      b.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
      locked = false;
    }, 800);
  }
}


// ----------------------------------------
// START
// ----------------------------------------

setup();
