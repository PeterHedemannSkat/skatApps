import { Pipe, PipeTransform } from '@angular/core';
import { MathCalc } from '../services/math.services'

@Pipe({
    name:'tusindtal',
    pure:false
})

/* better name readableDigitFormat, could add an argument determining the separater sign */

export class tusindtalsSep implements PipeTransform {

    transform(value:number,...arg:any[]) {

        return (typeof value === 'number') ? new MathCalc().maskInteger(value,' ') : ''

    }
}



