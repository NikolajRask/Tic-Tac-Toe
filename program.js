let figure = -1;

(function () {
    turn()
    document.addEventListener("click", function(event) {
        if (event.target.tagName === 'BUTTON') {
            if(event.target.id == "reload"){
                console.log("reload")
                restartGame()
                return
            }
            var buttonId = event.target.id;
            console.log("Button ID:", buttonId);
            changeBtn(buttonId)
            turn()
            checkOutcome()
        }
    });
})();

function changeBtn(id){
    let btn = document.getElementById(id)

    if(btn.innerHTML != ""){
        alert("Cannot change, spot is already taken")
        return
    }

    figure++;

    if(figure % 2 == 0){
        btn.innerHTML = "X"
        btn.style = "color: Blue;"
    }
    else{
        btn.innerHTML = "O"
        btn.style = "color: Red;"
    }
}

function checkOutcome(){
    const winCombinations = [
        ['A1', 'A2', 'A3'],
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3'],
        ['A1', 'B1', 'C1'],
        ['A2', 'B2', 'C2'],
        ['A3', 'B3', 'C3'],
        ['A1', 'B2', 'C3'],
        ['A3', 'B2', 'C1']
    ];

    let isTie = true;

    const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
        if (button.innerHTML === "") {
            isTie = false;
            break;
        }
    }

    if (isTie) {
        document.getElementById("turn").remove()
        const text = document.getElementById("winner");
        text.style = "font-size: 24px; font-weight: bold; color: #808080; text-transform: uppercase;"
        text.innerHTML = "It is a tie!";
        return; // Exit the function, no need to check for a winner
    }

    for (const combination of winCombinations){
        const [btn1, btn2, btn3] = combination;
        const element1 = document.getElementById(btn1);
        const element2 = document.getElementById(btn2);
        const element3 = document.getElementById(btn3);

        if (
            element1.innerHTML !== "" &&
            element1.innerHTML === element2.innerHTML &&
            element1.innerHTML === element3.innerHTML
        ) {
            document.getElementById("turn").remove()
            const winnerColor = element1.style.color;
            const text = document.getElementById("winner");
            text.innerHTML = winnerColor + " wins";
        }
    }
}

function turn(){
    let text = document.getElementById("turn")
    if(figure % 2 == 0){
        text.innerHTML = "Red turn"
        text.style = "color: red;"
    }
    else{
        text.innerHTML = "Blue turn"
        text.style = "color: blue;"
    }
}

function restartGame(){
    if(confirm("Are you sure you want to restart the game?")) {
        location.reload();
    }
}