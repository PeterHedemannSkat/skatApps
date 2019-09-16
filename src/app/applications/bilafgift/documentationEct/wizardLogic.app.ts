interface model {
    prop:string
    value:string
}

/* 

model properties 

- type:'car'

- We need period & fuel: 
- have these values been set? 
    - if no add these to potential group



-type:car
-period:0


-type:van
-period:1   => show [anvendelse,vaegt] A


-type:van
-period:2 => show [whenInYear] 

-type:van
-period:4 => show [whenInYear] 

-type:van
period:2 
partOfYear:1 show [anvendelse,vaegt] (as A) keep 

]


-type:van
period

the properties in the model objects are unknown ?

dynamic routes?



hide everyting else? 

period translation => mainPeriod,sub,type returning intergers 1-5


3. need for any priority or just take the first?

what when USER hits back button OR when initializing a component, what should it point at?
    - the last index in the model array 

when USER changes a value in the component it will
    effect the url for the next button dynamincally but it should first be added to the model when the next button


*/


export class viewController {

    model:model[] = []




}