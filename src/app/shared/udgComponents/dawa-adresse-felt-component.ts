import { Component, Input, AfterViewInit, EventEmitter, Output } from "@angular/core";
declare var $:any
declare var datePicker:any; 
declare var datePickerController:any

@Component({
    selector: "dawa-adresse",
    templateUrl: 'datovaelger-input-felt.component.html'
})

export class DawaAdresseInputFeltComponent implements AfterViewInit {

    adresse:string 


    @Output() modelChange = new EventEmitter();
    @Input() feltId: string;
    @Input() index: number;
    @Input() cursorStart: string;
    @Input() paakraevet: boolean;
    @Input() ingenStartdato: boolean;

    @Input()
    get model() {
        return this.adresse;
    }

    set model(input: string) {
        this.adresse = input;
        this.modelChange.emit(this.adresse);
    }

    constructor() {
    }

    ngOnInit() {
 
        this.feltNavn = this.index != null ? this.feltId + "_" + this.index : this.feltId;
    }

    ngAfterContentChecked() {
        let elements = $('#' + this.feltNavn);
        let element = elements ? elements[0] : null;

        if (element && element.value && element.value != this.model) {
            // Hack: Vent et tick for at undgå devMode fejlen:
            // Expression has changed after it was checked.
            console.log('afterContent')
            setTimeout((_: any) => this.model = element.value);
        }
        
    }

    ngAfterViewInit() {
        
        let element = $('#' + this.feltNavn);

        let obj:any = {}
        obj.formElements = {}

        obj.formElements[this.feltNavn] = '%d/%m/%Y'

        datePickerController.createDatePicker(obj)


        
    }

    ngOnDestroy() {
        datePicker.destroy(this.feltNavn);
    }
}
