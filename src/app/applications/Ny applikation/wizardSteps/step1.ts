import {Component,OnInit,skattekortText,WizardState,languageText} from '../infrastructure/wizardressources';

@Component ({

    template:`
        <div class = "well">
            <div class="row skts-process-form-section form-group">
                <div class = "col-sm-12">       
                    <label for = "indkomstTypeChosen">{{wizardState.language | i18nSelect:incomeTypeText}}</label>
                    <select #sel [(ngModel)] = "wizardState.data.indkomsttype" class="form-control">
                        <option *ngFor = "let option of indkomstTyper" [value] = "option.id">{{option[wizardState.language]}}</option>
                    </select>
                </div>
            </div>
            <regular-input [label] = "monthSaleryInput.label[wizardState.language]" [postfix] = "monthSaleryInput.postfix" [default] = "wizardState.data.indkomst" (changedValue) = "wizardState.data.indkomst = $event"></regular-input>         
        </div>
    `
})

export class basicIncome {

    constructor (
        private textServices: skattekortText,
        private wizardState:WizardState
    ) {}

    lang:string;
    indkomstTyper:Object[] = []; 
    monthSaleryInput = {
        label:{},
        postfix:"kr-month"
    }
 
    incomeTypeText = {}

    ngOnInit () {
  
        this.wizardState.trin = 0;
        /* fetching text  */
        this.textServices.getText().subscribe(text => {

            this.incomeTypeText = text.find(element => element.id === 'maanedsindkomstTypeLabel')  
            this.indkomstTyper = text.filter(element => element.group === 'indkomsttyper');   
            this.monthSaleryInput.label = text.find(element => element.id === 'maanedsindkomst')
            
        })
    }
 } 