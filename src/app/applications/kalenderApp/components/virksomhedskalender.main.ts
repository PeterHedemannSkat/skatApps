import { Component, OnInit } from '@angular/core';
import { getJSONdata, languageText, listValues, CalenderServices, MathCalc, multiGears } from '../../../shared/shared'
import { Observable } from 'rxjs/Observable';
import { Deadline } from '../services/deadline.service'
import { findDateObj, deadlineInfo, period } from '../infrastructure/types'
import { hierachy } from '../data/rulesForPligter';
import { Rules } from '../data/rulesForPligter';

interface EventTarget {
    querySelector: Function
}

@Component({
    selector: 'my-app',
    template: `
        
        <div class = "virksomheds-kalender" id = "#virkCalender">
   
            <div class = "clearfix calculator-header">
                <div class = "pull-left">
                    <h2>{{getText('general','header') | async}}</h2>
                </div>
                <div class = "pull-right">
                    <a class = 'indstillinger-toggle' href = "#virkCalender" (click) = "toggleSettings = !toggleSettings;pligtService.isViewed = true">
                        <span class = "indstillinger-icon"> </span>
                    </a>
                </div>
            </div>
     
            <settings-calender [hidden] = "toggleSettings" (changesOut) = "updateDeadline()"> </settings-calender>

            <p class = "calender-empty text-center" *ngIf = "pligtService.getPligterForCurrentState().length == 0">
                {{getText('general','noDeadlines') | async}}
            </p>

            <p class = "first-view" *ngIf = "!pligtService.isViewed">
                {{getText('general','firstTimeView') | async}}    
            </p>

            <ul class = "deadline">
                <li *ngFor = "let frist of pligtService.deadlines | async">
                    <div class = "frist-type">
                        <span class = "super-level">
                            {{getSuperLevel(frist.id) | async}}
                        </span>
                        <span class = "frist-type-total"> 
                            <span class = "seperator">-</span>
                            <span *ngIf = "frist.period.rate > 0"> 
                                {{frist.period.rate}}.
                                {{getText('general','rate') | async}}
                            </span>
                            <span class = "sub-level">
                                {{getNameOfFrist(frist.id) | async}}
                            </span>  
                            <span class = "period">
                                {{getText('general','for') | async}} {{getPeriodTxt(frist.id,frist.period) | async}}
                            </span>   
                        </span>           
                    </div>
  
                    <div class = "date-area">
                        <span class = "isSoonDue" *ngIf = "isCloseToDeadline(frist.date)">
                             {{txtCloseDeadline(frist.date) | async}}:</span>

                        <span [class.olddeadlines] = "datecalc.now > frist.date && !isCloseToDeadline(frist.date)">      
                            <span class = "weekday-name">
                                {{getText('weekDaysNames',frist.date.getDay()) | async}},
                            </span>
                            <span class = "day-of-month date-format">
                                {{frist.date.getDate()}}.
                            </span> 
                            <span class = "month-name date-format">
                                {{getText('monthNames',frist.date.getMonth()) | async}}
                            </span>
                            <span class = "year-name date-format">
                                {{frist.date.getFullYear()}}
                            </span>
                        </span>
          
                    </div>
                </li>
            </ul>


            <div class = "clearfix buttons-in-bottom" [hidden] = "pligtService.getPligterForCurrentState().length == 0">
                <span [hidden] = "!pligtService.goBackShown">
                    <button type = "button" (click) = "moveCalender('back')" class = "pull-left btn flow-directions-button">
                        <span class = "arrow-button arrow-left"> </span>
                    </button>
                </span>
                <span [hidden] = "!pligtService.goForwardShown">
                    <button type = "button" (click) = "moveCalender('next')" class = "pull-right btn flow-directions-button">
                        <span class = "arrow-button arrow-right"> </span>
                    </button>
                </span>
            </div>

      

        </div>
    
    `
})

export class virksomhedsKalenderApp {

    constructor(public data: getJSONdata, public pligtService: Deadline, public datecalc: CalenderServices) {

    }

    moveCalender(move: string) {
        this.pligtService.deadlines = this.pligtService.fetchTenDeadlines(move)
    }

    language: string = document.getElementsByTagName('html')[0].getAttribute('lang') || 'da';
    toggleSettings: boolean = true;
    closeRangeTo: number = 7;
    closeRangeFrom: number = this.pligtService.showDaysBefore + 1;
    firstView: boolean = true;

    test: Promise<string>;
    frister: deadlineInfo[] = []
    index: number = 0


    ngOnInit() {

        this.initSetUp();
        this.updateDeadline();

        window.addEventListener('click', (event: Event) => {

            let target = <HTMLElement>event.target,
                clickInsideIndstillinger = this.closests(target, 'indstillinger'),
                clickOnToggleButton = this.closests(target, 'indstillinger-toggle')

            /* hvis man klikker uden for indstillinger og ikke på knappen der toggler indstillinger, så lukkes indstillinger */
            if (!clickOnToggleButton && !clickInsideIndstillinger) this.toggleSettings = true

        })




    }

    closests(HTMLElement: HTMLElement, parentClass: string): any {

        return (HTMLElement.classList.contains && HTMLElement.classList.contains(parentClass))
            ? true
            : (HTMLElement.tagName == 'BODY' || HTMLElement.tagName == 'HTML')
                ? false
                : this.closests(HTMLElement.parentElement, parentClass)

    }

    initSetUp() {

        this.pligtService.url = (this.pligtService.developmentMode) ? 'app/txt.json' : 'websrv/jsong.ashx?Id=66594'
        this.pligtService.urlManualDeadlines = (this.pligtService.developmentMode) ? 'app/manualDeadLines.json' : 'websrv/jsong.ashx?Id=134179'
        this.pligtService.testDate = false;

        this.language = document.getElementsByTagName('html')[0].getAttribute('lang') || 'da';

        this.data.production = (this.pligtService.developmentMode) ? false : true

        if (this.pligtService.testDate) {

            let date = new Date(),
                currentHour = date.getHours(),
                currentMinute = date.getMinutes()

            this.datecalc.now = new Date(2016, 11, 12, 19, currentMinute)

        }

    }

    txtCloseDeadline(date: Date) {

        return Observable.create((resolve: any) => {

            let daysLeft = this.datecalc.daysFromtoday(date)

            if (daysLeft < this.closeRangeTo && daysLeft > 1) {

                this.getText('general', 'daysTo').subscribe(txt => {
                    resolve.next(`${daysLeft} ${txt}`)
                })

            } else if (daysLeft == 1) {

                this.getText('general', 'tomorrow').subscribe(txt => {
                    resolve.next(`${txt}`)
                })

            } else if (daysLeft == 0) {

                this.getText('general', 'lessThanHours').subscribe(txt => {

                    let lastMinutPrecision = this.datecalc.copyDate(date)
                    lastMinutPrecision.setHours(23)
                    lastMinutPrecision.setMinutes(59)
                    lastMinutPrecision.setSeconds(59)

                    let under = txt.split('X')[0],
                        hours = txt.split('X')[1]

                    let hoursTo = this.datecalc.hoursFromTime(lastMinutPrecision)

                    if (hoursTo == 1) hours = hours.slice(0, hours.length - 1)

                    resolve.next(`${under} ${hoursTo} ${hours}`)

                })

            } else if (daysLeft < 0) {
                this.getText('general', 'daysLate').subscribe(txt => {
                    resolve.next(`${txt}`)
                })

            }
        })
    }


    timeToDeadline(date: Date) {
        let daysLeft = this.datecalc.daysFromtoday(date)
        return (daysLeft == 0) ? this.datecalc.hoursFromTime(date) : daysLeft
    }

    isCloseToDeadline(date: Date) {
        let daysFromToday = this.datecalc.daysFromtoday(date)
        return daysFromToday > this.closeRangeFrom * -1 && daysFromToday < this.closeRangeTo
    }

    daysToDeadline(date: Date) {
        return this.datecalc.daysFromtoday(date)
    }

    getSuperLevel(id: string): Observable<string> {

        return Observable.create((resolve: any) => {

            let superLevel: string

            if (id != 'loonsum_method134') {

                for (let prop in hierachy) {
                    if (hierachy[prop].indexOf(id) > -1) superLevel = prop
                }

                this.getText('pligter', superLevel).subscribe(el => {

                    resolve.next(el)
                })

            } else {

                this.getText('general', id + 'super').subscribe(el => {
                    resolve.next(el)
                })

            }
        })
    }

    getPeriodTxt(id: string, period: period): Observable<string> {

        return Observable.create((resolve: any) => {

            let periods = Rules.find(el => el.id == id).periods

            switch (periods) {
                case 1:

                    this.getText('general', 'wholeyear').subscribe(txt => {
                        resolve.next(`${txt} ${period.year}`)
                    })
                    break;
                case 2:
                    this.getText('general', 'halvaar').subscribe(txt => {
                        resolve.next(`${period.period}. ${txt} ${period.year}`)
                    })
                    break;

                case 4:
                    this.getText('general', 'kvartal').subscribe(txt => {
                        resolve.next(`${period.period}. ${txt} ${period.year}`)
                    })
                    break;

                case 12:
                    this.getText('monthNames', Number(period.period - 1).toString()).subscribe(txt => {
                        resolve.next(`${txt} ${period.year}`)
                    })
                    break;

            }
        })

    }

    getNameOfFrist(id: string): Observable<string> {

        return Observable.create((resolve: any) => {

            let superLevel: string

            for (let prop in hierachy) {
                if (hierachy[prop].indexOf(id) > -1) superLevel = prop
            }

            if (id != 'loonsum_method134') {
                this.getSubinPligter(superLevel, id).subscribe(el => {
                    resolve.next(el[this.language])
                })
            } else {
                this.getText('general', id).subscribe(el => {
                    resolve.next(el)
                })
            }
        })
    }

    getlist(name: string) {
        return this.data.fetch<languageText>(this.pligtService.url)
            .find(txtEle => name === txtEle.id)
            .map(txtEle => txtEle.children)
    }

    getSubinPligter(sub: string, id: string) {
        return this.data.fetch<languageText>(this.pligtService.url)
            .find(txtEle => 'pligter' === txtEle.id)
            .map(txtEle => txtEle.children.find(el => el.id == sub))
            .map(el => el.children.find(el => id == el.id))

    }

    getText(name: string, id: string): Observable<string> {
        return this.data.fetch<languageText>(this.pligtService.url)
            .find(txtEle => name === txtEle.id)
            .map(txtEle => txtEle.children.find(el => el.id == id)[this.language])
    }

    getdateShort(name: string, id: string): Observable<string> {
        return this.getText(name, id)
            .map(el => el.slice(0, 3))
    }

    updateDeadline() {

        let from = this.datecalc.moveDateByDays(this.datecalc.now, this.pligtService.showDaysBefore * -1),
            to = this.datecalc.moveDateByDays(this.datecalc.now, 50)

        this.pligtService.setViewDates(from, to)
        this.pligtService.deadlines = this.pligtService.fetchTenDeadlines('state')

        let data = JSON.stringify(this.pligtService.state)

        localStorage.setItem('pligter', data)




        // måske tjekke at der ikke er nogen overraskelser i data

    }

}