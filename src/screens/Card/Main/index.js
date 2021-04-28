/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar,Dimensions, Text,Animated,View, ScrollView} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import changenavigationBarColor from 'react-native-navigation-bar-color';
import Card from './comp'
import {onAddPhotoToStorage,onDeletePhotoFromStorage,onGetAllRisks,onAddRisks} from './func'
import {v4} from "uuid";
import { useSelector, useDispatch } from 'react-redux';


const CheckListData = 
{title:"PGR",id:'1',company:'cnpj',worker:{cargo:'',setor:'',cargoDev:'',setorDev:''},data:[
  {group:'Limpeza e organização do local de trabalho',id:'1',questions:[
    {action:{yes:{risk:['00pni63vqr80','01bupfskpjo0']},no:0,na:0},text:'As seções (Setores/Áreas/Departamentos) e os processos estão localizados de forma a facilitar o trabalho?',id:'1.2'},
    {action:{yes:{risk:['02c569a8-c8f8-47fc-9196-4dd48e7af63b','2180bdbb-189f-4acb-be14-752504d665d4','e612ad98-82f4-49e8-9d77-609d3f679af4']},no:0,na:0},text:'O espaço entre as máquinas é adequado?',id:'1.3'},
    {action:{yes:{risk:['e612ad98-82f4-49e8-9d77-609d3f679af4']},no:0,na:0},text:'A ordem e arrumação são mantidas conforme os planos traçados?',id:v4()},
    {action:{yes:{risk:['80a73b57-ea8d-4502-a04e-fdea9c4ffbbc']},no:0,na:0},text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos?',id:v4()},
    {action:{yes:{rec:''},no:{child:'1.1.1'},na:0},text:'',id:'1.1'},
    {action:{yes:{rec:''},no:{child:'1.1.2'},na:0},hide:true,parent:'1.1',text:'',id:'1.1.1'},
    {action:{yes:{risk:'1'},no:0,na:0},hide:true,parent:'1.1.1',text:'',id:'1.1.2'},
  ]},
  {group:'Ruído',id:'2',questions:[
    {action:{yes:{rec:''},no:{child:'2.1.1'},na:0},text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'2.1'},
    {action:{yes:{risk:'2'},no:0,na:0},parent:'2.1',text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'2.1.1'},
    {action:{yes:0,no:0,na:0},text:'Os trabalhadores, que lidam com substância químicas perigosas, recebem treinamento quanto aos riscos que estas substâncias representaram para a saúde e quanto às formas seguras de manipulação.',id:'2.2'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:'2.3'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4()},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4()},
  ]},
]}

const CHECK_LIST_MODEL = [
  {id:'1',groupId:'1',questionId:'1.1',selected:'yes',obs:'Aenean quam nunc, mattis necc mauris varius feugiat ut non velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat, eros at interdum congue, orci felis commodo sem, lacinia pulvinar nibh sapien sed sem. Mauris.'}
]

const RISK_FACTORS = [
  {id:'1',text:'Riscos 1',CA:{num:'',desc:''},generator:''}
]


export default function App({navigation,route}) {

  //changenavigationBarColor('#0d0d0d', false)
  const sheetRef = useRef(null);
  const reactModal = useReactModal();
  const themeContext = useContext(ThemeContext);

  const user = useSelector(state => state.user);
  const risk = useSelector(state => state.risk);
  const riskAnswer = useSelector(state => state.riskAnswer);
  const checklist = useSelector(state => state.checklist);
  const model = useSelector(state => state.model);
  const title = checklist?.title ?? 'Checklist'
  const dispatch = useDispatch();

  //console.log('risk',risk)

  useEffect(() => {
    !checklist?.data && dispatch({type: 'CREATE_CHECKLIST',payload:CheckListData})
    !(model?.length) && dispatch({type: 'CREATE_MODEL',payload:CHECK_LIST_MODEL})
    onGetAllRisks({user,reactModal,dispatch});
  }, [])

  function teste() {
    onAddRisks({user,reactModal,dispatch});
    //console.log(user);
  }
  
  return (
    <>
      <Card navigation={navigation} title={title}>
          {checklist?.data && <Card.Component onDeletePhotoFromStorage={onDeletePhotoFromStorage} onAddPhotoToStorage={onAddPhotoToStorage} sheetRef={sheetRef} route={route} CHECK_LIST_MODEL={model} CheckListData={checklist} dispatch={dispatch}/>}
      </Card>
      {checklist?.data && <Card.BottomSheet riskAnswer={riskAnswer} risk={risk} sheetRef={sheetRef} dispatch={dispatch}/>}
    </>

  );
}

//<Text style={{position:'absolute',zIndex:10000,padding:10,backgroundColor:'red',bottom:0}} onPress={()=>teste()}>swfrerefeerfrerfrer</Text>