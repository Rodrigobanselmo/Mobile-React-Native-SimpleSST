import React, {useState,useContext,useRef,useEffect} from 'react';
import {TouchableHighlight, StatusBar,Dimensions,Animated as AnimatedReact,View,Button,Text} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonAnimated} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import { Directions, FlingGestureHandler,ScrollView, State } from 'react-native-gesture-handler';
import {CardCheckList} from './cardCheckList'
import {BackCard} from './backCard'
import {CardCamera} from './cardCamera'
import {CardObservation} from './cardObservation'
import {BackGroupView,CardView,Container,ContainerSafe} from './styles';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export function CardContainer({onAddPhotoToStorage,sheetRef,group, groupId ,CARD_WIDTH,  previewIndex, data,CARD_HEIGHT,activeIndex,dispatch,CHECK_LIST_MODEL,animatedValue,VISIBLE_ITEMS}) {
  return (
    <View style={{height:CARD_HEIGHT,marginTop:10}}>
        {data.map((item,index)=> {

            const [isFront, setIsFront] = useState(true);
            const [value, setValue] = useState(data?.obs ? data.obs:'')
            const [image, setImage] = useState(data?.image ? data.image:[])

            useEffect(() => {
              if (previewIndex==index && (activeIndex-1 === index || activeIndex+1 === index)) {
                  if (!(isFront===true)) onAnimatedFlip(0)
                  //console.log('value',value);
                  if (value!=='' && (data?.obs||value!==data.obs)) dispatch({type: 'ANSWER_OBS',payload:{value,itemId:item.id,groupId}})
                  //if (image.length >= 1 && (data?.image||value!==data.obs)) dispatch({type: 'ANSWER_OBS',payload:{value,itemId:item.id,groupId}})
              }
            }, [activeIndex])

            const model = CHECK_LIST_MODEL.filter(i=>(i.groupId === groupId && i.questionId === item.id))[0]
            const inputRange = [index - 1, index,index+1]

            const translateY = animatedValue.interpolate({
                inputRange,
                outputRange:[-10,0,10]
            })
            const translateX = animatedValue.interpolate({
                inputRange,
                outputRange:[30,0,-500]
            })

            const opacity = animatedValue.interpolate({
                inputRange,
                outputRange:[1-1/(VISIBLE_ITEMS*2),1,0]
            })

            const scale = animatedValue.interpolate({
                inputRange,
                outputRange:[0.88,1,1.2]
            })

            const animatedFlip = useRef(new AnimatedReact.Value(0)).current

            const animatedFlipFront = animatedFlip.interpolate({
                inputRange:[0,180],
                outputRange:['0deg','180deg']
            })

            const animatedFlipBack = animatedFlip.interpolate({
                inputRange:[0,180],
                outputRange:['180deg','360deg']
            })

            function onAnimatedFlip(toValue) {
                if(toValue == -180) setIsFront('Camera')
                if(toValue == 180) setIsFront(false)
                if(toValue == 0) setTimeout(() => { setIsFront(true)}, 200);
                AnimatedReact.spring(animatedFlip, {
                    toValue,
                    friction:8,
                    tension:10,
                    useNativeDriver: true,
                }).start();
            }

            if (index >= activeIndex - 1 && index <= activeIndex+VISIBLE_ITEMS) {

                return (
                    <View key={item.id}>
                        <AnimatedReact.View  style={{position:'absolute',backfaceVisibility:'hidden', transform: [{translateY},{rotateY:animatedFlipBack},{translateX},{scale}],opacity,zIndex:data.length*2-index*2+((isFront===true)?0:1),elevation:data.length*2-index*2+((isFront===true)?0:1), left:(windowWidth-CARD_WIDTH)/2, top:0}}>
                            <CardView style={{height:CARD_HEIGHT, width:CARD_WIDTH,}} >
                                    {isFront === 'Camera'?
                                      <CardCamera onAddPhotoToStorage={onAddPhotoToStorage} dispatch={dispatch}/*  image={image} setImage={setImage} */ onAnimatedFlip={onAnimatedFlip} groupId={groupId} item={item}/>
                                    :
                                      <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%'}}>
                                        <CardObservation model={model} value={value} setValue={setValue} setIsFront={setIsFront} onAnimatedFlip={onAnimatedFlip} item={item}/>
                                      </ScrollView>
                                    }
                            </CardView>
                        </AnimatedReact.View>
                        <AnimatedReact.View  style={{position:'absolute',backfaceVisibility:'hidden', transform: [{translateY},{rotateY:animatedFlipFront},{translateX},{scale}],opacity,zIndex:data.length*2-index*2 ,elevation:data.length*2-index*2, left:(windowWidth-CARD_WIDTH)/2, top:0}}>
                            <CardView style={{height:CARD_HEIGHT, width:CARD_WIDTH,}} >
                                <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%',flex:1}}>
                                    <CardCheckList sheetRef={sheetRef} model={model} index={index} data={data} setIsFront={setIsFront} onAnimatedFlip={onAnimatedFlip} group={group} groupId={groupId} item={item} dispatch={dispatch}/>
                                </ScrollView>
                            </CardView>
                        </AnimatedReact.View>
                    </View>
                )
            }

        })}
    </View>
  )
}