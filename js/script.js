const navMenu = document.querySelector(".main__menu");
const mainTitle = document.querySelector(".main__content__title");
const linkNav = navMenu.querySelectorAll("a");
const mainContent = document.querySelector(".main__content");
const routes = {
  "/": {
    titleHead: "Daily planner| Home",
    titleContent: "Welcome to your Daily plan",
    content: "",
  },
  "/add": {
    titleHead: "Daily planner| New Event",
    titleContent: "Add a new event",
    content: `<div class="main__content__title">New event</div>
        <div class="main__content__inputs">
          <input type="text" placeholder="Event" />
          <input type="date" placeholder="Date" />
          <div class="main__content__inputs__howLong">
            <p>How long?</p>
            <ul class="main__content__inputs__howLong__container">
              <li>5min</li>
              <li>10min</li>
              <li>15min</li>
              <li>20min</li>
              <li>25min</li>
              <li>30min</li>
              <li>35min</li>
              <li>40min</li>
              <li>45min</li>
              <li>50min</li>
              <li id="add">More</li>
            </ul>
          </div>
          <textarea name="" id="" cols="30" rows="10">Notes</textarea>
        </div>
        <div class="main__content__urgency">
          <div class="main__content__urgency__colors">
            <div class="main__content__urgency__colors--red"></div>
            <div class="main__content__urgency__colors--orange"></div>
            <div class="main__content__urgency__colors--yellow"></div>
            <div class="main__content__urgency__colors--green"></div>
          </div>
          <button>Submit</button>
        </div>`,
  },
  "/dashboard": {
    titleHead: "Daily planner| Dashboard",
    titleContent: "Here is the dashboard",
    content: "",
  },
  "/help": {
    titleHead: "Daily planner| Help",
    titleContent: "Need some help ? ",
    content: "",
  },
};
linkNav.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState({}, "", link.href);
    navigate(link.href);
  });
});

// function allowing to get the link and to transform it into a text
function navigate(link) {
  const url = new URL(link);
  const route = routes[url.pathname];
  console.log(link);
  if (route) {
    let domTitle = document.getElementById("titleDisplay");
    domTitle.textContent = route.titleHead;
    mainContent.innerHTML = route.content;
  } else {
    console.log("Nie ma");
  }
}
//------------------------------------

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
      time = button.textContent.replace(/'|min|h/g, "");
      if (!isNaN(time) && time !== "") {
        arrayAllTime.push(parseFloat(time));
      }
    }
  });
}

function extractTimeToString() {
  let newArray = [];
  const buttons = howLong.querySelectorAll("li");
  buttons.forEach((button) => {
    let hour = button.textContent.match(/(\d+)h/);
    let min = button.textContent.match(/(\d+)'/);
    let hourInt = hour ? parseInt(hour[1]) : 1;
    let minInt = min ? parseInt(min[1]) : -15;
    let total = hourInt * 60 + minInt;
    newArray.push(total);
    console.log(total);
  });

  return newArray;
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
// Here we add a certain number of minutes from the highest element in the array

function addMinutesToElement(max) {
  doubleArray = [];
  howLong.innerHTML = "";
  //we add to the max 5 and we devide it by 60 to get the hour and the same for the minute with the %
  for (let i = 0; i < arrayAllTime.length; i++) {
    let tobeAdded = (i + 2) * 5;
    let hour = Math.floor((max + tobeAdded) / 60);
    let minute = (max + tobeAdded) % 60;
    doubleArray.push(hour + "h" + minute + "'");
  }

  doubleArray.push("More");
}

//
function addMoreTime() {
  retrieveDataFromtheList();
  let maxMinutes = findMaximum(extractTimeToString());
  addMinutesToElement(maxMinutes);
  displayNewTime();
  //console.log(arrayAllTime);
  //console.log(doubleArray);
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

//calling the higlight Button when clicking.
howLong.addEventListener("click", highlightButtonWhenClicking);
addTime.addEventListener("click", addMoreTime);

//
