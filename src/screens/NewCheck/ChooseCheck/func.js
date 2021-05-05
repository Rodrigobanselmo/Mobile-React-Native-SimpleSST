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
        const uid = Math.floor((1 + Math.random()) * 0x1000000000000000).toString(32).substring(1);
        reactModal.close()
        dispatch({type: 'CREATE_CHECKLIST',payload:{...response,checklistId:response.id,id:uid,type:'model',creation:new Date(),userId:user.uid,user:user.name}})
        navigation.navigate('ChooseCompany')
    }

    function checkError(error) {
        onClose()
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}
  