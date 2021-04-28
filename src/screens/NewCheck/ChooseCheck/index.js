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
import {onGetAllChecklist,onGetChecklist} from './func'
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
    onGetAllChecklist({setData,user,reactModal,navigation})
  }, [])

  function getChecklistData(item) {
    onGetChecklist({itemId:item.id,user,reactModal,navigation,dispatch})
  }

  const renderItem = ({ item,index }) => (
    <ItemContainer activeOpacity={0.7} last={index == data.length-1} onPress={()=>getChecklistData(item)} >
        <TextGroup  numberOfLines={2}>{item.title}</TextGroup>
        <Icons name="ArrowRight" color={themeContext.text.fourth} size={20}/>
    </ItemContainer>
  );

  return (
    <Container >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      <Header text='Novo Checklist' type="Back" navigation={navigation} style={{marginBottom:15}}/>
      <InputSearch
        placeholder="Pesquisar..."
        clearButtonMode='while-editing'
        keyboardType='default'
        autoCompleteType='off'
        value={search}
        onChangeText={(val)=>setSearch(val)}
        // returnKeyType="next"
      />
      <CheckFlatList
        data={data.filter(i=>i?.title&&i.title.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").includes( search.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "") ))}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
