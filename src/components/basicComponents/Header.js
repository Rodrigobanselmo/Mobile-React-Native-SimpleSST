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
    padding:15px 0px 15px ${ ({align,type} )=> align === 'left' && type ? '50px': align === 'left'? '20px' : '0px' } ;
`


export function Header({text,navigation,style,type, align='center',
    secondIcon=false,
    secondName='Apps'
}) {
    

    const themeContext = useContext(ThemeContext);

    function buttonPress() {
        if (type=='Drawer') {
            navigation.openDrawer()
        } else if (type=='Back') {
            navigation.goBack()
        }
    }
    function IconType() {
        if (type=='Drawer') {
            return (<Icons name='Menu' size={25} color={themeContext.text.title} />)
        } else if (type=='Back') {
            return (<Icons  name="ArrowLeft" size={28} color={themeContext.text.title} />)
        }
    }

    return (
        <View style={{alignItems:"center",flexDirection:'row',width:'100%',justifyContent:align==='left'?'flex-start':'center',height:60,...style}} >
            {type &&
            <TouchableOpacity style={{position:'absolute',top:17.5,left:17,zIndex:10,width:80,height:35}} onPress={buttonPress} >
                <IconType/>
            </TouchableOpacity>
            }
            {secondIcon &&
            <TouchableOpacity style={{position:'absolute',top:17.5,right:17,zIndex:10,width:80,height:35,alignItems:'flex-end'}} onPress={buttonPress} >
                <Icons  name={secondName} size={25} color={themeContext.text.title} />
            </TouchableOpacity>
            }
            {text ? 
            <TextHeader align={align} type={Boolean(type)}>{text}</TextHeader>
            :null}
        </View>
    );
  }


  const styles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        paddingBottom: 50,
        paddingTop:70,
    },
    text_header: {
        fontSize:20,
        color:'#000',
        fontWeight:'bold',
        paddingVertical:15
    },
    buttonView: {
        flexDirection:`row`,
        marginVertical:10,
        height:70,
    },
    buttonViewShadow: {
        flexDirection:`row`,
        marginVertical:10,
        height:70,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
    },
    button: {
        flex:1,
        flexDirection:`row`,
        height:70,
        justifyContent:`center`,
        alignItems:`center`,
    },
    buttonPrincipal: {
        backgroundColor:`#fff`,
    },
    buttonSecundario: {
        backgroundColor:`#F27329`,
    },
      text_footer: {
          color: '#000',
          fontSize: 15
      },
      action: {
          flexDirection: 'row',
          marginTop: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 0,
          alignItems:`center`
      },
      textInput: {
          flex: 1,
          height:45,
          paddingLeft: 10,
          color: '#000',
      },
      textPrivate: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 15,
          marginBottom:15
      },
      color_textPrivate: {
          color: 'grey',
          textAlign:`justify`,
          marginTop: 15,
          marginBottom:15
      },
    });
