import { interval } from '../infrastructure/interfaces.bilafgifter'

export let intervalsBilafgifter:interval[] = [

    {
        id:'_ejerAfgift_benzin_',
        data:[0,4.5,4.8,5,5.3,5.6,5.9,6.3,6.7,7.1,7.7,8.3,9.1,10,10.5,11.1,11.8,12.5,13.3,14.3,15.4,16.7,18.2,20,Number.POSITIVE_INFINITY],
        type:-0.1,
        toMap:-0.1
    },
    {
        id:'_ejerAfgift_diesel_',
        data:[0,5.1,5.4,5.6,5.9,6.2,6.6,7,7.5,8.1,8.7,9.4,10.2,11.3,11.9,12.5,13.2,14.1,15,16.1,17.3,18.8,20.5,22.5,25,28.1,32.1,Number.POSITIVE_INFINITY],
        type:-0.1,
        toMap:-0.1 
    },
    {
        id:'vaegtAfgiftlov',
        data:[0,600,800,1100,1300,1500,2000,Number.POSITIVE_INFINITY],
        type:1,
        fromMap:1 
    },
    {
        id:'vareBilEct',
        data:[500,1000,2000,2500,3000,4000],
        type:1,
        fromMap:1 
    },
    {
        id:'truck_1',
        data:[12999,13999,14999],
        type:1,
        fromMap:1 
    }
]
    