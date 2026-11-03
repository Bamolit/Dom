const panel = document.getElementById("changing-color");
const icon = document.getElementById("changing-icons");
const firstWord = document.getElementById("changing-first-word");
const secondWord = document.getElementById("changing-second-word");

const lastSecond = document.getElementById("last-second");
const bestSecond = document.getElementById("best-second");

let state = "ready";
let startTime;
let timer;
let bestTime = Infinity;

// Start game
const startGame = () => {
  clearTimeout(timer);

  state = "waiting";
  icon.textContent = "...";
  icon.style.color = "white";
  icon.style.fontSize = "50px";

  panel.style.backgroundColor = "#7f1d1d";

  firstWord.textContent = "Wait for green";
  secondWord.textContent = "Don't click yet";

  timer = setTimeout(() => {
    state = "green";

    panel.style.backgroundColor = "#D9F99D";

    icon.style.color = "#09090B";
    icon.style.fontSize = "50px";

    firstWord.style.color = "#09090B";
    secondWord.style.color = "#09090B";

    firstWord.textContent = "Click Now!";
    secondWord.textContent = "Click as fast as you can";

    icon.textContent = "!";

    startTime = performance.now();
  }, Math.random() * 3000 + 2000);
};

// Panel click
panel.addEventListener("click", () => {
  if (state === "ready") {
    startGame();

  } else if (state === "waiting") {
    clearTimeout(timer);

    state = "ready";

    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
        width="50" height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-2.64-6.36"/>
        <path d="M21 3v6h-6"/>
      </svg>
    `;

    panel.style.backgroundColor = "#18181B";

    firstWord.textContent = "Too soon!";
    secondWord.textContent = "Click to try again";

  } else if (state === "green") {
    const reactionTime = Math.round(performance.now() - startTime);

    state = "result";

    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
        width="50" height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M5 12l5 5L20 7"/>
      </svg>
    `;

    panel.style.backgroundColor = "#27272A";

    firstWord.textContent = `${reactionTime} ms`;
    firstWord.style.color = "white";

    secondWord.style.color = "white";
    secondWord.textContent = "Click to try again";

    // Last attempt
    lastSecond.textContent = `${reactionTime} ms`;
    lastSecond.className = "text-[#D9F99D] text-[20px] font-semibold";

    // Best attempt
    if (reactionTime < bestTime) {
      bestTime = reactionTime;

      bestSecond.textContent = `${bestTime} ms`;
      bestSecond.className = "text-[#D9F99D] text-[20px] font-semibold";
    }

  } else if (state === "result") {
    startGame();
  }
});