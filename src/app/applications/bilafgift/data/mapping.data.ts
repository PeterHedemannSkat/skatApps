import {specialColumns} from '../infrastructure/interfaces.bilafgifter';
import { dataMapping,periods,validTypes,intervalTypeMapping } from '../infrastructure/interfaces.bilafgifter'


export let intervalMapping = [

    {  
        ids:['_car&van_ejerAfgift_forbrugsAfgift_'],
        table:'_ejerAfgift_benzin_'
    },
    {
        ids:['_car_vaegtAfgift_forbrugsAfgift_kvartal_','_car_vaegtAfgift_forbrugsAfgift_halvaar_','_car&taxa_vaegtAfgift_udligning_'],
        table:'_car_vaegtAfgift_'
    },
    {
        ids:['_car&van_ejerAfgift_udligning_'],
        table:'_ejerAfgift_diesel_'
    },
    {
        ids:['_van_vaegtAfgift_forbrugsAfgift_','_van_vaegtAfgift_udligning_'],
        table:'_van_vaegtAfgift_'     
    }

]

export const smartIntervalTypeMapping:intervalTypeMapping[] = [

    {
        validFor:{
            stringSearch:['ejerAfgift']
        },
        tableType:'kmPrLiter'
    },
    {
        validFor:{
            notTheseIds:['_ejerAfgift_benzin_','_ejerAfgift_diesel_']
        },
        tableType:'vaegtKg'
    }

]

export const singleDataType = 

    {
        validFor:{
            stringSearch:['particleFilter','vejAfgift','privatAnvendelsesAfgift']
        },
        dataType:'single'
    }




export let specialIntervals:validTypes[] = [

    {
        stringSearch:['bus','camper'],
        columnIds:[
            '_car&taxa_vaegtAfgift_udligning_',
            '_car_vaegtAfgift_forbrugsAfgift_kvartal_',
            '_car_vaegtAfgift_forbrugsAfgift_halvaar_'
        ]
    }

]

export const periodMapping:periods[] = [

    {
        validFor:{
            stringSearch:['truck','bus','trailer','tractor','camper','privatAnvendelsesAfgift'],
            columnIds:['_van_vaegtAfgift_forbrugsAfgift_','_particleFilter_','_van_vaegtAfgift_udligning_']
        },
        period:1,
        same:true
    },
    {
        validFor:{
           stringSearch:['ejerAfgift'],
           columnIds:['_car_vaegtAfgift_forbrugsAfgift_']
        },
        period:2,
        same:true
    },
    {
        validFor:{
            stringSearch:['kvartal'],
            columnIds:['_car&taxa_vaegtAfgift_udligning_']
        },
        periodIndex:[2,2,2,2,4,4,4],
        same:false
    },
    {
        validFor:{
            columnIds:['_car_vaegtAfgift_forbrugsAfgift_'],
            stringSearch:['halvaar']
        },
        periodIndex:[2,2,2,2,2,2,4],
        same:false
    }

]


export const yearDataMapping:dataMapping[] = [
    {
        
        validFor:{
            stringSearch:['truck','bus','forbrugsAfgift'],
            columnIds:[''],
            notTheseIds:['']
        },
        multiYearBase:true,
        periods:[
            {
                baseYear:2017, /* the id where we look */ 
                from:2015,
                to:Number.POSITIVE_INFINITY
            }
        ],
        hardcoded:false

    },
    {
        validFor:{
            stringSearch:['udligning']
        },
        multiYearBase:false,
        hardcoded:false
    },
    {
        validFor:{
            stringSearch:['vejbenyttelse','privatAnvendelsesAfgift','particleFilter']
        },
        periods:[
            {
                baseYear:2017, /* the id where we look */ 
                from:2010,
                to:Number.POSITIVE_INFINITY
            }      
        ],
        multiYearBase:true,
        hardcoded:false      
    }
] 