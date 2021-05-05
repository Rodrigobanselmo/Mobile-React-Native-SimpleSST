import {GetAllChecklistData} from '../../../services/firestoreChecklist'
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