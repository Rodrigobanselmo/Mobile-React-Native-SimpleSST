import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image ,StatusBar,Animated, SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';
import {Header} from '../../../components/basicComponents/Header';
import {InputSearch} from '../../../components/basicComponents/InputSearch';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import {InputInitial} from '../../../components/basicComponents/Input';
import styled, {ThemeContext} from "styled-components/native";
import { TextInputMask } from 'react-native-masked-text'
import {useReactModal} from '../../../context/ModalContext'
import { useSelector, useDispatch } from 'react-redux';
import {onSaveChecklist,onDeleChecklist} from './func'
import {Container,ComponentView,TextArea,TextTitle,TextAdd,TextAreaShow,TextInfo,TouchableOpacityAdd} from './style'
import Icons from '../../../components/Icons'


export default ({navigation}) => {

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const checklist = useSelector(state => state.checklist);
  const answer = useSelector(state => state.answer);
  const employeeChosen = useSelector(state => state.employeeChosen);
  const obs = useSelector(state => state.obs);
  const photo = useSelector(state => state.photo);
  const riskAnswer = useSelector(state => state.riskAnswer);
  const riskPosition = useSelector(state => state.riskPosition);
  const model = useSelector(state => state.model);
  const header = useSelector(state => state.header);
  const company = useSelector(state => state.company);

  const [editing, setEditing] = useState('')
  const [data, setData] = useState(checklist.name)
  // useEffect(() => {
  //   onGetAllCompanies({setData,user,reactModal,navigation})
  // }, [])

  console.log(riskAnswer)

  function Jump(item,index) {
    const dataFilterHide = [...item.questions.filter(i=>!(i?.hide&&i.hide))]
    
    function onJumpData() { 
      return item?.jump ? item.jump : []
    }

    function jumpData() {
      var mother = false
      var newData = []
      dataFilterHide.filter(i=>(i?.mother || i?.subMother)).map(i=>{
          if (answer.findIndex(fi=>fi.questionId==i.id) == -1 || (answer.findIndex(fi=>fi.questionId==i.id) != -1 && !answer[answer.findIndex(fi=>fi.questionId==i.id)]?.selected)) mother = true
      })
      if (mother) {newData = []}
      else {
        onJumpData().map(i=>{
          const ansInd = answer.findIndex(fi=>fi.questionId==i.questionId)
          if (ansInd != -1 ) console.log(answer[ansInd].selected)
          if (ansInd != -1 && (answer[ansInd].selected == i.selected ||  (Array.isArray(answer[ansInd].selected) && answer[ansInd].selected.includes(i.selected)))) {
            if (i?.g && i.g.length > 0) newData.push(...dataFilterHide.filter(fi=>fi.id!=i.questionId&&i.g.includes(fi.group)))  //= [...newData.filter(fi=>fi.id!=i.questionId&&i.g.includes(fi.group))]
            if (i?.q && i.q.length > 0) newData.push(...newData.filter(fi=>i.q.includes(fi.id)))
          }
        })
      }

      const total = dataFilterHide.length
      const selected = answer.filter((i,idx)=>i?.selected && dataFilterHide.findIndex(fi=>fi.id == i.questionId) != -1 && answer.findIndex(fi=>fi.questionId == i.questionId) == idx).length

      return {total,selected,jump:[...newData].length}
    }

    return jumpData()
  }

  function onPercentage() {
    var percentage = {total:0,jump:0,selected:0}
    checklist.data.map((item,index)=>{
      const value = Jump(item,index)
      percentage.total = percentage.total + value.total
      percentage.jump = percentage.jump + value.jump
      percentage.selected = percentage.selected + value.selected
    })
    return percentage
  }

  function SaveChecklist() {
    const allData ={
      answer,obs,photo,riskAnswer,riskPosition,header,model,company,employeeChosen
    }
    //console.log(checklist)
    onSaveChecklist({checklist:checklist,percentage:onPercentage(),allData:allData,user,reactModal,navigation,dispatch})
  }

  function onDelete() {
    function onConfirm() {
      onDeleChecklist({checklist,user,reactModal,navigation,dispatch})
    }
    
    reactModal.alert({
      title:'Deletar Checklist',
      text:`Você tem certeza que deseza deletar o checklist, essa ação é irreversível?`,
      confirmButton:'Deletar',
      warn:true,
      option:true,
      onConfirm:onConfirm,
    })
  }

  function onEndEditing() {
    if(data.length == 0) return setData(editing)
    setEditing('')
    dispatch({type: 'NAME_CHECKLIST',payload:data})
    //navigation.navigate('Card')
    //onSetNewChecklist({checklist,data,user,reactModal,navigation,dispatch})
  }

  return (
    <Container >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      <Header secondScreenName={'CardMain'} secondIconProps={{name:'Close'}} secondIcon text='Novo Checklist' navigation={navigation} style={{marginBottom:8}}/>
      {/* <Header secondScreenName={'CardMain'} secondIconProps={{name:'Board'}} secondIcon text='Novo Checklist' navigation={navigation} style={{marginBottom:8}}/> */}
      <ComponentView
        contentContainerStyle={{ flexGrow: 1,justifyContent:'space-between'}}
      >
        <TextTitle>Nome</TextTitle>
        {!editing ?
          <TextAreaShow onPress={()=>setEditing(data)}>{data}</TextAreaShow>
        :
          <TextArea
            placeholder={`Nome do checklist...`}
            autoFocus={true}
            value={data}
            autoCapitalize="words"
            onChangeText={(value)=>setData(value)}
            returnKeyType={'done'}
            onEndEditing={onEndEditing}
            blurOnSubmit={true}
            multiline={false}
          />
        }
        <TextTitle>Modelo Geral</TextTitle>
        <TextInfo>{checklist?.title}</TextInfo>
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
          <TextTitle>Modelo Epecífico</TextTitle>
          {checklist?.model &&
            <TouchableOpacity>
              <Icons style={{paddingRight:20,paddingLeft:20}} name='Edit' size={20} color={themeContext.text.third} />
            </TouchableOpacity>
          }
        </View>
        {checklist?.model ?
          <TextInfo>{checklist?.model}</TextInfo>
        :
          <TouchableOpacityAdd>
            <TextAdd>Adicionar Modelo</TextAdd>
          </TouchableOpacityAdd>
        }
        {!checklist.cnpj ?
          <>
            <TextTitle>Empresa</TextTitle>
            <TouchableOpacityAdd onPress={onPercentage}>
              <TextAdd>Adicionar Empresa</TextAdd>
            </TouchableOpacityAdd>
          </>
        :
          <>
            <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
              <TextTitle>CNPJ</TextTitle>
              {/* <TouchableOpacity>
                <Icons style={{paddingRight:20,paddingLeft:20}} name='Edit' size={20} color={themeContext.text.third} />
              </TouchableOpacity> */}
            </View>
            <TextInfo>{checklist?.cnpj ?? '00/00000-0000-00'}</TextInfo>
            <TextTitle>Indentificação</TextTitle>
            <TextInfo>{checklist?.companyName ?? 'O Nome da EMpresa ë o que Voce quer que seja'}</TextInfo>
            <TextTitle>Direcionamento</TextTitle>
            <TouchableOpacityAdd edit>
              <TextAdd>Setores e Cargo</TextAdd>
            </TouchableOpacityAdd>
          </>
        }
        <View>
        <ButtonInitial
          secondary={true}
          disabledButton={data.length>0?false:true}
          style={{marginBottom:0,marginHorizontal:20,}}
          onPress={SaveChecklist}
          scale={0.7}
          elevation={false}
          text='SALVAR'
        />
        <ButtonInitial
          secondary={true}
          disabledButton={data.length>0?false:true}
          style={{marginBottom:30,marginHorizontal:20,backgroundColor:'transparent' ,borderRadius:10,borderColor:themeContext.text.fourth,borderWidth:1}}
          onPress={onDelete}
          textStyle={{color:themeContext.text.fourth}}
          scale={0.7}
          elevation={false}
          text='DELETAR'
        />
        </View>
      </ComponentView>
    </Container>
  );
}
