let game = {
    techs: [
        "bootstrap",
        "node",
        "javascript",
        "html",
        "css",
        "react",
        "mongo",
        "jquery",
        "firebase",
        "electron"
    ],

    lockeMode: false,
    firstCard : null,
    secondCard : null,
    cards: null,

    setCards: function(id){ 
        let card = this.cards.filter(card => card.id === id)[0];

        if(this.lockeMode || card.flipped){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true,
            this.lockeMode = true;
            return true
        }

    },
    
    checkMatch: function(){
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.lockeMode = false,
        this.firstCard = null,
        this.secondCard = null
    },

    unFlipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.lockeMode = false;
        this.clearCards();
    },

    checkGameOver: function(){
       return this.cards.filter(card => !card.flipped).length == 0;
    },

    createCardsFromTechs: function(){
        this.cards = [];
    
        this.techs.forEach((tech)=>{
            this.cards.push(this.createPairFromTechs(tech))
        })
        //console.log(cards);//Eu quem deixei esse aqui para usar como comparação
        this.cards = this.cards.flatMap(pair=>pair);//O flatmap desmembra os arrays e transforma cada item em um array isolado
        this.shuffleCards();
        return this.cards;
    },
    
    createPairFromTechs: function(tech){
        return [{
            id: this.createWidthCard(tech),
            icon: tech,
            flipped: false
        },
        {
            id: this.createWidthCard(tech),
            icon: tech,
            flipped: false 
        }]
    },
    
    createWidthCard: function (tech){
        return tech + parseInt(Math.random()*1000)
    },

    shuffleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while( currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]]= [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
} 