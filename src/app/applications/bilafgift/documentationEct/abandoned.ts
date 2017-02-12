        dynamicFn:[ /* properly unnessasary */
            (model) => {
    
                let periodObj = (model.find(el => el.prop == 'period')),
                    vehicle = model.find(el => el.prop == 'vehicle'),
                    period:number

                if (periodObj && (vehicle && vehicle.val == 'van')) {
                    
                    period = Number(periodObj.val); 

                    if (period >= 1 && period <= 5) {

                        return true 

                    } else if (period == 7) {

                        return false

                    } else if (period == 6) {

                        let subPeriod = model.find(el => el.prop == 'subPeriod')
                        return (subPeriod && Number(subPeriod.val)) ? true : false
                    }    

                } else {

                    return false 
                }
            }
        ]


            parameters():Observable<parameter[]> {

        return Observable.create((observer:any) => {

            let allObservables:Observable<languageText>[] = []  

            let newModel = new modelEngine(this.model).newModelBuild().map(el => {
                return this.genericDataFecter('parametersSelects',el.prop)
                    .map(obj => {return (obj && obj.id) ? obj.da : ''})   
            })
                
            let merged:Observable<languageText> = Observable.merge.apply(Observable.merge,newModel)

            
            merged.subscribe(
            el => {
                observer.next(el)                
            },
            e => {},
            () => {
                observer.complete(null)
            })

        })
    }


        needsEither:
            /* AND && needsEither[0]  */
            [
                /* OR || one of ... needsEither[0][0] */
                [ 
                    /* needsEither[0][0][0] some in */
                    [ 
                        /* needsEither[0][0][0] allNeeds */
                        [   
                            /* [0][0][0][0] */
                            {prop:'fuel',val:'benzin'}
                        ],
                         /* needsEither[0][0][1] allNeeds */
                        [
                            /* [0][0][1][0] */
                            {prop:'fuel',val:'hybrid'}
                        ],
                        [
                            /* [0][0][2][0] */
                            {prop:'fuel',val:'diesel'}
                        ]                        
                    ],
                    /* needsEither[0][0][1] some in */
                    [

                    ]
                ],
                /* AND && */   
                [     
                    vehiclegroups.find(el => el.id == 'normalGroup').vehicles /* is either car,van or taxa  */                          
                ]
            ],