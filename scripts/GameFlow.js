/*
    === Game Control ===
        Purpose:
            - Dictates the flow of the game
            - Controls what happens each round
            - Repeats game until a winner is chosen
            - Decides the win conditions
            
            EXTRA: (Unintended features that should be separated sometime)
            - Contains HTML messaging
        
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
    let element = Card.getElement();
    
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

/*
    Checks to see if the player has won
        - TODO: Decide what happens when a winner is found
*/

let system = document.getElementById('results');

function winCheck(){
    if (p1Scores.elementScore >= MATCH_WIN){
            winner = 'Player 1';
            system.innerHTML = 'You won due to winning once with all three elements!';
            matchWin.play();
        }
        
    else if (p1Scores.pyroScore >= MATCH_WIN
        || p1Scores.cryoScore >= MATCH_WIN
        || p1Scores.hydroScore >= MATCH_WIN){
            winner = 'Player 1';
            system.innerHTML = 'You won due to winning thrice with one element!';
            matchWin.play();
        }

    else if (p2Scores.elementScore >= MATCH_WIN){
            winner = 'Player 2';
            system.innerHTML = 'Enemy AI has won due to winning once with all three elements!';
            matchLose.play();
        }

    else if (p2Scores.pyroScore >= MATCH_WIN
        || p2Scores.cryoScore >= MATCH_WIN
        || p2Scores.hydroScore >= MATCH_WIN){
            winner = 'Player 2';
            system.innerHTML = 'Enemy AI has won due to winning thrice with one element!';
            matchLose.play();
        }
}

function chooseCards(playerChoice){
    if (phase == 'selection'){
        chooseCard(player1Deck, playerChoice, PLAYER1);
        console.log('card 1 was chosen');
        computerChoice();
        console.log('card 2 was chosen');
    }
}

// Function compares cards
//  - Is currently primitive, may need to find better way
function compareCards(index){
    p1Card = field[index][PLAYER1];
    p2Card = field[index][PLAYER2];

    let p1CardElement = ELEMENTS.indexOf(p1Card.getElement());
    let p2CardElement = ELEMENTS.indexOf(p2Card.getElement());

    let writeElement = (element) => ({
        'PYRO': 'Pyro',
        'CRYO': 'Cryo',
        'HYDRO': 'Hydro'}[element])

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
    if (elementResult == WIN){
        addScore(p1Scores, p1Card);
        system.innerHTML = 'You win as ' + p1CardElement + ' beats ' + p2CardElement;
        roundWin.play();
    }

    else if (elementResult == LOSE){
        addScore(p2Scores, p2Card);
        system.innerHTML = 'Enemy AI wins as ' + p2CardElement + ' beats ' + p1CardElement;
        roundLose.play();
    }

    else if (elementResult == DRAW){

        if (p1Card.getPower() > p2Card.getPower()){
            addScore(p1Scores, p1Card);
            system.innerHTML = 'You win the round due to having a higher power level card!';
            roundWin.play();
        }
        else if (p1Card.getPower() < p2Card.getPower()){
            addScore(p2Scores, p2Card);
            system.innerHTML = 'Enemy AI wins the round due to having a higher power level card!';
            roundLose.play();
        }
        else if (p1Card.getPower() == p2Card.getPower()){
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

let phase = 'startGame';

function startGame(){
    console.log('Prior Phase: ' + phase)
    if (phase == 'startGame'){
        phase = 'selection';
        console.log('Current Phase: ' + phase);
        main();
    }
    
    bgm.play();
}
function cardChosen(){
    console.log('Prior Phase: ' + phase);
    if (phase == 'selection'){
        phase = 'comparison';
        console.log('Current Phase: ' + phase);
        main();
    }
}

function finishRound(){
    console.log('Prior Phase: ' + phase);
    if (phase == 'comparison' && winner == 'NONE'){    
        phase = 'selection';
        console.log('Current Phase: ' + phase);
        main();
    }
    else if (phase == 'comparison' && winner != 'NONE'){
        phase = 'restart';
        console.log('Current Phase: ' + phase);
        main();
    }
}

function restartGame(){
    console.log('Prior Phase: ' + phase);
    if (phase == 'restart' && winner != 'NONE'){    
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

function displayScores(){
    // Draws Player 1's Scores
    drawScoreboard(22);
    styleHeading();
    
    setShadow(undefined, 0, 0, 0); // Removes Shadow
    ctx.globalAlpha = 1;

    ctx.fillText("Player 1", 145, 280, 300);
    ctx.fillText("Scores", 145, 320, 300);

    styleText();

    let p1BaseY = 380;
    let p1LeftBaseX = 40;
    let p1RightBaseX = 200;
    let verticalSpacing = 40;

    writeText("Unique Wins: ", p1LeftBaseX, p1BaseY, 300, p1Scores.elementScore);
    writeText("Pyro Wins: ", p1LeftBaseX, p1BaseY + (verticalSpacing * 1), 300, p1Scores.pyroScore);
    writeText("Cryo Wins: ", p1LeftBaseX, p1BaseY + (verticalSpacing * 2), 300, p1Scores.cryoScore);
    writeText("Hydro Wins: ", p1LeftBaseX, p1BaseY + (verticalSpacing * 3), 300, p1Scores.hydroScore);

    writeText(p1Scores.elementScore + ' / ' + MATCH_WIN, p1RightBaseX, p1BaseY, 300, p1Scores.elementScore);
    writeText(p1Scores.pyroScore + ' / ' + MATCH_WIN, p1RightBaseX, p1BaseY + (verticalSpacing * 1), 300, p1Scores.pyroScore);
    writeText(p1Scores.cryoScore + ' / ' + MATCH_WIN, p1RightBaseX, p1BaseY + (verticalSpacing * 2), 300, p1Scores.cryoScore);
    writeText(p1Scores.hydroScore + ' / ' + MATCH_WIN, p1RightBaseX, p1BaseY + (verticalSpacing * 3), 300, p1Scores.hydroScore);


    // Draws Player 2's Scores
    drawScoreboard(742);
    
    styleHeading();
    
    setShadow(undefined, 0, 0, 0); // Removes Shadow
    ctx.globalAlpha = 1;

    ctx.fillText("Player 2", 145 + 720, 280, 300);
    ctx.fillText("Scores", 145 + 720, 320, 300);

    styleText();

    let p2BaseY = 380;
    let p2LeftBaseX = p1LeftBaseX + 720;
    let p2RightBaseX = p1RightBaseX + 720;

    writeText("Unique Wins: ", p2LeftBaseX, p2BaseY, 300, p2Scores.elementScore);
    writeText("Pyro Wins: ", p2LeftBaseX, p2BaseY + (verticalSpacing * 1), 300, p2Scores.pyroScore);
    writeText("Cryo Wins: ", p2LeftBaseX, p2BaseY + (verticalSpacing * 2), 300, p2Scores.cryoScore);
    writeText("Hydro Wins: ", p2LeftBaseX, p2BaseY + (verticalSpacing * 3), 300, p2Scores.hydroScore);

    writeText(p2Scores.elementScore + ' / ' + MATCH_WIN, p2RightBaseX, p2BaseY, 300, p2Scores.elementScore);
    writeText(p2Scores.pyroScore + ' / ' + MATCH_WIN, p2RightBaseX, p2BaseY + (verticalSpacing * 1), 300, p2Scores.pyroScore);
    writeText(p2Scores.cryoScore + ' / ' + MATCH_WIN, p2RightBaseX, p2BaseY + (verticalSpacing * 2), 300, p2Scores.cryoScore);
    writeText(p2Scores.hydroScore + ' / ' + MATCH_WIN, p2RightBaseX, p2BaseY + (verticalSpacing * 3), 300, p2Scores.hydroScore);

    function writeText(message, posX, posY, limit, content) {
        (content >= 3) ? ctx.fillStyle = "#39FF14" : ctx.fillStyle = "#FFFFFF";
        ctx.fillText(message, posX, posY, limit);
        ctx.fillStyle = "#FFFFFF";
    }

    function styleText() {
        ctx.font = '20px GenshinFont';
        ctx.textAlign = 'left';
        ctx.textBaseLine = 'bottom';
    }

    function styleHeading() {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '40px GenshinFont';
        ctx.textAlign = 'center';
        ctx.textBaseLine = 'bottom';
    }

    function drawScoreboard(posX) {
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = '#f4d8a8';
        ctx.roundRect(posX, 224, 260, 320, 10);
        setShadow("#000000", 2, 4, 10); // Adds Shadow
        ctx.fill();
    }
}

function displayNames(){
    ctx.font = '28px GenshinFont';
    ctx.textAlign = 'left';
    ctx.textBaseLine = 'bottom';

    console.log(winner);
    (winner == 'Player 1') ? ctx.fillStyle = "#39FF14" : ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Allied You", 20, 750, 200);
    ctx.fillStyle = '#FFFFFF';

    (winner == 'Player 2') ? ctx.fillStyle = "#39FF14" : ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Enemy AI", 860, 35, 200);
    ctx.fillStyle = '#FFFFFF';
}