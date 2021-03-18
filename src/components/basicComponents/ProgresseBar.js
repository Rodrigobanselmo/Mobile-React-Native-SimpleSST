/* eslint-disable no-unused-vars */
import React, {useContext,useRef,useEffect} from 'react';
import {View,Text,Image,TouchableOpacity, Animated,TextInput,Platform,StyleSheet,ScrollView,StatusBar,Keyboard, TouchableHighlight} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/FontAwesome';
import styled, {css,ThemeContext} from "styled-components";
import Icons from '../Icons'


export function ProgresseBar({percentage=0,style={},barColor,duration=1000}) {
    
    let animation = useRef(new Animated.Value(0));
    
    const themeContext = useContext(ThemeContext);

    useEffect(() => {
        Animated.timing(animation.current, {
          toValue: percentage,
          duration,
          useNativeDriver:false
        }).start();
      },[percentage])
      
      const width = animation.current.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
      })
    return (
            <View style={[styles.percentageBar,{...style}]}>
                <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: barColor??themeContext.primary.lighter, width }]}/>
            </View>
    );
  }

  const styles = StyleSheet.create({
    percentageBar: {
      backgroundColor: 'white',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 5
    }
  });
