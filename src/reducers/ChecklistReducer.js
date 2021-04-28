const initialState = {}


export default (state = initialState, action) => {



    switch(action.type) {
        
        case 'CREATE_CHECKLIST':
            console.log('action.payload',action.payload)
        return {...action.payload};

        case 'CHECKLIST_CHILD':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var childId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.childId)
            //if (!list.data[groupId].questions[itemId]?.obs || (list.data[groupId].questions[itemId]?.obs && list.data[groupId].questions[itemId].obs!== action.payload.value)) {
            list.data[groupId].questions[itemId].hide = true
            //list.data[groupId].questions[itemId].selected = action.payload.peek
            list.data[groupId].questions[childId].hide = false
            //}
        return {...list};

        case 'CHECKLIST_BACK':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var parentId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.parentId)
            list.data[groupId].questions[itemId].hide = true
            list.data[groupId].questions[itemId].selected = 'none'
            list.data[groupId].questions[parentId].hide = false
            list.data[groupId].questions[parentId].selected = 'none'
        return {...list};

        case 'LOGOUT_CHECKLIST':
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
