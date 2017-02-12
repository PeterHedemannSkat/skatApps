import { valuePairs } from '../infrastructure/interfaces.bilafgifter'

export class checkModelProperties {

    constructor (private model:valuePairs[]) {}

    isEjerAfgift() {

        /* assuming it is car/taxa - if it returns false we are not sure whether it is udlignings-table */

        let period      = this.val('period'),
            subPeriod   = this.val('subPeriod'),
            vehicle     = this.val('vehicle')

        return (vehicle == 'car' || vehicle == 'taxa')
                ? /* car and taxa */
                    period == '1' || (period == '2' && subPeriod == '1')   
                : /* van */  
                    vehicle == 'van' && 
                        ((Number(period) >= 1 && Number(period) <= 5) || (period == '6' && subPeriod == '1'))  

    }

    isModernPrivatAnvendelseRules() {

        let period      = this.val('period'),
            subPeriod   = this.val('subPeriod'),
            vehicle     = this.val('vehicle')

        return (vehicle == 'van') 
            ?
                (Number(period) >= 1 && Number(period) <= 3) || /* 2008 og frem */
                (period == '4' && subPeriod == '2') /* 25. april - 31. dec. 2007 */
            :
                false

    }

    isOldPrivatAnvendelseRules() {

        let period      = this.val('period'),
            subPeriod   = this.val('subPeriod'),
            vehicle     = this.val('vehicle')

        return (vehicle == 'van') 
            ?
                (period == '5') || /* 1999 - 2006 */
                (period == '4' && subPeriod == '1') || /* 1. jan - 24. april 2007 */
                (period == '6' && subPeriod == '2')  /* 3. juni - 31. dec 1998 */
            :
                false

    }

    isAllPrivatAnvendelse() {

        return this.isOldPrivatAnvendelseRules() || this.isModernPrivatAnvendelseRules()
  
    }

    val(id:string) {

        let obj_ = this.model.find(el => el.prop == id)

        return obj_ ? obj_.val : undefined
    }

}