let player = {
    name: "Catherine",
    chips: 100
};

let cards = [];
let sum = " ";
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let startBtn = document.getElementById("btn");
let newBtn = document.getElementById("new-btn");

let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;


//To return a random number between 1 and 13
function getRandomCard() {
    let randomNumber = Math.floor(Math.random()*13) + 1;
    if(randomNumber > 10) {
        return 10;
    } else if(randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
} 

function renderGame() {
    cardsEl.textContent = "Cards: " 
     
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    };

    sumEl.textContent = "Sum: " + sum;
    
    if (sum <= 20 && player.chips !== 0) {
        message = "Do you want to draw a new card?";
        newBtn.disabled = false;
        newBtn.style.background = "burlywood";
    } else if (sum === 21) {
        message = "You've got a Blackjack";
        isAlive = true;
        hasBlackJack = true;
        player.chips = player.chips + 20;
        playerEl.textContent = player.name + ": $" + player.chips + ".";
        let showMessage = " You just won $20";
        playerEl.textContent += showMessage;
        alert(showMessage);
        newBtn.disabled = true;
        newBtn.style.background = "grey";
    } else if(sum > 21 && player.chips > 0) {
        message = "You're out of the game";
        isAlive = false;
        player.chips = player.chips - 10;
        playerEl.textContent = player.name + ": $" + player.chips + ".";
        let showMessage = " You just lost $10";
        playerEl.textContent += showMessage;
        alert(showMessage);
        newBtn.disabled = true;
        newBtn.style.background = "grey";
    };
    messageEl.textContent = message;

    if (player.chips === 0) {
        startBtn.disabled = true;
        newBtn.disabled = true;
        message = " You've exhausted your money"
        alert(message);
        startBtn.style.background = "grey";
        newBtn.style.background= "grey";
        playerEl.textContent = player.name + ": $" + player.chips + ".";
        playerEl.textContent += message;
    }
};

function newCard() {
    if(isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
    sum += card;
    cards.push(card);
    } else if(isAlive === true && hasBlackJack === true) {
        let card = getRandomCard();
    sum += card;
    cards.push(card);
    };
    renderGame();
};  
