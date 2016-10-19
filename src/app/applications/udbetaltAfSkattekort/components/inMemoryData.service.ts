import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { languageText } from '../../../shared/shared';

export class InMemoryDataService implements InMemoryDataService {

    createDb() {

        let textHolder:languageText[] = [{
            "description":"Navigation - næste knap (knap, global)",
            "da":"Næste",
            "en":"Next",
            "id":"next"
        },  {
            "description":"Navigation - tilbage knap (knap, global)",
            "da":"Tilbage",
            "en":"Back",
            "id":"back"
        }, {
            "description":"step 1 - skattekort (wizard-step, global)",
            "da":"Skattekort",
            "en":"Tax card",
            "id":"step2Name_2",
            "group":"wizard-step"
        },  {
            "description":"step 2 - indkomst (wizard-step, global)",
            "da":"Indkomst",
            "en":"Income",
            "id":"stepName_1",
            "group":"wizard-step"
        },  {
            "description":"step 3 - resultat (wizard-step, global)",
            "da":"Resultat",
            "en":"Result",
            "id":"stepName_3",
            "group":"wizard-step"
        },  {
            "description":"placeholder",
            "da":"skriv beløb",
            "en":"add amount",
            "id":"placeholder_1"
        },  {
            "description":"placeholder 2",
            "da":"Udbetaler / hvem bruger skattekort",
            "en":"Who pays",
            "id":"placeholder_2"
        },  {
            "description":"",
            "da":"pr måned",
            "en":"add amount",
            "id":"prmonth"
        },  {
            "description":"",
            "da":"for 2 uger",
            "en":"Who pays",
            "id":"prtwoweeks"
        }, {
            "description":"",
            "da":"Hovedkort",
            "en":"",
            "id":"hovedkortName"
        },  {
            "description":"",
            "da":"Bikort",
            "en":"",
            "id":"bikortName"
        }, {
            "description":"udbetaler label",
            "da":"Udbetaler (navn)",
            "en":"Who pays",
            "id":"udbetalerlabel"
        },{
            "description":"indkomsttyper gui1 - label for select",
            "da":"Indkomsttype",
            "en":"Your monthly income",
            "id":"maanedsindkomstTypeLabel"
        },  {
            "description":"indkomsttype - normal indkomst (select, gui1)",
            "da":"Lønindkomst",
            "en":"Salery",
            "id":"loonIndkomst",
            "group":"indkomsttyper"
        }, {
            "description":"indkomsttype - pension (select, gui1)",
            "da":"Pension",
            "en":"Pension",
            "id":"pension",
            "group":"indkomsttyper"
        },  {
            "description":"indkomsttype - akasse  (select, gui1)",
            "da":"Dagpenge",
            "en":"Pension",
            "id":"dagpenge",
            "group":"indkomsttyper"
        },  {
            "description":"indkomsttype - dagpenge  (select, gui1)",
            "da":"A-kasse",
            "en":"Pension",
            "id":"akasse",
            "group":"indkomsttyper"
        },  {
            "description":"indkomsttype - su  (select, gui1)",
            "da":"SU-indkomst",
            "en":"Student",
            "id":"su",
            "group":"indkomsttyper"
        }, {
            "description":"månedsinkomst (inputtext gui1)",
            "da":"Indkomst",
            "en":"Income",
            "id":"maanedsindkomst"
        },  {
            "description":"skattekortstyper gui2 - label",
            "da":"Bruger du dit hovedkort eller bikort på indkomsten?",
            "en":"Do you use the main tax card or the ... ",
            "id":"skattekortsTypeLabel"
        }, {
            "description":"skattekorts typer - hovedkort (skts-radio gui2)",
            "da":"Hovedkort",
            "en":"Main card",
            "id":"hovedkort",
            "group":"taxCardTypes"
        }, {
            "description":"skattekorts typer - bikort (skts-radio gui2)",
            "da":"Bikort",
            "en":"Minor card",
            "id":"bikort",
            "group":"taxCardTypes"
        },  {
            "description":"skattekortstyper gui2 - label",
            "da":"Udbetalingsfrekvens? (lønperiode)",
            "en":"Do you use the main tax card or the ... ",
            "id":"indkomstperiodeLabel"
        }, {
            "description":"",
            "da":"pr måned",
            "en":"Main card",
            "id":"monthly",
            "group":"indkomstperiode"
        }, {
            "description":"",
            "da":"hver anden uge (2-uger)",
            "en":"Minor card",
            "id":"twoweeks",
            "group":"indkomstperiode"
        },  {
            "description":"heading-tekst, der beskriver underliggende felter (tekst, gui2)",
            "da":"Tal på dit skattekort, som du kan finde i TastSelv.",
            "en":"Information as tax percentage and monthly deduction can be found on your tax card after log on to the Self Services",
            "id":"heading_gui2"
        },  {
            "description":"trækprocent (inputtext gui2)",
            "da":"Trækprocent",
            "en":"Tax percentage",
            "id":"traekprocent"
        },  {
            "description":"månedsfradrag  (inputtext gui2)",
            "da":"Månedsfradrag",
            "en":"Monthly deduction",
            "id":"maanedsfradrag"
        },  {
            "description":"bruttoindkomst i regnestykket - text (gui3)",
            "da":"Indkomst",
            "en":"Income",
            "id":"income_result_gui3"
        },  {
            "description":"Trukket skat i regnestykket - text (gui3)",
            "da":"Skat mv",
            "en":"Tax",
            "id":"tax_result_gui3"
        },  {
            "description":"Udbetalt - text (gui3)",
            "da":"Nettoindtægt",
            "en":"Paid to you",
            "id":"netto_result_gui3"
        },  {
            "description":"Udbetalt - text (gui3)",
            "da":" 8 % af ",
            "en":"Paid to you",
            "id":"gui3_4"
        },  {
            "description":"Udbetalt - text (gui3)",
            "da":"Nettoindtægt",
            "en":"Paid to you",
            "id":"gui3_5"
        }
        

        
        ]

        return {textHolder}

    };

    



}