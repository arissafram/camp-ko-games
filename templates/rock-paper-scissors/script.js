let choices = ['rock', 'paper', 'scissors'];

// Find elements on the page
let playerDisplay = document.getElementById('playerDisplay');
let computerDisplay = document.getElementById('computerDisplay');
let result = document.getElementById('result');

window.addEventListener('load', function () {
  console.log('page loaded!');
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
