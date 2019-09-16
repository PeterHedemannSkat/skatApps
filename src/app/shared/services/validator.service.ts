export interface specialOps {
    type:string,
    data:string
}

export interface regMapElement {
     type?:string,
     id?:string,
     regExpression?:string,
     errorTxt?:string,
     specialOperation?:specialOps,
     event?:string
}

export interface validateSet {
    element:string,
    regExContainer:regMapElement[],
    id?:string,
}

export interface errorSet {
    id:string,
    txt:string
}

export class Validator {

     private regmap:regMapElement[] = [{
         type:'number',
         regExpression:'^[0-9]+$'
     },{
         type:'notEmpty',
         regExpression:'.+'
     }];

     private container:validateSet[] = []

     add (set:validateSet[]) {
         this.container = this.container.concat(set)
         return this
     }

     private find (id:string) {
         return this.container.find(el => el.id === id)
     }

     private checkElement (el:validateSet) {
         return el.regExContainer.reduce((p,v) => {
             return this.validateElement(el.element,v) ? p : false
         },true)
     }

     private validationErrors (el:validateSet) {
         return el.regExContainer
            .filter(v => {
                return !(this.validateElement(el.element,v))
            })
     }

     private validateElement (element:string,el:regMapElement) {

         let elementState:boolean = false

         if (el.type === 'special' && el.specialOperation) {

             let data = el.specialOperation.data

             switch (el.specialOperation.type) {

                 case 'range':{

                    let split   = data.split('-'),
                        from    = parseFloat(split[0]),
                        to      = parseFloat(split[1])

                    if (new RegExp('^[0-9]+$').test(element)) {

                        let number = parseFloat(element);
                        elementState = number >= from && number <= to

                    }
                 } 
             }

         } else {

             let regExpression = (el.type && !el.regExpression) ? this.regmap.find(element => element.type === el.type).regExpression : el.regExpression;
             elementState = new RegExp(regExpression).test(element)
             
         }

         return elementState
     }

     errorsOnInput (id?:string) {
         let el:validateSet = (id) ? this.find(id) : this.container[0]
         return this.validationErrors(el)
     }

     checkAll () {

         return this.container.reduce((p,v) => {        
             return this.checkElement(v) ? p : false;
         },true)
     }


 }