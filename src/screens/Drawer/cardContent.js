/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar,Dimensions, Text,View, ScrollView} from 'react-native';
import {useReactModal} from '../../context/ModalContext'
import styled from "styled-components/native";
import {Header} from '../../components/basicComponents/Header';
import {v4} from "uuid";
import {ButtonInitial,IconButton,ButtonAnimated} from '../../components/basicComponents/Button';
import Icons from '../../components/Icons'

import { TouchableOpacity,TextInput,FlatList } from 'react-native-gesture-handler';

const TextQuestion = styled.Text`
  text-align:center;
  font-size:15px;
`;


const ViewTextContent = styled.View`
/*   background-color: ${({theme})=>theme.background.lineActive}; */
  background-color:#fff;
  padding:20px;
  margin:15px 15px;
  border-radius:10px;
`;


const TextGroup = styled.Text`
  width:75%;
  color: ${({theme})=>theme.text.third};
`;

const TextProgress = styled.Text`
  width:auto;
  color: ${({theme})=>theme.text.third};
`;



export function CheckList({item,group,groupId,onAnimatedFlip,index,data,dispatch}) {

  const windowHeight = Dimensions.get('window').height

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();

  function onAnswer(peek) {
    if (item.action[peek]?.child) {
      dispatch({type: 'ANSWER_CHILD',payload:{peek,itemId:item.id,groupId,childId:item.action[peek].child}})
    } else if (peek === 'goBack') {
      dispatch({type: 'ANSWER_BACK',payload:{itemId:item.id,groupId,parentId:item.parent}})
    } else {
      dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
    }
  }

  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15}}>
          <TextGroup ellipsizeMode={'tail'} numberOfLines={1} >{group}</TextGroup>
          <TextProgress>{`${index+1}/${data.length}`}</TextProgress>
      </View>
      <View style={{flex:1,overflow:'hidden'}}>
        <ViewTextContent style={{elevation:5}}>
          <TextQuestion style={{lineHeight:20}}>{item.text}</TextQuestion>
        </ViewTextContent>
        <View style={{flex:1,justifyContent:'flex-start',marginHorizontal:20}}>
          <ButtonInitial
            secondary={item?.selected && item.selected == 'yes' ? true : false}
            onPress={()=>onAnswer('yes')}
            scale={0.67}
            elevation={true}
            text='SIM'
            />
          <ButtonInitial
            secondary={item?.selected && item.selected == 'no' ? true : false}
            onPress={()=>onAnswer('no')}
            scale={0.67}
            elevation={true}
            text='NÃO'
            />
          <ButtonInitial
            secondary={item?.selected && item.selected == 'na' ? true : false}
            onPress={()=>onAnswer('na')}
            scale={0.67}
            elevation={true}
            text='N.A.'
          />
          {item?.parent &&
          <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingTop:10}} onPress={()=>onAnswer('goBack')}>
            <Icons name={'ArrowBack'} color={themeContext.text.third} size={18}/>
            <TextProgress>Voltar</TextProgress>
          </TouchableOpacity>
          }
        </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'flex-start',marginHorizontal:15}}>
        <View style={{flexDirection:'row',flex:1}}>
          <IconButton
            iconName='Camera'
            onPress={()=>onAnimatedFlip(180)}
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
            onPress={()=>onAnimatedFlip(180)}
            style={{marginRight:-5}}
            color={themeContext.text.third}
          />
      </View>
      </View>

  )
}

export function Observation({item,group,onAnimatedFlip,setValue,value,model}) {

  const windowHeight = Dimensions.get('window').height

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();

  function onChengeTextInput(value) {
    setValue(value)
  }
  function onConfirm(value) {
    setValue(model?.obs ?? '')
  }

  return (
    <View style={{flex: 1,paddingHorizontal:15,paddingVertical:10}}>
      <View>
        <View style={{flexDirection:'row',alignItems:'center'}} >
          <Icons style={{marginRight:5}} name={'Doc'} color={themeContext.text.third} size={20}/>
          <TextProgress >Observações</TextProgress>
        </View>
        <TextInput
          value={value}
          onChangeText={(value)=>{onChengeTextInput(value)}}
          placeholder="Faça uma observação"
          style={{flex: 1,paddingLeft: 10,color: themeContext.text.primary,backgroundColor:themeContext.background.paper,marginTop:10,borderRadius:10,height:200}}
          autoCapitalize="none"
          returnKeyType="next"
          textAlign="justify"
          numberOfLines={10}
          multiline={true}
          maxLength={300}
          textAlignVertical='top'
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} >
          <Icons style={{marginRight:5}} name={'Help'} color={themeContext.text.third} size={20}/>
          <TextProgress >Sugestões</TextProgress>
        </View>
        <View style={{flex: 1,marginTop:5}}>
          {model?.obs &&
          <TouchableOpacity onPress={()=>reactModal.alert({text:'Deseja reescrever suas observações pelo sugestão selecioanda?',warn:false,title:'Copiar Texto',onConfirm:onConfirm})}>
            <TextProgress>{model?.obs ?? ''}</TextProgress>
          </TouchableOpacity>
          }
        </View>
      </View>
      <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingTop:10}} onPress={()=>onAnimatedFlip(0)}>
        <Icons name={'ArrowBack'} color={themeContext.text.third} size={18}/>
        <TextProgress>Voltar</TextProgress>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({

  textInput: {flex: 1,paddingLeft: 10,color: '#000',},
});
