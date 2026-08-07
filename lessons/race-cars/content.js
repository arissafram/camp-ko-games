// ----------------------------------------
// RACE CARS — lesson content
// The example game's real HTML/CSS/JS (same code as game/index.html,
// game/styles.css, and game/script.js), shown in the editor tabs.
// Sets window.LESSON for shared/engine.js to render.
// ----------------------------------------

window.LESSON = (function () {
  const htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Two Player Race</title>

    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>

    <h1>Two Player Race</h1>

    <p>Player 1: Press A &nbsp;&nbsp;&nbsp; Player 2: Press L</p>

    <div class="track">
        <div class="finish-line"></div>
        <div id="car1">🏎️</div>
    </div>

    <div class="track">
        <div class="finish-line"></div>
        <div id="car2">🚙</div>
    </div>

    <p id="result"></p>

</body>
</html>`;

  const cssCode = `body {
    font-family: Tahoma, sans-serif;
    text-align: center;
    min-height: 100vh;
    margin: 0;
    padding: 40px 20px;
    background: #1d1f21;
    color: #c5c8c6;
}

.track {
    width: 700px;
    height: 80px;
    margin: 20px auto;
    border: 3px solid white;
    position: relative;
    overflow: hidden;
}

.finish-line {
    position: absolute;
    left: 600px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: gold;
}

#car1,
#car2 {
    position: absolute;
    left: 0;
    font-size: 50px;
    transform: scaleX(-1);
}

#result {
    font-size: 20px;
    font-weight: bold;
    color: #00e676;
}`;

  const jsCode = `window.addEventListener('load', () => {

    let car1Position = 0;
    let car2Position = 0;
    let gameOver = false;

    const finishLine = 600;

    const car1 = document.getElementById('car1');
    const car2 = document.getElementById('car2');
    const result = document.getElementById('result');

    window.addEventListener('keydown', moveCars);

    function moveCars(event) {

        if (gameOver) {
            return;
        }

        if (event.key === 'a') {
            car1Position += 20;
            car1.style.left = car1Position + 'px';
        }

        if (event.key === 'l') {
            car2Position += 20;
            car2.style.left = car2Position + 'px';
        }

        if (car1Position >= finishLine) {
            result.textContent = 'Player 1 wins!';
            gameOver = true;
        }

        if (car2Position >= finishLine) {
            result.textContent = 'Player 2 wins!';
            gameOver = true;
        }
    }

});`;

  // Wrap an entire code block as "net new" so it renders fully green — used
  // for whichever language a page is introducing for the first time. Local
  // to content.js since it runs before shared/engine.js loads.
  function wrapAllNew(code) {
    return "@@NEW@@" + code + "@@/NEW@@";
  }

  // Which lesson page are we on?
  const isHtmlPage = location.pathname.endsWith("html.html");
  const isCssPage = location.pathname.endsWith("css.html");

  // html.html: the HTML is fully green (it's all new).
  // css.html: HTML is already taught, plain — CSS itself is fully green (new here).
  // js.html: HTML and CSS fully plain (both already taught) — JS fully green.
  return {
    key: "race-cars",
    passwords: { html: "vroom", css: "turbo", js: "finish" },
    htmlCode: isHtmlPage ? wrapAllNew(htmlDoc) : htmlDoc,
    cssCode: isCssPage ? wrapAllNew(cssCode) : cssCode,
    jsCode: wrapAllNew(jsCode) // js only ever appears on js.html, so it's always new
  };
})();
