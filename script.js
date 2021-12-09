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
// bar.set(1);

let timerID;
const switchItems = document.querySelectorAll("[data-switch]");
switchItems.forEach((switchItem) => {
  switchItem.addEventListener("click", () => {
    switchItems.forEach((switchItem) =>
      switchItem.classList.remove("activeSwitch")
    );
    switchItem.classList.add("activeSwitch");
    localStorage.removeItem("currentSeconds");
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
    changeColorTheme(colorItem.dataset.color);
  });
});

function changeColorTheme(activeColor) {
  switch (activeColor) {
    case "1":
      container.classList.remove("color3", "color2");
      container.classList.add("color1");
      break;
    case "2":
      container.classList.remove("color1", "color3");
      container.classList.add("color2");
      break;
    case "3":
      container.classList.remove("color1", "color2");
      container.classList.add("color3");
  }
}
function changeFontTheme(activeFont) {
  switch (activeFont) {
    case "1":
      container.classList.remove("RobotoSlab", "SpaceMono");
      container.classList.add("KumbhSans");
      break;
    case "2":
      container.classList.remove("KumbhSans", "SpaceMono");
      container.classList.add("RobotoSlab");
      break;
    case "3":
      container.classList.remove("KumbhSans", "RobotoSlab");
      container.classList.add("SpaceMono");
      break;
  }
}
const fontItems = document.querySelectorAll("[data-font]");
fontItems.forEach((fontItem) => {
  fontItem.addEventListener("click", () => {
    fontItems.forEach((fontItem) => fontItem.classList.remove("activeFont"));
    fontItem.classList.add("activeFont");
    localStorage.setItem("font", fontItem.dataset.font);
    changeFontTheme(fontItem.dataset.font);
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
  // if (!timerID) {
  //   renderMinutes();
  // }
  clearInterval(timerID);
  timerID = undefined;
  currentSeconds = undefined;
  timerActions.textContent = "START";
  progressSvg(1);
  renderMinutes();
  localStorage.removeItem("currentSeconds");
  startSvg();
});
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const timerActions = document.querySelector(".timer__actions");
let currentSeconds;

function progressSvg(percent) {
  bar.set(percent);
}
function startTimer() {
  if (localStorage.getItem("currentSeconds")) {
    timerActions.textContent = "PAUSE";
    currentSeconds = localStorage.getItem("currentSeconds");
    if (currentSeconds <= 0) {
      clearInterval(timerID);
      console.log("work");
      timerActions.textContent = "RESTART";
      var audio = new Audio(); // Создаём новый элемент Audio
      audio.src = "./Radar-1.mp3"; // Указываем путь к звуку "клика"
      audio.autoplay = true; // Автоматически запускаем
      currentSeconds = null;
      minutes.textContent = "00";
      seconds.textContent = "00";
      localStorage.removeItem("currentSeconds");
      timerID = undefined;
    } else if (!currentSeconds) {
      currentSeconds = fullSeconds;
    } else {
      currentSeconds--;
      localStorage.setItem("currentSeconds", currentSeconds);
    }
    let fullSeconds;
    const typeTimer = localStorage.getItem("switch");
    if (typeTimer === "pomodoro") {
      fullSeconds = localStorage.getItem("timerValue") * 60;
    } else if (typeTimer === "shortBreak") {
      fullSeconds = localStorage.getItem("shortTime") * 60;
    } else if (typeTimer === "longBreak") {
      fullSeconds = localStorage.getItem("longTime") * 60;
    }
    let percent = currentSeconds / fullSeconds;
    progressSvg(percent);
    renderCurrentTime(currentSeconds);
    return;
  } else {
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
      localStorage.removeItem("currentSeconds");
    } else if (!currentSeconds) {
      currentSeconds = fullSeconds;
    } else {
      currentSeconds--;
      localStorage.setItem("currentSeconds", currentSeconds);
    }
    let percent = currentSeconds / fullSeconds;
    progressSvg(percent);
    renderCurrentTime(currentSeconds);
  }
}

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
  if (localStorage.getItem("currentSeconds") && !timerID) {
    timerID = setInterval(startTimer, 1000);
    localStorage.setItem("timerOptions", "play");
  } else if (localStorage.getItem("currentSeconds") && timerID) {
    clearInterval(timerID);
    timerID = undefined;
    timerActions.textContent = "START";
    localStorage.setItem("timerOptions", "pause");
  } else if (!localStorage.getItem("currentSeconds") && !timerID) {
    timerID = setInterval(startTimer, 1000);
    localStorage.setItem("timerOptions", "play");
  } else {
  }
});
function renderMinutes(lastTimerTime) {
  let activeSwitch = localStorage.getItem("switch");
  if (!lastTimerTime) {
    if (activeSwitch === "pomodoro") {
      minutes.textContent = localStorage.getItem("timerValue");
    } else if (activeSwitch === "shortBreak") {
      minutes.textContent = localStorage.getItem("shortTime");
    } else if (activeSwitch === "longBreak") {
      minutes.textContent = localStorage.getItem("longTime");
    }
    seconds.textContent = "00";
  } else {
    let min = Math.floor(lastTimerTime / 60);
    minutes.textContent = min;
    seconds.textContent = lastTimerTime - min * 60;
    return;
  }
}

const startApp = () => {
  if (localStorage.getItem("timerValue") === null) {
    localStorage.setItem("timerValue", "20");
  }
  if (localStorage.getItem("shortTime") === null) {
    localStorage.setItem("shortTime", "5");
  }
  if (localStorage.getItem("longTime") === null) {
    localStorage.setItem("longTime", "15");
  }
  if (localStorage.getItem("switch") === null) {
    localStorage.setItem("switch", "pomodoro");
  }
  if (localStorage.getItem("font") === null) {
    localStorage.setItem("font", "1");
  }
  if (localStorage.getItem("color") === null) {
    localStorage.setItem("color", "1");
  }
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

  if (localStorage.getItem("currentSeconds")) {
    let currentSeconds = localStorage.getItem("currentSeconds");
    renderMinutes(currentSeconds);
    if (localStorage.getItem("timerOptions") === "play") {
      timerID = setInterval(startTimer, 1000);
    }

    startSvg();

    return;
  }
  renderMinutes();
};
function startSvg() {
  if (localStorage.getItem("currentSeconds")) {
    let currentSeconds = localStorage.getItem("currentSeconds");
    // renderMinutes(currentSeconds);

    let fullSeconds2;
    let typeTimer = localStorage.getItem("switch");
    if (typeTimer === "pomodoro") {
      fullSeconds2 = localStorage.getItem("timerValue") * 60;
    } else if (typeTimer === "shortBreak") {
      fullSeconds2 = localStorage.getItem("shortTime") * 60;
    } else if (typeTimer === "longBreak") {
      fullSeconds2 = localStorage.getItem("longTime") * 60;
    }
    let percent2 = currentSeconds / fullSeconds2;
    progressSvg(percent2);
  }
}
startApp();
