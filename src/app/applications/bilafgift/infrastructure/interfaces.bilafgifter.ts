interface optionGroup {
    label:string,
    options:optionGroup

}

interface option {
    value:string,
    text:string
}

interface specialValues {
    id:string,
    val:number,
    units:number
}

interface rulesForModel {
    id:string,
    dynamicFn:dynamic[],
    staticCheck:valuePairs[][]
}

interface tableData {
    columnData:number[],
    specialData:specialValues[],
    id:string,
    period:periods,
    type:string
}

interface languageText {
    id:string,
    da:string,
    en?:string,
    children?:languageText[]
}

interface interval {
    id:string,
    data:number[],
    type?:number,
    toMap?:number,
    fromMap?:number
}

interface specialColumns {
    id:string,
    endIndex?:boolean,
    startIndex?:boolean
}

interface dynamic {
    (model:valuePairs[]):string
}

interface dynamicBoolean {
    (model:valuePairs[]):boolean
}


interface valuePairs {
    prop:string,
    val:string
}

interface IFormatter <T> {
    (data: T): boolean;
};
 
interface intervalTypeMapping{
    validFor:validTypes,
    tableType:string
}

interface parameterCheck {
 
    parametersNeeded?:string[],
    modelIsEither?:valuePairs[][],
    dynamicFn?:dynamicBoolean[]
}

interface parameter {
    id:string,
    label:languageText,
    options:languageText[]
}

interface rulesForColumns {
    needsEither:valuePairs[][][][],
    getColumn:dynamic
}

interface validTypes {
    stringSearch?:string[],
    columnIds?:string[],
    notTheseIds?:string[],
}

interface dataMapping {

    validFor:validTypes
    multiYearBase:boolean,
    baseForFuture?:boolean,
    hardcoded:boolean   
    periods?:basePeriods[]
}

interface basePeriods {
    baseYear:number,
    from:number,
    to:number
}

interface periods {
    same:boolean,
    validFor:validTypes,
    period?:number,
    periodIndex?:number[]

}

interface singleData {

    value:number,
    id:string

}

interface cellExtract {
    val:number,
    object?:specialValues
}


class intervals {
    constructor (public from:number,public to:number) {}
}

interface calculatedData extends cellExtract  {
    period:periods,
    id:string,
    index:number
}

export {
    optionGroup,
    option,
    specialValues,
    tableData,
    languageText,
    interval,
    intervals,
    specialColumns,
    dynamic,
    valuePairs,
    parameterCheck,
    parameter,
    IFormatter,
    rulesForModel,
    rulesForColumns,
    validTypes,
    dataMapping,
    basePeriods,
    intervalTypeMapping,
    periods,
    singleData,
    cellExtract,
    calculatedData
}