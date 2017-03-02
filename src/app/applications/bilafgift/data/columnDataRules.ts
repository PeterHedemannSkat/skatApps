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

            let isEjerAfgift    = new checkModelProperties(model).isEjerAfgift(),
                isVaegtAfgift   = new checkModelProperties(model).isVaegtAfgift();

            if (isEjerAfgift) {

                return '_car&van_ejerAfgift_udligning_' 

            } else if (isVaegtAfgift) {

                if (modelVal(model,'vehicle') == 'car') {

                    return '_car&taxa_vaegtAfgift_udligning_'

                } else if (modelVal(model,'vehicle') == 'van') {

                    return '_van_vaegtAfgift_udligning_'

                } else if (modelVal(model,'vehicle') == 'taxa') {

                    return '_taxa_vaegtAfgift_udligning_'

                }
            }

            return ''
                          
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
                /* OR || one of ... */
                   vehiclegroups.find(el => el.id == 'normalGroup').vehicles /* is either car,van or taxa  */              
                                    
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let isEjerAfgift    = new checkModelProperties(model).isEjerAfgift(),
                isVaegtAfgift   = new checkModelProperties(model).isVaegtAfgift();

            if (isEjerAfgift) {

                if (modelVal(model,'vehicle') == 'car' || modelVal(model,'vehicle') == 'van') {
                    return '_car&van_ejerAfgift_forbrugsAfgift_' 
                } else if (modelVal(model,'vehicle') == 'taxa') {
                    return '_taxa_ejerAfgift_forbrugsAfgift_'
                }

                

            } else if (isVaegtAfgift) {

                if (modelVal(model,'vehicle') == 'car') {

                    if (modelVal(model,'fuel') == 'diesel') {
                        return '_car_vaegtAfgift_forbrugsAfgift_kvartal_'

                    } else if (modelVal(model,'fuel') == 'benzin') {
                        return '_car_vaegtAfgift_forbrugsAfgift_halvaar_'

                    }

                } else if (modelVal(model,'vehicle') == 'van') {
                    return '_van_vaegtAfgift_forbrugsAfgift_'

                } else if (modelVal(model,'vehicle') == 'taxa') {
                    return '_taxa_vaegtAfgift_forbrugsAfgift_'

                }

            }

            return ''

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

            let allset      = axesTruck && suspension

            return allset ? `_truck_largeTruck_${axesTruck}_${suspension}_` : ''
                       
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

            let allset          = axesTruck && axesRoadTrain && suspension

            return  allset ? `_truck_largeTruck_${axesTruck}_roadTrain_${axesRoadTrain}_${suspension}_` : ''
                       
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

            let allset          = truckType && axesTruck

            return allset ? `_truck_smallTruck_${truckType}_forbrugsAfgift_${axesTruck}_` : ''
                       
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

            let allset          = truckType && axesTruck

            return allset ? `_truck_smallTruck_${truckType}_udligning_${axesTruck}_` : ''
                       
        }
    },
    {
        needsEither:[

            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'van'}]

                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let model_      = new checkModelProperties(model),
                isModern    = model_.isModernPrivatAnvendelseRules(),
                weight      = model_.val('totalWeightVan'),
                anvendelse  = model_.val('privateUsage'),
                type        = isModern ? 'twiceAYear' : 'onceAYear'  
            
            return weight && anvendelse
                ? `_van_privatAnvendelsesAfgift_modern_${type}_${weight}_`
                : ''
                     
        }
    },
    {
        needsEither:[
            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'particleFilter',val:'nej'}]
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            let model_          = new checkModelProperties(model),
                vehicle         = model_.val('vehicle'),
                isVaegtAfgift   = model_.isVaegtAfgift()

            return vehicle != 'van' 
                ? `_particleFilter_` 
                : isVaegtAfgift 
                    ? '_van_particleFilter_vaegtAfgift_' 
                    : `_particleFilter_`   
        }
    },
    {
        needsEither:[
            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'mc'}]
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {
            return `_mc_forbrugsAfgift_`                  
        }
    },
    {
        needsEither:[
            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'mc'},
                    {prop:'fuel',val:'diesel'}]
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {
            return `_mc_udligning_`                  
        }
    },
    {
        needsEither:[
            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'trailer'}]
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {
            return `_trailer_forbrugsAfgift_`                  
        }
    },
    {
        needsEither:[
            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'camper'}]
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {
            return `_camper_forbrugsAfgift_`                  
        }
    },
    {
        needsEither:[
            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'bus'}]
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

        let model_      = new checkModelProperties(model),
            axesBus     = model_.val('axesTruck_small'),
            fuel        = model_.val('fuel')

        let allSet      = axesBus && fuel

            return allSet ? `_bus_${axesBus}_forbrugsAfgift_` : ''                 
        }
    },
    {
        needsEither:[
            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'bus'},
                    {prop:'fuel',val:'diesel'}]
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

        let model_      = new checkModelProperties(model),
            axesBus     = model_.val('axesTruck_small'),
            fuel        = model_.val('fuel')
        
        let allSet      = axesBus && fuel

            return allSet ? `_bus_${axesBus}_udligning_` : ''                  
        }
    },
    {
        needsEither:[
            [ /* AND && */
                [ /* OR || one of ... */
                    [{prop:'vehicle',val:'tractor'}]
                ]
            ]
        ],
        getColumn:(model:valuePairs[]) => {

            return '_tractor_'                
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
                euro            = model_.val('euroStandard'),
                allSet          = axesTruck && axesRoadTrain && euro,
                total           = allSet ? (Number(axesTruck) + Number(axesRoadTrain)) : -1,
                getSet          = total > 3 ? '4' : '3'

            return allSet ? `_truck_vejbenyttelsesAfgift_${getSet}_${euro}_` : ''
            
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

            let model_          = new checkModelProperties(model),
                axesTruck       = model_.val('axesTruck_Regular'),
                euro            = model_.val('euroStandard'),
                total           = axesTruck && euro ? Number(axesTruck) : -1,
                getSet          = total > 3 ? '4' : '3'

            return axesTruck ? `_truck_vejbenyttelsesAfgift_${getSet}_${euro}_` : ''
            
        }

    }


    

   

] 