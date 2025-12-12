// RESTORE SAVED BOX POSITION
const playArea = document.getElementById("playArea");
const movingBox = document.getElementById("movingBox");
const saved = JSON.parse(localStorage.getItem("boxPosition"));
if (saved) {
  movingBox.style.top = saved.top;
  movingBox.style.left = saved.left;
}

// DRAG and DROP
movingBox.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "box");
});

playArea.addEventListener("dragover", (e) => e.preventDefault());

playArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const rect = playArea.getBoundingClientRect();
  const boxW = movingBox.offsetWidth;
  const boxH = movingBox.offsetHeight;

  const midX = rect.left + rect.width / 2;
  const midY = rect.top + rect.height / 2;
  const top = e.clientY < midY ? 0 : rect.height - boxH;
  const left = e.clientX < midX ? 0 : rect.width - boxW;

  movingBox.style.top = `${top}px`;
  movingBox.style.left = `${left}px`;

  localStorage.setItem(
    "boxPosition",
    JSON.stringify({ top: `${top}px`, left: `${left}px` })
  );
});

//RANDOM BACKGROUND COLOUR
playArea.addEventListener("click", () => {
  const hue = Math.floor(Math.random() * 360);
  playArea.style.backgroundColor = `hsl(${hue}, 60%, 85%)`;
});
