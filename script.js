const Gameboard = (function() {
    const board = Array(9).fill(0);

    const getBoard = () => {
        console.table(board);
    };

    const markBoard = (cell, player) => {
        board[cell] = player.getLetter();
    };

    return {getBoard, markBoard};
});

const Game = (function() {
    
});

function player(name, letter) {
    const name = name;
    const letter = letter;

    const getName = () => name;
    const getLetter = () => letter;

    return {getName, getLetter};
}