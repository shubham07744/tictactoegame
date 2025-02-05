let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn")
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

let turno = true; //playerX, playerO
let count = 0;

let winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = ()=>{
    turno = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("clicked box");
        if(turno){
            box.innerText = "O"
            turno = false;
        }else{
            box.innerText = "X"
            turno = true;
        }
        box.disabled = true; 
        count++;

        let isWinner =  checkWinner();
        if(count ===9 && !isWinner){
            gameDraw()
        }
       
    })
})

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const gameDraw = ()=>{
    msg.innerText = `Game was a Draw.`
    msgContainer.classList.remove("hide")
    disableBoxes();
}

const showWinner=(winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () =>{
    for(let patterns of winpatterns){
        let pos1val = boxes[patterns[0]].innerText
        let pos2val = boxes[patterns[1]].innerText
        let pos3val = boxes[patterns[2]].innerText

        if(pos1val != "" && pos2val != "" && pos3val !=""){
            if(pos1val == pos2val && pos2val == pos3val){
                // console.log("winner",pos1val)
                showWinner(pos1val);
                return true;
            }
        }
    }
}

newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);