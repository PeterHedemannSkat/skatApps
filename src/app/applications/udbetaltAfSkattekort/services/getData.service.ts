import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { languageText } from "../../../shared/interfaces/interfaceslanguage";

@Injectable()
export class getDataService {
  private data: languageText[] = [];
  private fecthing: boolean = false;

  private prod_url: string = "websrv/jsong.ashx?id=66629";
  private test_url: string = "app/textHolder.json";

  constructor(private http: Http) {}

  fetch(): Observable<languageText> {
    return Observable.create((observer: any) => {
      if (this.data.length > 0) {
        this.emitsingle(observer);
      } else if (this.fecthing) {
        this.executeSubscribe(observer);
      } else {
        this.dataObservable = this.http
          .get(this.prod_url)
          .map(response => response.json());
        this.fecthing = true;
        this.executeSubscribe(observer);
      }
    });
  }

  private executeSubscribe(observer: any) {
    this.dataObservable.subscribe(data => {
      this.fecthing = false;
      this.data = data;
      this.emitsingle(observer);
    });
  }

  private emitsingle(observer: any) {
    this.data.forEach(v => {
      observer.next(v);
    });
  }

  private dataObservable: Observable<languageText[]>;
}
