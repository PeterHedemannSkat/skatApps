import { intervalsBilafgifter,intervalMapping } from '../data/inMemoryData.service'

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



interface parameterCheck {
 
    parametersNeeded?:string[],
    modelIsEither?:valuePairs[][],
    dynamicFn?:dynamic
}

interface dynamic {

    (model:valuePairs[]):void
}

let parametersNeeded:parameterCheck[] = [
    
    {
        modelIsEither:[
            [
                {
                    prop:'vehicle',
                    val:'car'
                } 
            ], /* OR */
            [
                {
                    prop:'vehicle',
                    val:'van'                    
                }
            ], /* OR */
            [
                {
                    prop:'vehicle',
                    val:'truck'                    
                },
                {
                    prop:'totalweightAbove12tons',
                    val:'no'
                }
            ], /* OR */
            [
                {
                    prop:'vehicle',
                    val:'bus'                    
                }
            ], /* OR */
            [
                {
                    prop:'vehicle',
                    val:'taxa'                    
                }
            ]
        ], /* needs this parameter  */
        parametersNeeded:['fuel']
    },
    {
        modelIsEither:[
            [
                {
                    prop:'vehicle',
                    val:'car'
                }

            ],
            [
                {
                    prop:'vehicle',
                    val:'van'
                }

            ],
            [
                {
                    prop:'vehicle',
                    val:'taxa'
                }

            ]
        ],
        parametersNeeded:['period']

        /* hvad med van - her skal partikelfilter kun vises under visse betingelser 
        
            få march = filter
            er alle valuePais i modelIs i model 
                loop alle i modelIs 

            modelContains these but not these

            how to group 

            period = 1 // or period = 2 && subPeriod = 1 in the same


            how to determine if we can start fetcting columns results?

            model must contain AND these proerties must have values
            {vehicle:car} = [fuel#]
            {heavyTruck:false} = [fuel#] => adding to set if not present 
            if new set.length is 0 

            include 
            exclude

            {period:2} => [periodSub = #]



                

        
        
         */
    },
    {
        modelIsEither:[
            [
                {
                    prop:'vehicle',
                    val:'car'
                },
                {
                    prop:'period',
                    val:'2'
                }
            ],
            [
                {
                    prop:'vehicle',
                    val:'taxa'
                },
                {
                    prop:'period',
                    val:'2'
                }

            ]
        ],
        parametersNeeded:['subPeriod'],
        dynamicFn:(model) => {

            /* is van and period is either ...  */
            
            let period = model.find(el => el.prop == 'period')

            if (period) {
                return [2,4,6].indexOf(Number(period)) > -1 && !!model.find(el => el.prop == 'van')
            } else {
                return false
            }
                
        }
    },
    {
        modelIsEither:[
            [
                {
                    prop:'vehicle',
                    val:'car'

                },
                {
                    prop:'fuel',
                    val:'diesel'
                }
            ],
            [
                {
                    prop:'vehicle',
                    val:'van'

                },
                {
                    prop:'fuel',
                    val:'diesel'
                },
                {
                    prop:'period',
                    val:'1'
                }
            ]
        ],

        parametersNeeded:['particleFilter']
    },
    {
        modelIsEither:[
            [
                {
                    prop:'vehicle',
                    val:'van'
                },
                {
                    prop:'period',
                    val:'1'
                }
            ],
            [
                {
                    prop:'vehicle',
                    val:'van'
                },
                {
                    prop:'period',
                    val:'2'
                },
                {
                    prop:'subPeriod',
                    val:'1'
                }
            ]
        ],
        parametersNeeded:['totalWeightVan']
    },
    {
        dynamicFn(model) {
   
            let periodObj = (model.find(el => el.prop == 'period')),
                period:number

            if (periodObj) {
                
                period = Number(periodObj.val); 

                if (period >= 1 && period <= 5) {

                    return true 

                } else if (period == 7) {

                    return false

                } else if (period == 6) {

                    let subPeriod = model.find(el => el.prop == 'subPeriod')
                    return (subPeriod && Number(subPeriod.val)) ? true : false
                }    

            } else {

                return false 
            }
        },
        parametersNeeded:['privateUsage']
    }



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

        /*
            check if Array Q[x,y] both are in array Model[x,z,y,u,...]
            if x is in Model ok


        */



    }

    equalityCheck() {

    }


}

interface interval {
    from:number,
    to:number
}
export class intervals {
    constructor (public from:number,public to:number) {}
}

class intervalExpanded {
    constructor (public index:number,public interval:intervals[]) {}
}

export class intervalConstructer {

    constructor(private id:string) {}

    getIntervalObj() {

        let  intervalId  = intervalMapping.find(val => val.ids.indexOf(this.id) > -1).table
        return intervalsBilafgifter.find(v => intervalId == v.id)

    }

    getInterval():intervals[] {

        let intervalObj = this.getIntervalObj(),
            len         = intervalObj.data.length,
            fromArray   = intervalObj.data.slice(0,len-1),
            toArray     = intervalObj.data.slice(1),

            interval:intervals[]    = new Array(len)
        
        //toArray = toArray.map(v =>v + intervalObj.type)

        if (intervalObj.toMap > 0)  toArray.map(v =>v + intervalObj.toMap)
        if (intervalObj.fromMap > 0)  fromArray.map(v =>v + intervalObj.fromMap)


        /* variable whether to modify to or from array  */

        for (let i = 0; i < len; i++) {
            interval[i] = new intervals(fromArray[i],toArray[i])
        }

        return interval
    }

    getIndex(val:number) {

        return this.getInterval().reduce((p,v,i) => { 
            return  (val >= v.from && val <= v.to) ? i : p 
        },-1)

    }

    getIndexExpanded(val:number) {

        return new intervalExpanded(this.getIndex(val),this.getInterval())

    }





}



/* new valuePair(obj1).isEqualTo(obj2) */


interface IFormatter <T> {
    (data: T): boolean;
};


class checkIf <T> {

    private a:T[];
    private all:boolean = false;

    allIn(array:T[]) {

        this.a = array
        this.all = true
        return this

    }

    someIn(array:T[]) {

        this.a = array
        this.all = false
        return this

    }

    areComplientTo(fn:IFormatter<T>) {

        if (this.all) {
            return this.a.reduce((p,v) => {
                return fn(v) ? p : false
            },true)
        } else {
            return this.a.reduce((p,v) => {
                return fn(v) ? true : p
            },false)
        }
    }
}

class arrayOps<T> {

    constructor (private array:T[]) {}

    allValuesArePresentIn(larger:T[]) {

        return new checkIf<T>()
            .allIn(this.array)
            .areComplientTo((s) => {
                return new checkIf<T>()
                    .someIn(larger)
                    .areComplientTo((v) => {
                        return this.flatObjectComparision(s,v)
                    })
            })
    }

    flatObjectComparision (obj1:Object,obj2:Object):boolean {

        for (let prop in obj1) {
            if (obj1.hasOwnProperty(prop)) {
                if (obj1[prop] !== obj2[prop]) return false
            } 
        }

        return true
    }

}













