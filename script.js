let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let moveHistory = [];
let mode = "2-player"; // Default mode is 2-player

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