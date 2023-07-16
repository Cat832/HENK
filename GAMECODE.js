//Canvas definition:

const Boards = document.querySelectorAll("canvas");
var canvas = Boards[0];
var canvasHand = Boards[1];
canvasHand.height = 80;
canvasHand.width = 180;
canvas.height = 500;
canvas.width = 800;
var h = canvasHand.getContext("2d");
var c = canvas.getContext("2d");
h.lineWidth = 5;
h.font = "20px Arial";
c.lineWidth = 3;
c.font = "20px Arial";
const club = new Image();
const spade = new Image();
const heart = new Image();
const diamond = new Image();
const CC = new Image();
const CS = new Image();
const CH = new Image();
const CD = new Image();
CC.src = "images/Character_Clubs.png";
CD.src = "images/Character_Diamonds.png";
CH.src = "images/Character_Hearts.png";
CS.src = "images/Character_Spades.png";
club.src = "images/klaver.png";
spade.src = "images/schop.png";
heart.src = "images/hart.png";
diamond.src = "images/ruit.png";
var collect = new Audio("sounds/pickupCoin.wav");
var fail = new Audio("sounds/buzzer-or-wrong-answer-20582.mp3");



//Variables:

class innerValue {
    constructor(color, value) {
        this.color = color;
        this.value = value;
    }
}

const symbols = ["spade", "diamond", "heart", "club"];

const hand = []
const colors = ["red", "orange", "black", "gray"];
for (var i = 0; i < 3; i++) {
    hand.push(new innerValue(custom.math.selectRandom(colors), custom.math.roundRandom(9) + 2));
}
const refresh_Hand = document.querySelector("button#handReset");
var color = colors[Math.floor(Math.random() * 4)];
var score = 0;
var state = "Change Card";
var card;

console.warn("Requirers JavaScript to run");


function returnColor(color, player) {
    if (!player) {
        switch (color) {
            case "orange":
                return diamond;
            case "red":
                return heart;
            case "black":
                return spade;
            case "gray":
                return club;
            default:
                return spade;
        }
    }
    switch (color) {
        case "orange":
            return CD;
        case "red":
            return CH;
        case "black":
            return CS;
        case "gray":
            return CC;
        default:
            return undefined;
    }
}

//Classes:
function refreshCircles() {
    //Check if every circle is stopped
    for (const card of cards) {
        if (!card.stop) {
            return;
        }
    }
    //Refresh them
    for (const card of cards) {
        card.refresh();
    }
}

class Card {
    constructor(x, y, r, player = { x: 0, y: 0, w: 50, h: 50 }, col = "red") {
        this.value = JSON.stringify(Math.floor(Math.random() * 9) + 2);
        this.x = Math.random() * 700 + 50;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.vy = Math.random() * 4 + 2;
        this.color = col;
        this.stop = false;
        this.addition = 20;
        this.card = new innerValue(this.color, this.value);
        this.price = 0;

        this.onRender = () => {
            if (custom.bridgeFit(hand[0], this.card, false)) {
                this.price = 5;
                return;
            }
            this.price = 0;
        }

        this.refresh = () => {
            //Render again
            this.onRender();
            this.value = JSON.stringify(Math.floor(Math.random() * 9) + 2);
            this.x = Math.random() * 800;
            this.card.value = this.value;
            this.y = y;
            this.stop = false;
            this.vy = Math.floor(Math.random() * 4) + 2;
            //Start the next loop (if all the cards are picked up or on the ground)
            refreshCircles();
        }

        this.draw = () => {
            //Draw the card
            if (this.value.length > 1) {
                this.addition = 15;
            } else {
                this.addition = 20;
            }
            c.beginPath()
            c.fillStyle = "white";
            c.fillRect(this.x, this.y - 20, 50, 70);
            c.strokeRect(this.x, this.y - 20, 50, 70);
            c.fillStyle = "black";
            c.fillText(this.value, this.x + this.addition, this.y);
            c.drawImage(returnColor(this.color, false), this.x, this.y);
        }

        this.update = () => {
            this.draw();
            if (!this.stop) { this.y += this.vy; }
            if (this.price > 0.31 && !this.stop) { this.price -= 0.32; }

            //Collision between player
            if (custom.rectCollide(this.x, this.y, this.w, this.h, player.x, player.y, player.w, player.h)) {
                if (custom.bridgeFit(this.card, hand[0], color)) {
                    refreshHand();
                    collect.play();
                } else {
                    fail.play();
                }
                score += this.price * 10;
                this.refresh();
                this.stop = true;
                card = this.color;
            }

            //Collision between ground
            if (this.y > 500) {
                this.y += 10;
                this.stop = true;
            }
        }
    }
}

class Player {
    constructor(x, y, w, h, vx) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = vx;

        this.draw = function () {
            c.drawImage(returnColor(color, true), this.x, this.y, 50, 80);
        }

        this.update = function () {
            this.draw();
            if (custom.inBetween(this.x + this.vx * 2, 750, 0)) {
                this.x += this.vx * 2;
            }
            this.vx *= 0.8;
        }
    }
}

class InHand {
    constructor(value, order) {
        this.value = value;
        this.order = order;
        this.addition = 17;
        this.y = 5;
        this.x = 5 + order * 60;

        this.draw = function () {
            //Addition is used to center the text on the cards
            h.strokeRect(this.x, this.y, 50, 70);
            h.fillStyle = "white";
            h.fillRect(this.x, this.y, 50, 70);
            h.fillStyle = "black";
            try {
                h.fillText(this.value.value, this.x + this.addition, this.y + 20);
                h.drawImage(returnColor(this.value.color, false), this.x, this.y + 20);
            } catch (error) {
                console.warn(hand[this.order]);
            }
        }

        this.update = function () {
            this.draw();
            this.value = hand[order];
        }
    }
}

//Objects:

const handCards = [];
for (let i = 0; i < 3; i++) {
    var example = hand[i];
    var handCard = new InHand(example, i);
    console.log(handCard.order);
    handCards.push(handCard);
}
var player = new Player(0, 420, 50, 80, 0);

const cards = [];
for (let i = 0; i < 4; i++) {
    var card = new Card(i, -60, i, player, colors[i]);
    card.onRender();
    cards.push(card);
}

function refreshHand() {
    //Refresh the hand
    for (var i = 0; i < hand.length; i++) {
        hand[i] = new innerValue(
            custom.math.selectRandom(colors),
            custom.math.roundRandom(9) + 2
        )
    }
}


//Events:
var interval;

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(event) {
    if (!interval) {
        if (event.key == "ArrowRight") {
            clearInterval(interval);
            interval = setInterval(function () { player.vx += 1 }, 16)
        } else if (event.key == "ArrowLeft") {
            clearInterval(interval);
            interval = setInterval(function () { player.vx -= 1 }, 16)
        }
    }
}
function keyUp(event) {
    clearInterval(interval);
    interval = null;
}

//Animation:

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, 800, 500);
    h.clearRect(0, 0, 180, 100);

    document.getElementById("score").innerHTML = Math.round(score*10) / 10;
    for (const card of cards) {
        card.update();
    }
    for (const handCard of handCards) {
        handCard.update();
    }
    refreshCircles();
    color = hand[0].color;
    player.update();

}

animate();

