import {wordUpper} from '../../../helpers/StringHandle' 
import {AddUserData} from '../../../services/firestoreUser'
import {LogOut} from '../../../services/firebaseAuth'
import { StackActions } from '@react-navigation/native';

export function onLogOut({dispatch,reactModal,navigation}) {

    setTimeout(() => {
        reactModal.loader()
    }, 200);

    LogOut(checkSuccess,checkError)
    
    function checkSuccess() {
        setTimeout(() => {
            reactModal.close()
            navigation.dispatch(StackActions.replace('SignStack',{send:'true'}));
        }, 2000);
        dispatch({type: 'LOGOUT_USER',}); 
        dispatch({type: 'LOGOUT_ANSWER',}); 
        dispatch({type: 'LOGOUT_MODEL',});
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}