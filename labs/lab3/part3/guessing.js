const boxes = document.querySelectorAll(".box");
const startButton = document.querySelector("button");
const message = document.getElementById("msg");
const container = document.querySelector(".container");

//box style
container.style.display = "flex";
container.style.alignItems = "center";
container.style.justifyContent = "center";
container.style.gap = "30px";
container.style.marginTop = "50px";

boxes.forEach((box) => {
  box.style.width = "20vw";
  box.style.height = "20vw";
  box.style.border = "2px solid black";
});

startButton.style.padding = "10px 20px";
startButton.style.fontSize = "16px";
startButton.style.cursor = "pointer";

message.style.textAlign = "center";
message.style.fontWeight = "bold";
message.style.marginTop = "30px";

// Game js

let pictureBoxIndex = null;
let tries = 0;
let gameActive = false;

// Start a new game
function startGame() {
  gameActive = true;
  tries = 0;
  message.textContent = "Click on the boxes to find the hidden picture";

  // Reset boxes
  boxes.forEach((box) => {
    box.textContent = "";
    box.style.backgroundImage = "";
    box.style.backgroundSize = "";
    box.style.backgroundPosition = "";
    box.style.backgroundColor = "white";
  });

  // Randomeise correct box
  pictureBoxIndex = Math.floor(Math.random() * boxes.length);
}

// box click
function handleBoxClick(event) {
  if (!gameActive) return;

  const clickedBox = event.target;
  tries++;

  const index = Array.from(boxes).indexOf(clickedBox);

  if (index === pictureBoxIndex) {
    clickedBox.style.backgroundImage = "url('Flower.jpg')";
    clickedBox.style.backgroundSize = "cover";
    clickedBox.style.backgroundPosition = "center";
    clickedBox.textContent = "";
    message.textContent = `You found it in ${tries} tries`;
    gameActive = false;
  } else {
    clickedBox.textContent = "Not here";
    clickedBox.style.color = "red";
  }
}

// Attach event listeners
startButton.addEventListener("click", startGame);
boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
