"use strict";

setTimeout(() => {
  let player1Name = prompt("Please enter first player name");
  let player2Name = prompt("Please enter second player name");
  if (player1Name && player2Name) {
    document.querySelector("#name-0").textContent = player1Name;
    document.querySelector("#name-1").textContent = player2Name;
  } else {
    document.querySelector("#name-0").textContent =
      document.querySelector("#name-0").textContent;
    document.querySelector("#name-1").textContent =
      document.querySelector("#name-1").textContent;
  }
}, 100);

clearTimeout();

document.querySelector("#theme").addEventListener("click", function () {
  document.querySelector("main").classList.toggle("dark");
  document.querySelector("body").classList.toggle("darkBody");
  let mode = "light_mode_FILL0_wght400_GRAD0_opsz48.png";
  document.querySelector(".modeImg").classList.toggle("darkbtn");
});

// Selecting the elements
const player0Active = document.querySelector(".player-0");
const player1Active = document.querySelector(".player-1");
const player0Score = document.getElementById("score-0");
const player1Score = document.getElementById("score-1");
const current0Score = document.getElementById("current-0");
const current1Score = document.getElementById("current-1");
const winMsg = document.getElementById("winner");

const dice = document.querySelector(".dice");
const restartGame = document.querySelector(".new-btn");
const rollDice = document.querySelector(".roll-dice-btn");
const holdOn = document.querySelector(".pause-btn");

let scores, currentScore, currentPlayer, hasWinner;

const initialValues = () => {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  hasWinner = false;

  player0Score.textContent = 0;
  player1Score.textContent = 0;
  current0Score.textContent = 0;
  current1Score.textContent = 0;

  dice.classList.add("hidden");
  player0Active.classList.add("active-player");
  player1Active.classList.remove("active-player");
  player0Active.classList.remove("player-winner");
  player1Active.classList.remove("player-winner");
  winMsg.classList.add("hidden");
};

initialValues();

const togglePlayer = () => {
  document.getElementById(`current-${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0Active.classList.toggle("active-player");
  player1Active.classList.toggle("active-player");
};

// Adding functionality to roll the dice

rollDice.addEventListener("click", function () {
  if (!hasWinner) {
    //Generating random dice number
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice number
    dice.classList.remove("hidden");
    dice.src = `point-${randomDice}.png`;

    // Validation for the randomDice if it is 1 or not
    if (randomDice !== 1) {
      // Add the score
      currentScore += randomDice;
      document.getElementById(`current-${currentPlayer}`).textContent =
        currentScore;
      // current0Score.textContent = currentScore;
    } else {
      //Switch to next player
      togglePlayer();
    }
  }
});

holdOn.addEventListener("click", function () {
  if (!hasWinner) {
    // add the current score to active player

    scores[currentPlayer] += currentScore;
    document.getElementById(`score-${currentPlayer}`).textContent =
      scores[currentPlayer];

    // If either of the player reaches the score >= 100

    if (scores[currentPlayer] >= 100) {
      hasWinner = true;
      document
        .querySelector(`.player-${currentPlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${currentPlayer}`)
        .classList.remove("active-player");
      dice.classList.add("hidden");
      //   setTimeout(() => {
      winMsg.textContent = `${
        document.querySelector(`#name-${currentPlayer}`).textContent
      } has won the game 🎉🥳`;
      winMsg.classList.remove("hidden");
      // );
      //   }, 100);
      //   clearTimeout();
    } else {
      togglePlayer();
    }
  }
});

restartGame.addEventListener("click", initialValues);
