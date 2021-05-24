/*
    === GameControl.js ===
        Purpose:
            - Provide tools to dictate the flow of the game
            - Allow functionality to progress through the game
            - Handle the scoring system
            - Provide tools for deciding the winner
            
            EXTRA: (Unintended features that should've been separated)
            - Contains HTML messaging
*/

let winner = 'NONE'; // Match continues until winner is found

/**
 *         Win Condition:
            Three-of-a-kind
                - Game repeats until one of the following:
                    - a player has a win with pyro/cryo/hydro
                    - a player has a win with 3 of the same element
 */

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

/**
 * This function adds a score to the player's scoreboard based on the winning card
 * 
 * @param {Object} pScores - Object containing the scores of the player to be incremented
 * @param {Card} Card - The winning card  
 */
function addScore(pScores, Card) {
    let element = Card.getElement();

    // Makes sure the element has not already won before adding to elementScore
    // Also adds to the corresponding element score
    switch (element) {
        case 'PYRO':
            pScores.pyroScore++;
            if (pScores.pyroWin === false) {
                pScores.pyroWin = true;
                pScores.elementScore++;
            }
            break;

        case 'CRYO':
            pScores.cryoScore++;
            if (pScores.cryoWin === false) {
                pScores.cryoWin = true;
                pScores.elementScore++;
            }
            break;

        case 'HYDRO':
            pScores.hydroScore++;
            if (pScores.hydroWin === false) {
                pScores.hydroWin = true;
                pScores.elementScore++;
            }
            break;

        default:
            console.log('ERROR: ELEMENT NOT DETECTED');
    }
}


/** Accesses the 'results' element in the html page */
let system = document.getElementById('results');

/**
 *     Checks to see if the player has won
            - On a win, displays a message both in the announcement footer in the html pagr
            - Also displays a message in canvas itself
 */
function winCheck() {
    if (p1Scores.elementScore >= MATCH_WIN) {
        winner = 'Player 1';
        system.innerHTML = 'You won due to winning once with all three elements!';
        matchWin.play();
    }

    else if (p1Scores.pyroScore >= MATCH_WIN
        || p1Scores.cryoScore >= MATCH_WIN
        || p1Scores.hydroScore >= MATCH_WIN) {
        winner = 'Player 1';
        system.innerHTML = 'You won due to winning thrice with one element!';
        matchWin.play();
    }

    else if (p2Scores.elementScore >= MATCH_WIN) {
        winner = 'Player 2';
        system.innerHTML = 'Enemy AI has won due to winning once with all three elements!';
        matchLose.play();
    }

    else if (p2Scores.pyroScore >= MATCH_WIN
        || p2Scores.cryoScore >= MATCH_WIN
        || p2Scores.hydroScore >= MATCH_WIN) {
        winner = 'Player 2';
        system.innerHTML = 'Enemy AI has won due to winning thrice with one element!';
        matchLose.play();
    }
}


/**
 * Chooses cards to be played into the field from both players
 * 
 * 
 * @param {number} playerChoice - index of the chosen card in the player's deck 
 */
function chooseCards(playerChoice) {
    if (phase == 'selection') {
        chooseCard(player1Deck, playerChoice, PLAYER1);
        computerChoice();
    }
}

/**
 * Compares a pair of cards chosen by the players
 *      - Decides the winner
 * 
 * @param {number} index - Part of the field to be compared (Intended for multi-card comparison support) 
 */
function compareCards(index) {
    p1Card = field[index][PLAYER1];
    p2Card = field[index][PLAYER2];

    let p1CardElement = ELEMENTS.indexOf(p1Card.getElement());
    let p2CardElement = ELEMENTS.indexOf(p2Card.getElement());

    let writeElement = (element) => ({
        'PYRO': 'Pyro',
        'CRYO': 'Cryo',
        'HYDRO': 'Hydro'
    }[element])

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

    p1CardElement = writeElement(p1Card.getElement());
    p2CardElement = writeElement(p2Card.getElement());

    // Adds score and shows result
    if (elementResult == WIN) {
        addScore(p1Scores, p1Card);
        system.innerHTML = 'You win as ' + p1CardElement + ' beats ' + p2CardElement;
        roundWin.play();
    }

    else if (elementResult == LOSE) {
        addScore(p2Scores, p2Card);
        system.innerHTML = 'Enemy AI wins as ' + p2CardElement + ' beats ' + p1CardElement;
        roundLose.play();
    }

    else if (elementResult == DRAW) {

        if (p1Card.getPower() > p2Card.getPower()) {
            addScore(p1Scores, p1Card);
            system.innerHTML = 'You win the round due to having a higher power level card!';
            roundWin.play();
        }
        else if (p1Card.getPower() < p2Card.getPower()) {
            addScore(p2Scores, p2Card);
            system.innerHTML = 'Enemy AI wins the round due to having a higher power level card!';
            roundLose.play();
        }
        else if (p1Card.getPower() == p2Card.getPower()) {
            system.innerHTML = 'Draw!';
            draw.play();
        }
        else {
            system.innerHTML = 'ERROR: MATCHING ELEMENT BUT POWER LEVEL UNDETERMINED';
        }
    }

    else {
        console.log('ERROR: Undetermined Result!')
    }
}


///// PHASE FUNCTIONS
//      - Contains functions for interacting with the game and progressing it

let phase = 'startGame';

/**
 * Phase function to start the game
 */
function startGame() {
    console.log('Prior Phase: ' + phase)
    if (phase == 'startGame') {
        phase = 'selection';
        console.log('Current Phase: ' + phase);
        main();
    }

    bgm.play();
}

/**
 * Phase function to progress to selection after choosing a card
 */
function cardChosen() {
    console.log('Prior Phase: ' + phase);
    if (phase == 'selection') {
        phase = 'comparison';
        console.log('Current Phase: ' + phase);
        main();
    }
}

/**
 * Phase function to end the round
 *  - Either goes back to selection phase, or ends the game and enters restart phase
 */
function finishRound() {
    console.log('Prior Phase: ' + phase);
    if (phase == 'comparison' && winner == 'NONE') {
        phase = 'selection';
        console.log('Current Phase: ' + phase);
        main();
    }
    else if (phase == 'comparison' && winner != 'NONE') {
        phase = 'restart';
        console.log('Current Phase: ' + phase);
        main();
    }
}

/**
 * Phase Function to restart the game
 *      - Resets all stats
 */
function restartGame() {
    console.log('Prior Phase: ' + phase);
    if (phase == 'restart' && winner != 'NONE') {
        console.log('Current Phase: ' + phase);
        phase = 'selection';

        // Resets game
        player1Deck = [];
        player2Deck = [];
        p1Scores = {
            elementScore: 0, // Counts winning elements that have won
            pyroWin: false,
            hydroWin: false,
            cryoWin: false,
            pyroScore: 0,
            hydroScore: 0,
            cryoScore: 0
        }

        p2Scores = {
            elementScore: 0,
            pyroWin: false,
            hydroWin: false,
            cryoWin: false,
            pyroScore: 0,
            hydroScore: 0,
            cryoScore: 0
        }

        winner = 'NONE';

        main();
    }
}