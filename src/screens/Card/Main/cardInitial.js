/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {ThemeContext} from "styled-components";
import {Dimensions,View, } from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled,{css} from "styled-components/native";
import {ButtonInitial,IconButton} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import {Modal} from './comp'
import {Ascendent} from '../../../helpers/Sort'
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

import { TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native-gesture-handler';

const Group = styled.Text`
  color: ${({theme})=>theme.text.secondary};
  text-align:center;
  font-size:15px;
`;


const ContainerGroup = styled.TouchableOpacity`
  justify-content:center;
  border: 2px solid ${({theme})=>theme.background.line};
  align-items: center;
  padding: 0 30px;
  flex:1;
  background-color: ${({theme})=>theme.background.paper};
  margin-bottom:12px;
  border-radius:10px;
  /* max-height:${({windowHeight})=>`${windowHeight*0.08}px`};
  min-height:${({windowHeight})=>`${windowHeight*0.08}px`}; */
  max-height:60px;
  min-height:60px;
  
  ${props => props.first && css`
    margin-top:15px;
  `}
`;


const TextQuestion = styled(Animatable.Text)`
  text-align:center;
  font-size:16px;

  ${props => props.windowHeight <700 && css`
    line-height:20px;
  `}
  ${props => props.windowHeight >700 && css`
    line-height:22px;
    font-size:18px;
  `}
  ${props => props.windowHeight >800 && css`
    line-height:26px;
    font-size:20px;
  `}
`;

const ViewTextContent = styled.View`
/*   background-color: ${({theme})=>theme.background.lineActive}; */
  background-color: ${({theme})=>theme.background.paper};
  padding:20px;
  margin:15px 15px;
  border-radius:10px;


  ${props => props.windowHeight <700 && css`
  `}
  ${props => props.windowHeight >700 && css`
    flex:1;
    justify-content:center;
  `}
  ${props => props.windowHeight >800 && css`
  `}
`;

const TextGroup = styled.Text`
  width:75%;
  color: ${({theme})=>theme.text.third};
  font-size:15px;
`;

const TextProgress = styled.Text`
  width:auto;
  color: ${({theme})=>theme.text.third};
  ${props => props.windowHeight >700 && css`
    font-size:16px;
  `}
  ${props => props.windowHeight >800 && css`
    font-size:17px;
  `}
`;


export function CardInitial({allGroups,item,groupId,onAnimatedFlip,index,data,dispatch,model,answer,setactiveSlide}) {

  const windowHeight = Dimensions.get('window').height
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const checklist = useSelector(state => state.checklist);
  const risk = useSelector(state => state.risk);
  const riskAnswer = useSelector(state => state.riskAnswer);
  const answers = useSelector(state => state.answer);

  const categoryIndex = checklist.data.findIndex(i=>i.id==groupId)

  function onChooseGroup(group) {
    
    console.log(data.findIndex(i=>i.group == group))
    if (data.findIndex(i=>i.group == group) >= 0) setactiveSlide(data.findIndex(i=>i.group == group)+1)
    //dispatch({type: 'ANSWER_LATER',payload:{itemId:item.id,groupId}})
  }

  const sortedObj = allGroups.sort((a, b) => {
    return (
      checklist.data[categoryIndex].groups.indexOf(a) - checklist.data[categoryIndex].groups.indexOf(b)
    );
  });

  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%',flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15}}>
          <TextGroup ellipsizeMode={'tail'} numberOfLines={1} >{'Grupos'}</TextGroup>
      </View>
        <View style={{flex:1,justifyContent:'flex-start',marginHorizontal:20}}>
          {sortedObj.map((group,index)=>{
            return ( 
              <ContainerGroup activeOpacity={0.7} first={index == 0} key={group} windowHeight={windowHeight} onPress={()=>onChooseGroup(group)}>
                <Group numberOfLines={2}>{group}</Group>
                <Icons name={'ArrowRight'} size={22} color={themeContext.text.third}  style={{position:'absolute',top:17,right:5,opacity:0.8}}/>
              </ContainerGroup>
            )
          })}
        </View>
      </ScrollView>
    </View>

  )
}