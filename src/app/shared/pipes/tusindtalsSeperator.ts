import { Pipe, PipeTransform } from '@angular/core';
import { MathCalc } from '../services/math.services'

@Pipe({
    name:'tusindtal',
    pure:false
})

/* better name readableDigitFormat, could add an argument determining the separater sign */

export class tusindtalsSep implements PipeTransform {

    transform(value:number,...arg:any[]) {

        if (typeof value === 'number') {

            let int        = Math.floor(value),
                fraction   = Number(Number(value - int).toFixed(2)),
                mask       = new MathCalc().maskInteger(int,'.'),
                fracStr    = fraction > 0 ? `,${fraction.toString().slice(2)}` : ''

            
            return `${mask}${fracStr}` 

        } else {

            return ''

        }


            

        //return (typeof value === 'number') ? new MathCalc().maskInteger(value,'.') : ''

    }
}



