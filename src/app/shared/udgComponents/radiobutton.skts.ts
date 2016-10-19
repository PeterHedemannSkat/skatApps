import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core'

interface radiobuttonUX {
    value:string,
    id:string,
    labelText:string
} 

@Component ({

    selector:'bootstrapRadio',
    template:`
        <div class="row skts-process-form-section form-group">
            <div class = "col-sm-12"> 
                <label>{{label}}</label>
                <div class = "btn-group-vertical">
                    <label *ngFor = " let radio of options " class = "btn skts-btn-radio" [class.active] = "setChecked(radio.value)" >
                        <input #radiohtml type="radio" (click) = "clicked(radio.value)" [attr.name] = "name" [checked] = "setChecked(radio.value)" >
                        {{radio.text}}
                    </label>
                </div>
            </div>
        </div>
        <br/>
    `
})

export class bootstrapStyleRadioButton {

    @Output()
    changed: EventEmitter<any> = new EventEmitter(); 

    @Input()
    options: radiobuttonUX [];

    @Input()
    default: string;

    @Input()
    label:string;

    @Input()
    name:string




    setChecked (value:any) {
        return (value === this.default) ? true : false;
    }

    clicked(isChecked:string,radio:Object) {
        this.default = isChecked;
        this.changed.emit(isChecked);
    }

    ngOnInit () {

    }
    
} 