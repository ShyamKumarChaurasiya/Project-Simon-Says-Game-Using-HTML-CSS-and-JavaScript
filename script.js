let gameseq = [];
let userseq = [];

let btns = ["yellow" , "red" , "purple" , "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress" , function() {
    if (started === false) {
        started = true;
        levelup();
    }
});


function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    } , 200);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    } , 200);
}


function levelup(){
    userseq = []; // Safely reset the sequence at the start of the level
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);

    btnFlash(randbtn);
}

function checkAns(){

    let idx = userseq.length - 1;

    if(userseq[idx] === gameseq[idx]){
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000); // Progress to the next level after 1 second
        }
    }else{
        let score = level > 0 ? 10 * (2 ** (level - 1)) : 0;
        h2.innerHTML = `Game Over! Your score was <b>${score}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "";
        }, 150);
        reset();
    }
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

function btnPress(){
    if (!started) return; // Prevent clicking buttons before the game starts

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click" , btnPress);
}
