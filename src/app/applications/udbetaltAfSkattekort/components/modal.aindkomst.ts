import { Component,Input,Output,EventEmitter,OnInit } from '@angular/core';
import { WizardState} from '../infrastructure/wizardressources';
import { taxableIncome } from '../services/taxableincome.service'


@Component({
    selector:'modal-aindkomst',
    template:`
            
            <div class="modal fade" [class.in] = "toggle" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" [style.display]="toggle ? 'block' : 'none'">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" (click) = "closed.emit('close')" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{content.overskrift}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class = "show-result">
                        
                            <div class = "clearfix">
                                <div class = "pull-left">{{content.indkomst}}</div>
                                <div class = "pull-right">{{wizardState.incomes[incomeNumber].income.sum | tusindtal}} kr.</div>
                            </div>

                            <div class = "clearfix">
                                <div class = "pull-left">{{content.AMbidrag}}</div>
                                <div class = "pull-right">- {{wizardState.incomes[incomeNumber].sumAMbidrag() | tusindtal}} kr.</div>
                            </div>

                            <div class = "clearfix">
                                <div class = "pull-left">{{content.fradrag}}</div>
                                <div class = "pull-right">- {{wizardState.incomes[incomeNumber].deductableAmount() | tusindtal}} kr.</div>
                            </div>

                            <div class = "clearfix sum-line">
                                <div class = "pull-left">{{content.Aindkomst}}</div>
                                <div class = "pull-right">{{wizardState.incomes[incomeNumber].netincome() | tusindtal}} kr.</div>
                            </div>

                        </div>
                    </div>
                 </div>
                </div>
            </div>
        
    `,
    styles:[`
         .sum-line {
            border-top:1px solid gray;
            margin-top: 0.5em;
            padding-top: 0.5em
        }
    `


    ]
})
export class Aindkomst {

    actualincome:taxableIncome

    constructor (
        private wizardState:WizardState
    ) {}

    @Output()
    closed: EventEmitter<any> = new EventEmitter(); 

    @Input()
    incomeNumber:string

    @Input()
    toggle:boolean

    content: Object = {}

    ngOnInit () {

        this.content = this.wizardState.currentWizardStepContent

        this.wizardState.getText('step3','aIndkomst').subscribe(element => {
            
            element.forEach(element => {
                this.content[element.id] = element[this.wizardState.language] 
            })

        })
    }
}