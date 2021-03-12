import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image ,StatusBar,Animated,StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Header} from '../../../components/basicComponents/Header';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import {InputInitial} from '../../../components/basicComponents/Input';
import styled, {ThemeContext} from "styled-components";
import { TextInputMask } from 'react-native-masked-text'
import {useReactModal} from '../../../context/ModalContext'
import { useSelector, useDispatch } from 'react-redux';
import {onSendVerification,onUserReload} from './func';
import Email from "../../../assets/email.svg";
import useAuth from'../../../hooks/useAuthChange';

const TextLink = styled(Text)`
    margin-top:10px;
    font-size:15px;
    color: ${({theme})=>theme.text.secondary};
`;


const TextMessage = styled(Text)`
    font-size:14px;
    color: ${({theme})=>theme.text.third};
    text-align:center;
`;


const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme})=>theme.background.back};
`;


export default ({route,navigation}) => {

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [_,navigationReset] = useAuth()

  function onConfirm() {
    onUserReload(reactModal,navigationReset)
  }

  useEffect(() => {
    console.log('route',route.params)
    if (route && route?.params && route.params?.send && route.params.send) onSendVerification(reactModal,user,'SendNow')
    else reactModal.close()
  }, [route])

  return (
    <Container >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      <Header text='Verificar Email' navigation={navigation} />
      <View style={{flex:1, justifyContent:'flex-start',alignItems:`center`,paddingHorizontal:50,paddingTop:20,paddingBottom:35}}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
          <TextMessage >Por favor, verifique sua caixa de entrada e caixa de "SPAM" para validar seu email:{"\n"}{"\n"}</TextMessage>
        </View>
        <View style={{flexGrow:1,justifyContent:"center",alignItems:"center",paddingBottom:40}}>
          <Email width={200} height={200} />
        </View>
        <View style={{alignItems:`center`,width:`100%`}}>
          <ButtonInitial
            onPress={()=>onConfirm()}
            scale={0.80}
            elevation={true}
            text='Continuar'
          />
          <TouchableOpacity onPress={()=>onSendVerification(reactModal,user)}>
            <TextLink>Reenviar Link</TextLink>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  textSub: {

  },
  textSubButton: {

  },
  });
