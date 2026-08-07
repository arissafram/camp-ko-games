// ----------------------------------------
// SHARED LESSON ENGINE
// Loaded on every lesson page, after that track's content.js has already
// set window.LESSON. Handles mobile nav, the code-editor tabs, the live
// preview, and (for tracks that define LESSON.passwords) the per-language
// password locks. Tracks without passwords (e.g. Clicker) just get their
// code panels shown immediately.
// ----------------------------------------

const hamburger = document.querySelector(".nav-hamburger");
const navMobile = document.querySelector(".nav-mobile");

if (hamburger && navMobile) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-open");
    navMobile.classList.toggle("open");
  });
}

// Back to top button — matches the one on every other Camp KO page
(function () {
  var btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.textContent = "↑";
  document.body.appendChild(btn);

  window.addEventListener("scroll", function () {
    btn.classList.toggle("visible", window.scrollY > 200);
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// Escape code text, wrap comments so they can be styled lighter, and wrap
// @@NEW@@...@@/NEW@@ markers (added by a track's content.js) so newly-taught
// code is styled green.
function highlightComments(code) {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="code-comment">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>')
    .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
    .replace(/@@NEW@@([\s\S]*?)@@\/NEW@@/g, '<span class="code-new">$1</span>');
}

// Remove @@NEW@@ markers, leaving plain, runnable code for the live preview.
function stripNewMarkers(code) {
  return code.replace(/@@NEW@@/g, "").replace(/@@\/NEW@@/g, "");
}

const LESSON = window.LESSON || {};

// Build the live preview from whichever pieces this page has. The preview
// always works, regardless of the password locks below — seeing the
// finished game run isn't "the answer," reading its source code is.
const previewFrame = document.getElementById("preview-frame");

if (previewFrame && LESSON.htmlCode) {
  const strippedHtml = stripNewMarkers(LESSON.htmlCode);
  const bodyMatch = strippedHtml.match(/<body>([\s\S]*?)<\/body>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : strippedHtml;

  const codeCssEl = document.getElementById("code-css");
  const codeJsEl = document.getElementById("code-js");

  const cssForPreview = codeCssEl && LESSON.cssCode ? stripNewMarkers(LESSON.cssCode) : "";
  const jsForPreview = codeJsEl && LESSON.jsCode ? stripNewMarkers(LESSON.jsCode) : "";

  previewFrame.srcdoc = `<!DOCTYPE html>
<html>
<head><style>${cssForPreview}</style></head>
<body>
${bodyContent}
${jsForPreview ? "<scr" + "ipt>" + jsForPreview + "</scr" + "ipt>" : ""}
</body>
</html>`;
}

// Editor tab switching
const tabs = document.querySelectorAll(".editor-tab");
const panels = document.querySelectorAll(".editor-panel");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (t) {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    panels.forEach(function (p) { p.classList.remove("active"); });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    document
      .querySelector('.editor-panel[data-panel="' + tab.dataset.tab + '"]')
      .classList.add("active");
  });
});

// ----------------------------------------
// CODE PANELS
// If this track defines LESSON.passwords (Race Cars, Magic 8 Ball), each
// language's code stays behind its own password until unlocked, and that
// unlock carries over to every other page in the track (same browser, same
// session). Tracks without passwords (Clicker) just show all their code
// immediately, like they always have.
// ----------------------------------------

const codeByLanguage = {
  html: LESSON.htmlCode,
  css: LESSON.cssCode,
  js: LESSON.jsCode
};

function revealLanguageCode(lang) {
  const codeEl = document.getElementById("code-" + lang);
  const panel = document.querySelector('.editor-panel[data-panel="' + lang + '"]');
  if (!codeEl || !panel || !codeByLanguage[lang]) return;

  codeEl.innerHTML = highlightComments(codeByLanguage[lang]);
  panel.classList.add("unlocked");
}

if (LESSON.passwords) {
  const isLanguageUnlocked = function (lang) {
    return sessionStorage.getItem(LESSON.key + "-" + lang + "-unlocked") === "true";
  };

  Object.keys(LESSON.passwords).forEach(function (lang) {
    const panel = document.querySelector('.editor-panel[data-panel="' + lang + '"]');
    if (!panel) return; // this language's tab doesn't exist on this page

    if (isLanguageUnlocked(lang)) {
      revealLanguageCode(lang);
      return;
    }

    const form = panel.querySelector(".code-lock-form");
    const input = form.querySelector("input");
    const error = panel.querySelector(".code-lock-error");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (input.value.trim().toLowerCase() === LESSON.passwords[lang].toLowerCase()) {
        error.textContent = "";
        sessionStorage.setItem(LESSON.key + "-" + lang + "-unlocked", "true");
        revealLanguageCode(lang);
      } else {
        error.textContent = "Not quite — try again.";
        input.value = "";
        input.focus();
      }
    });
  });
} else {
  Object.keys(codeByLanguage).forEach(revealLanguageCode);
}
