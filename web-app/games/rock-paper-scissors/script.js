// ----------------------------------------
// CHOICES
// Change these or add your own.
// ----------------------------------------

let choices = ["rock", "paper", "scissors"];


// ----------------------------------------
// FIND THINGS ON THE PAGE
// ----------------------------------------

let playerDisplay = document.getElementById("playerDisplay");
let computerDisplay = document.getElementById("computerDisplay");
let result = document.getElementById("result");


// ----------------------------------------
// EMOJI FOR EACH CHOICE
// ----------------------------------------

function emoji(choice) {
  if (choice === "rock") return "✊";
  if (choice === "paper") return "📄";
  if (choice === "scissors") return "✂️";
}


// ----------------------------------------
// PLAY A ROUND
// ----------------------------------------

function play(playerChoice) {

  // Let the computer choose randomly
  let randomIndex = Math.floor(Math.random() * choices.length);
  let computerChoice = choices[randomIndex];

  // Show what each side played
  playerDisplay.textContent = emoji(playerChoice);
  computerDisplay.textContent = emoji(computerChoice);

  // Decide who wins
  if (playerChoice === computerChoice) {
    result.textContent = "Tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result.textContent = "You win!";
  } else {
    result.textContent = "BOT wins!";
  }
}
