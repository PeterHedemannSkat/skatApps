interface gaveAfgiftInput {

    giverBeloeb?:number,
    modtagerFaar?:number,
    giverBetalerAfgift:boolean,
    gaveAfgiftPct:number,
    fradrag:number

}

export class gaveAfgiftBeregninger implements gaveAfgiftInput {

    giverBetalerAfgift:boolean;
    private giversBeloebSamlet:number;
    private modtagerFaarBeloeb:number;
    gaveAfgiftPct:number;
    fradrag:number;
    userVariable:string = 'giver'
 
    constructor () {}


    gaveafgiftUser () {
        let afgiftbeloeb = this.afgiftBeloeb()
        return (afgiftbeloeb > 0 || afgiftbeloeb === 0) ? afgiftbeloeb : '-'
    }

    /*  
        beregningen er afhængig hvilke variabler der er kendte og ubekendte, som afhænger hvilke værdier 
        der sendes ind i fn. Hvis uservariable er modtager er modtager kendt og kan direkte returneres. 
      
    */

    set modtagerFaar (beloeb:number) {
        this.modtagerFaarBeloeb = beloeb
        this.userVariable = 'modtager'
    }

    get modtagerFaar () {
        return (this.userVariable == 'modtager') ? this.modtagerFaarBeloeb : (this.giverBeloeb - this.afgiftBeloeb())   
    }

    set giverBeloeb (beloeb:number) {    
        this.giversBeloebSamlet = beloeb
        this.userVariable = 'giver'
    } 

    get giverBeloeb () {
        return  (this.userVariable == 'giver') ? this.giversBeloebSamlet : Number(this.modtagerFaar) + this.afgiftBeloeb()
    }

    afgiftBeloeb () {

        /* 

            A = Afgiftbeløb; P er giveAfgiftsProcent/100; G = Givers beløb; F er Fradraget; M er modtager får 

            1.1 A = f(G,P,F): Modtager betaler afgift/Bruger skriver i giverbeløb, dvs. G er kendt variabel => Afgift og modtager skal beregnes 
            1.2 A = f(M,P,F): Modtager betaler afgift/Bruger skriver i modtager-får-felt, dvs. M er kendt men G er ubekendt 
            2.1 A = f(G,P,F): Giver betaler afgift (og får derfor fradrag for denne)/Bruger skriver i giverbeløb, dvs. G er kendt, M ubekendt
            2.2 A = f(M,P,F): Giver betaler afgift/brugr skriver i modtagerfelt, M er kendt, G ubekendt

            Afgiften er udledt pga 
            [1.1]                                                                    A = P * (G - F)
            [1.2] A = P * ((M + A) - F) => her skal a isoleres =>                    A = (P * (M - F))/(1 - P)
            [2.1] A = P * ((G - A) - F)  => Bemærk afgiften frafradrages (G - A) =>  A = (P * (G - F))/(1 + P) 
            [2.2] A = P * (((M + A) - A) - F) => G er her M + A                      A = P * (M - F)

            Devisor  i 1.2 og 2.1 kan derfor generaliseres og simplificere beregning (se getdevisor herunder). I 1.1 og 2.2 sættes den til 1

        */

        let pct         = this.gaveAfgiftPct/100,
            grundlag    = (this.userVariable == 'giver') ? this.giverBeloeb : this.modtagerFaar,
            afgift      = Math.round((pct * (grundlag - this.fradrag)) / this.getdevisor())

        return Math.max(0,afgift)

    }    

    afgiftsgrundlag () {

        return this.giverBeloeb - (this.giverBetalerAfgift ? this.afgiftBeloeb() : 0) - this.fradrag
    }

    private getdevisor () {

        let devisor:number 

        let pct = this.gaveAfgiftPct/100
        
        if (this.userVariable        == 'giver'     && this.giverBetalerAfgift) devisor = (1 + pct)  
        else if (this.userVariable   == 'giver'     && !this.giverBetalerAfgift) devisor = 1
        else if (this.userVariable   == 'modtager'  && this.giverBetalerAfgift) devisor = 1
        else if (this.userVariable  == 'modtager'   && !this.giverBetalerAfgift) devisor = (1 - pct)

        return devisor

    }

}

