import {AddUserData} from '../../../services/firestoreUser'
import {wordUpper} from '../../../helpers/StringHandle' 
import { StackActions } from '@react-navigation/native';

export function onAddUserData({data,user,dispatch,reactModal,navigation}) {

    let formattedData = {}

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            if(key === 'givenName') {}
            else if(key === 'familyName') formattedData.name=wordUpper((data.givenName.trim() + ' ' + data.familyName.trim()).split(" "))
            else if(key === 'cpf') formattedData.info={...formattedData.info,CPF:data.cpf}
            else if (key !== 'focus') {
                let obj = {}
                obj[key] = data[key]
                formattedData.info={...formattedData.info,...obj}
            }
        }
    }

    reactModal.loader()
    AddUserData(formattedData,user.uid,checkSuccess,checkError)
    
    function checkSuccess() {
        dispatch({type: 'ADD_USER_DATA',payload:{...formattedData}})
        navigation.dispatch(StackActions.replace('EmailVerify',{send:'true'}));
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}