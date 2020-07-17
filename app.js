let playerScore = [0,0];
let currentScore = 0;
let activePlayer = 1;
let previousScore = 0;
let maxScore = 100;


function initNewGame(){
    playerScore = [0,0];
    currentScore = 0;
    activePlayer = 1;
    previousScore = 0;
    document.querySelector("#current-1").textContent = 0;
    document.querySelector("#current-2").textContent = 0;
    document.querySelector("#global-1").textContent = 0;
    document.querySelector("#global-2").textContent = 0;
    document.querySelector("#player-1").classList.add("active");
    document.querySelector("#player-2").classList.remove("active");
    document.querySelector(".roledice").disabled = false;
    document.querySelector(".hold").disabled = false
}

function animateDice(){
    let numberOfRolls = 0;
    let imgElem = document.querySelector(".diceImg");
    imgElem.style.display = "none";
    let randomNum = 0;
    document.querySelector(".roledice").disabled = true;
    let diceInterval = setInterval(function(){
        numberOfRolls++;
        if(numberOfRolls == 20){
            clearInterval(diceInterval);
            diceRolled(randomNum,imgElem);
        }else{
            randomNum = Math.floor(Math.random() * 6 + 1);
            imgElem.src = "resources/images/dice-" + randomNum +".png";
            imgElem.style.display = "block";
        }
    },50)
}

function diceRolled(randomNum,imgElem){
    if(randomNum == 1 || (previousScore == 6 && randomNum == 6)){
        document.querySelector(".roledice").disabled = true;
        document.querySelector(".lostChance").classList.add("animateLostChance");
        setTimeout(function(){
            document.querySelector(".roledice").disabled = false;
            if(previousScore == randomNum == 6){
                playerScore[activePlayer-1] = 0;
            }

            changePlayer();
            imgElem.style.display = "none";
        },2000)
    }else{
        document.querySelector(".roledice").disabled = false;
        previousScore = randomNum;
        currentScore += randomNum;
        document.querySelector("#current-"+activePlayer).textContent = currentScore;
    }
}
function onHold(){
    playerScore[activePlayer-1] = playerScore[activePlayer-1] + currentScore;
    document.querySelector("#global-"+activePlayer).textContent = playerScore[activePlayer-1];
    if(playerScore[activePlayer-1] > maxScore){
            document.querySelector("#player-" +activePlayer+ " .playerName").textContent = "Winner!";
            document.querySelector(".roledice").disabled = true;
            document.querySelector(".hold").disabled = true
    }else{
        changePlayer();
    }
}

function changePlayer(){
    document.querySelector(".lostChance").classList.remove("animateLostChance");
    previousScore = 0;
    document.querySelector("#current-"+activePlayer).textContent = 0;
    document.querySelector("#player-"+activePlayer).classList.toggle("active");
    activePlayer = activePlayer == 1 ? 2 : 1;
    document.querySelector("#player-"+activePlayer).classList.toggle("active");
    currentScore = 0;
}