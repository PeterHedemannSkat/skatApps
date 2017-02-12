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
import { yearDataMapping } from '../data/mapping.data'

@Component({

    selector: 'my-app',
    templateUrl:'bilafgifterMain.html'

})

export class appMain   {

    constructor (private data:getJSONdata, private getData:columnID) {}

    ngOnInit() {
        this.updateModel()
    }

    updateModel() {

        this.model = new modelEngine(this.model).newModelBuild();

        this.getData.getDataAllSource(this.model,2017).subscribe(el => {
            this.liveData = el
        })

    }

    urlText:string = 'app/txt.json';
    liveData:dataHandlerMaster 
    production:boolean = false;

    model:valuePairs[] = [{prop:'vehicle',val:'car'},{prop:'fuel',val:'diesel'},{prop:'period',val:'1'}]  

    getLabelForOptions(id:string) {
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

        } else {

            return this.getOptions(id) 
        }

    }

    printType(data:calculatedData) {
        
        let isUdligning = !!data.id.match(/udligning/)

        return (isUdligning) 
            ? this.txt('udligning') 
            : (this.liveData.inputType == 'kmPrLiter')
                ? this.txt('ejerafgift')
                : this.txt('vaegtafgift')

    }

    printColumnName(id:string) {

        let isUdligning = !!id.match(/udligning/)

        return (isUdligning) 
            ? this.txt('udligning') 
            : (this.liveData.inputType == 'kmPrLiter')
                ? this.txt('ejerafgift')
                : this.txt('vaegtafgift')

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