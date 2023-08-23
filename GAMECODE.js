//Canvas definition:const muteButton = document.getElementById("mutebutton");
let muted = false;

function mute() {
  muted = !muted;
  muteButton.innerHTML = muted ? "🔊" : "🔇";
}

function reset_game(rootPath) {
  const Boards = document.querySelectorAll("canvas");
  let deck = shuffleDeck();
  console.log(deck.length);
  gameHand = deck.slice(0, 13);
  deck.splice(0, 13);
  playerHand = [...deck];
  console.log(playerHand);
  console.log(gameHand);
  let cardAmount = 3;
  let gameComplete = false;
  let canvas = Boards[0];
  let canvasHand = Boards[1];
  canvasHand.height = 80;
  canvasHand.width = 180;
  canvas.height = 500;
  canvas.width = 800;
  let h = canvasHand.getContext("2d");
  let c = canvas.getContext("2d");
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
  CC.src = rootPath + "images/Character_Clubs.png";
  CD.src = rootPath + "images/Character_Diamonds.png";
  CH.src = rootPath + "images/Character_Hearts.png";
  CS.src = rootPath + "images/Character_Spades.png";
  club.src = rootPath + "images/klaver.png";
  spade.src = rootPath + "images/Schop.png";
  heart.src = rootPath + "images/Hart.png";
  diamond.src = rootPath + "images/ruit.png";
  let collect = new Audio(rootPath + "sounds/pickupCoin.wav");
  let fail = new Audio(rootPath + "sounds/buzzer-or-wrong-answer-20582.mp3");
  let lastUpdate = Date.now();
  let images = [club, spade, heart, diamond, CC, CS, CH, CD];

  //Variables:

  class innerValue {
    constructor(color, value) {
      this.color = color;
      this.value = value;
    }
  }

  function generateValue() {
    if (gameHand.length == 0) return [0, "undefined"];
    let returning = [gameHand[0].value, gameHand[0].color];
    gameHand.splice(0, 1);
    return returning;
  }

  const hand = [];
  const colors = ["red", "orange", "black", "gray"];
  var trump = custom.math.selectRandom(colors);
  for (var i = 0; i < 3; i++) {
    hand.push(playerHand[0]);
    playerHand.splice(0, 1);
  }
  const refresh_Hand = document.querySelector("button#handReset");
  var color = trump;
  var score = 0;
  var state = "Change Card";
  var card;

  console.warn("Requires JavaScript to run");

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
  function backToStart() {
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
      this.generatedValue = generateValue(); //It's sucks to do this....
      this.value = this.generatedValue[0];
      this.color = this.generatedValue[1];
      this.x = Math.random() * 700 + 50;
      this.y = y;
      this.w = 50;
      this.h = 50;
      this.vy = 2;
      this.stop = false;
      this.addition = 20;
      this.card = new innerValue(this.color, this.value);
      this.roundSucces = false;
      this.refresh = () => {
        //Render again
        if (this.roundSucces) {
          score++;
          this.generatedValue = generateValue();
          this.value = this.generatedValue[0];
          this.color = this.generatedValue[1];
        }
        this.roundSucces = false;

        this.x = Math.random() * 800;
        this.card.value = this.value;
        this.card.color = this.color;
        this.y = y;
        this.stop = false;
        refreshHand();
      };

      this.draw = () => {
        //Draw the card
        if (this.value.length > 1) {
          this.addition = 15;
        } else {
          this.addition = 20;
        }
        c.beginPath();
        c.fillStyle = "white";
        c.fillRect(this.x, this.y - 20, 50, 70);
        c.strokeRect(this.x, this.y - 20, 50, 70);
        c.fillStyle = "black";
        c.fillText(this.value, this.x + this.addition, this.y);
        c.drawImage(returnColor(this.color, false), this.x, this.y);
      };

      this.update = () => {
        this.draw();
        if (!this.stop) this.y += this.vy;
        if (this.price - 0.016 > 0) this.price -= 0.016;
        else this.price = 0;

        //Collision between player
        if (
          custom.rectCollide(
            this.x,
            this.y,
            this.w,
            this.h,
            player.x,
            player.y,
            player.w,
            player.h
          )
        ) {
          if (custom.bridgeFit(this.card, hand, trump)) {
            this.roundSucces = true;
            if (!muted) {
              collect.play();
            }
          } else if (!muted) {
            fail.play();
          }
          this.refresh();
          this.stop = true;
          card = this.color;
        }

        //Collision between ground
        if (this.y > 500) {
          this.y += 10;
          this.stop = true;
        }
      };
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
      };

      this.update = function () {
        this.draw();
        if (custom.inBetween(this.x + this.vx * 2, 750, 0)) {
          this.x += this.vx * 2;
        }
        this.vx *= 0.8;
      };
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
          h.drawImage(
            returnColor(this.value.color, false),
            this.x,
            this.y + 20
          );
        } catch (error) {
          console.warn(hand[this.order]);
        }
      };

      this.update = function () {
        this.draw();
        this.value = hand[order];
      };
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
  for (let i = 0; i < cardAmount; i++) {
    var card = new Card(i, -60, i, player, colors[i]);
    cards.push(card);
  }

  function refreshHand() {
    // /*
    // [{color: "red", value:"8"}, {color: "orange", value:"12"}, {color:"gray", value:"K"}]
    // should become:
    // [{color: "orange", value:"12"}, {color:"gray", value:"K"}, playerHand[0]]
    // */
    // hand.splice(0, 1);
    // //[{color: "orange", value:"12"}, {color:"gray", value:"K"}]
    // hand.push(playerHand[0]);
    // //[{color: "orange", value:"12"}, {color:"gray", value:"K"}, playerHand[0]]
    // playerHand.splice(0, 1);
    hand = playerHand.splice(0, 2);
    playerHand.splice(0, 2);
  }
  //Events:
  var interval;

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  function keyDown(event) {
    if (!interval) {
      if (event.key == "ArrowRight") {
        clearInterval(interval);
        interval = setInterval(function () {
          player.vx += 1;
        }, 16);
      } else if (event.key == "ArrowLeft") {
        clearInterval(interval);
        interval = setInterval(function () {
          player.vx -= 1;
        }, 16);
      }
    }
  }
  function keyUp(event) {
    clearInterval(interval);
    interval = null;
  }

  //Animation:
  var start; // start of frame rendered last

  function animate(timeStamp) {
    if (start === undefined) {
      start = timeStamp;
    }
    const elapsed = timeStamp - start;

    if (gameComplete) return;

    //Javascript doet raar now a days....

    if (elapsed >= 16 && !gameComplete) {
      c.clearRect(0, 0, 800, 500);
      h.clearRect(0, 0, 180, 100);

      // document.getElementById("score").innerHTML = `${Math.round(score * 10) / 10}/13`
      document.getElementById("score").innerHTML = `${score}/13`;

      //Pepijn heeft dit geprogrammeerd0

      for (const card of cards) {
        card.update();
      }
      for (const handCard of handCards) {
        handCard.update();
      }
      color = trump;
      backToStart();
      player.update();
      start = timeStamp;
    }
    requestAnimationFrame(animate);
    /* 
    
    */
    document.querySelector(".description.gc").innerHTML = gameHand.length;
    document.querySelector(".description.pc").innerHTML = playerHand.length;
    if (playerHand.length === 0 || gameHand.length === 0) {
      //End screen
      c.clearRect(0, 0, 800, 500);
      c.font = "50px Arial";
      c.fillText("End of game!", 30, 200);
      gameComplete = true;
    }
  }

  //setTimeOut()??? I don't know maar ik zeg het ff voor het geval dat je bedoeling was
  // Nee! Een image kan dan nog niet klaar met laden zijn en dan moet hij het nog een keer proberen.
  const delayStartInterval = setInterval(function () {
    images.forEach((element) => {
      if (!element.complete) {
        return;
      }
    });

    clearInterval(delayStartInterval);
    animate();
  }, 250);
}
