// The symbols to use — 8 pairs
var SYMBOLS = ['🎸', '🚀', '🌈', '🦊', '🍕', '⚡', '🎮', '🌊'];

// TODO Step 1: Create variables to track state
// var flipped = []    (array of currently face-up cards, max 2)
// var matched = 0     (how many pairs have been matched)
// var moves = 0       (total flips / 2)
// var locked = false  (true while we're waiting to flip cards back)


// TODO Step 2: Grab elements from the HTML
// var grid, pairsEl, movesEl, winScreen, winMovesEl, playAgainBtn


// TODO Step 3: Write a "shuffle" function that returns a shuffled copy of an array
// Hint: loop backwards, swap each element with a random earlier element


// TODO Step 4: Write a "buildGrid" function
// It should:
//   - Reset all variables (flipped=[], matched=0, moves=0, locked=false)
//   - Clear the grid (grid.innerHTML = '')
//   - Create a deck: SYMBOLS + SYMBOLS (16 items), then shuffle it
//   - For each symbol, create a div with class 'card' and dataset.symbol = symbol
//   - Add all card divs to the grid
//   - Hide winScreen


// TODO Step 5: Add a click listener to grid
// When a card is clicked:
//   - If locked, or card is already flipped/matched, return early
//   - Add 'flipped' class, show the symbol (card.textContent = card.dataset.symbol)
//   - Push card to flipped array
//   - If flipped has 2 cards:
//       - Increment moves, update movesEl
//       - If the symbols match: mark both as 'matched', matched++, update pairsEl
//         - If matched === 8: show win screen
//       - If they don't match: set locked=true, after 900ms flip both back and unlock


// TODO Step 6: Add click listener to playAgainBtn to call buildGrid


// buildGrid()  ← uncomment this line when you're ready to test
