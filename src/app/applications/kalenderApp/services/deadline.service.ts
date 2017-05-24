import { Injectable,Inject } from '@angular/core';
import { Rules,Exceptions,hierachy } from '../data/rulesForPligter';
import { deadlineRule,findDateObj,deadlineManualDate,period,datePeriod,deadlineInfo,data,deadlineView,interval,findRate } from '../infrastructure/types';
import { Observable } from 'rxjs/Observable'; 
import { CalenderServices,excludeDates,getJSONdata,MathCalc,multiGears } from '../../../shared/shared'

interface extendedNumber extends Number {
    highherThan?: Function
}

@Injectable()
export class Deadline {


    /* 
        skat.dk produktions url 
        https://www.skat.dk/websrv/jsong.ashx?Id=66594 

        *** HUSK module change here developmentMode AND getJSONdata production keys ***

    */
         

    from:Date = new Date(2016,0,1)
    to:Date = new Date(2016,1,1)
    limitYears:boolean = true
    minLimitYears:number = 1;
    topLimitYears:number = 4;
    now:Date = new Date();
    developmentMode:boolean = false; // remember json-service change and module change !!!
    url:string = 'websrv/jsong.ashx?Id=66594'; 
    urlManualDeadlines:string = 'websrv/jsong.ashx?Id=134179';
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
        punktafgifter:[],
        selskabsskat:[],
        bSkatteRater:['bSkatteRater'],
        momsRefusion:[]
    }

    deadlines:Promise<deadlineInfo[]>;
    viewData:ViewDeadline

    constructor (@Inject(CalenderServices) public dateService:CalenderServices,@Inject(getJSONdata) public dataProvider:getJSONdata) {

        let from  = this.dateService.moveDateByDays(this.now, this.showDaysBefore * -1),
             to   = this.dateService.moveDateByDays(this.now, 50)  

        this.viewData = new ViewDeadline(from,to)

        this.setPligter();

    }
    
    dateShiftCoefficent () {
        /* kan præciseres afhængig af antallet af viste pligter og pligternes hyppighed, */
        return 100

    }

    setPligter () {

        let firstCalenderLook = localStorage.getItem('calenderIsViewed') 

        if (JSON.parse(firstCalenderLook)) {

            this.isViewed = true

            let pligterStored = JSON.parse(localStorage.getItem('pligter'));

            for (let pligtgroup in hierachy) {
                if (!(pligtgroup in pligterStored)) pligterStored[pligtgroup] = []  
            }

            this.state = pligterStored

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

        return new Promise(resolve => {

            
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
                        //to      = self.dateService.moveDateByDays(fromDate,-1)
                        to      = fromDate
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

                            shownItems = deadlines
                                .filter(el => {
                                    return !self.viewData.edgeDeadlinesStart.reduce((state,deadline) => {
                                        return self.compareDeadlineInfo(deadline,el) ? true : state
                                    },false)   
                                })

                            shownItems = shownItems.slice(shownItems.length - self.showItems)

                            
                        } else if (direction == 'next') {

                            shownItems = deadlines
                                .filter(el => {
                                    return !self.viewData.edgeDeadlinesEnd.reduce((state,deadline) => {
                                        return self.compareDeadlineInfo(deadline,el) ? true : state
                                    },false)   
                                })
                                .slice(0,self.showItems)

                        } else {

                            shownItems = deadlines.slice(0,self.showItems)

                        }

                        let lastDate        = (shownItems.length > 0) ? shownItems[shownItems.length - 1].date : to,
                            firstDate       = (shownItems.length > 0) ? shownItems[0].date : from,
                            catchedGroup    = shownItems.filter(el => el.date.getTime() == lastDate.getTime()),
                            cachedFirst     = shownItems.filter(el => el.date.getTime() == firstDate.getTime())
                        
                        /* 
                            when moving back we move TO one day back (FROM goes back with dateShiftCoefficent * i), but moving forward we take the last date shown and catches 
                            edge TO dates, so they aren't show in the new View-list   
                        */

                        self.viewData.edgeDeadlinesEnd      = catchedGroup;
                        self.viewData.edgeDeadlinesStart    = cachedFirst;
                        self.viewData.dateInterval.from     = firstDate;
                        self.viewData.dateInterval.to       = lastDate;



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



    getDeadLines (from:Date,to:Date):Promise<deadlineInfo[]> {

        return new Promise(resolve => {

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

        let pligter:string[] = [].concat(this.state.moms,newLoonSum,this.state.askat,this.state.EUsalgUdenMoms,this.state.OneStopMoms,this.state.selvangivelse,this.state.punktafgifter,this.state.selskabsskat,this.state.bSkatteRater,this.state.momsRefusion) 

        return pligter

    }

    getDeadlinesForPeriodFromDates (from:Date,to:Date,id:string):Promise<deadlineInfo[]> {

        return new Promise(resolve => {

                let rules = Rules.find(rule => rule.id == id)

                let fromPromise = (rules.type == 'rate') ? this.nextRatePeriodBasedOnDate(from,id,'from') : this.closestDeadlineAfterOrBeforeDate(id,from,'after') 
                let afterPromise = (rules.type == 'rate') ? this.nextRatePeriodBasedOnDate(to,id,'to') : this.closestDeadlineAfterOrBeforeDate(id,to,'before') 

            Promise.all([fromPromise,afterPromise]).then(edgeDates => {

                let fromPeriodDate  = edgeDates[0],
                    toPeriodDate    = edgeDates[1]

                    this.getDeadlinesForPeriods(fromPeriodDate.period,toPeriodDate.period,id).then(deadLines => {
                        resolve(deadLines)
                    })
     
            })
        })
    }

    getDeadlinesForPeriods(from:period,to:period,id:string):Promise<deadlineInfo[]> {

        return new Promise(resolve => {

            let  period:period = from,
                 rulesObj = Rules.find(el => el.id == id),
                 datesPromises:Promise<Date>[] = [],
                 periods:period[] = [],
                 rate = 0

            if (rulesObj.type == 'rate') {
                rate = rulesObj.rateRules.monthAfterInitial.length
            }

            let periodObj = new Period(from,rulesObj.periods,rate)

            /*  pga edge kan denne fn spørge på periode, hvor fra ligger efter til. Derfor vil den loope uendeligt  */
          
            while (periodObj.isEarlierOrEqualToThisPeriod(to)) {

               let newRulesObj  = Object.assign({period:periodObj.period},rulesObj),
                    dateObs      = this.getDeadlinePeriod(newRulesObj)

                /* pushing to promise-collection */
                datesPromises.push(dateObs)
                periods.push(periodObj.period)
 
                periodObj = periodObj.movePeriodByXSteps(1)
                

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

            /* i needs to 1 because in the case of a-skat store where deadline can be before period (30. sep)  */
            
            let self            = this,
                i               = 1,
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
                standardRules        = Rules.find(el => el.id === id),
                newPeriod            = new Period(isInPeriod,standardRules.periods).movePeriodByXSteps(direction)
      
            let rulesObj:findDateObj = Object.assign({period:newPeriod.period},standardRules)

            this.getDeadlinePeriod(rulesObj).then(date => {
                resolve({date:date,period:newPeriod.period})
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

    nextRatePeriodBasedOnDate (date:Date,id:string,end:string):Promise<datePeriod> {

        /* 
            RATE
            loops all deadlines from year - 1, because selskabsskat rates is spanning 14 month 
            more than a year. We want the period that equal or later than the start/end date
            - the start period: the period with deadline immediately after/same as input date
            - the end period: the period with deadline immediately before/same as input  date

        */

        return new Promise((resolve:any) => {

            let obj      = Rules.find(el => el.id == id),
                periods  = obj.periods,
                rates    = obj.rateRules.monthAfterInitial.length,   
                prevYear = date.getFullYear() - 1

            this.getDeadlinesForPeriods({year:prevYear,period:1,rate:1},{year:date.getFullYear() + 1,period:1,rate:rates},id).then(deadlines => {
                
                let deadLines:Date[] = deadlines.map(el => el.date) 

                deadLines.unshift(new Date(prevYear,0,1))
                deadLines.push(new Date(date.getFullYear()+1,11,31))

                for (let i = 1;i < deadLines.length; i++) {

                    if (
                       deadLines[i-1].getTime() == date.getTime() ||    
                        deadLines[i-1] < date && deadLines[i] > date
                    ) {

                        let periodDateIndex = (end == 'from') ? i-1 : i-2
                        resolve(deadlines[periodDateIndex])

                    } else if (deadLines[i].getTime() == date.getTime()) {

                         //let periodDateIndex = (end == 'from') ? i : i-1
                         let periodDateIndex = i-1
                         resolve(deadlines[periodDateIndex])
                    }        

                }
            })

        })



    }
 
    /* helper method  */

     getDeadlinePeriod(defaultRules:findDateObj):Promise<Date> {

        return new Promise((resolve:any) => {

            this.checkForManuelExceptions(defaultRules).subscribe(el => {
                    
                let date = el ? el : this.checkForExceptionRule(defaultRules)
                
                resolve(date)
            }) 
        })
    }

    compareDeadlineInfo (deadlineInfo1:deadlineInfo,deadlineInfo2:deadlineInfo) {

        return   deadlineInfo1.id               == deadlineInfo2.id &&
                 deadlineInfo1.period.year      == deadlineInfo2.period.year &&
                 deadlineInfo1.period.period    == deadlineInfo2.period.period &&
                 deadlineInfo1.period.rate      == deadlineInfo2.period.rate           
    }


    checkForManuelExceptions (defaultRules:findDateObj):Observable<deadlineManualDate> {

        return Observable.create((observer:any) => {

            this.dataProvider.fetch<deadlineManualDate>(this.urlManualDeadlines).subscribe(el => {

                let returndate:any;

                /* 
                    el.children[0].period 
                    el.children[0].year   
                */

                let isSame =    defaultRules.id                == el.Id &&
                                defaultRules.period.period     == el.children[0].Periode && 
                                defaultRules.period.year       == el.children[0].year 

                                //(defaultRules.period.rate       == Number(el.children.id))

                if (defaultRules.period.rate > 0) {

                    isSame = isSame && defaultRules.period.rate == Number(el.children[0].Id)

                } 
    
                if (isSame) {

                    /* check format!!!    */

                    let split   = el.Frist.split(' ')[0].split('-'),
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
 
        if (defaultRules.type == 'rate') {

            return this.getRateDeadlineDefault(defaultRules)

        } else {

            return exception ? this.getdefaultDeadlineFromPeriod(exceptionsRules) : this.getdefaultDeadlineFromPeriod(defaultRules)

        }
   
        //return exception ? this.getdefaultDeadlineFromPeriod(exceptionsRules) : this.getdefaultDeadlineFromPeriod(defaultRules)

    }

    getdefaultDeadlineFromPeriod (rulesObj:findDateObj):Date  {

        /* 
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
            holidays:rulesObj.rules.onHolidays,
            bankholidays:rulesObj.rules.onHolidays
        }

        return this.dateService.findClosest(new Date(year,month,day),rulesObj.rules.direction,exclude)
         
    } 

    getRateDeadlineDefault (rules:findDateObj) {

        let 
            startMonth   = (rules.period.period/rules.periods) - 1,
            yearBasic    = rules.period.year,
            month        = startMonth + rules.rateRules.monthAfterInitial[rules.period.rate - 1],
            year         = (month > 11) ? (yearBasic + 1) : yearBasic,
            day          = (rules.rateRules.dayInMonthIsStatic) ? rules.rateRules.dayInMonth : rules.rateRules.dayInMonthDynamic[rules.period.rate - 1] 

        if (month > 11) month = month % 12

        let exclude = {
            weekends:rules.rateRules.onWeekends,
            holidays:rules.rateRules.onHolidays,
            bankholidays:rules.rateRules.onHolidays
        }

        let date = new Date(year,month,day)

        return this.dateService.findClosest(date,rules.rateRules.direction,exclude)


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

class Period {

    constructor (public period:period,public periods:number,public ratesInPeriod?:number) {
  
    }

    isEalierThanThisPeriod (period:period) {

        let yearIsequal     = period.year == this.period.year,
            periodIdEqual   = period.period == this.period.period

        if (period.year > this.period.year) return true 
        else if (yearIsequal && period.period > this.period.period) return true
        else if (yearIsequal && periodIdEqual && (this.period.rate == undefined || period.rate > this.period.rate)) return true

        return false
         
    }

    isEqualTo (period:period) {

        return  period.year      == this.period.year &&
                period.period    == this.period.period &&
                (this.period.rate == undefined || period.rate == this.period.rate)

    }

    isEarlierOrEqualToThisPeriod(period:period) {
        return this.isEalierThanThisPeriod(period) || this.isEqualTo(period)

    }

    movePeriodByXSteps (moves:number)  {

       /* return new period object  */

        let 
            gearArray:multiGears[] = [],
            math        = new MathCalc(),
            subs        = this.ratesInPeriod && this.ratesInPeriod > 0,
            direction   = (moves < 0) ? '<' : '>'

        gearArray.push({gears:this.periods,startingPosition:this.period.period})

        if (subs) {

            let subGearsNumber  = this.ratesInPeriod,
                rateNumber      = this.period.rate

            gearArray.unshift({gears:subGearsNumber,startingPosition:rateNumber})

        }

        let 
            spin        = math.multidimensionGearMove(gearArray,moves,direction),
            lastArray   = gearArray.length - 1,
            newPeriod   = spin[lastArray].position,
            newYear     = spin[lastArray].rounds    

        let 
            newPeriodObj:period = {
                period:newPeriod,
                year:newYear + this.period.year
            }

        if (subs) newPeriodObj.rate = spin[0].position

        return new Period(newPeriodObj,this.periods,this.ratesInPeriod)

    }

}

