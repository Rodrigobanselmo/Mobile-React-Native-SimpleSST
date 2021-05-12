import React, {useState,useContext,useRef,useEffect} from 'react';
import {Dimensions,Text,View,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import {Container,ContainerSafe,Circle,TextTitle,TextNum,ContainerCard} from './styles';




const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const MapAnswer = ({index,item,group}) => {
  return (
      <TouchableOpacity onPress={()=>navigation.navigate('CardMain',{groupId:group.id,cardIndex:index})} style={{width:(windowWidth-30)/4,justifyContent:'center',paddingVertical:7,marginBottom:10,alignItems:'center'}}>
        <TextNum style={{textAlign:'center'}}>{`${index+1}`}</TextNum>
        <Circle large fill={item?.confirmed ?? item?.selected ?? 'none'}/>
      </TouchableOpacity>
  )
};

export const MapData = ({item}) => {
  //console.log(item.id)
  return (
    <ContainerCard >
      <View style={{flexDirection:'row',alignItems:'center',paddingTop:6,paddingLeft:5,paddingBottom:4/* ,borderBottomColor:'#fff',borderBottomWidth:1 */}}>
        <TextTitle style={{marginHorizontal:20}}>{item.group}</TextTitle>
      </View>
      <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start',marginTop:10}}>
        {item.questions.filter(i=>!(i?.hide&&i.hide)).map((question,indexQuestion)=>{
          return (
            <MapAnswer key={question.id} index={indexQuestion} item={question} group={item} />
          )
        })}
      </View>
    </ContainerCard>
  )
};
