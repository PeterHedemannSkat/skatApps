import { Component, OnInit} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { getJSONdata } from  '../../../shared/shared';

import { languageText,parameter,optionGroup,calculatedData,valuePairs,tableData } from '../infrastructure/interfaces.bilafgifter';
import { modelEngine } from '../services/modelEngine';

import { columnIDRules } from '../data/columnDataRules'
import { ColumnPairing } from '../services/columnIDsNeedBasedOnModel'
import { columnID } from '../services/columnIDWrapper'
import { dataHandlerMaster } from '../services/masterDataClass'
import { yearDataMapping } from '../data/mapping.data';
import { checkModelProperties } from '../services/dynamicModelChecks'



@Component({

    selector: 'my-app',
    templateUrl:'bilafgifterMain.html'

})

export class appMain   {

    constructor (private data:getJSONdata, private getData:columnID) {}
    
    urlText:string = 'app/txt.json';
    liveData:dataHandlerMaster 
    production:boolean = false;
    
    years:number[];

    model:valuePairs[] = [{prop:'vehicle',val:'car'},{prop:'fuel',val:'benzin'},{prop:'period',val:'1'}] 

    year:number 
    get yearStr() {
        return (this.year) ? this.year.toString() : '' 
    }

    set yearStr(year:string) {
        this.year = Number(year)
        this.updateModel('')
    }

    private userInput_:string;
    get userInput() {
        return this.userInput_
    }

    set userInput(value:string) {

        this.userInput_ = value
        this.casePrivatAnvendelseOld() 

    }
    private error:boolean

    ngOnInit() {

        if (this.production) {
            this.data.production = true
            this.urlText = 'websrv/jsong.ashx?Id=138055&clear=1'
        }

        this.initYears()

    }

    initYears() {

        let defaultYearObs_     = this.genericDataFecter('yearRules','defaultYear'),
            possibleYearsObs_   = this.genericDataFecter('yearRules','possibleYears')

        Observable.forkJoin(defaultYearObs_,possibleYearsObs_).subscribe(el => {
                
                this.year = Number(el.find(el => el.id == 'defaultYear').da),
                this.years = el
                    .find(el => el.id == 'possibleYears').da
                    .split(',')
                    .map(el => Number(el))

                this.updateModel('')

            })
    }

    updateModel(changed:string) {

        if (changed == 'car' || changed == 'van') {
            let period = this.model.find(el => el.prop == 'period')
            /* resetting to normalize behavour */
            if (period) period.val = '1'
        }

        this.model = new modelEngine(this.model).newModelBuild();

        if (this.liveData) this.liveData.isReady = false;
        this.error = false

        this.getData.getDataAllSource(this.model,this.year,this.userInput).subscribe(el => {
        
            this.liveData = el;
            this.getData.isLoadingData = false
            this.liveData.isReady = true

        },(error) => {
            console.log(error)
            this.error = true;
            this.getData.isLoadingData = false
        })

    }

    isEmptyParameter(val:valuePairs) {
        return !!(!val || val.val == '')
    }


    allParametersHasValue() {

        return this.model.reduce((p,v) => {
            return (v.val == '') ? false : p
        },true)

    }

    valueIsRow(index:number) {

        if (this.userInput) {
            let formattedVal    = Number(this.userInput.replace(/,/,'.'))
            return (this.liveData.getIndex(formattedVal) == index)
        }

    }

    casePrivatAnvendelseOld() {

        let isOld = new checkModelProperties(this.model).isOldPrivatAnvendelseRules() && new checkModelProperties(this.model).val('privateUsage'),
            isNew = new checkModelProperties(this.model).isModernPrivatAnvendelseRules() && new checkModelProperties(this.model).val('privateUsage') && new checkModelProperties(this.model).isVaegtAfgift() 

        if (isOld || isNew) this.updateModel('')
        
    }

    vehicleName() {

        let vehicle_ = this.model.find(el => el.prop == 'vehicle')

        return vehicle_ ? vehicle_.val : ''
    }

    extraVehicleInfo() {

        return ['tractor','knallert'].indexOf(this.vehicleName()) > -1

    }
   
    getLabelForOptions(id:string) {

        let period  = this.model.find(el => el.prop == 'period'),
            vehicle_ = this.model.find(el => el.prop == 'vehicle')

        if (period && vehicle_ && id == 'subPeriod') {

            let vehicle = (vehicle_.val == 'taxa') ? 'car' : vehicle_.val
            id = `subPeriod_${vehicle}_${period.val}`

        } 

        return this.genericDataFecter('parametersSelects',id)
                .map(obj => {return (obj && obj.id) ? obj.da : ''}) 
    }



    getOptions(id:string) {
        return this.genericDataFecter('selectValues',id)
                .map(el => el.children.map(opElement => {
                    return {
                        value:opElement.id,
                        text:opElement.da
                    }
                }))
                .map(el => {
                    el.unshift({
                        value:'',
                        text:'Vælg ...'                       
                    })
                    return el
                })
    }

    getOptionsWrapper(id:string) {

        if (id == 'period') {

            let vehicle = this.model.find(el => el.prop == 'vehicle').val

            if (vehicle == 'taxa') vehicle = 'car' 

            return this.getOptions(`${id}${vehicle}`).map(el => {
                return el.map(el => {
                    let special = el.text.match(/_THISYEAR_/g)

                    let modifiedTxt = (special) ? el.text.replace(/_THISYEAR_/g,new Date().getFullYear().toString()) : el.text

                    return {
                        value:el.value,
                        text:modifiedTxt
                    }

                })
            })

        } else if (id == 'subPeriod') {

             let vehicle = this.model.find(el => el.prop == 'vehicle').val,
                period =  this.model.find(el => el.prop == 'period').val

            if (vehicle == 'taxa') vehicle = 'car' 

             return this.getOptions(`${id}${vehicle}_${period}`)

        } else {

            return this.getOptions(id) 
        }

    }

    printType(data:calculatedData) {
        
        let key:string

        if (data.type == 'singleData') {

            let map = [
                {
                    id:'particleFilter',
                    state:!!data.id.match(/particleFilter/)
                },
                {
                    id:'privatAnvendelsesAfgift',
                    state:!!data.id.match(/privatAnvendelsesAfgift/)
                },
                {
                    id:'vejbenyttelsesAfgift',
                    state:!!data.id.match(/vejbenyttelsesAfgift/)
                }
            ]

            key = map.find(el => el.state).id

        } else {

            let isUdligning = !!data.id.match(/udligning/)

            key = (isUdligning) 
                ? 'udligning' 
                : (this.liveData.inputType == 'kmPrLiter')
                    ? 'ejerafgift'
                    : 'vaegtafgift'

        }

        return this.txt(key)

    }

    printColumnName(id:string) {

        let isUdligning = !!id.match(/udligning/)

        return (isUdligning) 
            ? this.txt('udligning') 
            : (this.liveData.inputType == 'kmPrLiter')
                ? this.txt('ejerafgift')
                : this.txt('vaegtafgift')

    }

    printDiffentiatedInterval(val:number) {

        let map = [
            {
                val:1,
                key:'aar'
            },
            {
                val:2,
                key:'halvaar'
            },
            {
                val:4,
                key:'kvartal'
            }
        ]

        let key = map.find(el => el.val == val) 

        return (key) ? this.txt(key.key) : this.txt('')

    }

    printLabelInput(type:string) {
        return (type == 'kmPrLiter') ? this.txt('label_isKml') : this.txt('label_isVaegt')       
    }

    printPlaceHolderUSER(type:string) {
        return (type == 'kmPrLiter') ? this.txt('placeHolder_isKml') : this.txt('placeHolder_isVaegt')   
    }


    genericDataFecter(levelId:string,id:string) {

        return this.data.fetch<languageText>(this.urlText)
            .find(txt => txt.id == levelId)
            .map(obj => obj.children.find(sub => sub.id == id))

    }

    txt(id:string):Observable<string> {
        return this.data.fetch<languageText>(this.urlText)
            .find(txt => txt.id == 'textlayer')
            .map(obj => obj.children.find(sub => sub.id == id))
            .map(obj => {return (obj && obj.id) ? obj.da : ''})           
    }

}