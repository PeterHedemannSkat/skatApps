import { Component, OnInit, WizardState, taxableIncome } from '../infrastructure/wizardressources';

@Component({

    template: `


        <div *ngIf = "wizardState.incomes.length > 0">
            <p class="text-center" *ngIf = "!isMixedPeriods()">{{content.samletUdbetalt}} / {{getPeriodTxt(0)}}</p>

            <p class="text-center" *ngIf = "isMixedPeriods()">{{content.omregnetTilMaaned}}</p>
            <p class="text-center"><strong class = "skts-row-result skts-row-result--large">{{getTotal() | tusindtal}} kr.</strong></p>
            <p>{{content.resultOptionalTxt}}</p>
            <hr class="skts-divider">   
        </div>

        <div *ngFor = "let result of wizardState.incomes;let i = index" class = "result-container">

            <div class = "show-result clearfix">                
                <div class = "float-left">{{getIncomeType(i)}}
                    <span *ngIf = "isSaleryIncome(i) && isTyped(i)"><strong>({{result.income.from}})</strong></span> 
                </div>
                <div class = "float-right">{{+result.income.sum | tusindtal}} kr.</div>                    
            </div>

            <div class = "show-result clearfix" *ngIf = "result.sumAMbidrag() > 0">
                <div class = "float-left">{{content.AMbidrag}} 8 {{content.procentAf}} {{+result.income.sum | tusindtal}} kr.</div>
                <div class = "float-right">- {{result.sumAMbidrag() | tusindtal}} kr.</div>
            </div>

            <div class = "show-result clearfix">
                <div class = "float-left">{{content.Askat}} {{result.taxcard.withHoldingRate}} {{content.procentAf}} {{result.netincome() | tusindtal}} kr. <a (click) = "toggleModalMethod(i)" class = "small-link">{{content.Aindkomst}}</a></div>
                <div class = "float-right">- {{result.taxOfWithHoldingRate() | tusindtal}} kr.</div>  
            </div>

            <div class = "show-result clearfix sum-line">         
                <div class = "float-left">{{content.udbetaltEfterSkat}} / {{getPeriodTxt(i)}}:</div>
                <div class = "float-right"><strong>{{result.paid() | tusindtal}} kr.</strong></div>     
            </div> 

            <p class = "minor">
                {{content.anvendtSkattekort}} {{taxcardUsed(i) | lowercase}}
                <a *ngIf = "result.income.appliedTaxCard === 'bikort' && wizardState.incomes.length > 1" class = "small-link" (click) = "anvendHovedkort(i)">
                    {{content.anvendHovedkort}}
                </a> 
            </p>

            <div class = "clearfix section-small">
                <button class = "btn skts-btn-secondary float-right" (click) = "edit(i)" routerLink = "/skattekort">{{content.ret}}</button> 
                <button class = "btn skts-btn-secondary float-ret" (click) = "removeIncome(i)">{{content.slet}}</button> 
            </div>

        </div>

        <div class = "clearfix text-center">
            <a routerLink = "/skattekort" (click) = "addIncome()">
                <span class = "skts-rounded-icon">+</span>
                {{content.tilfoejIndkomstButton}}
            </a>
        </div>

        <modal-aindkomst *ngIf = "wizardState.incomes.length > 0" [incomeNumber] = "showIncome" [toggle] = "toggleModal" (closed) = "toggleModal = false"></modal-aindkomst>


    `,
    styles: [`
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
        .minor {
            font-size:0.8em
        }
    `]

})

export class resultat {

    constructor(
        private wizardState: WizardState
    ) { }

    content: Object = {}
    hovedkortName: string = "";
    bikortName: string = "";
    showIncome: number = 0;
    toggleModal: boolean = false;
    indkomstTyper: Object = {};

    ngOnInit() {

        this.wizardState.editingIncome = false;
        this.wizardState.trin = 2;
        this.content = this.wizardState.currentWizardStepContent
        this.wizardState.printLocalContent([['step3', 'general']]);

        this.wizardState.getselect('selects', 'loonindkomstTyper').subscribe(indkomstTyper => {
            indkomstTyper.forEach(element => {
                this.indkomstTyper[element.value] = element.text
            })
        })

        window.scrollTo(0, 0)

    }

    addIncome() {

        this.wizardState.createIncome()
        var len = this.wizardState.incomes.length
        this.wizardState.thisincome = len - 1
    }

    isMixedPeriods() {

        var monthly = false,
            twoweeks = false,
            both = false

        this.wizardState.incomes.forEach(el => {
            twoweeks = (el.income.period === 'twoweeks') ? true : twoweeks;
            monthly = (el.income.period === 'monthly') ? true : monthly;
            both = (twoweeks && monthly) ? true : both;
        })

        return both

    }

    getPeriodTxt(index: number) {
        return this.wizardState.incomes[index].income.period === "monthly" ? this.content['maaned'] : this.content['twoweeks']
    }

    getTotal() {
        return this.isMixedPeriods() ? this.getMonthlyTotalofMixed() : this.getTotalSamePeriod();
    }

    getTotalSamePeriod() {
        return this.wizardState.incomes.reduce((p, c) => {
            return p + c.paid()
        }, 0)
    }

    getMonthlyTotalofMixed() {
        return this.wizardState.incomes.reduce((p, c) => {
            return (c.income.period === 'twoweeks') ? p + Math.round(c.paid() * 26 / 12) : p + c.paid()
        }, 0)
    }

    taxcardUsed(index: number) {
        let taxcard = this.wizardState.incomes[index].income.appliedTaxCard
        return (taxcard === 'hovedkort') ? this.content['hovedkort'] : this.content['bikort']
    }

    toggleModalMethod(index: number) {
        this.showIncome = index;
        this.toggleModal = true
    }

    anvendHovedkort(index: number) {

        var indexOfCurrentIncome = this.wizardState.thisincome,
            numberOfIncomes = this.wizardState.incomes.length

        let hovedkortExists = this.wizardState.incomes.reduce((p, v, i) => {
            return v.income.appliedTaxCard === 'hovedkort' ? i : p
        }, -1)

        this.wizardState.moveHovedkort(hovedkortExists, index)
    }

    removeIncome(index: number): void {
        this.showIncome = 0;
        this.wizardState.incomes.splice(index, 1)
    }

    edit(index: number) {
        this.wizardState.editingIncome = true
        this.wizardState.thisincome = index
    }

    getIncomeType(index: number) {
        return this.indkomstTyper[this.wizardState.incomes[index].income.type]
    }

    isSaleryIncome(index: number) {
        return this.wizardState.incomes[index].income.type === 'loonIndkomst'
    }

    isTyped(index: number) {
        return this.wizardState.incomes[index].income.from.length > 0;
    }

} 