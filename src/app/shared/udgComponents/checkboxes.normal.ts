import {Component,Input,Output,EventEmitter,OnInit } from '@angular/core'
import { listValues } from '../shared'

@Component({
    selector:'checkbox-group',
    template:`

        <div class = "checkbox-label">{{label}}</div>
        <div *ngFor = "let sub of list">
            <input #element type = "checkbox" [value] = "sub.id" [id] = "sub.id"  [checked] = "shouldBeChecked(sub.id)" (click) = "change(element.checked,sub.id)">
            <label [attr.for] = "sub.id">{{sub.txt}}</label>
        </div>
    
    `
})

export class CheckboxGroup {

    _values:string[] 

    @Input()
    get values() {
        return this._values
    }
    
    set values(val) {
       this._values = val
       this.valuesChange.emit(this._values)
    }
    
    @Output()
    valuesChange:EventEmitter<any> = new EventEmitter();

    @Output()
    changes:EventEmitter<any> = new EventEmitter();    


    @Input()
    label:string

    @Input()
    list:listValues[]

    shouldBeChecked (id:string) {
        return this.values.indexOf(id) > -1
    }

    change (toggle:boolean,id:string) {
        
        let index = this.values.indexOf(id)

        if (toggle === true && index === -1) this.values.push(id)
        if (toggle === false && index > -1) this.values.splice(index,1)

        this.changes.emit(null)
        

    }

    ngOnInit () {

        
    }

}