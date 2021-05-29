
enum NorthStatus {
    ERROR = -2,
    LOSE = -1,
    DRAW = 0,
    WIN = 1
}

const compareElements = (northElement: number, southElement: number) => {

    const North = NorthStatus;

    /* 
        This matrix shows the results of the element comparison
            - The vertical axis represents the North Player's element
            - The horizontal axis represents the South Player's element
            - The positions are based on the Elements enum
                - 0: PYRO, 1: CRYO, 2: HYDRO

            - As an example [0][1] means North has Pyro, and South has Cryo
                - This means North wins the round based on element (returns 1)
    */
    const elementComparison = [
        [North.DRAW, North.WIN, North.LOSE]
        [North.LOSE, North.DRAW, North.WIN]
        [North.WIN, North.LOSE, North.DRAW]
    ]

    return elementComparison[northElement][southElement];
}

const comparePower = (northPower: number, southPower: number) => Math.sign(northPower - southPower);

const compareCard = (northCard: Card, southCard: Card) => {
    let result = {
        victoryType: 'Error: Undetermined!',
        outcome: NorthStatus.ERROR
    }

    let elementalComparison = compareElements(northCard.element, southCard.element)
    let powerComparison = comparePower(northCard.powerLevel, southCard.powerLevel);


}