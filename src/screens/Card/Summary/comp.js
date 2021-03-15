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

Summary.Data = function SummaryData({answers,navigation}) {

  function MapAnswer({index,item,group}) {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('CardMain',{groupId:group.id,cardIndex:index})} style={{width:(windowWidth-30)/4,justifyContent:'center',paddingVertical:7,marginBottom:10,alignItems:'center'}}>
          <TextNum style={{textAlign:'center'}}>{`${index+1}`}</TextNum>
          <Circle large fill={item?.selected ?? 'none'}/>
        </TouchableOpacity>
    )
  }

  function MapData({item}) {
    return (
      <ContainerCard >
        <View style={{flexDirection:'row',alignItems:'center',paddingTop:6,paddingLeft:5,paddingBottom:4/* ,borderBottomColor:'#fff',borderBottomWidth:1 */}}>
{/*           <Circle large title>
            <TextNum  title >{`${index+1}`}</TextNum>
          </Circle> */}
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
  }

  return (
    <>
      {answers.data.map((item)=>{
        return (
          <MapData key={item.id} item={item}/>
        )
      })}
    </>
  );
}