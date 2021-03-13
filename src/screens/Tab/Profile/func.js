import {wordUpper} from '../../../helpers/StringHandle' 
import {AddUserData} from '../../../services/firestoreUser'
import {LogOut,ChangePassword} from '../../../services/firebaseAuth'
import { StackActions } from '@react-navigation/native';

export function onChangePassword({oldPass,newPass,reactModal,onClose}) {

    setTimeout(() => {
        reactModal.loader()
    }, 200);

    ChangePassword(oldPass,newPass,checkSuccess,checkError)
    
    function checkSuccess() {
        onClose()
        setTimeout(() => {
            reactModal.alert({title:'Senha Redefinida', text:'Sua senha foi redefinada com sucesso',warn:false})
        }, 500);
    }

    function checkError(error) {
        onClose()
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}

export function onChangeName({name,uid,reactModal,onClose,dispatch}) {

    setTimeout(() => {
        reactModal.loader()
    }, 200);
    

    AddUserData({name},uid,checkSuccess,checkError)

    function checkSuccess() {
        onClose()
        dispatch({type:'ADD_USER_DATA',payload:{name}})
        setTimeout(() => {
            reactModal.alert({title:'Sucesso', text:'Nome de usuário alterado com sucesso',warn:false})
        }, 500);
    }

    function checkError(error) {
        onClose()
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}
export function onChangeCPF({cpf,uid,reactModal,onClose,dispatch}) {

    setTimeout(() => {
        reactModal.loader()
    }, 200);
    

    AddUserData({"info.CPF":cpf},uid,checkSuccess,checkError)

    function checkSuccess() {
        onClose()
        dispatch({type:'ADD_USER_DATA',payload:{info:{CPF:cpf}}})
        setTimeout(() => {
            reactModal.alert({title:'Sucesso', text:'CPF de usuário alterado com sucesso',warn:false})
        }, 500);
    }

    function checkError(error) {
        onClose()
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}

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