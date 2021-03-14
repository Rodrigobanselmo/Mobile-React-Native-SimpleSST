/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar,Dimensions, Text,Animated,View, ScrollView} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import changenavigationBarColor from 'react-native-navigation-bar-color';
import Card from './comp'
import {v4} from "uuid";
import { useSelector, useDispatch } from 'react-redux';


const CheckListData = 
{title:"PGR",id:'1',data:[
  {group:'Limpeza e organização do local de trabalho',id:'1',questions:[
    {action:{yes:{rec:''},no:{child:'1.1.1'},na:0},text:'Os trabalhadores, aastância químicas perigosas, recebem treinamento quanto aos riscos que estas substâncias representaram para a saúde e quanto às formas seguras de manipulação?',id:'1.1'},
    {action:{yes:{rec:''},no:{child:'1.1.2'},na:0},hide:true,parent:'1.1',text:'Os trabalhadores, aastância químicas perigosas, recebem treinamento quanto aos riscos que estas substâncias representaram para a saúde e quanto às formas seguras de manipulação?',id:'1.1.1'},
    {action:{yes:{risk:'1'},no:0,na:0},hide:true,parent:'1.1.1',text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'1.1.2'},
    {action:{yes:0,no:0,na:0},text:'Os trabalhadores, que lidam com substância químicas perigosas, recebem treinamento quanto aos riscos que estas substâncias representaram para a saúde e quanto às formas seguras de manipulação.',id:'1.2'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:'1.3'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4()},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4()},
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


export default function App({navigation}) {

  //changenavigationBarColor('#0d0d0d', false)

  const answers = useSelector(state => state.answer);
  const model = useSelector(state => state.model);
  const title = answers?.title ?? 'Checklist'
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(model,model.length);
    !answers?.data && dispatch({type: 'CREATE_CHECKLIST',payload:CheckListData})
    !(model.length > 0 ) && dispatch({type: 'CREATE_MODEL',payload:CHECK_LIST_MODEL})
  }, [])
  
  return (
    <Card navigation={navigation} title={title}>
        {answers?.data && <Card.Component CHECK_LIST_MODEL={model} CheckListData={answers} dispatch={dispatch}/>}
    </Card>

  );
}
