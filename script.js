let boxes = document.querySelectorAll(".box");
let headerText = document.querySelector(".header-text");
let resetBtn = document.querySelector("#reset-btn")
const areas = [null, null, null, null, null, null, null, null, null];

const O_text = "O";
const X_text = "X";
let currentPlayer = O_text;
let count = 0;

const winningConditionPattern = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
let winBoxIds = [];

let playGame = () => {
    boxes.forEach((box) => {
        box.addEventListener("click", (e) => {
            e.preventDefault();
            handleClick(e);
        });
    });
};
resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.reload()
})

function handleClick(e) {
    const id = e.target.id;
    if (!areas[id]) {
        areas[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        e.target.classList.add("disable");
        if (hasPlayerWon()) {
            headerText.innerText = `${currentPlayer} Won!`;
        } else {
            currentPlayer = currentPlayer === O_text ? X_text : O_text;
            if (currentPlayer === X_text) {
                setTimeout(() => {
                    tryToWinOrDraw();
                }, 500)

            }
        }
        count = 0;
        boxes.forEach((val) => {
            if (val.innerText == X_text || val.innerText == O_text) {
                count++;
            }

        })
        if (count == 9 && !hasPlayerWon()) {
            headerText.innerText = `it is a Draw 👇 Reset Game`;
        }



        console.log(areas);
    }




}

function hasPlayerWon() {
    for (let pattern of winningConditionPattern) {
        let posVal1 = areas[pattern[0]];
        let posVal2 = areas[pattern[1]];
        let posVal3 = areas[pattern[2]];
        if (posVal1 != null && posVal1 === posVal2 && posVal1 === posVal3) {
            console.log("won");
            headerText.innerText = `${posVal1} Won!`;
            return true;
        }
    }
    return false;
}

let tryToWinOrDraw = () => {
    for (let pattern of winningConditionPattern) {
        let [a, b, c] = pattern;

        if (areas[a] === X_text && areas[b] === X_text && !areas[c]) {
            areas[c] = X_text;
            boxes[c].innerText = X_text;
            boxes[c].classList.add("disable");
            if (hasPlayerWon()) {
                headerText.innerText = `${X_text} Won!`;
                winBoxIds = [a, b, c]
                bgColourChange(winBoxIds)
            }
            currentPlayer = O_text;
            return;
        }
        if (areas[a] === X_text && areas[c] === X_text && !areas[b]) {
            areas[b] = X_text;
            boxes[b].innerText = X_text;
            boxes[b].classList.add("disable");
            if (hasPlayerWon()) {
                headerText.innerText = `${X_text} Won!`;
                winBoxIds = [a, b, c]
                bgColourChange(winBoxIds)
            }
            currentPlayer = O_text;
            return;
        }
        if (areas[b] === X_text && areas[c] === X_text && !areas[a]) {
            areas[a] = X_text;
            boxes[a].innerText = X_text;
            boxes[a].classList.add("disable");
            if (hasPlayerWon()) {
                headerText.innerText = `${X_text} Won!`;
                winBoxIds = [a, b, c]
                bgColourChange(winBoxIds)
            }
            currentPlayer = O_text;
            return;
        }

    }

    for (let pattern of winningConditionPattern) {
        let [a, b, c] = pattern;
        let middle = 4;
        if (areas[middle] === null) {
            areas[middle] = X_text;
            boxes[middle].innerText = X_text;
            boxes[middle].classList.add("disable");
            if (hasPlayerWon()) {
                headerText.innerText = `${X_text} Won!`;
                winBoxIds = [a, b, c]
                bgColourChange(winBoxIds)
            }
            currentPlayer = O_text;
            return;
        }

        if (areas[a] === O_text && areas[b] === O_text && !areas[c]) {
            areas[c] = X_text;
            boxes[c].innerText = X_text;
            boxes[c].classList.add("disable");
            if (hasPlayerWon()) {
                headerText.innerText = `${X_text} Won!`;
                winBoxIds = [a, b, c]
                bgColourChange(winBoxIds)
            }
            currentPlayer = O_text;
            return;
        }
        if (areas[a] === O_text && areas[c] === O_text && !areas[b]) {
            areas[b] = X_text;
            boxes[b].innerText = X_text;
            boxes[b].classList.add("disable");
            if (hasPlayerWon()) {

                headerText.innerText = `${X_text} Won!`;
                winBoxIds = [a, b, c]
                bgColourChange(winBoxIds)
            }
            currentPlayer = O_text;
            return;
        }
        if (areas[b] === O_text && areas[c] === O_text && !areas[a]) {
            areas[a] = X_text;
            boxes[a].innerText = X_text;
            boxes[a].classList.add("disable");
            if (hasPlayerWon()) {
                headerText.innerText = `${X_text} Won!`;
                winBoxIds = [a, b, c]
                bgColourChange(winBoxIds)
            }
            currentPlayer = O_text;
            return;
        }
    }

    let emptyIndices = areas.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
    if (emptyIndices.length > 0) {
        let index = emptyIndices[0];
        areas[index] = X_text;
        boxes[index].innerText = X_text;
        boxes[index].classList.add("disable");
        if (hasPlayerWon()) {
            headerText.innerText = `${X_text} Won!`;
        }
        currentPlayer = O_text;
    }


};
function bgColourChange(winBoxIds) {
    winBoxIds.forEach((val) => {
        boxes[val].style.background = "lightgreen"
    });

}

playGame();
