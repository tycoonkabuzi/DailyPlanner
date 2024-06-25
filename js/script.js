const howLong = document.querySelector(
  ".main__content__inputs__howLong__container"
);
const addTime = document.getElementById("add");

// create a possibility to click on a time and have it selected in a different color
howLong.addEventListener("click", (e) => {
  const button = howLong.querySelectorAll("li");
  button.forEach((button) => button.classList.remove("clicked"));
  const target = e.target;
  target.classList.add("clicked");
});

// when clicking on more, being able to retrieve the data from the list and multiply it or change it.
addTime.addEventListener("click", () => {
  const button = howLong.querySelectorAll("li");
  button.forEach((button) => {
    // remove more from the list of numbers to be multiplied.
    if (button.textContent != "More") {
      const theTime = button.textContent.replace(/min|h/g, "");
      console.log(theTime);
    }
  });
});
