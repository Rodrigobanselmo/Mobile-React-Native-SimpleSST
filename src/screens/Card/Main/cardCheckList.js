/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {ThemeContext} from "styled-components";
import {Dimensions,View, } from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled,{css} from "styled-components/native";
import {ButtonInitial,IconButton} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

import { TouchableOpacity,TextInput,FlatList } from 'react-native-gesture-handler';

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


export function CardCheckList({item,group,groupId,onAnimatedFlip,index,data,dispatch,model,sheetRef}) {

  const windowHeight = Dimensions.get('window').height
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const risk = useSelector(state => state.risk);
  //const answers = useSelector(state => state.answer);
  
  function onAnswer(peek) {
    if (item.action[peek]?.child) {
      dispatch({type: 'ANSWER_CHILD',payload:{peek,itemId:item.id,groupId,childId:item.action[peek].child}})
      //dispatch({type: 'REMOVE_RISK_ANSWER',payload:{itemId:item.id,groupId,riskId:item.action[peek].risk}})
    }
    if (item.action[peek]?.risk) {
      sheetRef.current.snapTo(1)
      dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
    }
    if (peek === 'goBack') {
      dispatch({type: 'ANSWER_BACK',payload:{itemId:item.id,groupId,parentId:item.parent}})
    }
    if (item.action[peek] == 0) {
      dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
      //dispatch({type: 'REMOVE_RISK_ANSWER',payload:{itemId:item.id,groupId}})
    }
    if (item.action[peek]?.rec) {
      dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
      //dispatch({type: 'REMOVE_RISK_ANSWER',payload:{itemId:item.id,groupId}})
    }
    dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{peek,itemId:item.id,groupId}})
  }

  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15}}>
          <TextGroup ellipsizeMode={'tail'} numberOfLines={1} >{group}</TextGroup>
          <TextProgress>{`${index+1}/${data.length}`}</TextProgress>
      </View>
      <View style={{flex:1,overflow:'visible'}}>
        <ViewTextContent windowHeight={windowHeight} style={{elevation:5}}>
          <TextQuestion animation="fadeIn" duration={1000} windowHeight={windowHeight} >{item.text}</TextQuestion>
        </ViewTextContent>
        <View style={{flex:1,justifyContent:'flex-start',marginHorizontal:20}}>
          <ButtonInitial
            secondary={item?.selected && item.selected == 'yes'}
            /* informe={modal?.selected && modal.selected == 'yes'} */
            iconName={model?.selected && model.selected == 'yes' ? 'Fingerprint' : false}
            iconColor={themeContext.primary.main} 
            iconPosition='right'
            onPress={()=>onAnswer('yes')}
            scale={0.65*windowHeight/1000+0.23}
            elevation={true}
            text='SIM'
            />
          <ButtonInitial
            secondary={item?.selected && item.selected == 'no' ? true : false}
            iconName={model?.selected && model.selected == 'no' ? 'Fingerprint' : false}
            onPress={()=>onAnswer('no')}
            scale={0.65*windowHeight/1000+0.23}
            elevation={true}
            text='NÃO'
            />
          <ButtonInitial
            secondary={item?.selected && item.selected == 'na' ? true : false}
            iconName={model?.selected && model.selected == 'na' ? 'Fingerprint' : false}
            onPress={()=>onAnswer('na')}
            scale={0.65*windowHeight/1000+0.23}
            elevation={true}
            text='N.A.'
          />
          {item?.parent &&
          <View style={{width:100}}>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingTop:10,paddingBottom:10,marginBottom:5}} onPress={()=>onAnswer('goBack')}>
              <Icons name={'ArrowBack'} color={themeContext.text.third} size={18}/>
              <TextProgress>Voltar</TextProgress>
            </TouchableOpacity>
          </View>
          }
        </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'flex-start',marginHorizontal:15}}>
        <View style={{flexDirection:'row',flex:1}}>
          <IconButton
            iconName='Camera'
            onPress={()=>onAnimatedFlip(-180)}
            style={{marginRight:5}}
            warn={''}
            info={''}
            color={themeContext.text.third}
          />
          <IconButton
            iconName='Doc'
            onPress={()=>onAnimatedFlip(180)}
            style={{marginRight:5}}
            color={themeContext.text.third}
          />
        </View>
        <IconButton
            iconName='Warn'
            onPress={() => sheetRef.current.snapTo(1)}
            style={{marginRight:-5}}
            color={themeContext.text.third}
          />
      </View>
      </View>

  )
}
