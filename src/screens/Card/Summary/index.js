/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {SafeAreaView, StyleSheet,StatusBar,Dimensions, Text,Animated,View, ScrollView} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import changenavigationBarColor from 'react-native-navigation-bar-color';
import Summary from './comp'
import {v4} from "uuid";
import { useSelector, useDispatch } from 'react-redux';
import {ThemeContext} from "styled-components/native";
import {onChange} from './func';

export default function App({navigation}) {

  //changenavigationBarColor('#0d0d0d', false)

  const themeContext = useContext(ThemeContext);
  const checklist = useSelector(state => state.checklist);
  //const dispatch = useDispatch();

  return (
    <Summary navigation={navigation}>
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      {/* <Summary.Info/> */}
      {checklist &&
        <Summary.Data navigation={navigation}/>
      }
    </Summary>
  );
}
