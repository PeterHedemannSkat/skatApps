 export interface listValues {
     txt:string,
     id:string,
     children?:listValues[]
 } 

export interface excludeDates {

    weekends:boolean,
    sundays?:boolean,
    holidays?:boolean,
    bankholidays?:boolean

}

export interface multiGears {
    gears:number,
    startingPosition:number
}
