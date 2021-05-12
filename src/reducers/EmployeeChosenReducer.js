const initialState = {selected:[],chosen:{}}//{groupId,questionId,selected,obs,later}


export default (state = initialState, action) => {



    switch(action.type) {
        case 'CREATE_EMPLOYEE_CHOSEN':
        return {...action.payload};

        case 'ADD_EMPLOYEE_CARGO':
            var data = {...state}
            data.chosen[action.payload.id] = {...action.payload,lastUpdate:new Date()-1}
        return {...data};

        case 'ADD_EMPLOYEE_CARGO_UPDATE':
            var data = {...state}
            action.payload.map(i=>{
                data.chosen[i] = {...data.chosen[i],lastUpdate:new Date()-1}
            })
        return {...data};

        case 'REMOVE_EMPLOYEE_CARGO':
            var data = {...state}
            delete  data.chosen[action.payload]
        return {...data};

        case 'REMOVE_EMPLOYEE_ALL':
            var data = {...state}
            data.chosen = {}
        return {...data};

        case 'SELECT_EMPLOYEE_CARGO':
            var data = {...state}
            data.selected = [...data.selected,action.payload]
        return {...data};

        case 'UNSELECT_EMPLOYEE_CARGO':
            var data = {...state}
            data.selected = [...data.selected.filter(i=>i!=action.payload)]
            return {...data};
        
        case 'LOGOUT_EMPLOYEE_CHOSEN':
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
