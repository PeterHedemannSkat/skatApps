import { Injectable } from '@angular/core';
import { excludeDates } from '../shared'

@Injectable()
export class CalenderServices {

    private _now:Date = new Date()

    get now () {
        return this._now
    }

    set now (date:Date) {
        this._now = date
    }

    constructor () {
        // change now for test-purposes
        let date = new Date(),
            currentHour = date.getHours(),
            currentMinute = date.getMinutes() 

        //this.now = new Date(2016,10,29,currentHour,currentMinute)
    }

    catchedEasterSunday:Date[] = []

    private getEasterDayOfYear (year:number) {

        /*  source http://denstoredanske.dk/Sprog,_religion_og_filosofi/Religion_og_mystik/Folkekirkens_helligdage/påske/påske_(Beregning_af_påskedagens_dato)  */
        /*  const   M = 15, N = 6 in Julian calender, but M & N needs to be determined for Gregorian  */

        let catched = this.catchedEasterSunday.find(date => date.getFullYear() == year)

        if (catched) return catched

        let     k = Math.floor(year/100),
                p = Math.floor((13 + 8 * k)/25),
                q = Math.floor(k/4),
                M = (15 - p + k - q) % 30,
                N = (4 + k  - q) % 7,
                a = year % 19,
                b = year % 4,
                c = year % 7,
                d = (19 * a + M) % 30,
                e = (2 * b + 4 * c + 6 * d + N) % 7

        let EasterDayMarch = 22 + d + e,
            EasterDayApril = d + e - 9

        let easterMonth = (EasterDayMarch > 31) ? 3 : 2,
            easterDay   = (EasterDayMarch > 31) ? EasterDayApril : EasterDayMarch

        if (d === 29 && e === 6) easterDay = 19
        if (d === 28 && e === 6 && a > 10) easterDay = 18 

        return new Date(year,easterMonth,easterDay)

    }

    getEasterHolidaysDK (year:number) {

        let 
            daysfromeasterSunday:number[] = [-3,-2,0,1,26,39,49,50], 
            easterSunday = this.getEasterDayOfYear(year),
            easterholidays:Date[] = []

        return daysfromeasterSunday.map(daysFrom => {

            let date = new Date();
            date.setTime(easterSunday.getTime())
            date.setDate(date.getDate() + daysFrom)

            return date

        })
        
    }

    fredagfterKristiHimmelfart (year:number) {

        let easterSunday = this.getEasterDayOfYear(year)
        return this.moveDateByDays(easterSunday,40) 
        
    }


    bankHolidays (year:number):Date[] {

        let grundlovsdag                = new Date(year,4,5),
            fredagfterKristiHimmelfart  = this.fredagfterKristiHimmelfart(year),
            nytaarsAftensDag            = new Date(year,11,31)

        return [].concat(

                this.getTotalHolidaysDK(year),
                fredagfterKristiHimmelfart,
                grundlovsdag,
                nytaarsAftensDag
            
            )
    }

    getFixedHolidaysDK (year:number) {

        let juledag         = new Date(year,11,25),
            andenJuledag    = new Date(year,11,26),
            nytaarsDag      = new Date(year,0,1)
        
        return [juledag,andenJuledag,nytaarsDag]

    }

    getTotalHolidaysDK (year:number) {

        return this.getFixedHolidaysDK(year).concat(this.getEasterHolidaysDK(year))

    }

    isWeekend (date:Date) {

        let weekday = date.getDay()
        return (weekday === 6 || weekday === 0) ? true : false   
    
    }

    isHoliday (date:Date) {

        return this.getTotalHolidaysDK(date.getFullYear()).reduce((p,v) => {
            return (v.getTime() === date.getTime()) ? true : p 
        },false)

    }

    isBankHoliday (date:Date) {

        return this.bankHolidays(date.getFullYear()).reduce((p,v) => {
            return (v.getTime() === date.getTime()) ? true : p 
        },false)

    }

    findClosest (date:Date,flow:string,exclude:excludeDates) {

        /* takes a baseDate, tests whether Date is allowed and moves backward/forward and returns first allowed date. 
           If baseDate is ok it return that. 
         */

        let self = this

        let 
            isWeekend = function (date:Date) {return self.isWeekend(date)},
            isholiday = function (date:Date) {return self.isHoliday(date)},
            isbankHol = function (date:Date) {return self.isBankHoliday(date)};

        let val:Function[] = [];

        let direction:number = (flow === 'forward') ? 1 : -1;

        if (exclude.weekends)       val.push(isWeekend)
        if (exclude.holidays)       val.push(isholiday)
        if (exclude.bankholidays)   val.push(isbankHol)


        let isExcludedDate = function (date:Date) {    
            return val.reduce((p,v) =>{
                return v(date) ? true : p
            },false)
        }
    
        while (isExcludedDate(date)) {
            date.setDate(date.getDate() + direction)
        } 

        return date
    }

    private isLeapYear (year:number) {
        return new Date(year,1,29).getDate() === 29
    }

    private daysInFeb (year:number) {
        return this.isLeapYear(year) ? 29 : 28
    }

    daysInMonthOfYear (year:number) {
        return [31,this.daysInFeb(year),31,30,31,30,31,31,30,31,30,31]
    }

    moveDateByDays (date:Date,days:number):Date {  
        let newDate = this.copyDate(date) 
        newDate.setDate(newDate.getDate() + days)
        return newDate
    }

    moveDateByXYears (date:Date,years:number) {
        let newDate = this.copyDate(date) 
        newDate.setFullYear(newDate.getFullYear() + years)
        return newDate
    } 

    copyDate (date:Date) {
        let copy = new Date()
        copy.setTime(date.getTime())
        return copy
    }

    private resetDate (date:Date) {

        let resetDate = this.copyDate(date)

        resetDate.setHours(0)
        resetDate.setSeconds(0)
        resetDate.setMinutes(0)
        resetDate.setMilliseconds(0)

        return resetDate
        
    } 

    hoursFromTime (date:Date) {     
        return this.hoursBetweenDates(this.now,date)
    }

    hoursBetweenDates (date1:Date,date2:Date) {
        /* less than 4 hours style, floor would give 2  */
         return Math.ceil(this.millesecondsToHours(date2.getTime() - date1.getTime()))
    }

    daysBetweenTwoDates (date1:Date,date2:Date):number {

        /*  
            setting time 0:00:00 (fn - resetDate()) on the two dates to ensure diffence in milleseconds can be calculated properly 
            note: DST (sommertid) is taken into accound by rounding it 
            normal days have 24 hours, but las sunday in oktober it has 25 and 23 las sunday in march

            crossing NT (okt.) or DST (march) example 
                vinter to summer: 24h 24h 23h 24h 24h / 24 = 4 23/24 = 5 days 
                summer to vinter: 24h 24h 25h 24h = 4 1/24h = 4 days
        */

        let centerTime  = this.resetDate(date1),
            toDate      = this.resetDate(date2)

         /*  needs math round when day saving time (here +- 1/24)  */
        return Math.round(this.milleSecondsToDays(toDate.getTime() - centerTime.getTime()))
    }

    daysFromtoday (date:Date) {
        return this.daysBetweenTwoDates(this.now,date)
    }

    private milleSecondsToDays (milleseconds:number):number {
        return this.millesecondsToHours(milleseconds)/24
    }

    private millesecondsToHours (milleseconds:number) {
        return milleseconds/1000/60/60
    }


}