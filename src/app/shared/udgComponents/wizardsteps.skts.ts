import { Component, Input } from '@angular/core';

@Component({
    selector: 'wizard-bar',
    template: `
        <ul class = "navbar-wizard">
            <li *ngFor = "let step of steps; let i = index" [class.active] = "setTrin(i)"><span>{{step}}</span></li>
        </ul>
    `,
    styles: [`
    
        .skts-navbar-wizard li {
            line-height:3em !important
        }    
    
    `]

})

export class wizardBar {

    @Input()
    steps: string[];

    @Input()
    activeTrin: number;

    setTrin(index: number) {
        return index === this.activeTrin
    }

}