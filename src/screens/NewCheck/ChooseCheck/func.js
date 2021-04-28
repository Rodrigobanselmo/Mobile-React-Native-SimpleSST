import {GetAllChecklist,GetChecklist} from '../../../services/firestoreChecklist'
import {infoNet} from '../../../helpers/infoNet'

export function onGetAllChecklist({setData,user,reactModal,navigation}) {

    reactModal.loader()
    GetAllChecklist(user.company.id,checkSuccess,checkError)
    
    function checkSuccess(response) {
        reactModal.close()
        setData([...response])
    }

    function checkError(error) {
        onClose()
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}

export function onGetChecklist({itemId,user,reactModal,dispatch,navigation}) {

    reactModal.loader()
    GetChecklist(user.company.id,itemId,checkSuccess,checkError)
    
    function checkSuccess(response) {
        reactModal.close()
        dispatch({type: 'CREATE_CHECKLIST',payload:{...response}})
        navigation.navigate('ChooseCompany')
    }

    function checkError(error) {
        onClose()
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}
  