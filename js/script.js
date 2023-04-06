const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const FACE = "face";
const ICON = "icon";

startGame();

function startGame(){
    initializeCards(game.createCardsFromTechs());
}

function initializeCards (cards){
    let gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML="";

    game.cards.forEach(card=>{

       cardElement = document.createElement('div');
       cardElement.id = card.id;
       cardElement.classList.add(CARD)
       cardElement.dataset.icon = card.icon;

       createCardContent(card, cardElement);

       cardElement.addEventListener('click', flipCard);
       gameBoard.appendChild(cardElement);

     })
}

function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element){

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "../assets/images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML= "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

function flipCard (){
    
    if(game.setCards(this.id)){
        this.classList.add("flip");

        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementsByClassName("gameOver")[0];
                    gameOverLayer.style.display = 'flex';
                }
            }else{
                setTimeout(()=>{
                    let firstViewCard = document.getElementById(game.firstCard.id);
                    let secondViewCard = document.getElementById(game.secondCard.id);
    
                    firstViewCard.classList.remove("flip");
                    secondViewCard.classList.remove("flip");
    
                    game.unFlipCards();
    
                },500)
            }
        }
    }
}

function restart(){
    initializeCards();
    let gameOverLayer = document.getElementsByClassName("gameOver")[0];
    gameOverLayer.style.display = 'none';
}