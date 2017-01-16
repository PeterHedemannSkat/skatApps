import {ElementRef,Directive,HostListener,Input, OnInit, EventEmitter, Output,SimpleChanges,SimpleChange} from '@angular/core';
import { MathCalc } from '../shared'

@Directive({
    selector:'[readableDigitFormat]'
})
export class readableDigitFormat {

    constructor (private el:ElementRef) {}

    private focus:boolean = false

    /* 
    
   _____________________________________

        [(readableDigitFormat)] = "value" reads and writes to parent in number format. No need to re-format! 
            - a specific value represents value empty default -1 
            - when value is undefined (inputbox is empty) ngOnChanges will initially be called, but as it is undefined, it will refrain from action (not setting inputbox to zero)
            - when an input box externally (from parent) it will 
                ... [case A] trigger ngChanges, which will render number-mask in inbox IF different from -1. If value -1, it will render empty input box 
            - when USER types in input box:
                ... trigger event keydown, which will   
                    1. clean the number in the input box
                    2. Emit the cleaned number to parent. If it's not a number it will emit -1. If no change in number it means USER has typed [a-z,.]. In this cause it will not emit, but - if allowed - autocorrect the (potential) flawed input (a letter) to readable format.
                    3. Normal case a number is emitted to parent, which will cause a call to ngOnChanges, see [case A]   
                        ... caret is set, if it's sure it was focused before
            - Edge case: if USER first selects the whole number in the input box and fast (due to browser issues, when the select event is handled) reenters something the focus is mistakenly before the entered sign. The USER is thus confussed.
                ... solution => maunally if 1 digit is set, the caret is set to 1, thus after in the correct position  

    ______________________________________
    
    */

    ngOnInit () {}

    maskInput (value:Number) {

        let inputElement:HTMLInputElement = this.el.nativeElement

        let
            oldLength           = inputElement.value.length,
            caretPosition       = inputElement.selectionEnd,
            newMask             = new MathCalc().maskInteger(value,this.maskSeperator()),     
            newLength           = newMask.length,
            dif                 = newLength - oldLength,
            changeToPosition    = caretPosition + dif;

        inputElement.value = newMask;   
    
        if (this.focus === true) {
            inputElement.setSelectionRange(changeToPosition,changeToPosition)
        }

        this.focus = false

    }

    maskSeperator () {
        return (this.mask) ? this.mask : ' '
    } 

    autocorrect () {
        return (this.autoCorrect === false) ? false : true 
    }

    getProxy () {
        return (this.proxyUnused) ? this.proxyUnused : Number.NEGATIVE_INFINITY
    }

    ngOnChanges (changes:SimpleChanges) {

        let inputElement:HTMLInputElement = this.el.nativeElement

        if ('value' in changes &&  changes['value'].currentValue && changes['value'].currentValue !== this.getProxy()) {
               
            this.maskInput(Number(changes['value'].currentValue))

        } else if ('value' in changes && changes['value'].currentValue == this.getProxy()) {

            inputElement.value = ''; 
            this.focus = false

        } else if (this.focus === false && 'value' in changes && changes['value'].currentValue == 0) {

            inputElement.value = ''; 
            this.focus = false

        }
    }

    @Input('readableDigitFormat') value:Number; 
    @Input() mask:string; 
    @Input() proxyUnused:Number;
    @Input() autoCorrect:boolean;
    @Output() readableDigitFormatChange:EventEmitter<any> = new EventEmitter();  
    @Output() validate:EventEmitter<any> = new EventEmitter();

    @HostListener('keyup') changedInput() {

        let inputElement:HTMLInputElement = this.el.nativeElement,

            cleanedNumber:any = inputElement.value
                .replace(/\./g,"")
                .replace(/,/g,".")
                .match(/\-?\d?/g)
    
        let emitNumber = (cleanedNumber) ? Number(cleanedNumber.join("")) : this.getProxy()

        this.focus = true 
        if (emitNumber == this.value && emitNumber !== this.getProxy() && this.autocorrect() && inputElement.value.length > 0) {
            this.maskInput(emitNumber)
        } else  {
            this.readableDigitFormatChange.emit(emitNumber)
        }
        
    }

    @HostListener('select') select() {
         
         let inputElement:HTMLInputElement = this.el.nativeElement

         if (inputElement.value.length == 1) inputElement.setSelectionRange(1,1) 

    }

} 