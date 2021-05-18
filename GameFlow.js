/*
    === Game Control ===
        Purpose:
            - Dictates the flow of the game
            - Controls what happens each round
            - Repeats game until a winner is chosen
            - Decides the win conditions
        
        Win Condition Options:
            1. Score-based (Simple)
                - Game repeats until one player has enough points

            2. Three-of-a-kind (Complex) -> CHOSEN
                - Game repeats until one of the following:
                    - a player has a win with pyro/cryo/hydro
                    - a player has a win with 3 of the same element
*/

let winner = 'NONE';

// Three-of-a-kind Score Trackers
const MATCH_WIN = 3;

let p1Scores = {
    elementScore: 0, // Counts winning elements that have won

    // Checks whether an element has won before
    pyroWin: false,
    hydroWin: false,
    cryoWin: false,

    // Times won with an element
    pyroScore: 0,
    hydroScore: 0,
    cryoScore: 0
}

let p2Scores = {
    elementScore: 0,

    pyroWin: false,
    hydroWin: false,
    cryoWin: false,

    pyroScore: 0,
    hydroScore: 0,
    cryoScore: 0
}

/*
    Adds score to the trackers
        Parameters:
            <pScores> - The score tracker of the winning player
            <Card> - The Card that won (and its stats)
*/
function addScore(pScores, Card){
    let element = Card.element;
    
    // Makes sure the element has not already won before adding to elementScore
    // Also adds to the corresponding element score
    switch (element){
        case 'PYRO':
            pScores.pyroScore++;
            if (pScores.pyroWin == false){
                pScores.pyroWin = true;
                pScores.elementScore++;
            }
            break;
        
        case 'CRYO':
            pScores.cryoScore++;
                if (pScores.cryoWin == false){
                pScores.cryoWin = true;
                pScores.elementScore++;
            }
            break;
            
        case 'HYDRO':
            pScores.hydroScore++;
            if (pScores.hydroWin == false){
                pScores.hydroWin = true;
                pScores.elementScore++;
            }
            break;

        default:
            console.log('ERROR: ELEMENT NOT DETECTED');
    }
}

function showScores(){
    // Player 1 Scores
    document.getElementById('p1ElementalScore').innerHTML = p1Scores.elementScore;
    document.getElementById('p1PyroScore').innerHTML = p1Scores.pyroScore;
    document.getElementById('p1CryoScore').innerHTML = p1Scores.cryoScore;
    document.getElementById('p1HydroScore').innerHTML = p1Scores.hydroScore;

    // Player 2 Scores
    document.getElementById('p2ElementalScore').innerHTML = p2Scores.elementScore;
    document.getElementById('p2PyroScore').innerHTML = p2Scores.pyroScore;
    document.getElementById('p2CryoScore').innerHTML = p2Scores.cryoScore;
    document.getElementById('p2HydroScore').innerHTML = p2Scores.hydroScore;

}
/*
    Checks to see if the player has won
        - TODO: Decide what happens when a winner is found
*/
function winCheck(){
    if (p1Scores.elementScore >= MATCH_WIN){
            winner = 'PLAYER 1';
            document.getElementById('results').innerHTML = 'PLAYER 1 HAS WON DUE TO WINNING WITH ALL THREE ELEMENTS';
        }
        
    else if (p1Scores.pyroScore >= MATCH_WIN
        || p1Scores.cryoWin >= MATCH_WIN
        || p1Scores.hydroScore >= MATCH_WIN){
            winner = 'PLAYER 1';
            document.getElementById('results').innerHTML = 'PLAYER 1 HAS WON DUE TO WINNING THRICE WITH ONE ELEMENT';
        }

    else if (p2Scores.elementScore >= MATCH_WIN){
            winner = 'PLAYER 2';
            document.getElementById('results').innerHTML = 'PLAYER 2 HAS WON DUE TO WINNING WITH ALL THREE ELEMENTS';
        }

    else if (p2Scores.pyroScore >= MATCH_WIN
        || p2Scores.cryoWin >= MATCH_WIN
        || p2Scores.hydroScore >= MATCH_WIN){
            winner = 'PLAYER 2';
            document.getElementById('results').innerHTML = 'PLAYER 2 HAS WON DUE TO WINNING THRICE WITH ONE ELEMENT';
        }
}

// TEMPORARY Function for Running Game
function chooseCards(playerChoice){
    chooseCard(player1Deck, playerChoice, PLAYER1);
    console.log('card 1 was chosen');
    computerChoice();
    console.log('card 2 was chosen');
}

// Function compares cards
//  - Is currently primitive, may need to find better way
function compareCards(index){
    p1Card = field[index][PLAYER1];
    p2Card = field[index][PLAYER2];

    let p1CardElement = ELEMENTS.indexOf(p1Card.getElement());
    let p2CardElement = ELEMENTS.indexOf(p2Card.getElement());

    // Keywords for outcome of comparison
    const DRAW = 0;
    const WIN = 1;
    const LOSE = -1;

    /* 
        This matrix shows the results of the element comparison
            - The vertical axis represents player 1's element
            - The horizontal axis represents player 2's element
            - The positions are based on the ELEMENTS array
                - 0: PYRO, 1: CRYO, 2: HYDRO

            - As an example [0][1] means Player 1 has Pyro, and Player 2 has Cryo
                - This means Player 1 wins the round based on element (returns 1)
    */
    const ELEMENT_COMPARISON = [
        [DRAW, WIN, LOSE],
        [LOSE, DRAW, WIN],
        [WIN, LOSE, DRAW]
    ]
    
    let elementResult = ELEMENT_COMPARISON[p1CardElement][p2CardElement];

    // Adds score and shows result
    if (elementResult == WIN){
        addScore(p1Scores, p1Card);
        console.log('Player 1 wins as ' + p1Card.element + ' beats ' + p2Card.element);
    }

    else if (elementResult == LOSE){
        addScore(p2Scores, p2Card);
        console.log('Player 2 wins as ' + p2Card.element + ' beats ' + p1Card.element);
    }

    else if (elementResult == DRAW){

        if (p1Card.power > p2Card.power){
            addScore(p1Scores, p1Card);
            document.getElementById('results').innerHTML = 'PLAYER 1 WINS THE ROUND DUE TO HIGHER POWER LEVEL';
        }
        else if (p1Card.power < p2Card.power){
            addScore(p2Scores, p2Card);
            document.getElementById('results').innerHTML = 'PLAYER 2 WINS THE ROUND DUE TO HIGHER POWER LEVEL';
        }
        else if (p1Card.power == p2Card.power){
            document.getElementById('results').innerHTML = 'IT IS A DRAW';
        }
        else {
            document.getElementById('results').innerHTML = 'ERROR: MATCHING ELEMENT BUT POWER LEVEL UNDETERMINED';
        }
    }

    else {
        console.log('ERROR: Undetermined Result!')
    }
}

let phase = 'selection';

function cardChosen(){
    phase = 'comparison';
    main();
}

function finishRound(){
    phase = 'repeat';
    main();
}

function main(){
    let i = 0;
    /*
    while (winner == 'NONE'){

        console.log(player1Deck);
        console.log(player2Deck);
        fillDeck();

        ctx.clearRect(0, 0, 1024, 768);
        displayDeck({x: 222, y: 608}, player1Deck);
        displayDeck({x: 222, y: 38}, player2Deck);

        compareCards(0);
        displayField();
        pause();
        fieldRemove(PLAYER1, 0);
        fieldRemove(PLAYER2, 0);
        winCheck();
    }
    */

    if (winner == 'NONE'){
        switch (phase){
            case 'selection':
                showScores();
                console.log(player1Deck);
                console.log(player2Deck);
                fillDeck();
        
                ctx.clearRect(0, 0, 1024, 768);
                displayDeck({x: 222, y: 608}, player1Deck);
                displayDeck({x: 222, y: 38}, player2Deck);
                break;
            
            case 'comparison':
                compareCards(0);
                displayField();
                fieldRemove(PLAYER1, 0);
                fieldRemove(PLAYER2, 0);
                winCheck();
                showScores();
                phase = 'repeat';
                break;

            case 'repeat':
                phase = 'selection';
                main();
        }
    }

}