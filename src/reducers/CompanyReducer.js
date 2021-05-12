const initialState = {}


export default (state = initialState, action) => {



    switch(action.type) {
        
        case 'CREATE_COMPANY':
        return {...action.payload};

        case 'CREATE_WORKPLACE':
            var company = {...state}
            company.selectedWorkplace =  {...action.payload}
        return {...company};

        case 'LOGOUT_COMPANY':
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
