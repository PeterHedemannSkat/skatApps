import { Component,Input } from '@angular/core';

@Component({
    selector:'wizard-bar',
    template:`
        <ul class = "skts-navbar-wizard">
            <li *ngFor = "let step of steps; let i = index" [class.active] = "setTrin(i)"><span>{{step}}</span></li>
        </ul>
    `
})

export class wizardBar {

    @Input()
    steps:string[];

    @Input()
    activeTrin:number;

    setTrin (index:number) {
        return index === this.activeTrin
    }

}