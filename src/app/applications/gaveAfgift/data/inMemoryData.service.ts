import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { languageText } from '../../../shared/shared';

export class InMemoryDataService implements InMemoryDataService {

    /* måske ville det være en bedre i de af lave en generisk sats pr. år   */

    createDb() {

        let gaveAfgiftSatser:Object[] = [

            {
                year:2016,    
                naertbeslaegtede:61500,
                svigerboern:21500

            },
            {
                year:2017,    
                naertbeslaegtede:62900,
                svigerboern:22000
                
            }
            /*,
            {
                year:2018,    
                naertbeslaegtede:70000,
                svigerboern:22000
            }
            */
            
          
        ]

        let txt:languageText[] = [

            {
                id:'mainCategories',
                children:[
                    {
                        id:'boernAfkom',
                        da:'børn/stedbørn, børnebørn'
                    },
                    {
                        id:'foraeldre',
                        da:'forældre'
                    },
                    {
                        id:'aegtefaelle',
                        da:'ægtefælle'
                    },
                    {
                        id:'bedsteforaeldre',
                        da:'bedsteforældre'
                    },
                    {
                        id:'stedforaeldre',
                        da:'stedforældre'
                    },
                    {
                        id:'bofaelle',
                        da:'bofælle'      
                    },
                    {
                        id:'svigerboern',
                        da:'svigerbørn'
                    },
                    {
                        id:'andre',
                        da:'alle andre (inkl. søskende)'
                    }
                ]
            },
            {
                id:'tilRelation',
                children:[
                    {
                        id:'boernAfkom',
                        da:'pr. barn/stedbarn m.fl'
                    },
                    {
                        id:'foraeldre',
                        da:'til din mor og/eller far'                        
                    },
                    {
                        id:'bedsteforaeldre',
                        da:'til din bedstemor og/eller bedstefar'                          
                    },
                    {
                        id:'stedforaeldre',
                        da:'til din stedfar og/eller stedmor'
                    },
                    {
                        id:'bofaelle',
                        da:' til din bofælle'
                    },
                    {
                        id:'svigerboern',
                        da:'til dit svigerbarn (barns ægtefælle)'
                    }

                ]
            },
            {
                id:'svigerboern',
                children:[
                    {
                        id:'svigerboernIlive',
                        da:'i live'
                    },
                    {
                        id:'svigerboernAfdød',
                        da:'afdød'
                    }
                ]
            },
            {
                id:'detailedDescription',
                children:[
                    {
                        id:'boernAfkom',
                        da:'Børn, børnebørn oldebørn, tipoldebørn osv. Stedbørn, stedbørns børn, børnebørn oldebørn tipoldebørn osv. Hvis I ikke er gift regnes den enes særbørn ikke som stedbørn'
                    },
                    {
                        id:'bofaelle',
                        da:'Personer, som du har haft fælles bopæl med de sidste to år, før gaven blev givet. I skal bo sammen, når gaven gives. Personer, som du tidligere har haft fælles bopæl med i mindst to sammenhængende år, og hvor samlivet er ophørt, fordi den ene af jer er flyttet på institution. Plejebørn, som har haft bopæl hos dig i mindst fem sammenhængende år, hvis opholdet begyndte, inden plejebarnet var fyldt 15 år. Højst en af plejebarnets forældre må have haft bopæl hos dig sammen med plejebarnet.'
                    }
                ]
            },
            {
                id:'textlayer',
                children:[
                    {
                        id:'giverTil',
                        da:'Hvem modtager gaven? Dine ...'
                    },
                    {
                        id:'Svigerboern_label',
                        da:'Er ægtefællen (dit barn) til svigerbarnet:'
                    },
                    {
                        id:'changeYear',
                        da:'Skift til '
                    },
                    {
                        id:'overskrift1',
                        da:'Pengegave til et familiemedlem'
                    },
                    {
                        id:'detaljeromRelation_link',
                        da:'Detaljer om hvem dette omfatter'
                    },
                    {
                        id:'aegtefaelleFrit',
                        da:'Du kan frit overføre kontantgaver til din ægtefælle'
                    },
                    {
                        id:'duKanGive',
                        da:'Du kan give'
                    },
                    {
                        id:'dobbeltGave2',
                        da:'til hver, så de samlet får'
                    },
                    {
                        id:'foraeldreTilBarn',
                        da:'Som to forældre kan I derfor samlet (I giver begge en gave) give hvert barn/stedbarn mv.'
                    },
                    {
                        id:'gaveTilAndre',
                        da:'Giver en gaver til andre - herunder - søskende - skal den der modtager gaven angive dette som anden indkomst i årsopgørelsen'
                    },
                    {
                        id:'giveSkatteFrit',
                        da:'Det kan du give skattefrit i'
                    },
                    {
                        id:'i',
                        da:'i'
                    },
                    {
                        id:'skatteFrit',
                        da:'skattefrit'
                    },
                    {
                        id:'giverDuMere',
                        da:'Giver du mere?'
                    },
                    {
                        id:'giverDuMereEnd',
                        da:'Giver du mere end'
                    },
                    {
                        id:'erGaveafgiften',
                        da:'er gaveafgiften'
                    },
                    {
                        id:'afBeloebetOver',
                        da:'af beløbet over'
                    },
                    {
                        id:'duKanBeregne',
                        da:'Du kan beregne afgiften her'
                    },
                    {
                        id:'label_beregnGaveAfgift',
                        da:'Beregn gaveafgift, hvis du giver mere'
                    },
                    {
                        id:'hvadSkalIndtastes',
                        da:'Indtast enten (1) hvor meget du ønsker den du giver til skal have eller (2) hvor mange penge du vil give. '
                    },
                    {
                        id:'forklaringAfHvemBetaler',
                        da:'Afgiften afhænger af hvem der betaler den. Det er en økonomisk fordel, hvis giveren betaler afgiften, da denne får mulighed for at trække dette beløb fra inden, der skal betales gaveafgift.  '
                    },
                    {
                        id:'label_GiverBeloeb',
                        da:'Du giver i gave (kr.)'
                    },
                    {
                        id:'label_ModtagerBeloeb',
                        da:'Modtager får/skal have'
                    },
                    {
                        id:'label_hvemBetalerAfgift',
                        da:'Giver betaler gaveafgift'
                    },
                    {
                        id:'resultText',
                        da:'Gaveafgift, der skal betales'
                    },
                    {
                        id:'detGoorDu',
                        da:'Det gør du:'
                    },
                    {
                        id:'process',
                        da:'Giver du dette beløb, skal du indberette det til SKAT ved at indsende en blanket. Du skal bl.a. bruge følgende oplysninger under afsnit 6 vedrørende gaveafgiftsberegning'
                    },
                    {
                        id:'process1',
                        da:'Gavebeløb'
                    },
                    {
                        id:'process2',
                        da:'Afgiftsfrit beløb'
                    },
                    {
                        id:'process3',
                        da:'Afgiftsgrundlag'
                    },
                    {
                        id:'process4',
                        da:'Gaveafgift'
                    },
                    {
                        id:'kr',
                        da:'kr.'
                    },
                    {
                        id:'linkTextForm',
                        da:'Åbn og udfyld kontantgaveblanket'
                    },
                    {
                        id:'placeholder',
                        da:'Skriv beløb'
                    },
                    {
                        id:'juraforbehold',
                        da:'Forbehold bl.a bl.a'
                    },
                    {
                        id:'linkNameJura',
                        da:'Link til juridisk vejledning'
                    },
                    {
                        id:'retAar',
                        da:'| skift år:'
                    },
                    {
                        id:'linkTextAarsopgorelsen',
                        da:'Gå til årsopgørelsen'
                    }
                ]
            }

        ] 


        return {gaveAfgiftSatser,txt}

    };

    



}