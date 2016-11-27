import { Injectable,Inject } from '@angular/core';
import { Rules,Exceptions } from '../data/rulesForPligter';
import { deadlineRule,findDateObj,deadlineManualDate,period,datePeriod,deadlineInfo,data,deadlineView,interval } from '../infrastructure/types';
import { Observable } from 'rxjs/Observable'; 
import { CalenderServices,excludeDates,getJSONdata } from '../../../shared/shared'

@Injectable()
export class Deadline {

    from:Date = new Date(2016,0,1)
    to:Date = new Date(2016,1,1)
    limitYears:boolean = true
    minLimitYears:number = 5;
    topLimitYears:number = 5;
    now:Date = new Date(2016,11,3);
    developmentMode:boolean = true;
    url:string; 
    urlManualDeadlines:string;
    testDate:boolean = false;
    showDaysBefore:number = 4;
    isViewed:boolean = true;

    goBackShown:boolean = true;
    goForwardShown:boolean = true

    showItems:number = 4;

    state:data = {
        moms:['moms_kvartal'],
        loonsum:[],
        askat:[],
        EUsalgUdenMoms:[],
        OneStopMoms:[],
        selvangivelse:['erhvervsdrivende'],
        punktafgifter:[]
    }

    deadlines:Promise<deadlineInfo[]>;
    viewData:ViewDeadline

    constructor (@Inject(CalenderServices) public dateService:CalenderServices,@Inject(getJSONdata) public dataProvider:getJSONdata) {

        let from  = this.dateService.moveDateByDays(this.now, this.showDaysBefore * -1),
             to   = this.dateService.moveDateByDays(this.now, 50)  

        this.viewData = new ViewDeadline(from,to)

        this.setPligter();

        console.log(this.isViewed)

    }

    dateShiftCoefficent () {
        /* kan præciseres afhængig af antallet af viste pligter og pligternes hyppighed, */
        return 100
    }

    setPligter () {

       

        let firstCalenderLook = localStorage.getItem('calenderIsViewed') 

        if (JSON.parse(firstCalenderLook)) {

            this.isViewed = true
            this.state = JSON.parse(localStorage.getItem('pligter'))

        } else {

            localStorage.setItem('calenderIsViewed','true') 
            this.isViewed = false 

        }

    }

    setViewDates (from:Date,to:Date) {

        this.viewData.dateInterval.from = from
        this.viewData.dateInterval.to = to

    }


    /*  KEY METHOD - 200 code-lines, can it be smaller?  */ 

    fetchTenDeadlines(direction:string):Promise<deadlineInfo[]> {

        return new Promise (resolve => {
            /* current View edge dates */
            let fromDate    = this.viewData.dateInterval.from,
                toDate      = this.viewData.dateInterval.to,
                self        = this
            
            /* absolute edge dates */
            let minFrom = this.dateService.moveDateByXYears(this.dateService.now,this.minLimitYears * -1),
                maxTo   = this.dateService.moveDateByXYears(this.dateService.now,this.topLimitYears)
           
            let from:Date,to:Date
            let onEdgeDate:boolean = false


            this.goBackShown = true;
            this.goForwardShown = true;

            /* KEY looping internal fn iterating until X deadlines has been found and then resolving  */
            let getViewGroup = function (i:number) {

                /*

                    1. we get the i, the iterating index
                    2. depending on move we calculate the new periods to test if VIEW-list is ok (eg. more than 5 deadlines) 
                    3. get the deadlines of the testing period
                    4. if enough deadlines or edge we are good and resolve
                    5. if not expand period until enough deadlines  

                 */

                switch (direction) {

                    case 'state':
                        from = fromDate;
                        to   = self.dateService.moveDateByDays(fromDate,self.dateShiftCoefficent() * i)        
                        break;          

                    case 'next':
                        from    = toDate;
                        to      = self.dateService.moveDateByDays(toDate,self.dateShiftCoefficent() * i)
                        break;

                    case 'back':
                        from    = self.dateService.moveDateByDays(fromDate,self.dateShiftCoefficent() * -1 * i)
                        to      = self.dateService.moveDateByDays(fromDate,-1)
                        break

                }

                /* overwrite - here the View Group is less than 5 (list-number), because it's close to edgeDate */
                if (from < minFrom) {
                    from = minFrom
                    onEdgeDate = true
                }

                if (to > maxTo) {
                    to = maxTo
                    onEdgeDate = true
                }
 
                self.getDeadLines(from,to).then(deadlines => {

                    let maybePrintet = (direction == 'next') ? self.viewData.edgeDeadlinesEnd.length : self.viewData.edgeDeadlinesStart.length, 
                        listItems  = self.showItems + maybePrintet 
                    
                    if (deadlines.length > listItems || onEdgeDate) {

                        let shownItems:deadlineInfo[] = []

                        if (direction == 'back') {

                            shownItems = deadlines.slice(deadlines.length - self.showItems)
                            
                        } else {

                            shownItems = deadlines
                                .filter(el => {
                                    return !self.viewData.edgeDeadlinesEnd.reduce((state,deadline) => {
                                        return self.compareDeadlineInfo(deadline,el) ? true : state
                                    },false)   
                                })
                                .slice(0,self.showItems)
                                
                        }

                        let lastDate        = (shownItems.length > 0) ? shownItems[shownItems.length - 1].date : to,
                            firstDate       = (shownItems.length > 0) ? shownItems[0].date : from,
                            catchedGroup    = shownItems.filter(el => el.date.getTime() == lastDate.getTime())
                        
                        /* 
                            when moving back we move TO one day back (FROM goes back with dateShiftCoefficent * i), but moving forward we take the last date shown and catches 
                            edge TO dates, so they aren't show in the new View-list   
                        */

                        self.viewData.edgeDeadlinesEnd = catchedGroup;
                        self.viewData.dateInterval.from = firstDate;
                        self.viewData.dateInterval.to = lastDate;

                        /* 
                            We need to know what hides one back/forward, because of edgeDates they CAN be empty. Thus 
                            buttons need to be hidden, so user cannot move in that direction
                        */

                        if (direction == 'back' || direction == 'state') {

                            let fromBackward = self.dateService.moveDateByDays(firstDate,self.dateShiftCoefficent() * -1 * (i + 1))

                            if (fromBackward <  minFrom) {

                                let toBackwward = self.dateService.moveDateByDays(firstDate,-1)

                                self.getDeadLines(minFrom,toBackwward).then(oneBackDeadlines => {         
                                    if (oneBackDeadlines.length == 0) self.goBackShown = false
                                })

                            }  
                        }

                        if (direction == 'next' || direction == 'state') {

                            let toForward = self.dateService.moveDateByDays(lastDate,self.dateShiftCoefficent()  * (i + 1))

                            if (toForward >  maxTo) {

                                self.getDeadLines(lastDate,maxTo).then(oneForwardDeadlines => {     

                                    oneForwardDeadlines.reduce((p,v) => {return p},0)

                                    /* checks if any DLs in View is also in future View, calculates */
                                    oneForwardDeadlines = oneForwardDeadlines.filter(DL => {
                                        /* looper alle DL i future Views, hvis ikke i present View EdgeDates så true  */
                                        return catchedGroup.reduce((state,deadline) => {
                                           return !self.compareDeadlineInfo(deadline,DL) ? true : state
                                        },false)
                                                 
                                    })

                                    if (oneForwardDeadlines.length == 0) self.goForwardShown = false
                                })
                            }  
                        }

                        if (shownItems.length <= 3 && shownItems.length > 0) {

                            let toggle = (direction == 'back') ? 'goBackShown' : 'goForwardShown';
                            self[toggle] = false

                        }
                            /* YES, deadlines CAN be returned */

                        resolve(shownItems)
                        
                    } else {

                        /* 
                            the demanded number of deadlines was not found, we need to expand our date range according to direction 
                            until we find X number of deadlines
                        */

                        if (self.getPligterForCurrentState().length > 0) {
                            
                            /* go get some more deadlines!  */ 
                            getViewGroup(++i)

                        } else {
                            /* UNLESS if no pligter, then it will iterate unending, which should be prevented (thus resolved)  */
                            resolve([])
                        } 

                    }
                }) 
        }

        /* Start loop!  */
        getViewGroup(1)

        })

    }

    compareDeadlineInfo (deadlineInfo1:deadlineInfo,deadlineInfo2:deadlineInfo) {

        return   deadlineInfo1.id == deadlineInfo2.id &&
                 deadlineInfo1.period.year == deadlineInfo2.period.year &&
                 deadlineInfo1.period.period == deadlineInfo2.period.period           
    }

    getDeadLines (from:Date,to:Date):Promise<deadlineInfo[]> {

        return new Promise (resolve => {

            let pligter = this.getPligterForCurrentState(),
                self = this,
                deadlinesPromises = pligter.map(pligt => {
                    return self.getDeadlinesForPeriodFromDates(from,to,pligt)
                })

            Promise.all(deadlinesPromises).then(allDeadlines => {

                let all:deadlineInfo[] = allDeadlines
                    .reduce((storage,deadLine) => {
                        return storage.concat(deadLine)
                    },[])
                
                all.sort((a,b) => {
                    return a.date.getTime() - b.date.getTime()
                })

                resolve(all)
            })
        })
    }

    getPligterForCurrentState ():string[] {

        let newLoonSum:string[] = []

        if (this.state.loonsum.length > 0) {

            if (this.state.loonsum.indexOf('loonsum_method2') > -1) newLoonSum.push('loonsum_method2')
            if (this.state.loonsum.indexOf('loonsum_method4B') > -1) newLoonSum.push('loonsum_method4B')
            if (this.state.loonsum.indexOf('loonsum_method1') > -1 || this.state.loonsum.indexOf('loonsum_method3') > -1 || this.state.loonsum.indexOf('loonsum_method4A') > -1) newLoonSum.push('loonsum_method134')

        }

        let pligter:string[] = [].concat(this.state.moms,newLoonSum,this.state.askat,this.state.EUsalgUdenMoms,this.state.OneStopMoms,this.state.selvangivelse,this.state.punktafgifter) 

        return pligter

    }

    getDeadlinesForPeriodFromDates (from:Date,to:Date,id:string):Promise<deadlineInfo[]> {

        return new Promise(resolve => {

            let fromPromise     = this.closestDeadlineAfterOrBeforeDate(id,from,'after'),
                afterPromise    = this.closestDeadlineAfterOrBeforeDate(id,to,'before')

            Promise.all([fromPromise,afterPromise]).then(edgeDates => {

                let fromPeriodDate  = edgeDates[0],
                    toPeriodDate    = edgeDates[1]
                
                this.getDeadlinesForPeriods(fromPeriodDate.period,toPeriodDate.period,id).then(deadLines => {
                    resolve(deadLines)
                })
                
            })
        })
    }

    getDeadlinesForPeriods (from:period,to:period,id:string):Promise<deadlineInfo[]> {

        return new Promise(resolve => {

            let  period:period = from,
                 rulesObj = Rules.find(el => el.id == id),
                 datesPromises:Promise<Date>[] = [],
                 periods:period[] = []

            /* big OR test here, iterating all periods */

            while (
                /* 1. test is the normal case, eg. inside a year */
                (period.year == from.year && period.year == to.year && period.period >= from.period && period.period <= to.period) ||
                /* 2. test is fast track, approving all periods when year is between from and to */
                (period.year > from.year && period.year < to.year) || 
                /* 3. test is 1. year of 2+ years span  */
                (period.year == from.year && to.year > period.year && period.period >= from.period) ||
                /* 4. test is last year of 2+ years span  */
                (period.year == to.year && from.year < period.year && period.period <= to.period) 

            ) {

                let newRulesObj  = Object.assign({period:period},rulesObj),
                    dateObs      = this.getDeadlinePeriod(newRulesObj)
                
                /* pushing to promise-collection */
                datesPromises.push(dateObs)
                periods.push(period)

                /* incrementing period */
                period = this.movePeriod(period,1,id)

            }

            Promise.all(datesPromises).then(values => {

                let periodsDatesMapping:deadlineInfo[] = values.map((date,i) => {
                    return {
                        period:periods[i],
                        date:date,
                        id:id
                    }
                })

                resolve(periodsDatesMapping)
            })

        })
    }

    closestDeadlineAfterOrBeforeDate (id:string,date:Date,include:string):Promise<datePeriod> {

        return new Promise(resolve => {
            
            let self            = this,
                i               = 0,
                FN:Object       = {
                    before:function (deadlineDate:datePeriod) {

                        if (deadlineDate.date <= date) {
                            resolve(deadlineDate)
                        } else {      
                            getDeadline(--i);
                        }
                    },
                    after:function (deadlineDate:datePeriod) {

                        if (deadlineDate.date >= date) { 
                            periodDate = deadlineDate 
                            getDeadline(--i);
                        } else {            
                            resolve(periodDate)
                        }
                    }
                }

            let testFn = FN[include]
            let periodDate:datePeriod = {period:{year:0,period:0},date:new Date()}

            let getDeadline = function (i:number) {
                    self.getClosestDeadline(date,id,i).then(deadlineDate => {
                        testFn(deadlineDate)
                    })     
                }  

            getDeadline(i)   
        }) 
    }
     
    getClosestDeadline (date:Date,id:string,direction:number):Promise<datePeriod> {

        return new Promise((resolve:any) => {
            
            let isInPeriod           = this.getPeriodFromDate(date,id),
                adjacentPeriod       = this.movePeriod(isInPeriod,direction,id),
                standardRules        = Rules.find(el => el.id === id)

            let rulesObj:findDateObj = Object.assign({period:adjacentPeriod},standardRules)

            this.getDeadlinePeriod(rulesObj).then(date => {
                resolve({date:date,period:adjacentPeriod})
            })
            
        })
    }

    getPeriodFromDate (date:Date,id:string):period {

        let obj                 = Rules.find(el => el.id == id),
            periods             = obj.periods,
            periodSpan          = 12/periods,
            frame:number[][]    = [],
            year                = date.getFullYear()

        for (let month = periodSpan;month <= 12;month +=  periodSpan) frame.push([month - periodSpan,month-1])

        let period              = frame.reduce((state,interval,i) =>{
            return (date.getMonth() >= interval[0] && date.getMonth() <= interval[1]) ? i+1 : state
        },-1)

        return {period:period,year:year}

    }

    movePeriod (period:period,moves:number,id:string):period {

        let periods             = Rules.find(el => el.id == id).periods,
            originalPeriod      = period.period,
            originalYear        = period.year,
            movesAbs            = Math.abs(moves),
            direction           = (moves < 0) ? '<' : '>',
            newPos              = originalPeriod + moves,
            newPeriod:number,
            newYear:number

        /* first check if it's an easy one - in the same year - otherwise do math look in logik  */
        if (newPos <= periods && newPos > 0) {

            newPeriod   = newPos;
            newYear     = originalYear;

        } else {

            /* rest is the moves BEYOND moves in the starting (period-block) [which is different depending on moving down or up]. Years and end period can be deffered from this  */

            let rest                = (direction == '>') ? (movesAbs - (periods - originalPeriod)) : (movesAbs - (originalPeriod - 1)),      
                yearsChange         = Math.ceil(rest/periods),
                yearDirection       = (direction == '>') ? 1 : -1,
                mod                 = rest % periods,
                patternKey:number[] = [],
                patternFn:Object    = {
                    '>':function (i:number) {
                        if (i == periods-1) patternKey.push(0); else patternKey.push(i+1);
                    },
                    '<':function (i:number) {
                        if (i == 0) patternKey.push(0); else patternKey.push(periods - i);
                    }
                }       
                
            for (let i = 0;i < periods;i++) patternFn[direction](i)

            newPeriod   = patternKey.indexOf(mod) + 1
            newYear     = originalYear + Math.ceil(yearDirection * yearsChange)

        } 
        
        return {
            period:newPeriod,
            year:newYear
        }
        
    }
    
     getDeadlinePeriod (defaultRules:findDateObj):Promise<Date> {

        return new Promise((resolve:any) => {

            this.checkForManuelExceptions(defaultRules).subscribe(el => {
                let date = el ? el : this.checkForExceptionRule(defaultRules)
                resolve(date)
            }) 
        })
    }

    checkForManuelExceptions (defaultRules:findDateObj):Observable<deadlineManualDate> {

        return Observable.create((observer:any) => {

            this.dataProvider.fetch<deadlineManualDate>(this.urlManualDeadlines).subscribe(el => {

                let returndate:any;

                let isSame =    defaultRules.id                == el.id &&
                                defaultRules.period.period     == el.period.period && 
                                defaultRules.period.year       == el.period.year
    
                if (isSame) {

                    let split   = el.deadline.split('/'),
                        year    = parseFloat(split[2]),
                        month   = parseFloat(split[1]),
                        date    = parseFloat(split[0])
                    
                    returndate = new Date(year,month-1,date)

                } else {
                    returndate = false
                }

                observer.next(returndate)
     
            })
        })
    }

    checkForExceptionRule (defaultRules:findDateObj):Date {

        /* looking in exception in the parameter defaultRules IS an exception -> overruling normal rules */

        let exception = Exceptions.find(el => el.id == defaultRules.id && el.specificPeriod == defaultRules.period.period)

        if (exception) {
            var exceptionsRules = Object.assign({period:defaultRules.period,periods:defaultRules.periods},exception)
        }
        
        return exception ? this.getdefaultDeadlineFromPeriod(exceptionsRules) : this.getdefaultDeadlineFromPeriod(defaultRules)

    }

    getdefaultDeadlineFromPeriod (rulesObj:findDateObj):Date  {

        /* 
            year of deadline, month of deadline (zero-index)
            period <-> dealine relation
            In - the period data and data about the time-span to deadlineMonth and deadline default day in month
            out - day corrected for holiday,weekends  
        */

        let year    = rulesObj.period.year,
            month   = (12/rulesObj.periods * rulesObj.period.period) + rulesObj.rules.monthAfterPeriod,   
            day     = rulesObj.rules.dateInMonth
        
        if (month >= 12) {
            year    +=  1
            month   -=  12
        }

        if (rulesObj.rules.special == 'lastDayOfMonth') day = this.dateService.daysInMonthOfYear(year)[month]  

        let exclude = {
            weekends:rulesObj.rules.onWeekends,
            holidays:rulesObj.rules.onHolidays
        }

        return this.dateService.findClosest(new Date(year,month,day),rulesObj.rules.direction,exclude)
         
    } 

} 

class ViewDeadline {

    constructor (from:Date,to:Date) {
        this.dateInterval.from = from;
        this.dateInterval.to = to;

    }

    dateInterval:interval = {
        from:new Date(),
        to:new Date()
    } 
    edgeDeadlinesStart:deadlineInfo[] = []
    edgeDeadlinesEnd:deadlineInfo[] = []

}

