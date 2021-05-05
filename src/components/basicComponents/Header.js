/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {View,Text,Image,TouchableOpacity, Animated,TextInput,Platform,StyleSheet,ScrollView,StatusBar,Keyboard, TouchableHighlight} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/FontAwesome';
import styled, {css,ThemeContext} from "styled-components";
import Icons from '../Icons'

const TextHeader = styled(Text)`
    font-size:20px;
    color: ${({theme})=>theme.text.secondary};
    font-weight:bold;
    width: 60%;
    padding:15px 0px 15px 0 ;
    text-align:center;
`


export function Header({text,navigation,style,type, align='center',
    secondIcon=false,
    secondIconProps={},
    iconProps={},
    firstScreenName,
    secondScreenName='Apps',
    leftOnPress
}) {
    

    const themeContext = useContext(ThemeContext);

    function buttonPress(screenName) {
        if (screenName) {
            navigation.navigate(screenName)
        } else if (type=='Drawer') {
            navigation.openDrawer()
        } else if (type=='Back' || type=='Close') {
            navigation.goBack()
        }
    }
    function IconType({...props}) {
        if (type=='Drawer') {
            return (<Icons name='Menu' size={25} color={themeContext.text.title} {...props}/>)
        } else if (type=='Back') {
            return (<Icons  name="ArrowLeft" size={28} color={themeContext.text.title} {...props}/>)
        } else if (type=='Close') {
            return (<Icons  name="Close" size={28} color={themeContext.text.title} {...props}/>)
        }
    }

    return (
        <View style={{alignItems:"center",flexDirection:'row',width:'100%',justifyContent:align==='left'?'flex-start':'center',height:60,...style}} >
            {type &&
            <TouchableOpacity style={{position:'absolute',top:17.5,left:17,zIndex:10,width:80,height:35}} onPress={()=>leftOnPress?leftOnPress():buttonPress(firstScreenName)}>
                <IconType {...iconProps}/>
            </TouchableOpacity>
            }
            {secondIcon &&
            <TouchableOpacity style={{position:'absolute',top:17.5,right:17,zIndex:10,width:80,height:35,alignItems:'flex-end'}} onPress={()=>buttonPress(secondScreenName)} >
                <Icons  name={'Apps'} size={25} color={themeContext.text.title} {...secondIconProps} />
            </TouchableOpacity>
            }
            {text ? 
            <TextHeader numberOfLines={1} ellipsizeMode={'tail'} align={align} type={Boolean(type)}>{text}</TextHeader>
            :null}
        </View>
    );
  }

