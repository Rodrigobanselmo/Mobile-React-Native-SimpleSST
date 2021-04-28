/* eslint-disable no-unused-vars */
import React, {useState,useContext,useRef,useEffect} from 'react';
import {ThemeContext} from "styled-components";
import {SafeAreaView, StyleSheet,StatusBar, Text, TouchableOpacity,View, ScrollView} from 'react-native';
import {useReactModal} from '../../context/ModalContext'
import styled from "styled-components/native";
import Donut from '../../components/donutComponents/donut';
import {Header} from '../../components/basicComponents/Header';

const ChecklistContainer = styled.View`
  background-color: ${({theme})=>theme.background.paper};
  flex-direction: row;
  flex: 1;
  height: 80px;
  margin: 0 20px 10px 20px;
  border-radius:7px;
  elevation: 16;  
  justify-content: space-between;
  align-items: center;
`;


const ContainerSafe = styled.SafeAreaView`
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  background-color:${({theme})=>theme.background.back};
`;



export default function App() {
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();

  function ChecklistComponent({}) {
    return (
      <ChecklistContainer >
          <Donut strokeWidth={6} color={themeContext.primary.main} percentage={70} max={100} radius={30} />
      </ChecklistContainer>
    )
  }
  
  return (
    <ContainerSafe >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%'}}>
      <Header text='Verificar Email' />
      <ChecklistComponent/>
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
