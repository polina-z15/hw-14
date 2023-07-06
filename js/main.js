const timerForm = document.getElementById("timerForm");
const intervalInput = document.getElementById("interval");
const timerRestH = document.getElementById("timerRestH");
const timerRestM = document.getElementById("timerRestM");
const timerRestS = document.getElementById("timerRestS");
const pauseButton = document.getElementById("pauseButton");
const resumeButton = document.getElementById("resumeButton");

let timerInterval;
let remainingTime = 0;
let isPaused = false;

function updateTimerDisplay(hours, minutes, seconds) {
  timerRestH.textContent = hours + " h.";
  timerRestM.textContent = minutes + " m.";
  timerRestS.textContent = seconds + " s.";
}

function startTimer() {
  const interval = parseInt(intervalInput.value);
  if (isNaN(interval) || interval <= 0) {
    alert("Введіть додатне число для інтервалу");
    return;
  }
  remainingTime = interval;
  const hours = Math.floor(remainingTime / 3600);

  remainingTime %= 3600;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  updateTimerDisplay(hours, minutes, seconds);

  timerInterval = setInterval(function () {
    if (!isPaused) {
      remainingTime--;
      if (remainingTime < 0) {
        clearInterval(timerInterval);
        alert("Час вийшов!");
        resetTimer();
        return;
      }
      const hours = Math.floor(remainingTime / 3600);
      remainingTime %= 3600;
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      updateTimerDisplay(hours, minutes, seconds);
    }
  }, 1000);

  intervalInput.disabled = true;
  pauseButton.disabled = false;
  resumeButton.disabled = true;
}

function pauseTimer() {
  isPaused = true;
  pauseButton.disabled = true;
  resumeButton.disabled = false;
}

function resumeTimer() {
  isPaused = false;
  pauseButton.disabled = false;
  resumeButton.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  intervalInput.disabled = false;
  pauseButton.disabled = true;
  resumeButton.disabled = true;
  intervalInput.value = "";
  updateTimerDisplay(0, 0, 0);
}

timerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  startTimer();
});

pauseButton.addEventListener("click", function () {
  pauseTimer();
});

resumeButton.addEventListener("click", function () {
  resumeTimer();
});

resetButton.addEventListener("click", function () {
  resetTimer();
});
