// story fix function
function fixStory() {
  const article = document.querySelector("article");

  // add h1 element
  const title = document.createElement("h1");
  title.textContent = "Little Red Riding Hood";
  title.style.textAlign = "center";
  document.body.insertBefore(title, article);

  // Remove  paragraph
  const paragraphs = article.querySelectorAll("p");
  paragraphs.forEach((p) => {
    if (p.textContent.includes("frog")) {
      p.remove();
    }
  });

  // Swap paragraphs
  const paras = article.querySelectorAll("p");
  const Swap_1 = [...paras].find((p) => p.textContent.includes("embrace you"));
  const Swap_2 = [...paras].find((p) => p.textContent.includes("arms so big"));

  article.insertBefore(Swap_2, Swap_1);

  //Replace the paragraph that says 'THE END' with a new ending
  const endPara = [...article.querySelectorAll("p")].find((p) =>
    p.textContent.includes("THE END")
  );
  if (endPara) {
    const newEnd = document.createElement("p");
    newEnd.textContent =
      "And that is a lesson for little children who dawdle when asked to do a job.";
    endPara.replaceWith(newEnd);
  }

  // stop repeating
  document.removeEventListener("keydown", fixStory);
}

//Function attached to down key
document.addEventListener("keydown", fixStory);
