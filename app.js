let gameSeq=[];
let userSeq=[];
let highest=0;
let highestscore=0;
let btns=["red","yellow","green","purple"];
let started=false;
let level=0;

let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;
        levelup();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randbtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx){
    
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelup,1000);
        }
    }
    else{
        
        h2.innerHTML=`Game over! Your score was <b> ${level} </b> <br> Press any key to start.`

        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        let h3 = document.createElement("h3");
        if(level>highest){
            highest=level;
            highestscore=Math.max(highest,level);
        }
        h3.innerText=`Highest Score:${highestscore}`;
        h2.append(h3);

        reset();
    }
}


function btnPress(){
    let btn=this;
    userFlash(btn);
    let userclr=btn.getAttribute("id");
    console.log(userclr);
    userSeq.push(userclr);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}