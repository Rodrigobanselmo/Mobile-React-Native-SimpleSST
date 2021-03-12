const initialState = 'light'


export default (state = initialState, action) => {



    switch(action.type) {

        case 'changeTheme':
            var theme = ''
            if (state == 'light') {
                theme = 'dark'
            } else if (
                theme = 'light'
            )

        return theme;

        default:
            return state;
    }
}


