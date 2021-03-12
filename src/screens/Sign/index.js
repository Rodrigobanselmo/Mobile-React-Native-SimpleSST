import React, {useState,useContext,useRef,useEffect} from 'react';
import Sign from './comp'
import {useReactModal} from '../../context/ModalContext'
import useAuth from '../../hooks/useAuthChange'
import {onCheckEmail,onLoginUser,onCreateAccount,onRecoveryPass} from './func'
import {ThemeContext} from "styled-components";
import { StatusBar,Animated,LayoutAnimation,Platform,UIManager } from 'react-native';
import ReactInputModal from '../../components/modalComponents/ReactInputModal';


export default function SignIn() {
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const [] = useAuth()

  const refFocus = useRef(false)
  const confirmRefFocus = useRef(false)

  const animatedInitial = useRef(new Animated.Value(0)).current; 
  const animatedButton = useRef(new Animated.Value(0)).current; 

  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [data, setData] = useState({
    username: 'rodrigobanselmo@gmail.com',
    password: '',
    confirmPassword: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    isValidUser: true,
    isValidPassword: false,
    isEqualPassword: false,
    isWarn: false,
    isConfirmWarn: false,
    focus:'none'
  });

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function onAnimatedInitial() {
    Animated.timing(animatedInitial, {
        toValue:1,
        duration: 1000,
        useNativeDriver: false,
    }).start();
  }
  
  function onAnimatedButton(toValue) {
    if(toValue == 1) setSecondary(true)
    if(toValue == 0) setSecondary(false)
    Animated.timing(animatedButton, {
        toValue,
        duration: 500,
        useNativeDriver: false,
    }).start();
  }

  function onAnimatedInput(param) {
    LayoutAnimation.configureNext(
        LayoutAnimation.create(
            500,
            LayoutAnimation.Types.easeInEaseOut,
            LayoutAnimation.Properties.opacity
          )        
    );
    if(param == 'register' && !expanded) {
        refFocus.current.blur()
        setExpanded('register');
    } else if (param === 'login'  && !expanded) {
        refFocus.current.blur()
        setExpanded('login');
    } else {
        setExpanded(false);
    }
    setData(data=>({
        ...data,
        password: '',
        confirmPassword: '',
        secureTextEntry: true,
        confirmSecureTextEntry: true,
        isValidPassword: false,
        isEqualPassword: false,
    }));
  }

  const onContinue = (next) => {
    if (!expanded) {
      onCheckEmail({data,setData,onAnimatedInput,reactModal})
    } else if (expanded === 'login') {
      onLoginUser({data,reactModal})
    } else if (expanded == 'register') {
      console.log(next)
      if (next) confirmRefFocus.current.focus()
      else onCreateAccount({data,reactModal})
    }
  }

  return (
    <Sign >
      <StatusBar backgroundColor={themeContext.primary.lighter} barStyle="light-content"/>
      <Sign.Logo animatedInitial={animatedInitial} onAnimatedInitial={onAnimatedInitial}/>
      <Sign.Footer animatedInitial={animatedInitial}>
        <Sign.Email refFocus={refFocus} onContinue={onContinue} data={data} setData={setData} expanded={expanded} onAnimatedButton={onAnimatedButton} onAnimatedInput={onAnimatedInput} />
        <Sign.Pass onContinue={onContinue} data={data} setData={setData} expanded={expanded} onAnimatedButton={onAnimatedButton} confirmRefFocus={confirmRefFocus}/> 
        <Sign.FooterBottom setModalVisible={setModalVisible} onContinue={onContinue} expanded={expanded}secondary={secondary} animatedButton={animatedButton}/>
      </Sign.Footer>
      <ReactInputModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        onPress={(data)=>onRecoveryPass({data,reactModal,setModalVisible})}
        typeInput={['emailOnly']}
        title={`Redefinir senha`}
        subTitle={"Favor inserir e-mail para redefir senha"}
        placeholder={['e-mail']}
        preLoaded={[data.username]}
      />
    </Sign>
  );
}
