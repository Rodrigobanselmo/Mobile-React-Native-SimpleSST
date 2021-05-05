const initialState = 'Checklist'


export default (state = initialState, action) => {



    switch(action.type) {

        case 'SET_HEADER':
            action.payload 
        return action.payload;
        
        case 'LOGOUT_HEADER':
        return initialState;

        default:
            return state;
    }
}


