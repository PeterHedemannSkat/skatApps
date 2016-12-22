interface multiGears {
    gears:number,
    startingPosition:number
}

export class MathCalc {


    multidimensionGearMove (gearsDefinition:multiGears[],moves:number,flow:string) {

        return gearsDefinition.map(gear => {

            let newSpin = this.gearsMove(gear.gears,gear.startingPosition,moves,flow)
            moves = newSpin.spins 
            
            return {
                position:newSpin.newGearPosition,
                rounds:newSpin.spins
            }

        })

    }

    gearsMove (gears:number,orginalposition:number,moves:number,flow:string) {

        let 
            movesAbs                = Math.abs(moves),
            direction               = (moves < 0) ? '<' : '>',
            newPos                  = orginalposition + moves,
            spins:number            = 0,
            newGearPosition:number
 

        /* first check if it's an easy one - in the same year - otherwise do math look in logik  */
        if (newPos <= gears && newPos > 0) {

            newGearPosition   = newPos;

        } else {

            /* rest is the moves BEYOND moves in the starting (period-block) [which is different depending on moving down or up]. Years and end period can be deffered from this  */

            let rest                = (direction == '>') ? (movesAbs - (gears - orginalposition)) : (movesAbs - (orginalposition - 1)),      
                yearsChange         = Math.ceil(rest/gears),
                yearDirection       = (direction == '>') ? 1 : -1,
                mod                 = rest % gears,
                patternKey:number[] = [],
                patternFn:Object    = {
                    '>':function (i:number) {
                        if (i == gears-1) patternKey.push(0); else patternKey.push(i+1);
                    },
                    '<':function (i:number) {
                        if (i == 0) patternKey.push(0); else patternKey.push(gears - i);
                    }
                }       
                
            for (let i = 0;i < gears;i++) patternFn[direction](i)

            newGearPosition      = patternKey.indexOf(mod) + 1
            spins                =  Math.ceil(yearDirection * yearsChange)

        } 
        
        return {
            newGearPosition:newGearPosition,
            spins:spins
        }


    }


}