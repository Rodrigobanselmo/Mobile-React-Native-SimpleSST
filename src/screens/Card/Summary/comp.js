import React, {useState,useContext,useRef,useEffect} from 'react';
import {Dimensions,Text,View,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import {Container,ContainerSafe,Circle,TextTitle,TextNum,ContainerCard} from './styles';
import { useSelector, useDispatch } from 'react-redux';



const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Summary({title,children,navigation, ...restProps }) {
  //const themeContext = useContext(ThemeContext);
  return (
        <ContainerSafe {...restProps}>
          <Header navigation={navigation} text={'Sumário'} type="Back"/>
            <Container>
              {children}
            </Container>
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


Summary.Data = function SummaryData({navigation}) {
  
  const checklist = useSelector(state => state.checklist);
  const answers = useSelector(state => state.answer);
  const dispatch = useDispatch();
  const reactModal = useReactModal();
  const themeContext = useContext(ThemeContext);

  const MapAnswer = ({index,item,group,realItems}) => {

    const inactive = realItems.findIndex(i=>i.id == item.id) == -1
    const answer = answers.filter(i=>(i.groupId === group.id && i.questionId === item.id))[0]

    function isSelected() {
      if (answer?.selected && Array.isArray(answer.selected) && answer.selected.length>0) return 'confirmed'
      if (answer?.selected) return 'confirmed'
      return 'none'
    }
    
    function onNavigate() {
      if (inactive) return reactModal.animated({type:'warn',text:'Pergunta inativa.'})

      dispatch({type:'SET_HEADER',payload:group.group})
      navigation.navigate('CardMain',{groupId:group.id,cardIndex:index+1})
    }

    return (
        <TouchableOpacity onPress={onNavigate} style={{width:(windowWidth-30)/4,justifyContent:'center',paddingVertical:7,marginBottom:10,alignItems:'center'}}>
          <TextNum style={{textAlign:'center'}}>{`${index+1}`}</TextNum>
          {answer?.later ?
           <Icons  name={isSelected() == 'confirmed' ? 'QuestionFill':'Question'} style={{marginTop:-5}} size={32} color={isSelected() == 'confirmed' ?themeContext.primary.lighter:themeContext.background.line} />
          :
            <Circle large inactive={inactive} fill={isSelected()}/>
          }
        </TouchableOpacity>
    )
  };
  
  const MapData = ({item}) => {

    function onJumpData() {
      return item?.jump ?item.jump:[]
    }
    console.log('answers',answers)
    function cardsData() {
      var mother = false
      var newData = [...item.questions.filter(i=>!(i?.hide&&i.hide))]
      newData.filter(i=>(i?.mother || i?.subMother)).map(i=>{
          if (answers.findIndex(fi=>fi.questionId==i.id) == -1 || (answers.findIndex(fi=>fi.questionId==i.id) != -1 && !answers[answers.findIndex(fi=>fi.questionId==i.id)]?.selected)) mother = true
      })
      if (mother) newData = [...newData.filter(i=>i?.mother || i?.subMother)]
      else {
        onJumpData().map(i=>{
          const ansInd = answers.findIndex(fi=>fi.questionId==i.questionId)
          if (ansInd == -1 || (answers[ansInd] && (answers[ansInd].selected == i.selected || !answers[ansInd].selected || (Array.isArray(answers[ansInd].selected) && answers[ansInd].selected.includes(i.selected))))) {
            if (i?.g && i.g.length > 0) newData = [...newData.filter(fi=>fi.id==i.questionId||!i.g.includes(fi.group))]
            if (i?.q && i.q.length > 0) newData = [...newData.filter(fi=>!i.q.includes(fi.id))]
          }
        })
      }
  
      const sortedObj = newData.sort((a, b) => {
        return (
          item.groups.indexOf(a.group) - item.groups.indexOf(b.group)
        );
      });
    
  
      return [...sortedObj]
    }

    console.log(item.id)
    return (
      <ContainerCard >
        <View style={{flexDirection:'row',alignItems:'center',paddingTop:6,paddingLeft:5,paddingBottom:4/* ,borderBottomColor:'#fff',borderBottomWidth:1 */}}>
          <TextTitle style={{marginHorizontal:20}}>{item.group}</TextTitle>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start',marginTop:10}}>
          {item.questions.filter(i=>!(i?.hide&&i.hide)).map((question,indexQuestion)=>{
            return (
              <MapAnswer realItems={cardsData()} key={question.id} index={indexQuestion} item={question} group={item} />
            )
          })}
        </View>
      </ContainerCard>
    )
  };

  return (
      <FlatList
        data={checklist.data}
        renderItem={MapData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
  );
}