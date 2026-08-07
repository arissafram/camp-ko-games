// ----------------------------------------
// THE QUESTIONS
// Most are multiple choice ("choice"), either "what's the tag?" or
// "which snippet is correct?" (those use code:true for monospace
// styling). A few are "build" questions — the editor starts out
// pre-filled with real, broken HTML that you edit in place to fix.
//
// "hints" (optional) maps a wrong option to a specific explanation,
// shown instead of the generic "try again" message.
// ----------------------------------------

let questions = [
  {
    type: "choice",
    instruction: "Which tag do you use to group other elements together in a box?",
    correct: "<div>",
    options: ["<div>", "<p>", "<button>", "<a>"]
  },
  {
    type: "choice",
    instruction: "What is the tag for a paragraph?",
    correct: "<p>",
    options: ["<p>", "<div>", "<span>", "<h3>"]
  },
  {
    type: "choice",
    instruction: "What is the tag for a clickable button?",
    correct: "<button>",
    options: ["<button>", "<a>", "<p>", "<strong>"]
  },

  {
    type: "choice",
    instruction: "Which is bigger, h1 or h4?",
    correct: "h1",
    options: ["h1", "h4"]
  },

  {
    type: "choice",
    code: true,
    instruction: "Which of these correctly adds a div to hold our page content?",
    correct: "<div></div>",
    options: ["<div></div>", "<div>", "<box></box>", "<p></p>"],
    hints: {
      "<div>": "Don't forget the closing </div> tag!",
      "<box></box>": "<box> isn't a real HTML tag — the correct one is <div>.",
      "<p></p>": "That's the tag for a paragraph, not a container div."
    }
  },
  {
    type: "choice",
    code: true,
    instruction: "Which of these correctly adds a paragraph that says \"Hello!\"?",
    correct: "<p>Hello!</p>",
    options: ["<p>Hello!</p>", "<div>Hello!</div>", "<paragraph>Hello!</paragraph>"],
    hints: {
      "<div>Hello!</div>": "That's a div, not a paragraph.",
      "<paragraph>Hello!</paragraph>": "<paragraph> isn't real HTML — the tag is just <p>."
    }
  },
  {
    type: "choice",
    code: true,
    instruction: "Which of these correctly adds a button that says \"Click me\"?",
    correct: "<button>Click me</button>",
    options: ["<button>Click me</button>", "<btn>Click me</btn>", "<a>Click me</a>"],
    hints: {
      "<btn>Click me</btn>": "<btn> isn't real HTML — the tag is <button>.",
      "<a>Click me</a>": "That's a link, not a button."
    }
  },

  {
    type: "choice",
    instruction: "What attribute gives an element a unique name, like a locker number?",
    correct: "id",
    options: ["id", "class", "name", "src"]
  },
  {
    type: "build",
    buildTag: "p",
    requiredAttr: "id",
    requireText: true,
    instruction: "Add an id to this p tag: <p>Hello!</p>",
    startHTML: "<p>Hello!</p>"
  },

  {
    type: "build",
    buildTag: "img",
    requiredAttr: "src",
    requireText: false,
    instruction: 'This img tag is missing something — add a src pointing to "cat.jpg": <img>',
    startHTML: "<img>"
  },

  {
    type: "build",
    buildTag: "a",
    requiredAttr: "href",
    requireText: true,
    instruction: "This link is missing something — add an href: <a>Click here</a>",
    startHTML: "<a>Click here</a>"
  },

  {
    type: "choice",
    code: true,
    instruction: 'Which of these correctly centers this text: "Welcome!"?',
    correct: "<center>Welcome!</center>",
    options: ["<center>Welcome!</center>", "<p>Welcome!</p>", "<centre>Welcome!</centre>", "<align>Welcome!</align>"],
    hints: {
      "<p>Welcome!</p>": "A plain <p> won't center anything.",
      "<centre>Welcome!</centre>": "Close spelling, but HTML uses the American spelling: <center>.",
      "<align>Welcome!</align>": "<align> isn't a real HTML tag."
    }
  },

  {
    type: "choice",
    instruction: "What tag makes text bold and marks it as important?",
    correct: "<strong>",
    options: ["<strong>", "<em>", "<i>", "<u>"]
  }
];


// ----------------------------------------
// REMEMBER GAME STATE
// ----------------------------------------

let currentIndex = 0;
let furthestIndex = 0;


// ----------------------------------------
// FIND THINGS ON THE PAGE
// ----------------------------------------

let counter = document.getElementById("counter");
let backButton = document.getElementById("backButton");
let forwardButton = document.getElementById("forwardButton");
let questionEl = document.getElementById("question");
let choiceControls = document.getElementById("choiceControls");
let choices = document.getElementById("choices");
let buildControls = document.getElementById("buildControls");
let editor = document.getElementById("editor");
let checkButton = document.getElementById("checkButton");
let feedback = document.getElementById("feedback");
let completeScreen = document.getElementById("completeScreen");
let playAgainButton = document.getElementById("playAgainButton");


// ----------------------------------------
// PARSE WHAT WAS TYPED (for "build" questions)
// DOMParser never runs scripts or loads images — it just
// reads the text and hands back the first element it finds.
// ----------------------------------------

function parseTopElement(text) {
  let doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.firstElementChild;
}

function validateBuildAnswer(q, text) {
  let el = parseTopElement(text);

  if (!el || el.tagName.toLowerCase() !== q.buildTag) {
    return { ok: false, hint: "We need a <" + q.buildTag + "> tag." };
  }
  let value = el.getAttribute(q.requiredAttr);
  if (!value || !value.trim()) {
    return { ok: false, hint: 'Don\'t forget to add a ' + q.requiredAttr + ' attribute, like ' + q.requiredAttr + '="...".' };
  }
  if (q.requireText && el.textContent.trim().length === 0) {
    return { ok: false, hint: "Keep the text inside the tag — just add the " + q.requiredAttr + "." };
  }

  return { ok: true };
}


// ----------------------------------------
// SHOW A NEW QUESTION
// ----------------------------------------

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list;
}

function renderChoices(q) {
  choices.textContent = "";
  let shuffled = shuffle(q.options.slice());

  shuffled.forEach(function (optionText) {
    let button = document.createElement("button");
    button.type = "button";
    button.className = q.code ? "choice-btn choice-code" : "choice-btn";
    button.textContent = optionText;
    button.addEventListener("click", function () {
      selectChoice(q, optionText, button);
    });
    choices.appendChild(button);
  });
}

function loadQuestion() {
  let q = questions[currentIndex];

  questionEl.textContent = (currentIndex + 1) + ". " + q.instruction;
  counter.textContent = (currentIndex + 1) + " / " + questions.length;
  feedback.textContent = "";
  feedback.className = "feedback";

  if (q.type === "build") {
    choiceControls.classList.add("is-hidden");
    buildControls.classList.remove("is-hidden");
    editor.value = q.startHTML;
    editor.focus();
    let tagNameMatch = q.startHTML.match(/^<[a-zA-Z0-9]+/);
    let cursorPosition = tagNameMatch ? tagNameMatch[0].length : 0;
    editor.setSelectionRange(cursorPosition, cursorPosition);
  } else {
    buildControls.classList.add("is-hidden");
    choiceControls.classList.remove("is-hidden");
    renderChoices(q);
  }
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
// MOVE ON AFTER A CORRECT ANSWER
// ----------------------------------------

function advance() {
  feedback.textContent = "✅ Correct!";
  feedback.className = "feedback feedback-success";

  setTimeout(function () {
    furthestIndex = Math.max(furthestIndex, currentIndex + 1);
    goTo(currentIndex + 1);
  }, 700);
}

function showWrong(message) {
  feedback.textContent = "❌ " + message;
  feedback.className = "feedback feedback-error";
}


// ----------------------------------------
// CHECK A CLICKED ANSWER
// ----------------------------------------

function selectChoice(q, optionText, button) {
  if (optionText === q.correct) {
    button.classList.add("choice-correct");
    Array.from(choices.children).forEach(function (btn) {
      btn.disabled = true;
    });
    advance();
  } else {
    button.classList.add("choice-wrong");
    let message = (q.hints && q.hints[optionText]) || "Not quite — try again!";
    showWrong(message);
  }
}


// ----------------------------------------
// CHECK A TYPED ANSWER
// ----------------------------------------

function checkBuildAnswer() {
  let q = questions[currentIndex];
  let result = validateBuildAnswer(q, editor.value);

  if (!result.ok) {
    showWrong(result.hint);
    return;
  }

  advance();
}


// ----------------------------------------
// SHOW THE "ALL DONE" SCREEN
// ----------------------------------------

function showComplete() {
  counter.textContent = questions.length + " / " + questions.length;
  questionEl.classList.add("is-hidden");
  choiceControls.classList.add("is-hidden");
  buildControls.classList.add("is-hidden");
  feedback.textContent = "";
  completeScreen.classList.remove("is-hidden");
}


// ----------------------------------------
// RESET AND PLAY AGAIN
// ----------------------------------------

function resetGame() {
  furthestIndex = 0;
  goTo(0);
}


// ----------------------------------------
// EVENT LISTENERS
// ----------------------------------------

checkButton.addEventListener("click", checkBuildAnswer);

editor.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    checkBuildAnswer();
  }
});

backButton.addEventListener("click", goBack);
forwardButton.addEventListener("click", goForward);
playAgainButton.addEventListener("click", resetGame);

window.addEventListener("load", function () {
  goTo(0);
});
