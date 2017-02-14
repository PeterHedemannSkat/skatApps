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
                        id:'specialOptionCar',
                        da:'Frivillig ordning'
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
                                da:'personbil'
                            },
                            {
                                id:'van',
                                da:'varebil'
                            },
                            {
                                id:'truck',
                                da:'lastbil'
                            }
                        ]
                    },
                    {
                        id:'fuel',
                        children:[
                            {
                                id:'benzin',
                                da:'benzin'
                            },
                            {
                                id:'diesel',
                                da:'diesel'
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
                                da:'ja'
                            },
                            {
                                id:'nej',
                                da:'nej'
                            }
  
                        ]
                    
                    },
                    {
                        id:'privateUsage',
                        children:[
                            {
                                id:'private',
                                da:'privat'
                            },
                            {
                                id:'mixed',
                                da:'blandet'
                            },
                            {
                                id:'job',
                                da:'erhverv'
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
                    }
                ]
            }


        ] 


        return {txt}

    };

    



}

