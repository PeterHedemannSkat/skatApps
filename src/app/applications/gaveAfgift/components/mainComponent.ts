import { Component, OnInit} from '@angular/core';
import { WizardState} from '../services/app.wizardState.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { importJsonData,getJSONdata } from  '../../../shared/shared'
import { gavePct,gaveFradragLevel} from '../data/gaveAfgiftFixedRules';
import { gaveData } from '../infrastructure/interfacesGave';
import { gaveAfgiftBeregninger } from '../services/gaveAfgiftCalculation.service';

interface basic<T> {
    id:string
    children?:basic<T>[]
}

interface languageText {
    id:string,
    da:string,
    en?:string,
    children?:languageText[]
}

interface detailed {
    id:string,
    description:string
}


@Component({

    selector: 'my-app',

    template:`
        <div class = "skts-wizard gave-afgift">
        
            <h3>{{txt('overskrift1') | async}}</h3>

            <p>{{txt('introtekst') | async}}</p>

            <selector 
                [options]   = "familyNames | async"
                [label]     = "txt('giverTil') | async"
                [(value)]   = "familyId">
            </selector>

            <div *ngIf = "detailedDescription().length > 0" class = "group-details">
                <input type = 'button' [value] = "txt('detaljeromRelation_link') | async" class = "asLink" (click) = "showDetail = !showDetail"> 
                <div *ngIf = "showDetail == true">{{detailedDescription()}}</div>
            </div>         
           
            <div *ngIf = "familyId == 'svigerboern'">
                <bootstrapRadio
                    [options] = "svigerboernNames | async"
                    [(value)] = "svigerbarnIlive"  
                    [label]   = "txt('Svigerboern_label') | async"    
                ></bootstrapRadio>
            </div>

            <div *ngIf = "familyId == 'aegtefaelle'">
                <p>{{txt('aegtefaelleFrit') | async}}</p>
            </div>

            <div *ngIf = "familyId == 'andre'">
                <p>{{txt('gaveTilAndre') | async}}</p>
            </div>

            <div  class = "information-on-rules" *ngIf = "(afgiftFritBeloeb(year,afgiftsbeloebGeneral()) | async) > 0">

                <h3>
                    {{txt('giveSkatteFrit') | async}} {{year}} 
                    <!--<input type = 'button' [value] = "txtChangeYear() | async" class = "asLink extra-small" (click) = "yearToggle = !yearToggle;year = year + toggleYear();updatingModel()">-->
                     <span class = "small-select">
                        <label for = "skiftAar">{{txt('retAar') | async}}</label>
                        <select #Year [value] = "year" (change) = "doUpdate(Year.value)">
                            <option *ngFor = "let year of getYearsToShown()" [value] = "year">
                                {{year}}
                            </option>
                        </select>
                    </span>
                </h3>

                <p>
                   {{txt('duKanGive') | async}} <span class = "focus-on-number"> {{afgiftFritBeloeb(year,afgiftsbeloebGeneral()) | async | tusindtal }} kr. </span>  
                    {{tilRelation() | async}} {{txt('i') | async}} {{year}}
                </p>

                <p *ngIf = "familyId == 'boernAfkom'">
                    {{txt('foraeldreTilBarn') | async}}
                    {{(beregnService.fradrag * 2) | tusindtal}} {{txt('kr') | async}} {{txt('skatteFrit') | async}}.
                </p>

                <p *ngIf = "isDual()">
                    {{txt('duKanGive') | async}} {{beregnService.fradrag | tusindtal }} {{txt('kr') | async}} {{txt('dobbeltGave2') | async}} {{(beregnService.fradrag * 2) | tusindtal}} {{txt('kr') | async}}
                </p>

                <h3>{{txt('giverDuMere') | async}}</h3>
                <p>
                    {{txt('giverDuMereEnd') | async}} {{afgiftFritBeloeb(year,afgiftsbeloebGeneral()) | async | tusindtal }} {{txt('kr') | async}},
                    {{txt('erGaveafgiften') | async}} <span class = "semi-large">{{skatPctAfGaveBeloeb() | decimalDK}} % </span> {{txt('afBeloebetOver') | async}} {{afgiftFritBeloeb(year,afgiftsbeloebGeneral()) | async | tusindtal }} {{txt('kr') | async}}
                    {{txt('duKanBeregne') | async}}.
                </p>

            </div>

            <div class = "skts-foldout" *ngIf = "(afgiftFritBeloeb(year,afgiftsbeloebGeneral()) | async) > 0">
                <button type = "button" class = "skts-foldout-clickable" (click) = "calculateAfgift = !calculateAfgift">
                    {{txt('label_beregnGaveAfgift') | async}} <span class = "arrow pull-right">A</span>
                </button>

                <div *ngIf = "calculateAfgift" class = "foldout-body">

                    <div class = "info-section">
                        <p>{{txt('hvadSkalIndtastes') | async}}</p>
                        <p>{{txt('forklaringAfHvemBetaler') | async}}</p>         
                    </div>   
            
                    <div class = "row">
                        <div class = "col-xs-12">
                            <label for = "giverBeloeb">{{txt('label_GiverBeloeb') | async}}</label>
                            <div class = "skts-postfix-kr">
                                <input [(readableDigitFormat)] = "beregnService.giverBeloeb" class = "form-control" id = "giverBeloeb" [attr.placeholder] = "txt('placeholder') | async" />
                            </div>
                        </div>
                    </div>

                    <div class = "row">
                        <div class = "col-xs-12">
                            <label for = "modtagerBeloeb">{{txt('label_ModtagerBeloeb') | async}}</label>                    
                            <div class = "skts-postfix-kr">
                                <input [(readableDigitFormat)] = "beregnService.modtagerFaar" class = "form-control" id = "modtagerBeloeb" [attr.placeholder] = "txt('placeholder') | async" />
                            </div>
                        </div>
                    </div>

                    <div class = "row">
                        <div class = "col-xs-12">
                            <input type = "checkbox" [(ngModel)] = "beregnService.giverBetalerAfgift"  id = "whopays" /> 
                            <label for = "whopays" >{{txt('label_hvemBetalerAfgift') | async}}</label>
                        </div>
                    </div>
                    
                    <div class = "row" *ngIf = "beregnService.gaveafgiftUser() > 0">
                        <div class = "col-xs-12">
                            <div class = "text-center">
                                <p>{{txt('resultText') | async}}</p>
                                <p class = "result">
                                    <strong class = "skts-row-result skts-row-result--large">{{beregnService.gaveafgiftUser() | tusindtal}} {{txt('kr') | async}}</strong>
                                </p>          
                            </div>

                            <div class = "row helper-section">
                                <div class = "col-xs-12">

                                    <h4><i>{{txt('detGoorDu') | async}}</i></h4>
                                    <p>{{txt('process') | async}}</p>
                            
                                    <ol class = "variables-on-form" type = "a">
                                        <li>{{txt('process1') | async}}: <i>{{beregnService.giverBeloeb | tusindtal}} {{txt('kr') | async}}</i></li>
                                        <li>{{txt('process2') | async}}: <i>{{beregnService.fradrag | tusindtal }} {{txt('kr') | async}}</i></li>
                                        <li>{{txt('process3') | async}}: <i>{{beregnService.afgiftsgrundlag() | tusindtal}} {{txt('kr') | async}}</i></li>
                                        <li>{{txt('process4') | async}}: <i>{{beregnService.gaveafgiftUser() | tusindtal}} {{txt('kr') | async}}</i></li>

                                    </ol>

                                    <p>{{txt('juraforbehold') | async}} <a href = "http://www.skat.dk/SKAT.aspx?oId=1947334">{{txt('linkNameJura') | async}}</a></p>

                                </div>
                            </div>    
                                               
                            <a [href] = "urlForm" class = "action-link" target = "_blank">{{txt('linkTextForm') | async}}</a>
                        </div>
                    </div>

                    <div class = "row" *ngIf = "beregnService.afgiftBeloeb() === 0"> 
                         <div class = "col-xs-12">
                            <div class = "text-center">
                                <p>Afgiftsfrit op til <span class = "focus-on-number"> {{afgiftFritBeloeb(year,afgiftsbeloebGeneral()) | async | tusindtal }} {{txt('kr') | async}}</span></p>
                            </div>         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    `

})

export class appMain extends importJsonData  {

    constructor (public http:Http,private data:getJSONdata) {
        super(http)
    }

    production:boolean = false;

    ngOnInit () {

        this.production = true;

       if (this.production) {
           this.data.production = true;
           this.urlData = this.urlDataProduction
           this.urlText = this.urlTxtProduction
       } 
        
        this.setArrayObservables(this.urlText,'detailedDescription','da')
        this.familyNames = this.textArrayIdMap(this.urlText,'mainCategories','da')
        this.svigerboernNames = this.textArrayIdMap(this.urlText,'svigerboern','da')
        this.familyId = 'boernAfkom'
        this.beregnService.giverBetalerAfgift = true
        this.setYear()

    }

    year:number = new Date().getFullYear();
    latestYearDateBase:Number = new Date().getFullYear() - 1

    /* Key calculations imported here  */
    beregnService:gaveAfgiftBeregninger = new gaveAfgiftBeregninger()

    /* url endpoints Test and Production  */
    urlText:string = 'app/txt.json';
    urlData:string = 'app/gaveAfgiftSatser.json';
    urlTxtProduction:string = 'websrv/jsong.ashx?Id=134254&clear=1';
    urlDataProduction:string = 'websrv/jsong.ashx?Id=137429&clear=1';
    urlForm:string = 'http://www.skat.dk/getFile.aspx?Id=132365';

    /* states and settings for VIEW implementation */
    yearToggle:boolean = true;
    showDetail:boolean = false;
    calculateAfgift:boolean = false;
    familyNames:any;
    svigerboernNames:any;
    //familyNames = this.textArrayIdMap(this.urlText,'mainCategories','da')
    //svigerboernNames = this.textArrayIdMap(this.urlText,'svigerboern','da')

    setYear() {
        /* 

        looking for the newest year on server (JSON-ressource)
        in case data is made available for next next year (data is updated in november), year will still be current year
        in case all other cases we use the latest year available in data

         */


        let currentYear = new Date().getFullYear()

        this.data.fetch<gaveData>(this.urlData)
            .map(yearObj => yearObj.year)
            .reduce((prev,year) => {
                return (year > prev) ? year : prev
            },0)
            .subscribe(latestYearFromDatabase => {
                this.latestYearDateBase = latestYearFromDatabase
                this.year = (currentYear <= latestYearFromDatabase) ? currentYear : latestYearFromDatabase
                this.updatingModel() 
            })
    }

    /* every time key properties change we need to manually update model */

    familyId_:string = '';
    svigerbarnIlive_:string = '';

    get familyId() {
        return this.familyId_;
    } 

    set familyId(val:string) {
        this.familyId_ = val;
        this.updatingModel()
    }

    get svigerbarnIlive() {
        return this.svigerbarnIlive_
    }

    set svigerbarnIlive(val:string) {
        this.svigerbarnIlive_ = val   
        this.updatingModel()
    }

    /* methods for calculation */

    getModtager() {
        return (this.familyId == 'svigerboern') ? this.svigerbarnIlive : this.familyId 
    }

    getYearsToShown() {
        let currentYear = new Date().getFullYear(),
            years:Number[] = [] 
        
        for (let year = currentYear - 1; year <= this.latestYearDateBase; year++) {
            years.push(year)
        }

        return years
    }

    afgiftsbeloebGeneral() {
       let type = gaveFradragLevel.find(el => {
           return el.ids.indexOf(this.getModtager()) > -1
        })
       return (type) ? type.fradragType : '' 
    }

    afgiftFritBeloeb(year:Number,type:string):Observable<number> {
        return this.data.fetch<gaveData>(this.urlData)
            .find(yearObj => yearObj.year == year)
            .map(obj => obj[type])        
    }

    skatPctAfGaveBeloeb() {
        let type = gavePct.find(el => {
             return el.ids.indexOf(this.getModtager()) > -1    
        })
        return type ? type.gavePct : -1
    } 

    doUpdate (year:string) {

        this.year = Number(year);
        this.updatingModel();
    }

    updatingModel() {

        this.beregnService.gaveAfgiftPct = this.skatPctAfGaveBeloeb()
        this.afgiftFritBeloeb(this.year,this.afgiftsbeloebGeneral()).subscribe(el => {
            this.beregnService.fradrag = el;
        })

    }

    /* methods for text in component */

    isDual() {
        let couple = ['foraeldre','bedsteforaeldre','stedforaeldre']
        return !!(couple.indexOf(this.getModtager()) > -1) 
    } 

   detailedDescription() {
        return this.getArrayValues('detailedDescription',this.familyId)
    }

    txt(id:string):Observable<string> {
        return this.data.fetch<languageText>(this.urlText)
            .find(txt => txt.id == 'textlayer')
            .map(obj => obj.children.find(sub => sub.id == id))
            .map(obj => {return (obj && obj.id) ? obj.da : ''})           
    }

    tilRelation():Observable<string> {
        return this.data.fetch<languageText>(this.urlText)
            .find(txt => txt.id == 'tilRelation')
            .map(obj => obj.children.find(sub => sub.id == this.familyId))
            .map(obj => {return (obj) ? obj.da : ''})           
    }



}
