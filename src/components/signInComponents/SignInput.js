/* eslint-disable no-unused-vars */
import React, {memo} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,StatusBar,Keyboard} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Esta sendo usado na tela SignIn_Conect_1

export function HeaderLogin({text, iconName='login', IconFamily = AntDesign}) {
    return (
        <View style={styles.header}  >
            <View flexDirection='row' style={{alignItems:"center"}} >
                <Text style={styles.text_header} >{text}</Text>
                <IconFamily  name={iconName} color="#000" size={30} style={{}}  />
            </View>
        </View>
    );
}

export function OuLine({backgroundColor='#fff', color='#99999944'}) {
    return (
        <>
        <View style={{backgroundColor:color, height:1.5,flex:1,marginTop:15}}></View>
        <Text style={{fontSize:13,color,flex:1,alignSelf:"center",paddingHorizontal:8,backgroundColor,marginTop:-13,marginBottom:5}}>ou</Text>
        </>
    );
}

export function EmailInput({onTextChange,onEndText=()=>{},data,onFocusInput,onBlur,OnSubmitKeyboardPress,refFocus}) {
    
    return (
        <>
        <View style={[styles.action,{borderBottomColor: data.focus == `username`?"#F2732955":"#f2f2f2"}]}>
            <FontAwesome name="user-o" color="#404040" size={20} />
            <TextInput 
                ref={refFocus}
                placeholder="E-mail"
                style={styles.textInput}
                autoCapitalize="none"
                clearButtonMode='while-editing'
                onChangeText={onTextChange}
                onEndEditing={onEndText}
                keyboardType='email-address'
                onFocus={onFocusInput}
                onBlur={onBlur}
                textContentType="emailAddress"
                returnKeyType="next"
                autoCompleteType='email'
                onSubmitEditing={OnSubmitKeyboardPress}
                value={data.username}
                />
            {data.check_textInputChange ? 
            <Animatable.View style={{marginLeft:10}} animation="bounceIn" >
                <Ionicons name="ios-checkmark-circle-outline" color="#F27329" size={20} />
            </Animatable.View>
            : null}
        </View>

        { data.isValidUser ? <Text style={{...styles.errorMsg,color:'transparent'}}>T</Text> : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{...styles.errorMsg,color: '#bb0000'}}>Email inserido invalido.</Text>
            </Animatable.View>
        }
      </>
    );
  }
  
export function SenhaInput2({onTextChange,onSecurityChange,data,refFocus,onLogin,onFocusInput,onBlur,confirme=false,beforeConfirme=false,OnSubmitKeyboardPress}) {

return (
    <>
        <Text style={[styles.text_footer, {marginTop: 35 }]}>{confirme?`Confirme password`:`Password`}</Text>
        <View style={[styles.action,{borderBottomColor: confirme ? (data.focus == `confirmePassword`?"#000":"#f2f2f2") : (data.focus == `password`?"#000":"#f2f2f2")}]}>
            <Ionicons name="lock-closed-outline" color="#000" size={22}/>
            <TextInput 
                ref={refFocus}
                placeholder={confirme?`Confirme sua senha`:`Sua senha`}
                secureTextEntry={confirme?data.confirmSecureTextEntry ? true : false:data.secureTextEntry ? true : false}
                value={confirme?data.confirmPassword:data.password}
                style={styles.textInput}
                autoCapitalize="none"
                onFocus={onFocusInput}
                onBlur={onBlur}
                onChangeText={(val) => onTextChange(val)}
                textContentType={confirme || beforeConfirme ? 'none':'password'}
                returnKeyType={confirme || beforeConfirme ? 'done':'next'}
                autoCompleteType={confirme || beforeConfirme ? 'off':'password'}
                blurOnSubmit={false}
                onSubmitEditing={confirme || !beforeConfirme ? onLogin:OnSubmitKeyboardPress}
                multiline={false}
            />         
                <TouchableOpacity style={{padding:10}} onPress={onSecurityChange} >
                    {(confirme?data.confirmSecureTextEntry :data.secureTextEntry) ? 
                        <Ionicons name="ios-eye-off-outline"color="grey" size={20}/>
                    :
                        <Ionicons name="ios-eye-outline"color="grey" size={20}/>
                    }
                </TouchableOpacity>
                {(confirme? data.isIqualPassword : data.isValidPassword)  ? 
                <Animatable.View animation="bounceIn" >
                    <Ionicons name="ios-checkmark-circle-outline" color="green" size={20} />
                </Animatable.View>
            :     
            null
            } 
        </View>
        { (confirme? data.isIqualPassword || data.confirmPassword.trim().length == 0: data.isValidPassword || data.password.trim().length == 0) ? <Text style={{...styles.errorMsg,color:'transparent'}}>T</Text> : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{confirme? `As senhas devem ser iguais` : `Password must be 8 characters long.`}</Text>
            </Animatable.View>
        }
    </>
);
}
export function SenhaInput({onEndText,onTextChange,onSecurityChange,data,refFocus,onLogin,onFocusInput,onBlur,confirme=false,beforeConfirme=false,OnSubmitKeyboardPress}) {

return (
    <>
        <View style={[styles.action,{borderBottomColor: confirme ? (data.focus == `confirmePassword`?"#F2732955":"#f2f2f2") : (data.focus == `password`?"#F2732955":"#f2f2f2"),marginTop:-10}]}>
            <Ionicons name="lock-closed-outline" color="#404040" size={22}/>
            <TextInput 
                ref={refFocus}
                placeholder={confirme?`Confirmar senha`:`Senha`}
                secureTextEntry={confirme?data.confirmSecureTextEntry ? true : false:data.secureTextEntry ? true : false}
                value={confirme?data.confirmPassword:data.password}
                style={styles.textInput}
                autoCapitalize="none"
                onEndEditing={onEndText}
                onFocus={onFocusInput}
                onBlur={onBlur}
                onChangeText={onTextChange}
                textContentType={confirme || beforeConfirme ? 'none':'password'}
                returnKeyType={confirme || beforeConfirme ? 'done':'next'}
                autoCompleteType={confirme || beforeConfirme ? 'off':'password'}
                blurOnSubmit={false}
                onSubmitEditing={confirme || !beforeConfirme ? onLogin:OnSubmitKeyboardPress}
                multiline={false}
            />         
                <TouchableOpacity style={{padding:10}} onPress={onSecurityChange} >
                    {(confirme?data.confirmSecureTextEntry :data.secureTextEntry) ? 
                        <Ionicons name="ios-eye-off-outline"color="grey" size={20}/>
                    :
                        <Ionicons name="ios-eye-outline"color="grey" size={20}/>
                    }
                </TouchableOpacity>
            {(confirme? data.isIqualPassword && data.confirmPassword.trim().length != 0: data.isValidPassword && data.password.trim().length != 0)  ? 
            <Animatable.View animation="bounceIn" >
                <Ionicons name="ios-checkmark-circle-outline" color="#F27329" size={20} />
            </Animatable.View>
            :     
            null
            } 
        </View>
        {  (confirme? (!data.isValidPassword || !data.isConfirmeWarn || data.confirmPassword.trim().length == 0): !data.isWarn || data.password.trim().length == 0) ? <Text style={{...styles.errorMsg,color:'transparent'}}>T</Text> : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{confirme? `As senhas devem ser iguais.` : `A senha deve conter no minimo 6 digitos.`}</Text>
            </Animatable.View>
        }
    </>
);
}

export function PrivacyPolicy({onPressService, onPressPolicy,textDecorationColor='grey',colorTextDecoration='grey',color='grey'}) {
const B = (props) => <Text onPress={props.onPress} style={{fontWeight: 'bold',color:colorTextDecoration, textDecorationLine:'underline', textDecorationColor}}>{props.children}</Text>
return (
        <Text style={{...styles.color_textPrivate,color,fontSize:12}} >Ao criar uma conta, você concorda com os nossos <B onPress={onPressService} >Termos de Serviço</B> e a <B onPress={onPressPolicy}>Política de Privacidade</B></Text>
);
}

export function ButtonLoginEmail({iconName = false, iconColor, text, onLogin, imageSource = false, IconFamily, Style = false}) {
    return (
        <TouchableOpacity onPress={onLogin} style={Style ? {...styles.button2,...Style} : styles.button2}>
            {iconName || imageSource  ?
                iconName ?
                    <IconFamily name={iconName} size={40} color={iconColor}  style={{position:`absolute`,top:15,left:15}}/>
                    :
                    <Image source={imageSource} style={{height:30,width:30,resizeMode:`contain`,marginLeft:3,position:`absolute`,top:20,left:18}}/>                  
                :
                null
            }
            <Text style={{fontSize:20}} >{text}</Text>
        </TouchableOpacity>
    );
}

 export const ButtonLogin = memo(
    function func({iconName = false, iconColor, text, onPress, imageSource = false, IconFamily=MaterialIcons, Style = false, data}) {
        return (
            <TouchableOpacity onPress={onPress} style={Style ? Style : [styles.button2]}>
                {iconName || imageSource  ?
                    iconName ?
                        <IconFamily name={iconName} size={40} color={iconColor}  style={{position:`absolute`,top:15,left:15}}/>
                        :
                        <Image source={imageSource} style={{height:30,width:30,resizeMode:`contain`,marginLeft:3,position:`absolute`,top:20,left:18}}/>                  
                    :
                    null
                }
                <Text style={{fontSize:20}} >{text}</Text>
            </TouchableOpacity>
        );
})


  const styles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        paddingBottom: 50,
        paddingTop:70,
    },
    text_header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
        paddingRight: 12
    },
      button2: {
        width:`100%`,
        flexDirection:`row`,
        marginBottom:15,
        height:70,
        justifyContent:`center`,
        alignItems:`center`,
        backgroundColor:`#fff`,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
        },
      text_footer: {
          color: '#000',
          fontSize: 15,
          flex:1,
          textAlign:"center"
      },
      action: {
          flexDirection: 'row',
          marginTop: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          marginBottom: -0,
          alignItems:`center`
      },
      textInput: {
          flex: 1,
          //height:40,
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
          marginTop: 10,
          marginBottom:0
      },
      errorMsg: {
          color: '#b54c03',
          textAlign:`justify`,
          fontSize:10,
      },
    });
