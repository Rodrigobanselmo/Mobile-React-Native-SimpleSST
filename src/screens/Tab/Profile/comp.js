import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View,TouchableOpacity, Dimensions, Image} from 'react-native';
import {Header} from '../../../components/basicComponents/Header';
//import { } from '../../../services/firebaseAuth';
//import { } from '../../../services/firestoreUser';
import ReactInputModal from '../../../components/modalComponents/ReactInputModal';
import {AbreviarNome} from'../../../services/StringHandle';
import {Label,ContaineSafe,Button,Title,Divider} from './styles';
import {ThemeContext} from "styled-components";

export default function Profile({children, ...restProps }) {
  const themeContext = useContext(ThemeContext);

  return (
      <ContaineSafe {...restProps}>
        <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
        {children}
      </ContaineSafe>
  );
}

Profile.Body = function Body({navigation,children}) {

  return (
    <>
      <Header text={'Seu Perfil'} navigation={navigation}/>
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
          {children}
      </ScrollView>
    </>
  )
}

Profile.Data = function Body({user,onSetModalVisible}) {

  function Dados({type,value,onPressKey,fullName}) {
    return(
      <Button onPress={()=>onSetModalVisible(onPressKey ?? type)} >
        <Label >{type}</Label>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{paddingLeft:30,fontSize:15,color:'#565656',flex:1,textAlign:'right'}}>
        {fullName ? AbreviarNome(value,24) : value}
        </Text>
      </Button>
      )
  }

  return (
        <View style={{marginHorizontal:20,marginTop:5,marginBottom:10,flex:1}}>
          <Title  style={{marginTop:0}}>Dados Pessoais</Title>
          <Dados onPressKey={'email'} type={'e-mail'} value={user.email} />
          <Dados onPressKey={'change_name'} type={'Nome'} fullName={true} value={user?.name ?? ''}/>
          <Dados onPressKey={'change_pass'} type={'Senha'} value={'********'}/>
          <Dados onPressKey={'change_cpf'} type={'CPF'} value={user?.info?.CPF ?? '-'}/>
          { user?.info?.CREA && <Dados type={'CREA'} value={user?.info?.CREA ?? '-'}/>}
          { user?.info?.CRM && <Dados type={'CRM'} value={user?.info?.CRM ?? '-'}/>}
          { user?.info?.COREN && <Dados type={'COREN'} value={user?.info?.COREN ?? '-'}/>}
          <Title >Empresa</Title>
          <Dados type={'Tipo de Conta'} value={user?.type ?? '-'}/>
          <Dados type={'Administrador'} value={user?.admin ?? '-'}/>
          <Dados type={'Status'} value={user?.status ?? '-'}/>
          <Divider />
          <Dados type={'Sair'} />
        </View>
  )
}

Profile.InputModal = function Modal({type,modalVisible,onSetModalVisible}) {

  return (
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
  )
}

{/*        */}