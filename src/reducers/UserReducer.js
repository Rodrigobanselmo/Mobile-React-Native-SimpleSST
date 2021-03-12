import { ThemeProvider } from "@react-navigation/native"

const initialState = {
        name:null,
        givenName:null,
        familyName:null,
        providerId:null,
        email:null,
        emailVerified:null,
        photoURL:null,
        userId:null,
        theme:'light'
}

export default (state = initialState, action) => {



    switch(action.type) {

        case 'CHANGE_THEME':
            var theme = ''
            if (state.theme == 'light') {
                theme = 'dark'
            } else if (
                theme = 'light'
            )
            console.log(theme)
        return {...state,theme};

        case 'LOGOUT_USER':
        return {...initialState};

        case 'LOGIN_USER':
            var _user =  {};
            _user = {...action.payload}
        return {..._user};

        case 'ADD_USER_DATA':
        return {...state , ...action.payload };

        default:
            return state;
    }
    
}


