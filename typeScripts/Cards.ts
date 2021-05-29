
class Card{
    /* ----- Fields ----- */
    static _MIN_POWER = 1;
    static _MAX_POWER = 10;

    private _element: ELEMENTS;
    private _powerLevel: number;
    // private _modifiers: Array<CardModifier> = [];

    /**
     * Creates a new Card using setters
     * 
     * @param element Element of the card
     * @param powerLevel Power Level of the card 
     */
    constructor(element: ELEMENTS, powerLevel: number){
        this.element = element;
        this.powerLevel = powerLevel;
    }

    /* --- Getters and Setters --- */

    get element(){
        return this._element;
    }
    get powerLevel(){
        return this._powerLevel;
    }

    
    set element(element: ELEMENTS){
        if (ELEMENTS[element] == undefined) { 
            throw new Error(`ERROR: Value of ${element} provided, not an element.`);
        }

        this._element = element;
    }

    set powerLevel(powerLevel: number){
        if (powerLevel < Card._MIN_POWER || powerLevel > Card._MAX_POWER){
            throw new Error(`Power Level of ${powerLevel} is outside allowed range (${Card._MIN_POWER} - ${Card._MAX_POWER})`);
        }

        this._powerLevel = powerLevel;
    }

    /* --- Public Methods --- */

    /**
     * Adds a modifier to the card
     * @param modifier 
     */
    // addModifier(modifier: CardModifier){
    //     this._modifiers.push(modifier); 
    // }
}

    // export class CardModifier{
        
    //     static ExistingNames = []
    //     private _name: string;
    //     private _modification: Function;
    //     private _Card: Card;

    //     constructor(name: string, modification: Function){
    //         this.name = name;
    //         this.modification = modification;
    //     }

    //     set name(name: string){
    //         CardModifier.ExistingNames.forEach( (value) => {
    //             if (value == name){
    //                 console.log('ERROR: Name already exists')
    //                 return undefined;
    //             }

    //             this._name = name;
    //             CardModifier.ExistingNames.push(name);
    //         });
    //     }

    //     private set modification(modification){
    //         this._modification = modification;
    //     }

    //     set Card (Card: Card){
    //         this._Card = Card;
    //     }

    //     get Card (){
    //         return this.Card;
    //     }

    //     activate(){
    //         return this._modification;
    //     }
    // }

    let sampleCard = new Card(1, 15);