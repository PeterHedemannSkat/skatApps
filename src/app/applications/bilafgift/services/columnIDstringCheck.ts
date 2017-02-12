import { validTypes } from '../infrastructure/interfaces.bilafgifter';

export class columnSearch {

    constructor(public rules:validTypes) {}

    checkColumnID(id:string) {

        /* 1. if has specific column ids and id is one of them return true */
        return (this.rules.columnIds && this.rules.columnIds.indexOf(id) > -1) ||

            /* 2... or if stringSearch return true if it's true and no exception exits or true if exceptions exits and these are not present */
            (this.rules.stringSearch && this.stringExtraction(this.rules.stringSearch,id) &&         
                (!this.rules.notTheseIds || 
                    (this.rules.notTheseIds &&  this.rules.notTheseIds.indexOf(id) == -1)
                )
            ) || /* 3... or */

            (!this.rules.stringSearch && this.rules.notTheseIds && this.rules.notTheseIds.indexOf(id) == -1)

    }

    private stringExtraction(patterns:string[],id:string) {

        return (patterns[0] == '*') 
            ? true
            : patterns.reduce((p,v) => {
                let a = new RegExp(`_${v}_`)
                return id.match(a) ? true : p
            },false)

    } 
}
