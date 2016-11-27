export interface languageText {

    da?:string;
    id:string;
    en?:string;
    description?:string;
    children?:Array<languageText>

}

 export interface validateSet {
     element:string,
     regExpression?:string,
     id:string,
     type?:string
 }

