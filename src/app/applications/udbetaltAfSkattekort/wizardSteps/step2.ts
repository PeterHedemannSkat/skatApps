import { Component, OnInit, WizardState } from '../infrastructure/wizardressources';
import { Validator } from '../../../shared/shared';

interface Income {
    appliedTaxCard: string,
    sum: string,
    period: string,
    type: string,
    from: string
}

@Component({

    template: `
        
        <div class = "">

            <h2>{{headingDynamic()}}</h2> 
            <p>{{content.step2GeneralTxt}}</p>

            <selector 
                [(value)]       = "thisincome.type" 
                [label]         = "content.indkomstTyperLabel" 
                [helpTxt]       = "content.indkomstTyperHelp"
                [options]       = "selects.loonindkomstTyper"   
                (changed)       = "changePeriod();"
            ></selector> 

            <regular-input 
                *ngIf           = "thisincome.type === 'loonIndkomst'"
                [(value)]       = "thisincome.from"         
                [label]         = "content.udbetalerLabel" 
                [helpTxt]       = "content.navnUdbetalerHelp"
                [validateType]  = "[wizardState.errorTxt.notEmpty]"
                [placeholder]   = "content.udbetalerPlaceholder" 
                (changed)       = "changeIncomeName()"
            ></regular-input>  

            <bootstrapRadio 
                *ngIf           = "thisincome.type === 'loonIndkomst'" 
                [(value)]       = "thisincome.period"
                [helpTxt]       = "content.perioderHelp"
                [label]         = "content.udbetalingsfrekvensLabel"
                [options]       = "selects.indkomstperioder"
                name            = "periodIncome"      
             ></bootstrapRadio>

            <regular-input 
                [(value)]       = "thisincome.sum"
                [label]         = "monthSaleryTextTotal()"
                [helpTxt]       = "correctIncomeHelperTxt()"
                [validateType]  = "getNumberType()"
                postfix         = "kr"
                [placeholder]   = "content.skrivbeloeb"
                (changed)       = "validate()"   
            ></regular-input>  

            <bootstrapRadio 
                [(value)]       = "thisincome.appliedTaxCard"
                [label]         = "content.skattekortTyperLabel"
                [helpTxt]       = "content.valgSkatteKortHelp"
                [options]       = "selects.skattekortsTyper"
                name            = "appliedtaxcard"      
                (changed)       = "updateskattekort()"
            ></bootstrapRadio>

            <div *ngIf = "hovedkortchange === true">
                {{content.hovedkortFlyttet}}
                {{previousHovedkort}}
                {{content.til}}
                {{newHovedkort}}
                {{content.kunKunBrugesEtSted}}
            </div>

        </div>
    `
})

export class basicSkattekort {

    constructor(
        private wizardState: WizardState
    ) { }

    thisincome: Income;
    content: Object = {};
    selects: Object = {};
    hovedkortchange: boolean = false;
    previousHovedkort: string = "";
    newHovedkort: string = "";
    indkomstTyper: Object = {}

    ngOnInit() {

        this.wizardState.trin = 1;

        this.thisincome = this.wizardState.incomes[this.wizardState.thisincome].income;
        this.content = this.wizardState.currentWizardStepContent
        this.selects = this.wizardState.currentStepLists
        this.hovedkortchange = false;

        this.wizardState.printLocalContent([['step2', 'general'], ['general', 'placeholderTexts']]);
        this.wizardState.printLocalLists(['loonindkomstTyper', 'skattekortsTyper', 'indkomstperioder']);
        this.validate();

        this.wizardState.getselect('selects', 'loonindkomstTyper').subscribe(indkomstTyper => {
            indkomstTyper.forEach(element => {
                this.indkomstTyper[element.value] = element.text
            })
        })

        window.scrollTo(0, 0)
    }

    correctIncomeHelperTxt() {

        return (this.thisincome.type === 'loonIndkomst') ? this.content['helpIndkomst'] : this.content['helpOtherThanSalery']


    }

    getNumberType() {
        return [this.wizardState.errorTxt['notEmpty'], this.wizardState.errorTxt['number']]
    }

    validate() {

        var numbers = [{ type: 'number' }, { type: 'notEmpty' }];

        /* validates values on this step that should contain numbers */
        var validates = [this.thisincome.sum]
            .map(el => {
                return { element: el, regExContainer: numbers }
            })

        this.wizardState.stepValidationOk = new Validator().add(validates).checkAll();

    }

    isNew() {
        return this.wizardState.thisincome === this.wizardState.incomes.length - 1
    }

    headingDynamic() {
        return !this.wizardState.editingIncome ? this.content['headingNy'] : this.content['headingEdit']
    }

    monthSaleryTextTotal(): string {

        var period = this.thisincome.period,
            id = (period === 'monthly') ? 'indkomstLabelDel2Monthly' : 'indkomstLabelDel2TwoWeekly',
            part2 = this.content[id]

        return `${this.content['indkomstLabelDel1']} ${part2}`

    }

    updateskattekort() {

        var indexOfCurrentIncome = this.wizardState.thisincome,
            numberOfIncomes = this.wizardState.incomes.length

        let hovedkortExists = this.wizardState.incomes.reduce((p, v, i) => {
            return v.income.appliedTaxCard === 'hovedkort' && i !== indexOfCurrentIncome ? i : p
        }, -1)

        if (hovedkortExists > -1) {

            let typePrev = this.wizardState.incomes[hovedkortExists].income.type;
            let typeNow = this.thisincome.type

            this.previousHovedkort = (typePrev !== 'loonIndkomst') ? this.indkomstTyper[typePrev] : this.wizardState.incomes[hovedkortExists].income.from
            this.newHovedkort = (typeNow !== 'loonIndkomst') ? this.indkomstTyper[typeNow] : this.thisincome.from

            this.hovedkortchange = true
            this.wizardState.moveHovedkort(hovedkortExists, this.wizardState.thisincome)

        } else {

            this.hovedkortchange = false
        }
    }

    changeIncomeName() {

        var thisType = this.thisincome.type,
            thisName = this.thisincome.from

        switch (thisType) {
            case 'loonIndkomst': {
                thisName = (thisName === '') ? 'Arbejdsgiver' : thisName
            }
        }
    }

    changePeriod() {

        if (this.thisincome.type !== 'loonIndkomst') this.thisincome.period = 'monthly'

    }

} 