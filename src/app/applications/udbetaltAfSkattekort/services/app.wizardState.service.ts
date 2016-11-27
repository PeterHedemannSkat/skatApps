import { Injectable } from '@angular/core';
import { Inject } from '@angular/core'
import { taxableIncome } from './taxableincome.service';
import { getDataService } from './getData.service';
import { Observable } from 'rxjs/Observable'; 
import { languageText } from '../../../shared/interfaces/interfaceslanguage';
import { ErrorContainer } from '../data/validation.data'

import { Validator,regMapElement,specialOps } from '../../../shared/shared';


interface TaxCard {
    withHoldingRate:string,
    deduction:string
}

interface Income {
    appliedTaxCard:string,
    sum:string,
    period:string,
    type:string,
    from:string
}


Injectable()
export class WizardState {
    
    constructor (@Inject(getDataService) public textService:getDataService) {


    }
    
    taxcard:TaxCard = {
        deduction:"",
        withHoldingRate:""
    }  

    incomes: taxableIncome[] = [];
    currentWizardStepContent:Object = {};
    currentStepLists:Object = {};
    thisincome:number = 0;
    trin:number = 0;
    language:string;
    editingIncome:boolean = false;
    stepValidationOk:boolean = false;
    errorTxt:Object = {};


    errorStates:regMapElement[] = ErrorContainer

    addRangeError (id:string,from:number,to:number) {

        let errorObject = {
            type:'special',
            id:id,
            errorTxt:'',
            specialOperation:{
                type:'range',
                data:`${from}-${to}`,
                X:from,
                Y:to
            },
            event:'blur'
        }

        this.errorStates.push(errorObject)

    }

    private parseUrl (txt:string):any {

        var obj = {}

        txt.split('&').forEach(el => {

            var split   = el.split('='),
                key     = split[0],
                value   = split[1]

            obj[key] = value

        })

        return obj

    }

    getValitionSet (list:string[]) {

        /*returner ErrorVal. Finder dem i errorState (via find) */
        return list.map(id => {

            /* måske burde denne køres inden */
            if (id.charAt(0) === '!') {

                let indexOfSep      = id.indexOf('?'),
                    method          = id.slice(1,indexOfSep),
                    parametersTxt   = id.slice(indexOfSep+1),
                    ID              = method + parametersTxt,
                    parameterObj    = this.parseUrl(parametersTxt)
 
                /* hvis validate obj ikke eksisterer så skab det, hvis det eksisterer behøves intet */
                if (!this.errorStates.find(el => el.id === ID)) {

                    switch (method) {
                        case 'range': {
                            this.addRangeError(ID,parameterObj.from,parameterObj.to)     
                        }
                        /* other methods .... */    
                    }
                    /* attach error text to the above added validateObj */
                     this.getText('general','errorMessages').subscribe(el => {
                         /* now a new validateObj exits inside errorState, find it, add text, do evt variable interpolation  */ 
                        let containerElement    = this.errorStates.find(el => el.id === ID),     
                            txtRaw              = el.find(element => element.id === method)[this.language],
                            variables:string[]  = ['X','Y','Z']

                            variables.forEach(variable => {
                                if (txtRaw.indexOf(variable) > -1) txtRaw = txtRaw.replace(variable,containerElement.specialOperation[variable])  
                            })
                            
                        containerElement.errorTxt = txtRaw
                                
                     })                    
                }
                return this.errorStates.find(el => el.id === ID)

            } else {
                
                return this.errorStates.find(el => el.id === id)
            }
        })
    }

    setErrorTxt () {

        this.getText('general','errorMessages').subscribe(el => {

            el.forEach(element => {

                let type    = element.id

                var containerElement = this.errorStates.find(errorState => {

                    let matchID = (errorState.type === 'special') ? errorState.specialOperation.type : errorState.type;
                    return matchID === type

                })

                let txtRaw:string = element[this.language]

                if (containerElement && containerElement.specialOperation) {

                    let variables:string[] = ['X','Y','Z']

                    variables.forEach(variable => {
                        if (txtRaw.indexOf(variable) > -1) txtRaw = txtRaw.replace(variable,containerElement.specialOperation[variable])  
                    })
                }

                if (containerElement) containerElement.errorTxt = txtRaw

            })
        })
    }

    createIncome ():void {

        let hovedkortExists = this.incomes.reduce((p,v) => {
                return p === true ? true : (v.income.appliedTaxCard === 'hovedkort')
        },false)

        let skattekort = hovedkortExists ? 'bikort' : 'hovedkort'

        this.incomes.push(new taxableIncome(this,{
            appliedTaxCard:skattekort,
            sum:"",
            period:"monthly",
            type:"loonIndkomst",
            from:""
        }))
    } 

    moveHovedkort (from:number,to:number) {

        if (from > -1) this.incomes[from].income.appliedTaxCard = "bikort";
        this.incomes[to].income.appliedTaxCard = "hovedkort";

    }

    getSublevel (level:string,sublevel:string) {
        return this.textService.fetch()
            .filter(element => element.id === level)
            .map(element => element.children.find(element=> element.id === sublevel))
    }

    getselect (level:string,sublevel:string) {
        return this.getSublevel(level,sublevel)
            .map(element => element.children.map(element => {
                return {value:element.id,text:element[this.language]}
            }))
    }

    getText (level:string,sublevel:string) {
        return this.getSublevel(level,sublevel).map(element => element.children)
    }

    printLocalContent (content:Array<string>[]) {
        content.forEach(v => {
            this.getText(v[0],v[1]).subscribe(element => {
                element.forEach(element => {
                    this.currentWizardStepContent[element.id] = element[this.language]
                })
            })
        })
    }

    printLocalLists (selects:Array<string>) {
        selects.forEach(v => {
            this.getselect('selects',v).subscribe(element => {this.currentStepLists[v] = element})       
        })
    }
}   