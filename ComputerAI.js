/*
    === Computer AI ===
    Purpose:
        - The AI will choose cards for player 2
*/

// TODO: Actually put code here
function computerChoice(){
    chooseCard(player2Deck, 4);
}

function chooseRandomCard(){
    return Math.floor(Math.random * MAX_CARDS);
}
