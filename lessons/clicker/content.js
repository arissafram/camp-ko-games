// ----------------------------------------
// CLICKER GAME — lesson content
// Unlike Race Cars and Magic 8 Ball, Clicker has no password gate — its
// code panels are always visible, and new code is revealed incrementally
// across 4 JS milestones (js.html, js-win-logic.html, js-timer.html,
// js-next.html). Sets window.LESSON for shared/engine.js to render.
// ----------------------------------------

window.LESSON = (function () {
  const htmlCodeNoScore = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Spongebob Clicker Game</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>

<body>
    <main>
        <!-- Title-->
        <h1>Spongebob Clicker game</h1>

        <!-- A description of your clicking game -->
        <p id="message">Click to play</p>

        <!-- A button with an image inside of it -->
        <button>
            CLICK ME
            <img src="spongebob.png" />
        </button>

    </main>
</body>
</html>`;

  const scoreSnippet = `<!-- Score display -->\n        <p id="score"></p>`;

  const htmlCodeWithScore = htmlCodeNoScore.replace(
    `<p id="message">Click to play</p>`,
    `<p id="message">Click to play</p>\n\n        ${scoreSnippet}`
  );

  const htmlCodeScoreHighlighted = htmlCodeNoScore.replace(
    `<p id="message">Click to play</p>`,
    `<p id="message">Click to play</p>\n\n        @@NEW@@${scoreSnippet}@@/NEW@@`
  );

  const htmlCodeMessageHighlighted = htmlCodeWithScore.replace(
    `<p id="message">Click to play</p>`,
    `@@NEW@@<p id="message">Click to play</p>@@/NEW@@`
  );

  const isScorePage = location.pathname.endsWith("js.html") && !location.pathname.endsWith("js-win-logic.html");
  const isWinLogicPage = location.pathname.endsWith("js-win-logic.html");
  const isTimerPage = location.pathname.endsWith("js-timer.html");

  const htmlCode = isScorePage
    ? htmlCodeScoreHighlighted
    : isWinLogicPage
    ? htmlCodeMessageHighlighted
    : isTimerPage
    ? htmlCodeWithScore
    : htmlCodeNoScore;

  const cssCodeBase = `/** styles for the whole page (the body tag) */
body {
    background-color: lavender;
    font-size: 40px;
    font-family: tahoma;
    text-align: center;
    border-style: dotted;
    border-width: 20px;
    padding: 20px;
}

/** styles for the big heading */
h1 {
    color: blue;
    font-size: 28px;
    font-weight: bold;
}

/** styles for paragraph text */
p {
    color: green;
    font-size: 18px;
}

/** styles for the button */
button {
    color: purple;
    height: 200px;
    width: 200px;
    border: 10px solid transparent;
}

/** styles for when you hover over the button */
button:hover {
    cursor: pointer;
    border: 10px solid black;
    background: yellow;
}

/** styles for the image */
img {
    height: 150px;
    width: 150px;
}`;

  const scoreStyleSnippet = `/** styles for the score - targeting the element by id*/
#score {
    font-family: monospace;
}`;

  const cssCodeWithScoreStyle = cssCodeBase.replace(
    `p {\n    color: green;\n    font-size: 18px;\n}`,
    `p {\n    color: green;\n    font-size: 18px;\n}\n\n${scoreStyleSnippet}`
  );

  const cssCodeScoreStyleHighlighted = cssCodeBase.replace(
    `p {\n    color: green;\n    font-size: 18px;\n}`,
    `p {\n    color: green;\n    font-size: 18px;\n}\n\n@@NEW@@${scoreStyleSnippet}@@/NEW@@`
  );

  const cssCode = isScorePage
    ? cssCodeScoreStyleHighlighted
    : isWinLogicPage || isTimerPage
    ? cssCodeWithScoreStyle
    : cssCodeBase;

  const jsCodeScore = `// button element
let buttonElement = document.querySelector("button");

// score element
let scoreElement = document.getElementById("score");

// this is where we keep track of the score
let score = 0;

// this is the function where we write our instructions
function clickButton() {
  // add one to the score
  score = score + 1;

  // show the new score on the screen
  scoreElement.textContent = score;
}

// here is where we apply the function to our button
buttonElement.onclick = clickButton;`;

  const jsCodeWinLogic = `// button element
let buttonElement = document.querySelector("button");

// score element
let scoreElement = document.getElementById("score");

@@NEW@@// message element
let messageElement = document.getElementById("message");@@/NEW@@

// this is where we keep track of the score
let score = 0;

// this is the function where we write our instructions
function clickButton() {
  // add one to the score
  score = score + 1;

  // show the new score on the screen
  scoreElement.textContent = score;

  @@NEW@@// check if the player has won
  if (score >= 5) {
    messageElement.textContent = "You win!";

    // disable the button so the game stops
    buttonElement.disabled = true;
  }@@/NEW@@
}

// here is where we apply the function to our button
buttonElement.onclick = clickButton;`;

  const jsCodeTimer = `// button element
let buttonElement = document.querySelector("button");

// score element
let scoreElement = document.getElementById("score");

@@NEW@@// message element
let messageElement = document.getElementById("message");@@/NEW@@

// this is where we keep track of the score
let score = 0;

// this is the function where we write our instructions
function clickButton() {
  // add one to the score
  score = score + 1;

  // show the new score on the screen
  scoreElement.textContent = score;
}

// here is where we apply the function to our button
buttonElement.onclick = clickButton;

@@NEW@@// wait 10 seconds, then show a message
setTimeout(function () {
  messageElement.textContent = "Time's up!";
}, 10000);@@/NEW@@`;

  const jsCode = isWinLogicPage
    ? jsCodeWinLogic
    : isTimerPage
    ? jsCodeTimer
    : jsCodeScore;

  return {
    key: "clicker",
    htmlCode: htmlCode,
    cssCode: cssCode,
    jsCode: jsCode
  };
})();
