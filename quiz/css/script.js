// ----------------------------------------
// THE QUESTIONS — tweak these however you like!
// "property" is the CSS property we're checking for — a string, or an
// array if more than one property name should count (e.g. shorthand).
// "accepted" is a list of answers that count as correct.
// ----------------------------------------

let questions = [
  {
    instruction: "Add a blue background to my div.",
    property: ["background", "background-color"],
    accepted: ["blue", "#81a2be"]
  },
  {
    instruction: "Make the text inside white so we can read it.",
    property: "color",
    accepted: ["white"]
  },
  {
    instruction: "Make the box wider — set the width to 200px.",
    property: "width",
    accepted: ["200px"]
  },
  {
    instruction: "Give it some height too — set the height to 150px.",
    property: "height",
    accepted: ["150px"]
  },
  {
    instruction: "Round the corners — set the border-radius to 20px.",
    property: "border-radius",
    accepted: ["20px"]
  },
  {
    instruction: "Add a black border — 3px solid black.",
    property: "border",
    accepted: ["3px solid black"]
  },
  {
    instruction: "Center the text inside the box.",
    property: "text-align",
    accepted: ["center"]
  },
  {
    instruction: "Make the text bigger — set the font-size to 24px.",
    property: "font-size",
    accepted: ["24px"]
  },
  {
    instruction: "Add some space inside the box — set the padding to 20px.",
    property: "padding",
    accepted: ["20px"]
  },
  {
    instruction: "Finish it off with a shadow — box-shadow: 0 0 10px black.",
    property: "box-shadow",
    accepted: ["0 0 10px black"]
  }
];


// ----------------------------------------
// STARTING TEMPLATE FOR THE CODE BOX
// ----------------------------------------

let template = "div {\n  \n}";


// ----------------------------------------
// REMEMBER GAME STATE
// ----------------------------------------

let currentIndex = 0;
let furthestIndex = 0;
let accumulatedStyles = {};


// ----------------------------------------
// FIND THINGS ON THE PAGE
// ----------------------------------------

let counter = document.getElementById("counter");
let backButton = document.getElementById("backButton");
let forwardButton = document.getElementById("forwardButton");
let questionEl = document.getElementById("question");
let preview = document.getElementById("preview");
let editor = document.getElementById("editor");
let feedback = document.getElementById("feedback");
let checkButton = document.getElementById("checkButton");
let quizControls = document.getElementById("quizControls");
let completeScreen = document.getElementById("completeScreen");
let playAgainButton = document.getElementById("playAgainButton");


// ----------------------------------------
// READ THE CSS OUT OF THE TEXT BOX
// turns "div { background-color: red; }" into
// [{ property: "background-color", value: "red" }]
// ----------------------------------------

function getDeclarations(text) {
  let declarations = [];
  let match = text.match(/\{([\s\S]*)\}/);
  if (!match) return declarations;

  let lines = match[1].split(";");

  lines.forEach(function (line) {
    let colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;

    let property = line.slice(0, colonIndex).trim().toLowerCase();
    let value = line.slice(colonIndex + 1).trim();

    if (property && value) {
      declarations.push({ property: property, value: value });
    }
  });

  return declarations;
}

function normalizeValue(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}


// ----------------------------------------
// UPDATE THE PREVIEW BOX
// shows every style answered correctly so far,
// plus whatever is currently typed in the editor
// ----------------------------------------

function updatePreview() {
  preview.style.cssText = "";

  Object.keys(accumulatedStyles).forEach(function (property) {
    preview.style.setProperty(property, accumulatedStyles[property]);
  });

  getDeclarations(editor.value).forEach(function (declaration) {
    preview.style.setProperty(declaration.property, declaration.value);
  });
}


// ----------------------------------------
// SHOW A NEW QUESTION
// ----------------------------------------

function loadQuestion() {
  let q = questions[currentIndex];

  questionEl.textContent = (currentIndex + 1) + ". " + q.instruction;
  counter.textContent = (currentIndex + 1) + " / " + questions.length;

  editor.value = template;
  feedback.textContent = "";
  feedback.className = "feedback";

  updatePreview();

  editor.focus();
  let cursorPosition = "div {\n  ".length;
  editor.setSelectionRange(cursorPosition, cursorPosition);
}


// ----------------------------------------
// GO TO A SPECIFIC QUESTION (OR THE COMPLETE SCREEN)
// This is the one place that decides what's on screen, so the
// back/forward arrows and the normal "answer correctly" flow all
// stay in sync.
// ----------------------------------------

function goTo(index) {
  currentIndex = index;

  if (currentIndex >= questions.length) {
    showComplete();
  } else {
    questionEl.classList.remove("is-hidden");
    quizControls.classList.remove("is-hidden");
    completeScreen.classList.add("is-hidden");
    loadQuestion();
  }

  updateNavButtons();
}

function updateNavButtons() {
  backButton.disabled = currentIndex <= 0;
  forwardButton.disabled = currentIndex >= furthestIndex;
}

function goBack() {
  if (currentIndex > 0) goTo(currentIndex - 1);
}

function goForward() {
  if (currentIndex < furthestIndex) goTo(currentIndex + 1);
}


// ----------------------------------------
// CHECK THE ANSWER
// ----------------------------------------

function checkAnswer() {
  let q = questions[currentIndex];
  let declarations = getDeclarations(editor.value);
  let acceptedProperties = Array.isArray(q.property) ? q.property : [q.property];

  let match = declarations.find(function (declaration) {
    return acceptedProperties.indexOf(declaration.property) !== -1;
  });

  let isCorrect = match && q.accepted.indexOf(normalizeValue(match.value)) !== -1;

  if (!isCorrect) {
    feedback.textContent = "❌ Not quite — try again!";
    feedback.className = "feedback feedback-error";
    return;
  }

  accumulatedStyles[match.property] = match.value.trim();
  feedback.textContent = "✅ Correct!";
  feedback.className = "feedback feedback-success";
  updatePreview();

  setTimeout(function () {
    furthestIndex = Math.max(furthestIndex, currentIndex + 1);
    goTo(currentIndex + 1);
  }, 700);
}


// ----------------------------------------
// SHOW THE "ALL DONE" SCREEN
// ----------------------------------------

function showComplete() {
  counter.textContent = questions.length + " / " + questions.length;
  questionEl.classList.add("is-hidden");
  quizControls.classList.add("is-hidden");
  feedback.textContent = "";
  completeScreen.classList.remove("is-hidden");
}


// ----------------------------------------
// RESET AND PLAY AGAIN
// ----------------------------------------

function resetGame() {
  accumulatedStyles = {};
  furthestIndex = 0;
  goTo(0);
}


// ----------------------------------------
// EVENT LISTENERS
// ----------------------------------------

checkButton.addEventListener("click", checkAnswer);

editor.addEventListener("input", updatePreview);

editor.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    checkAnswer();
  }
});

backButton.addEventListener("click", goBack);
forwardButton.addEventListener("click", goForward);
playAgainButton.addEventListener("click", resetGame);

window.addEventListener("load", function () {
  goTo(0);
});
