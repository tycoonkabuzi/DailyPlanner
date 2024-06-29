const howLong = document.querySelector(
  ".main__content__inputs__howLong__container"
);
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
function retrieveDataFromtheList(buttons) {
  arrayAllTime = [];
  buttons.forEach((button) => {
    // remove more from the list of numbers to be multiplied.
    if (button.textContent != "More") {
      time = button.textContent.replace(/min|h/g, "");
      //doubleArray.length = timeInNumberArray.length;
      arrayAllTime.push(parseFloat(time));
    }
  });
  console.log("allArray" + arrayAllTime);
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

function addMinutesToElement(max) {
  doubleArray = [];
  for (let i = 1; i < arrayAllTime.length; i++) {
    let tobeAdded = i * 5;
    let hour = Math.floor((max + tobeAdded) / 60);
    let minute = (max + tobeAdded) % 60;
    doubleArray.push(hour + "." + minute + "h");
    howLong.innerHTML = "";
  }
  console.log(doubleArray);
}

function displayNewTime() {
  doubleArray.forEach((element) => {
    const time = document.createElement("li");
    time.innerText = element;
    howLong.appendChild(time);
  });
}

//calling the higlight Button when clicking.
howLong.addEventListener("click", highlightButtonWhenClicking);
addTime.addEventListener("click", () => {
  let buttons = howLong.querySelectorAll("li");
  retrieveDataFromtheList(buttons);
  let maxMinutes = findMaximum(arrayAllTime);
  addMinutesToElement(maxMinutes);
  displayNewTime();
  console.log(arrayAllTime);
});
