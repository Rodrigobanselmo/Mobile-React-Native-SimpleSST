import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image ,StatusBar,Animated, SafeAreaView, ScrollView} from 'react-native';
import {Header} from '../../../components/basicComponents/Header';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import {InputInitial} from '../../../components/basicComponents/Input';
import styled, {ThemeContext} from "styled-components";
import { TextInputMask } from 'react-native-masked-text'
import {useReactModal} from '../../../context/ModalContext'
import { useSelector, useDispatch } from 'react-redux';
import {onAddUserData} from './func'

const Scroll = styled(ScrollView)`
  flex: 1;
`;


const Title = styled(Text)`
  margin-bottom:10px;
  font-weight:bold;
  font-size:20px;
  color: ${({theme})=>theme.text.third};
`;
const SubTitle = styled(Text)`
  margin-bottom:20px;
  font-weight:normal;
  font-size:14px;
  color: ${({theme})=>theme.text.fourth};
`;


const ContainerInputs = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 50px 0px 50px;
`;


const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme})=>theme.background.back};
`;

const engineryData = {name:'CREA',placeholder:'CREA'}
const doctorData = {name:'CRM',placeholder:'CRM'}
const nurseData = {name:'COREN',placeholder:'COREN'}

export default ({navigation}) => {

  const [data, setData] = useState({givenName:'',familyName:'',cpf:'',focus:'none'})
  const [extraData, setExtraData] = useState([])
  const [secondary, setSecondary] = useState(false);

  const refFocus = useRef(false)
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const animatedButton = useRef(new Animated.Value(0)).current; 

  const animatedInitialButton = animatedButton.interpolate({
    inputRange:[0,1],
    outputRange:[themeContext.status.inactive,themeContext.primary.lighter]
  })

  function onAnimatedButton(toValue) {
    if(toValue == 1) setSecondary(true)
    if(toValue == 0) setSecondary(false)
    Animated.timing(animatedButton, {
        toValue,
        duration: 500,
        useNativeDriver: false,
    }).start();
  }

  useEffect(() => {
    if (user?.type && user.type) {
      const dt = []
      if (user.type === 'Engenheiro de Segurança') dt.push(engineryData)
      if (user.type === 'Médico do Trabalho') dt.push(doctorData)
      if (user.type === 'Enfermeiro do Trabalho') dt.push(nurseData)
      setExtraData([...dt])
    }
    console.log(user)
  }, [user])

  useEffect(() => {
    if (data.givenName.length > 1 && data.familyName.length > 1 && data.cpf.length === 14 && !secondary) onAnimatedButton(1)
    else if ((data.givenName.length <= 1 || data.familyName.length <= 1 || data.cpf.length !== 14) && secondary) onAnimatedButton(0)
    console.log(data)
  }, [data])

  function onAdd() {
    if (data.givenName.length <= 1 || data.familyName.length <= 1 || data.cpf.length !== 14) reactModal.animated({text:'Preencha todos os campos obrigatorios para continuar.',type:'Warn' })
    else onAddUserData({data,user,dispatch,reactModal,navigation})
  }

  return (
    <Container >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
{/*       <Header text='' navigation={navigation} /> */}
      <Scroll showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <ContainerInputs >
        <Title>Dados do Usuário</Title>
        <SubTitle allowFontScaling adjustsFontSizeToFit>Insira seus dados para prosseguir</SubTitle>
        <InputInitial
          placeholder="Primeiro nome*"
          iconCheck={data.givenName.length > 1}
          autoCapitalize="words"
          clearButtonMode='while-editing'
          keyboardType='default'
          textContentType="givenName"
          returnKeyType="next"
          blurOnSubmit={false}
          autoCompleteType='off'
          iconProps={{color:themeContext.text.fourth}}
          iconName='User'
          value={data.givenName}
          onChangeText={(val)=>setData(data=>({...data,givenName:val}))}
          onFocus={()=>setData(data=>({...data,focus:'givenName'}))}
          onBlur={()=>setData(data=>({...data,focus:'none'}))}
          focused={data.focus === 'givenName'}
          onSubmitEditing={()=>{refFocus.current.focus()}}
        />
        <InputInitial
          inputRef={refFocus}
          placeholder="Sobrenome*"
          autoCapitalize="words"
          clearButtonMode='while-editing'
          keyboardType='default'
          textContentType="familyName"
          returnKeyType="next"
          autoCompleteType='off'
          iconProps={{color:themeContext.text.fourth}}
          iconName='User'
          value={data.familyName}
          onChangeText={(val)=>setData(data=>({...data,familyName:val}))}
          onFocus={()=>setData(data=>({...data,focus:'familyName'}))}
          onBlur={()=>setData(data=>({...data,focus:'none'}))}
          iconCheck={data.familyName.length > 1}
          focused={data.focus === 'familyName'}
        />
        <InputInitial
          placeholder="CPF*"
          autoCapitalize="words"
          clearButtonMode='while-editing'
          keyboardType='numeric'
          textContentType="familyName"
          returnKeyType="next"
          autoCompleteType='off'
          iconProps={{color:themeContext.text.fourth}}
          iconName='User'
          value={data.cpf}
          onChangeText={(val)=>setData(data=>({...data,cpf:val}))}
          onFocus={()=>setData(data=>({...data,focus:'cpf'}))}
          onBlur={()=>setData(data=>({...data,focus:'none'}))}
          focused={data.focus === 'cpf'}
          mask={true} 
          maxLength={14}
          type={'cpf'}
          iconCheck={data.cpf.length === 14}
          onSubmitEditing={()=>{}}
        />
        {extraData.map((item,index)=>(
          <InputInitial
            key={index}
            placeholder={item.placeholder}
            autoCapitalize="words"
            clearButtonMode='while-editing'
            keyboardType='numeric'
            textContentType="familyName"
            returnKeyType="next"
            autoCompleteType='off'
            iconProps={{color:themeContext.text.fourth}}
            iconName='User'
            value={data[item.name]}
            onChangeText={(val)=>{
              let dt = {...data}
              dt[item.name] = val
              setData(data=>({...data,...dt}))}
            }
            onFocus={()=>setData(data=>({...data,focus:item.name}))}
            onBlur={()=>setData(data=>({...data,focus:'none'}))}
            focused={data.focus === item.name}
            onSubmitEditing={()=>{}}
          />
        ))}
        <ButtonInitial
          secondary={secondary}
          style={{backgroundColor:animatedInitialButton}}
          onPress={onAdd}
          scale={0.67}
          elevation={true}
          text='Adicionar'
          disabledButton={true}
        />
      </ContainerInputs>
        </Scroll>
    </Container>
  );
}
