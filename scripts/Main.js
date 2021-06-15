/*
    === Main.js ===
    Purpose:
        - Dictate how the game will operate
        - Run the game

        EXTRA: (Unintended features that should've been separated)
            - Contains functionality for mouse interaction
*/

let round = 1;

/** Defines how the canvas game will flow */
function main() {
  switch (phase) {
    case "startGame":
      splashScreen();
      break;

    case "selection":
      newRound.play();
      displayField();
      system.innerHTML = "Round " + round + " begin!";
      fillDeck();

      ctx.clearRect(0, 0, 1024, 768);
      displayDeck({ x: 419, y: 620 }, player1Deck);
      displayDeck({ x: 10, y: 18 }, player2Deck);
      displayScores();
      displayNames();
      break;

    case "comparison":
      ctx.clearRect(0, 0, 1024, 768);
      compareCards(0);
      displayField();
      displayDeck({ x: 419, y: 620 }, player1Deck);
      displayDeck({ x: 10, y: 18 }, player2Deck);
      fieldRemove(PLAYER1);
      fieldRemove(PLAYER2);
      winCheck();
      displayScores();
      displayNames();
      round++;

      if (winner != "NONE") {
        /*
                    Most of this code is actually useless, but whenever I run `displayWinner(winner)`,
                    the element images load late and show up on top of the win announcement.
    
                    To combat it, I just load a bigger image so this one loads later B)
                */
        let bgImage = new Image(1000, 1000);
        bgImage.src = "images/bg.png";

        bgImage.onload = () => displayWinner(winner);
      }

      break;

    case "restart":
      ctx.clearRect(0, 0, 1024, 768);
      endRound.play();
      round = 1;
      restartScreen();
      break;
  }
}

let playerCards = [];
for (let i = 0; i < 5; i++) {
  x0 = 419 + NORMAL_CARD.W * i + 30 * i;
  playerCards[i] = {
    x0: x0,
    x1: x0 + NORMAL_CARD.W,

    y0: 620,
    y1: 620 + NORMAL_CARD.H,
  };
}

/**
 * Checks if mouse click is inside the card
 *
 * @param {Object} mouseSpan - Coordinates of the mouse click
 * @param {Object} cardSpan - Space that the card occupies in the canvas
 * @returns
 */
function isInside(mouseSpan, cardSpan) {
  let result =
    mouseSpan.x >= cardSpan.x0 &&
    mouseSpan.x <= cardSpan.x1 &&
    mouseSpan.y >= cardSpan.y0 &&
    mouseSpan.y <= cardSpan.y1
      ? true // if inside
      : false; // if outside

  return result;
}

/** Handles mouse interaction */
window.addEventListener("click", function (e) {
  let canvasSpan = canvas.getBoundingClientRect();
  let mouseSpan = {
    x: Math.round(e.clientX - canvasSpan.left),
    y: Math.round(e.clientY - canvasSpan.top),
  };

  switch (phase) {
    case "startGame":
      if (
        isInside(mouseSpan, {
          x0: 0,
          x1: canvas.width,
          y0: 0,
          y1: canvas.height,
        })
      ) {
        startGame();
      }
      break;

    case "selection":
      for (let i = 0; i < 5; i++) {
        if (isInside(mouseSpan, playerCards[i])) {
          chooseCards(i);
          cardChosen();
        }
      }
      break;

    case "comparison":
      if (
        isInside(mouseSpan, {
          x0: 0,
          x1: canvas.width,
          y0: 0,
          y1: canvas.height,
        })
      ) {
        finishRound();
      }
      break;

    case "restart":
      if (
        isInside(mouseSpan, {
          x0: 0,
          x1: canvas.width,
          y0: 0,
          y1: canvas.height,
        })
      ) {
        restartRound.play();
        restartGame();
      }
      break;
  }

  console.log(mouseSpan);
});

// Runs game once the font is downloaded
let genshinFont = new FontFace("GenshinFont", "url(font/genshinFont.ttf)");
genshinFont.load().then(function (loaded_face) {
  document.fonts.add(loaded_face);
  document.body.style.fontFamily = "GenshinFont";
  main();
});
