// Add or change your answers here
let answers = [
  'Definitely',
  'Probably',
  'Ask again later',
  'Not looking good',
  'Absolutely not',
];

// Find elements on the page
let questionInput = document.getElementById('questionInput');
let askButton = document.getElementById('askButton');
let answerDisplay = document.getElementById('answer');

window.addEventListener('load', function () {
  console.log('page loaded!');
});

// start here
function answerQuestion() {
  let question = questionInput.value;

  // Tip: if the input is empty, show a message and stop early
  if (question === '') {
    answerDisplay.textContent = 'Ask me a question first!';
    return;
  }

  // Tip: pick a random item from an array like this:
  //   let randomIndex = Math.floor(Math.random() * answers.length);
  //   let answer = answers[randomIndex];

  // Now show the answer on the page!
}

askButton.addEventListener('click', answerQuestion);
