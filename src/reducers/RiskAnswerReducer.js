const initialState = {
    position:{
            itemId:'',
            groupId:'',
            peek:''
        },
    risks:{
        'itemId-groupId':{
            data:[],
            peek:'',
        },
    }}


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
            
            var dataRisk = actualState.risks[action.payload.itemId].data
            var riskId = dataRisk.findIndex((i)=>i?.id && i.id===action.payload.riskId)
            dataRisk[riskId].choosen = true

            actualState.risks[action.payload.itemId].data = [...dataRisk]
        
            console.log(actualState);

        return {...actualState};

        case 'ADD_RISK_ANSWER_POSITION':
            var actualState = {...state}
            actualState.position = {...actualState.position,...action.payload}
        return {...actualState};

        case 'REMOVE_RISK_ANSWER':
            var risk = [...state].filter((i)=>i?.id && i.id!==action.payload.riskId)
        return [...risk];

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
