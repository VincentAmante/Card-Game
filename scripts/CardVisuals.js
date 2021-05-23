/*
    === CardVisuals.js ===
    Purpose:
        - Handle most if not all visuals of the game
        - Primarily contains tools to display the various elements in the canvas
*/

/**Spacing of cards in the deck */
let cardSpacing = 30;

/** Contains dimensions of a normal card inside the deck */
const NORMAL_CARD = {
    W: 95, // Width
    H: 130, // Height
    R: 10, // Radius
    fontSize: '20px',
    txtOffsetX: 12,
    txtOffsetY: 8,
    imgSize: 65,
    imgOffsetX: 17,
    imgOffsetY: 30
}

/** Contains dimensions and sizes of a card on the field */
const WIDE_CARD = {
    W: 240,
    H: 160,
    R: 10,
    fontSize: '48px',
    txtOffsetX: 15,
    txtOffsetY: 15,
    imgSize: 120,
    imgOffsetX: 55,
    imgOffsetY: 20
}

/**
 * Displays the various cards
 * 
 * @param {Object} Coordinates - Coordinates of the card in the canvas
 * @param {Card} Card - Card to be displayed 
 * @param {Object} CardType - Contains dimensions of the cards (see top of file)
 * 
 * @returns The card displayed in the canvas 
 */
function displayCard(Coordinates, Card, CardType) {

    if (Card == undefined) { return; } // Ends function if a card does not exist

    let linGrd = ctx.createLinearGradient(Coordinates.x, Coordinates.y, Coordinates.x + CardType.W, Coordinates.y + CardType.H);

    // Draws Rounded Rectangle
    ctx.roundRect(Coordinates.x, Coordinates.y, CardType.W, CardType.H, CardType.R);

    // Adds Gradient
    gradient = getGradient(Card.getElement());
    linGrd.addColorStop(0, gradient.stopStart);
    linGrd.addColorStop(1, gradient.stopEnd);
    ctx.fillStyle = linGrd;

    setShadow("#000000", 2, 4, 10); // Adds Shadow

    ctx.fill();

    setShadow(undefined, 0, 0, 0); // Removes Shadow

    // Adds text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = CardType.fontSize + ' ' + 'GenshinFont';
    ctx.textAlign = 'right';
    ctx.textBaseLine = 'bottom';
    ctx.fillText(Card.getPower(),
        Coordinates.x + CardType.W - CardType.txtOffsetX,
        Coordinates.y + CardType.H - CardType.txtOffsetY, 60);

    // Adds Image, draws after loading
    let elementImg = getImage(Card.getElement());
    elementImg.onload = function () {
        ctx.drawImage(elementImg,
            Coordinates.x + CardType.imgOffsetX,
            Coordinates.y + CardType.imgOffsetY,
            CardType.imgSize, CardType.imgSize);
    }
}

/**
 * Sets the shadow's values
 * 
 * @param {string} colour - hex value of the shadow colour 
 * @param {number} offSetX 
 * @param {number} offSetY 
 * @param {number} blur 
 */
function setShadow(colour, offSetX, offSetY, blur) {
    ctx.shadowColor = colour;
    ctx.shadowOffsetX = offSetX;
    ctx.shadowOffsetY = offSetY;
    ctx.shadowBlur = blur;
}

/**
 * 
 * @param {string} gradientStart - top left value of the gradient
 * @param {string} gradientEnd - bottom right value of the gradient
 * @returns Object containing gradient values
 */
function setGradient(gradientStart, gradientEnd) {
    return { stopStart: gradientStart, stopEnd: gradientEnd }
}

/**
 * 
 * @param {string} element - Element to make the gradient with 
 * @returns Gradient of the element
 */
function getGradient(element) {
    switch (element) {
        case 'PYRO': return setGradient('#FFA360', '#FF0F00');
        case 'CRYO': return setGradient('#36DDE8', '#065050');
        case 'HYDRO': return setGradient('#ABE1FF', '#1D4AEC');
    }
}

/**
 * General purpose function to create a new square image
 * 
 * @param {url} imgSrc - Path to the image 
 * @param {number} size - Size of the square image 
 * @returns image
 */
function addImage(imgSrc, size) {
    let img = new Image(size, size);
    img.src = imgSrc;
    return img;
}

/**
 * Gets the image of an element
 * 
 * @param {string} element - Element of Card
 * @param {number} size - size of image desired
 * @returns Image of the corresponding element
 */
function getImage(element, size) {
    let pyroImage = addImage('images/pyro_200.png', size);
    let cryoImage = addImage('images/cryo_200.png', size);
    let hydroImage = addImage('images/hydro_200.png', size);

    switch (element) {
        case 'PYRO': return pyroImage;
        case 'CRYO': return cryoImage;
        case 'HYDRO': return hydroImage;
    }
}

/**
 * Displays the deck 
 * 
 * @param {Object} coords - Coordinates of the deck (top-leftmost corner)
 * @param {Array} deck - Deck to be displayed
 */
function displayDeck(coords, deck) {

    for (let i = 0; i < 5; i++) {
        let x = coords.x + (NORMAL_CARD.W * i) + (cardSpacing * i);

        displayCard({ x: x, y: coords.y }, deck[i], NORMAL_CARD);
    }
}

/** Displays the field cards (if exists) */
function displayField() {
    if (field[0][0].getElement != undefined) {
        displayCard({
            x: (canvas.width / 2) - (WIDE_CARD.W / 2),
            y: (canvas.height / 2) - (WIDE_CARD.H / 2 - 90)
        },
            field[0][0], WIDE_CARD);

        displayCard({
            x: (canvas.width / 2) - (WIDE_CARD.W / 2),
            y: (canvas.height / 2) - (WIDE_CARD.H / 2 + 90)
        },
            field[0][1], WIDE_CARD);
    }
}

/**
 * Displays a messsage announcing the winner
 *      - Also coloured based on if the user or AI wins
 * @param {string} winner - winner of the game 
 */
function displayWinner(winner) {
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#1E1E1E';
    ctx.roundRect(canvas.width / 2 - 340, canvas.height / 2 - 115, 680, 250, 10);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = '72px GenshinFont';
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'bottom';

    if (winner == 'Player 1') {
        ctx.fillStyle = '#39FF14';
        matchWinner = 'You win!';
    }
    else {
        ctx.fillStyle = '#FF3131';
        matchWinner = 'Enemy AI Wins!';
    }

    ctx.fillText(matchWinner, canvas.width / 2, canvas.height / 2, 900);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '36px GenshinFont';
    ctx.fillText('Tap to restart!', canvas.width / 2, canvas.height / 2 + 80, 900);
    setShadow(undefined, 0, 0, 0);
}

/** Displays splash screen */
function splashScreen() {
    ctx.fillStyle = "#FFFFFF";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    setShadow("#656565", 4, 4, 10); // Adds Shadow
    ctx.fillStyle = '#101010';
    ctx.font = '96px GenshinFont';
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'bottom';

    ctx.fillText('Janken Impact', canvas.width / 2, canvas.height / 2 + 150, 900);

    ctx.font = '48px GenshinFont';
    ctx.fillText('Tap to play', canvas.width / 2, canvas.height / 2 + 225, 900);

    let icon = new Image();
    icon.src = 'images/gameIcon.png';

    icon.onload = function () {
        ctx.drawImage(icon,
            canvas.width / 2 - 150,
            canvas.height / 2 - 275,
            262, 324);
    }
    setShadow(undefined, 0, 0, 0); // Removes Shadow
}

/** Displays restart screen */
function restartScreen() {
    ctx.fillStyle = "#FFFFFF";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    setShadow("#656565", 4, 4, 10); // Adds Shadow
    ctx.fillStyle = '#101010';
    ctx.font = '96px GenshinFont';
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'bottom';

    ctx.fillText('Game Restarted', canvas.width / 2, canvas.height / 2 + 150, 900);

    ctx.font = '48px GenshinFont';
    ctx.fillText('Tap to begin new match', canvas.width / 2, canvas.height / 2 + 225, 900);

    let icon = new Image();
    icon.src = 'images/gameIcon.png';

    icon.onload = function () {
        ctx.drawImage(icon,
            canvas.width / 2 - 150,
            canvas.height / 2 - 275,
            262, 324);
    }
    setShadow(undefined, 0, 0, 0); // Removes Shadow
}

/** Displays the names of the players beside their deck */
function displayNames() {
    ctx.font = '28px GenshinFont';
    ctx.textAlign = 'left';
    ctx.textBaseLine = 'bottom';

    (winner == 'Player 1') ? ctx.fillStyle = "#39FF14" : ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Allied You", 20, 750, 200);
    ctx.fillStyle = '#FFFFFF';

    (winner == 'Player 2') ? ctx.fillStyle = "#39FF14" : ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Enemy AI", 860, 35, 200);
    ctx.fillStyle = '#FFFFFF';
}

/** Displays the scoreboard of the players */
function displayScores() {
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