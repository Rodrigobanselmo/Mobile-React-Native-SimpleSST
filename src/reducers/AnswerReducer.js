const initialState = []//{groupId,questionId,selected,obs,later}


export default (state = initialState, action) => {



    switch(action.type) {
        
        case 'CREATE_ANSWER':
        return [...action.payload];

        case 'ANSWER':
            var newAnswer = {groupId:action.payload.groupId,questionId:action.payload.itemId,selected:action.payload.peek}
            var list = [...state]

            var indexAnswer = list.findIndex(i=>i.groupId == action.payload.groupId&&i.questionId == action.payload.itemId)
            if (indexAnswer != -1) {
                if (list[indexAnswer]?.selected == action.payload.peek) { //selecionar reposta ja selecionada
                    //list.splice(indexAnswer, 1);
                    if (list[indexAnswer].selected) delete list[indexAnswer]['selected']
                } else { //selecionar outra resposta
                    list[indexAnswer] = {...list[indexAnswer],...newAnswer}
                }
            } else { //nenhum selecionada
                list.push({...newAnswer})
            }
        return [...list];

        case 'ANSWER_MULT':
            var newAnswer = {groupId:action.payload.groupId,questionId:action.payload.itemId,selected:[action.payload.peek]}
            var list = [...state]

            var indexAnswer = list.findIndex(i=>i.groupId == action.payload.groupId&&i.questionId == action.payload.itemId)
            if (indexAnswer != -1) {
                if (list[indexAnswer]?.selected && list[indexAnswer].selected.includes(action.payload.peek)) { //selecionar reposta ja selecionada
                    list[indexAnswer].selected = [...list[indexAnswer].selected.filter(i=>i != action.payload.peek)]
                    if (list[indexAnswer].selected.length == 0) delete list[indexAnswer]['selected']
                } else if (list[indexAnswer]?.selected) { //selecionar outra respostax
                    list[indexAnswer].selected = [...list[indexAnswer].selected,action.payload.peek]
                } else {
                    list[indexAnswer].selected = [action.payload.peek]
                }
            } else { //nenhum selecionada
                list.push({...newAnswer})
            }
        return [...list];

        case 'ANSWER_REMOVE':
            var list = [...state]
            list = [...list.filter(i=>!action.payload.includes(i.questionId))]
        return [...list];

        case 'ANSWER_LATER':
            var newAnswer = {groupId:action.payload.groupId,questionId:action.payload.itemId,later:true}
            var list = [...state]

            var indexAnswer = list.findIndex(i=>i.groupId == action.payload.groupId&&i.questionId == action.payload.itemId)
            if (indexAnswer != -1) {
                if (list[indexAnswer]?.later) { 
                    if (list[indexAnswer].later) delete list[indexAnswer]['later']
                } else { 
                    list[indexAnswer].later = true
                }
            } else { 
                list.push({...newAnswer})
            }
        return [...list];

        case 'ANSWER_CLEAN_PARENT':
            var parentId = action.payload.parentId
            var childId = action.payload.itemId
            var groupId = action.payload.groupId
            var list = [...state]

            var indexAnswer = list.findIndex(i=>i.groupId == groupId && i.questionId == parentId)
            if (indexAnswer != -1) {
                if (list[indexAnswer].selected) delete list[indexAnswer]['selected']
                    //list.splice(indexAnswer, 1);
            } 

            var indexChildAnswer = list.findIndex(i=>i.groupId == groupId && i.questionId == childId)
            if (indexChildAnswer != -1) {
                    if (list[indexChildAnswer].selected) delete list[indexChildAnswer]['selected']
                    //list.splice(indexChildAnswer, 1);
            } 
        return [...list];

        case 'LOGOUT_ANSWER':
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
