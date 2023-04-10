let currPlayer = "X"; //x always starts
let gameEnded = false;
let board = ["", "", "", "", "", "", "", "", ""];
let startBtn = document.querySelector(".btn");
let newBtn = document.querySelector(".newBtn");

// each box can respond to user by using query selector all on all boxes
const startFunction = () => {
  document.querySelectorAll(".grid-item").forEach((box) => {
    box.addEventListener("click", () => {
      // If game has ended, do nothing
      if (gameEnded) {
        return;
      }

      // If box is already occupied, do nothing
      if (box.textContent !== "") {
        return;
      }

      // put x or o on the board
      box.textContent = currPlayer;
      board[box.id] = currPlayer;

      if (checkWin()) {
        alert(currPlayer + " wins!");
        gameEnded = true;
        return;
      }

      // Check if game has ended in a draw
      if (checkDraw()) {
        alert("Draw!");
        gameEnded = true;
        return;
      }

      // Switch players

      if (currPlayer === "X") {
        currPlayer = "O";
      } else {
        currPlayer = "X";
      }
    });
  });

  // Check if the current player has won
  const checkWin = () => {
    // List of all possible winning combinations
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((combination) => {
      // Check if any of the provided combinations meet current combination. Returns true if they do. Loops over diffrenet combinations
      return combination.every((index) => {
        //for each combination check if every element has the same currPlayer

        return board[index] === currPlayer; //if current player value (o or x) is in winning indexes of at least one combination then he/she wins
      });
    });
  };

  const checkDraw = () => {
    // Check if all the boxes are occupied without any of them being previously selected by
    return board.every((box) => {
      return box !== "";
    });
  };
};

const newGame = (event) => {
  window.location.reload(); // refreshes the page
};

startBtn.addEventListener("click", startFunction);

newBtn.addEventListener("click", newGame);
