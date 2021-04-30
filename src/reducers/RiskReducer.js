const initialState = {}


export default (state = initialState, action) => {



    switch(action.type) {
        // case 'CREATE_RISKS':
        // return [...action.payload];
        case 'CREATE_RISKS':
            var risksAll = {};
            action.payload.map((item)=>{
                risksAll[item.id] = item
            })
        return {...risksAll};

/*         case 'GET_RISK':
            var risksArray = [...state]
            var risk = risksArray.findIndex((i)=>i?.id && i.id===action.payload.riskId)
        return [...risksArray]; */

        /* case 'ANSWER_RISK':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var childId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.childId)
            //if (!list.data[groupId].questions[itemId]?.obs || (list.data[groupId].questions[itemId]?.obs && list.data[groupId].questions[itemId].obs!== action.payload.value)) {
            list.data[groupId].questions[itemId].hide = true
            list.data[groupId].questions[itemId].selected = action.payload.peek
            list.data[groupId].questions[childId].hide = false
            //}
        return {...list}; */


        case 'LOGOUT_RISK':
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
