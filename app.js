let gameseq=[];
let userseq=[];
let hscore=[];

let btns=["one","two","three","four"];

let started= false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress", function(){
    
    if(started==false){
        started=true;
        // console.log("game started");
        levelUp();
    }
});

function gameflash(box){
    box.classList.add("flash");
    setTimeout(function() {
        box.classList.remove("flash");

    },200);
}
function userflash(box){
    box.classList.add("userflash");
    setTimeout(function() {
        box.classList.remove("userflash");

    },200);
}
function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    //random btn choose
    let rnd=Math.floor(Math.random()*4);
    let randColor= btns[rnd];
    let rndbox=document.querySelector(`.${randColor}`);
    // console.log(rndbox);
    gameseq.push(randColor);
    // console.log(gameseq);
    gameflash(rndbox);
}

 function boxpress(){
    let box= this;
    userflash(box);
    usercolor=box.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor);
    checkans(userseq.length-1);
 }

 function checkans(idx){
    console.log("curr level :", level);

    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
            talk(level);
        }

    }else{
        h2.innerText=`GAME OVER, your score is ${level}  \n press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        highScore(level);
        reset();
    }
 }
 let allboxs=document.querySelectorAll(".box");
 for(box of allboxs){
    box.addEventListener("click", boxpress);
 }
 function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
 }
function highScore(level){
    hscore.push(level);
    
    max=0;
    for(i of hscore){
        if(max<i){
            max=i;
        }
    }
    if(max==level){
        let high=document.querySelector(".high");
        let p=document.createElement("p");
        p.innerText=max;
        high.appendChild(p);
    }
    
}
function talk(level){
    let talk=document.querySelector(".talk");
    let h2=document.createElement("h2");
    h2.innerText=`Congrates You Crossed the level ${level}`;
    
    talk.appendChild(h2);
    h2.classList.add("center");
    setTimeout(function(){
        talk.removeChild(h2);
    },2000);
    
}
