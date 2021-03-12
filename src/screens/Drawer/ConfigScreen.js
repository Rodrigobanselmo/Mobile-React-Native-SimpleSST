/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View,TouchableOpacity, Dimensions, Image} from 'react-native';
import {Header} from '../../components/basicComponents/BasicComponents';
import { useSelector } from 'react-redux';
import {infoNet,updateUserEmail,ChangeUserData,EmailSignAfter,GoogleSignAfter} from '../../services/FirebaseAuthOld';
import ReactInputModal from '../../components/modalComponents/ReactInputModal';
import {Colocar3dots,AbreviarSobrenome} from'../../services/StringHandle';
import useReactModal from '../../components/modalComponents/ModalAlert';
import useDispatchActions from'../../hooks/useDispatchActions';

const ininialStateType = {
  tipo:'',
  title:'',
  subTitle:'',
  typeInput:[],
  placeholder:[]
}

export default function App({navigation}) {

  const [email, setEmail] = useState('');
  const [googleCredential, setGoogleCredential] = useState({});
  const [type, setType] = useState({...ininialStateType});
  const [modalVisible, setModalVisible] = useState(false);
  const [callBack, setCallBack] = useState(0);

  const [MainModal,onModalVisible] = React.useCallback(useReactModal(setCallBack),[callBack]);
  const [dispatchUserGoogle,__,___,dispatchUserDataChange,______] = useDispatchActions(onModalVisible)

  const user = useSelector(state => state.user);

  function onChangeType(types,_email,_credential) {

    var infos = {...type}
    if (types == 'add_pass') {
      infos = {
        tipo:'add_pass',
        title:'Cadastrar senha',
        subTitle:'Insira uma senha de cadastro',
        typeInput:['pass','confirmePass'],
        placeholder:['Sua Senha','Confirme sua senha'],
        onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>EmailSignAfter(t1,null,valid[0],valid[1],null,onAnimationModal,onModalVisible,onClose,dispatchUserDataChange)
      }
    } else if (types == 'change_pass') {
      infos = {
        tipo:'change_pass',
        title:'Trocar senha',
        subTitle:'Insira uma nova senha de cadastro',
        typeInput:['pass','pass','confirmePass'],
        placeholder:['Senha atual','Senha nova','Confirmar senha nova'],
        onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>EmailSignAfter(t1,t2,valid[0],valid[1],valid[2],onAnimationModal,onModalVisible,onClose)
      }
    } else if (types == 'change_name') {
      infos = {
        tipo:'change_name',
        title:'Mudar Nome de usuário',
        subTitle:'Insira seu primeiro nome abaixo',
        typeInput:['name'],
        placeholder:['Primeiro nome'],
        preLoaded:[(user?.givenName && user.givenName)?user.givenName:''],
        onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>{ChangeUserData({uid:user.userId,changeData:{givenName:t1.trim()},action:'name'},onModalVisible,onClose,dispatchUserDataChange,onSetModalVisible)}
      }
    } else if (types == 'change_sobrenome') {
      infos = {
        tipo:'change_sobrenome',
        title:'Mudar Sobrenome de usuário',
        subTitle:'Insira seu sobrenome abaixo',
        typeInput:['name'],
        placeholder:['Sobrenome'],
        preLoaded:[(user?.familyName && user.familyName)?user.familyName:''],
        onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>{ChangeUserData({uid:user.userId,changeData:{familyName:t1.trim()},action:'name'},onModalVisible,onClose,dispatchUserDataChange,onSetModalVisible)}
      }
    } else if (types == 'change_email') {
      infos = {
        tipo:'change_email',
        title:'Alterar e-mail',
        subTitle:"Favor inserir novo endereço de e-mail",
        typeInput:['email'],
        placeholder:['e-mail'],
        preLoaded:[email],
        onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>{updateUserEmail(t1,null,false,setEmail,onAnimationModal,onSetModalVisible,onModalVisible,setaskPass,onClose,dispatchUserDataChange,user.providerId)}
      }
    } else if (types == 'confirm_password') {
      infos = {
        tipo:'confirm_password',
        title:'Confirmar senha',
        subTitle:'Insira sua senha atual para prosseguir',
        typeInput:['pass'],
        placeholder:['senha'],
        onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>{updateUserEmail(_email,t1,true,setEmail,onAnimationModal,onSetModalVisible,onModalVisible,setaskPass,onClose,dispatchUserDataChange,user.providerId)}
      }
    } else if (types == 'reauth_password') {
      infos = {
        tipo:'confirm_password',
        title:'Confirmar senha',
        subTitle:'Insira sua senha atual para prosseguir',
        typeInput:['pass'],
        placeholder:['senha'],
        onFunc: (onAnimationModal,t1,t2,t3,valid,onClose)=>{GoogleSignAfter(onModalVisible,user.providerId.includes("google.com")?true:false,user.providerId,dispatchUserGoogle,dispatchUserDataChange,onSetModalVisible,{pass:t1,user:_email,googleCredential:_credential,onFunc:()=>onClose()},onAnimationModal)}
      }
    }

    setType(infos)
  }

  function setaskPass(_email) {
    if (_email) {
      onChangeType('confirm_password',_email)
    } else {
      onChangeType('change_email')
    }
  }

  const onSetModalVisible = (activation,types,data) => {
    if (activation === false && type.tipo=='change_email') {
    setModalVisible(false)
    setEmail('')
    } else if (activation === false && type.tipo=='confirm_password') {
    setModalVisible(false)
    onChangeType('change_email')
    } else if (activation === false) {
      setModalVisible(false)
    } else if (activation && !types) {
        setTimeout(() => {
          //setEmail(email)
          setModalVisible(true)
        }, 1500);
    } else if (activation && types && data) {
      setModalVisible(true)
      onChangeType(types,data.user,data.googleCredential)
    } else if (activation && types) {
      setModalVisible(true)
      onChangeType(types)
    } else {
      setModalVisible(false)
    }
  }

  function onChangeName() {
    onSetModalVisible(true,'change_name')
  }

  function onChangeEmail(bool) {
    if (bool) {
        onModalVisible(true,'loaderText')
        setTimeout(() => {onModalVisible(false,false,false,false,0)}, 800);
        setTimeout(() => {
          infoNet(
            ()=>onSetModalVisible(true,'change_email'),
            ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login')
          )
        }, 1000);
    } else if (user.providerId.includes("password") && user.providerId.includes("google.com")) {
      onModalVisible(true,'option',
          {
            buttonConfirm:'Trocar Email',
            buttonDelete:'Cancelar',
            title:'Você tem certeza?',
            subTitle:`Ao realizar a troca de e-mail você precisará verifica-lo para continuar e perderá a conexão pela Google Account.`,
            colorButton:{okButton:'#000',cancelButton:'green'}
          },
          ()=>onChangeEmail(true)
        )
    } else if (user.providerId.includes("password") && user.providerId.length<= 1) {
      onModalVisible(true,'option',
          {
            buttonConfirm:'Trocar Email',
            buttonDelete:'Cancelar',
            title:'Você tem certeza?',
            subTitle:`Ao realizar a troca de e-mail você precisará verifica-lo para continuar utilizando normalmente todas as funcionalidades do app.`,
            colorButton:{okButton:'#000',cancelButton:'green'}
          },
          ()=>onChangeEmail(true)
        )
    } else {
      onModalVisible(true,'info','É necessário criar uma senha para trocar de email','Troca de Email',0)
    }
  }

  function onChangeSobrenome() {
    onSetModalVisible(true,'change_sobrenome')
  }

  function onPassword() {
    infoNet(
      ()=>onSetModalVisible(true,user.providerId.includes("password")?'change_pass':'add_pass'),
      ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
    )

  }

  function onGoogleLink() {
    infoNet(
      ()=>GoogleSignAfter(onModalVisible,user.providerId.includes("google.com")?true:false,user.providerId,dispatchUserGoogle,dispatchUserDataChange,onSetModalVisible),
      ()=>onModalVisible(true,'info','Você não está conectado à internet. Por favor, tente novamente mais tarde.','Erro no Login',0)
    )
  }

  function onNew(params) {
    onModalVisible(true,'loaderScreen',()=>{
      onModalVisible(true,'info','Email alterado com sucesso, verifique sua caixa de menssagens para valida-lo','Verificação de Email',0)
    },true,0,'emailSent')
  }

  function Dados({type,value,onPress,image, ellipsizeMode='tail'}) {

    return(
      <TouchableOpacity onPress={onPress} style={{backgroundColor:'#e2e2e2',width:`100%`,flexDirection:'row',justifyContent:`space-between`,alignItems:"center",paddingHorizontal:15,height:40,marginVertical:3}}>
        {image?
        <View>
          <Image style={{height:17,width:17,marginRight:10,tintColor:'grey'}} source={image}/>
          <Image style={{height:17,width:17,marginRight:10,position:'absolute', opacity:user?.providerId && user.providerId.includes("google.com")?1:0.3}} source={image}/>
        </View>
        :null}
        <Text style={{fontSize:16}}>{type}</Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{paddingLeft:30,fontSize:15,color:'#565656',flex:1,textAlign:'right'}}>
        {ellipsizeMode != 'tail' ? AbreviarSobrenome(value,24) : value}
        </Text>
      </TouchableOpacity>
      )
  }

  return (
    <SafeAreaView>
      <Header text={'Configurações'} navigation={navigation} type={'goBack'}/>
      <ScrollView>
        <View style={{marginHorizontal:20,marginTop:20}}>
          <Text style={{fontSize:18,paddingLeft:15,marginTop:14,marginBottom:7}} >Dados Pessoais</Text>
          <Dados onPress={()=>onChangeEmail(false)} type={'e-mail'} value={user?.email ? user.email : '-'} />
          <Dados onPress={onChangeName}  type={'Primeiro nome'} value={(user?.givenName && user.givenName)?user.givenName:'-'}/>
          <Dados onPress={onChangeSobrenome} type={'Sobrenome'} value={(user?.familyName && user.familyName) ? user.familyName : '-'} ellipsizeMode={'midle'}/>
          <Dados onPress={onPassword} type={'Senha'} value={user?.providerId && user.providerId.includes("password") ? '********':'-'}/>
          <Dados onPress={onNew} type={'Celular'} value={'-'}/>
          <Text style={{fontSize:18,paddingLeft:15,marginTop:14,marginBottom:7}} >Social</Text>
          <Dados onPress={onGoogleLink} type={'Google'} value={user?.providerId && user.providerId.includes("google.com") ? 'Conectado':'Conectar conta google'} image={require('../../assets/google-hangouts.png')}/>
        </View>
      </ScrollView>
      <MainModal/>
      <ReactInputModal
            title={type.title}
            subTitle={type.subTitle}
            buttonSentTitle={'Confirmar'}
            onPress={type.onFunc}
            setModalVisible={onSetModalVisible}
            modalVisible={modalVisible}
            typeInput={type.typeInput}
            placeholder={type.placeholder}
            preLoaded={type?.preLoaded ? type.preLoaded : null}
            />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
//<Dados type={'Senha'} value={'Google Sign'}/>
//<Dados type={'Senha'} value={'********'}/>
