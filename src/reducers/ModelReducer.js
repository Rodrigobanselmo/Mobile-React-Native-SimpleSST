const initialState = []


export default (state = initialState, action) => {



    switch(action.type) {
        case 'CREATE_MODEL':
        return [...action.payload];
        case 'LOGOUT_MODEL':
        return [...initialState];

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
