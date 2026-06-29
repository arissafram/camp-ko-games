var STEP = 2;
var done = false;
var progress = [0, 0];

var bars = [document.getElementById('bar1'), document.getElementById('bar2')];
var pcts = [document.getElementById('pct1'), document.getElementById('pct2')];
var winBanner = document.getElementById('win-banner');
var winnerText = document.getElementById('winner-text');
var startHint = document.getElementById('start-hint');
var resetBtn = document.getElementById('reset-btn');

function advance(player) {
  if (done) return;
  startHint.style.display = 'none';

  // TODO: Add STEP to progress[player], capped at 100
  // Hint: progress[player] = Math.min(100, progress[player] + STEP)
  // Then update the bar width and pct text


  // TODO: Check if progress[player] >= 100
  // If yes: set done = true, update winnerText, show winBanner
}

// Keyboard listener — already wired, just add the key checks
document.addEventListener('keydown', function (e) {
  // TODO: if e.key is 'q' or 'Q', call advance(0)
  // TODO: if e.key is 'p' or 'P', call advance(1)
  // Don't forget e.preventDefault() on the key you handle
});

resetBtn.addEventListener('click', function () {
  done = false;
  progress = [0, 0];
  bars[0].style.width = '0%';
  bars[1].style.width = '0%';
  pcts[0].textContent = '0%';
  pcts[1].textContent = '0%';
  winBanner.style.display = 'none';
  startHint.style.display = '';
});
