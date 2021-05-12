import {GetAllChecklistData,GetChecklistData} from '../../../services/firestoreChecklist'
import { CommonActions} from '@react-navigation/native';
import {infoNet} from '../../../helpers/infoNet'

export function onGetAllChecklistData({user,reactModal,navigation,dispatch}) {

    reactModal.loader()
    GetAllChecklistData(user.company.id,checkSuccess,checkError) 
    function checkSuccess(response) {
      dispatch({type: 'CREATE_ALL_MODELS', payload:[...response]})
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [
      //       { name: 'TabStack'/* , params: {screen:subScreen} */ }
      //     ],
      //   })
      // );
      reactModal.close()
      //setTimeout(() => {reactModal.animated({text:'Checklist salvo com sucesso!'})}, 1000);
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}

export function onGetChecklistData({item,user,reactModal,navigation,dispatch}) {

    reactModal.loader()
    GetChecklistData(item.id,user.company.id,checkSuccess,checkError) 
    function checkSuccess(response) {
        console.log(response)
        dispatch({type: 'CREATE_ANSWER', payload:[...response.data.answer]})
        dispatch({type: 'CREATE_CHECKLIST', payload:{...response.checklist}})
        dispatch({type: 'CREATE_COMPANY', payload:{...response.data.company}})
        dispatch({type: 'SET_HEADER', payload:response.data.header})
        dispatch({type: 'CREATE_MODEL', payload:[...response.data.model]})
        dispatch({type: 'CREATE_OBS', payload:[...response.data.obs]})
        dispatch({type: 'CREATE_PHOTO', payload:[...response.data.photo]})
        dispatch({type: 'CREATE_RISK_ANSWER', payload:{...response.data.riskAnswer}})
        dispatch({type: 'CREATE_RISK_ANSWER_POSITION', payload:{...response.data.riskPosition}})
        if (response.data?.employeeChosen) dispatch({type: 'CREATE_EMPLOYEE_CHOSEN', payload:{...response.data.employeeChosen}})
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Card'/* , params: {screen:subScreen} */ }
            ],
          })
        );
        reactModal.close()
        //setTimeout(() => {reactModal.animated({text:'Checklist salvo com sucesso!'})}, 1000);
    }
    
    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}