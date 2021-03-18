import NetInfo from "@react-native-community/netinfo";
import {useReactModal} from '../context/ModalContext'

export function infoNet(ifTrue,reactModal,ignore,onErrorFunc) {

  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      ifTrue()
    } else {
      if(reactModal && !ignore) reactModal.alert({text:'Você não está conectado à internet. Por favor, tente novamente mais tarde.',title:'Erro de Conexão',warn:true,confirmButton:'Continuar'})
      if (onErrorFunc) {
        console.log('object1');
        onErrorFunc()
      }
    }
  });
}
