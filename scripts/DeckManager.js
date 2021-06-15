/*
    === DeckManager.js ===
    Purpose:
        - Handles the cards being distributed to the players decks
        - Also handles the cards being compared
*/

// Player's decks are designed to carry 5 cards
let player1Deck = [];
let player2Deck = [];

const MAX_CARDS = 5;

/** Fills both decks with cards based on missing amount */
function fillDeck() {
  let toAdd = MAX_CARDS - player1Deck.length;

  // Random cards for player 1
  for (let i = 0; i < toAdd; i++) {
    // Creates a new random card
    let element = Math.floor(Math.random() * ELEMENTS.length);
    let powerLevel = Math.ceil(Math.random() * MAX_POWER);

    player1Deck.push(new Card(element, powerLevel));
  }

  // Random cards for player 2
  for (let i = 0; i < toAdd; i++) {
    let element = Math.floor(Math.random() * ELEMENTS.length);
    let powerLevel = Math.ceil(Math.random() * MAX_POWER);

    player2Deck.push(new Card(element, powerLevel));
  }
}

/**
    Main field for card comparisons
        - Made a 2D array to support multiple cards on the field in the future
*/
let field = [["PLAYER1_CARD", "PLAYER2_CARD"]];

// Number of cards already placed in the field
let p1PlacedCards = 0;
let p2PlacedCards = 0;

// Maximum cards in the field per player
const MAX_FIELD = 1;

// Index of player in the field
const PLAYER1 = 0;
const PLAYER2 = 1;

/**
 * Chooses a card from the deck/hand and placed into the field
 *
 * @param {array} deck - deck to take card from
 * @param {number} index - index of card from deck
 * @param {number} player - player who owns the deck
 * @returns
 */
function chooseCard(deck, index, player) {
  if (player == PLAYER1) {
    // Attempting to show player 1 card
    if (p1PlacedCards >= MAX_FIELD) {
      console.log("ERROR: FIELD ALREADY FULL");
      return;
    }

    field[p1PlacedCards][PLAYER1] = player1Deck[index];
    player1Deck[index].showCard();
    p1PlacedCards++;
  } else if (player == PLAYER2) {
    // Attempting to show player 2 card
    if (p2PlacedCards >= MAX_FIELD) {
      console.log("ERROR: FIELD ALREADY FULL");
      return;
    }

    field[p2PlacedCards][PLAYER2] = player2Deck[index];
    player2Deck[index].showCard();
    p2PlacedCards++;
  }

  deck.splice(index, 1);
}

/**
 * Removes a card from the field
 *
 * @param {number} player - side to remove card from
 */
function fieldRemove(player) {
  let playerString = "NULL";

  switch (player) {
    case PLAYER1:
      playerString = "PLAYER1";
      p1PlacedCards--;
      break;
    case PLAYER2:
      playerString = "PLAYER2";
      p2PlacedCards--;
      break;
    default:
      playerString = "ERROR";
  }

  field[0][player] = playerString + "_EMPTY_CARD";
}
