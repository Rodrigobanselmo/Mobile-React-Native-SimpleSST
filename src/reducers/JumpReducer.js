const initialState = []//{groupId,questionId}


export default (state = initialState, action) => {



    switch(action.type) {
        
        case 'JUMP':
        return [...state];

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
