const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'ai'; 

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6] 
];

const modeBtn = document.createElement('button');
modeBtn.textContent = 'Switch to Two-Player Mode';
modeBtn.id = 'mode-toggle';
modeBtn.style.padding = '10px 20px';
modeBtn.style.fontSize = '16px';
modeBtn.style.cursor = 'pointer';
modeBtn.style.background = '#333';
modeBtn.style.color = 'white';
modeBtn.style.border = 'none';
modeBtn.style.borderRadius = '5px';
modeBtn.style.marginLeft = '10px';
document.querySelector('.game-container').insertBefore(modeBtn, resetBtn);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
modeBtn.addEventListener('click', toggleMode);

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }
  if (board.every(cell => cell)) {
    status.textContent = "It's a Tie!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s Turn`;

  if (gameMode === 'ai' && currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  }
}

function checkWin() {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === currentPlayer)
  );
}

function aiMove() {
  const emptyCells = board
    .map((val, idx) => (val === '' ? idx : null))
    .filter(val => val !== null);
  if (emptyCells.length === 0) return;

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = 'O';
  document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = 'O';

  if (checkWin()) {
    status.textContent = `Player O Wins!`;
    gameActive = false;
    return;
  }
  if (board.every(cell => cell)) {
    status.textContent = "It's a Tie!";
    gameActive = false;
    return;
  }

  currentPlayer = 'X';
  status.textContent = `Player X's Turn`;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player X's Turn`;
  cells.forEach(cell => (cell.textContent = ''));
}

function toggleMode() {
  gameMode = gameMode === 'ai' ? 'twoPlayer' : 'ai';
  modeBtn.textContent = gameMode === 'ai' ? 'Switch to Two-Player Mode' : 'Switch to AI Mode';
  resetGame(); 
}