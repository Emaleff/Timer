let timerID;
const switchItems = document.querySelectorAll("[data-switch]");
switchItems.forEach((switchItem) => {
  switchItem.addEventListener("click", () => {
    switchItems.forEach((switchItem) =>
      switchItem.classList.remove("activeSwitch")
    );
    switchItem.classList.add("activeSwitch");
    localStorage.setItem("switch", switchItem.dataset.switch);
    clearInterval(timerID);
    timerID = undefined;
    currentSeconds = undefined;
    timerActions.textContent = "START";
    renderMinutes();
    bar.set(1);
  });
});

const colorItems = document.querySelectorAll("[data-color]");
colorItems.forEach((colorItem) => {
  colorItem.addEventListener("click", () => {
    colorItems.forEach((colorItem) =>
      colorItem.classList.remove("activeColor")
    );
    colorItem.classList.add("activeColor");
    localStorage.setItem("color", colorItem.dataset.color);
    if (colorItem.dataset.color === "1") {
      container.classList.remove("color3", "color2");
      container.classList.add("color1");
      bar.color = "rgba(248, 112, 112, 1)";
      localStorage.setItem("currentColor", "rgba(248, 112, 112, 1)");
    } else if (colorItem.dataset.color === "2") {
      container.classList.remove("color1", "color3");
      container.classList.add("color2");
      bar.color = "#70f3f8";
      localStorage.setItem("currentColor", "#70f3f8");
    } else {
      container.classList.remove("color1", "color2");
      container.classList.add("color3");
      bar.color = "#d881f8";
      localStorage.setItem("currentColor", "#d881f8");
    }
  });
});
const fontItems = document.querySelectorAll("[data-font]");
fontItems.forEach((fontItem) => {
  fontItem.addEventListener("click", () => {
    fontItems.forEach((fontItem) => fontItem.classList.remove("activeFont"));
    fontItem.classList.add("activeFont");
    localStorage.setItem("font", fontItem.dataset.font);
    if (fontItem.dataset.font === "1") {
      container.classList.remove("RobotoSlab", "SpaceMono");
      container.classList.add("KumbhSans");
    } else if (fontItem.dataset.font === "2") {
      container.classList.remove("KumbhSans", "SpaceMono");
      container.classList.add("RobotoSlab");
    } else {
      container.classList.remove("KumbhSans", "RobotoSlab");
      container.classList.add("SpaceMono");
    }
  });
});

const container = document.querySelector(".container");
const options = document.getElementById("options");
const close = document.querySelector(".menu__close");
const apply = document.getElementById("apply");
options.addEventListener("click", () => {
  container.classList.add("menu-open");
});

close.addEventListener("click", () => container.classList.remove("menu-open"));
apply.addEventListener("click", () => container.classList.remove("menu-open"));

const inputPomodoro = document.getElementById("inputPomodoro");
const inputShortBreak = document.getElementById("inputShortBreak");
const inputLongBreak = document.getElementById("inputLongBreak");

apply.addEventListener("click", () => {
  localStorage.setItem("timerValue", inputPomodoro.value);
  localStorage.setItem("shortTime", inputShortBreak.value);
  localStorage.setItem("longTime", inputLongBreak.value);
  renderMinutes();
});
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const timerActions = document.querySelector(".timer__actions");
let currentSeconds;

function progressSvg(percent) {
  bar.set(percent);
}
const startTimer = () => {
  timerActions.textContent = "PAUSE";
  const typeTimer = localStorage.getItem("switch");
  let fullMinutes;
  if (typeTimer === "pomodoro") {
    fullMinutes = localStorage.getItem("timerValue");
  } else if (typeTimer === "shortBreak") {
    fullMinutes = localStorage.getItem("shortTime");
  } else if (typeTimer === "longBreak") {
    fullMinutes = localStorage.getItem("longTime");
  }
  let fullSeconds = fullMinutes * 60;
  if (currentSeconds === 0) {
    clearInterval(timerID);
    timerActions.textContent = "RESTART";
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = "./Radar-1.mp3"; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем

    currentSeconds = null;
    minutes.textContent = "00";
    seconds.textContent = "00";
  } else if (!currentSeconds) {
    currentSeconds = fullSeconds;
  } else {
    currentSeconds--;
  }
  let percent = currentSeconds / fullSeconds;
  progressSvg(percent);
  renderCurrentTime(currentSeconds);
};

function renderCurrentTime(getSeconds) {
  let fullSeconds = getSeconds;
  let currentMinutes = Math.floor(fullSeconds / 60);
  minutes.textContent = currentMinutes;
  let currentSecond = fullSeconds - currentMinutes * 60;
  if (currentSecond < 10) {
    seconds.textContent = "0" + currentSecond;
  } else {
    seconds.textContent = currentSecond;
  }
  if (fullSeconds <= 0) {
    seconds.textContent = "00";
  }
}
timerActions.addEventListener("click", () => {
  if (timerID) {
    clearInterval(timerID);
    timerID = undefined;
    timerActions.textContent = "START";
  } else {
    timerID = setInterval(startTimer, 1000);
  }
});
function renderMinutes() {
  let activeSwitch = localStorage.getItem("switch");
  if (activeSwitch === "pomodoro") {
    minutes.textContent = localStorage.getItem("timerValue");
  } else if (activeSwitch === "shortBreak") {
    minutes.textContent = localStorage.getItem("shortTime");
  } else if (activeSwitch === "longBreak") {
    minutes.textContent = localStorage.getItem("longTime");
  }
  seconds.textContent = "00";
}

const startApp = () => {
  inputPomodoro.value = localStorage.getItem("timerValue");
  inputShortBreak.value = localStorage.getItem("shortTime");
  inputLongBreak.value = localStorage.getItem("longTime");

  const themeFont = localStorage.getItem("font");
  fontItems.forEach((fontItem) => {
    if (fontItem.dataset.font === themeFont) {
      fontItem.classList.add("activeFont");
    }
    if (themeFont === "1") {
      container.classList.remove("RobotoSlab", "SpaceMono");
      container.classList.add("KumbhSans");
    } else if (themeFont === "2") {
      container.classList.remove("KumbhSans", "SpaceMono");
      container.classList.add("RobotoSlab");
    } else {
      container.classList.remove("KumbhSans", "RobotoSlab");
      container.classList.add("SpaceMono");
    }
  });
  const themeColor = localStorage.getItem("color");
  colorItems.forEach((colorItem) => {
    if (colorItem.dataset.color === themeColor) {
      colorItem.classList.add("activeColor");
    }
    if (themeColor === "1") {
      container.classList.remove("color3", "color2");
      container.classList.add("color1");
    } else if (themeFont === "2") {
      container.classList.remove("color1", "color3");
      container.classList.add("color2");
    } else {
      container.classList.remove("color1", "color2");
      container.classList.add("color3");
    }
  });
  const activeSwitch = localStorage.getItem("switch");
  switchItems.forEach((switchItem) => {
    if (switchItem.dataset.switch === activeSwitch) {
      switchItem.classList.add("activeSwitch");
    }
  });
  renderMinutes();
};
startApp();

const rrr = document.getElementById("container");
var bar = new ProgressBar.Circle(rrr, {
  strokeWidth: 6,
  easing: "easeInOut",
  duration: 1400,
  // color: localStorage.getItem("currentColor"),
  trailColor: "transparent",
  trailWidth: 1,
  svgStyle: null,
});

bar.animate(1.0); // Number from 0.0 to 1.0
bar.set(1);
