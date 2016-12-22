import { excludeDates } from '../../../shared/shared'

export interface dateRules {
    dateInMonth:number,
    direction:string,
    monthAfterPeriod:number
    onHolidays?:boolean,
    onWeekends?:boolean,
    special?:string
}

export interface datePeriod {
    period:period,
    date:Date
}

export interface deadlineInfo extends datePeriod {
    id:string,
    type?:string,    
    txt?:string
} 

export interface period {
    period:number,
    year:number,
    rate?:number
}

export interface RateRules {
    monthAfterInitial:number[], 
    onHolidays?:boolean,
    onWeekends?:boolean,
    dayInMonthIsStatic:boolean,
    dayInMonth?:number,
    dayInMonthDynamic?:number[],
    direction:string
}



export interface deadlineRule {
    id:string,
    periods:number,
    rules?:dateRules,
    type?:string,
    rateRules?:RateRules

}

export interface exceptionsDeadlineRules {
    specificPeriod:number,
    id:string,
    rules:dateRules
}

export interface findDateObj extends deadlineRule  {
    period:period
}

export interface findRate extends deadlineRule {
    period:period,
    rateNumber:number
}

export interface deadlineDate {
    type:string,
    deadline:Date,
    period:period,
    txt?:string
}

export interface periodExternal extends period {
    id?:string 
}

export interface deadlineManualDate {
    id:string,
    Frist:string,
    txt?:string,
    children:periodExternal
}

export interface checkbox {
    id:string,
    values:string[]
}

export interface dataHolder {
    moms:string,
    loonSum:string
}

export interface data {
    moms:string[],
    loonsum:string[],
    askat:string[],
    EUsalgUdenMoms:string[],
    OneStopMoms:string[],
    selvangivelse:string[],
    punktafgifter:string[],
    selskabsskat:string[],
    bSkatteRater:string[],
    momsRefusion:string[]

}

export interface interval {
    from:Date,
    to:Date
}

export interface deadlineView {
    dateInterval:interval,
    edgeDeadlinesStart:deadlineInfo[],
    edgeDeadlinesEnd:deadlineInfo[],
}