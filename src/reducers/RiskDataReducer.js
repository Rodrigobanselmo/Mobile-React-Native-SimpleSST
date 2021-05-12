const initialState = []


export default (state = initialState, action) => {



    switch(action.type) {
        case 'CREATE_RISKS_DATA':
            var risksAll = {};
            action.payload.map((item)=>{
                risksAll[item.id] = item
            })
        return {...risksAll};

        case 'CREATE_PER_DATA':
        return {...action.payload};

        case 'LOGOUT_RISK_DATA':
        return [];

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
