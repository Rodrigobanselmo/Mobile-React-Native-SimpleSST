const initialState = []


export default (state = initialState, action) => {



    switch(action.type) {
        case 'CREATE_PHOTO':
        return [...action.payload];

        case 'PHOTO_ADD_EDIT':
            var photos = [...state]
            var imageId = action.payload.data?.imageId ? action.payload.data.imageId : -1
            console.log('imageId',action.payload.data.imageId);
            var index = photos.findIndex((i)=>i?.id && i.id===imageId)
            if (index == -1 ) {
                console.log('ndex',index);
                photos = [...photos,action.payload.data]
            } else {
                var dt = action.payload.data
                photos[index] = {...photos[index],title:dt.title,desc:dt.desc}
            }

        return [...photos];
        
        case 'PHOTO_UPDATED':
            var photos = [...state]
            var imageId = action.payload?.imageId ? action.payload.imageId : -1
            var index = photos.findIndex((i)=>i?.id && i.id===imageId)
            if (index == -1 ) {} 
            else {
                photos[index] = {...photos[index],...action.payload.data}
                photos[index].uploaded = true
                photos[index].isUploading = action.payload?.isUploading ? action.payload.isUploading : false
                photos[index].uploadedTry = true
                photos[index].percentage = 100
            }
            
        return [...photos];
        
        case 'PHOTO_UPDATED_TRY':

            var photos = [...state]
            var imageId = action.payload?.imageId ? action.payload.imageId : -1
            var index = photos.findIndex((i)=>i?.id && i.id===imageId)
            if (index == -1 ) {} 
            else {
                photos[index].uploadedTry = action.payload?.uploadedTry ? action.payload.uploadedTry : true 
                photos[index].isUploading = action.payload?.isUploading ? action.payload.isUploading : true
            }
            
        return [...photos];
        
        case 'PHOTO_UPDATED_PERCENTAGE':

             var photos = [...state]
             var imageId = action.payload?.imageId ? action.payload.imageId : -1
             var index = photos.findIndex((i)=>i?.id && i.id===imageId)
             if (index == -1 ) {} 
             else {
                photos[index].percentage = action.payload.percentage
                photos[index].isUploading = action.payload.isUploading
             }
             
        return [...photos];

        case 'PHOTO_TO_DELETE':

             var photos = [...state]
             var imageId = action.payload?.imageId ? action.payload.imageId : -1
             var index = photos.findIndex((i)=>i?.id && i.id===imageId)
             if (index == -1 ) {} 
             else {
                photos[index].delete = action.payload.delete
             }
             
        return [...photos];

        case 'PHOTO_DELETED':

            var photos = [...state]
            var imageId = action.payload?.imageId ? action.payload.imageId : -1
            photos = photos.filter( i=> i.id != imageId);
             
        return [...photos];

        case 'LOGOUT_PHOTO':
        return [];

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
