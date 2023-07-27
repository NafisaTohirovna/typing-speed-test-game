// const typingText = document.querySelector(".typing-text p");
// inpField = document.querySelector(".wrapper .input-field");
// timeTag = document.querySelector(".time");
// mistakeTag = document.querySelector(".mistake span");
// wpmTag = document.querySelector(".wpm span");
// cpmTag = document.querySelector(".cpm span");

// let timer;
// maxTime = 60;
// timeLeft = maxTime;
// charIndex = mistakes = isTyping = 0;

// function randomParagraph() {
//   let randIndex = Math.floor(Math.random() * paragraphs.length);
//   typingText.innerHTML = "";
//   paragraphs[randIndex].split("").forEach((span) => {
//     let spanTag = `<span>${span}</span>`;
//     typingText.innerHTML += spanTag;
//   });
//   document.addEventListener("keydown", () => inpField.focus());
//   typingText.addEventListener("click", () => inpField.focus());
// }

// function initTyping() {
//   const characters = typingText.querySelectorAll("span");
//   let typedChar = inpField.value.split("")[charIndex];
//   if (charIndex < characters.length - 1 && timeLeft > 0) {
//     if (!isTyping) {
//       timer = setInterval(initTimer, 1000);
//       isTyping = true;
//     }
//     if (typedChar == null) {
//       charIndex--;
//       if (characters[charIndex].classList.contains("incorrect")) {
//         mistakes--;
//       }
//       characters[charIndex].classList.remove("correct", "incorrect");
//     } else {
//       if (characters[charIndex].innerText === typedChar) {
//         characters[charIndex].classList.add("correct");
//       } else {
//         mistakes++;
//         characters[charIndex].classList.add("incorrect");
//       }
//       charIndex++;
//     }

//     characters.forEach((span) => span.classList.remove("active"));
//     characters[charIndex].classList.add("active");

//     let wpm = Math.round(
//       ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
//     );
//     wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
//     mistakeTag.innerText = mistakes;
//     wpmTag.innerText = wpm;
//     cpmTag.innerText = charIndex - mistakes;
//   } else {
//     inpField.value = "";
//     clearInterval(timer);
//   }
// }

// inpField.addEventListener("input", initTyping);

// startBtn = document.querySelector("#startBtn");
// closeBtn = document.querySelector("#closeBtn");
// tryBtn = document.querySelector("#tryBtn");
// let testWrapper = document.querySelector(".wrapper");
// let startWrapper = document.querySelector(".start-wrapper");
// let finishWrapper = document.querySelector(".finish-wrapper");

// startBtn.addEventListener("click", () => {
//   testWrapper.style.display = "block";
//   startWrapper.style.display = "none";
//    randomParagraph();
//   //  initTyping()
// });

// closeBtn.addEventListener("click", () => {
//   testWrapper.style.display = "none";
//   finishWrapper.style.display = "block";
//   inpField.value = "";
// });

// tryBtn.addEventListener("click", () => {
//   startWrapper.style.display = "block";
//   finishWrapper.style.display = "none";
//   resetGame();
// });

// function initTimer() {
//   if (timeLeft > 0) {
//     timeLeft--;
//     timeTag.innerHTML = "0:" + timeLeft;
//   } else {
//     clearInterval(timer);
//   }
// }

// function resetGame() {
//   timeLeft = maxTime;
//   charIndex = mistakes = isTyping = 0;
//   mistakeTag.innerText = 0;
//   cpmTag.innerText = 0;
//   wpmTag.innerText = 0;
//   randomParagraph();
// }

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const timeTag = document.querySelector(".time");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = (mistakes = isTyping = 0);
let typingInterval;
let startTime;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function randomParagraph() {
  const randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function startTimer() {
  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerHTML = formatTime(timeLeft);
  } else {
    clearInterval(timer);
  }
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (!isTyping) {
    startTime = new Date();
    startTimer();
  }

  if (charIndex < characters.length && timeLeft > 0) {
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

    let wpm = Math.round(
      ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    inpField.value = "";
    clearInterval(timer);
    clearInterval(typingInterval);
    isTyping = false;
  }
}

inpField.addEventListener("input", initTyping);

const timeSelect = document.getElementById("time");
timeSelect.addEventListener("change", () => {
  maxTime = parseInt(timeSelect.value);
  timeLeft = maxTime;
  timeTag.innerHTML = formatTime(timeLeft);
});

const startBtn = document.querySelector("#startBtn");
const closeBtn = document.querySelector("#closeBtn");
const tryBtn = document.querySelector("#tryBtn");
const testWrapper = document.querySelector(".wrapper");
const startWrapper = document.querySelector(".start-wrapper");
const finishWrapper = document.querySelector(".finish-wrapper");

startBtn.addEventListener("click", () => {
  randomParagraph();
  testWrapper.style.display = "block";
  startWrapper.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  testWrapper.style.display = "none";
  finishWrapper.style.display = "block";
  inpField.value = "";
});

tryBtn.addEventListener("click", () => {
  startWrapper.style.display = "block";
  finishWrapper.style.display = "none";
  resetGame();
});

function resetGame() {
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
  wpmTag.innerText = 0;
}
