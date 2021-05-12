/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,StatusBar,Keyboard} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled, {ThemeContext,css} from "styled-components/native";
import Icons from '../Icons'
import { TextInputMask } from 'react-native-masked-text'

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin:0 12px 18px 12px;
  background-color: ${({theme})=>theme.background.line};
  border-radius: 10px;
  padding: 0px 0px 0px 10px;

  ${props=>props.noMargin && css`
    margin:0;
  `}
`;


const Input = styled.TextInput`
  padding: 11px 10px 11px 10px;
  color: ${({theme})=>theme.text.primary};
  font-size:16px;
  flex:1;

  ${props=>props.dense && css`
    padding: 7px 10px 7px 10px;
  `}
`;



export function InputSearch({secure,showClean,noMargin,setCleanFunc,mask=false,password=false,onSecurityChange,icon=true,cleanIconProps={},iconProps={},iconName='UserEmail',iconCheck=false,focused=false,isValid=true,warnText='',...props}) {
  
    const themeContext = useContext(ThemeContext);
    
    return (
        <Container noMargin={noMargin}>
            <Icons name={'Search'} size={20} color={themeContext.text.third} {...iconProps}/>
            <Input {...props} />
            {setCleanFunc && showClean &&
              <TouchableOpacity onPress={setCleanFunc}>
                <Icons name={'CloseCircle'} style={{padding:10}} size={20} color={themeContext.text.third} {...cleanIconProps}/>
              </TouchableOpacity>
            }
      </Container>
    );
  }
