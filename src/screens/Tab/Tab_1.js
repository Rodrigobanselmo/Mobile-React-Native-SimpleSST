/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar, Text, TouchableOpacity,View, ScrollView} from 'react-native';
import {useReactModal} from '../../context/ModalContext'
import styled from "styled-components";
import {Header} from '../../components/basicComponents/Header';

const ContainerSafe = styled(SafeAreaView)`
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  background-color:${({theme})=>theme.background.back};
  background-color:#e2e2e2;
`;


export default function App() {
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();

  return (
    <ContainerSafe >
      <StatusBar backgroundColor={'#e2e2e2'/* themeContext.text.primary */} barStyle="light-content"/>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
      <Header text='Verificar Email' />
      <View style={{backgroundColor:'#eee',height:80,elevation:16,marginBottom:10,marginHorizontal:20}}></View>
      <View style={{backgroundColor:'#eee',height:80,elevation:16,marginBottom:10,marginHorizontal:20}}></View>
      <View style={{backgroundColor:'#eee',height:80,elevation:16,marginBottom:10,marginHorizontal:20}}></View>
      <View style={{backgroundColor:'#eee',height:80,elevation:16,marginBottom:10,marginHorizontal:20}}></View>
      <View style={{backgroundColor:'#eee',height:80,elevation:16,marginBottom:10,marginHorizontal:20}}></View>
      <View style={{backgroundColor:'#eee',height:80,elevation:16,marginBottom:10,marginHorizontal:20}}></View>
      <View style={{backgroundColor:'#eee',height:650,elevation:16,marginHorizontal:20}}></View>
      </ScrollView>
    </ContainerSafe>
    
  );
}

const styles = StyleSheet.create({});
