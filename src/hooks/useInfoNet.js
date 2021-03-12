
import NetInfo from "@react-native-community/netinfo";
import {useReactModal} from '../context/ModalContext'

function useInfoNet() {
    
    const reactModal = useReactModal();
    
    function internetOn(ifTrue) {
        NetInfo.fetch().then(state => {
        if (state.isConnected) {
            ifTrue
        } else if(reactModal) {
            reactModal.alert({text:'Você não está conectado à internet. Por favor, tente novamente mais tarde.',title:'Erro de Conexão'})
        }
        });
    }

    return [internetOn]
}

export default useInfoNet


