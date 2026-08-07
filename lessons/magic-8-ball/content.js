// ----------------------------------------
// MAGIC 8 BALL — lesson content
// The example game's real HTML/CSS/JS (same code as game/index.html,
// game/styles.css, and game/script.js), shown in the editor tabs.
// Sets window.LESSON for shared/engine.js to render.
// ----------------------------------------

window.LESSON = (function () {
  // html.html — before we know about attributes, just plain structure
  const htmlDocBare = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Magical 8 Ball</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>

<body>
    <h1>My Magical 8 Ball</h1>

    <button>
        <p>8</p>
    </button>
</body>
</html>`;

  // css.html onward — CSS and JS find the ball and answer by their tag
  // (button, p), so the HTML itself doesn't change from here on
  const htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Magical 8 Ball</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>

<body>
    <h1>My Magical 8 Ball</h1>

    <button type="button">
        <p>8</p>
    </button>
</body>
</html>`;

  const cssCode = `* {
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  text-align: center;
  background: #1d1f21;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

h1 {
  margin: 0 0 24px;
  font-size: 28px;
}

button {
  width: 180px;
  height: 180px;
  padding: 0;
  font: inherit;
  background: #111;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 6px solid #333;
  cursor: pointer;
}

button:hover {
  border-color: pink;
}

button:active {
  border-color: white;
}

p {
  margin: 0;
  width: 90px;
  height: 90px;
  background: radial-gradient(circle at 35% 30%, #7ec2ff, #2f8eff 60%, #1a56b0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  box-shadow: 0 0 20px 6px rgba(47, 142, 255, 0.7);
}`;

  const jsCode = `// a list of possible answers
let answers = [
  'Yes',
  'No',
  'Maybe',
  'Ask again later',
  'Definitely',
  'Not likely'
];

// find the elements on the page
let eightBallElement = document.querySelector('button');
let answerElement = document.querySelector('p');

function askMagic8Ball() {
  // pick a random index between 0 and answers.length - 1
  let randomNumber = Math.floor(Math.random() * answers.length);

  // show that answer on the screen
  answerElement.textContent = answers[randomNumber];
}

// run askMagic8Ball() whenever the ball is clicked
eightBallElement.addEventListener('click', askMagic8Ball);`;

  // Wrap an entire code block as "net new" so it renders fully green — used
  // for whichever language a page is introducing for the first time. Local
  // to content.js since it runs before shared/engine.js loads.
  function wrapAllNew(code) {
    return "@@NEW@@" + code + "@@/NEW@@";
  }

  // Which lesson page are we on?
  const isHtmlPage = location.pathname.endsWith("html.html");
  const isCssPage = location.pathname.endsWith("css.html");

  // html.html: plain structure, all green (it's all new).
  // css.html: HTML is already taught, plain — CSS itself is fully green (new here).
  // js.html: HTML and CSS fully plain (both already taught) — JS fully green.
  return {
    key: "magic-8-ball",
    passwords: { html: "bones", css: "sparkle", js: "magic" },
    htmlCode: isHtmlPage ? wrapAllNew(htmlDocBare) : htmlDoc,
    cssCode: isCssPage ? wrapAllNew(cssCode) : cssCode,
    jsCode: wrapAllNew(jsCode) // js only ever appears on js.html, so it's always new
  };
})();
