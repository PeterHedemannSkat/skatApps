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

interface parameterCheck {
    modelIs:valuePairs[],
    id:string,
    inherit:string,
    parametersNeeded:string[]
}

let parametersNeeded:parameterCheck[] = [
    {
        modelIs:[
            {
                prop:'vehicle',
                val:'car'
            }
        ],
        id:'carBasic',
        inherit:null,
        parametersNeeded:['period','fuel']
    },
    {
        modelIs:[
            {
                prop:'fuel',
                val:'diesel'
            }
        ],
        id:'disel',
        inherit:'carBasic',
        parametersNeeded:['partikelfilter']

        /* hvad med van - her skal partikelfilter kun vises under visse betingelser 
        
            få march = filter
            er alle valuePais i modelIs i model 
                loop alle i modelIs 
                

        
        
         */
    },
    {
        modelIs:[
            {
                prop:'period',
                val:'2'
            }
        ],
        id:'inBorderYear',
        inherit:'carBasic',
        parametersNeeded:['borderYear']
    },



]

interface valuePairs {

    prop:string,
    val:string
}


export class missingParameters {


    constructor (public model:valuePairs[]) {

    }

    parameterMapping = parametersNeeded

    missingGet() {

        // en filter

        this.parameterMapping.forEach(v => {
            let isinmodel = v.modelIs.reduce((p,v) => {

                let is = this.model.reduce((p,v) => {
                    if 
                },false)

                // look throug this.model

            },false)
        })



    }

    equalityCheck() {

    }


}



export class intervalGet {

    intervalRaw:intervalConstruct[] = interval



}



