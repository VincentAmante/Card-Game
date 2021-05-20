/*
    === Computer AI ===
    Purpose:
        - The AI will choose cards for player 2
*/
function chooseRandomCard(){
    return Math.floor(Math.random() * MAX_CARDS);
}

function computerChoice(){
    let chosenCard = chooseRandomCard();
    chooseCard(player2Deck, chosenCard, PLAYER2);
    console.log('card ' + chosenCard + ' was chosen')
}