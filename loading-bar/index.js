const messages = document.getElementById("messages");
const loadingDuration = document.getElementById("loading-duration");
const LoadingBar = document.getElementById("Loading-bar");

const LOADING_DURATION_MS = 5000;
const message = [
  "Preparing your space",
  "Bringing everything together",
  "Adding the finishing touches",
  "All set. Welcome in!",
];
let startTime = null;

const renderProcess = (percentage) => {
  const roundedPercentage = Math.floor(percentage);
  const currentMessage =
    roundedPercentage >= 100
      ? 3
      : roundedPercentage >= 80
        ? 2
        : roundedPercentage >= 35
          ? 1
          : 0;

  console.log(roundedPercentage);

  loadingDuration.textContent = roundedPercentage;
  LoadingBar.style.width = `${roundedPercentage}%`;

  messages.textContent = message[currentMessage];
};

const updateProcess = (timestamp) => {
  if (!startTime) {
    startTime = timestamp;
  }

  const percentage = Math.min(
    ((timestamp - startTime) / LOADING_DURATION_MS) * 100,
    100,
  );
  console.log(percentage);

  renderProcess(percentage);

  if (percentage < 100) {
    requestAnimationFrame(updateProcess);
  }
};

requestAnimationFrame(updateProcess);
