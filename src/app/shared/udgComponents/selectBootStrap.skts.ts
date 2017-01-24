import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';

interface input {
    value:string,
    text:string
}

@Component({
    selector:'selector',
    template:`
        <div class="row skts-process-form-section form-group">
            <div class = "col-xs-12">       
                <label for = "indkomstTypeChosen">{{label}}<span *ngIf = "showHelper()" class = "skts-rounded-icon hover" (click) = "toggleHelpTxt = !toggleHelpTxt">?</span></label>
                <div *ngIf = "showHelper()" [hidden] = "toggleHelpTxt" class = "helper-txt">{{helpTxt}}</div>  
                <select #sel [(ngModel)] = "value" class="form-control skts-select" (change) = "valueChange.emit(sel.value);changed.emit(null)" >
                    <option *ngFor = "let option of options" [value] = "option.value">{{option.text}}</option>
                </select>
            </div>
        </div>
    `,
    styleUrls:['../styles/helperTxt.css'] 
})

export class selector {

    _value:string;
    toggleHelpTxt:boolean = true

    @Input()
    label:string

    @Input()
    default:string

    @Input()
    helpTxt:string;

    @Input()
    options:Array<input>

    @Output()
    changed: EventEmitter<any> = new EventEmitter(); 

    @Input() value:string 

    @Output()
    valueChange:EventEmitter<any> = new EventEmitter();

    showHelper () {
        return (this.helpTxt && this.helpTxt.length > 2)   
    } 



} 