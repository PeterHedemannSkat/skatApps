/* long lasting constants, which seems overkill to put on the server  */
import { languageText } from '../infrastructure/interfaces.bilafgifter'


const privatAnvendelsesAfgift = [

    {
        id:'rules_2007toPresent',
        light:5920,
        heavy:17590,
        weightSeperator:3000
    },
    {
        id:'rules_1998to2007',
        light:1060,
        heavy:5920,
        weightSeperator:3000

    }
]

const partikelfilterAfgift = [

    {
        id:'partikelFilterBase',
        val:1000
    }

]

const vejbenyttelsesAfgifter = [
    {
        id:'basic',
        max3Axes:{
            ikkeEuro:7156,
            Euro1:6336,
            Euro2:5591 
        },
        atLeast4Axes:{
            ikkeEuro:11555,
            Euro1:10437,
            Euro2:9318           
        }
    }
]

export const hardCodedData = [

    {
        id:'vejbenyttelsesAfgifter',
        data:vejbenyttelsesAfgifter
    },
    {
        id:'partikelfilterAfgift',
        data:partikelfilterAfgift        
    },
    {
        id:'privatAnvendelsesAfgift',
        data:privatAnvendelsesAfgift
    }

]

let hardCodedValues:languageText[] = [
    {
        id:'vejbenyttelse',
        da:'',
        children:[
            {
                id:'max3Axes',
                da:'',
                children:[
                    {
                        id:'_van_vejbenyttelse_max3Axes_ikkeEuro'
                    }
                ]

            }
        ]
    }
]