import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { languageText } from '../../../shared/shared';

export class InMemoryDataService implements InMemoryDataService {

    /* måske ville det være en bedre i de af lave en generisk sats pr. år   */

    createDb() {

        let bilafgifter:Object[] = [

            {
                year:2017
                ejerAfgifter:"3,3,343",
                ejerAfgiftDiesel:"32,34.3,",
                


            }


            
          
        ]

        let txt:languageText[] = [


        ] 


        return {bilafgifter,txt}

    };

    



}