const howLong = document.querySelector(
  ".main__content__inputs__howLong__container"
);
const addtime = document.getElementById("add");
howLong.addEventListener("click", (e) => {
  const button = howLong.querySelectorAll("li");
  button.forEach((button) => button.classList.remove("clicked"));
  const target = e.target;
  target.classList.add("clicked");
});
