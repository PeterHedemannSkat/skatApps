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
                        da:'køretøj'
                    },
                    {
                        id:'fuel',
                        da:'brændstof'
                    },
                    {
                        id:'period',
                        da:'1. registrering'
                    },
                    {
                        id:'particleFilter',
                        da:'partikelfilter'
                    },
                    {
                        id:'privateUsage',
                        da:'anvendelse'
                    },
                    {
                        id:'totalWeightVan',
                        da:'totalvægt på varebil'
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
                                    id:'light',
                                    da:'Under 3.000 t'
                                },
                                {
                                    id:'heavy',
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
                    }
                ]
            }


        ] 


        return {txt}

    };

    



}

