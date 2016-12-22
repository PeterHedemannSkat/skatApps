import { InMemoryDbService } from 'angular2-in-memory-web-api';
import {deadlineManualDate } from '../infrastructure/types';
import { languageText } from '../../../shared/shared'

export class InMemoryDataService implements InMemoryDataService {

    createDb() {

        let manualDeadLines:deadlineManualDate[] = [
            { /* dummy  */
                id:'moms_kvartal',
                children:{
                    year:2000,
                    period:4
                },
                Frist:'10-03-2017 16:45'

            }
        ]

        let txt:languageText[] = [

            {
                id:'pligter',
                children:[

                    {
                        id:'selvangivelse',
                        da:'Selvangivelse',
                        children:[
                            {
                                id:'erhvervsdrivende',
                                da:'Erhvervsdrivende'
                            }
                        ]

                    },
                    {
                        id:'moms',
                        da:'Moms',
                        children:[
                            {
                                id:'moms_halvaar',
                                da:'halvårsafregning'
                            },
                            {
                                id:'moms_kvartal',
                                da:'kvartalsafregning'
                            },
                            {
                                id:'moms_maaned',
                                da:'månedsafregning'
                            }                    
                        ]
                    },
                    {
                        id:'loonsum',
                        da:'lønsum',
                        children:[
                            {
                                id:'loonsum_method1',
                                da:'metode 1'
                            },
                            {
                                id:'loonsum_method2',
                                da:'metode 2'
                            },
                            {
                                id:'loonsum_method3',
                                da:'metode 3'
                            },
                            {
                                id:'loonsum_method4B',
                                da:'metode 4 - med ansatte'
                            },
                            {
                                id:'loonsum_method4A',
                                da:'metode 4 - uden ansatte'
                            }   
      
                        ]

                    },
                    {
                        id:'askat',
                        da:'A-skat',
                        children:[
                            {
                                id:'AskatStoreVirksomhed',
                                da:'A-skat for store virksomheder'
                            },
                            {
                                id:'AskatSmaaVirksomheder',
                                da:'A-skat for små virksomheder'
                            }
      
                        ]

                    },
                    {
                        id:'EUsalgUdenMoms',
                        da:'EU-salg uden Moms (DK-VIES)',
                        children:[
                            {
                                id:'EUsalgUdenMoms',
                                da:'månedsindberetning'
                            },
                            {
                                id:'EusalgKvartal',
                                da:'kvartalsindberetning'
                            }
                        ]

                    },
                    {
                        id:'OneStopMoms',
                        da:'One Stop Moms',
                        children:[
                            {
                                id:'oneStopMoms',
                                da:'One Stop Moms'
                            }
                        ]

                    },
                    {
                        id:'momsRefusion',
                        da:'Momsrefusion',
                        children:[
                            {
                                id:'momsRefusion',
                                da:'Momsrefusion'
                            }
                        ]

                    },
                    {
                        id:'punktafgifter',
                        da:'Punktafgifter',
                        children:[
                            {
                                id:'punktafgifter',
                                da:'Punktafgifter'
                            }
                        ]
                    },
                    {
                        id:'selskabsskat',
                        da:'Selskabsskat',
                        children:[
                            {
                                id:'selskabsskat',
                                da:'accontoskat'
                            }
                        ]
                    },
                    {
                        id:'bSkatteRater',
                        da:'B-skatterater',
                        children:[
                            {
                                id:'bSkatteRater',
                                da:'b-skat'
                            }
                        ]
                    }
                ]
            },
            {
                id:'monthNames',
                da:'',
                children:[
                    {
                        id:'0',
                        da:'januar'

                    },
                    {
                        id:'1',
                        da:'februar'

                    },
                    {
                        id:'2',
                        da:'marts'

                    },
                    {
                        id:'3',
                        da:'april'

                    },
                    {
                        id:'4',
                        da:'maj'
                    },                    
                    {
                        id:'5',
                        da:'juni'
                    },
                    {
                        id:'6',
                        da:'juli'
                    },
                    {
                        id:'7',
                        da:'august'
                    },
                    {
                        id:'8',
                        da:'september'
                    },
                    {
                        id:'9',
                        da:'oktober'
                    },
                    {
                        id:'10',
                        da:'november'
                    },
                    {
                        id:'11',
                        da:'december'
                    },
                    {
                        id:'ABC',
                        da:'Danmark'
                    }
                ]
            },
            {
                id:'weekDaysNames',
                da:'',
                children:[
                    {
                        id:'0',
                        da:'søndag'

                    },
                    {
                        id:'1',
                        da:'mandag'

                    },
                    {
                        id:'2',
                        da:'tirsdag'

                    },
                    {
                        id:'3',
                        da:'onsdag'

                    },
                    {
                        id:'4',
                        da:'torsdag'
                    },                    
                    {
                        id:'5',
                        da:'fredag'
                    },
                    {
                        id:'6',
                        da:'lørdag'
                    }
  
                ]

            },
            {
                id:'general',
                da:'',
                children:[
                    {
                        id:'header',
                        da:'Frister for virksomheder'

                    },
                    {
                        id:'loonsum_method134',
                        da:'Metode 1,3 og 4'

                    },
                    {
                        id:'loonsum_method134super',
                        da:'Lønsum'

                    },                    
                    {
                        id:'showHideAll',
                        da:'Vis/skjul alle'

                    },
                    {
                        id:'kvartal',
                        da:'kvartal'

                    },
                    {
                        id:'wholeyear',
                        da:'år'
                    },
                   {
                        id:'halvaar',
                        da:'halvår'
                        
                    },
                    {
                        id:'for',
                        da:'for'
                    },
                    {
                        id:'daysTo',
                        da:'dage til'
                    },
                    {
                        id:'noDeadlines',
                        da:'Ingen pligter valgt'
                    },
                    {
                        id:'daysLate',
                        da:'Frist overskredet'
                    },
                    {
                        id:'tomorrow',
                        da:'I morgen'
                    },
                    {
                        id:'lessThanHours',
                        da:'Under X timer'
                    },
                    {
                        id:'firstTimeView',
                        da:'Vælg din virksomheds pligter (fx lønsum) ved at klikke på ikonet herover, så viser kalenderen dine frister. Den husker dem næste gang du kommer forbi denne side.'
                    },
                    {
                        id:'rate',
                        da:'rate'
                    },
                    {
                        id:'subTextIndstillinger',
                        da:'Dine valg gemmes ...'
                    }
                    
                ]

            }


        
        ] 

        return {manualDeadLines,txt}


    }    

}