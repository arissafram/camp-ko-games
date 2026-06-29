var STEP = 2; // how many percent each key press adds

// TODO Step 1: Create a variable to track each player's progress
// var progress = [0, 0]   (index 0 = player 1, index 1 = player 2)
// var done = false         (true when someone has won)


// TODO Step 2: Grab the bar elements (the colored fills inside the tracks)
// var bar1 = document.getElementById('bar1')
// var bar2 = document.getElementById('bar2')
// (also grab pct1, pct2, winBanner, winnerText, startHint, resetBtn)


// TODO Step 3: Write an "advance" function that takes a player number (0 or 1)
// It should:
//   - If done is true, return early (the game is over)
//   - Hide startHint
//   - Add STEP to progress[player], but don't go over 100
//     Hint: Math.min(100, progress[player] + STEP)
//   - Update the bar's width: bars[player].style.width = progress[player] + '%'
//   - Update the pct text
//   - If progress[player] >= 100: set done = true, show the win banner with the winner's name


// TODO Step 4: Add a keydown listener to document
// If e.key is 'q' or 'Q': call advance(0)
// If e.key is 'p' or 'P': call advance(1)
// Use e.preventDefault() so the key doesn't scroll the page


// TODO Step 5: Add a click listener to resetBtn
// Reset done, progress, bar widths, pct text, hide winBanner, show startHint
