var board = [];
var DisplayBoard = document.getElementById("board");
var keyPressed;
var DisplayWins = document.getElementById("winningAlert");

for (let i = 0; i < 15; i++) {
    var holder = [];
    for (let j = 0; j < 7; j++) {
        holder[j] = "";
    }
    board[i] = holder;
}

console.log(board);


for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        var newSquare = document.createElement("div");
        newSquare.setAttribute("class", "square");
        DisplayBoard.appendChild(newSquare);
        board[i][j] = newSquare;
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var playing;

function check() {
    document.onkeydown = function(e) {
        e.stopPropagation();
        e.preventDefault();

        if (e.key === " ") {
            keyPressed = e.key;
        }

    }
}


var end = false;
async function game(row) {
    check();
    var counter = 0;

    while (!keyPressed) {

        if (counter > 2) {
            var square = board[row][counter - 3];
            square.setAttribute("class", "square");
        }
        if (counter === 0) {
            var square = board[row][3];
            square.setAttribute("class", "square");
            end = false;
        }

        if (counter === board[0].length) {

            end = true;
            counter = 4;
        }




        var square = board[row][counter];
        square.setAttribute("class", "checked square");



        if (end === true) {



            counter--;



            if (counter < 3) {
                var square = board[row][counter + 4];
                square.setAttribute("class", "square");
            }

        } else {

            counter++;
        }


        await sleep(125);
    }

    var checker = 1;
    var blocksUnder = 0;

    if (row < 14) {

        checker = 0;
        blocksUnder = 0;


        var index = 0;
        for (let i = 0; i < board[row].length; i++) {
            var element = board[row][i];

            if (element.getAttribute("class") === "checked square") {
                index = i;
                console.log(index);
                break;
            }

        }



        for (let i = 0; i < board[row].length; i++) {
            var element = board[row][i];
            var under = board[row + 1][i];

            if (!(under.getAttribute("class") === "checked square")) {
                element.setAttribute("class", "square");
            } else {
                blocksUnder++;
            }

        }

        for (let i = 0; i < 3; i++) {

            var element = board[row][index + i];
            var under = board[row + 1][index + i];

            if (under.getAttribute("class") === "square" && element.getAttribute("class") === "square") {
                checker++;
            }

        }



        var winningDiv = document.createElement("div");
        winningDiv.setAttribute("id", "winningBox");

        if (row == 5) {

            var text = document.createTextNode("You won a minor prize!");

            winningDiv.appendChild(text);
            DisplayWins.appendChild(winningDiv);
            await sleep(20)
        }

        function lost() {

            var text = document.createTextNode("You lost. Try again!");
            winningDiv.appendChild(text);
            DisplayWins.appendChild(winningDiv);
        }







        if (blocksUnder === 3) {
            if (checker >= blocksUnder) {
                console.log("finished");
                lost();
                return;
            }
        } else if (blocksUnder === 1) {
            if (checker === blocksUnder || checker === 3) {
                lost();
                console.log("finished");
                return;
            }

        } else if (checker >= (1 + blocksUnder)) {
            lost();
            console.log("finished");
            return;
        }

    }
    keyPressed = null;

    return game(row - 1);

}















game(14);