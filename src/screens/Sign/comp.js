import React, {useState,useRef,useEffect,useContext} from 'react';
import {View,ScrollView,Animated,Keyboard,Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {ButtonInitial} from '../../components/basicComponents/Button';
import {InputInitial} from '../../components/basicComponents/Input';
import {ThemeContext} from "styled-components";
import {handleEmailChange,handlePasswordChange,confirmHandlePasswordChange} from './valid'
import {Container,TextForgotPass,TextBold,TextPrivacy,ContainerPass,TextHeaderFooter,FooterView} from './styles'

const B = (props) => <TextBold onPress={props.onPress} >{props.children}</TextBold>

export default function Sign({children, ...restProps }) {
    return (
        <Container {...restProps}>
          {children}
        </Container>
    );
}

Sign.Logo = function Logo({animatedInitial,onAnimatedInitial}) {

  const animatedImage = useRef(new Animated.Value(1)).current;

  const animatedInitialImage = animatedInitial.interpolate({
    inputRange:[0,1],
    outputRange:[135,0]
  })


  function onAnimatedImage(toValue) {
    Animated.timing(animatedImage, {
        toValue,
        duration: 300,
        useNativeDriver: false,
    }).start();

}

    const _keyboardDidShow = () => {
      onAnimatedImage(0)
    };

    const _keyboardDidHide = () => {
      onAnimatedImage(1)
    };

    useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
    setTimeout(() => {
        onAnimatedInitial()
    }, 1000);
    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
    }, []);




  return(
    <Animated.View style={{flex:1,justifyContent:'center',alignItems:"center",opacity:animatedImage,transform:[{translateY:animatedInitialImage}]}} >
      <Animatable.Image animation="bounceIn" duraton="1500" source={require('../../assets/logo.png')} style={{height:250,width:250,resizeMode:`contain`, marginTop:0}}/>
    </Animated.View>
  )
}

Sign.Footer = function Footer({animatedInitial,children}) {

  const animatedInitialFooter = animatedInitial.interpolate({
    inputRange:[0,1],
    outputRange:[270,0]
    })

  return(
    <FooterView style={{transform:[{translateY:animatedInitialFooter}],elevation:20}} duration="1000">
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps='handled'>
          <View style={{paddingHorizontal:25,paddingTop:10,paddingBottom:5}}>
          <TextHeaderFooter >Faça login ou cadastre-se</TextHeaderFooter>
          {children}
          </View>
      </ScrollView>
    </FooterView>
  )
}

Sign.Email = function Email({refFocus,onContinue,data,setData,expanded,onAnimatedButton,onAnimatedInput}) {

  const onFocus = (local) => {
    if (expanded && local == 'username') {
        setTimeout(() => {
            onAnimatedInput(false)
        },0);
        onAnimatedButton(0)
    }
    setData(data=>({...data,focus:local}));
}

  return(
    <InputInitial
      placeholder="E-mail"
      autoCapitalize="none"
      clearButtonMode='while-editing'
      keyboardType='email-address'
      textContentType="emailAddress"
      returnKeyType="next"
      autoCompleteType='email'
      value={data.username}
      onChangeText={(val)=>handleEmailChange(val,data,setData)}
      onFocus={()=>onFocus('username')}
      onBlur={()=>onFocus('none')}
      focused={data.focus === 'username'}
      inputRef={refFocus}
      onSubmitEditing={onContinue}
      warnText={'E-mail com formatação inválida'}
      isValid={data.isValidUser}
      iconCheck={data.check_textInputChange}
    />
  )
}

Sign.Pass = function Pass({data,setData,expanded=false,onAnimatedButton,onContinue,confirmRefFocus}) {

  return(
    <>
    {expanded && (
      <ContainerPass style={{elevation:0,zIndex:0}}>
          <InputInitial
            iconName='Lock'
            autoCapitalize="none"
            placeholder='Senha'
            textContentType={expanded === 'register' ? 'none':'password'}
            returnKeyType={expanded === 'login' ? 'done':'next'}
            autoCompleteType={expanded === 'register' ? 'off':'password'}
            blurOnSubmit={false}
            multiline={false}
            password={true}
            secure={data.secureTextEntry ? true : false}
            secureTextEntry={data.secureTextEntry ? true : false}
            onSecurityChange={()=>setData(data=>({...data,secureTextEntry: !data.secureTextEntry}))}
            onChangeText={(val)=>handlePasswordChange(val,data,setData,onAnimatedButton,expanded)}
            value={data.password}
            onFocus={()=>setData(data=>({...data,focus:'password'}))}
            onBlur={()=>setData(data=>({...data,focus:'none'}))}
            focused={data.focus === 'password'}
            onEndEditing={(e)=>handlePasswordChange(e.nativeEvent.text,data,setData,onAnimatedButton,expanded)}
            warnText={'A senha deve conter no minimo 6 digitos.'}
            isValid={!data.isWarn || data.password.trim().length === 0}
            iconCheck={data.isValidPassword && data.password.trim().length != 0}
            iconProps={{size:22}}
            onSubmitEditing={()=>onContinue(true)}
          />
          {expanded === 'register' && (
            <InputInitial
              inputRef={confirmRefFocus}
              iconName='Lock'
              autoCapitalize="none"
              placeholder='Senha'
              textContentType={'none'}
              returnKeyType={'done'}
              autoCompleteType={'off'}
              blurOnSubmit={false}
              multiline={false}
              password={true}
              secure={data.confirmSecureTextEntry ? true : false}
              secureTextEntry={data.confirmSecureTextEntry ? true : false}
              onSecurityChange={()=>setData(data=>({...data,confirmSecureTextEntry: !data.confirmSecureTextEntry}))}
              onChangeText={(val)=>confirmHandlePasswordChange(val,data,setData,onAnimatedButton,expanded)}
              value={data.confirmPassword}
              onFocus={()=>setData(data=>({...data,focus:'confirm'}))}
              onBlur={()=>setData(data=>({...data,focus:'none'}))}
              focused={data.focus === 'confirm'}
              warnText={'As senhas devem ser iguais.'}
              isValid={!data.isConfirmWarn || data.confirmPassword.trim().length === 0}
              iconCheck={data.isEqualPassword && data.confirmPassword.trim().length != 0}
              iconProps={{size:22}}
              onSubmitEditing={()=>onContinue(false)}
            />
          )}
      </ContainerPass>
      )}
    </>
  )
}

Sign.FooterBottom = function Pass({onContinue,secondary=false,expanded=false,animatedButton,setModalVisible}) {

  const themeContext = useContext(ThemeContext);

  const animatedInitialButton = animatedButton.interpolate({
    inputRange:[0,1],
    outputRange:[themeContext.background.paper,themeContext.primary.lighter]
  })

  const animatedInitialText = animatedButton.interpolate({
    inputRange:[0,1],
    outputRange:[themeContext.text.primary,themeContext.status.text]
  })


  return(
    <View style={{zIndex:1}}>
    <ButtonInitial
      secondary={secondary}
      textStyle={{color:animatedInitialText}}
      style={{backgroundColor:animatedInitialButton}}
      onPress={()=>onContinue()}
      text='CONTINUAR'
    />

    {expanded && expanded != 'register' && (
      <TextForgotPass onPress={()=>setModalVisible(true)}  >Esqueceu sua senha?</TextForgotPass>
    )}
    <TextPrivacy>Ao criar uma conta, você concorda com os nossos
      <B onPress={()=>{}}> Termos de Serviço</B> e a
      <B onPress={()=>{}}> Política de Privacidade</B>
    </TextPrivacy>
  </View>
  )
}

