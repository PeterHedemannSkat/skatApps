import {Component,OnInit,skattekortText,WizardState,languageText} from '../infrastructure/wizardressources';
import { Calculation } from '../services/app.calculations.service';

interface lang {
    en:string,
    da:string
}

@Component ({

    template:`
        <div class = "well">
            <div class = 'text-center'>
                <div class = "show-result">{{text_1}}: {{wizardState.data.indkomst | tusindtal}} kr.</div>
                <div class = "show-result">{{text_2}}: {{calculations.getSkat() | tusindtal}} kr.</div>
                <hr class="skts-divider">
            <p>{{text_3}}</p>
            <p><strong class = "skts-row-result skts-row-result--large">{{calculations.getUdbetalt() | tusindtal}} kr.</strong></p>
            
            </div>
        </div>

    `,
    styles:[`
        .show-result {
            font-size:17px
        }
    `]
  
})

export class resultat {

    constructor (
        private textServices: skattekortText,
        private wizardState:WizardState,
        private calculations:Calculation
    ) {}

    text_1:string;
    text_2:string;
    text_3:string;

    ngOnInit () {

         this.wizardState.trin = 2;
         this.textServices.getText().subscribe(text => {
             this.text_1 = text.find(element => element.id === 'income_result_gui3')[this.wizardState.language];
             this.text_2 = text.find(element => element.id === 'tax_result_gui3')[this.wizardState.language];
             this.text_3 = text.find(element => element.id === 'netto_result_gui3')[this.wizardState.language];
         })
       
    }
 } 