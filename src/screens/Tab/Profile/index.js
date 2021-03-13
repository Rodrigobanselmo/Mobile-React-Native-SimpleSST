import React, {useState} from 'react';
import { useSelector } from 'react-redux';
//import { } from '../../../services/firebaseAuth';
//import { } from '../../../services/firestoreUser';
import Profile from './comp';
import {useReactModal} from '../../../context/ModalContext'

const ininialStateType = {
  tipo:'ok',
  title:'Vazio',
  subTitle:'Feche e tente novamente.',
  typeInput:[],
  placeholder:[],
}

export default function App({navigation}) {

  const [type, setType] = useState({...ininialStateType});
  const [modalVisible, setModalVisible] = useState(false);
  
  const reactModal = useReactModal();

  function onChangeType(types,_email) {

    var infos = {...type}
    if (types == 'change_pass') {
      infos = {
        tipo:'change_pass',
        title:'Trocar senha',
        subTitle:'Insira uma nova senha de cadastro',
        typeInput:['pass','pass','confirmePass'],
        placeholder:['Senha atual','Senha nova','Confirmar senha nova'],
        //onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>EmailSignAfter(t1,t2,valid[0],valid[1],valid[2],onAnimationModal,onModalVisible,onClose)
      }
    } else if (types == 'change_name') {
      infos = {
        tipo:'change_name',
        title:'Mudar Nome de usuário',
        subTitle:'Insira seu primeiro nome abaixo',
        typeInput:['name'],
        placeholder:['Primeiro nome'],
        preLoaded:[user?.name ??''],
        //onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>{ChangeUserData({uid:user.userId,changeData:{givenName:t1.trim()},action:'name'},onModalVisible,onClose,dispatchUserDataChange,onSetModalVisible)}
      }
    } else if (types == 'change_cpf') {
      infos = {
        tipo:'change_cpf',
        title:'Cadastro de CPF',
        subTitle:'Insira seu CPF nome abaixo',
        typeInput:['cpf'],
        placeholder:['CPF'],
        preLoaded:[user?.info?.CPF ?? ''],
        //onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>{ChangeUserData({uid:user.userId,changeData:{givenName:t1.trim()},action:'name'},onModalVisible,onClose,dispatchUserDataChange,onSetModalVisible)}
      }
    }

    setType(infos)
  }

  function onSetModalVisible(status) {
    if (status === false) setModalVisible(false)
    else if (status === true) setModalVisible(true)
    else if (status === 'change_pass') {setModalVisible(true); onChangeType(status)}
    else if (status === 'change_name') {setModalVisible(true); onChangeType(status)}
    else if (status === 'change_cpf') {setModalVisible(true); onChangeType(status)}
    else if (status === 'email') reactModal.animated({text:'Endereço de e-mail não pode ser alterado.',type:'Warn'})
    else if (status === 'Tipo de Conta') reactModal.animated({text:'Somente seu adminitrador pode alterar este campo.',type:'Warn'})
    else if (status === 'Administrador') reactModal.animated({text:'Atual adminitrador de sua conta.',type:'Check'})
    else if (status === 'Status') reactModal.animated({text:'A sua conta encontra-se ativa!',type:'Check'})
    else if (status === 'Sair') reactModal.alert({title:'Você tem certeza?',text:'Você realmente desaja sair de sua conta?',confirmButton:'Sair',onConfirm:()=>{},option:true})
  }
  

  const user = useSelector(state => state.user);

  return (
    <Profile>
      <Profile.Body navigation={navigation} >
        <Profile.Data user={user} onSetModalVisible={onSetModalVisible}/>
      </Profile.Body>
      <Profile.InputModal type={type} onSetModalVisible={onSetModalVisible} modalVisible={modalVisible}/>
    </Profile>
  );
}

