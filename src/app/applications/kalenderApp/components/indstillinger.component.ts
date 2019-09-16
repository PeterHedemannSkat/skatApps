import { Component, OnInit,Input,Output,EventEmitter  } from '@angular/core';
import { getJSONdata,languageText,listValues } from '../../../shared/shared';
import { dataHolder } from '../infrastructure/types';
import { Deadline } from '../services/deadline.service';
import { Observable } from 'rxjs/Observable'; 


interface subPligter {
    moms?:languageText[],
    loonsum?:languageText[],
    momshalvaar?:languageText[]
}

@Component({
    selector:'settings-calender',
    template:`
        <div class = "click-outside-indstillinger"> </div>
        <div class = "indstillinger"> 
            <div class = "indstillinger-header">
                <div class = "clearfix">
                    <div class = "pull-left"><h2>Vis/skjul pligter</h2></div> 
                    <div class = "pull-right toggle-all">
                        <label>
                            <input type = "checkbox" #toggle (click) = "showall = toggle.checked; setAll()" [checked] = "showall">
                            {{getText('general','showHideAll') | async}}
                        </label>                    
                    </div>
                </div>
            </div>

            <p class = "small-text">{{getText('general','subTextIndstillinger') | async}}</p>
            
            <div *ngFor = "let pligt of pligterTxtLanguage">
                <checkbox-group  
                    [(values)]  = "pligtService.state[pligt.id]"
                    [list]      = "pligt.children"
                    [label]     = "pligt.txt" 
                    (changes)   = "changes()"
                ></checkbox-group>       
            </div>

        </div>  

    
    `,
    styles:[`

    `]

})

export class settingsCalender {

    /* important that checkbox is set (inc. children) when langauge has been loaded  */

    toggleSettings:boolean = false
    language:string = 'da';
    pligterTxtLanguage:listValues[] = []
    showall:boolean = false


    setAll () {

        if (this.showall) {
            this.pligtService.state.moms            = ['moms_kvartal','moms_halvaar','moms_maaned']
            this.pligtService.state.loonsum         = ['loonsum_method1','loonsum_method2','loonsum_method3','loonsum_method4A','loonsum_method4B'],
            this.pligtService.state.askat           = ['AskatStoreVirksomhed','AskatSmaaVirksomheder']
            this.pligtService.state.OneStopMoms     = ['oneStopMoms'],
            this.pligtService.state.EUsalgUdenMoms  = ['EUsalgUdenMoms','EusalgKvartal'],
            this.pligtService.state.selvangivelse   = ['erhvervsdrivende'],
            this.pligtService.state.punktafgifter   = ['punktafgifter'],
            this.pligtService.state.selskabsskat    = ['selskabsskat'],
            this.pligtService.state.bSkatteRater    = ['bSkatteRater'],
            this.pligtService.state.momsRefusion    = ['momsRefusion']
            

        } else {

            this.pligtService.state.moms            = [],
            this.pligtService.state.loonsum         = [],
            this.pligtService.state.askat           = [],
            this.pligtService.state.EUsalgUdenMoms  = [],
            this.pligtService.state.OneStopMoms     = [],
            this.pligtService.state.selvangivelse   = [],
            this.pligtService.state.punktafgifter   = [],
            this.pligtService.state.selskabsskat    = [],
            this.pligtService.state.bSkatteRater    = [],
            this.pligtService.state.momsRefusion    = []
        }

        this.changesOut.emit(null)
    }

    @Input()
    pligter:dataHolder

    @Output()
    changesOut:EventEmitter<any> = new EventEmitter();    

    /* INIT  */
    ngOnInit () {
        this.setContentPligter()
    }

    @Input()
    checked:listValues

    subpligterTxt:subPligter = {}  

    constructor (public data:getJSONdata,public pligtService:Deadline) {}

    changes () {
        this.showall = false;
        this.changesOut.emit(null)
    }
    
    getlist (name:string) {
        return this.data.fetch<languageText>(this.pligtService.url)
            .find(txtEle =>  name === txtEle.id)
            .map(txtEle => txtEle.children)
    }


   getText (name:string,id:string):Observable<string> {
        return this.data.fetch<languageText>(this.pligtService.url)
            .find(txtEle =>  name === txtEle.id)
            .map(txtEle => txtEle.children.find(el => el.id == id)[this.language])
    }

    setContentPligter () {
        return this.getlist('pligter')
            .subscribe(pligter => {

                this.pligterTxtLanguage = pligter.map(main => {

                    let sub = main.children.map(el => {
                        return {id:el.id,txt:el[this.language]}
                    })

                    return {
                        id:main.id,
                        txt:main[this.language],
                        children:sub      
                    } 
                })

            })

    }

}