const initialState = 'Checklist'


export default (state = initialState, action) => {



    switch(action.type) {

        case 'SET_HEADER':
            action.payload 
        return action.payload;

        default:
            return state;
    }
}


