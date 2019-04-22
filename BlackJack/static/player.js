class Player {
    constructor() {
        this.player = [];
        this.bank = [];
        this.playerCard = [];
        this.playerValue = [];
        this.playerHand = [];
        this.Value = [];

        //this.username = null;
        //this.bank = 0;
        //this.hand  = null;
    }
     getPlayerCards() {
                this.grab = this.deck.length - 1;
                this.playerCard.push(this.deck[this.grab].Card);
                console.log(this.player.length);
                for (let z = 0; z < this.player.length; z++) {
                    let x = document.getElementById(z);
                    x.src = this.player[z].Card;
                }
            }
            getPlayerValue() { //this function can be removed after testing
                var t = document.getElementById("player");
                this.search = this.deck.length - 1;
                this.playerValue.push(this.deck[this.search].Value);
                for (var i = 0; i < this.playerValue.length; i++) {
                    this.playerHand.push(this.playerValue[i]);
                }
                t.innerHTML = "Player: " + this.playerHand;
                this.playerHand = [];
            }

    getName(){
        var xhttp = new XMLHttpRequest();
        var that = this;
        xhttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                that.username = this.responseText;
                var JSONobject = JSON.parse(this.responseText);
                var id = JSONobject.id;
                var username = JSONobject.n;
                var bank = JSONobject.b;
                that.username = JSONobject.n;
                //document.getElementById('ajaxResult').innerHTML = that.name;
                document.getElementById('ajaxResult').innerHTML = "player #: " + id;
                document.getElementById('ajaxResult').innerHTML += " player username: " + username;
                document.getElementById('ajaxResult').innerHTML += " Player bank: " + bank;

            }
        };
        xhttp.open("GET", "/ajax", true);
        xhttp.send();
    }
    makeBet(pot){
        this.bank = this.bank - pot;
    }

    winPot(pot){
        this.bank = this.bank + pot;
    }


    makeBet(){
        var xhttp = new XMLHttpRequest();
        var that = this;
        xhttp.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                that.username = this.responseText;
                var JSONobject = JSON.parse(this.responseText);
                var id = JSONobject.id;
                var username = JSONobject.n;
                var bank = JSONobject.b;
                that.username = JSONobject.n;
                //document.getElementById('ajaxResult').innerHTML = that.name;
                document.getElementById('ajaxResult').innerHTML = "player #: " + id;
                document.getElementById('ajaxResult').innerHTML += " player username: " + username;
                document.getElementById('ajaxResult').innerHTML += " Player bank: " + bank;
                console.log(this.username);

            }
        };

        xhttp.open("GET", "/bet", true);
        xhttp.send();


    }
}

window.onload = function(){
    var player = new Player();
   // player.getName();
   // player.makeBet(50);
    console.log(player.username);
};

var player = new Player();


