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
    }
    this.get = function (row, column) {
        return document.getElementById(row + '_' + column).textContent

    }
    this.checkIfAnyWin = function () {
        for (let row = 1; row <= 3; row++) {
            this.checkHorizontalRow(row, playerOne)
        }
       this.checkHorizontalRow(1, playerTwo)
    }

    this.checkHorizontalRow = function (row, player) {
        if(this.get(row, 1) === player &&
            this.get(row, 2) === player &&
            this.get(row, 3) === player) {
            this.setHorizontalRowWin(row)
            this.win(player)
        }
    }

    this.checkfirstRow = function () {
        console.log('11: ' + this.get(1, 1) + ' 12: ' + this.get(1, 2) + ' 13: ' + this.get(1, 3))
        console.log('21: ' + this.get(2, 1) + ' 22: ' + this.get(2, 2) + ' 23: ' + this.get(2, 3))
        console.log('31: ' + this.get(3, 1) + ' 32: ' + this.get(3, 2) + ' 33: ' + this.get(3, 3))
        const player = '\u2716'
                if (this.get(1, 1) === player && this.get(1, 2) === player && this.get(1, 3) === player) {
                if (this.get(2, 1) === player && this.get(2, 2) === player && this.get(2, 3) === player) {
                if (this.get(3, 1) === player && this.get(3, 2) === player && this.get(3, 3) === player) {
                }
                this.win(player, 1, 2, 3)
                }

       }
    }

    this.choose = function (event, element) {
        const position = element.id.split('_')
        console.log("Row: " + position[0] + " Column: " + position[1])
        if (event.ctrlKey) {
            element.innerText = playerOne
        } else {
            element.innerText = playerTwo
        }
        this.checkIfAnyWin()
    }


}