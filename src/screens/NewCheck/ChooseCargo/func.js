import {GetAllEmployee} from '../../../services/firestoreChecklist'
import {infoNet} from '../../../helpers/infoNet'

export function onGetAllEmployee({company,user,reactModal,navigation,dispatch}) {

    console.log('company',company.selectedWorkplace)
    reactModal.loader()
    GetAllEmployee(user.company.id,company.selectedWorkplace.id,company.selectedWorkplace.cnpj,checkSuccess,checkError)
    
    function checkSuccess(response) {
        reactModal.close()
        dispatch({type:'CREATE_EMPLOYEE',payload:response})
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}

// export function onGetCompany({item,user,reactModal,navigation,dispatch}) {

//     reactModal.loader()
//     GetCompany(user.company.id,item.CNPJ,checkSuccess,checkError)
    
//     function checkSuccess(response) {
//         dispatch({type:'CREATE_COMPANY',payload:response})
//         reactModal.close()
//         navigation.navigate('ChooseCompany')
//     }

//     function checkError(error) {
//         setTimeout(() => {
//             reactModal.alert({text:error,title:"Alerta de Erro"})
//         }, 500);
//     }

// }
  