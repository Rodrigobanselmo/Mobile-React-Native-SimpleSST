import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image ,StatusBar,StyleSheet, SafeAreaView} from 'react-native';
import {ButtonOpacity,Header} from '../../../components/basicComponents/Header';

export default ({navigation}) => {
    



    return (
      <SafeAreaView style={{flex:1, backgroundColor: '#ffff'}}>
      <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
        <Header text='Verifique seu email' navigation={navigation}/>
      <View style={{flex:1, justifyContent:'space-between',alignItems:`center`,paddingHorizontal:50,paddingTop:0,paddingBottom:50}}>
    </View>
    </SafeAreaView>
    );
}


const styles = StyleSheet.create({
  textSub: {
    fontSize:14,
    color:'#555555',
    textAlign:`center`
  },
  textSubButton: {
    fontSize:15,
    color:'#000',
  },
  });

//<Image source={require('../../assets/gamma.png')} resizeMode='contain' style={{width: 250, height: 250}}/>
//<Text>Gamma jr. App</Text>