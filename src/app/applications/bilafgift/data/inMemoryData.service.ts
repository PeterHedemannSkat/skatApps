import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { languageText } from '../../../shared/shared';

export class InMemoryDataService implements InMemoryDataService {

    /* måske ville det være en bedre i de af lave en generisk sats pr. år   */

    createDb() {



        let txt:languageText[] = [

            {
                id:'parametersSelects',
                children:[
                    {
                        id:'vehicle',
                        da:'Køretøj'
                    },
                    {
                        id:'fuel',
                        da:'Brændstof'
                    },
                    {
                        id:'period',
                        da:'1. registrering'
                    },
                    {
                        id:'particleFilter',
                        da:'Partikelfilter'
                    },
                    {
                        id:'privateUsage',
                        da:'Anvendelse'
                    },
                    {
                        id:'totalWeightVan',
                        da:'Totalvægt på varebil'
                    },
                    {
                        id:'subPeriod_car_2',
                        da:'Hvornår i 1997?'
                    },
                    {
                        id:'subPeriod_van_2',
                        da:'Hvornår i 2009?'
                    },
                    {
                        id:'subPeriod_van_4',
                        da:'Hvornår i 2007?'
                    },
                    {
                        id:'subPeriod_van_6',
                        da:'Hvornår i 1998?'
                    },
                    {
                        id:'specialOptionCar',
                        da:'Frivillig ordning'
                    },
                    {
                        id:'size',
                        da:'Totalvægt over 12 tons'
                    },
                    {
                        id:'typeTruck',
                        da:'Vogntog eller lastbil?'
                    },
                    {
                        id:'axesTruck_roadTrain',
                        da:'Aksler på lastbil'
                    },
                    {
                        id:'suspension',
                        da:'Affjedringstype'
                    },
                    {
                        id:'axesTruck_roadTrain_road',
                        da:'Aksler på vogntog'
                    },
                    {
                        id:'axesTruck_Regular',
                        da:'Aksler på lastbil'
                    },
                    {
                        id:'smallTruckType',
                        da:'Type'
                    },
                    {
                        id:'axesTruck_small',
                        da:'Aksler på lastbil'
                    }
                ]

            },
            {
                id:'selectValues',
                children:[
                    {
                        id:'vehicle',
                        children:[
                            {
                                id:'car',
                                da:'Personbil'
                            },
                            {
                                id:'van',
                                da:'Varebil'
                            },
                            {
                                id:'truck',
                                da:'Lastbil'
                            },
                            {
                                id:'mc',
                                da:'Motorcykel'
                            },
                            {
                                id:'knallert',
                                da:'Knallert'
                            },
                            {
                                id:'trailer',
                                da:'Trailer (anhænger)'
                            },
                            {
                                id:'camper',
                                da:'Campingvogn'
                            },
                            {
                                id:'bus',
                                da:'Bus'
                            },
                            {
                                id:'taxa',
                                da:'Taxi'
                            },
                            {
                                id:'tractor',
                                da:'Traktor'
                            }
                        ]
                    },
                    {
                        id:'fuel',
                        children:[
                            {
                                id:'benzin',
                                da:'Benzin'
                            },
                            {
                                id:'diesel',
                                da:'Diesel'
                            }
  
                        ]
                    },
                    {
                        id:'periodcar',
                        children:[
                            {
                                id:'1',
                                da:'_THISYEAR_ - 1997'
                            },
                            {
                                id:'2',
                                da:'i 1997'
                            },
                            {
                                id:'3',
                                da:'Før 1997'
                            }
  
                        ]
                    },
                    {
                        id:'periodvan',
                        children:[
                            {
                                id:'1',
                                da:'_THISYEAR_ - 2010'
                            },
                            {
                                id:'2',
                                da:'2009'
                            },
                            {
                                id:'3',
                                da:'2008'
                            },
                            {
                                id:'4',
                                da:'2007'
                            },
                            {
                                id:'5',
                                da:'2006 - 1999'
                            },
                            {
                                id:'6',
                                da:'1998'
                            },
                            {
                                id:'7',
                                da:'Før 1998'
                            }
  
                        ]
                    },
                    {
                        id:'subPeriodcar_2',
                        children:[
                            {
                                id:'1',
                                da:'1. - 29. jan'
                            },
                            {
                                id:'2',
                                da:'30. jan - 30. juni'
                            },
                            {
                                id:'3',
                                da:'1. juli - 31. dec'
                            }
  
                        ]
                    },
                    {
                        id:'subPeriodvan_2',
                        children:[
                            {
                                id:'1',
                                da:'1. jan - 17. marts 2009'
                            },
                            {
                                id:'2',
                                da:'18. marts - 31. december'
                            }

                        ]
                    },
                    {
                        id:'subPeriodvan_4',
                        children:[
                            {
                                id:'1',
                                da:'1. januar - 24. april 2007'
                            },
                            {
                                id:'2',
                                da:'25. april - 31. december 2007'
                            }

                        ]
                    },
                    {
                        id:'subPeriodvan_6',
                        children:[
                            {
                                id:'1',
                                da:'1. januar - 2. juni 1998'
                            },
                            {
                                id:'2',
                                da:'3 juni - 31. december 1998'
                            }

                        ]
                    },
                    {
                        id:'specialOptionCar',
                        children:[
                            {
                                id:'ejerafgift',
                                da:'Ejerafgift (efter km/l)'
                            },
                            {
                                id:'vaegtafgift',
                                da:'Vægtafgift (efter vægt)'
                            }
  
                        ]
                    
                    },
                    {
                        id:'particleFilter',
                        children:[
                            {
                                id:'ja',
                                da:'Ja'
                            },
                            {
                                id:'nej',
                                da:'Nej'
                            }
  
                        ]
                    
                    },
                    {
                        id:'privateUsage',
                        children:[
                            {
                                id:'private',
                                da:'Privat'
                            },
                            {
                                id:'mixed',
                                da:'Blandet'
                            },
                            {
                                id:'job',
                                da:'Erhverv'
                            }
  
                        ]
                    
                    },
                    {
                        id:'totalWeightVan',
                        children:[
                                {
                                    id:'mindreEnd3tons',
                                    da:'Under 3.000 t'
                                },
                                {
                                    id:'3tonsogTungere',
                                    da:'Over 3.000 t'
                                }

                            ]
                    },
                    {
                        id:'size',
                        children:[
                            {
                                id:'large',
                                da:'Ja'
                            },
                            {
                                id:'small',
                                da:'Nej'
                            }
                        ]
                    },
                    {
                        id:'typeTruck',
                        children:[
                            {
                                id:'truck',
                                da:'Lastbil'
                            },
                            {
                                id:'roadTrain',
                                da:'Vogntog'
                            }
                        ]
                    },
                    {
                        id:'axesTruck_roadTrain',
                        children:[
                            {
                                id:'2',
                                da:'2 aksler'

                            },
                            {
                                id:'3',
                                da:'3 eller flere aksler'
                            }
                        ]
                    },
                    {
                        id:'axesTruck_roadTrain_road',
                        children:[
                            {
                                id:'1',
                                da:'1 aksel'
                            },
                            {
                                id:'2',
                                da:'2 aksler'
                            },
                            {
                                id:'3',
                                da:'3 eller flere aksler'
                            }
                        ]
                    },
                    {
                        id:'suspension',
                        children:[
                            {
                                id:'air',
                                da:'Luftaffjedring'
                            },
                            {
                                id:'other',
                                da:'Anden affjedring'
                            }
                        ]
                    },
                    {
                        id:'axesTruck_Regular',
                        children:[
                            {
                                id:'2',
                                da:'2 aksler'
                            },
                            {
                                id:'3',
                                da:'3 aksler'
                            },
                            {
                                id:'4',
                                da:'4 eller flere aksler'
                            }
                        ]
                    },
                    {
                        id:'axesTruck_small',
                        children:[
                            {
                                id:'2',
                                da:'2 aksel'
                            },
                            {
                                id:'3',
                                da:'3 eller flere askler'
                            }
                        ]
                    },
                    {
                        id:'smallTruckType',
                        children:[
                            {
                                id:'motorKoeretoej',
                                da:'Motorkøretøj'
                            },
                            {
                                id:'paahaengsKoeretoej',
                                da:'Påhængskøretøj'
                            }
                        ]
                    }
                    

                ]
            },
            {
                id:'textlayer',
                children:[
                    {
                        id:'kmPrLiter',
                        da:'km/l'
                    },
                    {
                        id:'vaegtKg',
                        da:'kg.'
                    },
                    {
                        id:'ejerafgift',
                        da:'Ejerafgift'
                    },
                    {
                        id:'vaegtafgift',
                        da:'Vægtafgift'
                    },
                    {
                        id:'udligning',
                        da:'Udligningsafgift'
                    },
                    {
                        id:'particleFilter',
                        da:'Partikelfilterafgift'
                    },
                    {
                        id:'halvaar',
                        da:'pr. halvår'
                    },
                    {
                        id:'kvartal',
                        da:'pr. kvartal'
                    },
                    {
                        id:'aar',
                        da:'pr. år'
                    },
                    {
                        id:'label_isKml',
                        da:'Km pr. liter - Brændstofsforbrug'
                    },
                    {
                        id:'label_isVaegt',
                        da:'Køretøjets vægt (kg.)'
                    },
                    {
                        id:'placeHolder_isKml',
                        da:'Indtast km/l'
                    },
                    {
                        id:'placeHolder_isVaegt',
                        da:'Indtast kg.'
                    },
                    {
                        id:'privatAnvendelsesAfgift',
                        da:'Privatanvendelsesafgift'
                    },
                    {
                        id:'all',
                        da:'-'
                    },
                    {
                        id:'knallert_info',
                        da:'Du skal ikke betale afgift af en knallert'
                    },
                    {
                        id:'tractor_info',
                        da:'Satsen gælder for godkendte traktorer (skov-,landbrug og gartneri) og registrerede traktorer (Godstransport), der er benzindrevne.'
                    }
                ]
            }


        ] 


        return {txt}

    };

    



}

