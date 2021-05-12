/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar, Text, FlatList, TouchableOpacity,View, ScrollView} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled, {css} from "styled-components/native";
import Donut from '../../../components/donutComponents/donut';
import {Header} from '../../../components/basicComponents/Header';
import {NormalizeData} from '../../../helpers/DataHandler';
import {onGetAllChecklistData,onGetChecklistData} from './func';
import { useSelector, useDispatch } from 'react-redux';
import {ButtonInitial} from '../../../components/basicComponents/Button';


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
  const riskAnswer = useSelector(state => state.riskAnswer);
  const riskPosition = useSelector(state => state.riskPosition);
  const answer = useSelector(state => state.answer);
  const company = useSelector(state => state.company);
  const checklist = useSelector(state => state.checklist);
  const dispatch = useDispatch();
  
console.log('riskAnswer',riskAnswer)
console.log('answer',answer)
console.log('company',company)
console.log('checklist',checklist)

  const [selected, setSelected] = useState(null);
  
  useEffect(() => {
    onGetAllChecklistData({user,reactModal,navigation,dispatch})
  }, [])

  function onEdit(item) {
    onGetChecklistData({item,user,reactModal,navigation,dispatch})
  }
  
  function ChecklistComponent({ item,index }) {
    const date = new Date(parseInt(item.creation.seconds.toString() + item.creation.nanoseconds.toString().substring(0,3)))

    return (
      <ChecklistContainer activeOpacity={0.7} onPress={()=>setSelected(selected==item.id?null:item.id)}>
        <View style={{alignItems:"center",flexDirection:'row'}}>
          <View style={{flex:1}}>
            <TextTitle>{item.name}</TextTitle>
            <TextSub numberOfLines={1}>
              {item?.companyName ? item.companyName : 'Empresa: não identificado'}
              </TextSub>
          </View>
          <Donut strokeWidth={6} color={themeContext.primary.main} percentage={item?.percentage?.jump+item?.percentage?.selected} max={item?.percentage?.total} radius={30} />
        </View>
        {selected == item.id && 
          <>
            <TextInfoAdd style={{}} numberOfLines={1}>Informações Adicionais</TextInfoAdd>
            <TextSub style={{marginTop:15}} >Modelo Geral:</TextSub>
            <TextSubSub  style={{marginTop:4}} >{item?.title}</TextSubSub>
            <TextSub style={{marginTop:15}} >Criado por:</TextSub>
            <TextSubSub style={{marginTop:4}} >{item?.user}</TextSubSub>
            <TextSub style={{marginTop:15}} >Data de criação:</TextSub>
            <TextSubSub style={{marginTop:4}} >{NormalizeData(date,'string')}</TextSubSub>
            <ButtonInitial
              secondary={true}
              style={{marginBottom:0,marginTop:20}}
              onPress={()=>onEdit(item)}
              scale={0.6}
              elevation={false}
              text='Editar'
            />
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
        data={allModels.filter(i=>i.userId == user.uid).sort(function(a, b) { return -(a.creation.seconds - b.creation.seconds);}).slice(0,5)}
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
