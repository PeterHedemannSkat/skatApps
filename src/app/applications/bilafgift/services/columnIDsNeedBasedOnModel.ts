import { valuePairs,rulesForColumns } from '../infrastructure/interfaces.bilafgifter';
import { checkIf,arrayOps} from '../../../shared/shared';
import { checkModelProperties } from './dynamicModelChecks'

export class ColumnPairing {

    constructor(private model:valuePairs[], private rules:rulesForColumns[],private userInput?:string) {}

    /* TODO - make it a wrapper for 
    
    _van_privatAnvendelsesAfgift_old_mindre
       */

    getColumns() {

         let columnIDs = this.rules
            .filter(el => {
                    return new checkIf<valuePairs[][][]>().allIn(el.needsEither).areComplientTo(el => {                
                        let a = new checkIf<valuePairs[][]>().someIn(el).areComplientTo(el => {
                            return new checkIf<valuePairs[]>().someIn(el).areComplientTo(el => {
                                return new arrayOps<valuePairs>(el).allValuesArePresentIn(this.model)   
                            }) 

                        }) 
                        
                        return a             
                    })             
                })
                .map(el =>  el.getColumn(this.model))
                .filter(el => el && el.length > 0)

            /* special check because rules has not access to the userInputValue   */
            
            let isOldPrivatAnvendelse = new checkModelProperties(this.model).isOldPrivatAnvendelseRules() 
                && new checkModelProperties(this.model).val('privateUsage')

            let isNewPrivatAnvendelse =  
                new checkModelProperties(this.model).isModernPrivatAnvendelseRules() && 
                new checkModelProperties(this.model).val('privateUsage') &&
                new checkModelProperties(this.model).isVaegtAfgift()

                                          
            if (isOldPrivatAnvendelse) columnIDs.push(this.addPrivatAnvendelsesAfgiftOld()) 
            if (isNewPrivatAnvendelse) columnIDs.push(this.addPrivatAnvendelsesAfgiftNew()) 

            return columnIDs

    }

    private addPrivatAnvendelsesAfgiftOld() {

        let weight = Number(this.userInput) > 2000 ? 'over2tons' : 'mindreEnd2tons';

        return `_van_privatAnvendelsesAfgift_old_${weight}_` 

    }

    private addPrivatAnvendelsesAfgiftNew() {

        let weight       = Number(this.userInput) > 3000 ? '3tonsogTungere' : 'mindreEnd3tons',
            isEjerAfgift = new checkModelProperties(this.model).isEjerAfgift(),
            type         = isEjerAfgift ? 'twiceAYear' : 'onceAYear'  

        

        return `_van_privatAnvendelsesAfgift_modern_${type}_${weight}_` 

    }

}

function modelVal (model:valuePairs[],propName:string) {

    let obj_ = model.find(el => el.prop == propName)

    return obj_ ? obj_.val : undefined

}