let ticTacToe;
if (typeof window != "undefined") {
    window.onload = function () {
        const gridContainer = document.getElementById("tic-tac-toe-grid-container");
        // Initialize Empty grid
        ticTacToe = new TicTacToe(gridContainer);
    };
}
function TicTacToe(grid) {
    this.container = grid
    this.win = function (player, row) {
        document.getElementById("result").innerText = player + ' win'
        this.setCellWin(1,1)
        this.setCellWin(1,2)
        this.setCellWin(1,3)
    }
    this.setCellWin = function (row, column) {
        const element = document.getElementById(row + '_' + column)
        element.setAttribute('class', element.className + ' win')
    }

    this.get = function (row, column) {
        return document.getElementById(row + '_' + column).textContent

    }
    this.checkIfAnyWin = function () {
        this.checkfirstRow()

    }
    this.checkfirstRow = function () {
        console.log('11: ' + this.get(1, 1) + ' 12: ' + this.get(1, 2) + ' 13: ' + this.get(1, 3))
        const player = 'X'
       if (this.get(1, 1) === player && this.get(1, 2) === player && this.get(1, 3) === player) {
           this.win(player, 1)
       }
    }

    this.choose = function (event, element) {
        const position = element.id.split('_')
        console.log("Row: " + position[0] + " Column: " + position[1])
        if (event.ctrlKey) {
            element.innerText = "0"
        } else {
            element.innerText = "X"
        }
        this.checkIfAnyWin()
    }


}