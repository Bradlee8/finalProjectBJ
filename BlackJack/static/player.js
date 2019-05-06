       class Player {
            constructor() {
                this.name = "{{ name}}";
                this.bank = "{{ bank}}";
                this.playerHand = [];
                this.playerHandValue = 0;
                this.totalBet = 0;
                this.splitBet = 0;
                this.second = [];
                this.secondHandValue = 0;
                this.goSplit = false;
                this.firstHandLock = "off";
                this.betLock = "on";
            }

            getPlayerCards() {
                for (let z = 0; z < this.playerHand.length; z++) {
                    let x = document.getElementById(z + 5);
                    x.src = this.playerHand[z].Card;
                }
            }

            pushPlayerCard() {
                this.playerHandValue += deck.getValue();
                this.playerHand.push(deck.deck.pop());
            }

            hit() {
                if (this.playerHand[1] != null && this.playerHandValue < 21 && this.firstHandLock === "off") {
                    this.pushPlayerCard();
                    console.log(this.playerHand);
                    console.log("player hand value ", this.playerHandValue);
                    this.aceToOne();
                    this.getPlayerCards();
                    deck.checkPoints();
                    deck.updateMSG();
                }
            }

            stay() {
                if (this.playerHand[1] != null && this.firstHandLock === "off") {
                    deck.dealerPlay();
                }
            }

            getLoan() {
                this.bank = 500;
                deck.updateBank();
            }

            checkBankrupt() {
                if (this.bank < 26) {
                    setTimeout(function () {
                        window.confirm("You are Broke!\nWant a loan?");
                        player.getLoan();
                        deck.updateMSG();
                    }, 1000);
                }
            }

            bet() {
                if (this.playerHandValue === 0 && this.bank > 26) {
                    this.betLock = "off";
                    this.resetMessage();
                    this.resetPlayerSecond();
                    this.resetCards();
                    console.log(this.bank);
                    let bet = 50;
                    this.totalBet += 50;
                    this.bank = this.bank - bet;
                    console.log("player bet 50 ", this.bank);
                    deck.pot += 50;
                    deck.updateMSG();
                }
            }

            aceOneToEleven() {
                if (this.playerHand[0].PointValue === 1) {
                    this.playerHand[0].PointValue = 11;
                    this.playerHandValue += 10;
                }
            }

            split() {
                if (this.playerHand[0].Value === this.playerHand[1].Value && this.bank >= this.totalBet) {
                    deck.updateMSG();
                    this.playerHandValue -= this.playerHand[1].PointValue;
                    this.second.push(this.playerHand[1]);
                    this.secondHandValue = this.second[0].PointValue;
                    this.playerHand.pop();
                    this.pushPlayerCard();
                    this.aceOneToEleven();
                    this.getPlayerCards();
                    let text = " Must play Second Hand First ";
                    let u = document.getElementById("winner");
                    u.innerHTML = "<h1>" + text.fontcolor("white") + "</h1>";
                    this.bank -= this.totalBet;
                    deck.updateMSG();
                    this.firstHandLock = "on";
                    this.pushSecondHand();
                    this.displaySecondHand();
                    this.aceToOne();
                    this.checkSplitPoints();
                    this.goSplit = true;
                    console.log("total bet" + this.totalBet);
                    this.splitBet = this.totalBet;
                    console.log("split bet" + this.splitBet);
                    this.updateSecondHandMessage();
                }
            }

            updateSecondHandMessage() {
                let t = document.getElementById("player2nd");
                t.innerHTML = "2nd Hand Value: " + this.secondHandValue + "  Bet: " + this.splitBet;
            }

            displaySecondHand() {
                for (let z = 0; z < this.second.length; z++) {
                    let x = document.getElementById(z + 10);
                    x.src = this.second[z].Card;
                }
            }

            pushSecondHand() {
                this.secondHandValue += deck.getValue();
                this.second.push(deck.deck.pop());
            }

            splitHit() {
                if (this.goSplit === true) {
                    this.pushSecondHand();
                    console.log("3 SEcond hand value " + this.secondHandValue);
                    this.displaySecondHand();
                    console.log("second " + this.secondHandValue);
                    this.aceToOne();
                    this.updateSecondHandMessage();
                    this.checkSplitPoints();
                }
            }

            firstHand() {
                this.firstHandLock = "off";
                let text = "Now play First Hand";
                let y = document.getElementById("winner");
                y.innerHTML = "<h1>" + text.fontcolor("white") + "</h1>";
                deck.checkPoints();
                this.resetPlayerSecond();
            }

            staySecond() {
                if (this.goSplit === true) {
                    this.goSplit = false;
                    this.firstHandLock = "off";
                    this.firstHand();
                    this.secondHandMessage("Stayed");
                }
            }

            secondHandMessage(x) {
                let text = x;
                let q = document.getElementById("player2nd");
                q.innerHTML = "<h3>" + text.fontcolor("red") + "</h3>";
            }

            checkSplitPoints() {
                if (this.secondHandValue > 21) {
                    this.secondHandMessage("-BUSTED-");
                    console.log("Second Hand Busts");
                    this.firstHand();

                }
                if (this.secondHandValue === 21) {
                    this.firstHand();
                    this.secondHandMessage("BLACKJACK !");
                }
                if (this.secondHandValue < 22 && this.second[4] != null) {
                    this.secondHandValue = 21;
                    console.log("five card charlie");
                    this.secondHandMessage("Five Card Charlie - BlackJack! ");
                    this.firstHand();
                }

            }

            doubleDown() {
                if (this.playerHand.length === 2 && this.bank >= this.totalBet &&
                    9 <= this.playerHandValue && this.playerHandValue <= 11) {
                    console.log("first " + this.bank);
                    console.log("second " + this.bank);
                    console.log("thisbet " + this.totalBet);
                    this.bank -= this.totalBet;
                    console.log("thisbet " + this.totalBet);
                    console.log("third " + this.bank);
                    this.totalBet = this.totalBet * 2;
                    console.log("thisbet " + this.totalBet);
                    console.log("forth " + this.bank);
                    console.log("player hand value" + this.playerHandValue);
                    this.hit();
                    console.log("player hand value" + this.playerHandValue);
                    let img = document.getElementById(7);
                    img.setAttribute('style', 'transform:rotate(90deg)');
                    deck.dealerPlay();
                }
            }

            aceToOne() {
                if (this.playerHandValue > 21) {
                    let count = 0;
                    while (count < this.playerHand.length) {
                        if (this.playerHand[count].PointValue === 11) {
                            this.playerHand[count].PointValue = 1;
                            this.playerHandValue -= 10;
                            count = 5;
                            console.log("switch to " + this.playerHandValue);
                            console.log("hand length " + player.playerHand.length);
                        }
                        count++;
                    }
                }

                if (this.secondHandValue > 21) {
                    let count = 0;
                    while (count < this.second.length) {
                        if (this.second[count].PointValue === 11) {
                            this.second[count].PointValue = 1;
                            this.secondHandValue -= 10;
                            count = 5;
                            console.log("switch to " + this.secondHandValue);
                            console.log("hand 2 length " + player.second.length);
                        }
                        count++;
                    }
                }
            }

            resetMessage() {
                let r = document.getElementById("result");
                r.innerHTML = "";
                let t = document.getElementById("secondResult");
                t.innerHTML = "";
                let x = document.getElementById("winner");
                x.innerHTML = "";
            }

            resetPlayerSecond() {
                let i = document.getElementById("player2nd");
                i.innerHTML = "";
            }

            resetCards() {
                for (let z = 0; z < 15; z++) {
                    let x = document.getElementById(z);
                    x.src = "/static/cards/blank.jpg";
                }
            }
        }

        class Deck {
            constructor() {
                this.dealerHand = [];
                this.deck = [];
                this.pot = 0;
                this.splitTestLock = false;
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
                let cardFace = ["AH.jpg", "2H.jpg", "3H.jpg", "4H.jpg", "5H.jpg", "6H.jpg", "7H.jpg", "8H.jpg",
                    "9H.jpg", "10H.jpg", "JH.jpg", "QH.jpg", "KH.jpg", "AS.jpg", "2S.jpg", "3S.jpg",
                    "4S.jpg", "5S.jpg", "6S.jpg", "7S.jpg", "8S.jpg", "9S.jpg", "10S.jpg", "JS.jpg",
                    "QS.jpg", "KS.jpg", "AC.jpg", "2C.jpg", "3C.jpg", "4C.jpg", "5C.jpg", "6C.jpg",
                    "7C.jpg", "8C.jpg", "9C.jpg", "10C.jpg", "JC.jpg", "QC.jpg", "KC.jpg", "AD.jpg",
                    "2D.jpg", "3D.jpg", "4D.jpg", "5D.jpg", "6D.jpg", "7D.jpg", "8D.jpg", "9D.jpg",
                    "10D.jpg", "JD.jpg", "QD.jpg", "KD.jpg",];
                let count = 0;
                for (let k = 0; k < this.deck.length; k++) {
                    this.deck[k].Card = "/static/cards/" + cardFace[count];
                    count++;
                }
            }

            shuffle() {
                let m = this.deck.length, i;
                while (m) {
                    i = Math.floor(Math.random() * m--);
                    [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
                }
            }

            updateBank() {
                var xhttp = new XMLHttpRequest();
                var bank = player.bank;
                var name = player.name;
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                    }
                };
                xhttp.open("GET", "/updateBank/" + name + "/" + bank, true);
                xhttp.send();
            }


            testSplitAces() {
                this.splitTestLock = true;
                for (let k = 0; k < this.deck.length; k++) {
                    let count = 0;
                    for (let l = 0; l < this.deck.length - count; l++) {
                        if (this.deck[l].PointValue === 11 && count < 5) {
                            let tmp = this.deck[l];
                            this.deck[l] = this.deck[51 - count];
                            this.deck[51 - count] = tmp;
                            count++;
                        }
                    }
                }
            }

            testDoubleDown() {
                for (let k = 0; k < this.deck.length; k++) {
                    let count = 0;
                    for (let l = 0; l < this.deck.length - count; l++) {
                        if (this.deck[l].PointValue === 5 && count < 5) {
                            let tmp = this.deck[l];
                            this.deck[l] = this.deck[51 - count];
                            this.deck[51 - count] = tmp;
                            count++;
                        }
                    }
                }

            }

            testBlackJack() {
                deck.testSplitAces();
                for (let k = 0; k < this.deck.length; k++) {
                    let count = 0;
                    for (let l = 0; l < this.deck.length - count; l++) {
                        if (this.deck[l].Value === "Jack" && count < 1) {
                            let tmp = this.deck[l];
                            this.deck[l] = this.deck[48];
                            this.deck[48] = tmp;
                            count++;
                        }
                    }
                }

            }


            deal() {
                if (player.playerHandValue === 0 && player.betLock === "off") {
                    if (this.splitTestLock === true) {
                        deck.testSplitAces();
                    }
                    let img = document.getElementById(7);
                    img.setAttribute('style', 'transform:rotate(0deg)');
                    this.dealerHandValue = this.getValue();
                    this.dealerHand.push(this.deck.pop());
                    player.playerHandValue = this.getValue();
                    player.playerHand.push(this.deck.pop());
                    this.pushDealerCards();
                    player.pushPlayerCard();
                    console.log("dealer Hand value", this.dealerHandValue);
                    console.log("player Hand value", player.playerHandValue);
                    deck.getDealerDeal();
                    player.getPlayerCards();
                    deck.dealerAceToOne(this.dealerHandValue);
                    player.aceToOne();
                    deck.checkPoints();
                    deck.updateMSG();
                }
            }

            updateMSG() {
                let x = document.getElementById("player");
                x.innerHTML = "Player: " + player.name + " Bank: " + player.bank;
                let z = document.getElementById("displayPlayer");
                z.innerHTML = "Hand Value:" + player.playerHandValue + " Bet: " + player.totalBet;
            }

            getDealerDeal() {
                let x = document.getElementById('0');
                x.src = this.dealerHand[0].Card;
                let d = document.getElementById('1');
                d.src = "/static/cards/Gray_back.jpg";
            }

            getDealerCards() {
                for (let z = 0; z < this.dealerHand.length; z++) {
                    let x = document.getElementById(z);
                    x.src = this.dealerHand[z].Card;
                }
            }

            pushDealerCards() {
                this.dealerHandValue += this.getValue();
                this.dealerHand.push(this.deck.pop());
            }

            dealerPlay() {
                while (this.dealerHandValue < 17) {
                    this.pushDealerCards();
                    console.log(this.dealerHand);
                    deck.dealerAceToOne(this.dealerHandValue);
                    if (this.dealerHandValue < 22 && this.dealerHand[4] != null) {
                        this.dealerHandValue = 21;
                        console.log("five card charlie - dealer");
                    }
                }
                deck.getDealerCards();
                deck.decideWinner(player);
            }

            lowCardShuffle() {
                var tmpDeck = new Deck();
                tmpDeck.shuffle();
                this.deck = tmpDeck.deck;
            }

            decideWinner(player) {
                let win = document.getElementById("winner");
                let results = document.getElementById("result");

                if (this.dealerHandValue === player.playerHandValue && this.dealerHandValue < 22) {
                    console.log("Push");
                    win.innerHTML = ("push with " + this.dealerHandValue);
                    results.innerHTML = ("push with " + player.playerHandValue);
                    player.bank += player.totalBet;
                }
                else if (this.dealerHandValue > 21 && player.playerHandValue < 21) {
                    player.bank += player.totalBet * 2;
                    console.log("dealer points: ", this.dealerHandValue);
                    win.innerHTML = ("Dealer Busts with " + this.dealerHandValue);
                    results.innerHTML = (" Player Wins With " + player.playerHandValue);
                    console.log("Dealer Busts");
                    console.log("Player wins");
                }
                else if (this.dealerHandValue > 21 && player.playerHandValue > 21) {
                    win.innerHTML = ("Dealer Busts with " + this.dealerHandValue);
                    results.innerHTML = ("Player busts with " + player.playerHandValue);
                    console.log("dealer points: ", this.dealerHandValue);
                    console.log("Dealer Busts");
                    console.log("Player Busts");
                }
                else if (player.playerHandValue > this.dealerHandValue && player.playerHandValue < 21) {
                    player.bank += player.totalBet * 2;
                    win.innerHTML = ("Dealer Has " + this.dealerHandValue);
                    results.innerHTML = ("Player Wins with " + player.playerHandValue);
                    console.log("player wins");
                }
                else if (this.dealerHandValue < 22 && player.playerHandValue > 21) {
                    win.innerHTML = ("Dealer Wins with " + this.dealerHandValue);
                    results.innerHTML = ("Player busts with " + player.playerHandValue);
                    console.log("dealer wins");
                }

                else if (player.playerHandValue === 21) {
                    player.bank += player.totalBet * 2.5;
                    win.innerHTML = ("Dealer has " + this.dealerHandValue);
                    results.innerHTML = ("BlackJack!");
                    console.log("Player has Blackjack");
                }
                else if (player.playerHandValue < this.dealerHandValue && this.dealerHandValue < 22) {
                    console.log("Dealer wins");
                    win.innerHTML = ("Dealer Wins with " + this.dealerHandValue);
                    results.innerHTML = ("Player loses with " + player.playerHandValue);
                }
                else {
                    console.log("UH OH")
                }

                if (player.secondHandValue === 0) {
                    deck.updateMSG();
                    deck.EOG();
                }
                else {
                    deck.decideSplitWinner(player);
                }
            }

            decideSplitWinner(player) {
                var win = document.getElementById("secondResult");

                if (this.dealerHandValue === player.secondHandValue && this.dealerHandValue < 22) {
                    console.log("Push");
                    win.innerHTML += (" push with " + player.secondHandValue);
                    player.bank += player.splitBet;
                }
                else if (this.dealerHandValue > 21 && player.secondHandValue < 21) {
                    player.bank += player.splitBet * 2;
                    console.log("dealer points: ", this.dealerHandValue);
                    win.innerHTML += (" 2nd Hand Wins with " + player.secondHandValue);
                    console.log("Dealer Busts");
                    console.log("Player wins");
                }
                else if (this.dealerHandValue > 21 && player.secondHandValue > 21) {
                    win.innerHTML += ("2nd Hand Busts with " + player.secondHandValue);
                    console.log("dealer points: ", this.dealerHandValue);
                    console.log("Dealer Busts");
                    console.log("Player Busts");
                }
                else if (player.secondHandValue > this.dealerHandValue && player.secondHandValue < 21) {
                    player.bank += player.splitBet * 2;
                    win.innerHTML += (" 2nd hand Wins with " + player.secondHandValue);
                    console.log("player wins");
                }
                else if (this.dealerHandValue < 22 && player.secondHandValue > 21) {
                    win.innerHTML += ("2nd Hand Loses with " + player.secondHandValue);
                    console.log("dealer wins");
                }

                else if (player.secondHandValue === 21) {
                    console.log("split bet" + player.splitBet);
                    player.bank += player.splitBet * 2.5;
                    win.innerHTML += (" 2nd Hand Wins with BlackJack");
                    console.log("2nd hand has Blackjack");
                }
                else if (player.secondHandValue < this.dealerHandValue && this.dealerHandValue < 22) {
                    console.log("Dealer wins");
                    win.innerHTML += ("2nd Hand Loses with " + player.secondHandValue);
                }
                else {
                    console.log("UH OH")
                }
                deck.updateMSG();
                deck.EOG();
            }


            getValue() {
                return this.deck[this.deck.length - 1].PointValue;
            }


            checkPoints() {
                if (player.playerHandValue > 21) {
                    deck.bust();
                    deck.dealerPlay();
                }
                if (player.playerHandValue === 21) {
                    //console.log("Blackjack");
                    deck.dealerPlay();
                }
                if (player.playerHandValue < 22 && player.playerHand[4] != null) {
                    player.playerHandValue = 21;
                    console.log("five card charlie");
                    deck.dealerPlay();
                }
            }

            dealerAceToOne(dealer) {
                if (dealer > 21) {
                    for (let t = 0; t < this.dealerHand.length; t++) {
                        if (this.dealerHand[t].PointValue === 11) {
                            this.dealerHand[t].PointValue = 1;
                            this.dealerHandValue -= 10;
                            console.log("switch dealer to " + this.dealerHandValue);
                        }
                    }
                }
            }

            bust() {
                console.log("Player Bust")
            }

            EOG() {
                this.updateBank();
                player.secondHandValue = 0;
                player.second = [];
                this.pot = 0;
                player.totalBet = 0;
                this.dealerHand = [];
                player.playerHand = [];
                this.dealerHandValue = 0;
                player.playerHandValue = 0;
                this.lowCardShuffle();
                player.checkBankrupt();
                player.secondHandMessage("*****Make Bet******");
                this.splitTestLock = false;
                player.betLock = "on";
            }
        }

        window.onload = function () {
            deck.shuffle();
            deck.updateMSG();
        };
        let deck = new Deck();
        let player = new Player();