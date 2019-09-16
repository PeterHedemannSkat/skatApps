import { Component, OnInit} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import { getJSONdata } from  '../../../shared/shared';





@Component({

    selector: 'my-app',
    templateUrl:'befordringsfradrag.html'

})

export class appMain   {

    constructor (private data:getJSONdata) {}
    
    urlText:string = 'app/txt.json';
    production:boolean = false;
    test = "12-12-17";
    
  

}