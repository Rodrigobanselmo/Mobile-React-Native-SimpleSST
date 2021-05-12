/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {SafeAreaView, StyleSheet,StatusBar,Dimensions, Text,Animated,View, ScrollView} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import changenavigationBarColor from 'react-native-navigation-bar-color';
import Employee from './comp'
import {v4} from "uuid";
import { useSelector, useDispatch } from 'react-redux';
import {ThemeContext} from "styled-components/native";
import {onChange} from './func';
import { LogBox } from 'react-native';


export default function App({navigation,route}) {

  //changenavigationBarColor('#0d0d0d', false)
  LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  ]);
  const themeContext = useContext(ThemeContext);
  // const checklist = useSelector(state => state.checklist);
  //const dispatch = useDispatch();

  return (
    <Employee navigation={navigation}>
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
        <Employee.Body navigation={navigation} route={route}/>
    </Employee>
  );
}
