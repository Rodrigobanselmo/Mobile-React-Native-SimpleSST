import {GetAllCompanies,GetCompany,GetWorkplace} from '../../../services/firestoreChecklist'
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
        let name = item.identificacao
        if (!name) {
          name = item.fantasia
        }
        if (!name) {
          name = item.nome
        }
        dispatch({type:'CREATE_COMPANY',payload:response})
        dispatch({type:'COMPANY_CHECKLIST',payload:{cnpj:item.CNPJ,companyName:name}})
        dispatch({type:'REMOVE_EMPLOYEE_ALL'})
        reactModal.close()
        navigation.push('ChooseCompany',{workplace:true})
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}
  
export function onGetWorkplace({item,company,user,reactModal,navigation,dispatch}) {

    reactModal.loader()
    GetWorkplace(user.company.id,company.cnpj,item.id,checkSuccess,checkError)
    function checkSuccess(response) {
        dispatch({type:'CREATE_WORKPLACE',payload:response})
        dispatch({type:'WORKPLACE_CHECKLIST',payload:{workplaceId:item.id,workplaceName:item.name}})
        dispatch({type:'REMOVE_EMPLOYEE_ALL'})
        reactModal.close()
        navigation.push('ChooseCargo')
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}
  