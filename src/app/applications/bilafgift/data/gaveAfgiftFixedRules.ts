interface intervalConstruct {
    id:string,
    type?:string,
    data:number[]

}

interface rowLimit {
    index:number,
    from:number,
    to:number,
    aboveFrom:boolean,
    belowTo:boolean
}

let interval:intervalConstruct[] = [

    {
        id:'benzin',
        data:[0,3,5]
    }


] 




export class intervalGet {

    intervalRaw:intervalConstruct[] = interval



}



