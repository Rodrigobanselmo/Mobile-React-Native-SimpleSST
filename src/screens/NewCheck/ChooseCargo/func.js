import {GetAllCompanies} from '../../../services/firestoreChecklist'
import {infoNet} from '../../../helpers/infoNet'

export function onGetAllCompanies({setData,user,reactModal,navigation}) {

    reactModal.loader()
    GetAllCompanies(user.company.id,checkSuccess,checkError)
    
    function checkSuccess(response) {
        reactModal.close()
        setData([...response])
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}

export function onGetCompany({item,user,reactModal,navigation,dispatch}) {

    reactModal.loader()
    GetCompany(user.company.id,item.CNPJ,checkSuccess,checkError)
    
    function checkSuccess(response) {
        dispatch({type:'CREATE_COMPANY',payload:response})
        reactModal.close()
        navigation.navigate('ChooseCompany')
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}
  