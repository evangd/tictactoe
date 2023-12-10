const Gameboard = (function() {
    const board = Array(9).fill(0);

    const getBoard = () => {
        const cells = document.querySelectorAll('td');
        for (let i = 0; i < cells.length; ++i) {
            cells[i].textContent = board[i];
        }
    };

    const markBoard = (cell, player) => {
        board[cell] = player.getLetter();
        getBoard();
        return checkResult(cell, player);
    };

    function checkResult(cell, player) {
        if (checkRow(cell) || checkCol(cell)) {
            console.log(player.getName() + ' wins!');
            return true;
        } else {
            return false;
        }
    }

    function checkRow(cell) {
        if (cell === 0 || cell === 3 || cell === 6) {
            if (board[cell] === board[cell + 1] && board[cell] === board[cell + 2]) {
                return true;
            } else {
                return false;
            }
        } else if (cell === 2 || cell === 5 || cell === 8) {
            if (board[cell] === board[cell - 1] && board[cell] === board[cell - 2]) {
                return true;
            } else {
                return false;
            }
        } else {
            if (board[cell] === board[cell - 1] && board[cell] === board[cell + 1]) {
                return true;
            } else {
                return false;
            }
        }
    }

    function checkCol(cell) {
        if (cell === 0 || cell === 1 || cell === 2) {
            if (board[cell] === board[cell + 3] && board[cell] === board[cell + 6]) {
                return true;
            } else {
                return false;
            }
        } else if (cell === 3 || cell === 4 || cell === 5) {
            if (board[cell] === board[cell - 3] && board[cell] === board[cell + 3]) {
                return true;
            } else {
                return false;
            }
        } else {
            if (board[cell] === board[cell - 3] && board[cell] === board[cell - 6]) {
                return true;
            } else {
                return false;
            }
        }
    }

    return {getBoard, markBoard};
})();

const Game = (function() {
    const p1 = Player("Player 1", "X"); // let players choose these later
    const p2 = Player("Player 2", "O"); // let players choose these later

    const playRound = () => {
        if (!takeTurn(p1)) {
            if (!takeTurn(p2)) {
                playRound();
            }
        }
    };

    function takeTurn(player) {
      
        const move = Number(prompt(player.getName() + ' enter your move:'));

        return Gameboard.markBoard(move, player);
    }

    return {playRound};
})();

function Player(nameIn, letterIn) {
    const name = nameIn;
    const letter = letterIn;

    const getName = () => name;
    const getLetter = () => letter;

    return {getName, getLetter};
}

// AND BEGIN!

Game.playRound();