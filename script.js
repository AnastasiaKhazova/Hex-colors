//Variables
let allColours = [];
// Selectors
const button = document.querySelector(".click-button");
const hexOutput = document.querySelector(".hexcode");
const historyContent = document.querySelector(".history-content");

// EventListeners
button.addEventListener("click", colorGenerator);
historyContent.addEventListener("contextmenu", deleteItem);
historyContent.addEventListener("click", copyHEX);
// button.addEventListener("click", createHistory);

// Functions;
if (!localStorage.getItem("colors")) {
  allColours = [];
} else {
  allColours = JSON.parse(localStorage.getItem("colors"));
  let lastElement = allColours.at(-1);
  document.body.style.backgroundColor = lastElement.color;
  hexOutput.innerHTML = lastElement.color;
  displayHistory(allColours);
}

function colorGenerator() {
  let a =
    "#" +
    [...Array(6)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
  hexOutput.innerHTML = a;
  document.body.style.backgroundColor = a;
  // const newItem = document.createElement("div");
  // newItem.classList.add("history-element");
  // newItem.innerHTML = a;
  // newItem.style.backgroundColor = a;
  // historyContent.appendChild(newItem);
  allColours.push({
    id: Math.random().toString().substring(2, 7),
    color: hexOutput.innerHTML,
  });
  historyContent.innerHTML = "";
  displayHistory(allColours);

  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("colors", JSON.stringify(allColours));
}

function displayHistory(array) {
  array.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-element");
    historyItem.id = item.id;
    historyItem.innerHTML = item.color;
    historyItem.style.backgroundColor = item.color;
    historyContent.appendChild(historyItem);
  });
}

function deleteItem(event) {
  event.preventDefault();
  const deleteAim = event.target;
  if (deleteAim.classList[0] === "history-element") {
    deleteAim.closest("div").remove();
    const changedArray = allColours.filter((item) => item.id !== deleteAim.id);
    allColours = changedArray;
    historyContent.innerHTML = "";
    displayHistory(allColours);
    saveToLocalStorage();
  }
}

function copyHEX(event) {
  event.preventDefault();
  const copyAim = event.target;
  if (copyAim.classList[0] === "history-element") {
    let area = document.createElement("textarea");
    area.value = copyAim.innerHTML;
    console.log(area.value);
    document.body.appendChild(area).select();
    document.execCommand("copy");
    area.remove();
    alert("Скопировано");
    // copyAim.innerHTML = 'Скопировано';
    //   setTimeout( function(){
    //     copyAim.innerHTML = 'Скопировать';
    // },2000);
  }
}
