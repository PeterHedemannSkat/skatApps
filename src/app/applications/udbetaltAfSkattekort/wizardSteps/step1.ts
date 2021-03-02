import { Component, OnInit, WizardState } from '../infrastructure/wizardressources';
import { Validator } from '../../../shared/shared';

@Component({

    template: `

        <div class = "">

            <p>{{content.overskrift1}}</p>
            <p>{{content.step1GeneralTxt}}</p>

            <regular-input
                [(value)]       = "wizardState.taxcard.withHoldingRate"
                [label]         = "content.traekprocentLabel"
                [helpTxt]       = "content.helptraekprocent"
                [validateType]  = "wizardState.getValitionSet(['notEmpty','number','!range?from=30&to=99'])"
                [placeholder]   = "content.skrivprocent"
                postfix         = "%"     
                fieldId         = "traekprocent"
                (changed)       = "validate()"
            ></regular-input>

            <regular-input 
                [(value)]       = "wizardState.taxcard.deduction"
                [label]         = "content.maanedsfradragLabels" 
                [helpTxt]       = "content.helpMaanedsfradrag"
                [validateType]  = "wizardState.getValitionSet(['notEmpty','number'])"
                postfix         = "kr."
                [placeholder]   = "content.skrivbeloeb"
                (changed)       = "validate()"
                fieldId         = "maanedsfradrag"
            ></regular-input>

        </div>
    `
})

export class basicIncome {

    constructor(
        private wizardState: WizardState
    ) { }

    content: Object = {};

    ngOnInit() {

        this.wizardState.trin = 0;
        this.content = this.wizardState.currentWizardStepContent
        this.wizardState.printLocalContent([['step1', 'general'], ['general', 'placeholderTexts']])
        this.validate();

    }

    getNumberType() {
        return [this.wizardState.errorTxt['notEmpty'], this.wizardState.errorTxt['number']]
    }


    validate() {

        var validateTraekProcent = {
            element: this.wizardState.taxcard.withHoldingRate,
            regExContainer: this.wizardState.getValitionSet(['notEmpty', 'number', '!range?from=30&to=99'])
        }

        var validateMaanedsFradrag = {
            element: this.wizardState.taxcard.deduction,
            regExContainer: this.wizardState.getValitionSet(['notEmpty', 'number'])
        }

        this.wizardState.stepValidationOk = new Validator().add([validateTraekProcent, validateMaanedsFradrag]).checkAll();

    }

}


