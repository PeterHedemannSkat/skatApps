import { Component,Input,Output,EventEmitter,OnInit } from '@angular/core';

@Component({
    template:`
        <div class="row skts-process-form-section form-group">
            <div class = "col-sm-12">
                <label>{{label}}</label>
                <div [class]="postFixClass">
                    <input [(ngModel)] = "default" class="form-control" (change) = "inputChanged()" [attr.placeholder] = "placeholder">
                </div>
            </div>
        </div>
    `,
    selector:'regular-input'

})

export class normalInput {

    value:string
    postFixClass:string;  

    @Input()
    label:string;

    @Input()
    postfix:string;

    @Input()
    default:string;

    @Input()
    placeholder:string;

    @Output()
    changed: EventEmitter<any> = new EventEmitter();

    inputChanged () {
        this.changed.emit(this.default)
    }

    ngOnInit () {
        this.postFixClass = "skts-postfix-" + this.postfix;
    }

}