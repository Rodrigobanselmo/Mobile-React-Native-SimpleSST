const initialState = {
    position:'',
    risks:{
        // 'riskId':{
        //     data:[{id:'',type:'rec',questionId:''}],
        //     creation:{questionId:'',slected:''},
        //     exp:'',
        //     prob:'',
        //     primary:'',
        //     suggest:[{id:'',type:'rec',questionId:''}]
        // },
    },
}


export default (state = initialState, action) => {



    switch(action.type) {
        case 'ADD_RISK_ANSWER':
            var actualState = {...state}

            actualState.position = {...actualState.position, itemId:action.payload.itemId,groupId:action.payload.groupId,peek:action.payload.peek}

            if (action.payload.peekData?.risk) {
                var dataRisk = []
                action.payload.peekData.risk.map(i=>{
                    dataRisk.push({id:i,choosen:false})
                })
                actualState.risks[`${action.payload.groupId}-${action.payload.itemId}`] = {
                    data:[...dataRisk],
                    peek:action.payload.peek
                }
            } else {
                actualState.risks[`${action.payload.groupId}-${action.payload.itemId}`] = {
                    data:[],
                    peek:action.payload.peek
                }
            }
           
            console.log(actualState);

        return {...actualState};

        case 'CHOOSE_RISK_ANSWER':
            var actualState = {...state}
            var actualStateRisk = actualState.risks[action.payload.item.risk] ? {...actualState.risks[action.payload.item.risk],...action.payload.data} : {created:{questionId:action.payload.answer.questionId,selected:action.payload.answer.selected},data:[],suggest:[],...action.payload.data};
            ['rec','med','font'].map((item)=>{
                if (action.payload.item[item]) {
                    action.payload.item[item].map(itemId=>{
                       if (actualStateRisk.data.findIndex(i=>i.id==itemId) == -1) actualStateRisk.data.push({
                           id:itemId,
                           type:item,
                           questionId:action.payload.answer.questionId,
                           selected:action.payload.answer.selected,
                        })
                    })
                }
            });
            ['recSug','medSug','fontSug'].map((item)=>{
                if (action.payload.item[item]) {
                    action.payload.item[item].map(itemId=>{
                       if (actualStateRisk.suggest.findIndex(i=>i.id==itemId) == -1) actualStateRisk.suggest.push({
                           id:itemId,
                           type:item,
                           questionId:action.payload.answer.questionId,
                           selected:action.payload.answer.selected,
                        })
                    })
                }
            });
            
            actualState.risks[action.payload.item.risk] = {...actualStateRisk}
        
            console.log('actualState.risks',actualState.risks);
            console.log('data',action.payload.data);
            console.log('action.payload.answer',action.payload.answer);

        return {...actualState};

        case 'REMOVE_RISK_ANSWER':
            var actualState = {...state}

            action.payload.risksId.map(riskId=>{
                if (actualState.risks[riskId]) {
                    var actualStateRisk = [...actualState.risks[riskId].data.filter(i=>i.questionId != action.payload.questionId)]
                    if (actualStateRisk.length == 0 && actualState.risks[riskId].created.questionId == action.payload.questionId) {
                        delete actualState.risks[riskId]
                    } else {
                        actualState.risks[riskId]=[...actualStateRisk]
                    }
                }
            })

            // console.log('action.payload',action.payload)
            // var riskId = action.payload.risk
            // var rec = action.payload.rec
            // var med = action.payload.med
            // var font = action.payload.font
            // var recSug = action.payload.recSug
            // var medSug = action.payload.medSug
            // var fontSug = action.payload.fontSug

            // var actualStateRisk = actualState.risks[action.payload.risk]

            // if (actualStateRisk) {

            // }

            // if (action.payload.rec) {
            //     action.payload.rec.map(recId=>{
            //        if (actualStateRisk.findIndex(i=>i.id==recId) == -1) actualStateRisk.push({id:recId,type:'rec'})
            //     })
            // }
            // actualState.risks[action.payload.risk] = [...actualStateRisk]
        
            // console.log(actualState.risks);

        return {...actualState};

        case 'ADD_RISK_ANSWER_POSITION':
            var actualState = {...state}
            actualState.position = {...action.payload}
        return {...actualState};

        case 'LOGOUT_RISK_ANSWER':
            return {...initialState};

        default:
        return state;
    }
}



/*             action.payload?.data && action.payload.data.map((group)=>{
                let GROUP = {id:item.id, response:[]}
                group?.questions && group.questions.map((question)=>{
                    GROUP.push({})
                })
            }) */
