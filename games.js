const colors = ["red", "orange", "gray", "black"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

let deck = []; //Container for every card

//Create a deck
for (let i = 0; i < colors.length; i++) {
  for (let x = 0; x < values.length; x++) {
    let card = { value: values[x], color: colors[i] };
    deck.push(card);
  }
}

//Shuffle the deck
for (let i = deck.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * i);
  let temp = deck[i];
  deck[i] = deck[j];
  deck[j] = temp;
}

//Spread the deck over the two hands
const playerHand = deck.slice(0, 13);
deck.splice(0, 13);
const gameHand = [...deck]