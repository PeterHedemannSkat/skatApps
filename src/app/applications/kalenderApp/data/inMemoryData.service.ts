import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { deadlineManualDate } from '../infrastructure/types';
import { languageText } from '../../../shared/shared'

export class InMemoryDataService implements InMemoryDataService {

    createDb() {

        let manualDeadLines: deadlineManualDate[] = [
            /*
            {
                id:'moms_kvartal',
                children:{
                    year:2000,
                    period:4
                },
                Frist:'10-03-2017 16:45'

            },
            */
            { /* dummy  */
                Id: 'erhvervsdrivende',
                children: [{
                    year: 2016,
                    Periode: 1,
                    Id: 'erhvervsdrivende'
                }],
                Frist: '2-07-2017 16:45'

            }
        ]

        let txt: languageText[] = [

            {
                id: 'pligter',
                children: [

                    {
                        id: 'selvangivelse',
                        da: 'Oplysningsformular',
                        en: 'Preliminary income assessment',
                        children: [
                            {
                                id: 'erhvervsdrivende',
                                da: 'Erhvervsdrivende',
                                en: 'Businessperson'
                            }
                        ]

                    },
                    {
                        id: 'moms',
                        da: 'Moms',
                        en: 'VAT',
                        children: [
                            {
                                id: 'moms_halvaar',
                                da: 'halvårsafregning',
                                en: 'semiannualy'
                            },
                            {
                                id: 'moms_kvartal',
                                da: 'kvartalsafregning',
                                en: 'quarterly'
                            },
                            {
                                id: 'moms_maaned',
                                da: 'månedsafregning',
                                en: 'monthly'
                            }
                        ]
                    },
                    {
                        id: 'loonsum',
                        da: 'lønsum',
                        en: 'payroll tax',
                        children: [
                            {
                                id: 'loonsum_method1',
                                da: 'metode 1',
                                en: 'method 1'
                            },
                            {
                                id: 'loonsum_method2',
                                da: 'metode 2',
                                en: 'method 2'
                            },
                            {
                                id: 'loonsum_method3',
                                da: 'metode 3',
                                en: 'method 3'
                            },
                            {
                                id: 'loonsum_method4B',
                                da: 'metode 4 - med ansatte',
                                en: 'method 4 - with employees'
                            },
                            {
                                id: 'loonsum_method4A',
                                da: 'metode 4 - uden ansatte',
                                en: 'method 4 - with no employees'
                            }

                        ]

                    },
                    {
                        id: 'askat',
                        da: 'A-skat',
                        en: 'A-tax',
                        children: [
                            {
                                id: 'AskatStoreVirksomhed',
                                da: 'A-skat for store virksomheder',
                                en: 'A-tax for large businesses'
                            },
                            {
                                id: 'AskatSmaaVirksomheder',
                                da: 'A-skat for små virksomheder',
                                en: 'A-tax for small businesses'
                            }

                        ]

                    },
                    {
                        id: 'EUsalgUdenMoms',
                        da: 'EU-salg uden Moms (DK-VIES)',
                        en: 'EU-sale without VAT (DK-VIES)',
                        children: [
                            {
                                id: 'EUsalgUdenMoms',
                                da: 'månedsindberetning',
                                en: 'monthly'
                            },
                            {
                                id: 'EusalgKvartal',
                                da: 'kvartalsindberetning',
                                en: 'quarterly'
                            }
                        ]

                    },
                    {
                        id: 'OneStopMoms',
                        da: 'One Stop Moms',
                        en: 'One Stop Moms',
                        children: [
                            {
                                id: 'oneStopMoms',
                                da: 'One Stop Moms',
                                en: 'One Stop Moms'
                            }
                        ]

                    },
                    {
                        id: 'momsRefusion',
                        da: 'Momsrefusion',
                        en: 'VAT refund',
                        children: [
                            {
                                id: 'momsRefusion',
                                da: 'Momsrefusion',
                                en: 'VAT refund'
                            }
                        ]

                    },
                    {
                        id: 'punktafgifter',
                        da: 'Punktafgifter',
                        en: 'Excise duties',
                        children: [
                            {
                                id: 'punktafgifter',
                                da: 'Punktafgifter',
                                en: 'Excise duties'
                            }
                        ]
                    },
                    {
                        id: 'selskabsskat',
                        da: 'Selskabsskat',
                        en: 'Corporate tax',
                        children: [
                            {
                                id: 'selskabsskat',
                                da: 'accontoskat',
                                en: 'accontoskat'
                            }
                        ]
                    },
                    {
                        id: 'bSkatteRater',
                        da: 'B-skatterater',
                        en: 'B-tax rates',
                        children: [
                            {
                                id: 'bSkatteRater',
                                da: 'b-skat',
                                en: 'b-tax'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'monthNames',
                da: '',
                en: 'en: ',
                children: [
                    {
                        id: '0',
                        da: 'januar',
                        en: 'january'

                    },
                    {
                        id: '1',
                        da: 'februar',
                        en: 'february'

                    },
                    {
                        id: '2',
                        da: 'marts',
                        en: 'march'

                    },
                    {
                        id: '3',
                        da: 'april',
                        en: 'april'

                    },
                    {
                        id: '4',
                        da: 'maj',
                        en: 'may'
                    },
                    {
                        id: '5',
                        da: 'juni',
                        en: 'june'
                    },
                    {
                        id: '6',
                        da: 'juli',
                        en: 'july'
                    },
                    {
                        id: '7',
                        da: 'august',
                        en: 'august'
                    },
                    {
                        id: '8',
                        da: 'september',
                        en: 'september'
                    },
                    {
                        id: '9',
                        da: 'oktober',
                        en: 'october'
                    },
                    {
                        id: '10',
                        da: 'november',
                        en: 'november'
                    },
                    {
                        id: '11',
                        da: 'december',
                        en: 'december'
                    },
                    {
                        id: 'ABC',
                        da: 'Danmark',
                        en: 'Denmark'
                    }
                ]
            },
            {
                id: 'weekDaysNames',
                da: '',
                en: 'en: ',
                children: [
                    {
                        id: '0',
                        da: 'søndag',
                        en: 'sunday'

                    },
                    {
                        id: '1',
                        da: 'mandag',
                        en: 'monday'

                    },
                    {
                        id: '2',
                        da: 'tirsdag',
                        en: 'tuesday'

                    },
                    {
                        id: '3',
                        da: 'onsdag',
                        en: 'wednesday'

                    },
                    {
                        id: '4',
                        da: 'torsdag',
                        en: 'thursday'
                    },
                    {
                        id: '5',
                        da: 'fredag',
                        en: 'friday'
                    },
                    {
                        id: '6',
                        da: 'lørdag',
                        en: 'saturday'
                    }

                ]

            },
            {
                id: 'general',
                da: '',
                en: 'en: ',
                children: [
                    {
                        id: 'header',
                        da: 'Frister for virksomheder',
                        en: 'Deadlines for companies'

                    },
                    {
                        id: 'loonsum_method134',
                        da: 'Metode 1,3 og 4',
                        en: 'method 1,3 og 4'

                    },
                    {
                        id: 'loonsum_method134super',
                        da: 'Lønsum',
                        en: 'payroll tax'

                    },
                    {
                        id: 'showHideAll',
                        da: 'Vis/skjul alle',
                        en: 'Hide/show all'

                    },
                    {
                        id: 'kvartal',
                        da: 'kvartal',
                        en: 'quarter'

                    },
                    {
                        id: 'wholeyear',
                        da: 'år',
                        en: 'year'
                    },
                    {
                        id: 'halvaar',
                        da: 'halvår',
                        en: 'half of the year'

                    },
                    {
                        id: 'for',
                        da: 'for',
                        en: 'for'
                    },
                    {
                        id: 'daysTo',
                        da: 'dage til',
                        en: 'days to'
                    },
                    {
                        id: 'noDeadlines',
                        da: 'Ingen pligter valgt',
                        en: 'No duties selected'
                    },
                    {
                        id: 'daysLate',
                        da: 'Frist overskredet',
                        en: 'Deadline done'
                    },
                    {
                        id: 'tomorrow',
                        da: 'I morgen',
                        en: 'tomorrow'
                    },
                    {
                        id: 'lessThanHours',
                        da: 'Under X timer',
                        en: 'Under X hours'
                    },
                    {
                        id: 'firstTimeView',
                        da: 'Vælg din virksomheds pligter (fx lønsum) ved at klikke på ikonet herover, så viser kalenderen dine frister. Den husker dem næste gang du kommer forbi denne side.',
                        en: 'long english text, long english text, long english text, long english text, long english text, long english text, long english text, long english text, long english text.'
                    },
                    {
                        id: 'rate',
                        da: 'rate',
                        en: 'rate'
                    },
                    {
                        id: 'subTextIndstillinger',
                        da: 'Dine valg gemmes ...',
                        en: 'Dine settings are being saved...'
                    }

                ]

            }



        ]

        return { manualDeadLines, txt }


    }

}