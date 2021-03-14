import {wordUpper} from '../../../helpers/StringHandle' 
import {AddUserData} from '../../../services/firestoreUser'

export function onChange({data,uid,reactModal,dispatch}) {

    reactModal.loader()
    AddUserData({data},uid,checkSuccess,checkError)

    function checkSuccess() {
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
