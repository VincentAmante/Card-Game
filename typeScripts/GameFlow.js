var NorthStatus;
(function (NorthStatus) {
    NorthStatus[NorthStatus["LOSE"] = -1] = "LOSE";
    NorthStatus[NorthStatus["DRAW"] = 0] = "DRAW";
    NorthStatus[NorthStatus["WIN"] = 1] = "WIN";
})(NorthStatus || (NorthStatus = {}));
// const compareElements = (northCard: Card, southCard: Card) => {
//     const North = NorthStatus;
//     /* 
//         This matrix shows the results of the element comparison
//             - The vertical axis represents the North Player's element
//             - The horizontal axis represents the South Player's element
//             - The positions are based on the ELEMENTS array
//                 - 0: PYRO, 1: CRYO, 2: HYDRO
//             - As an example [0][1] means North has Pyro, and South has Cryo
//                 - This means North wins the round based on element (returns 1)
//     */
//     const elementComparison = [
//         [North.DRAW, North.WIN, North.LOSE]
//         [North.LOSE, North.DRAW, North.WIN]
//         [North.WIN, North.LOSE, North.DRAW]
//     ]
//     return elementComparison[northCard.element][southCard.element];
// }
console.log(NorthStatus.DRAW);
