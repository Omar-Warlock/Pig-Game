'use strict';

// Selecting elements
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

const playerCurrentScore1 = document.getElementById('current--0');
const playerCurrentScore2 = document.getElementById('current--1');
const playerTotalScore1 = document.getElementById('score--0');
const playerTotalScore2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

let activePlayer = 0;
let playing = true;

// Helper functions
function random() {
  return Math.trunc(Math.random() * 6) + 1;
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

function resetGame() {
  playerCurrentScore1.textContent = '0';
  playerCurrentScore2.textContent = '0';
  playerTotalScore1.textContent = '0';
  playerTotalScore2.textContent = '0';
  dice.classList.add('hidden');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  activePlayer = 0;
  playing = true;
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
}

// Roll Dice
btnRollDice.addEventListener('click', () => {
  if (playing) {
    const diceRoll = random();
    dice.classList.remove('hidden');
    dice.setAttribute('src', `dice-${diceRoll}.png`);

    if (diceRoll !== 1) {
      const currentScoreEl = document.getElementById(
        `current--${activePlayer}`
      );
      currentScoreEl.textContent =
        Number(currentScoreEl.textContent) + diceRoll;
    } else {
      switchPlayer();
    }
  }
});

// Hold Score
btnHoldScore.addEventListener('click', () => {
  if (playing) {
    const totalScoreEl = document.getElementById(`score--${activePlayer}`);
    const currentScoreEl = document.getElementById(`current--${activePlayer}`);

    totalScoreEl.textContent =
      Number(totalScoreEl.textContent) + Number(currentScoreEl.textContent);

    if (Number(totalScoreEl.textContent) >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

// New Game
btnNewGame.addEventListener('click', resetGame);
