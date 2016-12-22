import {Component} from '@angular/core';

@Component({

    selector: 'my-app',

    template:`
        <div class = "skts-wizard">
            <p> PROTOTYPE </p>
             <!--<wizard-bar [activeTrin] = "wizardState.trin" [steps] = "navBar"></wizard-bar>-->
             <router-outlet></router-outlet>
             <!--<global-buttons [links] = "links" [disable] = "!wizardState.stepValidationOk"></global-buttons>-->
        </div>
    
    `

})

export class appMain {


}
