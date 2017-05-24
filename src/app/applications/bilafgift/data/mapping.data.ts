import {specialColumns} from '../infrastructure/interfaces.bilafgifter';
import { dataMapping,periods,validTypes,intervalTypeMapping } from '../infrastructure/interfaces.bilafgifter'


export let intervalMapping = [

    {  
        ids:['_car&van_ejerAfgift_forbrugsAfgift_','_taxa_ejerAfgift_forbrugsAfgift_'],
        table:'_ejerAfgift_benzin_'
    },
    {
        ids:['_car_vaegtAfgift_forbrugsAfgift_kvartal_','_car_vaegtAfgift_forbrugsAfgift_halvaar_','_car&taxa_vaegtAfgift_udligning_'],
        table:'_car_vaegtAfgift_'
    },
    {
        ids:['_car&van_ejerAfgift_udligning_','_taxa_ejerAfgift_udligning_'],
        table:'_ejerAfgift_diesel_'
    },
    {
        ids:['_van_vaegtAfgift_forbrugsAfgift_','_van_vaegtAfgift_udligning_','_trailer_forbrugsAfgift_'],
        table:'_van_vaegtAfgift_AND_trailer_'     
    },
    {
        ids:['_truck_largeTruck_2_roadTrain_1_air_','_truck_largeTruck_2_roadTrain_1_other_'],
        table:'_largeTruck_2_1'
    },
    {
        ids:['_truck_largeTruck_2_roadTrain_2_air_','_truck_largeTruck_2_roadTrain_2_other_','_truck_largeTruck_3_roadTrain_1_air_','_truck_largeTruck_3_roadTrain_1_other_'],
        table:'_largeTruck_2_2AND_largeTruck_3_1'
    },
    {
        ids:['_truck_largeTruck_2_roadTrain_3_air_','_truck_largeTruck_2_roadTrain_3_other_'],
        table:'_largeTruck_2_3'
    },
    {
        ids:['_truck_largeTruck_3_roadTrain_2_air_','_truck_largeTruck_3_roadTrain_2_other_','_truck_largeTruck_3_roadTrain_3_air_','_truck_largeTruck_3_roadTrain_3_other_'],
        table:'_largeTruck_3_2AND_largeTruck_3_3'
    },
    {
        ids:['_truck_largeTruck_2_air_','_truck_largeTruck_2_other_'],
        table:'_largeTruck_2'
    },
    {
        ids:['_truck_largeTruck_3_air_','_truck_largeTruck_3_other_'],
        table:'_largeTruck_3'
    },
    {
        ids:['_truck_largeTruck_4_air_','_truck_largeTruck_4_other_'],
        table:'_largeTruck_4'
    },
    {
        ids:['_truck_smallTruck_motorKoeretoej_forbrugsAfgift_2_',
            '_truck_smallTruck_motorKoeretoej_udligning_2_',
            '_truck_smallTruck_paahaengsKoeretoej_udligning_2_',
            '_truck_smallTruck_paahaengsKoeretoej_forbrugsAfgift_2_'
        ],
        table:'_smallTruck_2'
    },
    {
        ids:['_truck_smallTruck_motorKoeretoej_forbrugsAfgift_3_',
            '_truck_smallTruck_motorKoeretoej_udligning_3_',
            '_truck_smallTruck_paahaengsKoeretoej_udligning_3_',
            '_truck_smallTruck_paahaengsKoeretoej_forbrugsAfgift_3_'
        ],
        table:'_smallTruck_3'
    },
    {
        ids:['_mc_udligning_','_mc_forbrugsAfgift_','_bus_3_udligning_','_bus_3_forbrugsAfgift_','_tractor_'],
        table:'_single_'
    },
    {
        ids:['_camper_forbrugsAfgift_'],
        table:'_camper_'
    },
    {
        ids:['_bus_2_udligning_','_bus_2_forbrugsAfgift_'],
        table:'_bus_2_'
    },
    {
        ids:['_taxa_vaegtAfgift_udligning_','_taxa_vaegtAfgift_forbrugsAfgift_'],
        table:'_taxa_'
    }



]

export const specialVehicleInfo = 

    {
        vehicles:[''],
        info:'needsInfo'
    }



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
            stringSearch:['particleFilter','vejbenyttelsesAfgift','privatAnvendelsesAfgift']
        },
        dataType:'single'
    }




export let specialIntervals:validTypes[] = [

    {
        stringSearch:['bus','camper','smallTruck'],
        columnIds:[
            '_car&taxa_vaegtAfgift_udligning_',
            '_car_vaegtAfgift_forbrugsAfgift_kvartal_',
            '_car_vaegtAfgift_forbrugsAfgift_halvaar_',
            '_camper_forbrugsAfgift_'
            
        ]
    }

]

export const periodMapping:periods[] = [

    {
        validFor:{
            stringSearch:['truck','bus','trailer','tractor','privatAnvendelsesAfgift_old','privatAnvendelsesAfgift_modern_onceAYear','vejbenyttelsesAfgift','mc'],
            columnIds:['_van_vaegtAfgift_forbrugsAfgift_','_particleFilter_','_van_vaegtAfgift_udligning_','_taxa_vaegtAfgift_udligning_','_taxa_vaegtAfgift_forbrugsAfgift_','_van_particleFilter_vaegtAfgift_']
        },
        period:1,
        same:true
    },
    {
        validFor:{
           stringSearch:['ejerAfgift','privatAnvendelsesAfgift_modern_twiceAYear'],
           columnIds:['_car_vaegtAfgift_forbrugsAfgift_','_camper_forbrugsAfgift_']
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
            stringSearch:['truck','bus','forbrugsAfgift','tractor'],
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
            stringSearch:['udligning'],
            columnIds:['_van_particleFilter_vaegtAfgift_']
        },
        multiYearBase:false,
        hardcoded:false
    },
    {
        validFor:{
            stringSearch:['vejbenyttelsesAfgift','privatAnvendelsesAfgift'],
            columnIds:['_particleFilter_']
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

export const vaegtType = [
    {
        validFor:['truck','van','trailer'],
        value:'total'
    },
    {
        validFor:['car','camper','taxa','mc'],
        value:'egen'  
    }
    
]