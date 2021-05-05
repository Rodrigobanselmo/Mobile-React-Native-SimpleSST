import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image ,StatusBar,Animated, SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';
import {Header} from '../../../components/basicComponents/Header';
import {InputSearch} from '../../../components/basicComponents/InputSearch';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import {InputInitial} from '../../../components/basicComponents/Input';
import styled, {ThemeContext} from "styled-components/native";
import { TextInputMask } from 'react-native-masked-text'
import {useReactModal} from '../../../context/ModalContext'
import { useSelector, useDispatch } from 'react-redux';
import {onSetNewChecklist} from './func'
import {Container,ComponentView,TextArea} from './style'
import Icons from '../../../components/Icons'


export default ({navigation}) => {

  const [search, setSearch] = useState('')
  const [data, setData] = useState('')
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const checklist = useSelector(state => state.checklist);

  // useEffect(() => {
  //   onGetAllCompanies({setData,user,reactModal,navigation})
  // }, [])

  function getChecklistData() {
    //navigation.navigate('Card')
    onSetNewChecklist({checklist,data,user,reactModal,navigation,dispatch})
  }

  return (
    <Container >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      <Header text='Novo Checklist' type="Back" navigation={navigation} style={{marginBottom:15}}/>
      <ComponentView>
        <TextArea
          placeholder={`Nome do checklist...`}
          autoFocus={true}
          value={data}
          autoCapitalize="words"
          onChangeText={(value)=>setData(value)}
          returnKeyType={'done'}
          onSubmitEditing={()=>{}}
          multiline={false}
        />
        <ButtonInitial
          secondary={true}
          disabledButton={data.length>0?false:true}
          style={{marginBottom:0,marginHorizontal:20}}
          onPress={getChecklistData}
          scale={0.7}
          elevation={false}
          text='CRIAR'
        />
      </ComponentView>
    </Container>
  );
}
