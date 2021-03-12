/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar,Dimensions, Text,Animated,View, ScrollView} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import changenavigationBarColor from 'react-native-navigation-bar-color';
import Card from './comp'
import {v4} from "uuid";
import { useSelector, useDispatch } from 'react-redux';





const RISK_FACTORS = [
  {id:'1',text:'Riscos 1',CA:{num:'',desc:''},generator:''}
]


export default function App() {

  changenavigationBarColor('#0d0d0d', false)

  const answers = useSelector(state => state.answer);
  const model = useSelector(state => state.model);
  const title = answers?.title ?? 'Checklist'
  const dispatch = useDispatch();

  useEffect(() => {
    !answers?.data && dispatch({type: 'CREATE_CHECKLIST',payload:CheckListData})
  }, [])


  return (
    <Card text={title}>
        {answers?.data && <Card.Component CHECK_LIST_MODEL={CHECK_LIST_MODEL} CheckListData={answers} dispatch={dispatch}/>}
    </Card>

  );
}
