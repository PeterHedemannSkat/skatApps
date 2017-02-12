import { checkIf,arrayOps} from '../../../shared/shared';
import { valuePairs,rulesForModel } from '../infrastructure/interfaces.bilafgifter';
import { parametersNeeded } from '../data/modelStructure.data'

export class modelEngine {

    constructor (private model:valuePairs[],private rules:rulesForModel[]) {}

    allParametersNeeded_Cached:string[] = []

    allParameters() {

        return [].concat(this.allParametersDynamicCheck(),this.allParametersNeeded_())
    }

    private allParametersDynamicCheck() {
    
        return this.rules
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
            .map(el => el.id)
            .reduce((p,v) => {
                return p.concat(v)
            },[])
    }

    private allParametersNeeded_() {

        return (this.allParametersNeeded_Cached.length > 0) 
            ? this.allParametersNeeded_Cached
            : this.rules
            .filter(el => {

                // true if one of the elements in modelIsEither are a part of this.model -- OR         
                return new checkIf<valuePairs[]>().someIn(el.staticCheck).areComplientTo(el => {
                    return new arrayOps<valuePairs>(el).allValuesArePresentIn(this.model)
                })
                
            })
            .map(el => el.id)
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






