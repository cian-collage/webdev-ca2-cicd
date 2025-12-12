// Function that creates a new promise
function getNewPromise(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
}

//display text as a "p" after 1000
getNewPromise("Promise test", 1000).then((result) => {
  document.getElementById("first").textContent = result;

  //take text from "frist" convert to upper case and reverse then display in "second" after 2000
  getNewPromise(result, 2000)
    .then((text) => text.toUpperCase())
    .then((text) => text.split("").reverse().join(""))
    .then((finalText) => {
      document.getElementById("second").textContent = finalText;
    });
});
