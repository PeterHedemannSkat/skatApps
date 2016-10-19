import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'tusindtal',
    pure:false
})

export class tusindtalsSep implements PipeTransform {

    transform(value:number,...arg:any[]) {
        
        var val:string[]        = value.toString().split("."),
            fraction:string     = val[1] ? val[1] : "",
            integer:string      = val[0],
            len:number          = integer.length,
            thousands:string[]  = []

        for (var i=len;i > 0;i-=3) {
            let piece = i - 3;
            piece = piece < 0 ? 0 : piece; 
            thousands.unshift(integer.slice((piece),i))
        
        }
        return thousands.join(".") + fraction
        
    }
}



