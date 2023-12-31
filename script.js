let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let moveHistory = [];
let mode = "2-player"; // Default mode is 2-player

document.addEventListener("DOMContentLoaded", function () {
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  modeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      mode = document.querySelector('input[name="mode"]:checked').value;
      resetGame();
    });
  });
});
  

function move(cell) {
  const cells = document.querySelectorAll('.cell');
  let index = -1;

  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === cell) {
      index = i;
      break;
    }
  }

  if (index !== -1 && gameBoard[index] === "" && !checkWinner()) {
    gameBoard[index] = currentPlayer;
    moveHistory.push(index);
    cell.textContent = currentPlayer;
    if (checkWinner()) {
      document.getElementById("winner").textContent = `Player ${currentPlayer} wins!`;
    } else {
      if (currentPlayer === "X") {
          currentPlayer = "O";
        } else {
          currentPlayer = "X";
        }    
      if (mode === "vs-computer" && currentPlayer === "O") {
        computerMove();
      }
    }
  }
}

function checkWinner() {
  // Provjera horizontalnih linija
  for (let i = 0; i < 9; i += 3) {
    if (gameBoard[i] && gameBoard[i] === gameBoard[i + 1] && gameBoard[i] === gameBoard[i + 2]) {
      return true;
    }
  }
  
  // Provjera vertikalnih linija
  for (let i = 0; i < 3; i++) {
    if (gameBoard[i] && gameBoard[i] === gameBoard[i + 3] && gameBoard[i] === gameBoard[i + 6]) {
      return true;
    }
  }
  
  // Provjera dijagonalnih linija
  if (gameBoard[0] && gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) {
    return true;
  }
  if (gameBoard[2] && gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) {
    return true;
  }
  
  return false;
}

function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  moveHistory = [];
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
  document.getElementById("winner").textContent = "";
}

  
function undo() {
  if (moveHistory.length > 0 && !checkWinner()) {
    const lastMoveIndex = moveHistory.pop();
    gameBoard[lastMoveIndex] = ""; // Poništavamo potez
    const cells = document.querySelectorAll(".cell");
    cells[lastMoveIndex].textContent = ""; // Brišemo znak iz polja
    if (currentPlayer === "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
      } // Promijenimo trenutnog igrača
  }
}

function computerMove() {
  const emptyCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const chosenCell = emptyCells[randomIndex];
    gameBoard[chosenCell] = "O";
    moveHistory.push(chosenCell);
    const cells = document.querySelectorAll(".cell");
    cells[chosenCell].textContent = "O";
    if (checkWinner()) {
      document.getElementById("winner").textContent = "Player O wins!";
    }
    currentPlayer = "X";
  }
}