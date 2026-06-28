var questions = [
  {
    question: 'What does HTML stand for?',
    answers: ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyper Transfer Mode Link', 'High Text Making Language'],
    correct: 0
  },
  {
    question: 'What does CSS stand for?',
    answers: ['Cascading Style Sheets', 'Computer Style Script', 'Creative Styling System', 'Colorful Syntax Sheets'],
    correct: 0
  },
  {
    question: 'Which keyword do you use to create a variable that can change?',
    answers: ['const', 'let', 'var', 'define'],
    correct: 1
  },
  {
    question: 'What does console.log() do?',
    answers: ['Saves data to the server', 'Prints a message to the browser console', 'Creates a new HTML element', 'Stops the page from loading'],
    correct: 1
  },
  {
    question: 'Which symbol checks if two values are equal in JavaScript?',
    answers: ['=', '==', '===', '!=='],
    correct: 2
  },
  {
    question: 'What does Math.random() return?',
    answers: ['A random whole number from 1 to 10', 'A random decimal between 0 and 1', 'A random letter from the alphabet', 'A random color'],
    correct: 1
  },
  {
    question: 'How do you add an item to the end of an array called "items"?',
    answers: ['items.add("thing")', 'items.push("thing")', 'items.append("thing")', 'items.last = "thing"'],
    correct: 1
  },
  {
    question: 'What does addEventListener do?',
    answers: ['Creates a new HTML element', 'Styles an element', 'Runs a function when an event happens', 'Removes an element from the page'],
    correct: 2
  },
  {
    question: 'Arrays in JavaScript start at index:',
    answers: ['1', '0', '-1', '10'],
    correct: 1
  },
  {
    question: 'What does setInterval do?',
    answers: ['Runs a function once after a delay', 'Runs a function over and over on a timer', 'Sets the size of an element', 'Waits for a key press'],
    correct: 1
  }
];

var current = 0;
var score = 0;
var answered = false;

var questionEl = document.getElementById('question');
var counterEl = document.getElementById('counter');
var answersEl = document.getElementById('answers');
var feedbackEl = document.getElementById('feedback');
var progressEl = document.getElementById('progress');
var quizScreen = document.getElementById('quiz-screen');
var endScreen = document.getElementById('end-screen');
var finalScoreEl = document.getElementById('final-score');
var finalMsgEl = document.getElementById('final-msg');
var replayBtn = document.getElementById('replay-btn');

function showQuestion() {
  answered = false;
  feedbackEl.textContent = '';
  var q = questions[current];
  counterEl.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
  progressEl.style.width = (current / questions.length * 100) + '%';
  questionEl.textContent = q.question;

  answersEl.innerHTML = '';
  q.answers.forEach(function (text, i) {
    var btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = text;
    btn.addEventListener('click', function () { pickAnswer(i, btn); });
    answersEl.appendChild(btn);
  });
}

function pickAnswer(index, btn) {
  if (answered) return;
  answered = true;

  var q = questions[current];
  var buttons = answersEl.querySelectorAll('.answer-btn');
  buttons.forEach(function (b) { b.disabled = true; });

  if (index === q.correct) {
    score++;
    btn.classList.add('correct');
    feedbackEl.textContent = 'Correct!';
  } else {
    btn.classList.add('wrong');
    buttons[q.correct].classList.add('correct');
    feedbackEl.textContent = 'Not quite. The answer was: ' + q.answers[q.correct];
  }

  setTimeout(function () {
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showEnd();
    }
  }, 1200);
}

function showEnd() {
  quizScreen.style.display = 'none';
  endScreen.style.display = '';
  finalScoreEl.textContent = score + ' / ' + questions.length;
  var msg = '';
  if (score === questions.length) msg = 'Perfect score!';
  else if (score >= 7) msg = 'Great job!';
  else if (score >= 5) msg = 'Not bad!';
  else msg = 'Keep practicing!';
  finalMsgEl.textContent = msg;
}

replayBtn.addEventListener('click', function () {
  current = 0;
  score = 0;
  quizScreen.style.display = '';
  endScreen.style.display = 'none';
  showQuestion();
});

showQuestion();
