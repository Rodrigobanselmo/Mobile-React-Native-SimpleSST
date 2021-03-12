/* eslint-disable no-unused-vars */
import React, {memo} from 'react';
import {View,Text,Image,TouchableOpacity, Animated,TextInput,Platform,StyleSheet,ScrollView,StatusBar,Keyboard, TouchableHighlight} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import useColors from'../../style/Colors';
//Esta sendo usado na tela SignIn_Conect_1

function IconChoose(family) {
    switch (family) {
        case 'AntDesign':
            return AntDesign
        case 'FontAwesome':
            return FontAwesome
        case 'MaterialIcons':
            return MaterialIcons
        case 'Ionicons':
            return Ionicons
        case 'Entypo':
            return Entypo
        case 'MaterialCommunityIcons':
            return MaterialCommunityIcons
        case 'SimpleLineIcons':
            return SimpleLineIcons
        default:
            break;
    }
}

export function Header({text,navigation,style,type='Drawer'}) {
    
    function buttonPress() {
        if (type=='Drawer') {
            navigation.openDrawer()
        } else {
            navigation.goBack()
        }
    }
    function IconType() {
        if (type=='Drawer') {
            return (<Ionicons  name="ios-menu" size={25} color='#000' />)
        } else {
            return (<Ionicons  name="chevron-back" size={28} color='#000' />)
        }
    }

    return (
        <View style={{alignItems:"center",flexDirection:'row',width:'100%',justifyContent:"center",height:60,...style}} >
            <TouchableOpacity style={{position:'absolute',top:17.5,left:17}} onPress={buttonPress} >
                <IconType/>
            </TouchableOpacity>
            {text ? 
            <Text style={styles.text_header}>{text}</Text>
            :null}
        </View>
    );
  }

export function ButtonOpacity({animated=false,text='Click Aqui',onFunction=()=>{},imageSource=false,imagePosition='left',imageSize=30,shadowColor="#000",shadow=false,
iconFamily=false,iconName = false,iconPosition='left',iconColor='#000',iconSize=40,secundario=false,style={},textStyle={},height=70,scale=1,elevation=true}) {
    //console.log('object')
    const [Colors] = useColors()
    const [measuredWidth, setMeasuredWidth] = React.useState(300);
    const onLayout = React.useCallback(
      ({
        nativeEvent: {
          layout: { width }
        }
      }) => {
          setMeasuredWidth(width);
          //console.log(width)
      },
      []
    );

    const shadowOpt = {
        width:(measuredWidth-10),
        height:scale*(height-10),
        color:shadowColor,
        border:20,
        radius:0,
        opacity:0.2,
        x:5,
        y:0,
        style:{marginVertical:10}
    }

    var positionLeft = {position:`absolute`,top:(scale*height-(iconName ? scale*iconName : scale*imageSize))/2,left:(scale*height-(iconName ? scale*iconName : scale*imageSize))/2}
    var positionCenter = {marginRight:18}
    var shadowElevation = elevation ? styles.buttonViewShadow : styles.buttonView

    const Icon = IconChoose(iconFamily)
    return (
        <>
        {shadow === true ?
        <View style={{transform:[{translateY:height+5}],marginTop:-height}}>
        </View>
        :null}
        {animated === true ?
        <Animated.View style={[!secundario?{backgroundColor:Colors.button1}:{backgroundColor:Colors.button2},{...shadowElevation,...style, maxWidth:400,minWidth:scale*340,height:scale*height}]} onLayout={onLayout}>
            <TouchableOpacity onPress={onFunction} style={{...styles.button,height:scale*height}}>
                {iconName || imageSource  ?
                    iconName ?
                        <Icon name={iconName} size={scale*iconSize} color={iconColor}  style={iconPosition=='left'?positionLeft:positionCenter}/>
                        :
                        <Image source={imageSource} style={[{height:scale*imageSize,width:scale*imageSize,resizeMode:`contain`},imagePosition=='left'?positionLeft:positionCenter]}/>                  
                    :
                    null
                }
                <Animated.Text style={[!secundario?{fontSize:scale*20,color:'#303030'}:{fontSize:scale*20,fontWeight:'bold'},{...textStyle}]}>{text}</Animated.Text>
            </TouchableOpacity>
        </Animated.View>
        :
        <View style={[!secundario?{backgroundColor:Colors.button1}:{backgroundColor:Colors.button2},{...shadowElevation,...style, maxWidth:400,minWidth:scale*340,height:scale*height}]} onLayout={onLayout}>
            <TouchableOpacity onPress={onFunction} style={{...styles.button,height:scale*height}}>
                {iconName || imageSource  ?
                    iconName ?
                        <Icon name={iconName} size={scale*iconSize} color={iconColor}  style={iconPosition=='left'?positionLeft:positionCenter}/>
                        :
                        <Image source={imageSource} style={[{height:scale*imageSize,width:scale*imageSize,resizeMode:`contain`},imagePosition=='left'?positionLeft:positionCenter]}/>                  
                    :
                    null
                }
                <Text style={[!secundario?{fontSize:scale*20,color:Colors.buttonText1}:{fontSize:scale*20,color:Colors.buttonText2,fontWeight:'bold'},{...textStyle}]}>{text}</Text>
            </TouchableOpacity>
        </View>
        }
        </>
    );
}

export function ButtonOpacity2({text='Click Aqui',onFunction=()=>{},imageSource=false,imagePosition='left',imageSize=30,
iconFamily=false,iconName = false,iconPosition='left',iconColor='#000',iconSize=40,secundario=false,style={},textStyle={},height=70,scale=1}) {

    var positionLeft = {position:`absolute`,top:(scale*height-(iconName ? scale*iconName : scale*imageSize))/2,left:(scale*height-(iconName ? scale*iconName : scale*imageSize))/2}
    var positionCenter = {marginRight:18}

    const Icon = IconChoose(iconFamily)
    return (
        <View style={[!secundario?styles.buttonPrincipal:styles.buttonSecundario,{...styles.buttonView,...style, maxWidth:400,minWidth:scale*340,height:scale*height}]}>
        <TouchableOpacity onPress={onFunction} style={{...styles.button}}>
            {iconName || imageSource  ?
                iconName ?
                    <Icon name={iconName} size={scale*iconSize} color={iconColor}  style={iconPosition=='left'?positionLeft:positionCenter}/>
                    :
                    <Image source={imageSource} style={[{height:scale*imageSize,width:scale*imageSize,resizeMode:`contain`},imagePosition=='left'?positionLeft:positionCenter]}/>                  
                :
                null
            }
            <Text style={[!secundario?{fontSize:scale*20,color:'#000'}:{fontSize:scale*20,color:'#fff'},{...textStyle}]}>{text}</Text>
        </TouchableOpacity>
        </View>
    );
}

export function ButtonHighlight({secundario=false,iconName = false,iconColor='#000',text='Click Aqui',onFunction=()=>{},imageSource=false,iconFamily=false, style=[]}) {

    const [underlay, setUndelay] = React.useState(false);
    const Icon = IconChoose(iconFamily)

    return (
        <TouchableHighlight onShowUnderlay={()=>setUndelay(true)} onHideUnderlay={()=>setUndelay(false)} onPress={onFunction} style={!secundario?{...styles.buttonPrincipal,...style}:{...styles.buttonSecundario,...style}}>
            <>
            {iconName || imageSource  ?
                iconName ?
                    <Icon name={iconName} size={40} color={iconColor}  style={{position:`absolute`,top:15,left:15}}/>
                    :
                    <Image source={imageSource} style={{height:30,width:30,resizeMode:`contain`,marginLeft:3,position:`absolute`,top:20,left:18}}/>                  
                :
                null
            }
            <Text style={!underlay?{fontSize:20,color:'#000'}:{fontSize:20,color:'#fff'}}>{text}</Text>
            </>
        </TouchableHighlight>
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
