interface IFormatter <T> {
    (data: T): boolean;
};


export class checkIf <T> {

    private a:T[];
    private all:boolean = false;

    allIn(array:T[]) {

        this.a = array
        this.all = true
        return this

    }

    someIn(array:T[]) {

        this.a = array
        this.all = false
        return this

    }

    areComplientTo(fn:IFormatter<T>) {

        if (!this.a) return false

        if (this.all) {
            return this.a.reduce((p,v) => {
                return fn(v) ? p : false
            },true)
        } else {
            return this.a.reduce((p,v) => {
                return fn(v) ? true : p
            },false)
        }
    }
}

export class arrayOps<T> {

    constructor (private array:T[]) {}

    allValuesArePresentIn(larger:T[]) {

        return new checkIf<T>()
            .allIn(this.array)
            .areComplientTo((s) => {
                return new checkIf<T>()
                    .someIn(larger)
                    .areComplientTo((v) => {
                        return this.flatObjectComparision(s,v)
                    })
            })
    }

    testAll(larger:T[]) {

        let a = new checkIf<T>()
            .allIn(this.array)
            .areComplientTo((s) => {
                return true
            })

       
    }

    private flatObjectComparision (obj1:Object,obj2:Object):boolean {

        for (let prop in obj1) {
            if (obj1.hasOwnProperty(prop)) {
                if (obj1[prop] !== obj2[prop]) return false
            } 
        }

        return true
    }

}



