let answers = [
  'Yes',
  'No',
  'Maybe',
  'Ask again later',
  'Definitely',
  'Not likely'
];

let eightBallElement = document.querySelector('button');
let answerElement = document.querySelector('p');

function askMagic8Ball() {
  let randomNumber = Math.floor(Math.random() * answers.length);
  answerElement.textContent = answers[randomNumber];
}

eightBallElement.addEventListener('click', askMagic8Ball);
