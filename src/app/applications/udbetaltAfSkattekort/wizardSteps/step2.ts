import {Component,OnInit,skattekortText,WizardState,languageText} from '../infrastructure/wizardressources';
import { taxableIncome } from '../services/taxableincome.service';

interface radioValues {
    value:string,
    text:string
}

interface input {
    labelText:string,
    postfix:string
} 

interface select {
    text:string,
    value:string
}


interface Income {
    appliedTaxCard:string,
    sum:string,
    period:string,
    type:string
}


@Component ({

    template:`
        
        <!--<h2>#{{wizardState.thisincome + 1}} udbetaler </h2>-->

        <div class = "well">

            <selector 
                [label]   = "incomeTypeText[wizardState.language]" 
                [default] = "thisincome.type" 
                [options] = "indkomstTyper"   
                (changed) = "thisincome.type = $event">
            </selector> 

           
            <regular-input *ngIf = "thisincome.type === 'loonIndkomst'"       
                [label]   = "udbetaler.label" 
                [default] = "thisincome.from"
                [placeholder] = "udbetaler.placeholder" 
                (changed) = "thisincome.from = $event">
            </regular-input>  

            <bootstrapRadio *ngIf = "thisincome.type === 'loonIndkomst'" 
                [label] = "periodLabel"
                [default] = "thisincome.period"
                [options] = "periodOptions"
                name      = "periodIncome"      
                (changed) = "thisincome.period = $event">
            </bootstrapRadio>

            <regular-input 
                [label] = "monthSaleryTextTotal()"
                [default] = "thisincome.sum"
                [postfix] = "monthSaleryInput.postfix"
                [placeholder] = "monthSaleryInput.placeholder"   
                (changed) = "thisincome.sum = $event">
            </regular-input>  

            <bootstrapRadio 
                [label] = "textLabelonTaxCardType[wizardState.language]"
                [default] = "thisincome.appliedTaxCard"
                [options] = "taxCardTypes"
                name      = "appliedtaxcard"      
                (changed) = "thisincome.appliedTaxCard = $event;updateskattekort($event)">
            </bootstrapRadio>

            <div *ngIf = "hovedkortchange === true">Hovedkortet er nu flyttet fra <b>{{previousHovedkort}}</b> til <b>{{thisincome.from}}</b> (hovedkortet kan kun være hos én udbetaler) </div>


        
        </div>
    `
})

export class basicSkattekort {


    textLabelonTaxCardType = {};
    taxCardTypes:radioValues[] = [];

    periodOptions:radioValues[] = [];
    periodLabel:string = "";
    periodOptionsName = {
        monthly:"",
        twoweeks:""
    }

    monthSaleryText:string = "";

    monthSaleryTextTotal ():string {

        var period = this.thisincome.period 
        var name = this.periodOptionsName[period]

        return this.monthSaleryText + " " + name
    }

    monthSaleryInput = {
        label:{},
        postfix:"kr-month",
        placeholder:""
    }

    udbetaler = {
        label:{},
        placeholder:""
    }

    hovedkortchange:boolean = false
    previousHovedkort:string = ""

    updateskattekort () {

        var indexOfCurrentIncome    = this.wizardState.thisincome,
            numberOfIncomes         = this.wizardState.incomes.length

        let hovedkortExists     = this.wizardState.incomes.reduce((p,v,i) => {
            return v.income.appliedTaxCard === 'hovedkort' && i !== indexOfCurrentIncome ? i : p
        },-1)  

        if (hovedkortExists > -1) {
            this.hovedkortchange = true 
            this.previousHovedkort = this.wizardState.incomes[hovedkortExists].income.from
            this.wizardState.moveHovedkort(hovedkortExists,this.wizardState.thisincome)
        } else {
            this.hovedkortchange = false 
        }

    }

    incomeTypeText = {}
    indkomstTyper:select[]; 
    thisincome:Income

    constructor (
        private textServices: skattekortText,
        private wizardState:WizardState
    ) {}

    ngOnInit () {

        this.wizardState.trin = 1;    
        this.thisincome = this.wizardState.incomes[this.wizardState.thisincome].income
        this.hovedkortchange = false 
        


        this.textServices.getText().subscribe(text => {


            this.monthSaleryInput.placeholder   = text.find(element => element.id === 'placeholder_1')[this.wizardState.language];
            
            this.udbetaler.placeholder          = text.find(element => element.id === 'placeholder_2')[this.wizardState.language];
            this.udbetaler.label                = text.find(element => element.id === 'udbetalerlabel')[this.wizardState.language];
        
            this.periodLabel                    =  text.find(element => element.id === 'indkomstperiodeLabel')[this.wizardState.language];
            this.periodOptions                  =  text.filter(element => element.group === 'indkomstperiode')
                .map(element => {
                    return {
                        value:element.id,
                        text:element[this.wizardState.language]           
                    }
                })

            this.incomeTypeText                  = text.find(element => element.id === 'maanedsindkomstTypeLabel');  
            this.indkomstTyper                   = text.filter(element => element.group === 'indkomsttyper')
                .map(element => {
                    return {
                        value:element.id,
                        text:element[this.wizardState.language]   
                    }
                });  
            this.monthSaleryInput.label          = text.find(element => element.id === 'maanedsindkomst');
            this.monthSaleryText                 = text.find(element => element.id === 'maanedsindkomst')[this.wizardState.language];
        

            this.textLabelonTaxCardType          = text.find(element => element.id === 'skattekortsTypeLabel')
            this.taxCardTypes                    = text.filter(element => element.group === 'taxCardTypes')
                .map(radio => {
                    return {
                        text:radio[this.wizardState.language],
                        value:radio.id
                    }    
                })
            this.periodOptionsName.monthly      = text.find(element => element.id === 'prmonth')[this.wizardState.language];
            this.periodOptionsName.twoweeks     = text.find(element => element.id === 'prtwoweeks')[this.wizardState.language];
                      

        });

    }

 } 