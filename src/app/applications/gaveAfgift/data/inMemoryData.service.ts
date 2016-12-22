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
          
        ]

        let txt:languageText[] = [

            {
                id:'mainCategories',
                children:[
                    {
                        id:'boernAfkom',
                        da:'Børn/stedbørn,børnebørn'
                    },
                    {
                        id:'foraeldre',
                        da:'Forældre'
                    },
                   {
                        id:'bedsteforaeldre',
                        da:'Bedsteforældre'
                    }
                ]
            }

        ] 


        return {gaveAfgiftSatser,txt}

    };

    



}