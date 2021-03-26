const initialState = {position:{itemId:'',groupId:'',peek:''},risks:[]}


export default (state = initialState, action) => {



    switch(action.type) {
        case 'ADD_RISK_ANSWER':
            var actualState = {...state}
            actualState.data = [...actualState.data,...action.payload]
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
