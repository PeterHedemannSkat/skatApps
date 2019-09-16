import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'

interface radiobuttonUX {
    value: string,
    id: string,
    labelText: string
}

@Component({

    selector: 'bootstrapRadio',
    template: `
        <div class="row form-group">
            <div class = "col-sm-6"> 
            <label>{{label}}<span *ngIf = "showHelper()" class = "skts-rounded-icon hover" (click) = "toggleHelpTxt = !toggleHelpTxt">?</span></label>
            </div>
            <div class = "col-sm-6"> 
                <div *ngIf = "showHelper()" [hidden] = "toggleHelpTxt" class = "helper-txt">{{helpTxt}}</div>  
                <div *ngFor = "let radio of options" class="custom-control custom-radio">
                    <input type="radio" [id]="radio.value" [attr.name] = "name" class="custom-control-input" (click) = "valueChange.emit(radio.value);clicked(radio.value)" [checked] = "setChecked(radio.value)">
                    <label class="custom-control-label" [attr.for]="radio.value">{{radio.text}}</label>
                </div>
            </div>
        </div>
        <br/>
    `,
    styleUrls: ['../styles/helperTxt.css']
})

export class bootstrapStyleRadioButton {

    toggleHelpTxt: boolean = true;

    @Input()
    helpTxt: string

    @Output()
    changed: EventEmitter<any> = new EventEmitter();

    @Input()
    options: radiobuttonUX[];

    @Input()
    default: string;

    @Input()
    label: string;

    @Input()
    name: string

    @Input() value: string

    @Output()
    valueChange: EventEmitter<any> = new EventEmitter();

    setChecked(value: any) {
        return (value === this.value) ? true : false;
    }

    clicked(isChecked: string, radio: Object) {
        this.default = isChecked;
        this.changed.emit(isChecked);
    }

    showHelper() {
        return (this.helpTxt && this.helpTxt.length > 2)
    }

} 