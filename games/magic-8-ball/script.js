// ----------------------------------------
// ANSWERS
// Change these or add your own.
// ----------------------------------------

let answers = [
  "Definitely",
  "Probably",
  "Ask again later",
  "Not looking good",
  "Absolutely not",
  "Anything is possible"
];


// ----------------------------------------
// FIND THINGS ON THE PAGE
// ----------------------------------------

let questionInput = document.getElementById("questionInput");
let askButton = document.getElementById("askButton");
let answerDisplay = document.getElementById("answer");


// ----------------------------------------
// ANSWER THE QUESTION
// ----------------------------------------

function answerQuestion() {

  let question = questionInput.value;

  // Make sure they actually asked something
  if (question === "") {
    answerDisplay.textContent = "Ask me a question first.";
    return;
  }

  // Pick a random answer
  let randomIndex = Math.floor(Math.random() * answers.length);
  let answer = answers[randomIndex];

  // Show the answer
  answerDisplay.textContent = answer;
}


// ----------------------------------------
// WHEN THE BUTTON IS CLICKED...
// ----------------------------------------

askButton.addEventListener("click", answerQuestion);
