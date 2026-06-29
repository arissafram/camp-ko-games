var HOLES = 9;
var GAME_TIME = 30;

// TODO Step 1: Create variables to track game state
// var score = 0
// var timeLeft = GAME_TIME
// var running = false  (is the game currently going?)
// var moleHole = -1    (which hole has the mole right now, -1 = none)


// TODO Step 2: Grab these elements from the HTML
// var scoreEl = document.getElementById('score')
// var timerEl = document.getElementById('timer')
// var grid = document.getElementById('grid')
// var startScreen, endScreen, finalScoreEl, startBtn, playAgainBtn


// TODO Step 3: Build the grid — create 9 hole divs and add them to grid
// For each i from 0 to HOLES-1:
//   Create a div, set className = 'hole', set dataset.index = i
//   Add it to grid with grid.appendChild(hole)
// Then: var holes = grid.querySelectorAll('.hole')


// TODO Step 4: Write a "showMole" function
// It should:
//   - If not running, return early
//   - Clear the current mole hole (remove has-mole class, clear textContent)
//   - Pick a random hole index (0 to HOLES-1) — not the same as current moleHole
//   - Set that hole's class to has-mole and textContent to '🐹'
//   - Use setTimeout to call showMole again after 800ms


// TODO Step 5: Add a click listener to grid
// When a hole is clicked:
//   - Find which hole was clicked (e.target.closest('.hole'))
//   - Check if its index matches moleHole
//   - If yes: score++, update display, clear that hole, call showMole again sooner


// TODO Step 6: Write "startGame" and "endGame" functions
// startGame: reset score/time, hide screens, call showMole, start setInterval countdown
// endGame: stop running, clear intervals, show end screen with final score


// TODO Step 7: Add click listeners to startBtn and playAgainBtn to call startGame
