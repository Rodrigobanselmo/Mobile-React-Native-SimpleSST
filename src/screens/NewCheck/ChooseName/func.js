import {CreateNewChecklist} from '../../../services/firestoreChecklist'
import { CommonActions} from '@react-navigation/native';
import {infoNet} from '../../../helpers/infoNet'

export function onSetNewChecklist({checklist,data,user,reactModal,dispatch,navigation}) {

    const newChecklist = {...checklist,name:data}

    reactModal.loader()
    CreateNewChecklist(newChecklist,user.company.id,checkSuccess,checkError)
    
    function checkSuccess() {
        dispatch({type: 'NAME_CHECKLIST',payload:data})
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Card'/* , params: {screen:subScreen} */ }
            ],
          })
        );
        reactModal.close()
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}
  