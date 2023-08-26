function log(x) {
  console.log(JSON.stringify(x));
}

function firstHigherThanSecond(value1, value2) {
  const scale = {
    0: -1, // Only used for making sure a card with this fake value with never be highest
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
    var card2str = function(value, color) {
      return '{ "value": "' + value + '", "color": "' + color + '"}';
    }
    var s = 'tests.push(custom.bridgeFit(' + card2str(card.value, card.color) + ', [';
    var first = true;
    hand.forEach(handCard => {
      if (first !== true) {
        s = s + ", ";
      }
      s = s + card2str(handCard.value, handCard.color);
      first = false;
    });
    s = s + '], "' + trump + '") === ';

    var result = undefined;
    let leadingColor = hand[0].color;
    const allCards = [...hand, card]
    allCards.forEach((card) => {
      if (card.color === trump) {
        leadingColor = trump;
      }
    });
    if (card.color !== leadingColor) {
      result = false;
    } else {
      let highest = { "value": "0", "color": leadingColor };
      hand.forEach((handCard) => {
        if (handCard.color === leadingColor) {
          if (firstHigherThanSecond(handCard.value, highest.value)) {
            highest = handCard;
          }
        }
      });
      var result = firstHigherThanSecond(card.value, highest.value);
    }
    s = s + result + ");";

    let debug = 1;
    if (debug === 1) {
      console.log(s);
    }

    return result;
  }
}

function runTests() {
  console.log("Testing...");
  var tests = [];
  tests.push(custom.bridgeFit({ "value": "7", "color": "gray" }, [{ "value": "9", "color": "gray" }, { "value": "3", "color": "black" }, { "value": "3", "color": "gray" }], "gray") === false);
  tests.push(custom.bridgeFit({ "value": "Q", "color": "red" }, [{ "value": "7", "color": "red" }, { "value": "A", "color": "black" }, { "value": "5", "color": "gray" }], "black") === false);
  tests.push(custom.bridgeFit({ "value": "J", "color": "orange" }, [{ "value": "5", "color": "red" }, { "value": "5", "color": "black" }, { "value": "2", "color": "gray" }], "black") === false);
  tests.push(custom.bridgeFit({ "value": "4", "color": "gray" }, [{ "value": "K", "color": "red" }, { "value": "A", "color": "gray" }, { "value": "Q", "color": "gray" }], "black") === false);
  tests.push(custom.bridgeFit({ "value": "6", "color": "gray" }, [{ "value": "8", "color": "gray" }, { "value": "9", "color": "black" }, { "value": "10", "color": "orange" }], "black") === false);
  tests.push(custom.bridgeFit({ "value": "6", "color": "red" }, [{ "value": "2", "color": "red" }, { "value": "4", "color": "black" }, { "value": "10", "color": "red" }], "black") === false);
  tests.push(custom.bridgeFit({ "value": "A", "color": "orange" }, [{ "value": "6", "color": "orange" }, { "value": "4", "color": "red" }, { "value": "4", "color": "orange" }], "black") === true);
  tests.push(custom.bridgeFit({ "value": "Q", "color": "orange" }, [{ "value": "5", "color": "orange" }, { "value": "9", "color": "gray" }, { "value": "J", "color": "red" }], "black") === true);
  tests.push(custom.bridgeFit({ "value": "K", "color": "gray" }, [{ "value": "7", "color": "gray" }, { "value": "K", "color": "black" }, { "value": "10", "color": "black" }], "black") === false);
  tests.push(custom.bridgeFit({ "value": "J", "color": "black" }, [{ "value": "9", "color": "orange" }, { "value": "7", "color": "orange" }, { "value": "8", "color": "red" }], "black") === true);
  tests.push(custom.bridgeFit({ "value": "10", "color": "red"}, [{ "value": "J", "color": "gray"}, { "value": "4", "color": "red"}, { "value": "6", "color": "gray"}], "red") === true);
  tests.push(custom.bridgeFit({ "value": "2", "color": "black"}, [{ "value": "4", "color": "gray"}, { "value": "9", "color": "orange"}, { "value": "7", "color": "black"}], "red") === false);
  tests.push(custom.bridgeFit({ "value": "4", "color": "orange"}, [{ "value": "10", "color": "orange"}, { "value": "7", "color": "gray"}, { "value": "7", "color": "orange"}], "red") === false);
  tests.push(custom.bridgeFit({ "value": "A", "color": "gray"}, [{ "value": "5", "color": "gray"}, { "value": "Q", "color": "black"}, { "value": "Q", "color": "red"}], "red") === false);
  tests.push(custom.bridgeFit({ "value": "7", "color": "red"}, [{ "value": "10", "color": "gray"}, { "value": "Q", "color": "gray"}, { "value": "J", "color": "red"}], "red") === false);
  tests.push(custom.bridgeFit({ "value": "A", "color": "red"}, [{ "value": "Q", "color": "orange"}, { "value": "5", "color": "orange"}, { "value": "K", "color": "orange"}], "red") === true);
  tests.push(custom.bridgeFit({ "value": "8", "color": "orange"}, [{ "value": "8", "color": "red"}, { "value": "8", "color": "gray"}, { "value": "2", "color": "orange"}], "red") === false);
  tests.push(custom.bridgeFit({ "value": "6", "color": "black"}, [{ "value": "K", "color": "gray"}, { "value": "2", "color": "gray"}, { "value": "J", "color": "orange"}], "red") === false);

  if (tests.some(x => !x)) console.log("WARNING: there are failing tests!");
  console.log("End of tests");
} 