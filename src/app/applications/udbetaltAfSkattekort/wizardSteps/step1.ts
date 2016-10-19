import {Component,OnInit,skattekortText,WizardState,languageText} from '../infrastructure/wizardressources';

interface input {
    text:string,
    postfix:string,
    placeholder:string
} 

interface Income {
    appliedTaxCard:string,
    sum:number,
    period:string,
    type:string
}

@Component ({

    template:`

        <div class = "well">

            <p>{{headingForSkattekortsDetail}}</p>

            <regular-input
                [label] = "traekProcentInput.text"
                [default] = "wizardState.taxcard.withHoldingRate"
                [placeholder] = "traekProcentInput.placeholder"
                [postfix] = "traekProcentInput.postfix"
                (changed) = "wizardState.taxcard.withHoldingRate = $event">
            </regular-input>

            <regular-input 
                [label] = "maanedsFradragInput.text" 
                [default] = "wizardState.taxcard.deduction"
                [postfix] = "maanedsFradragInput.postfix"
                [placeholder] = "maanedsFradragInput.placeholder"
                (changed) = "wizardState.taxcard.deduction = $event">
            </regular-input>

       
        </div>
    `
})

export class basicIncome {

    constructor (
        private textServices: skattekortText,
        private wizardState:WizardState
    ) {}

    maanedsFradragInput:input = {
        text:"",
        placeholder:"",
        postfix:"kr"
    }
    traekProcentInput: input = {
        text:"",
        postfix:"procent",
        placeholder:""            
    }
    
    actualIncome:any;
    headingForSkattekortsDetail:string;


    ngOnInit () {
  
        this.wizardState.trin = 0;

        console.log(this.wizardState.taxcard)

        this.textServices.getText().subscribe(text => {


            var placeholder = text.find(element => element.id === 'placeholder_1')[this.wizardState.language];

            //console.log(placeholder)
            this.headingForSkattekortsDetail     = text.find(element => element.id === 'heading_gui2')[this.wizardState.language];  

            this.maanedsFradragInput.text   = text.find(element => element.id === 'maanedsfradrag')[this.wizardState.language];
            this.traekProcentInput.text     = text.find(element => element.id === 'traekprocent')[this.wizardState.language];  
            this.traekProcentInput.placeholder      = placeholder;
            this.maanedsFradragInput.placeholder    = placeholder;              




        })
    }
 } 