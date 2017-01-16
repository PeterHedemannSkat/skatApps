let gavePct = [
    {
        ids:['boernAfkom','foraeldre','bofaelle','svigerboernIlive','svigerboernAfdød'],
        gavePct:15,
    },
    {
        ids:['bedsteforaeldre','stedforaeldre'],
        gavePct:36.25
    }

]


let gaveFradragLevel = [

    {
        ids:['boernAfkom','foraeldre','bofaelle','bedsteforaeldre','svigerboernAfdød','stedforaeldre'],
        fradragType:'naertbeslaegtede'
    },
    {
        ids:['svigerboernIlive'],
        fradragType:'svigerboern'
    }

]

export {gavePct,gaveFradragLevel}