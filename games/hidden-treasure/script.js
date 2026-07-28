const spots = document.querySelectorAll(".spot");
const message = document.querySelector("#message");
const playAgainButton = document.querySelector("#play-again");

const idleContent = {
  cow: "🐄",
  color: "🎨",
  wiggle: "🫨",
  grow: "🎈",
  flip: "🃏",
  blank: "❔",
};

const treasureSpot = 0;

function startGame() {
  message.textContent = "";

  spots.forEach(function (spot) {
    spot.disabled = false;
    spot.classList.remove("spin", "wiggle", "grow", "flip");
    spot.style.background = "";
    spot.textContent = idleContent[spot.dataset.type];
  });
}

function checkSpot(index, spot) {
  if (spot.disabled) return;

  if (index === treasureSpot) {
    revealTreasure(spot);
    return;
  }

  playSpotEffect(spot);
}

function revealTreasure(spot) {
  spot.textContent = "💰";
  message.textContent = "You found the treasure!";

  spots.forEach(function (s) {
    s.disabled = true;
  });
}

function playSpotEffect(spot) {
  const type = spot.dataset.type;

  if (type === "cow") spinCow(spot);
  else if (type === "color") changeColor(spot);
  else if (type === "wiggle") wiggleSpot(spot);
  else if (type === "grow") growSpot(spot);
  else if (type === "flip") flipSpot(spot);
  else revealBlank(spot);
}

function spinCow(spot) {
  spot.classList.add("spin");
  message.textContent = "Just a cow. Keep looking!";
  spot.disabled = true;
}

function changeColor(spot) {
  const hue = Math.floor(Math.random() * 360);
  spot.style.background = "hsl(" + hue + ", 70%, 60%)";
  message.textContent = "Ooh, shiny! But not the treasure.";
  // This spot never locks -- keep clicking for new colors.
}

function wiggleSpot(spot) {
  spot.classList.add("wiggle");
  message.textContent = "Nothing here. Keep looking!";
  spot.disabled = true;
}

function growSpot(spot) {
  spot.classList.add("grow");
  message.textContent = "Just a balloon -- it popped! Keep looking.";
  spot.disabled = true;
  setTimeout(function () {
    spot.textContent = "💥";
  }, 300);
}

function flipSpot(spot) {
  spot.classList.add("flip");
  message.textContent = "Nothing here. Keep looking!";
  spot.disabled = true;
  setTimeout(function () {
    spot.textContent = "🂠";
  }, 200);
}

function revealBlank(spot) {
  message.textContent = "Nothing here. Keep looking!";
  spot.disabled = true;
}

spots.forEach(function (spot, index) {
  spot.addEventListener("click", function () {
    checkSpot(index, spot);
  });
});

playAgainButton.addEventListener("click", startGame);

startGame();
