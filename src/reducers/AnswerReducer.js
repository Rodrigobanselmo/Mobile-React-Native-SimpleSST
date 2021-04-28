const initialState = []


export default (state = initialState, action) => {



    switch(action.type) {
        
        case 'CREATE_ANSWER':
        return [...action.payload];

        case 'ANSWER':
            const newAnswer = {groupId:action.payload.groupId,questionId:action.payload.itemId,selected:action.payload.peek}
            var list = [...state]

            const indexAnswer = list.findIndex(i=>i.groupId == action.payload.groupId&&i.questionId == action.payload.itemId)
            if (indexAnswer != -1) {
                if (list[indexAnswer]?.selected == action.payload.peek) { //selecionar reposta ja selecionada
                    list.splice(indexAnswer, 1);
                } else { //selecionar outra resposta
                    list[indexAnswer] = {...newAnswer}
                }
            } else { //nenhum selecionada
                list.push({...newAnswer})
            }
        return [...list];

        // case 'ANSWER':
        //     var list = {...state}
        //     console.log('state',state)
        //     var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
        //     var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
        //     if (list.data[groupId].questions[itemId].selected === action.payload.peek) {
        //         // list.data[groupId].questions[itemId].selected = '' // (desmarca)
        //     } else {
        //         list.data[groupId].questions[itemId].selected = action.payload.peek
        //     }
        // return {...list};

        case 'ANSWER_OBS':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            console.log('itemId',itemId)
            console.log('groupId',groupId)
            //if (!list.data[groupId].questions[itemId]?.obs || (list.data[groupId].questions[itemId]?.obs && list.data[groupId].questions[itemId].obs!== action.payload.value)) {
            list.data[groupId].questions[itemId].obs = action.payload.value.trim()
            //}
        return {...list};

        case 'ANSWER_CONFIRM':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            
            if (list.data[groupId].questions[itemId].confirmed ==='confirmed') {
                list.data[groupId].questions[itemId].confirmed = 'none'
            } else {
                list.data[groupId].questions[itemId].confirmed = 'confirmed'
            }
            
        return {...list};

        case 'ANSWER_RISK':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var childId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.childId)
            //if (!list.data[groupId].questions[itemId]?.obs || (list.data[groupId].questions[itemId]?.obs && list.data[groupId].questions[itemId].obs!== action.payload.value)) {
            list.data[groupId].questions[itemId].hide = true
            list.data[groupId].questions[itemId].selected = action.payload.peek
            list.data[groupId].questions[childId].hide = false
            //}
        return {...list};

        case 'LOGOUT_ANSWER':
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
