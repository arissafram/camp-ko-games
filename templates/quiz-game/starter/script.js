// TODO Step 1: Create an array called "questions"
// Each item is an object with: question (string), answers (array of 4 strings), correct (index number)
// Add at least 3 questions about any topic you like!
var questions = [
  // Example:
  // {
  //   question: 'What color is the sky?',
  //   answers: ['Red', 'Blue', 'Green', 'Yellow'],
  //   correct: 1
  // },
];

// TODO Step 2: Create variables to track progress
// var current = ???   (which question we're on, start at 0)
// var score = ???     (how many correct, start at 0)


// TODO Step 3: Grab the HTML elements you'll need
// var questionEl = document.getElementById('question')
// var counterEl = document.getElementById('counter')
// var answersEl = document.getElementById('answers')
// var feedbackEl = document.getElementById('feedback')
// (also grab quiz-screen, end-screen, final-score, replay-btn)


// TODO Step 4: Write a "showQuestion" function
// It should:
//   - Get the current question from the array using questions[current]
//   - Update counterEl.textContent to show "Question X of Y"
//   - Update questionEl.textContent with the question text
//   - Clear answersEl (answersEl.innerHTML = '')
//   - Loop through the answers and create a button for each one


// TODO Step 5: Write a "pickAnswer" function that takes an index
// It should:
//   - Check if index === questions[current].correct
//   - If yes: score++ and show "Correct!" in feedbackEl
//   - If no: show the right answer in feedbackEl
//   - After 1.2 seconds (setTimeout): move to the next question or show the end screen


// TODO Step 6: Show the end screen when all questions are done
// Hide quiz-screen, show end-screen, set final-score text to score + " / " + questions.length


// TODO Step 7: Add a click listener to replay-btn to reset and start over


// Start the quiz
// showQuestion()
