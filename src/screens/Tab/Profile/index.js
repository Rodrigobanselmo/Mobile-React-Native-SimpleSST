import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { } from '../../../services/firebaseAuth';
//import { } from '../../../services/firestoreUser';
import Profile from './comp';
import {onLogOut,onChangePassword,onChangeName,onChangeCPF} from './func';
import {useReactModal} from '../../../context/ModalContext'
//import useAuth from '../../../hooks/useAuthChange'

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
  
  //const [] = useAuth()
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  function onChangeType(types,_email) {

    var infos = {...type}
    if (types == 'change_pass') {
      infos = {
        tipo:'change_pass',
        title:'Trocar senha',
        subTitle:'Insira uma nova senha de cadastro',
        typeInput:['pass','pass','confirmePass'],
        placeholder:['Senha atual','Senha nova','Confirmar senha nova'],
        onFunc: (t1,t2,t3,valid,onClose)=>onChangePassword({oldPass:t1,newPass:t2,reactModal,onClose})
      }
    } else if (types == 'change_name') {
      infos = {
        tipo:'change_name',
        title:'Mudar Nome de usuário',
        subTitle:'Insira seu primeiro nome abaixo',
        typeInput:['name'],
        placeholder:['Primeiro nome'],
        preLoaded:[user?.name ??''],
        onFunc: (t1,t2,t3,valid,onClose)=>onChangeName({name:t1,uid:user.uid,reactModal,onClose,dispatch})
      }
    } else if (types == 'change_cpf') {
      infos = {
        tipo:'change_cpf',
        title:'Cadastro de CPF',
        subTitle:'Insira seu CPF nome abaixo',
        typeInput:['cpf'],
        placeholder:['CPF'],
        preLoaded:[user?.info?.CPF ?? ''],
        onFunc: (t1,t2,t3,valid,onClose)=>onChangeCPF({cpf:t1,uid:user.uid,reactModal,onClose,dispatch})
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
    else if (status === 'Sair') reactModal.alert({title:'Você tem certeza?',text:'Você realmente desaja sair de sua conta?',confirmButton:'Sair',onConfirm:()=>onLogOut({dispatch,reactModal,navigation}),option:true})
  }
  
  return (
    <Profile>
      <Profile.Body navigation={navigation} >
        <Profile.Data user={user} onSetModalVisible={onSetModalVisible}/>
      </Profile.Body>
      <Profile.InputModal type={type} onSetModalVisible={onSetModalVisible} modalVisible={modalVisible}/>
    </Profile>
  );
}

