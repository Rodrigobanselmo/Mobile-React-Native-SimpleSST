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

export default function App() {

  //changenavigationBarColor('#0d0d0d', false)

  const themeContext = useContext(ThemeContext);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  //onChange({"data",user.uid,reactModal,dispatch})

  return (
    <Summary navigation={navigation}>
      <StatusBar backgroundColor={themeContext.background.card} barStyle="dark-content"/>
      <Summary.Info/>
    </Summary>
  );
}
