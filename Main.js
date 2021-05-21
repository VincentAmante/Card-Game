

let round = 1;

function main(){
        if (winner == 'NONE'){
            switch (phase){
                case 'selection':
                    newRound.play();
                    displayField();
                    system.innerHTML = 'Round ' + round + ' begin!';
                    console.log(player1Deck);
                    console.log(player2Deck);
                    fillDeck();
            
                    ctx.clearRect(0, 0, 1024, 768);
                    displayDeck({x: 419, y: 620}, player1Deck);
                    displayDeck({x: 10, y: 18}, player2Deck);
                    displayScores();
                    break;
                
                case 'comparison':
                    ctx.clearRect(0, 0, 1024, 768);
                    compareCards(0);
                    displayField();
                    displayDeck({x: 419, y: 620}, player1Deck);
                    displayDeck({x: 10, y: 18}, player2Deck);
                    fieldRemove(PLAYER1, 0);
                    fieldRemove(PLAYER2, 0);
                    winCheck();
                    displayScores();
                    round++;
                    break;
            }
        }
    }
    
    let playerCards = []
    for (let i = 0; i < 5; i++){
        x0 = 419 + (NORMAL_CARD.W * i) + (30 * i)
        playerCards[i] = {
            x0: x0,
            x1: x0 + NORMAL_CARD.W,
            
            y0: 620,
            y1: 620 + NORMAL_CARD.H
        }
    }
    
    
    // checks to see if the mouse coordinates is inside the card
    function isInside(mouseSpan, cardSpan){
        let result = (mouseSpan.x >= cardSpan.x0 && mouseSpan.x <= cardSpan.x1
            && mouseSpan.y >= cardSpan.y0 && mouseSpan.y <= cardSpan.y1) ?
            true: // if inside 
            false; // if outside
    
        return result;
    }
    
    function getMouseCoords(e){
        let mouseSpan = {
            x: e.clientX,
            y: e.clientY
        }
    
        return mouseSpan();
    }
    

    window.addEventListener('click', function(e){
        let canvasSpan = canvas.getBoundingClientRect();
        let mouseSpan = {
            x: Math.round(e.clientX - canvasSpan.left),
            y: Math.round(e.clientY - canvasSpan.top)
        }
    
        switch(phase){
            case 'selection':
                for (let i = 0; i < 5; i++){
                    if (isInside(mouseSpan, playerCards[i])){
                        chooseCards(i);
                        cardChosen();
                    }
                }
                break;
            case 'comparison':
                if (isInside(mouseSpan, {x0: 0, x1: canvas.width, y0: 0, y1:canvas.height})){
                    this.setTimeout
                    finishRound();
                }
                break;
        }
    })

    let font = new FontFace('GenshinFont', 'url(font/genshinFont.ttf)');
    font.load().then(function(loaded_face){
        document.fonts.add(loaded_face);
        document.body.style.fontFamily = 'GenshinFont'
        main();
        })