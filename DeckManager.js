/*
    === Deck Manager ===
    Purpose:
        - Handles the cards being distributed to the players decks
        - Also handles the cards being compared
*/

// Player's decks are designed to carry around 3-4 cards 
let player1Deck = [];
let player2Deck = [];
const MAX_CARDS = 5;

// The main field for card comparisons
let field = [ ['PLAYER1_CARD', 'PLAYER2_CARD'] ];

// Creates the inital deck for both players
function initialiseDeck(){

    // Random cards for player 1
    for (let i = 0; i < MAX_CARDS; i++){
        // Creates a new random card
        let element = Math.floor(Math.random() * ELEMENTS.length);
        let powerLevel = Math.ceil(Math.random() * MAX_POWER);

        player1Deck.push(new Card(element, powerLevel));
    }
    
    // Random cards for player 2
    for (let i = 0; i < MAX_CARDS; i++){

        let element = Math.floor(Math.random() * ELEMENTS.length);
        let powerLevel = Math.ceil(Math.random() * MAX_POWER);

        player2Deck.push(new Card(element, powerLevel));
    }
}

/* 
    Function for removing a card from a deck

*/
function removeCard(deck, index){
    deck.splice(index, 1);
}

// Function for choosing a card from the deck/hand
function chooseCard(deck, card){
    
}