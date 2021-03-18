const initialState = []


export default (state = initialState, action) => {



    switch(action.type) {

        case 'PHOTO_ADD':
            var photos = [...state]
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            if (list.data[groupId].questions[itemId]?.image) {
                let index = list.data[groupId].questions[itemId].image.findIndex((i)=>i?.path && i.path===action.payload.data.path)
                if (index === -1 ) {
                    list.data[groupId].questions[itemId].image = [...list.data[groupId].questions[itemId].image,action.payload.data]
                } else {
                    list.data[groupId].questions[itemId].image[index] = {...list.data[groupId].questions[itemId].image[index],...action.payload.data}
                }
            } else {
                list.data[groupId].questions[itemId].image = [action.payload.data]
            }
        return {...list};
        
        case 'ANSWER_PHOTO_UPDATED':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var imageId = list.data[groupId].questions[itemId].image.findIndex((i)=>i?.id && i.id===action.payload.imageId)

            list.data[groupId].questions[itemId].image[imageId].uploaded = true
            list.data[groupId].questions[itemId].image[imageId].isUploading = action.payload?.isUploading ? action.payload.isUploading : false
            list.data[groupId].questions[itemId].image[imageId].uploadedTry = true
            list.data[groupId].questions[itemId].image[imageId].percentage = 100
            
        return {...list};
        
        case 'ANSWER_PHOTO_UPDATED_TRY':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var imageId = list.data[groupId].questions[itemId].image.findIndex((i)=>i?.id && i.id===action.payload.imageId)

            list.data[groupId].questions[itemId].image[imageId].uploadedTry = action.payload?.uploadedTry ? action.payload.uploadedTry : true
            list.data[groupId].questions[itemId].image[imageId].isUploading = action.payload?.isUploading ? action.payload.isUploading : true
            
        return {...list};
        
        case 'ANSWER_PHOTO_UPDATED_PERCENTAGE':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var imageId = list.data[groupId].questions[itemId].image.findIndex((i)=>i?.id && i.id===action.payload.imageId)

            list.data[groupId].questions[itemId].image[imageId].percentage = action.payload.percentage
            list.data[groupId].questions[itemId].image[imageId].isUploading = action.payload.isUploading

            
        return {...list};

        case 'ANSWER_PHOTO_DELETED':
            var list = {...state}
            console.log(action.payload.imageId);
            list.data[action.payload.groupIndex].questions[action.payload.itemIndex].image = list.data[action.payload.groupIndex].questions[action.payload.itemIndex].image.filter( i=> i.id != action.payload.imageId);
            //console.log(list.data[action.payload.groupIndex].questions[action.payload.itemIndex].image);
        return {...list};

        case 'ANSWER_BACK':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var parentId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.parentId)
            list.data[groupId].questions[itemId].hide = true
            list.data[groupId].questions[itemId].selected = 'none'
            list.data[groupId].questions[parentId].hide = false
            list.data[groupId].questions[parentId].selected = 'none'
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
