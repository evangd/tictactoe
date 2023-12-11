const Gameboard = (function() {
    const board = Array(9).fill(' ');

    const markBoard = () => {
        const cells = document.querySelectorAll('#gameboard button');
        for (let i = 0; i < cells.length; ++i) {
            cells[i].textContent = board[i];
        }
    };

    const wipeBoard = () => {
        board.fill(' ');
    }

    const takeTurn = (cell, player) => {
        board[cell] = player.getLetter();
        markBoard();
        return checkResult(cell, player);
    };

    function checkResult(cell, player) {
        if (checkRow(cell) || checkCol(cell) || checkDiag(cell)) {
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
        console.log(cell);
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

    function checkDiag(cell) {
        switch (cell) {
            case 0:
                return (board[cell] === board[4] && board[cell] === board[8]) ? true : false;
            case 2:
                return (board[cell] === board[4] && board[cell] === board[6]) ? true : false;
            case 4:
                return (board[cell] === board[0] && board[cell] === board[8])
                 || (board[cell] === board[6] && board[cell] === board[2]) ? true : false;
            case 6:
                return board[cell] === board[4] && board[cell] === board[2] ? true : false;
            case 8:
                return board[cell] === board[4] && board[cell] === board[0] ? true : false;
        }
    }

    function checkTie() {
        for (let i = 0; i < board.length; ++i) {
            if (board[i] !== 'X' && board[i] !== 'O') return false;
        }

        return true;
    }

    return {markBoard, wipeBoard, takeTurn, checkTie};
})();

const Game = (function() {
    const p1 = Player("Player 1", "X"); // let players choose these later
    const p2 = Player("Player 2", "O"); // let players choose these later
    const p1Turn = document.querySelector('.turn.p1');
    const p2Turn = document.querySelector('.turn.p2');

    const playRound = () => {

        let waitForClick = new Promise(addClicks);

        waitForClick.then((result) => {
            
            if (!Gameboard.takeTurn(result, p1)) {
                p1Turn.style.visibility = 'hidden';
                p2Turn.style.visibility = 'visible';

                if (Gameboard.checkTie()) {
                    declareWinner('tie');
                }

                let waitForClick2 = new Promise(addClicks);
        
                waitForClick2.then((result2) => {
                    if (!Gameboard.takeTurn(result2, p2)) {
                        p1Turn.style.visibility = 'visible';
                        p2Turn.style.visibility = 'hidden';
                        playRound();
                    } else {
                        declareWinner(p2);
                    }
                });

            } else {
                declareWinner(p1);
            }
        });
    };

    function addClicks(resolve, reject) {
        const squares = document.querySelectorAll('button');
        for (let i = 0; i < squares.length; ++i) {
            if (squares[i].textContent === ' ') {
                squares[i].addEventListener('click', function(e) {
                    resolve(Number(e.target.dataset.coord));
                });
            }
        }
    }

    function declareWinner(player) {
        const banner = document.querySelector('dialog.banner');
        const message = banner.querySelector('h2');
        const playAgain = document.querySelector('.banner button');

        p1Turn.style.visibility = 'hidden';
        p2Turn.style.visibility = 'hidden';

        if (player === 'tie') {
            message.textContent = 'Tie game!';
        } else {
            message.textContent = player.getName() + ' wins!';
        }
        
        banner.showModal();

        playAgain.addEventListener('click', function() {
            Gameboard.wipeBoard();
            Gameboard.markBoard();
            banner.close();
            p1Turn.style.visibility = 'visible';
            playRound();
        });
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