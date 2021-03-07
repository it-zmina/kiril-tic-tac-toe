// import _ from "lodash" // Import the entire lodash library

let ticTacToe;
const playerOne = '\u2716' // X
const playerTwo = '\u25EF' // O
const playerAi = playerTwo

if (typeof window != "undefined") {
    window.onload = function () {
        const gridContainer = document.getElementById("tic-tac-toe-grid-container");
        // Initialize Empty grid
        ticTacToe = new TicTacToe(gridContainer);
    };
}
function TicTacToe(grid) {
    this.container = grid
    this.isFinised = false;
    this.lastMove = playerTwo

    this.win = function (player) {
        document.getElementById("result").innerText = player + ' win'
    }
    this.setCellWin = function (row, column) {
        const element = document.getElementById(row + '_' + column)
        element.setAttribute('class', element.className + ' win')
    }
    this.setHorizontalRowWin = function (row) {
        this.setCellWin(row,1)
        this.setCellWin(row,2)
        this.setCellWin(row,3)

        this.isFinised = true
    }

    this.setVerticalColumnWin = function (column) {
        this.setCellWin(1, column)
        this.setCellWin(2, column)
        this.setCellWin(3, column)

        this.isFinised = true
    }

    this.get = function (row, column) {
        console.log('Get cell (' + row + '_' + column + ')')
        return document.getElementById(row + '_' + column).textContent
    }

    this.set = function (row, column, player) {
        console.log('Set cell (' + row + '_' + column + ') with ' + player)
        document.getElementById(row + '_' + column).innerText = player
    }

    this.checkIfAnyWin = function () {
        let isWin
        for (let row = 1; row <= 3; row++) {
            const isWin = this.checkHorizontalRow(row, playerOne)
            if (isWin) {
                return true;
            }
        }
        for (let row = 1; row <= 3; row++) {
            isWin = this.checkHorizontalRow(row, playerTwo)
            if (isWin) {
                return true;
            }
        }
        for (let column = 1; column <= 3; column++) {
            isWin = this.checkVerticalColumn(column, playerOne)
            if (isWin) {
                return true;
            }
        }
        for (let column = 1; column <= 3; column++) {
            isWin = this.checkVerticalColumn(column, playerTwo)
            if (isWin) {
                return true;
            }
        }
        isWin = this.checkRightDiagonal(playerOne)
        if (isWin) {
            return true;
        }
        isWin = this.checkRightDiagonal(playerTwo)
        if (isWin) {
            return true;
        }
        isWin = this.checkLeftDiagonal(playerOne)
        if (isWin) {
            return true;
        }
        isWin = this.checkLeftDiagonal(playerTwo)
        if (isWin) {
            return true;
        }
        return false;
    }

    this.checkRightDiagonal = function (player) {
        if(this.get(1, 3) === player &&
            this.get(2, 2) === player &&
            this.get(3, 1) === player) {

            this.setCellWin(1,3)
            this.setCellWin(2,2)
            this.setCellWin(3,1)
            this.win(player)

            this.isFinised = true
        }
    }
    this.checkLeftDiagonal = function (player) {
        if(this.get(1, 1) === player &&
            this.get(2, 2) === player &&
            this.get(3, 3) === player) {

            this.setCellWin(1,1)
            this.setCellWin(2,2)
            this.setCellWin(3,3)
            this.win(player)

            this.isFinised = true
        }
    }

    this.checkHorizontalRow = function (row, player) {
        if(this.get(row, 1) === player &&
            this.get(row, 2) === player &&
            this.get(row, 3) === player) {
            this.setHorizontalRowWin(row)
            this.win(player)

            return true
        }
        return false
    }

    this.checkVerticalColumn = function (column, player) {
        if(this.get(1, column) === player &&
            this.get(2, column) === player &&
            this.get( 3, column) === player) {
            this.setVerticalColumnWin(column)
            this.win(player)
        }
    }

    this.checkfirstRow = function () {
        console.log('11: ' + this.get(1, 1) + ' 12: ' + this.get(1, 2) + ' 13: ' + this.get(1, 3))
        console.log('21: ' + this.get(2, 1) + ' 22: ' + this.get(2, 2) + ' 23: ' + this.get(2, 3))
        console.log('31: ' + this.get(3, 1) + ' 32: ' + this.get(3, 2) + ' 33: ' + this.get(3, 3))

                if (this.get(1, 1) === player && this.get(1, 2) === player && this.get(1, 3) === player) {
                if (this.get(2, 1) === player && this.get(2, 2) === player && this.get(2, 3) === player) {
                 if (this.get(3, 1) === player && this.get(3, 2) === player && this.get(3, 3) === player) {
                }
                this.win(player, 1, 2)
                }

       }
    }

    this.choose = function (event, element) {

        if (!this.isFinised && !element.innerText) {
            const position = element.id.split('_')
            console.log("Row: " + position[0] + " Column: " + position[1])
            if (this.lastMove === playerTwo ) {
                element.innerText = playerOne
                this.lastMove = playerOne
            } else {
                element.innerText = playerTwo
                this.lastMove = playerTwo
            }
            const isWin = this.checkIfAnyWin()
            if (playerAi) {
                this.lastMove = playerAi
                this.aiMove()
            }
        }
    }

    this.getBoard = function () {
        let board = Array.from(Array(3), () => new Array(3))
        for (let r = 1; r <= 3; r++) {
            for (let c = 1; c <= 3; c++) {
                board[r - 1][c - 1] = this.get(r, c)
            }
        }
        return board
    }

    this.aiMove = function () {
        let board = this.getBoard()
        for (let r = 1; r <= 3; r++) {
            for (let c = 1; c <= 3; c++) {
                if (!board[r - 1][c - 1]) {
                    let nextBoard = _.cloneDeep(board)
                    nextBoard[r - 1][c - 1] = playerAi
                    let result = this.getScore(nextBoard)
                    if (!result) {
                        result = this.minMaxScore(nextBoard, playerOne === playerAi ? playerTwo : playerOne)
                    }
                    this.set(r, c, typeof result !== 'undefined' ? '"' + result + '"' : '"U"')
                    // if (result === 1) {
                    //
                    // }
                }
            }
        }
    }

    this.minMaxScore = function (board, player) {
        let result
        let undefinedCells = []
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === '' || board[r][c].startsWith('"')) {
                    let nextBoard = _.cloneDeep(board)
                    nextBoard[r][c] = player
                    let nextResult = this.getScore(nextBoard)
                    if (typeof nextResult === 'undefined') {
                        undefinedCells.push({ row: r, column: c })
                        continue
                    }
                    if (player !== playerAi) {
                        result = result ? Math.min(result, nextResult) : nextResult
                        if (result === -1) {
                            return -1
                        }
                    } else {
                        result = result ? Math.max(result, nextResult) : nextResult
                        if (result === 1) {
                            return 1
                        }
                    }
                }
            }
        }
        if (undefinedCells.length === 0) {
            return result
        }
        // TODO define all undefined
    }

    this.isWin = function (board, player) {
        if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
            return true
        }
        if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
            return true
        }
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
                return true
            }
        }
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
                return true
            }
        }
        return false;
    }

    this.getScore = function (board) {
        if (this.isWin(board, playerAi)) {
            return 1
        }
        if (this.isWin(board, playerAi)) {
            return -1
        }
        for (let r = 1; r <= 3; r++) {
            for (let c = 1; c <= 3; c++) {
                if (board[r - 1][c - 1] === '') {
                    return undefined
                }
            }
        }
        return 0;
    }
}