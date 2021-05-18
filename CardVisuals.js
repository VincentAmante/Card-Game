
// Defines the dimensions of a standard card
    const NORMAL_CARD = {
        WIDTH: 95,
        HEIGHT: 130,
        RADIUS: 10
    }

// Display a normal card
function displayCard(Coordinates, Card){
    let linGrd = ctx.createLinearGradient(Coordinates.x, Coordinates.y, 
        Coordinates.x + NORMAL_CARD.WIDTH, Coordinates.y + NORMAL_CARD.HEIGHT); 

    // Adds Gradient
    ctx.roundRect(Coordinates.x, Coordinates.y, NORMAL_CARD.WIDTH, NORMAL_CARD.HEIGHT, NORMAL_CARD.RADIUS);
    gradient = getGradient(Card.getElement());
    linGrd.addColorStop(0, gradient.stopStart);
    linGrd.addColorStop(1, gradient.stopEnd);
    ctx.fillStyle = linGrd;

    // Adds Shadow
    ctx.shadowColor = "#000000";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 10;
    ctx.fill();

    // removes Shadow
    ctx.shadowColor = undefined;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    // Adds text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '24px Jost';
    ctx.textAlign = 'right';
    ctx.textBaseLine = 'bottom';
    ctx.fillText(Card.getPower(), Coordinates.x + NORMAL_CARD.WIDTH - 13, Coordinates.y + NORMAL_CARD.HEIGHT - 8, 60);

    // Adds Images
    let elementImg = getImage(Card.element); 
    ctx.drawImage(elementImg, Coordinates.x + 17, Coordinates.y + 30, 65, 65);
}

// Gets Gradient
function getGradient(element){
    switch (element){
        case 'PYRO':
            return {
                stopStart: '#FFA360',
                stopEnd: '#FF0F00'
            }
        case 'CRYO':
            return {
                stopStart: '#36DDE8',
                stopEnd: '#065050'
            }
        case 'HYDRO':
            return {
                stopStart: '#ABE1FF',
                stopEnd: '#1D4AEC'
            }
    }
}
const IMG_SIZE = 65;

let pyroImage = new Image(IMG_SIZE, IMG_SIZE);
pyroImage.src = 'images/pyro_200.png'
let cryoImage = new Image(IMG_SIZE, IMG_SIZE);
cryoImage.src = 'images/cryo_200.png'
let hydroImage = new Image(IMG_SIZE, IMG_SIZE);
hydroImage.src = 'images/hydro_200.png'

// Gets Element Image
function getImage(element){
    switch (element){
        case 'PYRO': return pyroImage;
        case 'CRYO': return cryoImage;
        case 'HYDRO': return hydroImage;
    }
}

// Displays the deck
function displayDeck(coords, deck){
    let spacing = 30; //TODO: DECIDE
    
    for (let i = 0; i < 5; i++){
    let x = coords.x + (NORMAL_CARD.WIDTH * i) + (spacing * i);
    console.log(x);
    
    displayCard({x: x, y: coords.y}, deck[i]);
    }
}

function displayField(){
    console.log('trying to display field');
    displayCard({
        x: (canvas.width / 2) - (NORMAL_CARD.WIDTH / 2),
        y: (canvas.height/ 2) - (NORMAL_CARD.HEIGHT / 2 - 100)},
        field[0][0]);

    displayCard({
        x: (canvas.width / 2) - (NORMAL_CARD.WIDTH / 2),
        y: (canvas.height/ 2) - (NORMAL_CARD.HEIGHT / 2 + 100)},
        field[0][1]);
}