const initialState = []//{groupId,questionId,selected,obs,later}


export default (state = initialState, action) => {



    switch(action.type) {
  
        case 'ANSWER_OBS':
            var newAnswer = {groupId:action.payload.groupId,questionId:action.payload.itemId,obs:action.payload.value.trim()}
            var list = [...state]

            var indexAnswer = list.findIndex(i=>i.groupId == action.payload.groupId&&i.questionId == action.payload.itemId)
            if (indexAnswer != -1) {
                list[indexAnswer].obs = action.payload.value.trim()
            } else { 
                list.push({...newAnswer})
            }
        return [...list];


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
