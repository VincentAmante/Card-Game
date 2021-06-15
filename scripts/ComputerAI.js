/*
    === ComputerAI.js ===
    Purpose:
        - This file should contains functions for choosing cards for the AI
*/

/**
 *     Chooses a card for the AI
 *          - This implementation was intended to be so much more
 *          - However, time constraints have kept it to be nothing more than a randomiser
 * @returns A number that corresponds to a card in the deck
 */
function _chooseAICard() {
  return Math.floor(Math.random() * MAX_CARDS);
}

/**
 * Function to be used by other js files to make the computer choose a card
 */
function computerChoice() {
  let chosenCard = _chooseAICard();
  chooseCard(player2Deck, chosenCard, PLAYER2);
  console.log("card " + chosenCard + " was chosen");
}
