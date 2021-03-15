import React, {useState,useContext,useRef,useEffect} from 'react';
import {Dimensions,Text,View,ScrollView,TouchableOpacity,Animated} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import {Container,ContainerSafe,Circle,TextTitle,TextNum,ContainerCard} from './styles';




const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Summary({title,children,navigation, ...restProps }) {
  //const themeContext = useContext(ThemeContext);
  return (
        <ContainerSafe {...restProps}>
          <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <Header navigation={navigation} text={'Sumário'} type="Back"/>
            <Container>
              {children}
            </Container>
          </ScrollView>
        </ContainerSafe>
    );
}

Summary.Info = function SummaryInfo() {

  return (
      <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
        <View style={{flexDirection:'row',alignItems:'center',marginRight:20}}>
          <Circle fill='yes'/>
          <Text>Sim</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',marginRight:20}}>
          <Circle fill='no'/>
          <Text>Não</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Circle fill='na'/>
          <Text>N.A.</Text>
        </View>
      </View>
  );
}

Summary.Data = function SummaryData({answers}) {

  function MapAnswer({index,item}) {
    return (
        <View style={{width:(windowWidth-30)/4,justifyContent:'center',paddingVertical:7,marginBottom:10,alignItems:'center'}}>
          <TextNum style={{textAlign:'center'}}>{`${index+1}`}</TextNum>
          <Circle large fill={item}/>
        </View>
    )
  }

  function MapData({index,item}) {
    return (
      <ContainerCard >
        <View style={{flexDirection:'row',alignItems:'center',paddingTop:6,paddingBottom:12/* ,borderBottomColor:'#fff',borderBottomWidth:1 */}}>
{/*           <Circle large title>
            <TextNum  title >{`${index+1}`}</TextNum>
          </Circle> */}
          <TextTitle style={{marginHorizontal:20}}>{item}</TextTitle>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start',marginTop:10}}>
          {['ok','pendding','pendding','ok','ok','ok','ok','none','none','none','none','none','none','none'].map((item,index)=>{
            return (
              <MapAnswer key={index} index={index} item={item}/>
            )
          })}
        </View>
      </ContainerCard>
    )
  }

  return (
    <>
      {answers.map((item,index)=>{
        return (
          <MapData key={index} index={index} item={item}/>
        )
      })}
    </>
  );
}