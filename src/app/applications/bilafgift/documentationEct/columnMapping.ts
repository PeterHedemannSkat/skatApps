import { valuePairs } from '../infrastructure/interfaces.bilafgifter';
import { checkIf,arrayOps} from '../../../shared/shared';


class checkModelProperties {

    constructor (private model:valuePairs[]) {}

    isEjerAfgift() {

        /* assuming it is car/taxa - if it returns false we are not sure whether it is udlignings-table */

        let period      = this.val('period'),
            subPeriod   = this.val('subPeriod'),
            vehicle     = this.val('vehicle')

        return (vehicle == 'car' || vehicle == 'taxa')
                ? /* car and taxa */
                    period == '1' || (period == '2' && subPeriod == '1')   
                : /* van */  
                    vehicle == 'van' && 
                        ((Number(period) >= 1 && Number(period) <= 5) || (period == '6' && subPeriod == '1'))  

    }

    isModernPrivatAnvendelseRules() {

        let period      = this.val('period'),
            subPeriod   = this.val('subPeriod'),
            vehicle     = this.val('vehicle')

        return (vehicle == 'van') 
            ?
                (Number(period) >= 1 && Number(period) <= 3) || /* 2008 og frem */
                (period == '4' && subPeriod == '2') /* 25. april - 31. dec. 2007 */
            :
                false

    }

    isOldPrivatAnvendelseRules() {

        let period      = this.val('period'),
            subPeriod   = this.val('subPeriod'),
            vehicle     = this.val('vehicle')

        return (vehicle == 'van') 
            ?
                (period == '5') || /* 1999 - 2006 */
                (period == '4' && subPeriod == '1') || /* 1. jan - 24. april 2007 */
                (period == '6' && subPeriod == '2')  /* 3. juni - 31. dec 1998 */
            :
                false

    }

    isAllPrivatAnvendelse() {

        return this.isOldPrivatAnvendelseRules() || this.isModernPrivatAnvendelseRules()
  
    }

    val(id:string) {

        let obj_ = this.model.find(el => el.prop == id)

        return obj_ ? obj_.val : undefined
    }

}

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

interface dynamic {
    (model:valuePairs[]):void
}

interface rulesForColumns {
    needsEither:valuePairs[][][][],
    getColumn:dynamic
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
                ? 'car&van_ejerAfgift_udligningsafgift'  /* no difference on van,car, taxa with with rules */   
                : (modelVal(model,'vehicle') == 'car') /* ... but old vægtafgiftsregler differs */
                    ? 'car&taxa_vaegtAfgift_udligning'
                    : 'van_vaegtAfgift_udligning'   
                          
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
                ? 'car&van_ejerAfgift_forbrugsAfgift' 
                : (modelVal(model,'vehicle') == 'car') 
                    ? 'car_vaegtAfgift_forbrugsAfgift'
                    : 'van_vaegtAfgift_forbrugsAfgift'     
                
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
                suspension = model_.val('suspension')

            return `largetruck_truck_${axesTruck}_suspension${suspension}`
                       
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

            return `truck_largetruck_roadTrain_${axesTruck}_roadTrain_${axesRoadTrain}_suspension${suspension}`
                       
        }
    }

] 


export class ColumnPairing {

    constructor(private model:valuePairs[], private rules:rulesForColumns[]) {}

    getColumns() {

         return this.rules.filter(el => {
                return new checkIf<valuePairs[][][]>().allIn(el.needsEither).areComplientTo(el => {                
                    let a = new checkIf<valuePairs[][]>().someIn(el).areComplientTo(el => {
                        return new checkIf<valuePairs[]>().someIn(el).areComplientTo(el => {
                            return new arrayOps<valuePairs>(el).allValuesArePresentIn(this.model)   
                        }) 

                    }) 
                     
                    return a             
                })             
            }).map(el =>  el.getColumn(this.model))
    }



}

function modelVal (model:valuePairs[],propName:string) {

    let obj_ = model.find(el => el.prop == propName)

    return obj_ ? obj_.val : undefined

}