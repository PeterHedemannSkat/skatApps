import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { languageText } from '../../../shared/shared';

export class InMemoryDataService implements InMemoryDataService {

    createDb() {

        let textHolder:languageText[] = [

        {
            "description":"selects",
            "da":"",
            "en":"",
            "id":"selects",
            "children":[{
                "description":"",
                "da":"",
                "en":"",
                "id":"wizardNames",
                "children":[{
                    "description":"",
                    "da":"Skattekort",
                    "en":"",
                    "id":"step1"
                },{
                    "description":"",
                    "da":"Indkomst",
                    "en":"",
                    "id":"step2"
                },{
                    "description":"",
                    "da":"Resultat",
                    "en":"",
                    "id":"step3"
                }],
                }, {
                "description":"",
                "da":"",
                "en":"",
                "id":"loonindkomstTyper",
                "children":[{
                    "description":"",
                    "da":"Løn",
                    "en":"",
                    "id":"loonIndkomst"
                },{
                    "description":"",
                    "da":"Pension",
                    "en":"",
                    "id":"pension"
                },{
                    "description":"",
                    "da":"Dagepenge/a-kasse",
                    "en":"",
                    "id":"akasse"
                },{
                    "description":"",
                    "da":"SU",
                    "en":"",
                    "id":"su"
                }],
                },{
                "description":"",
                "da":"",
                "en":"",
                "id":"skattekortsTyper",
                "children":[{           
                    "description":"",
                    "da":"Hovedkort",
                    "en":"",
                    "id":"hovedkort"
                },{
                    "description":"",
                    "da":"Bikort",
                    "en":"",
                    "id":"bikort"
                }]
                },{
                "description":"",
                "da":"",
                "en":"",
                "id":"indkomstperioder",
                "children":[{           
                    "description":"",
                    "da":"pr måned",
                    "en":"",
                    "id":"monthly"
                },{
                    "description":"",
                    "da":"hver anden uge",
                    "en":"",
                    "id":"twoweeks"
                }]
                }
            ]
            },{
            "description":"step1 content",
            "da":"",
            "en":"",
            "id":"step1",
            "children":[{
                "description":"",
                "da":"",
                "en":"",
                "id":"general",
                "children":[{
                    "description":"",
                    "da":"Trækprocent",
                    "en":"",
                    "id":"traekprocentLabel"
                },{
                    "description":"",
                    "da":"Månedsfradrag",
                    "en":"",
                    "id":"maanedsfradragLabels"
                },{
                    "description":"",
                    "da":" ",
                    "en":"",
                    "id":"helpMaanedsfradrag"
                },{
                    "description":"",
                    "da":"Tal på dit skattekort, som du kan finde i forskudsopgørelsen i TastSelv.",
                    "en":"Information as tax percentage and monthly deduction can be found on your tax card after log on to the Self Services",
                    "id":"overskrift1"
                }],
                },{
                "description":"Navigation - næste knap (knap, global)",
                "da":"Fortsæt",
                "en":"Next",
                "id":"overskrift1"
                }
            ]
        },     {
            "description":"step2 content",
            "da":"",
            "en":"",
            "id":"step2",
            "children":[{
                "description":"",
                "da":"",
                "en":"",
                "id":"general",
                "children":[{
                    "description":"",
                    "da":"Indkomsttype",
                    "en":"",
                    "id":"indkomstTyperLabel"
                },{
                    "description":"",
                    "da":"Bruger du dit hovedkort eller bikort på indkomsten?",
                    "en":"",
                    "id":"skattekortTyperLabel"
                },{
                    "description":"",
                    "da":"Indkomst ved andet end løn .. --- ",
                    "en":"",
                    "id":"helpOtherThanSalery"
                },{
                    "description":"",
                    "da":"Indkomst",
                    "en":"",
                    "id":"indkomstLabelDel1"
                },{
                    "description":"",
                    "da":"pr måned",
                    "en":"",
                    "id":"indkomstLabelDel2Monthly"
                },{
                    "description":"",
                    "da":"hver 2. uge",
                    "en":"",
                    "id":"indkomstLabelDel2TwoWeekly"
                },{
                    "description":"",
                    "da":"Udbetalingsfrekvens? (lønperiode)",
                    "en":"",
                    "id":"udbetalingsfrekvensLabel"
                },{
                    "description":"",
                    "da":"Skriv navn arbejdsgiver",
                    "en":"",
                    "id":"udbetalerPlaceholder"
                },{
                    "description":"",
                    "da":"Arbejdsgiver (navn)",
                    "en":"",
                    "id":"udbetalerLabel"
                },{
                    "description":"",
                    "da":"Lønindkomsten er den bla bla. ",
                    "en":"",
                    "id":"helpIndkomst" 
                },{
                    "description":"",
                    "da":"til <b>Hej</b>",
                    "en":"",
                    "id":"indkomstTyperHelp" 
                },{
                    "description":"",
                    "da":"Tilføj indkomst",
                    "en":"",
                    "id":"headingNy"     
                },{
                    "description":"",
                    "da":"Rediger indkomst",
                    "en":"",
                    "id":"headingEdit"
                    
                },{
                    "description":"",
                    "da":"Hovedkortet er nu flyttet fra",
                    "en":"",
                    "id":"hovedkortFlyttet"
                    
                },{
                    "description":"",
                    "da":"til",
                    "en":"",
                    "id":"til"
                    
                },{
                    "description":"",
                    "da":"(hovedkortet kan kun være hos én udbetaler)",
                    "en":"",
                    "id":"kunKunBrugesEtSted"
                    
                }]
            }]
        }, {
            "description":"step3 content",
            "da":"",
            "en":"",
            "id":"step3",
            "children":[{
                "description":"",
                "da":"",
                "en":"",
                "id":"general",
                "children":[{
                    "description":"",
                    "da":"Indkomst fra",
                    "en":"",
                    "id":"indkomstFra"
                },{
                    "description":"",
                    "da":"måned",
                    "en":"",
                    "id":"maaned"
                },{
                    "description":"",
                    "da":"2. uge",
                    "en":"",
                    "id":"twoweeks"
                },{
                    "description":"",
                    "da":"A-skat",
                    "en":"",
                    "id":"Askat"
                },{
                    "description":"",
                    "da":"% af",
                    "en":"",
                    "id":"procentAf"
                },{
                    "description":"",
                    "da":"AM-bidrag:",
                    "en":"",
                    "id":"AMbidrag"
                },{
                    "description":"",
                    "da":"A-indkomst",
                    "en":"",
                    "id":"Aindkomst"
                },{
                    "description":"",
                    "da":"Nettoudbetalt (efter skat)",
                    "en":"",
                    "id":"udbetaltEfterSkat"
                },{
                    "description":"",
                    "da":"Du får udbetalt",
                    "en":"",
                    "id":"samletUdbetalt"
                },{
                    "description":"",
                    "da":"Ret",
                    "en":"",
                    "id":"ret"
                },{
                    "description":"",
                    "da":"Slet",
                    "en":"",
                    "id":"slet"
                },{
                    "description":"",
                    "da":"Anvend hovedkort",
                    "en":"",
                    "id":"anvendHovedkort"
                },{
                    "description":"",
                    "da":"Har du flere indkomster?",
                    "en":"",
                    "id":"flereIndkomsterLabel"
                },{
                    "description":"",
                    "da":"Udbetalt pr måned (2-ugers udbetalinger omregnet til måned)",
                    "en":"",
                    "id":"omregnetTilMaaned"
                },{
                    "description":"",
                    "da":"Tilføj indkomst",
                    "en":"",
                    "id":"tilfoejIndkomstButton"
                },{
                    "description":"",
                    "da":"bruger dit",
                    "en":"",
                    "id":"brugerDit"
                },{
                    "description":"",
                    "da":"Hovedkort",
                    "en":"",
                    "id":"hovedkort"
                },{
                    "description":"",
                    "da":"Bikort",
                    "en":"",
                    "id":"bikort"
                },{
                    "description":"",
                    "da":"Anvendt skattekort på denne indkomst:",
                    "en":"",
                    "id":"anvendtSkattekort"
                }]
            },{
                "description":"",
                "da":"",
                "en":"",
                "id":"aIndkomst",
                "children":[{
                    "description":"",
                    "da":"Fradrag",
                    "en":"",
                    "id":"fradrag"
                },{
                    "description":"",
                    "da":"A-skat",
                    "en":"",
                    "id":"aSkat"
                },{
                    "description":"",
                    "da":"Indkomst",
                    "en":"",
                    "id":"indkomst"
                },{
                    "description":"",
                    "da":"Beregning af a-indkomst:",
                    "en":"",
                    "id":"overskrift"
                }

                ]

            }]
        }, {
            "description":"",
            "da":"",
            "en":"",
            "id":"general",
            "children":[{
                "description":"placeholder tekster",
                "da":"",
                "en":"",
                "id":"placeholderTexts",
                "children":[
                    {
                        "description":"XXX",
                        "da":"Skriv beløb",
                        "en":"Next",
                        "id":"skrivbeloeb"
                    }, {
                        "description":"",
                        "da":"Skriv procent",
                        "en":"Next",
                        "id":"skrivprocent"
                    }
                ]
                },{
                "description":"knapper",
                "da":"",
                "en":"",
                "id":"globalbuttons",
                "children":[
                    {
                        "description":"Navigation - næste knap (knap, global)",
                        "da":"Fortsæt",
                        "en":"Next",
                        "id":"next"

                    },  {
                        "description":"Navigation - tilbage knap (knap, global)",
                        "da":"Tilbage",
                        "en":"Back",
                        "id":"back"
                    }
                ]

                },{
                "description":"Fejlmeddelelser",
                "da":"",
                "en":"",
                "id":"errorMessages",
                "children":[
                    {
                        "description":"",
                        "da":"Hov, det skal være et tal",
                        "en":"Next",
                        "id":"number"

                    },  {
                        "description":"",
                        "da":"Hov, feltet er tomt",
                        "en":"Back",
                        "id":"notEmpty"
                    },  {
                        "description":"",
                        "da":"Hov, det skal være et tal mellem X og Y",
                        "en":"Back",
                        "id":"range"
                    }
                ]

                }
            ]
            
        }]

        return {textHolder}

    };

    



}