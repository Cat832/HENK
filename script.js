function log(x) {
  console.log(JSON.stringify(x));
}

function highestValue(value1, value2) {
  const scale = {
    2: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    10: 8,
    J: 9,
    Q: 10,
    K: 11,
    A: 12,
  };

  return (scale[value1] > scale[value2]);
}

var custom = {
  math: {
    negRandom: function () {
      return (Math.random() - 0.5) * 2;
    },
    selectRandom: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    roundRandom: function (max) {
      return Math.floor(Math.random() * max);
    },
  },
  //Calculates distances between two vectors
  calcDist: function (x1, x2, y1, y2) {
    return Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);
  },
  //Detect collision between two rectangles
  rectCollide: function (x1, y1, w1, h1, x2, y2, w2, h2) {
    var collision_x;
    var collision_y;
    //Collision between the x-axis:
    if (x1 + w1 >= x2 && x1 <= x2 + w2) {
      collision_x = true;
    } else {
      collision_x = false;
    }
    if (y1 + h1 >= y2 && y1 <= y2 + h2) {
      collision_y = true;
    } else {
      collision_y = false;
    }
    return collision_x && collision_y;
  },
  //Detects if a position is in between two positions (1d)
  inBetween: function (Detect, right, left) {
    if (Detect < right && Detect > left) {
      return true;
    }
    return false;
  },
  //Check if cards "fit"
  normalFit: function (card1, card2) {
    if (card1.color == card2.color || card1.value == card2.value) {
      return true;
    }
    return false;
  },
  //Check if cards have the same value
  valueFit: function (card1, card2) {
    if (card1.value == card2.value && !(card1.color == card2.color)) {
      return true;
    }
    return false;
  },
  //Check if cards have the same color
  colorFit: function (card1, card2) {
    if (card1.color == card2.color && !(card1.value == card2.value)) {
      return true;
    }
    return false;
  },
  //Check if cards "fit" like in bridge
  bridgeFit: function (card, hand, trump) {
    let highest = hand[0]; //Temporarily, so we have something to compare
    let leadingColor = hand[0].color;
    hand.forEach((handCard) => {
      if (handCard.color == trump) {
        leadingColor = trump;
      }
    });
    if (card.color != leadingColor) return false
    hand.forEach((handCard) => {
      if (handCard.color == leadingColor) {
        if (highestValue(highest.value, handCard.value)) {
          highest = handCard;
        }
      }
    });
    return highestValue(card.value, highest.value);
  },
};
