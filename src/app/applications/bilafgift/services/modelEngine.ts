import { checkIf,arrayOps} from '../../../shared/shared';
import { valuePairs } from '../infrastructure/interfaces.bilafgifter';
import { parametersNeeded } from '../data/modelStructure.data'


/* 

    deciding which parameters the model needs. User change value, we look in modelEngine to se what new 
    parameters we need.

    Is hardcoded to the 'what-data(parameters)-do-we-need-to-present-to-the-USER' data structure 
    parametersNeeded

*/

export class modelEngine {

    constructor (private model:valuePairs[]) {}

    allParametersNeeded_Cached:string[] = []

    allParameters() {

        return [].concat(this.allParametersDynamicCheck(),this.allParametersNeeded_())
    }

    private allParametersDynamicCheck() {
    
        return parametersNeeded
            .filter(v => {         
                return v.dynamicFn 
                    ? 
                        v.dynamicFn
                        .reduce((p,v) => {
                            return v(this.model) ? true : p 
                        },false) 
                    :   
                        false 

            })
            .map(el => el.parametersNeeded)
            .reduce((p,v) => {
                return p.concat(v)
            },[])
    }

    private allParametersNeeded_() {

        return (this.allParametersNeeded_Cached.length > 0) 
            ? this.allParametersNeeded_Cached
            : parametersNeeded
            .filter(el => {

                // true if one of the elements in modelIsEither are a part of this.model -- OR         
                return new checkIf<valuePairs[]>().someIn(el.modelIsEither).areComplientTo(el => {
                    
                    return new arrayOps<valuePairs>(el).allValuesArePresentIn(this.model)
                })
                
            })
            .map(el => el.parametersNeeded)
            .reduce((p,v) => {
                return p.concat(v)
            },[])

    }



    newParameters() {

        return this.allParameters().filter(parameterId => {
            // return true if it is not in the model
            return new checkIf<valuePairs>()
                .allIn(this.model)
                .areComplientTo(el => el.prop !== parameterId)
        })

    }

    unChangedParameters() {

        return this.model.filter(el => {
            return this.allParameters().indexOf(el.prop) > -1
        })

    }

    newModelBuild() {

        let newEmptyParameters:valuePairs[] = this.newParameters().map(el => {
            return {
                val:'',
                prop:el
            }
        })

        let newModel = this.unChangedParameters().slice()

        newModel.push.apply(newModel,newEmptyParameters)

        return newModel

    }

}






