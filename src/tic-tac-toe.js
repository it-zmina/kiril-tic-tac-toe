let ticTacToe;
const playerOne = '\u25EF'
const playerTwo = '\u2716'

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
        console.log(row + '_' + column)
        return document.getElementById(row + '_' + column).textContent
    }

    this.checkIfAnyWin = function () {
        for (let row = 1; row <= 3; row++) {
            this.checkHorizontalRow(row, playerOne)
        }
        for (let row = 1; row <= 3; row++) {
            this.checkHorizontalRow(row, playerTwo)
        }
        for (let column = 1; column <= 3; column++) {
            this.checkVerticalColumn(column, playerOne)
        }
        for (let column = 1; column <= 3; column++) {
            this.checkVerticalColumn(column, playerTwo)
        }
        this.checkRightDiagonal(playerOne)
        this.checkRightDiagonal(playerTwo)
        this.checkLeftDiagonal(playerOne)
        this.checkLeftDiagonal(playerTwo)
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
        }
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
        if (!this.isFinised) {
            const position = element.id.split('_')
            console.log("Row: " + position[0] + " Column: " + position[1])
            if (this.lastMove === playerTwo ) {
                element.innerText = playerOne
                this.lastMove = playerOne
            } else {
                element.innerText = playerTwo
                this.lastMove = playerTwo
            }
            this.checkIfAnyWin()
        }
    }


}