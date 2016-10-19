import {Component,OnInit,skattekortText,WizardState,languageText} from '../infrastructure/wizardressources';

interface radioValues {
    value:string,
    labelText:string
}

interface input {
    labelText:string,
    postfix:string
} 

@Component ({

    template:`
        <div class = "well">
            <div class="row skts-process-form-section form-group">
                <div class = "col-sm-12">           
                    <label>{{textLabelonTaxCardType}}</label> 
                    <bootstrapRadio [data] = "taxCardTypes" [checked] = "wizardState.data.korttype" (changedRadio) = "wizardState.data.korttype = $event"></bootstrapRadio>
                </div>
            </div>
            <p>{{headingForSkattekortsDetail}}</p>

            <regular-input *ngIf = "wizardState.data.korttype === 'hovedkort'" [label] = "maanedsFradragInput.labelText" [postfix] = "maanedsFradragInput.postfix" [default] = "wizardState.data.maanedsfradrag" (changedValue) = "wizardState.data.maanedsfradrag = $event" ></regular-input>
            <regular-input [label] = "traekProcentInput.labelText" [postfix] = "traekProcentInput.postfix" [default] = "wizardState.data.traekprocent" (changedValue) = "wizardState.data.traekprocent = $event" ></regular-input>
        </div>
    `
})

export class basicSkattekort {

        maanedsFradragInput:input = {
            labelText:"",
            postfix:"kr"
        }
        traekProcentInput: input = {
            labelText:"",
            postfix:"kr"            
        }
        textLabelonTaxCardType: languageText;
        taxCardTypes:radioValues[] = [];
        headingForSkattekortsDetail:string;
  
        constructor (
            private textServices: skattekortText,
            private wizardState:WizardState
        ) {}

        ngOnInit () {

            this.wizardState.trin = 1;    
            this.textServices.getText().subscribe(text => {

                this.textLabelonTaxCardType          = text.find(element => element.id === 'skattekortsTypeLabel')[this.wizardState.language]
                this.taxCardTypes                    = text.filter(element => element.group === 'taxCardTypes')
                    .map(radio => {
                        return {
                            labelText:radio[this.wizardState.language],
                            value:radio.id
                        }    
                    })

                this.headingForSkattekortsDetail     = text.find(element => element.id === 'heading_gui2')[this.wizardState.language];                
                this.maanedsFradragInput.labelText   = text.find(element => element.id === 'maanedsfradrag')[this.wizardState.language];
                this.traekProcentInput.labelText     = text.find(element => element.id === 'traekprocent')[this.wizardState.language];             

            });

        }
 } 