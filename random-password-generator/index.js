const showPassword = document.getElementById("showPassword");
const changingWord = document.getElementById("changingWord");
const changingNumber = document.getElementById("changingNumber");
const copiedPassword = document.getElementById("copiedPassword");
const passwordRange = document.getElementById("passwordRange");
const changePassword = document.getElementById("changePassword");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

const generatePassword = () => {
  let password = "";
  const random = new Uint32Array(1);
  const limit = Math.floor(2 ** 32 / characters.length) * characters.length;
  for (let i = 0; i < Number(passwordRange.value); i++) {
    do {
      crypto.getRandomValues(random);
    } while (random[0] > limit);
    password += characters[random[0] % characters.length];
  }
  showPassword.textContent = password;
};

const generatePasswordFromRange = () => {
  changingNumber.textContent = passwordRange.value;
  generatePassword();
};

const copyPassword = () => {
  navigator.clipboard.writeText(showPassword.textContent);
  copiedPassword.textContent = "Copied";
  changingWord.textContent = "Password copied to clipboard";
  setTimeout(() => {
    copiedPassword.textContent = "Copy";
    changingWord.textContent = "Uses letters, numbers, and symbols.";
  }, 1500);
};

copiedPassword.addEventListener("click", copyPassword);

passwordRange.addEventListener("input", generatePasswordFromRange);

changePassword.addEventListener("click", generatePassword);

generatePassword();
