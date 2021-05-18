/*
    === Computer AI ===
    Purpose:
        - The AI will choose cards for player 2
*/
function chooseRandomCard(){
    return Math.floor(Math.random() * MAX_CARDS);
}

// TODO: Actually put code here
function computerChoice(){
    let chosenCard = chooseRandomCard();
    chooseCard(player2Deck, chosenCard, PLAYER2);
    console.log('card ' + chosenCard + ' was chosen')
}