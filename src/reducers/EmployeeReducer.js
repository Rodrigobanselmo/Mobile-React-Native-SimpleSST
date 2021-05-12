const initialState = []//{groupId,questionId,selected,obs,later}
// const initialState = {all:[],chosen:{}}//{groupId,questionId,selected,obs,later}


export default (state = initialState, action) => {



    switch(action.type) {
        case 'CREATE_EMPLOYEE':
            // var data = {...initialState}
            // data.all = [...action.payload]
        return [...action.payload];

        // case 'ADD_EMPLOYEE_CARGO':
        //     var data = {...state}
        //     data.chosen[action.payload.id] = {...action.payload}
        // return {...data};

        // case 'REMOVE_EMPLOYEE_CARGO':
        //     var data = {...state}
        //     delete  data.chosen[action.payload]
        // return {...data};
        
        case 'LOGOUT_EMPLOYEE':
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
