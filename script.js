// Get elements
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

// Initial variables
let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill(""); // Empty board with 9 cells

// Winning combinations
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6]             // Diagonal
];

// Create game board
function createBoard() {
  board.innerHTML = ""; // Clear the board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  
  // Check if current player wins
  const winner = checkWinner();
  if (winner) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    highlightWinningCells(winner);  // Highlight winning sequence
    gameActive = false;
  } else if (boardState.every(cell => cell !== "")) {  // All cells filled and no winner
    statusText.textContent = "It's a Draw! 😐";
    gameActive = false;
  } else {
    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for winner and return the winning combo
function checkWinner() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return combo;  // Return the winning combo
    }
  }
  return null;
}

// Highlight the winning cells
function highlightWinningCells(winningCombo) {
  winningCombo.forEach(index => {
    const cell = board.children[index];
    cell.style.backgroundColor = "#ffcc00";  // Yellow color to highlight the win
    cell.style.color = "black";  // Make the text visible if it's yellow
  });
}

// Restart the game
restartBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  gameActive = true;
  boardState = Array(9).fill("");
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  createBoard();
});

// Initialize the game board
createBoard();
