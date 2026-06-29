// The questions array is ready — add your own questions here!
var questions = [
  {
    question: 'What does HTML stand for?',
    answers: ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyper Transfer Mode Link', 'High Text Making Language'],
    correct: 0
  },
  {
    question: 'Which keyword creates a variable that can change?',
    answers: ['const', 'let', 'var', 'define'],
    correct: 1
  },
  {
    question: 'What does console.log() do?',
    answers: ['Saves data to a server', 'Prints a message to the console', 'Creates a new HTML element', 'Stops the page from loading'],
    correct: 1
  }
  // Add more questions here!
];

var current = 0;
var score = 0;

var questionEl = document.getElementById('question');
var counterEl = document.getElementById('counter');
var answersEl = document.getElementById('answers');
var feedbackEl = document.getElementById('feedback');
var quizScreen = document.getElementById('quiz-screen');
var endScreen = document.getElementById('end-screen');
var finalScoreEl = document.getElementById('final-score');
var replayBtn = document.getElementById('replay-btn');

function showQuestion() {
  feedbackEl.textContent = '';
  var q = questions[current];

  // Update the counter text
  counterEl.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;

  // Update the question text
  questionEl.textContent = q.question;

  // Clear old answer buttons
  answersEl.innerHTML = '';

  // TODO: Loop through q.answers and create a button for each one
  // For each answer:
  //   1. Create a button: var btn = document.createElement('button')
  //   2. Set btn.className = 'answer-btn'
  //   3. Set btn.textContent = the answer text
  //   4. Add a click listener: btn.addEventListener('click', function() { pickAnswer(i) })
  //   5. Add the button to answersEl: answersEl.appendChild(btn)
  for (var i = 0; i < q.answers.length; i++) {
    // YOUR CODE HERE
  }
}

function pickAnswer(index) {
  var q = questions[current];

  // TODO: Check if the chosen index matches q.correct
  // If correct: score++ and set feedbackEl.textContent = 'Correct!'
  // If wrong: set feedbackEl.textContent = 'Not quite. The answer was: ' + q.answers[q.correct]

  // YOUR CODE HERE

  // Move to next question after 1.2 seconds
  setTimeout(function () {
    current = current + 1;
    if (current < questions.length) {
      showQuestion();
    } else {
      // TODO: show the end screen
      // quizScreen.style.display = 'none'
      // endScreen.style.display = ''
      // finalScoreEl.textContent = score + ' / ' + questions.length
    }
  }, 1200);
}

replayBtn.addEventListener('click', function () {
  current = 0;
  score = 0;
  quizScreen.style.display = '';
  endScreen.style.display = 'none';
  showQuestion();
});

showQuestion();
