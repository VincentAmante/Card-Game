
// Defines the dimensions of a standard card
    const NORMAL_CARD = {
        WIDTH: 95,
        HEIGHT: 130,
        RADIUS: 10
    }

// Display a normal card
function displayCard(Coordinates, Card){
    let linGrd = ctx.createLinearGradient(Coordinates.x, Coordinates.y, NORMAL_CARD.WIDTH, NORMAL_CARD.HEIGHT); 

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
    ctx.textAlign = 'left';
    ctx.textBaseLine = 'bottom';
    ctx.fillText(Card.getPower(), NORMAL_CARD.WIDTH - 13, NORMAL_CARD.HEIGHT - 3, 60);

    // Adds Images
    let pyroImage = document.getElementById("pyro");
    ctx.drawImage(pyroImage, Coordinates.x + 17, Coordinates.y + 30, 65, 65);
}

function getGradient(element){
    switch (element){
        case 'PYRO':
            return {
                stopStart: '#FF8328',
                stopEnd: '#FF0F00'
            }
        case 'CRYO':
            return {
                stopStart: '#36DDE8',
                stopEnd: '#065050'
            }
        case 'HYDRO':
            return {
                stopStart: '#48BDFF',
                stopEnd: '#1D4AEC'
            }
    }
}