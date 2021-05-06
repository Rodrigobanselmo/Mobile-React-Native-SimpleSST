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
import clone from 'clone';

import { TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native-gesture-handler';

const Circle = styled(View)`
  height: 20px;
  width: 20px;
  border: 1px solid ${({theme})=>theme.background.line};
  background-color: ${({theme,active})=>!active?theme.background.paper:theme.primary.lighter};
  border-radius:20px;
  margin-right:10px;
  opacity:0.7;
  elevation:2;
`;


const Group = styled.Text`
  color: ${({theme})=>theme.text.secondary};
  font-size:15px;
  flex:1;
`;


const ContainerGroup = styled.TouchableOpacity`
  justify-content:center;
  border: 2px solid ${({theme})=>theme.background.line};
  align-items: center;
  flex-direction: row;
  padding: 10px 5px 10px 10px;
  background-color: ${({theme})=>theme.background.paper};
  margin-bottom:8px;
  border-radius:10px;
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


export function CardCheckList({isMother,activeIndex,groupIndex,setactiveSlide,item,group,groupId,onAnimatedFlip,index,data,dispatch,model,answer,sheetRef}) {

  const windowHeight = Dimensions.get('window').height
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const risk = useSelector(state => state.risk);
  const riskAnswer = useSelector(state => state.riskAnswer);
  const answers = useSelector(state => state.answer);
  const checklist = useSelector(state => state.checklist);
  
  
  function onAnswer(peek,selected) {
    //console.log(item.action[peek])
    //item.action[peek].data.map(i=>console.log('i.risk',i.risk))
    
    function setAnswer() {
      var newAnswer = {groupId:groupId,questionId:item.id,selected:peek}
      var list = [...answers]
      list = clone(list)

      var indexAnswer = list.findIndex(i=>i.groupId == groupId&&i.questionId == item.id)
      if (indexAnswer != -1) {
          if (list[indexAnswer]?.selected == peek) { //selecionar reposta ja selecionada
              //list.splice(indexAnswer, 1);
              if (list[indexAnswer].selected) delete list[indexAnswer]['selected']
          } else { //selecionar outra resposta
              list[indexAnswer] = {...list[indexAnswer],...newAnswer}
          }
      } else { //nenhum selecionada
          list.push({...newAnswer})
      }
      return [...list];
    }

    function onJumpData() {
      return checklist.data[groupIndex]?.jump ?checklist.data[groupIndex].jump:[]
    }
  
    function filterJump() {
      var newData = [...data]
      newData = clone(newData)
      var mother = false

      const newAnswers = [...setAnswer()]
      newData.filter(i=>(i?.mother || i?.subMother)).map(i=>{
            if (newAnswers.findIndex(fi=>fi.questionId==i.id) == -1 || (newAnswers.findIndex(fi=>fi.questionId==i.id) != -1 && !newAnswers[newAnswers.findIndex(fi=>fi.questionId==i.id)]?.selected)) mother = true
        })
      if (mother) newData = [...data.filter(i=>i?.mother || i?.subMother)]
      else {
        onJumpData().map(i=>{
          const ansInd = newAnswers.findIndex(fi=>fi.questionId==i.questionId)
          if (ansInd == -1 || (newAnswers[ansInd] && (newAnswers[ansInd].selected == i.selected || !newAnswers[ansInd].selected || (Array.isArray(newAnswers[ansInd].selected) && newAnswers[ansInd].selected.includes(i.selected))))) {
            if (i?.g && i.g.length > 0) newData = [...newData.filter(fi=>fi.id==i.questionId||!i.g.includes(fi.group))]
            if (i?.q && i.q.length > 0) newData = [...newData.filter(fi=>!i.q.includes(fi.id))]
          }
        })
      }
      return [...newData]
    }

    function filterExcludeJump() {
      const array = [];
      const arrayAll = [];
      const jump = [];
      filterJump().map((item)=>{
        jump.push(item.id)
      })
      data.map(itm=>{
        if (!jump.includes(itm.id)) {
          array.push(itm.id)
          arrayAll.push(itm)
        }
      })
      return [array,arrayAll]
    }

    function onGoBack() {
      if (peek === 'goBack') {
        if (isMother || ( item?.mother|| item?.subMother)) setactiveSlide(0)
        dispatch({type: 'CHECKLIST_BACK',payload:{itemId:item.id,groupId,parentId:item.parent}})
        dispatch({type: 'ANSWER_CLEAN_PARENT',payload:{parentId:item.parent,groupId,itemId:item.id}})
      }
    }

      function onChild() {
        if (item.action[peek]?.child) {
          dispatch({type: 'CHECKLIST_CHILD',payload:{peek,itemId:item.id,groupId,childId:item.action[peek].child}})
        }
      }

      function openSheet(remove) {
        if (!(item.action[peek]?.data && item.action[peek].data.length > 0)) return 

        function onChooseRisk({modalData,back,sheetOpen}) {
          if (modalData.length == 0) {
            if (remove) {
              remove()
              if (sheetOpen) sheetRef.current.snapTo(1)
              dispatch({type: 'CHOOSE_MULT_RISK_ANSWER',payload:back})
              item.action[peek].data.map(i=>{
                if (riskAnswer.risks[i.risk]) {
                  dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
                }
              })
              return
            }
            if (sheetOpen) sheetRef.current.snapTo(1)
            dispatch({type: 'CHOOSE_MULT_RISK_ANSWER',payload:back})
            dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId}})//item == {action:{},id:'',parent?,hide?,... }
            dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
            item.action[peek].data.map(i=>{
              if (riskAnswer.risks[i.risk]) {
                dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
              }
            })
            onChild()
            return
          }
          const MODAL_DATA = [...modalData]
          const Value = MODAL_DATA[0]
          MODAL_DATA.splice(0,1)

          console.log(!!riskAnswer.risks[Value.item.risk]) 
          if (!!riskAnswer.risks[Value.item.risk]) {
            const callback = {item:Value.item,data:{},answer:{selected:peek,questionId:item.id,groupId}}
            onChooseRisk({sheetOpen,modalData:MODAL_DATA,back:back?[...back,callback]:[callback]})
            return
          }
          setTimeout(() => {
            reactModal.alert({
              confirmButton:'Adicionar',
              optionHide:true,
              childrenComponent:(onConfirm,onClose)=>Modal(Value.fator,Value.item,onClose,{selected:peek,questionId:item.id,groupId},riskAnswer,dispatch,(callback)=>onChooseRisk({sheetOpen,modalData:MODAL_DATA,back:back?[...back,callback]:[callback]}),true,{...item}),
              onConfirm:()=>{},
            })
          }, 400);
        }
        
        const modalData = []
        item.action[peek].data.map(i=>{
          if (i.man) modalData.push({fator:risk[i.risk]?.name,item:i})
        })
        if (modalData.length > 0) {
          onChooseRisk({modalData,sheetOpen:modalData.length != item.action[peek].data.length})
        } else {
          item.action[peek].data.map(i=>{
            if (riskAnswer.risks[i.risk]) {
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
            }
          })
          sheetRef.current.snapTo(1)
        }
      }

      function removeAnswer(type) {
        function onConfirm() {
          const jumpEx = filterExcludeJump()
          console.log('jumpEx[0]',jumpEx[0])
          if (type.includes('openSheet') && item.action[peek].data && item.action[peek].data.filter(i=>i.man).length > 0) {
            openSheet(()=>{
              dispatch({type: 'REMOVE_RISK_ANSWER',payload:{questionId:[item.id,...jumpEx[0]]}})
              dispatch({type: 'REMOVE_CHECKLIST_CHILD',payload:{groupId,questionId:[...jumpEx[1]]}})
              dispatch({type: 'ANSWER_REMOVE',payload:[...jumpEx[0]]})
              dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId}})
              dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
              if (type.includes('onChild')) onChild()
              if (isMother || ( item?.mother|| item?.subMother)) setactiveSlide(0)
            })
            return
          }
          
          if (isMother|| ( item?.mother|| item?.subMother)) setactiveSlide(0)
          dispatch({type: 'REMOVE_RISK_ANSWER',payload:{questionId:[item.id,...jumpEx[0]]}})
          dispatch({type: 'REMOVE_CHECKLIST_CHILD',payload:{groupId,questionId:[...jumpEx[1]]}})
          dispatch({type: 'ANSWER_REMOVE',payload:[...jumpEx[0]]})
          dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId}})
          dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
          if (type.includes('openSheet')) openSheet()
          if (type.includes('onChild')) onChild()
        }

        reactModal.alert({
          title:'Remover Pergunta',
          text:`Você tem certeza que deseza mudar sua resposta, isso irá causar a perda dos dados adicionados á ela?`,
          confirmButton:'Mudar',
          warn:true,
          option:true,
          onConfirm:onConfirm,
        })
      }

      function removeGoBack() {
        
        function onConfirm() {
          const jumpEx = filterExcludeJump()
          //console.log('teste3',filterJump() == data)
          console.log('filterExcludeJump',jumpEx[0])
          dispatch({type: 'ANSWER_REMOVE',payload:jumpEx[0]})
          dispatch({type: 'REMOVE_CHECKLIST_CHILD',payload:{groupId,questionId:[...jumpEx[1]]}})
          dispatch({type: 'REMOVE_RISK_ANSWER',payload:{questionId:[item.id,...jumpEx[0]],parentId:item.parent}})
          onGoBack()
        }

        reactModal.alert({
          title:'Remover Pergunta',
          text:`Você tem certeza que deseza mudar sua resposta, isso irá causar a perda dos dados adicionados á ela?`,
          confirmButton:'Mudar',
          warn:true,
          option:true,
          onConfirm:onConfirm,
        })
      }

      const answerIndex = answers.findIndex(i=>i.questionId==item.id) 

      if (peek === 'goBack') { 
        if (answerIndex == -1 || (answers[answerIndex] && !answers[answerIndex].selected)) removeGoBack('remove')
        else removeGoBack()

      } else if (answerIndex == -1 || (answers[answerIndex] && !answers[answerIndex].selected)) { // nenhuma respondida
        if (item.action[peek].data && item.action[peek].data.filter(i=>i.man).length > 0) {
          openSheet()
          return
        }
        if (!item.action[peek]?.child && (!isMother || !( item?.mother|| item?.subMother))) setactiveSlide(activeIndex+1)
        dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId}})
        dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
        onChild()
        openSheet()
        //console.log('primeira vez respondendo')
      } else if ((answers[answerIndex] && answers[answerIndex].selected) && !(answers[answerIndex] && answers[answerIndex].selected == peek)) { // se nao for mesma resposta
        removeAnswer(['onChild','openSheet'])
        //console.log('trocando resposta')
      } else if (answers[answerIndex] && answers[answerIndex].selected == peek) { //se for mesma resposta
        removeAnswer([])
        //console.log('retirando resposta')
      }
  }

  function onAnswerMult(peek) {

    function setAnswer() {
      var newAnswer = {groupId:groupId,questionId:item.id,selected:[peek]}
      var list = [...answers]
      list = clone(list)

      var indexAnswer = list.findIndex(i=>i.groupId == groupId&&i.questionId == item.id)
      if (indexAnswer != -1) {
        if (list[indexAnswer]?.selected && list[indexAnswer].selected.includes(peek)) { //selecionar reposta ja selecionada
          list[indexAnswer].selected = [...list[indexAnswer].selected.filter(i=>i != peek)]
          if (list[indexAnswer].selected.length == 0) delete list[indexAnswer]['selected']
          } else if (list[indexAnswer]?.selected) { //selecionar outra resposta
              list[indexAnswer].selected = [...list[indexAnswer].selected,peek]
          }
      } else { //nenhum selecionada
          list.push({...newAnswer})
      }
      return [...list];
    }

    function onJumpData() {
      return checklist.data[groupIndex]?.jump ?checklist.data[groupIndex].jump:[]
    }
  
    function filterJump() {
      var newData = [...data]
      newData = clone(newData)
      var mother = false

      const newAnswers = [...setAnswer()]
      newData.filter(i=>(i?.mother || i?.subMother)).map(i=>{
            if (newAnswers.findIndex(fi=>fi.questionId==i.id) == -1 || (newAnswers.findIndex(fi=>fi.questionId==i.id) != -1 && !newAnswers[newAnswers.findIndex(fi=>fi.questionId==i.id)]?.selected)) mother = true
        })
      if (mother) newData = [...data.filter(i=>i?.mother || i?.subMother)]
      else {
        onJumpData().map(i=>{
          const ansInd = newAnswers.findIndex(fi=>fi.questionId==i.questionId)
          if (ansInd == -1 || (newAnswers[ansInd] && (newAnswers[ansInd].selected == i.selected || !newAnswers[ansInd].selected || (Array.isArray(newAnswers[ansInd].selected) && newAnswers[ansInd].selected.includes(i.selected))))) {
            if (i?.g && i.g.length > 0) newData = [...newData.filter(fi=>fi.id==i.questionId||!i.g.includes(fi.group))]
            if (i?.q && i.q.length > 0) newData = [...newData.filter(fi=>!i.q.includes(fi.id))]
          }
        })
      }
      return [...newData]
    }
    

    function filterExcludeJump() {
      const array = [];
      const arrayAll = [];
      const jump = [];
      filterJump().map((item)=>{
        jump.push(item.id)
      })
      data.map(itm=>{
        if (!jump.includes(itm.id)) {
          array.push(itm.id)
          arrayAll.push(itm)
        }
      })
      return [array,arrayAll]
    }


      function openSheet() {
        if (!(item.action[peek]?.data && item.action[peek].data.length > 0)) return 

        function onChooseRisk({modalData,back,sheetOpen}) {
          if (modalData.length == 0) {
            if (sheetOpen) sheetRef.current.snapTo(1)
            dispatch({type: 'CHOOSE_MULT_RISK_ANSWER',payload:back})
            dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId}})//item == {action:{},id:'',parent?,hide?,... }
            dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
            item.action[peek].data.map(i=>{
              if (riskAnswer.risks[i.risk]) {
                dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,man:true,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
              }
            })
            return
          }
          const MODAL_DATA = [...modalData]
          const Value = MODAL_DATA[0]
          MODAL_DATA.splice(0,1)

          //if (&& !riskAnswer.risks[MODAL_DATA.item.risk]) 
          console.log(!!riskAnswer.risks[Value.item.risk]) 
          if (!!riskAnswer.risks[Value.item.risk]) {
            const callback = {item:Value.item,data:{},answer:{selected:peek,questionId:item.id,groupId}}
            onChooseRisk({sheetOpen,modalData:MODAL_DATA,back:back?[...back,callback]:[callback]})
            return
          }
          setTimeout(() => {
            reactModal.alert({
              confirmButton:'Adicionar',
              optionHide:true,
              childrenComponent:(onConfirm,onClose)=>Modal(Value.fator,Value.item,onClose,{selected:peek,questionId:item.id,groupId},riskAnswer,dispatch,(callback)=>onChooseRisk({sheetOpen,modalData:MODAL_DATA,back:back?[...back,callback]:[callback]}),true,{...item}),
              onConfirm:()=>{},
            })
          }, 400);
        }
        
        const modalData = []
        item.action[peek].data.map(i=>{
          if (i.man) modalData.push({fator:risk[i.risk]?.name,item:i})
        })
        if (modalData.length > 0) {
          onChooseRisk({modalData,sheetOpen:modalData.length != item.action[peek].data.length})
        } else {
          item.action[peek].data.map(i=>{
            if (riskAnswer.risks[i.risk]) {
              dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item:i,data:{},answer:{selected:peek,questionId:item.id,groupId}}})
            }
          })
          sheetRef.current.snapTo(1)
        }
      }

      function removeAnswer(type) {
        const jumpEx = filterExcludeJump()
        function onConfirm() {
          if (isMother|| ( item?.mother|| item?.subMother)) setactiveSlide(0)
          dispatch({type: 'REMOVE_RISK_ANSWER',payload:{questionId:[...jumpEx[0]]}})
          dispatch({type: 'REMOVE_RISK_ANSWER_MULT',payload:{questionId:item.id,peek}})
          dispatch({type: 'REMOVE_CHECKLIST_CHILD',payload:{groupId,questionId:[...jumpEx[1]]}})
          dispatch({type: 'ANSWER_REMOVE',payload:jumpEx[0]})
          dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId}})
          dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
          if (type.includes('openSheet')) openSheet()
        }

        if (type.includes('openSheet')) {
          onConfirm()
          return
        }

        reactModal.alert({
          title:'Remover Pergunta',
          text:`Você tem certeza que deseza mudar sua resposta, isso irá causar a perda dos dados adicionados á ela?`,
          confirmButton:'Mudar',
          warn:true,
          option:true,
          onConfirm:onConfirm,
        })
      }

      const answerIndex = answers.findIndex(i=>i.questionId==item.id) 

      if (answerIndex == -1 || (answers[answerIndex] && !answers[answerIndex].selected)) { // nenhuma respondida
        if (item.action[peek].data && item.action[peek].data.filter(i=>i.man).length > 0) {
          openSheet()
          return
        }

        dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId}})
        dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
        openSheet()
        //console.log('primeira vez respondendo')
      } else if ((answers[answerIndex] && answers[answerIndex].selected) && !(answers[answerIndex] && answers[answerIndex].selected &&  answers[answerIndex].selected.includes(peek))) { // se nao for mesma resposta
        if (item.action[peek].data && item.action[peek].data.filter(i=>i.man).length > 0) {
          openSheet()
          return
        }
        dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item,peek,groupId}})
        dispatch({type: 'ANSWER_MULT',payload:{peek,itemId:item.id,groupId}})
        openSheet()
        //console.log(' resposta (escolher outra)')
      } else if (answers[answerIndex] && answers[answerIndex].selected &&  answers[answerIndex].selected.includes(peek)) { //se for mesma resposta
        removeAnswer([])
        //console.log('retirando resposta')
      }
  }

  function later() {
    dispatch({type: 'ANSWER_LATER',payload:{itemId:item.id,groupId}})
  }

  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%',flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15}}>
          <TextGroup ellipsizeMode={'tail'} numberOfLines={1} >{item?.group ?? 'Geral'}</TextGroup>
          {!isMother&&<TextProgress>{`${data.findIndex(i=>i.id == item.id)+1}/${data.length}`}</TextProgress>}
      </View>
      <View style={{flex:1,overflow:'visible'}}>
        <ViewTextContent windowHeight={windowHeight} style={{elevation:5}}>
          <TextQuestion animation="fadeIn" duration={1000} windowHeight={windowHeight} >{item.text}</TextQuestion>
        </ViewTextContent>
        <View style={{flex:1,justifyContent:'flex-start',marginHorizontal:20}}>
          {item.type == 'mult' ? 
            Object.keys(item.action).sort(Ascendent).map((key,indexKey)=>{
              return ( 
                <ContainerGroup key={key} activeOpacity={0.7} onPress={()=>onAnswerMult(key)}>
                  <Circle active={answer?.selected && Array.isArray(answer.selected) && answer.selected.includes(key)}/>
                  <Group >{item.action[key].text}</Group>
                  {model?.selected && Array.isArray(model.selected) && model.selected.includes(key) && <Icons name={'Fingerprint'} size={25} color={themeContext.primary.lighter} />}
                </ContainerGroup>
              )
            })
          :
            Object.keys(item.action).sort(Ascendent).map((key,indexKey)=>{
              return ( 
                <ButtonInitial
                  key={key}
                  secondary={answer?.selected && answer.selected == key}
                  /* informe={modal?.selected && modal.selected == 'yes'} */
                  iconName={model?.selected && model.selected == key ? 'Fingerprint' : false}
                  iconColor={themeContext.primary.main} 
                  iconPosition='right'
                  onPress={()=>onAnswer(key,item?.selected)}
                  scale={0.65*windowHeight/1000+0.23}
                  elevation={true}
                  text={item.action[key].text}
                />
              )
            })
          }

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
      </ScrollView>

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
          <IconButton
            iconName={answer?.later?'QuestionFill':'Question'}
            scale={1.15}
            onPress={later}
            style={{marginRight:5,marginTop:-2,opacity:answer?.later?0.9:1}}
            color={answer?.later?themeContext.primary.lighter:themeContext.text.third}
          />
        </View>
        {item?.subText &&
          <IconButton
            iconName='Info'
            iconProps={{size:1.15*25}}
            onPress={() => reactModal.alert({text:item.subText,title:'Informação Adicional',warn:false})}
            style={{marginRight:-5}}
            color={themeContext.text.third}
          />
        }
      </View>
      </View>

  )
}
