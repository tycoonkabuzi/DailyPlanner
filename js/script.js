const howLong = document.querySelector(
  ".main__content__inputs__howLong__container"
);
let buttons = howLong.querySelectorAll("li");
const addTime = document.getElementById("add");
let arrayAllTime = [];
let doubleArray = [];
// create a possibility to click on a time and have it selected in a different color
function highlightButtonWhenClicking(e) {
  const button = howLong.querySelectorAll("li");
  button.forEach((button) => button.classList.remove("clicked"));
  const target = e.target;
  target.classList.add("clicked");
}

// when clicking on more, being able to retrieve the data from the list and multiply it or change it.
function retrieveDataFromtheList() {
  const buttons = howLong.querySelectorAll("li"); // Update buttons dynamically
  arrayAllTime = [];
  buttons.forEach((button) => {
    // remove more from the list of numbers to be multiplied.
    if (button.textContent != "More") {
      time = button.textContent.replace(/min|h/g, "");
      if (!isNaN(time) && time !== "") {
        arrayAllTime.push(parseFloat(time));
      }
    }
  });
}

// here we take the largest number in the array we just created from the buttons.
function findMaximum(array) {
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  return max;
}
// Here we add a certain number of minutes from the highest element in the array till

function addMinutesToElement(max) {
  doubleArray = [];
  howLong.innerHTML = "";
  for (let i = 2; i < arrayAllTime.length; i++) {
    let tobeAdded = i * 5;
    let hour = Math.floor((max + tobeAdded) / 60);
    let minute = (max + tobeAdded) % 60;
    doubleArray.push(hour + "h" + minute + "min");
  }

  doubleArray.push("More");
}

function displayNewTime() {
  doubleArray.forEach((element) => {
    const time = document.createElement("li");
    time.innerText = element;
    howLong.appendChild(time);

    if (element == "More") {
      time.classList.add("add");
      time.addEventListener("click", addMoreTime);
    }
  });

  return doubleArray;
}
function addMoreTime() {
  retrieveDataFromtheList();
  let maxMinutes = findMaximum(arrayAllTime);
  addMinutesToElement(maxMinutes);
  displayNewTime();
  console.log(arrayAllTime);
  console.log(doubleArray);
  console.log("clicked");
}

//calling the higlight Button when clicking.
howLong.addEventListener("click", highlightButtonWhenClicking);
addTime.addEventListener("click", addMoreTime);

//
