 export interface listValues {
     txt:string,
     id:string,
     children?:listValues[]
 } 

export interface excludeDates {

    weekends:boolean,
    sundays?:boolean,
    holidays:boolean

}