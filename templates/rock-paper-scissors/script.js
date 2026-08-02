let choices = ['rock', 'paper', 'scissors'];

// Find elements on the page
let playerDisplay = document.getElementById('playerDisplay');
let computerDisplay = document.getElementById('computerDisplay');
let result = document.getElementById('result');
let rockButton = document.getElementById('rockButton');
let paperButton = document.getElementById('paperButton');
let scissorsButton = document.getElementById('scissorsButton');

window.addEventListener('load', function () {
  console.log('page loaded!');

  rockButton.addEventListener('click', function () {
    play('rock');
  });
  paperButton.addEventListener('click', function () {
    play('paper');
  });
  scissorsButton.addEventListener('click', function () {
    play('scissors');
  });
});

// start here — called when the player clicks a button
function play(playerChoice) {
  // Tip: have the computer pick randomly like this:
  let randomIndex = Math.floor(Math.random() * choices.length);
  let computerChoice = choices[randomIndex];

  // Show what each side picked
  playerDisplay.textContent = playerChoice;
  computerDisplay.textContent = computerChoice;

  // Tip: decide who wins!
  // Check tie first, then check each winning combo:
  //   rock beats scissors
  //   paper beats rock
  //   scissors beats paper
  if (playerChoice === computerChoice) {
    result.textContent = 'Tie!';
  // } else if () {
  //   // player wins
  // } else {
  //   // computer wins
  }
}
