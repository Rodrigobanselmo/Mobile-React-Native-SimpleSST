/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,StatusBar,Keyboard} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled, {ThemeContext,css} from "styled-components";
import Icons from '../Icons'
import { TextInputMask } from 'react-native-masked-text'

const Input = styled(TextInput)`
    flex: 1;
    padding-left: 10px;
    color: ${({theme})=>theme.text.primary};
`;
const InputMask = styled(TextInput)`
    flex: 1;
    padding-left: 10px;
    color: ${({theme})=>theme.text.primary};
`;


const Container = styled(View)`
    flex-direction: row;
    border-bottom-width: 1px;
    align-items:center;
    border-bottom-color: ${({theme,focused})=>focused?theme.background.lineActive:theme.background.line};

    ${props => !props.isValid && !props.focused && css`
        border-bottom-color:${({theme})=>theme.status.fail2};
    `}
`;


export function InputInitial({inputRef,secure,mask=false,password=false,onSecurityChange,icon=true,iconProps={},iconName='UserEmail',iconCheck=false,focused=false,isValid=true,warnText='',...props}) {
  
    const themeContext = useContext(ThemeContext);
    
    return (
        <>
        <Container isValid={isValid} focused={focused}>
            {icon&&<Icons name={iconName} size={20} color={themeContext.text.secondary} {...iconProps}/>}
            {mask ? 
            <TextInputMask style={{flex:1,paddingLeft:10,color:themeContext.text.primary}} {...props} />
            :
            <Input ref={inputRef} {...props} />
            }
            {iconCheck ? 
            <Animatable.View style={{marginLeft:10}} animation="bounceIn" >
                <Icons name="Check" color={themeContext.status.success} size={20} />
            </Animatable.View>
            : null}
            {password ?
                <TouchableOpacity style={{padding:10}} onPress={onSecurityChange} >
                            {secure ? 
                                <Icons name="SecureOn" color={themeContext.text.fourth} size={20}/>
                            :
                                <Icons name="SecureVisible" color={themeContext.text.fourth} size={20}/>
                            }
                </TouchableOpacity>
            :null}
        </Container>
        { isValid ? <Text style={{...styles.errorMsg,color:'transparent'}}>T</Text> : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{...styles.errorMsg,color: themeContext.status.fail2}}>{warnText}</Text>
            </Animatable.View>
        }
      </>
    );
  }

  const styles = StyleSheet.create({
      errorMsg: {
          textAlign:`justify`,
          fontSize:10,
      },
    });
