function buildPage() {
  // Create main container
  const container = document.createElement("div");
  container.style.padding = "20px";
  container.style.margin = "0";
  container.style.width = "100%";
  container.style.height = "100%";

  container.style.fontFamily = "Arial, sans-serif";

  // Title
  const title = document.createElement("h1");
  title.textContent = "In Brief";
  title.style.marginTop = "0";
  container.appendChild(title);

  // Paragraph
  const text = document.createElement("p");
  text.textContent =
    "This is a very short page. It includes some text, an image and a list.";
  container.appendChild(text);

  // Image
  const image = document.createElement("img");
  image.src = "RWAT.png";
  image.alt = "RWAT";
  image.style.display = "block";
  image.style.margin = "20px 0";
  container.appendChild(image);

  // list header
  const todoHeader = document.createElement("strong");
  todoHeader.textContent = "TODO";
  todoHeader.style.display = "block";
  todoHeader.style.marginBottom = "10px";
  container.appendChild(todoHeader);

  // list
  const list = document.createElement("ul");
  ["finish lab", "practice", "practice some more"].forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;
    list.appendChild(li);
  });
  container.appendChild(list);

  // Add everything to body
  document.body.style.margin = "0";
  document.body.appendChild(container);
}

window.addEventListener("load", buildPage);
