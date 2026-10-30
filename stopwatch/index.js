const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const state = document.getElementById("state");
const displatHours = document.getElementById("hours");
const displatMinutes = document.getElementById("minutes");
const displatSeconds = document.getElementById("seconds");

let intervalId;
let startTime = 0;
const formatTime = (startTime) => {
  const seconds = Math.floor(startTime % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((startTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(startTime / 3600)
    .toString()
    .padStart(2, "0");
  displatHours.textContent = hours;
  displatMinutes.textContent = minutes;
  displatSeconds.textContent = seconds;
};

const stopTimer = () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
  state.textContent = "Paused";
  startButton.textContent = "Resume";
};
const resetTimer = () => {
  clearInterval(intervalId);
  startTime = 0;
  formatTime(startTime);
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  state.textContent = "Ready";
  startButton.textContent = "Start";
};
const startTimer = () => {
  intervalId = setInterval(() => {
    startTime++;
    formatTime(startTime);
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  state.textContent = "Running";
};

resetButton.addEventListener("click", resetTimer);
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
