// ----------------------------------------
// HOW THIS WORKS
// We never *run* what you type — we read it and check the shape of
// it against what's expected, then WE update the Variables panel
// ourselves. That keeps things safe and means the feedback can be
// specific about what went wrong.
// ----------------------------------------

function lastLine(fullText) {
  let lines = fullText
    .split("\n")
    .map(function (line) { return line.trim(); })
    .filter(function (line) { return line.length > 0; });
  return lines.length ? normalize(lines[lines.length - 1]) : "";
}

function normalize(line) {
  return line.trim().replace(/;\s*$/, "").replace(/\s+/g, " ");
}

let DECLARED = /^(let|const|var)\s+/i;


// ----------------------------------------
// THE QUESTIONS
// check(fullText, state) -> { ok: true, data } or { ok: false, hint }
// apply(data, state) -> mutate the trusted state
// ----------------------------------------

let questions = [
  {
    instruction: "Write a string.",
    prefix: "",
    placeholder: '"..."',
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(["'])[^"']*\1$/.test(line)) return { ok: true, data: null };
      if (/^[a-zA-Z0-9_ ]+$/.test(line)) {
        return { ok: false, hint: 'Strings need quotes around them, like "hello".' };
      }
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function () {}
  },

  {
    instruction: "Give this variable a value.",
    prefix: "let myName = ",
    placeholder: "",
    check: function (fullText) {
      let line = lastLine(fullText);
      let m = line.match(/^let\s+myname\s*=\s*(["'])([^"']*)\1$/i);
      if (m) return { ok: true, data: { value: m[2] } };
      if (/^let\s+myname\s*=\s*[a-zA-Z0-9_]+$/i.test(line)) {
        return { ok: false, hint: "Strings need quotes around them, like \"Alex\"." };
      }
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function (data, state) {
      state.myName = { value: data.value, type: "string" };
    }
  },

  {
    instruction: "Write a number.",
    prefix: "",
    placeholder: "...",
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^-?\d+(\.\d+)?$/.test(line)) return { ok: true, data: null };
      if (/^(["'])-?\d+(\.\d+)?\1$/.test(line)) {
        return { ok: false, hint: "Numbers don't need quotes — just write the number by itself." };
      }
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function () {}
  },

  {
    instruction: "Give this variable a number value.",
    prefix: "let score = ",
    placeholder: "",
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      let m = line.match(/^let\s+score\s*=\s*(-?\d+(\.\d+)?)$/i);
      if (m) return { ok: true, data: { value: parseFloat(m[1]) } };
      if (/^let\s+score\s*=\s*["']-?\d+(\.\d+)?["']$/i.test(line)) {
        return { ok: false, hint: "Numbers don't need quotes — just write the number by itself." };
      }
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function (data, state) {
      state.score = { value: data.value, type: "number" };
    }
  },

  {
    instruction: "Now change score to 100 — you don't need let this time!",
    prefix: "",
    placeholder: "score = ...;",
    varsToShow: ["score"],
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(let|const|var)\s+score\s*=\s*100$/i.test(line)) {
        return { ok: false, hint: "score already exists — you don't need let/const/var this time! Just write score = 100;" };
      }
      if (/^score\s*=\s*100$/i.test(line)) return { ok: true, data: { value: 100 } };
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function (data, state) {
      state.score = { value: data.value, type: "number" };
    }
  },

  {
    instruction: "My score is currently 0. How can I increment it?",
    prefix: "let score = 0;\nscore = ",
    placeholder: "",
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(let|const|var)\s+score\s*=/i.test(line)) {
        return { ok: false, hint: "score already exists — you don't need let/const/var this time!" };
      }
      if (/^score\s*=\s*(score\s*\+\s*1|1\s*\+\s*score)$/i.test(line)) {
        return { ok: true, data: { value: 1 } };
      }
      return { ok: false, hint: "Not quite — try again! Try score = score + 1." };
    },
    apply: function (data, state) {
      state.score = { value: data.value, type: "number" };
    }
  },

  {
    instruction: "You have numDogs and numCats. Add them together and store the result in a variable called totalAnimals.",
    prefix: "let totalAnimals = ",
    placeholder: "",
    given: {
      numDogs: { value: 2, type: "number" },
      numCats: { value: 5, type: "number" }
    },
    varsToShow: ["numDogs", "numCats"],
    check: function (fullText) {
      let line = lastLine(fullText);
      let m = line.match(/^let\s+totalanimals\s*=\s*(numdogs\s*\+\s*numcats|numcats\s*\+\s*numdogs)$/i);
      if (m) return { ok: true, data: { value: 7 } };
      if (/^let\s+totalanimals\s*=\s*7$/i.test(line)) {
        return { ok: false, hint: "Close — but actually add them: numDogs + numCats, not just the answer." };
      }
      return { ok: false, hint: "Not quite — try again! Try numDogs + numCats." };
    },
    apply: function (data, state) {
      state.totalAnimals = { value: data.value, type: "number" };
    }
  },

  {
    instruction: "Write a boolean.",
    prefix: "",
    placeholder: "true or false",
    showVars: false,
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(true|false)$/i.test(line)) return { ok: true, data: null };
      if (/^(["'])(true|false)\1$/i.test(line)) {
        return { ok: false, hint: "Booleans don't need quotes — just write true or false." };
      }
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function () {}
  },

  {
    instruction: "Create a variable called isDone and set it to false.",
    prefix: "",
    placeholder: "let isDone = ...;",
    check: function (fullText) {
      let line = lastLine(fullText);
      if (/^(let|const|var)\s+isdone\s*=\s*false$/i.test(line)) return { ok: true, data: { value: false } };
      if (!DECLARED.test(line) && /^isdone\s*=/i.test(line)) {
        return { ok: false, hint: "Don't forget to declare it first with let!" };
      }
      return { ok: false, hint: "Not quite — try again!" };
    },
    apply: function (data, state) {
      state.isDone = { value: false, type: "boolean" };
    }
  }
];


// ----------------------------------------
// REMEMBER GAME STATE
// ----------------------------------------

let currentIndex = 0;
let furthestIndex = 0;
let programState = {};


// ----------------------------------------
// FIND THINGS ON THE PAGE
// ----------------------------------------

let counter = document.getElementById("counter");
let backButton = document.getElementById("backButton");
let forwardButton = document.getElementById("forwardButton");
let questionEl = document.getElementById("question");
let varsList = document.getElementById("varsList");
let varsPanel = document.getElementById("varsPanel");
let editor = document.getElementById("editor");
let checkButton = document.getElementById("checkButton");
let feedback = document.getElementById("feedback");
let completeScreen = document.getElementById("completeScreen");
let playAgainButton = document.getElementById("playAgainButton");


// ----------------------------------------
// SHOW THE VARIABLES WE'VE BUILT SO FAR
// ----------------------------------------

function renderVars() {
  varsList.textContent = "";

  let q = questions[currentIndex];
  let filtered = !!q.varsToShow;
  let namesToShow = q.varsToShow || Object.keys(programState);

  namesToShow.forEach(function (name) {
    let entry = programState[name];
    if (!entry) return;
    let displayValue = entry.type === "string" ? '"' + entry.value + '"' : String(entry.value);
    let prefix = filtered ? "let " : "";
    let row = document.createElement("div");
    row.className = "var-row";
    row.textContent = prefix + name + " = " + displayValue;
    varsList.appendChild(row);
  });
}


// ----------------------------------------
// SHOW/HIDE THE VARIABLES PANEL BASED ON THE CURRENT QUESTION
// Some early questions (freeform literals) don't need the
// Variables panel yet, even if a variable already exists.
// ----------------------------------------

function updatePanelVisibility() {
  let q = questions[currentIndex];
  let namesToShow = q.varsToShow || Object.keys(programState);
  let visibleCount = namesToShow.filter(function (name) { return programState[name]; }).length;
  let showVars = q.showVars !== false && visibleCount > 0;
  varsPanel.classList.toggle("is-hidden", !showVars);
}


// ----------------------------------------
// SHOW A NEW QUESTION
// ----------------------------------------

function loadQuestion() {
  let q = questions[currentIndex];

  questionEl.textContent = (currentIndex + 1) + ". " + q.instruction;
  counter.textContent = (currentIndex + 1) + " / " + questions.length;
  feedback.textContent = "";
  feedback.className = "feedback";

  editor.value = q.prefix || "";
  editor.placeholder = q.placeholder || "";
  editor.focus();
  let cursorPosition = editor.value.length;
  editor.setSelectionRange(cursorPosition, cursorPosition);

  if (q.given) {
    Object.assign(programState, q.given);
  }
  renderVars();

  updatePanelVisibility();
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
    editor.classList.remove("is-hidden");
    document.querySelector(".editor-label").classList.remove("is-hidden");
    checkButton.classList.remove("is-hidden");
    document.querySelector(".hint").classList.remove("is-hidden");
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
// CHECK THE ANSWER
// ----------------------------------------

function checkAnswer() {
  let q = questions[currentIndex];
  let result = q.check(editor.value, programState);

  if (!result.ok) {
    showWrong(result.hint);
    return;
  }

  q.apply(result.data, programState);
  renderVars();
  updatePanelVisibility();
  advance();
}


// ----------------------------------------
// SHOW THE "ALL DONE" SCREEN
// ----------------------------------------

function showComplete() {
  counter.textContent = questions.length + " / " + questions.length;
  questionEl.classList.add("is-hidden");
  editor.classList.add("is-hidden");
  document.querySelector(".editor-label").classList.add("is-hidden");
  checkButton.classList.add("is-hidden");
  document.querySelector(".hint").classList.add("is-hidden");
  feedback.textContent = "";
  completeScreen.classList.remove("is-hidden");
}


// ----------------------------------------
// RESET AND PLAY AGAIN
// ----------------------------------------

function resetGame() {
  programState = {};
  furthestIndex = 0;
  renderVars();
  goTo(0);
}


// ----------------------------------------
// EVENT LISTENERS
// ----------------------------------------

checkButton.addEventListener("click", checkAnswer);

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
  renderVars();
  goTo(0);
});
