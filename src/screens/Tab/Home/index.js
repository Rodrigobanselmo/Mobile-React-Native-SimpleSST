/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar, Text, FlatList, TouchableOpacity,View, ScrollView} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled, {css} from "styled-components/native";
import Donut from '../../../components/donutComponents/donut';
import {Header} from '../../../components/basicComponents/Header';
import {NormalizeData} from '../../../helpers/DataHandler';
import {onGetAllChecklistData} from './func';
import { useSelector, useDispatch } from 'react-redux';

const ChecklistContainer = styled.TouchableOpacity`
  background-color: ${({theme})=>theme.background.paper};
  margin: 10px 20px 10px 20px;
  padding:10px;
  border-radius:7px;
  elevation: 5;  
  position:relative;
`;

const TextTitle = styled.Text`
  font-size:16px;
  color: ${({theme})=>theme.text.secondary};
`;

const TextSub = styled.Text`
  font-size:13px;
  color: ${({theme})=>theme.text.fourth};
`;
const TextSubSub = styled.Text`
  font-size:14px;
  color: ${({theme})=>theme.text.third};


  ${props => props.line && css`
    border-bottom-color: ${({theme})=>theme.background.line};
    border-bottom-width: 1px;
    padding-bottom:10px;
  `}

`;

const TextInfoAdd = styled.Text`
  /* border-top-color: ${({theme})=>theme.background.line};
  border-top-width: 1px; */
  padding-top:10px;
  font-size:14px;
  font-weight:bold;
  margin-top:10px;
  color: ${({theme})=>theme.text.third};
`;


const ContainerSafe = styled.SafeAreaView`
  justify-content: flex-start;
  flex: 1;
  background-color:${({theme})=>theme.background.back};
`;



export default function App({navigation}) {
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const allModels = useSelector(state => state.allModels);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const [selected, setSelected] = useState(null);
  
  useEffect(() => {
    onGetAllChecklistData({user,reactModal,navigation,dispatch})
  }, [])
  
  function ChecklistComponent({ item,index }) {
    const date = new Date(parseInt(item?.creation?.seconds.toString() + item?.creation?.nanoseconds.toString().substring(0,3)))

    return (
      <ChecklistContainer activeOpacity={0.7} onPress={()=>setSelected(selected?null:item.id)}>
        <View style={{alignItems:"center",flexDirection:'row'}}>
          <View style={{flex:1}}>
            <TextTitle>{item.name}</TextTitle>
            <TextSub numberOfLines={1}>
              {item?.companyName ? item.companyName : 'Empresa: não identificado'}
              </TextSub>
          </View>
          <Donut strokeWidth={6} color={themeContext.primary.main} percentage={item.percentage.jump+item.percentage.selected} max={item.percentage.total} radius={30} />
        </View>
        {selected == item.id && 
          <>
            <TextInfoAdd style={{}} numberOfLines={1}>Informações Adicionais</TextInfoAdd>
            <TextSub style={{marginTop:15}} >Modelo Geral:</TextSub>
            <TextSubSub line style={{marginTop:6}} >{item?.title}</TextSubSub>
            <TextSub style={{marginTop:15}} >Criado por:</TextSub>
            <TextSubSub style={{marginTop:6}} >{item?.user}</TextSubSub>
            <TextSub style={{marginTop:15}} >Data de criação:</TextSub>
            <TextSubSub style={{marginTop:6}} >{NormalizeData(date,'string')}</TextSubSub>
          </>
        }
      </ChecklistContainer>
    )
  }


  
  return (
    <ContainerSafe >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      {/* <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}> */}
      <Header text='Verificar Email' />
      <FlatList
        data={allModels}
        renderItem={ChecklistComponent}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{}}
      />
      {/* </ScrollView> */}
    </ContainerSafe>
    
  );
}

const styles = StyleSheet.create({});
