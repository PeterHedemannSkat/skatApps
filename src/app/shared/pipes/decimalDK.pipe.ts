import { Pipe, PipeTransform } from '@angular/core';
import { MathCalc } from '../services/math.services'

@Pipe({
    name:'decimalDK',
    pure:false
})

/* better name readableDigitFormat, could add an argument determining the separater sign */

export class decimalDK implements PipeTransform {

    transform(value:number,...arg:any[]) {

        return (typeof value === 'number') ? value.toString().replace('.',',') : ''

    }
}



