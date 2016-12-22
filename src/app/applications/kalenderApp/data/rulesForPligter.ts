import {deadlineRule,dateRules,exceptionsDeadlineRules,data,RateRules} from '../infrastructure/types';

const selvangivelse:dateRules = {
    monthAfterPeriod:6, 
    dateInMonth:1,
    direction:'forward',
    onHolidays:true,
    onWeekends:true       
}

const moms_HalvaarANDKvartal:dateRules = {
    monthAfterPeriod:2, 
    dateInMonth:1,
    direction:'forward',
    onHolidays:true,
    onWeekends:true       
}

const moms_momsMaanedAND_EUsalg:dateRules = {
    monthAfterPeriod:0, 
    dateInMonth:25,
    direction:'forward',
    onHolidays:true,
    onWeekends:true       
}

const loonSumANDpunkafgifter:dateRules = {
    monthAfterPeriod:0, 
    dateInMonth:15,
    direction:'forward',
    onHolidays:true,
    onWeekends:true       
}

const oneStopMoms:dateRules = {
    monthAfterPeriod:0, 
    dateInMonth:20,
    direction:'forward',
    onHolidays:false,
    onWeekends:false       
}

const aSkatStoreVirksomheder:dateRules = {
    monthAfterPeriod:-1, 
    dateInMonth:31, /* not used, could build new property isSpecificDate */
    special:'lastDayOfMonth',
    direction:'back',
    onHolidays:true,
    onWeekends:true       
}

const aSkatSmaaVirksomheder:dateRules = {
    monthAfterPeriod:0, 
    dateInMonth:10, 
    direction:'forward',
    onHolidays:true,
    onWeekends:true       
}

const loonSumMedAnsatte:dateRules = {
    monthAfterPeriod:7, 
    dateInMonth:15, 
    direction:'forward',
    onHolidays:true,
    onWeekends:true       
}

const accontoSkat:RateRules = {

    monthAfterInitial:[2,10,13],
    dayInMonthIsStatic:false,
    dayInMonthDynamic:[20,20,1],
    onHolidays:true,
    onWeekends:true,
    direction:'forward'    

}

const bSkatteRater:RateRules = {

    monthAfterInitial:[0,1,2,3,4,6,7,8,9,10],
    dayInMonthIsStatic:true,
    dayInMonth:20,
    onHolidays:true,
    onWeekends:true,
    direction:'forward'    

}

const momsRefusion:dateRules = {

    monthAfterPeriod:8, 
    dateInMonth:30,
    direction:'forward',
    onHolidays:false,
    onWeekends:false       


}



const rules:deadlineRule[] = [
    {
        id:'moms_maaned',
        periods:12,
        rules:moms_momsMaanedAND_EUsalg
    },
    {
        id:'moms_kvartal',
        periods:4,
        rules:moms_HalvaarANDKvartal
    },
    {
        id:'moms_halvaar',
        periods:2,
        rules:moms_HalvaarANDKvartal
    },
    {
        id:'loonsum_method134',
        periods:4,
        rules:loonSumANDpunkafgifter
    },
    {
        id:'loonsum_method4B',
        periods:1,
        rules:loonSumMedAnsatte
    },
    {
        id:'loonsum_method2',
        periods:12,
        rules:loonSumANDpunkafgifter
    },
    {
        id:'oneStopMoms',
        periods:4,
        rules:oneStopMoms
    },
    {
        id:'EUsalgUdenMoms',
        periods:12,
        rules:moms_momsMaanedAND_EUsalg
    },
    {
        id:'AskatStoreVirksomhed',
        periods:12,
        rules:aSkatStoreVirksomheder
    },
    {
        id:'AskatSmaaVirksomheder',
        periods:12,
        rules:aSkatSmaaVirksomheder
    },
    {
        id:'erhvervsdrivende',
        periods:1,
        rules:selvangivelse
    },
    {
        id:'punktafgifter',
        periods:12,
        rules:loonSumANDpunkafgifter
    },
    {
        id:'selskabsskat',
        periods:1,
        rateRules:accontoSkat,
        type:'rate'
    },
    {
        id:'bSkatteRater',
        periods:1,
        rateRules:bSkatteRater,
        type:'rate'
            
    },
    {
        id:'EusalgKvartal',
        periods:4,
        rules:moms_momsMaanedAND_EUsalg
     
    },
    {
        id:'momsRefusion',
        periods:1,
        rules:momsRefusion
     
    }




    

    
]

const Exceptions:exceptionsDeadlineRules[] = [
    {
        id:'moms_maaned',
        specificPeriod:6,
        rules:{
            monthAfterPeriod:1, 
            dateInMonth:17,
            direction:'forward',
            onHolidays:true,
            onWeekends:true          
        }
    },
    {
        id:'AskatSmaaVirksomheder',
        specificPeriod:12,
        rules:{
            monthAfterPeriod:0, 
            dateInMonth:17,
            direction:'forward',
            onHolidays:true,
            onWeekends:true          
        }
    }

]

const hierachy:data = {

    moms:['moms_kvartal','moms_halvaar','moms_maaned'],
    loonsum:['loonsum_method1','loonsum_method2','loonsum_method3','loonsum_method4A','loonsum_method4B'],
    askat:['AskatStoreVirksomhed','AskatSmaaVirksomheder'],
    OneStopMoms:['oneStopMoms'],
    EUsalgUdenMoms:['EUsalgUdenMoms','EusalgKvartal'],
    selvangivelse:['erhvervsdrivende'],
    punktafgifter:['punktafgifter'],
    selskabsskat:['selskabsskat'],
    bSkatteRater:['bSkatteRater'],
    momsRefusion:['momsRefusion']

}


export {rules as Rules,Exceptions,hierachy}