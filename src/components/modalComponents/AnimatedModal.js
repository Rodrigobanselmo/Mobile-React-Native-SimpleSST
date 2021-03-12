import React,{memo, useEffect, useState, useRef} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,Animated,Easing} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useTimeOut from '../../hooks/useTimeOut'

// const [ModalAnimatedComponent, onAnimationModal] = useModalAnimated(70);

const useModalAnimated = ({type,position,text,onWait=0,HEIGHT=70,dispatch,random}) => {

    const windowWidth = Dimensions.get('window').width; 
    const windowHeight = Dimensions.get('window').height; 
    const AnimatedModalError = useRef(new Animated.Value(-HEIGHT)).current; 
    const [onTimeOut,onClearTime] = useTimeOut()

        useEffect(() => {
            onClearTime()
            onTimeOut(dispatch,5400)
            onAnimationModal()
        }, [random])

    //animated function
    function onAnimationModal() {
        setTimeout(() => {
            if (position =='UP') {
                return Animated.sequence([
                    Animated.timing(AnimatedModalError, {
                        delay: 0,
                        toValue:-Math.abs(HEIGHT),
                        duration:400,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }),
                    Animated.timing(AnimatedModalError, {
                        delay: 0,
                        toValue:20,
                        duration:500,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }),
                    Animated.timing(AnimatedModalError, {
                        delay: 4000,
                        toValue:-Math.abs(HEIGHT),
                        duration:400,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    })
                ]).start();   
            } else {
                return Animated.sequence([
                    Animated.timing(AnimatedModalError, {
                        delay: 0,
                        toValue:HEIGHT,
                        duration:300,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }),
                    Animated.timing(AnimatedModalError, {
                        delay: 0,
                        toValue:0,
                        duration:300,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    }),
                    Animated.timing(AnimatedModalError, {
                        delay: 3000,
                        toValue:HEIGHT,
                        duration:300,
                        useNativeDriver: true,
                        easing: Easing.out(Easing.ease),
                    })
                ]).start();   
            }
        }, onWait);
    }


        return (
            <Animated.View style={position == 'UP' ? 
            {height:Math.abs(HEIGHT*0.80),elevation:1000,zIndex:1100000,flexDirection:'row',paddingHorizontal:10,borderRadius:30,zIndex:10,justifyContent:`center`,alignItems:`center`, width:windowWidth*0.90,transform:[{translateY:AnimatedModalError}],position:'absolute',top:0,right:windowWidth*0.10/2,backgroundColor:'#353535'}
            : 
            {height:Math.abs(HEIGHT),elevation:1000,zIndex:11000000,flexDirection:'row',paddingHorizontal:30,zIndex:10,justifyContent:`center`,alignItems:`center`, width:windowWidth,transform:[{translateY:AnimatedModalError}],position:"absolute",bottom:0,backgroundColor:'#353535'}}>
                {type == 'Check' || type == 'check'? 
                <MaterialCommunityIcons style={{marginHorizontal:15}} name="checkbox-marked-circle-outline" color="#3fc32c" size={20} />
                :
                type == 'Warn' || type == 'warn' ? 
                <AntDesign style={{marginHorizontal:15}} name="warning" color="#ffeb40" size={23} />
                :
                type == 'Error' || type == 'error'?
                <AntDesign style={{marginHorizontal:15}} name="closecircleo" color="#e91c1c" size={23} />
                :
                null
            }
                <Text numberOfLines={2} style={{color:`#fff`,fontSize:position == 'UP' ? 14:16,paddingRight:5,textAlign:'left',flex:1,}}>{text}</Text>
            </Animated.View>
        );

}
export default useModalAnimated


/* import React,{memo, useEffect, useState, useRef} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,Animated,Easing} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// const [ModalAnimatedComponent, onAnimationModal] = useModalAnimated(70);

const useModalAnimated = ({type="ok",position='UP',text="Um problema foi encontrado, tente novamente mais tarde",AnimatedModalError,HEIGHT=70}) => {

    const windowWidth = Dimensions.get('window').width; 
    const windowHeight = Dimensions.get('window').height; 

        return (
            <View style={{position:'relative',width:windowWidth,height:windowHeight}}>
            <Animated.View style={position == 'UP' ? 
            {height:Math.abs(HEIGHT*0.80),zIndex:11,flexDirection:'row',paddingHorizontal:30,borderRadius:30,zIndex:10,justifyContent:`center`,alignItems:`center`, width:windowWidth*0.90,transform:[{translateY:AnimatedModalError}],position:'absolute',top:0,right:windowWidth*0.10/2,backgroundColor:'#353535'}
            : 
            {height:Math.abs(HEIGHT),zIndex:11,flexDirection:'row',paddingHorizontal:30,zIndex:10,justifyContent:`center`,alignItems:`center`, width:windowWidth,transform:[{translateY:AnimatedModalError}],position:"absolute",bottom:0,backgroundColor:'#353535'}}>
                {type == 'ok'? 
                <MaterialCommunityIcons style={{marginHorizontal:15}} name="checkbox-marked-circle-outline" color="#3fc32c" size={20} />
                :
                type == 'warn' ? 
                <AntDesign style={{marginHorizontal:15}} name="warning" color="#ffeb40" size={23} />
                :
                type == 'erro' ?
                <AntDesign style={{marginHorizontal:15}} name="closecircleo" color="#e91c1c" size={23} />
                :
                null
            }
                <Text style={{color:`#fff`,fontSize:position == 'UP' ? 14:16}}>{text}</Text>
            </Animated.View>
            </View>
        );

}
export default useModalAnimated
 */