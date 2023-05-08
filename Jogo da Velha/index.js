//Capture DOM elements
const mainContainer = document.querySelector("#main-container");
const gameContainer = document.createElement("div");
gameContainer.id = "game-container";
const X = document.querySelector("#player-x");
const O = document.querySelector("#player-o");
const menu = document.querySelector(".menu");
const form = document
  .querySelector("form")
  .addEventListener("submit", setBoard);

let isCircleTurn;
let cont = 0;

// Creating & Appending board

function setBoard(ev) {
  ev.preventDefault();
  console.log("funcionou");

  const gameplayTextContainer = document.createElement("div");
  gameplayTextContainer.classList.add("gameplay-description");
  const gameplayText = document.createElement("span");
  gameplayText.classList.add("player-text");
  gameplayText.innerText = "Vez do Jogador";

  const playersContainer = document.createElement("div");
  playersContainer.className = "players-container";

  const xPlayerName = document.createElement("div");
  xPlayerName.id = "x";
  xPlayerName.className = "current";
  xPlayerName.innerText = `${X.value}`;
  const oPlayerName = document.createElement("div");
  oPlayerName.id = "o";
  oPlayerName.className = "";
  oPlayerName.innerText = `${O.value}`;

  const board = document.createElement("div");
  board.id = "board";
  board.className = "";
  const cellContainer = document.createElement("div");
  cellContainer.id = "cell-elements";

  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.id = `cell-${i}`;
    cell.className = "cell";
    cell.setAttribute("data-cell", "");
    cell.addEventListener("click", handleClick, { once: true });
    cellContainer.appendChild(cell);
  }

  board.append(cellContainer);

  playersContainer.append(xPlayerName, oPlayerName);

  gameplayTextContainer.append(gameplayText, playersContainer);

  gameContainer.append(gameplayTextContainer, board);

  mainContainer.append(gameContainer);

  if (mainContainer.contains(menu)) {
    mainContainer.removeChild(menu);
  } else {
    return;
  }

  isCircleTurn = false;
}

const addSymbol = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
  cell.innerText = classToAdd;
};

const toggleturns = () => {
  const xContainer = document.querySelector("#x");
  const oContainer = document.querySelector("#o");

  isCircleTurn = !isCircleTurn;

  if (isCircleTurn) {
    xContainer.classList.remove("current");
    oContainer.classList.add("current");
  } else {
    oContainer.classList.remove("current");
    xContainer.classList.add("current");
  }
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkForWin = (currentPlayer) => {
  const cellElements = document.querySelectorAll("[data-cell]");
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const findWinnerIndex = (currentPlayer) => {
  const cellElements = document.querySelectorAll("[data-cell]");
  return winningCombinations.findIndex((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

function setWinnerClass(winningCombinationsIndex) {
  const cellElements = document.querySelectorAll("[data-cell]");
  for (let i = 0; i < 9; i++) {
    var cell = cellElements[i];
  }

  winningCombinations[winningCombinationsIndex].map((index) => {
    if (cell.id.slice(-1) === index) {
      console.log(cell);
      cell.classList.add("winner");
    }
  });
}

const checkforDraw = (isWinner, cont) => {
  if (cont > 8 && isWinner == false) {
    return true;
  } else {
    return false;
  }
};

async function winnerScreen(cell) {
  const winnerScreenDiv = document.createElement("div");
  winnerScreenDiv.classList = "winner-screen";

  const winnerMessage = document.createElement("span");
  winnerMessage.className = "winner-message";
  winnerMessage.innerText = "Vitória do Jogador";

  const pX = document.createElement("p");

  const pO = document.createElement("p");

  const strongX = document.createElement("strong");
  strongX.innerText = `${X.value}!`;
  const strongO = document.createElement("strong");
  strongO.innerText = `${O.value}!`;

  const restartBtn = document.createElement("button");
  restartBtn.className = "restart-btn";
  restartBtn.innerText = "JOGAR DE NOVO";
  restartBtn.addEventListener("click", restartGame);

  if (cell.classList.contains("x")) {
    pX.append(strongX);
    winnerMessage.append(pX);
  } else {
    winnerMessage.append(pO);
    pO.append(strongO);
  }

  winnerScreenDiv.append(winnerMessage, restartBtn);

  mainContainer.appendChild(winnerScreenDiv);

  gameContainer.classList.add("hidden");
}

function drawScreen(cell) {
  console.log(cell);

  const drawScreenDiv = document.createElement("div");
  drawScreenDiv.classList = "draw-screen";

  const drawMessage = document.createElement("span");
  drawMessage.className = "draw-message";
  drawMessage.innerText = "Fim de Jogo,\nO resultado foi Empate!";

  const restartBtn = document.createElement("button");
  restartBtn.className = "restart-btn";
  restartBtn.innerText = "JOGAR DE NOVO";
  restartBtn.addEventListener("click", restartGame);

  drawScreenDiv.append(drawMessage, restartBtn);

  mainContainer.appendChild(drawScreenDiv);

  gameContainer.classList.add("hidden");

  console.log("Fim de Jogo,\nO resultado foi Empate!");
}
function restartGame(ev) {
  // remove game over screens
  const winnerScreenDiv = document.querySelector(".winner-screen");
  const drawScreenDiv = document.querySelector(".draw-screen");
  if (winnerScreenDiv == null) {
    mainContainer.removeChild(drawScreenDiv);
  } else {
    mainContainer.removeChild(winnerScreenDiv);
  }

  // clear cells

  const cellElements = document.querySelectorAll("[data-cell]");
  let cell = document.querySelector("[data-cell]");
  for (cell of cellElements) {
    cell.addEventListener("click", handleClick, { once: true });
    if (cell.classList.contains("x")) {
      cell.classList.remove("x");
      cell.innerText = "";
    } else if (cell.classList.contains("o")) {
      cell.classList.remove("o");
      cell.innerText = "";
    }
  }
  const playerX = document.querySelector("#x");
  const playerO = document.querySelector("#o");
  if (playerO.classList.contains("current")) {
    playerO.classList.remove("current");
    playerX.classList.add("current");
  } else {
  }

  // clear cont
  cont = 0;

  gameContainer.classList.remove("hidden");
  isCircleTurn = false;
}
// Main function

function handleClick(e) {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "o" : "x";

  // Add symbol
  addSymbol(cell, classToAdd);
  cont++;

  // verify victory
  const isWinner = checkForWin(classToAdd);
  const winnerIndex = findWinnerIndex(classToAdd);
  if (winnerIndex > -1) {
    setWinnerClass(winnerIndex);
  } else {
  }

  // verify draw
  const isDraw = checkforDraw(isWinner, cont);

  // game over screen
  if (isWinner) {
    setTimeout(() => {
      winnerScreen(cell);
    }, 3000);
  } else if (isDraw) {
    drawScreen(cell);
  } else {
    toggleturns();
  }
}
