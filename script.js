const Gameboard = (function() {
    const board = Array(9).fill(0);

    const getBoard = () => {
        console.table(board);
    };

    const markBoard = (cell, player) => {
        board[cell] = player.getLetter();
        checkResult(cell, player);
    };

    function checkResult(cell, player) {
        if (checkRow(cell) || checkCol(cell)) {
            console.log(player.getName() + ' wins!');
        } else {
            getBoard();
            Game.takeTurn();
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
});

const Game = (function() {
    const p1 = Player("Player 1", "X"); // let players choose these later
    const p2 = Player("Player 2", "O"); // let players choose these later

    function takeTurn() {
      
        console.log(p1.getName() + ' select a square: ');
        const move = prompt('Enter coordinates:');

        Gameboard.markBoard(move, p1);



    }

});

function Player(name, letter) {
    const name = name;
    const letter = letter;

    const getName = () => name;
    const getLetter = () => letter;

    return {getName, getLetter};
}

// AND BEGIN!

Game.takeTurn();