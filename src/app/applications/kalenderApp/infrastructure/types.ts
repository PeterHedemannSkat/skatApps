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
    id:string    
    txt?:string
} 

export interface period {
    period:number,
    year:number
}

export interface deadlineRule {
    id:string,
    periods:number,
    rules:dateRules
}

export interface exceptionsDeadlineRules {
    specificPeriod:number,
    id:string,
    rules:dateRules
}

export interface findDateObj {
    periods:number,
    id:string,
    rules:dateRules,
    period:period
}


export interface deadlineDate {
    type:string,
    deadline:Date,
    period:period,
    txt?:string
}

export interface deadlineManualDate {
    id:string,
    deadline:string,
    period:period,
    txt?:string
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
    punktafgifter:string[]

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