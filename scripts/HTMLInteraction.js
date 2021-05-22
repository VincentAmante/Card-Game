function displayScores(){

    // Draws Player 1's Scores
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#f4d8a8';
    ctx.roundRect(22, 224, 260, 320, 10);
    setShadow("#000000", 2, 4, 10); // Adds Shadow
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '40px GenshinFont';
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'bottom';
    
    setShadow(undefined, 0, 0, 0); // Removes Shadow
    ctx.globalAlpha = 1;

    ctx.fillText("Player 1", 145, 280, 300);
    ctx.fillText("Scores", 145, 320, 300);

    ctx.font = '20px GenshinFont';
    ctx.textAlign = 'left';
    ctx.textBaseLine = 'bottom';

    let p1BaseY = 380;
    let p1LeftBaseX = 40;
    let p1RightBaseX = 200;
    let verticalSpacing = 40;

    ctx.fillText("Unique Wins: ", p1LeftBaseX, p1BaseY, 300);
    ctx.fillText("Pyro Wins: ", p1LeftBaseX, p1BaseY + (verticalSpacing * 1), 300);
    ctx.fillText("Cryo Wins: ", p1LeftBaseX, p1BaseY + (verticalSpacing * 2), 300);
    ctx.fillText("Hydro Wins: ", p1LeftBaseX, p1BaseY + (verticalSpacing * 3), 300);

    ctx.fillText(p1Scores.elementScore + ' / ' + MATCH_WIN, p1RightBaseX, p1BaseY, 300);
    ctx.fillText(p1Scores.pyroScore + ' / ' + MATCH_WIN, p1RightBaseX, p1BaseY + (verticalSpacing * 1), 300);
    ctx.fillText(p1Scores.cryoScore + ' / ' + MATCH_WIN, p1RightBaseX, p1BaseY + (verticalSpacing * 2), 300);
    ctx.fillText(p1Scores.hydroScore + ' / ' + MATCH_WIN, p1RightBaseX, p1BaseY + (verticalSpacing * 3), 300);


    // Draws Player 2's Scores
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#f4d8a8';
    ctx.roundRect(742, 224, 260, 320, 10);
    setShadow("#000000", 2, 4, 10); // Adds Shadow
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '40px GenshinFont';
    ctx.textAlign = 'center';
    ctx.textBaseLine = 'bottom';
    
    setShadow(undefined, 0, 0, 0); // Removes Shadow
    ctx.globalAlpha = 1;

    ctx.fillText("Player 2", 145 + 720, 280, 300);
    ctx.fillText("Scores", 145 + 720, 320, 300);

    ctx.font = '20px GenshinFont';
    ctx.textAlign = 'left';
    ctx.textBaseLine = 'bottom';

    let p2BaseY = 380;
    let p2LeftBaseX = 40 + 720;
    let p2RightBaseX = 200 + 720;

    ctx.fillText("Unique Wins: ", p2LeftBaseX, p2BaseY, 300);
    ctx.fillText("Pyro Wins: ", p2LeftBaseX, p2BaseY + (verticalSpacing * 1), 300);
    ctx.fillText("Cryo Wins: ", p2LeftBaseX, p2BaseY + (verticalSpacing * 2), 300);
    ctx.fillText("Hydro Wins: ", p2LeftBaseX, p2BaseY + (verticalSpacing * 3), 300);

    ctx.fillText(p2Scores.elementScore + ' / ' + MATCH_WIN, p2RightBaseX, p2BaseY, 300);
    ctx.fillText(p2Scores.pyroScore + ' / ' + MATCH_WIN, p2RightBaseX, p2BaseY + (verticalSpacing * 1), 300);
    ctx.fillText(p2Scores.cryoScore + ' / ' + MATCH_WIN, p2RightBaseX, p2BaseY + (verticalSpacing * 2), 300);
    ctx.fillText(p2Scores.hydroScore + ' / ' + MATCH_WIN, p2RightBaseX, p2BaseY + (verticalSpacing * 3), 300);
}


let system = document.getElementById('results');
function winCheck(){
    if (p1Scores.elementScore >= MATCH_WIN){
            winner = 'Player 1';
            system.innerHTML = 'Player 1 has won due to winning with all three elements!';
            matchWin.play();
        }
        
    else if (p1Scores.pyroScore >= MATCH_WIN
        || p1Scores.cryoScore >= MATCH_WIN
        || p1Scores.hydroScore >= MATCH_WIN){
            winner = 'Player 1';
            system.innerHTML = 'Player 1 has won due to winning thrice with one element!';
            matchWin.play();
        }

    else if (p2Scores.elementScore >= MATCH_WIN){
            winner = 'Player 2';
            system.innerHTML = 'Player 2 has won due to winning thrice with all three elements!';
            matchLose.play();
        }

    else if (p2Scores.pyroScore >= MATCH_WIN
        || p2Scores.cryoScore >= MATCH_WIN
        || p2Scores.hydroScore >= MATCH_WIN){
            winner = 'Player 2';
            system.innerHTML = 'Player 2 has won due to winning thrice with one element!';
            matchLose.play();
        }
}

function announceMessage(message){
    system.innerHTML = message;
}