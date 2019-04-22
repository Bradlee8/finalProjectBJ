class Deck {
    constructor() {
        this.cards = [];
        this.deck = [];
        for (let i = 0; i < 52; i++) {
            this.cards.push(i);
        }
        this.card = 0;
    }

    shuffle() {
        let m = this.deck.length, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
        }
        console.log(this.deck);
    }

    getDeck() {
        let suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        let values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
        for (let r = 0; r < suits.length; r++) {
            for (let x = 0; x < values.length; x++) {
                let pointValue = parseInt(values[x]);
                if (values[x] === 'Jack' || values[x] === 'Queen' || values[x] === 'King')
                    pointValue = 10;
                if (values[x] === 'Ace')
                    pointValue = 11;
                let deckCard = {Value: values[x], Suit: suits[r], PointValue: pointValue};
                this.deck.push(deckCard);
            }
        }
        deck.addCardFace();
    }
    addCardFace() {
                let cardFace = ["AH.jpg", "2H.jpg", "3H.jpg", "4H.jpg", "5H.jpg", "6H.jpg", "7H.jpg", "8H.jpg",
                    "9H.jpg", "10H.jpg", "JH.jpg", "QH.jpg", "KH.jpg", "AS.jpg", "2S.jpg", "3S.jpg",
                    "4S.jpg", "5S.jpg", "6S.jpg", "7S.jpg", "8S.jpg", "9S.jpg", "10S.jpg", "JS.jpg",
                    "QS.jpg", "KS.jpg", "AC.jpg", "2C.jpg", "3C.jpg", "4C.jpg", "5C.jpg", "6C.jpg",
                    "7C.jpg", "8C.jpg", "9C.jpg", "10C.jpg", "JC.jpg", "QC.jpg", "KC.jpg", "AD.jpg",
                    "2D.jpg", "3D.jpg", "4D.jpg", "5D.jpg", "6D.jpg", "7D.jpg", "8D.jpg", "9D.jpg",
                    "10D.jpg", "JD.jpg", "QD.jpg", "KD.jpg"];
                let count = 0;
                for (let k = 0; k < this.deck.length; k++) {
                    this.deck[k].Card = cardFace[count];
                    count++;
                }
                console.log(this.deck);
            }
    shuttle() {
        var xhttp = new XMLHttpRequest();
        var that = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                that.card = this.responseText;
                var JSONobject = JSON.parse(this.responseText);
                var id = JSONobject.id;
                var player = JSONobject.p;
                // document.getElementById('ajaxResult').innerHTML = that.card;
                document.getElementById('ajaxResult').innerHTML = id;
                document.getElementById('ajaxResult').innerHTML += player;
            }
        }
        xhttp.open("GET", "/ajax", true);
        xhttp.send();
    }

}
    window.onload = function () {
        deck.getDeck();
        deck.shuffle();
        //console.log(deck.card);
    };
    let deck = new Deck();


