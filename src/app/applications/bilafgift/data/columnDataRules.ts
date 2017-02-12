import { valuePairs,rulesForColumns } from '../infrastructure/interfaces.bilafgifter';
import { checkModelProperties } from '../services/dynamicModelChecks';
import { checkIf,arrayOps} from '../../../shared/shared';

let vehiclegroups = [
    {
        id:'normalGroup',
        vehicles:[ /* OR || one of ... */
                    [{prop:'vehicle',val:'car'}],
                    [{prop:'vehicle',val:'taxa'}],
                    [{prop:'vehicle',val:'van'}]                   
                ]
    }
]

function modelVal (model:valuePairs[],propName:string) {

    let obj_ = model.find(el => el.prop == propName)

    return obj_ ? obj_.val : undefined

}

export let columnIDRules:rulesForColumns[] = [
    {
        needsEither:[

            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'fuel',val:'diesel'}]                    
                ]
            ],
            [ /* AND && */
                vehiclegroups.find(el => el.id == 'normalGroup').vehicles /* is either car,van or taxa  */
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let isEjerAfgift = new checkModelProperties(model).isEjerAfgift();

            return isEjerAfgift 
                ? '_car&van_ejerAfgift_udligning_'  /* no difference on van,car, taxa with with rules */   
                : (modelVal(model,'vehicle') == 'car') /* ... but old vægtafgiftsregler differs */
                    ? '_car&taxa_vaegtAfgift_udligning_'
                    : '_van_vaegtAfgift_udligning_'   
                          
        }

    },
    {
        needsEither:[
            [ 
                [ 
                    [{prop:'fuel',val:'benzin'}],
                    [{prop:'fuel',val:'hybrid'}],
                    [{prop:'fuel',val:'diesel'}]                        
                ]
            ],
            [     
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'car'}],
                    [{prop:'vehicle',val:'van'}]                   
                ]                    
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let isEjerAfgift = new checkModelProperties(model).isEjerAfgift();

            return isEjerAfgift 
                ? '_car&van_ejerAfgift_forbrugsAfgift_' 
                : /* is then vægtafgift */ (modelVal(model,'vehicle') == 'car') 
                    ? '_car_vaegtAfgift_forbrugsAfgift_'
                    : '_van_vaegtAfgift_forbrugsAfgift_'     
                
        }
    },
    {
        needsEither:[

            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'truck'},
                    {prop:'size',val:'large'},
                    {prop:'typeTruck',val:'truck'}]                                                                
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let model_      = new checkModelProperties(model),
                axesTruck   = model_.val('axesTruck_Regular'),
                suspension  = model_.val('suspension')

            return `_truck_largeTruck_${axesTruck}_${suspension}_`
                       
        }
    },
    {
        needsEither:[

            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'truck'},
                    {prop:'size',val:'large'},
                    {prop:'typeTruck',val:'roadTrain'}]                                                                
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let model_          = new checkModelProperties(model),
                axesTruck       = model_.val('axesTruck_roadTrain'),
                axesRoadTrain   = model_.val('axesTruck_roadTrain_road'),
                suspension      = model_.val('suspension')

            return `_truck_largeTruck_${axesTruck}_roadTrain_${axesRoadTrain}_${suspension}_`
                       
        }
    },
    {
        needsEither:[

            [ /* AND && */
                [ /* OR || one of ... */
                    [
                        {prop:'vehicle',val:'truck'},
                        {prop:'size',val:'small'},
                        {prop:'fuel',val:'benzin'}
                    ],
                    [
                        {prop:'vehicle',val:'truck'},
                        {prop:'size',val:'small'},
                        {prop:'fuel',val:'diesel'}
                    ]                                                                               
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let model_          = new checkModelProperties(model),
                truckType       = model_.val('smallTruckType'), /* paahaengskoretowj eller motorkoretoj */
                axesTruck       = model_.val('axesTruck_small')

            return `_truck_smallTruck_${truckType}_forbrugsAfgift_${axesTruck}`
                       
        }
    },
    {
        needsEither:[

            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'truck'},
                    {prop:'size',val:'small'},
                    {prop:'fuel',val:'diesel'}]                                                                       
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let model_          = new checkModelProperties(model),
                truckType       = model_.val('smallTruckType'), /* paahaengskoretoej eller motorkoretoj */
                axesTruck       = model_.val('axesTruck_small')

            return `_truck_smallTruck_${truckType}_udligning_${axesTruck}`
                       
        }
    },
    {
        needsEither:[

            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'van'},
                     {prop:'period',val:'1'}],

                    [{prop:'vehicle',val:'van'},
                     {prop:'period',val:'2'}],

                    [{prop:'vehicle',val:'van'},
                     {prop:'period',val:'3'}],

                    [{prop:'vehicle',val:'van'},
                     {prop:'period',val:'4'},  
                     {prop:'subPeriod',val:'2'}],  

                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let model_ = new checkModelProperties(model),
                weight = model_.val('weightVan')

            return `_van_privatAnvendelsesAfgift_modern_${weight}_`
                       
        }
    }

] 