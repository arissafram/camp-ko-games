// ----------------------------------------
// HOW THIS WORKS
// This page pulls the real questions straight out of the css/, js/,
// and html/ quizzes (each tagged with where it came from), picks a
// random mix of 15 that adds up across all three, shuffles the
// order, and shows the right widgets for whichever kind of question
// is currently up.
// ----------------------------------------


// ==========================================================
// CSS QUESTIONS (ported from ../css/script.js)
// ==========================================================

let cssQuestions = [
  { instruction: "Add a blue background to my div.", property: ["background", "background-color"], accepted: ["blue", "#81a2be"] },
  { instruction: "Make the text inside white so we can read it.", property: "color", accepted: ["white"] },
  { instruction: "Make the box wider — set the width to 200px.", property: "width", accepted: ["200px"] },
  { instruction: "Give it some height too — set the height to 150px.", property: "height", accepted: ["150px"] },
  { instruction: "Round the corners — set the border-radius to 20px.", property: "border-radius", accepted: ["20px"] },
  { instruction: "Add a black border — 3px solid black.", property: "border", accepted: ["3px solid black"] },
  { instruction: "Center the text inside the box.", property: "text-align", accepted: ["center"] },
  { instruction: "Make the text bigger — set the font-size to 24px.", property: "font-size", accepted: ["24px"] },
  { instruction: "Add some space inside the box — set the padding to 20px.", property: "padding", accepted: ["20px"] },
  { instruction: "Finish it off with a shadow — box-shadow: 0 0 10px black.", property: "box-shadow", accepted: ["0 0 10px black"] }
].map(function (q) { return Object.assign({ source: "css" }, q); });

function getDeclarations(text) {
  let declarations = [];
  let match = text.match(/\{([\s\S]*)\}/);
  if (!match) return declarations;

  match[1].split(";").forEach(function (line) {
    let colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;
    let property = line.slice(0, colonIndex).trim().toLowerCase();
    let value = line.slice(colonIndex + 1).trim();
    if (property && value) declarations.push({ property: property, value: value });
  });

  return declarations;
}

function normalizeValue(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}


// ==========================================================
// JS QUESTIONS (ported from ../js/script.js)
// ==========================================================

function lastLine(fullText) {
  let lines = fullText
    .split("\n")
    .map(function (line) { return line.trim(); })
    .filter(function (line) { return line.length > 0; });
  return lines.length ? jsNormalize(lines[lines.length - 1]) : "";
}

function jsNormalize(line) {
  return line.trim().replace(/;\s*$/, "").replace(/\s+/g, " ");
}

let jsQuestions = [
  {
    instruction: "Write a string.",
    prefix: "",
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(["'])[^"']*\1$/.test(line)) return { ok: true, data: null };
      if (/^[a-zA-Z0-9_ ]+$/.test(line)) return { ok: false, hint: 'Strings need quotes around them, like "hello".' };
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function () {}
  },
  {
    instruction: "Give this variable a value.",
    prefix: "let myName = ",
    check: function (fullText) {
      let line = lastLine(fullText);
      let m = line.match(/^let\s+myname\s*=\s*(["'])([^"']*)\1$/i);
      if (m) return { ok: true, data: { value: m[2] } };
      if (/^let\s+myname\s*=\s*[a-zA-Z0-9_]+$/i.test(line)) return { ok: false, hint: 'Strings need quotes around them, like "Alex".' };
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function (data, state) { state.myName = { value: data.value, type: "string" }; }
  },
  {
    instruction: "Write a number.",
    prefix: "",
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^-?\d+(\.\d+)?$/.test(line)) return { ok: true, data: null };
      if (/^(["'])-?\d+(\.\d+)?\1$/.test(line)) return { ok: false, hint: "Numbers don't need quotes — just write the number by itself." };
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function () {}
  },
  {
    instruction: "Give this variable a number value.",
    prefix: "let score = ",
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      let m = line.match(/^let\s+score\s*=\s*(-?\d+(\.\d+)?)$/i);
      if (m) return { ok: true, data: { value: parseFloat(m[1]) } };
      if (/^let\s+score\s*=\s*["']-?\d+(\.\d+)?["']$/i.test(line)) return { ok: false, hint: "Numbers don't need quotes — just write the number by itself." };
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function (data, state) { state.score = { value: data.value, type: "number" }; }
  },
  {
    instruction: "Now change score to 100 — you don't need let this time!",
    prefix: "",
    varsToShow: ["score"],
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(let|const|var)\s+score\s*=\s*100$/i.test(line)) return { ok: false, hint: "score already exists — you don't need let/const/var this time! Just write score = 100;" };
      if (/^score\s*=\s*100$/i.test(line)) return { ok: true, data: { value: 100 } };
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function (data, state) { state.score = { value: data.value, type: "number" }; }
  },
  {
    instruction: "My score is currently 0. How can I increment it?",
    prefix: "let score = 0;\nscore = ",
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(let|const|var)\s+score\s*=/i.test(line)) return { ok: false, hint: "score already exists — you don't need let/const/var this time!" };
      if (/^score\s*=\s*(score\s*\+\s*1|1\s*\+\s*score)$/i.test(line)) return { ok: true, data: { value: 1 } };
      return { ok: false, hint: "Not quite — try again! Try score = score + 1." };
    },
    apply: function (data, state) { state.score = { value: data.value, type: "number" }; }
  },
  {
    instruction: "You have numDogs and numCats. Add them together and store the result in a variable called totalAnimals.",
    prefix: "let totalAnimals = ",
    given: { numDogs: { value: 2, type: "number" }, numCats: { value: 5, type: "number" } },
    varsToShow: ["numDogs", "numCats"],
    check: function (fullText) {
      let line = lastLine(fullText);
      let m = line.match(/^let\s+totalanimals\s*=\s*(numdogs\s*\+\s*numcats|numcats\s*\+\s*numdogs)$/i);
      if (m) return { ok: true, data: { value: 7 } };
      if (/^let\s+totalanimals\s*=\s*7$/i.test(line)) return { ok: false, hint: "Close — but actually add them: numDogs + numCats, not just the answer." };
      return { ok: false, hint: "Not quite — try again! Try numDogs + numCats." };
    },
    apply: function (data, state) { state.totalAnimals = { value: data.value, type: "number" }; }
  },
  {
    instruction: "Write a boolean.",
    prefix: "",
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(true|false)$/i.test(line)) return { ok: true, data: null };
      if (/^(["'])(true|false)\1$/i.test(line)) return { ok: false, hint: "Booleans don't need quotes — just write true or false." };
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function () {}
  },
  {
    instruction: "Create a variable called isDone and set it to false.",
    prefix: "",
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(let|const|var)\s+isdone\s*=\s*false$/i.test(line)) return { ok: true, data: { value: false } };
      if (!/^(let|const|var)\s+/i.test(line) && /^isdone\s*=/i.test(line)) return { ok: false, hint: "Don't forget to declare it first with let!" };
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function (data, state) { state.isDone = { value: false, type: "boolean" }; }
  }
].map(function (q) { return Object.assign({ source: "js" }, q); });


// ==========================================================
// HTML QUESTIONS (ported from ../html/script.js)
// ==========================================================

let htmlQuestions = [
  { type: "choice", instruction: "Which tag do you use to group other elements together in a box?", correct: "<div>", options: ["<div>", "<p>", "<button>", "<a>"] },
  { type: "choice", instruction: "What is the tag for a paragraph?", correct: "<p>", options: ["<p>", "<div>", "<span>", "<h3>"] },
  { type: "choice", instruction: "What is the tag for a clickable button?", correct: "<button>", options: ["<button>", "<a>", "<p>", "<strong>"] },
  { type: "choice", instruction: "Which is bigger, h1 or h4?", correct: "h1", options: ["h1", "h4"] },
  {
    type: "choice", code: true,
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
    type: "choice", code: true,
    instruction: "Which of these correctly adds a paragraph that says \"Hello!\"?",
    correct: "<p>Hello!</p>",
    options: ["<p>Hello!</p>", "<div>Hello!</div>", "<paragraph>Hello!</paragraph>"],
    hints: {
      "<div>Hello!</div>": "That's a div, not a paragraph.",
      "<paragraph>Hello!</paragraph>": "<paragraph> isn't real HTML — the tag is just <p>."
    }
  },
  {
    type: "choice", code: true,
    instruction: "Which of these correctly adds a button that says \"Click me\"?",
    correct: "<button>Click me</button>",
    options: ["<button>Click me</button>", "<btn>Click me</btn>", "<a>Click me</a>"],
    hints: {
      "<btn>Click me</btn>": "<btn> isn't real HTML — the tag is <button>.",
      "<a>Click me</a>": "That's a link, not a button."
    }
  },
  { type: "choice", instruction: "What attribute gives an element a unique name, like a locker number?", correct: "id", options: ["id", "class", "name", "src"] },
  { type: "build", buildTag: "p", requiredAttr: "id", requireText: true, instruction: "Add an id to this p tag: <p>Hello!</p>", startHTML: "<p>Hello!</p>" },
  { type: "build", buildTag: "img", requiredAttr: "src", requireText: false, instruction: 'This img tag is missing something — add a src pointing to "cat.jpg": <img>', startHTML: "<img>" },
  { type: "build", buildTag: "a", requiredAttr: "href", requireText: true, instruction: "This link is missing something — add an href: <a>Click here</a>", startHTML: "<a>Click here</a>" },
  {
    type: "choice", code: true,
    instruction: 'Which of these correctly centers this text: "Welcome!"?',
    correct: "<center>Welcome!</center>",
    options: ["<center>Welcome!</center>", "<p>Welcome!</p>", "<centre>Welcome!</centre>", "<align>Welcome!</align>"],
    hints: {
      "<p>Welcome!</p>": "A plain <p> won't center anything.",
      "<centre>Welcome!</centre>": "Close spelling, but HTML uses the American spelling: <center>.",
      "<align>Welcome!</align>": "<align> isn't a real HTML tag."
    }
  },
  { type: "choice", instruction: "What tag makes text bold and marks it as important?", correct: "<strong>", options: ["<strong>", "<em>", "<i>", "<u>"] }
].map(function (q) { return Object.assign({ source: "html" }, q); });

function parseTopElement(text) {
  let doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.firstElementChild;
}

function validateHtmlBuildAnswer(q, text) {
  let el = parseTopElement(text);

  if (!el || el.tagName.toLowerCase() !== q.buildTag) return { ok: false, hint: "We need a <" + q.buildTag + "> tag." };
  let value = el.getAttribute(q.requiredAttr);
  if (!value || !value.trim()) return { ok: false, hint: 'Don\'t forget to add a ' + q.requiredAttr + ' attribute, like ' + q.requiredAttr + '="...".' };
  if (q.requireText && el.textContent.trim().length === 0) return { ok: false, hint: "Keep the text inside the tag — just add the " + q.requiredAttr + "." };

  return { ok: true };
}


// ==========================================================
// BUILD A RANDOM 15-QUESTION SESSION
// Every source contributes at least one question, and the rest
// are handed out randomly (capped by how many each source has).
// ==========================================================

let SESSION_SIZE = 15;
let SOURCES = [
  { key: "css", pool: cssQuestions },
  { key: "html", pool: htmlQuestions },
  { key: "js", pool: jsQuestions }
];

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list;
}

function buildSession() {
  let counts = SOURCES.map(function () { return 1; });
  let remaining = SESSION_SIZE - SOURCES.length;

  while (remaining > 0) {
    let eligible = [];
    SOURCES.forEach(function (s, i) {
      if (counts[i] < s.pool.length) eligible.push(i);
    });
    if (eligible.length === 0) break;
    let pick = eligible[Math.floor(Math.random() * eligible.length)];
    counts[pick]++;
    remaining--;
  }

  let session = [];
  SOURCES.forEach(function (s, i) {
    shuffle(s.pool.slice()).slice(0, counts[i]).forEach(function (q) {
      session.push(q);
    });
  });

  return shuffle(session);
}


// ==========================================================
// GAME STATE
// ==========================================================

let session = buildSession();
let currentIndex = 0;
let furthestIndex = 0;
let jsProgramState = {};


// ==========================================================
// FIND THINGS ON THE PAGE
// ==========================================================

let counter = document.getElementById("counter");
let backButton = document.getElementById("backButton");
let forwardButton = document.getElementById("forwardButton");
let questionEl = document.getElementById("question");
let cssPreview = document.getElementById("cssPreview");
let varsPanel = document.getElementById("varsPanel");
let varsList = document.getElementById("varsList");
let choiceControls = document.getElementById("choiceControls");
let choices = document.getElementById("choices");
let typeControls = document.getElementById("typeControls");
let editor = document.getElementById("editor");
let checkButton = document.getElementById("checkButton");
let feedback = document.getElementById("feedback");
let completeScreen = document.getElementById("completeScreen");
let playAgainButton = document.getElementById("playAgainButton");


// ==========================================================
// CSS-STYLE LIVE PREVIEW
// ==========================================================

function updateCssPreview() {
  cssPreview.style.cssText = "";
  getDeclarations(editor.value).forEach(function (d) {
    cssPreview.style.setProperty(d.property, d.value);
  });
}


// ==========================================================
// JS-STYLE VARIABLES PANEL
// ==========================================================

function renderJsVars(q) {
  varsList.textContent = "";
  let filtered = !!q.varsToShow;
  let namesToShow = q.varsToShow || Object.keys(jsProgramState);
  let visibleCount = 0;

  namesToShow.forEach(function (name) {
    let entry = jsProgramState[name];
    if (!entry) return;
    visibleCount++;
    let displayValue = entry.type === "string" ? '"' + entry.value + '"' : String(entry.value);
    let prefix = filtered ? "let " : "";
    let row = document.createElement("div");
    row.className = "var-row";
    row.textContent = prefix + name + " = " + displayValue;
    varsList.appendChild(row);
  });

  let showVars = q.showVars !== false && visibleCount > 0;
  varsPanel.classList.toggle("is-hidden", !showVars);
}


// ==========================================================
// HTML-STYLE MULTIPLE CHOICE
// ==========================================================

function renderChoices(q) {
  choices.textContent = "";
  shuffle(q.options.slice()).forEach(function (optionText) {
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

function selectChoice(q, optionText, button) {
  if (optionText === q.correct) {
    button.classList.add("choice-correct");
    Array.from(choices.children).forEach(function (btn) { btn.disabled = true; });
    advance();
  } else {
    button.classList.add("choice-wrong");
    showWrong((q.hints && q.hints[optionText]) || "Not quite — try again!");
  }
}


// ==========================================================
// SHOW A NEW QUESTION
// ==========================================================

function loadQuestion() {
  let q = session[currentIndex];

  questionEl.textContent = (currentIndex + 1) + ". " + q.instruction;
  counter.textContent = (currentIndex + 1) + " / " + session.length;
  feedback.textContent = "";
  feedback.className = "feedback";

  cssPreview.classList.add("is-hidden");
  varsPanel.classList.add("is-hidden");
  choiceControls.classList.add("is-hidden");
  typeControls.classList.add("is-hidden");

  if (q.source === "css") {
    cssPreview.classList.remove("is-hidden");
    cssPreview.style.cssText = "";
    typeControls.classList.remove("is-hidden");
    editor.value = "div {\n  \n}";
    editor.focus();
    let cursorPosition = "div {\n  ".length;
    editor.setSelectionRange(cursorPosition, cursorPosition);
  } else if (q.source === "js") {
    typeControls.classList.remove("is-hidden");
    editor.value = q.prefix || "";
    editor.focus();
    let cursorPosition = editor.value.length;
    editor.setSelectionRange(cursorPosition, cursorPosition);
    if (q.given) Object.assign(jsProgramState, q.given);
    renderJsVars(q);
  } else if (q.type === "build") {
    typeControls.classList.remove("is-hidden");
    editor.value = q.startHTML;
    editor.focus();
    let tagNameMatch = q.startHTML.match(/^<[a-zA-Z0-9]+/);
    let cursorPosition = tagNameMatch ? tagNameMatch[0].length : 0;
    editor.setSelectionRange(cursorPosition, cursorPosition);
  } else {
    choiceControls.classList.remove("is-hidden");
    renderChoices(q);
  }
}


// ==========================================================
// GO TO A SPECIFIC QUESTION (OR THE COMPLETE SCREEN)
// This is the one place that decides what's on screen, so the
// back/forward arrows and the normal "answer correctly" flow all
// stay in sync.
// ==========================================================

function goTo(index) {
  currentIndex = index;

  if (currentIndex >= session.length) {
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


// ==========================================================
// MOVE ON AFTER A CORRECT ANSWER
// ==========================================================

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


// ==========================================================
// CHECK A TYPED ANSWER (css, js, and html "build" questions)
// ==========================================================

function checkTypedAnswer() {
  let q = session[currentIndex];

  if (q.source === "css") {
    let declarations = getDeclarations(editor.value);
    let acceptedProperties = Array.isArray(q.property) ? q.property : [q.property];
    let match = declarations.find(function (d) { return acceptedProperties.indexOf(d.property) !== -1; });
    let isCorrect = match && q.accepted.indexOf(normalizeValue(match.value)) !== -1;

    if (!isCorrect) {
      showWrong("Not quite — try again!");
      return;
    }
    cssPreview.style.setProperty(match.property, match.value.trim());
    advance();
  } else if (q.source === "js") {
    let result = q.check(editor.value, jsProgramState);
    if (!result.ok) {
      showWrong(result.hint);
      return;
    }
    q.apply(result.data, jsProgramState);
    renderJsVars(q);
    advance();
  } else {
    let result = validateHtmlBuildAnswer(q, editor.value);
    if (!result.ok) {
      showWrong(result.hint);
      return;
    }
    advance();
  }
}


// ==========================================================
// LIVE PREVIEW WHILE TYPING (css questions only)
// ==========================================================

editor.addEventListener("input", function () {
  if (session[currentIndex].source === "css") updateCssPreview();
});


// ==========================================================
// SHOW THE "ALL DONE" SCREEN
// ==========================================================

function showComplete() {
  counter.textContent = session.length + " / " + session.length;
  questionEl.classList.add("is-hidden");
  cssPreview.classList.add("is-hidden");
  varsPanel.classList.add("is-hidden");
  choiceControls.classList.add("is-hidden");
  typeControls.classList.add("is-hidden");
  feedback.textContent = "";
  completeScreen.classList.remove("is-hidden");
}


// ==========================================================
// RESET AND PLAY AGAIN (rolls a brand new random mix)
// ==========================================================

function resetGame() {
  session = buildSession();
  jsProgramState = {};
  furthestIndex = 0;
  goTo(0);
}


// ==========================================================
// EVENT LISTENERS
// ==========================================================

checkButton.addEventListener("click", checkTypedAnswer);

editor.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    checkTypedAnswer();
  }
});

backButton.addEventListener("click", goBack);
forwardButton.addEventListener("click", goForward);
playAgainButton.addEventListener("click", resetGame);

window.addEventListener("load", function () {
  goTo(0);
});
