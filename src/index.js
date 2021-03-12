import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { NavigationContainer } from '@react-navigation/native'
import styled, {ThemeProvider} from 'styled-components'
import ModalProvider from './context/ModalContext'
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

import {store, persistor } from './store';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import MainStack from './stack/MainStack';


const theme = {
  primary:{
    main:'#d9560b',
    lighter:'#F27329',
    textInside:'#fff'
  },
  secondary:{
    main:'#990000',
  },
  background: {
    card:'#fff',
    main:'#F27329',
    back:'#eee',
    backLight:'#eee',
    paper:'#fff',
    semi:'rgba(10, 10, 10, 0.6)',
    line:'#e2e2e2',
    lineActive:'#F2732955',
    inactive:'rgba(10, 10, 10, 0.6)',
    hover:'rgba(10, 10, 10, 0.2)',
    dark:'#0d0d0d',
  },
  text:{
    primary:'#0d0d0d',
    title:'#333333',
    secondary:'#333333',
    third:'#565656',
    fourth:'#7d8083',
    grey:'#a9a9a9',
    light:'#ddd',
  },
  status:{
    success:'#5cb85c',
    success1:'#3fc32c',
    success2:'#1fb913',
    fail:'#bb2011',
    fail1:'#e91c1c',
    fail2:'#ab0004',
    warn:'#cfd220',
    warn1:'#ffeb40',
    warn2:'#b59c0e',
    info:'#5bc0de',
    info1:'#4e91d4',
    text:'#fff',
    light:'#ddd',
    inactive:'#b0b3b5',
    messageInfo:'#3d71a4',
    messageWarn:'#d11a1e',
  },
  tabBar:{
    icons:'#565656',
    background:'#e2e2e2',
    borderButton:'#d2d2d2',
    backButton:'#e2e2e2',
    plus:'#565656',
  }
};

export default () => {
  changeNavigationBarColor('#F27329', false)
  
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <NavigationContainer>
              <MainStack />
            </NavigationContainer>
          </ModalProvider>  
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}