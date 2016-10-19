import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';

interface input {
    value:string,
    text:string
}

@Component({
    selector:'selector',
    template:`
        <div class="row skts-process-form-section form-group">
            <div class = "col-sm-12">       
                <label for = "indkomstTypeChosen">{{label}}</label>
                <select #sel [(ngModel)] = "default" class="form-control" (change) = "changed.emit(sel.value)" >
                    <option *ngFor = "let option of options" [value] = "option.value">{{option.text}}</option>
                </select>
            </div>
        </div>
    `
})

export class selector {

    @Input()
    label:string

    @Input()
    default:string

    @Input()
    options:Array<input>

    @Output()
    changed: EventEmitter<any> = new EventEmitter(); 


} 