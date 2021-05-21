    
    let cardSpacing = 30; // Spacing of the cards in the deck

// Defines the dimensions of a standard card
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

// Defines the dimensions of a wide card
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
    // Display a normal card
    function displayCard(Coordinates, Card, CardType){

        if (Card == undefined){ return; } 

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
        elementImg.onload = function(){ 
            ctx.drawImage(elementImg, 
                        Coordinates.x + CardType.imgOffsetX, 
                        Coordinates.y + CardType.imgOffsetY, 
                        CardType.imgSize, CardType.imgSize); 
            }
    }

    // Sets Shadow Function
    function setShadow(colour, offSetX, offSetY, blur){
        ctx.shadowColor = colour;
        ctx.shadowOffsetX = offSetX;
        ctx.shadowOffsetY = offSetY;
        ctx.shadowBlur = blur;
    }

    function setGradient(gradientStart, gradientEnd){ 
        return { stopStart: gradientStart, stopEnd: gradientEnd }
    }

    // Gets Gradient
    function getGradient(element){
        switch (element){
            case 'PYRO': return setGradient('#FFA360', '#FF0F00');
            case 'CRYO': return setGradient('#36DDE8', '#065050');
            case 'HYDRO': return setGradient('#ABE1FF', '#1D4AEC');
        }
    }

    // Gets Element Image
    function addImage(imgSrc, size){
        let img = new Image(size, size);
        img.src = imgSrc;
        return img;
    }

    function getImage(element, size){
        let pyroImage = addImage('images/pyro_200.png', size);    
        let cryoImage = addImage('images/cryo_200.png', size);
        let hydroImage = addImage('images/hydro_200.png', size);
        
        switch (element){
            case 'PYRO': return pyroImage;
            case 'CRYO': return cryoImage;
            case 'HYDRO': return hydroImage;
        }
    }

    // Displays the deck
    function displayDeck(coords, deck){
        
        for (let i = 0; i < 5; i++){
        let x = coords.x + (NORMAL_CARD.W * i) + (cardSpacing * i);
        console.log(x);
        
        displayCard({x: x, y: coords.y}, deck[i], NORMAL_CARD);
        }
    }

    function displayField(){
        if (field[0][0].getElement != undefined){
            displayCard({
                x: (canvas.width / 2) - (WIDE_CARD.W / 2),
                y: (canvas.height / 2) - (WIDE_CARD.H / 2 - 90)},
                field[0][0], WIDE_CARD);
        
            displayCard({
                x: (canvas.width / 2) - (WIDE_CARD.W / 2),
                y: (canvas.height/ 2) - (WIDE_CARD.H / 2 + 90)},
                field[0][1], WIDE_CARD);
        }
    }