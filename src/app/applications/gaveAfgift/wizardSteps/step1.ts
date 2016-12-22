import {Component,OnInit,WizardState} from '../infrastructure/wizardressources';
import {Validator} from '../../../shared/shared';

@Component ({

    template:`

        <div class = "well">

            <p>Hej</p>


       

        </div>
    `
})

export class step1 {

    constructor (
        private wizardState:WizardState
    ) {}



    ngOnInit () {
  

    }

  
 } 


