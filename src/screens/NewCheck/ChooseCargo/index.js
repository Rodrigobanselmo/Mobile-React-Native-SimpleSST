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
import {onGetAllCompanies,onGetCompany} from './func'
import {CheckFlatList,Container,ItemContainer,TextGroup,} from './style'
import Icons from '../../../components/Icons'


export default ({navigation}) => {

  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    //onGetAllCompanies({setData,user,reactModal,navigation})
  }, [])

  function getCompanyData(item) {
    //console.log(item)
   // onGetCompany({item,user,reactModal,navigation,dispatch})
  }

  return (
    <Container >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      <Header text='Novo Checklist' type="Back" navigation={navigation} style={{marginBottom:15}}/>
      <ButtonInitial
        secondary={false}
        style={{marginBottom:0,}}
        textStyle={{color:'#000'}}
        height={80}
        onPress={()=>navigation.navigate('ChooseName')}
        scale={0.67}
        elevation={true}
        text='Pular'
      />
    </Container>
  );
}
