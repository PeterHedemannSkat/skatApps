import {Component,OnInit,skattekortText,WizardState,languageText} from '../infrastructure/wizardressources';
import { taxableIncome } from '../services/taxableincome.service'


interface lang {
    en:string,
    da:string
}

@Component ({

    template:`

        <p class="text-center">Du får udbetalt</p>
        <p class="text-center"><strong class = "skts-row-result skts-row-result--large">{{getTotal() | tusindtal}} kr.</strong></p>
        <hr class="skts-divider">   

        <div *ngFor = "let result of wizardState.incomes;let i = index" class = "well result-container">

            <div class = "show-result clearfix">             
                <div class = ""></div>
                <div class = "pull-left">{{text_1}} fra <strong>{{result.income.from}}</strong></div>
                <div class = "pull-right">{{+result.income.sum | tusindtal}} kr.</div>                    
            </div>

            <div class = "show-result clearfix" *ngIf = "result.sumAMbidrag() > 0">
                <div class = ""></div>
                <div class = "">
                    <div class = "pull-left">{{text_4}}{{+result.income.sum | tusindtal}} kr.</div>
                    <div class = "pull-right">- {{result.sumAMbidrag() | tusindtal}} kr.</div>
                </div>    
            </div>

            <div class = "show-result clearfix">
                <div class = ""></div>
                <div class = "">
                    <div class = "pull-left">A-skat: {{result.taxcard.withHoldingRate}} % af {{result.netincome() | tusindtal}} kr. <a (click) = "toggleModalMethod(i)" class = "small-link">(A-indkomst)</a></div>
                    <div class = "pull-right">- {{result.taxOfWithHoldingRate() | tusindtal}} kr.</div>
                </div>    
            </div>

            <div class = "show-result clearfix sum-line">
                <div class = ""></div>
                <div class = "">
                    <strong>
                    <div class = "pull-left">{{text_3}}:</div>
                    <div class = "pull-right">{{result.paid() | tusindtal}} kr.</div>
                    </strong>
                </div>    
            </div> 

            <p>
                {{result.income.from}} bruger dit {{taxcardUsed(i) | lowercase}}
                <a *ngIf = "result.income.appliedTaxCard === 'bikort' && wizardState.incomes.length > 1" class = "small-link" (click) = "anvendHovedkort(i)">Anvend hovedkort</a> 
            </p>


            <div class = "clearfix section-small">
                <button class = "btn skts-btn-secondary pull-right" (click) = "edit(i)" routerLink = "/skattekort">Ret</button> 
                <button class = "btn skts-btn-secondary pull-ret" (click) = "removeIncome(i)">Slet</button> 
            </div>

        
        </div>

     
        <div class = "section">
            <p>Har du flere indkomster?</p>
            <button class = "btn skts-btn-secondary" (click) = "addIncome()" routerLink = "/skattekort">Ny indkomst</button>
        </div>

        <modal-aindkomst [incomeNumber] = "showIncome" [toggle] = "toggleModal" (closed) = "toggleModal = false"></modal-aindkomst>


    `,
    styles:[`
        .show-result {
            font-size:17px;
            padding:0.1em 0;
            clear:both
        }
        .sum-line {
            border-top:1px solid gray;
            margin-top: 0.5em;
            padding-top: 0.5em
        }
        .section {
            margin-top:1.5em
        }
        .section-small {
            margin-top:2em
        }
        .result-container {
            position:relative;
            padding-top: 2em
        }
        .edit {
            position:absolute;
            right:0.4em;
            top:0.3em
        }
        .small-link {
            font-size:0.7em;
            cursor:pointer
        }
    `]
  
})

export class resultat {

    constructor (
        private textServices: skattekortText,
        private wizardState:WizardState

    ) {}

    text_1:string;
    text_2:string;
    text_3:string;
    text_4:string;
    text_5:string;
    hovedkortName:string = "";
    bikortName:string = "";
    showIncome:number = 0;

    addIncome () {
        
        this.wizardState.createIncome()
        var len = this.wizardState.incomes.length
        this.wizardState.thisincome = len - 1
    }

    getTotal () {
        return this.wizardState.incomes.reduce((p,c) => {
            return p + c.paid()
        },0)
    }

    taxcardUsed (index:number) {

        let taxcard = this.wizardState.incomes[index].income.appliedTaxCard
        return (taxcard === 'hovedkort') ? this.hovedkortName : this.bikortName

    }

    toggleModalMethod (index:number) {

        this.showIncome = index;
        this.toggleModal = true

    }

    toggleModal:boolean = false

    anvendHovedkort (index:number) {

        var indexOfCurrentIncome    = this.wizardState.thisincome,
            numberOfIncomes         = this.wizardState.incomes.length

        let hovedkortExists     = this.wizardState.incomes.reduce((p,v,i) => {
            return v.income.appliedTaxCard === 'hovedkort' ? i : p
        },-1)  

        this.wizardState.moveHovedkort(hovedkortExists,index)
    } 

    removeIncome (index:number):void {
        this.wizardState.incomes.splice(index,1)
    }

    edit (index:number) {
        this.wizardState.thisincome = index  
    } 


    ngOnInit () {

         this.wizardState.trin = 2;
         this.textServices.getText().subscribe(text => {
             this.text_1 = text.find(element => element.id === 'income_result_gui3')[this.wizardState.language];
             this.text_2 = text.find(element => element.id === 'tax_result_gui3')[this.wizardState.language];
             this.text_3 = text.find(element => element.id === 'netto_result_gui3')[this.wizardState.language];
             this.text_4 = text.find(element => element.id === 'gui3_4')[this.wizardState.language];
             this.text_5 = text.find(element => element.id === 'gui3_5')[this.wizardState.language];

             this.hovedkortName =  text.find(element => element.id === 'hovedkortName')[this.wizardState.language];
             this.bikortName    =  text.find(element => element.id === 'bikortName')[this.wizardState.language];


         })


       
    }
 } 