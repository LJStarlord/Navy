var board = [];
var DisplayBoard = document.getElementById("board");
var keyPressed;

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


        await sleep(500);
    }



    if (row < 14) {

        var checker = 0;

        for (let i = 0; i < board[row].length; i++) {
            var element = board[row][i];
            var under = board[row + 1][i];

            if (!(under.getAttribute("class") === "checked square")) {
                element.setAttribute("class", "square");
            } else {
                checker++;
            }

        }
    }

    if (checker === 0) {
        return;
    }

    keyPressed = null;

    return game(row - 1);

}







game(14);