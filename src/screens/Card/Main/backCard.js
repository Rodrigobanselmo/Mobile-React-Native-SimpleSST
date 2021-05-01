/* eslint-disable no-unused-vars */
import React, {useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {StyleSheet,Dimensions} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled from "styled-components/native";
import Donut from '../../../components/donutComponents/donut';

import { TouchableOpacity,TextInput,FlatList } from 'react-native-gesture-handler';

const ItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  padding:5px 10px;
  align-items: center;
  border: 1px ${props=>props.theme.background.line} solid;
  border-radius:10px;
/*   background-color: ${({theme})=>theme.text.third}; */
`;

const Container = styled.View`
  margin:10px 30px 15px 30px;
  padding:0px 10px;
/*   border-radius:10px;
  border: 1px ${props=>props.theme.background.line} solid; */
`;

const TextGroup = styled.Text`
  color: ${({theme})=>theme.text.third};
  margin-left:10px;
/*   background-color: ${({theme})=>theme.text.primary}; */
`;

export function BackCard({data,groupIndex,setId,setactiveSlide,dispatch}) {

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const ref = useRef()

  useEffect(() => {
    setTimeout(() => {
      try {
        ref.current.scrollToIndex({animated:true,index:groupIndex})
      } catch {}
    }, 1100);
  }, [])

  function onGroup(item) {
    console.log(item)
    dispatch({type:'SET_HEADER',payload:item.group})
    setactiveSlide(0)
    setId(item.id)
  }

  const renderItem = ({ item,index }) => (
    <ItemContainer onPress={()=>onGroup(item)} style={index > 0 && {marginTop:13 }}>
        <Donut strokeWidth={9} color={themeContext.primary.main} percentage={item.questions.filter(i=>(i?.selected && i.selected !=='none' && !(i?.hide&&i.hide))).length} max={item.questions.filter(i=>(!(i?.hide&&i.hide))).length} radius={25} />
        <TextGroup style={{marginRight:58}}>{item.group}</TextGroup>
        <TextGroup style={{position:'absolute',bottom:3,right:6,fontSize:8}}>{index+1}</TextGroup>
    </ItemContainer>
  );

  return (
    <Container style={{flex:1}}>
      <FlatList
        ref={ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>

  )
}

