/*
    === Card Class ===
    Purpose:
        - Manage the base functionality of a card
        - Contains the type of card and its associated number / power
*/

// Defines the dimensions of a standard card
    // Not sure if it should be used in the class or left in this file
const CARD_HEIGHT = 100;
const CARD_WIDTH = 50;

// Contains the list of elements a card can have
const ELEMENT_FIRE = 'PYRO';
const ELEMENT_ICE = 'CRYO';
const ELEMENT_WATER = 'HYDRO';

// Contains the minimum and maximum power level a card can have
const MIN_POWER = 1;
const MAX_POWER = 10;

/*
    This creates a card object
        - Should contain validation for parameters
        - if a card contains an ability, it goes here

    Fields:
        @element [TEXT]: the element that the card corresponds to
            - The parameter validates the type, making sure it's one of the three
            - If no valid type is found, it auto-assigns it pyro and sends an error log

        @power [NUMBER]: a number associated to the card, deciding its power level 
            - the power level is validated to be within the limits of the minimum and maximum power level
                (defined above)
            - otherwise, it just assigns the minimum powerlevel and sends an error logs
*/
function Card(element, power){
    // Element Validation
    switch (element){
        case ELEMENT_WATER:
            this.element = ELEMENT_WATER;
            break;

        case ELEMENT_ICE:
            this.element = ELEMENT_ICE;
            break;
        
        case ELEMENT_FIRE:
            this.element = ELEMENT_FIRE;
            break;

        default:
            this.element = ELEMENT_FIRE;
            console.log('ERROR: No valid element was found for this card!')
    }

    // Power Level Validation
    if (power >= MIN_POWER && power <= MAX_POWER){
        this.power = power;
    }
    else {
        this.power = MIN_POWER;
        console.log('ERROR: Invalid power level assigned!')
    }

    // ERROR CHECKING
    console.log('New card was created with ELEMENT: ' + this.element + ' and power level of ' + this.power);

    // TO CONSIDER:
        // Abilities to spice things ups
}


/* 
    === Card Visuals ===
        - This part should help with visualising a card

        - TO-UPDATE: THIS IS MOSTLY PLACEHOLDER CODE AT THE MOMENT
*/


function showCard(Card){
    element = Card.element;
    power = Card.power;

    if (element == undefined){
        console.log('ERROR: Element is invalid');
    }
    
    console.log('ELEMENT: ' + element);
    console.log('POWER LEVEL: ' + power);
}