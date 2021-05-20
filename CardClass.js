/*
    === Card Class ===
    Purpose:
        - Manage the base functionality of a card
        - Contains the type of card and its associated number / power
*/

// Contains the list of elements a card can have
//  - Also contains a null element just in case

const ELEMENTS = ['PYRO', 'CRYO', 'HYDRO'];
const ELEMENT_NULL = 'NULL';

// Contains the minimum and maximum power level a card can have
const MIN_POWER = 1;
const MAX_POWER = 10;

/*
    This creates a card object
        - Should contain validation for parameters
        - if a card contains an ability, it goes here

    Fields:
        <element> [TEXT]: the element that the card corresponds to
            - The parameter validates the type, making sure it's one of the existing elements
            - If no valid type is found, it auto-assigns it pyro and sends an error log

        <power> [NUMBER]: a number associated to the card, deciding its power level 
            - the power level is validated to be within the limits of the minimum and maximum power level
                (defined above)
            - otherwise, it just assigns the minimum powerlevel and sends an error logs
            
*/

class Card {

    // PRIVATE FIELDS & METHODS
    #element;
    #power;

    // Template for creating a new element
    constructor(element, power){

        // Element Validation
        if (element >= 0 && element <= ELEMENTS.length){
            this.#element = ELEMENTS[element];
        }
        else {
            this.#element = ELEMENT_NULL;
            console.log('ERROR: No valid element was found for this card!')
        }

        // Power Level Validation
        if (power >= MIN_POWER && power <= MAX_POWER){
            this.#power = power;
        }
        else {
            this.#power = MIN_POWER;
            console.log('ERROR: Invalid power level assigned!')
        }

        // FOR DEBUGGING
        console.log('New card was created with ELEMENT: ' + this.#element + ' and power level of ' + this.#power);
    }


    getElement(){
        return this.#element;
    }
    getPower(){
        return this.#power;
    }
    showCard(){
        if (this == undefined){
            console.log('ERROR: Element is invalid');
            return;
        }
        
        // Debugging
        console.log('ELEMENT: ' + this.#element);
        console.log('POWER LEVEL: ' + this.#power);
    }
}