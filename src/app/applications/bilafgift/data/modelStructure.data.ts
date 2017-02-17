import {valuePairs,dynamic,parameterCheck} from '../infrastructure/interfaces.bilafgifter'

export let parametersNeeded:parameterCheck[] = [


    {

        parametersNeeded:['vehicle'],
        dynamicFn:[
            (model) => {
                return true 
            }
        ]  
    },
    
    {
        parametersNeeded:['fuel'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'car'} 
            ], /* OR */
            [
                { prop:'vehicle',val:'van'}      
            ], /* OR */
            [
                { prop:'vehicle',val:'truck'},
                { prop:'size',val:'small'}               
            ], /* OR */
            [
                { prop:'vehicle',val:'bus'}
            ], /* OR */
            [
                { prop:'vehicle',val:'taxa'}
            ],
            [
                { prop:'vehicle',val:'mc'}
            ]
        ] 
        
    },
    {
        parametersNeeded:['period'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'car'}
            ],
            [
                { prop:'vehicle',val:'van'}
            ],
            [
                { prop:'vehicle',val:'taxa'}
            ]
        ]
    },
    {
        modelIsEither:[
            [
                { prop:'vehicle',val:'car'},
                { prop:'period',val:'2'}
            ],
            [
                { prop:'vehicle',val:'taxa'},
                { prop:'period',val:'2'}

            ]
        ],
        parametersNeeded:['subPeriod'],
        dynamicFn:[ /* vælg periode skal også vises for en række år, når   */
            (model) => {
                
                let period = model.find(el => el.prop == 'period')

                if (period) {
                    return [2,4,6].indexOf(Number(period)) > -1 && !!model.find(el => el.prop == 'van')
                } else {
                    return false
                }
                    
            }
        ]
    },
    {
        modelIsEither:[
            []
        ],
        parametersNeeded:['subPeriod'],
        dynamicFn:[ /* vælg periode skal også vises for en række år, når   */
            (model) => {
                
                let period = model.find(el => el.prop == 'period'),
                    vehicle = model.find(el => el.prop == 'vehicle')
                    
                if (period && vehicle && vehicle.val == 'van') {
                    return [2,4,6].indexOf(Number(period.val)) > -1
                } else {
                    return false
                }
                    
            }
        ]
    },
    {
        parametersNeeded:['particleFilter'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'car'},
                { prop:'fuel',val:'diesel'}
            ],
            [
                { prop:'vehicle',val:'van'},
                { prop:'fuel',val:'diesel'}
            ]

        ]  
    },
    {
        parametersNeeded:['specialOptionCar'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'car'},
                { prop:'period',val:'2'},
                { prop:'subPeriod',val:'2'}
            ],
            [
                { prop:'vehicle',val:'taxa'},
                { prop:'period',val:'2'},
                { prop:'subPeriod',val:'2'}
            ]
  
        ]  
    },
    {
        parametersNeeded:['totalWeightVan'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'van'},
                { prop:'period',val:'1'}
            ],
            [
                { prop:'vehicle',val:'van'},
                { prop:'period',val:'2'},
                { prop:'subPeriod',val:'2'}          
            ],

     
        ]
    },
    {
        parametersNeeded:['privateUsage'],
        modelIsEither:[ /*  privatanvendelsesafgift gælder for alle varebiler efter 1998, dvs. undtagen periode 6, sub 2   */
            [
                { prop:'vehicle',val:'van'},
                { prop:'period',val:'1'}

            ],
            [
                { prop:'vehicle',val:'van'},
                { prop:'period',val:'2'}

            ],
            [
                { prop:'vehicle',val:'van'},
                { prop:'period',val:'3'}
            ],
            [
                { prop:'vehicle',val:'van'},
                { prop:'period',val:'4'}

            ],
            [
                { prop:'vehicle',val:'van'},
                { prop:'period',val:'5'},

            ],
            [
                { prop:'vehicle',val:'van'},
                { prop:'period',val:'6'},
                { prop:'subPeriod',val:'2'}

            ]
        ]

    },
    {
        parametersNeeded:['size'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'truck' }
            ]
        ]
    },
    {
        parametersNeeded:['typeTruck','suspension'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'truck'},
                { prop:'size',val:'large'}
            ]
        ]
    },
    {
        parametersNeeded:['axesTruck_roadTrain','axesTruck_roadTrain_road'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'truck'},
                { prop:'size',val:'large'},
                { prop:'typeTruck',val:'roadTrain'}
            ]
        ]
    },
    {
        parametersNeeded:['axesTruck_Regular'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'truck'},
                { prop:'size',val:'large'},
                { prop:'typeTruck',val:'truck'}
            ]
        ]
    },
    {
        parametersNeeded:['axesTruck_small'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'truck'},
                { prop:'size',val:'small'}
            ],
            [
                { prop:'vehicle',val:'bus'}
            ]
        ]
    },
    {
        parametersNeeded:['smallTruckType'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'truck'},
                { prop:'size',val:'small'}
              
            ]
        ]
    },
    {
        parametersNeeded:['euroStandard'],
        modelIsEither:[
            [
                { prop:'vehicle',val:'truck'},
                { prop:'size',val:'large'}
              
            ]
        ]
    },
]
