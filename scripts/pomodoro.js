const BREAK_TIME = 600; // break time in seconds
const WORK_TIME = 1200; // work time in seconds'
const TRANSITION_TIME = 10; // how long to be in transition state for

var transitionImage = document.createElement("img");
transitionImage.src = "https://media1.tenor.com/images/85adf3feacb86830d003b8767efcb8de/tenor.gif?itemid=16065857";

var startSound = document.getElementById("startSound");
var finishSound = document.getElementById("finishSound");
var breakSound = document.getElementById("breakSound");

const getTimeLeft = (endTime) => {
  const total = endTime - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60));
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
};

const CURR_TIME = Date.now();

const transitionButton = () => {
  finishSound.play();
  button = document.getElementById("pomobutton");
  button.className = "transition-timer";
  button.innerHTML = "";
  button.appendChild(transitionImage);
  setTimeout(breakTime, TRANSITION_TIME * 1000);
};

const countdown = (button, endTime) => { // only called when active
  var timeAtPause;

  const handleCount = () => {
    button.innerHTML = getTimeLeft(endTime);
    if (999 > endTime - Date.now()) {
      if (button.classList.contains("active-timer")) {
        button.removeEventListener('click', handlePause);
        transitionButton();
      }
      clearInterval(cd);
      return;
    }
  };

  var cd = setInterval(handleCount, 50);

  const pause = () => {
    timeAtPause = Date.now();
    clearInterval(cd); // clears the interval
  };

  const unpause = () => {
    var deltaFromPause = Date.now() - timeAtPause;
    endTime += deltaFromPause;
    cd = setInterval(handleCount, 50);
  };

  const handlePause = () => {
    if (button.classList.contains("paused")) {
      unpause();
      button.classList.remove("paused");
    } else {
      button.classList.add("paused");
      pause();
    }
  };

  if (button.classList.contains("active-timer")) { // only allow pausing if the timer is active and not break mode
    button.addEventListener("click", handlePause);
  }
};

const activate = () => { // only called when inactive
  var btn = document.getElementById("pomobutton");
  startSound.play();
  btn.className = "active-timer"
  btn.removeEventListener("click", activate);
  countdown(btn, Date.now() + WORK_TIME * 1000);
};

const deactivateButton = () => {
  button = document.getElementById("pomobutton");
  button.innerHTML = "click 2 start";
  button.className = "inactive-timer";
  button.addEventListener("click", activate);
};

const breakTime = () => {
  var btn = document.getElementById("pomobutton");
  btn.removeChild(transitionImage);
  btn.className = "break-timer";
  countdown(btn, Date.now() + BREAK_TIME * 1000);
  var rest = setTimeout(deactivateButton, (BREAK_TIME + 0.25) * 1000);
};

deactivateButton();
