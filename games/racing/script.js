var STEP = 2; // percent per keypress
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

  progress[player] = Math.min(100, progress[player] + STEP);
  bars[player].style.width = progress[player] + '%';
  pcts[player].textContent = progress[player] + '%';

  if (progress[player] >= 100) {
    done = true;
    winnerText.textContent = 'Player ' + (player + 1) + ' wins!';
    winBanner.style.display = '';
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'q' || e.key === 'Q') { e.preventDefault(); advance(0); }
  if (e.key === 'p' || e.key === 'P') { e.preventDefault(); advance(1); }
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
