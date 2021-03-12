import React, {memo, useState,useEffect} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,Animated,Easing, Keyboard,Modal,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Loader = ({open}) => {

  const LoaderModal = () => {
    return (
            <TouchableWithoutFeedback >
              <View style={{...styles.background,justifyContent:`center`,alignItems:"center",height:windowHeight,width:windowWidth}}>
                <View style={{padding:30,backgroundColor:`transparent`}}>
                  <LottieView style={{height:400,width:400}} source={require('../../animations/loader4.json')} speed={0.9} autoPlay loop />
                </View>
              </View>
            </TouchableWithoutFeedback>
    );
  }

    return (
    <Modal visible={open} transparent={true}>
        <LoaderModal/>
    </Modal>
    );

}

export const ModalLoadScreen = ({onClose,open,onFunc=()=>{},background='rgba(10, 10, 10, 0.6)',animation='loadSuccess'}) => {

  let SOURCE = require('../../animations/success.json')

  if (animation === 'success') SOURCE = require('../../animations/success.json')
  else if (animation === 'loadSuccess') SOURCE = require('../../animations/loading-success.json')
  else if (animation === 'emailSent') SOURCE = require('../../animations/mailLaranja.json')

  function onAnimationEnd() {
    setTimeout(() => {
      onClose()
    }, 500);
    onFunc()
  }

  return(
    <Modal visible={open} transparent={true}>
      <View style={{backgroundColor: background,justifyContent:`center`,alignItems:"center",flex:1}}>
          <LottieView onAnimationFinish={onAnimationEnd} style={{height:220,width:220}} source={SOURCE} autoPlay loop={false}/>
      </View>
    </Modal>
  )
}


  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'rgba(10, 10, 10, 0.6)'
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,

      elevation: 24,
    },
    textInput: {
      flex: 1,
      height:45,
      color: '#000',
      fontSize: 20,
  },
    header: {
      color: `#000`,
      textAlign: 'left',
      fontSize: 20,
      marginBottom:10
  },
  subHeader: {
    color: `#000`,
    textAlign: 'left',
    fontSize: 15,
},

  buttons: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
  },
  button: {
      marginTop: 25,
      color: `#000`
    },
    textInputView: {
      flexDirection: 'row',
      marginTop: 18,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e2e2',
      alignItems:`center`,
   },
    container: {
      backgroundColor: '#FFF',
      paddingHorizontal:15,
      paddingVertical:20
   },
   containerOutside: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: windowWidth*0.025
 },
  });
