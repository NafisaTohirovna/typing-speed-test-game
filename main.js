const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field");
timeTag = document.querySelector(".time");
mistakeTag = document.querySelector(".mistake span");
wpmTag = document.querySelector(".wpm span");
cpmTag = document.querySelector(".cpm span");
let timer;
maxTime = 60;
timeLeft = maxTime;
charIndex = mistakes = isTyping = 0;

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }
  if (typedChar == null) {
    charIndex--;
    if (characters[charIndex].classList.contains("incorrect")) {
      mistakes--;
    }
    characters[charIndex].classList.remove("correct", "incorrect");
  } else {
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }

  characters.forEach((span) => span.classList.remove("active"));
  characters[charIndex].classList.add("active");

  let wpm = Math.round((((charIndex - mistakes) / 5 )/ (maxTime - timeLeft))*60);
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = wpm
  cpmTag.innerText = charIndex - mistakes;
}

randomParagraph();

inpField.addEventListener("input", initTyping);

startBtn = document.querySelector("#startBtn");
closeBtn = document.querySelector("#closeBtn");
tryBtn = document.querySelector("#tryBtn");
let testWrapper = document.querySelector(".wrapper");
let startWrapper = document.querySelector(".start-wrapper");
let finishWrapper = document.querySelector(".finish-wrapper");

startBtn.addEventListener("click", () => {
  testWrapper.style.display = "block";
  startWrapper.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  testWrapper.style.display = "none";
  finishWrapper.style.display = "block";
});

tryBtn.addEventListener("click", () => {
  startWrapper.style.display = "block";
  finishWrapper.style.display = "none";
});

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerHTML = "0:" + timeLeft;
  } else {
    clearInterval(timer);
  }
}
