/* eslint-disable no-unused-vars */
import React, {memo,useRef,useContext, useEffect, useState} from 'react';
import {View,Text,Image,TouchableOpacity, Animated,TextInput,Platform,StyleSheet,ScrollView,StatusBar,Keyboard, TouchableHighlight} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styled, {css,ThemeContext} from "styled-components/native";
import Icons from '../Icons'

const ViewContainerAnimated = styled(Animated.View)`
    flex-direction:row;
    margin-top:10px;
    margin-bottom:10px;
    border-radius:10px;
    height:70px;
    background-color:${({theme})=>theme.background.paper};

    ${props => props.secondary && css`
        background-color:${({theme})=>theme.primary.lighter};
    `}

    ${props => props.disabled && css`
        background-color:${({theme})=>theme.status.inactive};
    `}
`;

const Touchable = styled.TouchableHighlight`
    flex:1;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    border-radius:10px;
`;

const TextButtonAnimated = styled(Animated.Text)`
    color:${({theme})=>theme.text.primary};
    
    ${props => props.secondary && css`
        color:${({theme})=>theme.primary.textInside};
        font-weight:bold;
    `}
    ${props => props.disabled && css`
        color:${({theme})=>theme.status.text};
    `}
`;

export function ButtonInitial({animated=false,text='Click Aqui',disabledButton=false,imageSource=false,imagePosition='left',imageSize=30,iconName = false,iconPosition='left',iconProps={},iconColor='#000',iconSize=40,secondary=false,style={},textStyle={},height=60,scale=0.8,elevation=true,...props}) {

    const positionLeft = {position:`absolute`,top:(scale*height-(iconSize ? scale*iconSize : scale*imageSize))/2,left:(height-(iconSize ? iconSize : imageSize))/2}
    const positionRight = {position:`absolute`,top:(scale*height-(iconSize ? scale*iconSize : scale*imageSize)-1)/2,right:(height-(iconSize ? iconSize : imageSize))/2+5}
    const positionCenter = {marginRight:7}

    return (
        <ViewContainerAnimated disabled={disabledButton} secondary={secondary} style={[{minWidth:scale*250,height:scale*height,...style},elevation && {...styles.Shadow}]} >
            <Touchable underlayColor={'#00000022'}  style={{height:scale*height}} {...props} >
                <>
                {iconName || imageSource  ?
                    iconName ?
                        <Icons name={iconName} size={scale*iconSize} color={iconColor}  style={[iconPosition=='left'?positionLeft: iconPosition=='right'? positionRight : positionCenter,{...iconProps}]}/>
                        :
                        <Image source={imageSource} style={[{height:scale*imageSize,width:scale*imageSize,resizeMode:`contain`},imagePosition=='left'?positionLeft: imagePosition=='right'? positionRight : positionCenter]}/>                  
                    :
                    null
                }
                <TextButtonAnimated disabled={disabledButton} numberOfLines={2} secondary={secondary} style={{fontSize:scale*20,paddingHorizontal:8,...textStyle}}>{text}</TextButtonAnimated>
                </>
            </Touchable>
        </ViewContainerAnimated>
    );
}

export function ButtonAnimated({animated=false,disabled=false,text='Click Aqui',disabledButton=false,imageSource=false,imagePosition='left',imageSize=30,iconName = false,iconPosition='left',iconColor='#000',iconSize=40,secondary=false,style={},textStyle={},height=60,scale=0.8,elevation=true,...props}) {

    const animatedValue = useRef(new Animated.Value(secondary?1:0)).current
    const themeContext = useContext(ThemeContext);

    var positionLeft = {position:`absolute`,top:(scale*height-(iconSize ? scale*iconSize : scale*imageSize))/2,left:(scale*height-(iconSize ? scale*iconSize : scale*imageSize))/2}
    var positionCenter = {marginRight:18}

    const animatedInitial = animatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[themeContext.primary.textInside,themeContext.primary.lighter]
    })

    function onAnimatedInitial(toValue) {
        Animated.timing(animatedValue, {
            toValue,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }

    useEffect(() => {
        if (secondary) onAnimatedInitial(1)
        else onAnimatedInitial(0)
    }, [secondary])

    return (
        <ViewContainerAnimated disabled={disabledButton || disabled} secondary={secondary} style={[{minWidth:scale*250,height:scale*height,backgroundColor:animatedInitial,...style},elevation && {...styles.Shadow}]} >
            <Touchable disabled={disabled} underlayColor={'#00000022'}  style={{height:scale*height}} {...props} >
                <>
                {iconName || imageSource  ?
                    iconName ?
                        <Icons name={iconName} size={scale*iconSize} color={iconColor}  style={iconPosition=='left'?positionLeft:positionCenter}/>
                        :
                        <Image source={imageSource} style={[{height:scale*imageSize,width:scale*imageSize,resizeMode:`contain`},imagePosition=='left'?positionLeft:positionCenter]}/>                  
                    :
                    null
                }
                <TextButtonAnimated disabled={disabledButton || disabled} secondary={secondary} style={{fontSize:scale*20,...textStyle}}>{text}</TextButtonAnimated>
                </>
            </Touchable>
        </ViewContainerAnimated>
    );
}

const CircleInfo = styled.View`
  position: absolute;
  top: 0px;
  background-color: ${({theme})=>theme.status.messageInfo};
  z-index: 2;
  justify-content: center;
  align-items: center;
`;

const CircleWarn = styled.View`
  position: absolute;
  top: 0px;
  background-color: ${({theme})=>theme.status.messageWarn};
  z-index: 2;
  justify-content: center;
  align-items: center;
`;

const TextCircle = styled.Text`
  font-weight: bold;
  color: ${({theme})=>theme.status.light};
`;

export function IconButton({badgeInfo=false,badgeWarn=false,info='',warn='',iconName='Close',style={},scale=1,iconProps={},color='#000',...props}) {


    return (
        <View style={style}>
            <TouchableOpacity style={{paddingRight:8*scale,paddingLeft:8*scale}} {...props}>
            {(badgeInfo || info) ? <CircleInfo style={{height:15*scale,left:4*scale,width:15*scale,borderRadius:10*scale}}><TextCircle style={{fontSize:10*scale}}>{info}</TextCircle></CircleInfo>:null}
            {(badgeInfo || warn) ? <CircleWarn style={{height:15*scale,right:6*scale,width:15*scale,borderRadius:10*scale}}><TextCircle style={{fontSize:10*scale}}>{warn}</TextCircle></CircleWarn>:null}
                <Icons style={{paddingRight:4*scale,paddingLeft:4*scale}} name={iconName} size={25*scale} color={color} {...iconProps} />
            </TouchableOpacity>
        </View>
    );
}


  const styles = StyleSheet.create({
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
    },
    });
