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

export function BackCard({data,groupIndex,setId,answers,cardsData,setactiveSlide,dispatch}) {

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



  const renderItem = ({ item,index }) => {

    const _key = data.findIndex(i=>i.id==item.id)
    const dataFilterHide = [...data[_key].questions.filter(i=>!(i?.hide&&i.hide))]

  function onJumpData() { //todas as perguntas pulas e respondidas
    return data[_key]?.jump ?data[_key].jump:[]
  }
  
  function jumpData() {
    var mother = false
    var newData = []
    dataFilterHide.filter(i=>(i?.mother || i?.subMother)).map(i=>{
        if (answers.findIndex(fi=>fi.questionId==i.id) == -1 || (answers.findIndex(fi=>fi.questionId==i.id) != -1 && !answers[answers.findIndex(fi=>fi.questionId==i.id)]?.selected)) mother = true
    })
    if (mother) {newData = []}
    else {
      onJumpData().map(i=>{
        const ansInd = answers.findIndex(fi=>fi.questionId==i.questionId)
        if (ansInd != -1 ) console.log(answers[ansInd].selected)
        if (ansInd != -1 && (answers[ansInd].selected == i.selected ||  (Array.isArray(answers[ansInd].selected) && answers[ansInd].selected.includes(i.selected)))) {
          if (i?.g && i.g.length > 0) newData.push(...dataFilterHide.filter(fi=>fi.id!=i.questionId&&i.g.includes(fi.group)))  //= [...newData.filter(fi=>fi.id!=i.questionId&&i.g.includes(fi.group))]
          if (i?.q && i.q.length > 0) newData.push(...newData.filter(fi=>i.q.includes(fi.id)))
        }
      })
    }


    return [...newData]
  }

  const jump = jumpData().length
  const total = dataFilterHide.length
  const selected = answers.filter((i,idx)=>i?.selected && dataFilterHide.findIndex(fi=>fi.id == i.questionId) != -1 && answers.findIndex(fi=>fi.questionId == i.questionId) == idx).length
  //console.log(jump,total,selected)
   if (total!=0) return <ItemContainer onPress={()=>onGroup(item)} style={index > 0 && {marginTop:13 }}>
        <Donut strokeWidth={9} color={themeContext.primary.main} percentage={jump+selected} max={total} radius={25} />
        <TextGroup style={{marginRight:58}}>{item.group}</TextGroup>
        <TextGroup style={{position:'absolute',bottom:3,right:6,fontSize:8}}>{index+1}</TextGroup>
    </ItemContainer>

  return null
  };

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

