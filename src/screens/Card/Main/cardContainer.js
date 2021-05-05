import React, {useState,useContext,useRef,useEffect} from 'react';
import {TouchableHighlight, StatusBar,Dimensions,Animated as AnimatedReact,View,Button,Text} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonAnimated} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import { Directions, FlingGestureHandler,ScrollView, State } from 'react-native-gesture-handler';
import {CardCheckList} from './cardCheckList'
import {CardInitial} from './cardInitial'
import {BackCard} from './backCard'
import {CardCamera} from './cardCamera'
import {CardObservation} from './cardObservation'
import {BackGroupView,CardView,Container,ContainerSafe} from './styles';
import { useSelector, useDispatch } from 'react-redux';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export function CardContainer({isMother,groupIndex,setactiveSlide,onDeletePhotoFromStorage,onAddPhotoToStorage,sheetRef,group, groupId ,CARD_WIDTH,  previewIndex, data,CARD_HEIGHT,activeIndex,dispatch,CHECK_LIST_MODEL,animatedValue,VISIBLE_ITEMS}) {
    
    const checklist = useSelector(state => state.checklist);
    const categoryIndex = checklist.data.findIndex(i=>i.id==groupId)
    const answers = useSelector(state => state.answer);
    
    function allGroups() {
        const array = []
        data.map(i=>{
          if (i.group && !array.includes(i.group)) array.push(i.group)
        })
        return array
    }

    function Card({item,index}) {
        const answersIndex = answers.findIndex(i=>i.questionId==item.id)
        
        const [isFront, setIsFront] = useState(true);
        const [value, setValue] = useState((answers[answersIndex] && answers[answersIndex].obs) ? answers[answersIndex].obs:'')

        // useEffect(() => {
        //   if (previewIndex==index && (activeIndex-1 === index || activeIndex+1 === index)) {
        //       if (!(isFront===true)) onAnimatedFlip(0)
        //   }
        // }, [activeIndex])

        const model = CHECK_LIST_MODEL.filter(i=>(i.groupId === groupId && i.questionId === item.id))[0]
        const answer = answers.filter(i=>(i.groupId === groupId && i.questionId === item.id))[0]
        
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
                <View >
                    <AnimatedReact.View  style={{position:'absolute',backfaceVisibility:'hidden', transform: [{translateY},{rotateY:animatedFlipBack},{translateX},{scale}],opacity,zIndex:data.length*2-index*2+((isFront===true)?0:1),elevation:data.length*2-index*2+((isFront===true)?0:1), left:(windowWidth-CARD_WIDTH)/2, top:0}}>
                        <CardView style={{height:CARD_HEIGHT, width:CARD_WIDTH,}} >
                                {isFront === 'Camera'?
                                  <CardCamera onDeletePhotoFromStorage={onDeletePhotoFromStorage} onAddPhotoToStorage={onAddPhotoToStorage} dispatch={dispatch}/*  image={image} setImage={setImage} */ onAnimatedFlip={onAnimatedFlip} groupId={groupId} item={item}/>
                                :
                                  <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%'}}>
                                    <CardObservation dispatch={dispatch} groupId={groupId} model={model} value={value} setValue={setValue} setIsFront={setIsFront} onAnimatedFlip={onAnimatedFlip} item={item}/>
                                  </ScrollView>
                                }
                        </CardView>
                    </AnimatedReact.View>
                    <AnimatedReact.View  style={{position:'absolute',backfaceVisibility:'hidden', transform: [{translateY},{rotateY:animatedFlipFront},{translateX},{scale}],opacity,zIndex:data.length*2-index*2 ,elevation:data.length*2-index*2, left:(windowWidth-CARD_WIDTH)/2, top:0}}>
                        <CardView style={{height:CARD_HEIGHT, width:CARD_WIDTH,}} >
                            {/* <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%',flex:1}}> */}
                                {item == 'initial' ?
                                    <CardInitial allGroups={allGroups()} setactiveSlide={setactiveSlide} answer={answer} model={model} index={index-1} data={data} setIsFront={setIsFront} onAnimatedFlip={onAnimatedFlip} group={group} groupId={groupId} item={item} dispatch={dispatch}/>
                                :
                                    <CardCheckList groupIndex={groupIndex} activeIndex={activeIndex} setactiveSlide={setactiveSlide} isMother={isMother} sheetRef={sheetRef} answer={answer} model={model} index={index-1} data={data} setIsFront={setIsFront} onAnimatedFlip={onAnimatedFlip} group={group} groupId={groupId} item={item} dispatch={dispatch}/>
                                }
                            {/* </ScrollView> */}
                        </CardView>
                    </AnimatedReact.View>
                </View>
            )
        }
        return null
    }

    function cardsData() {
        var mother = false
        data.filter(i=>(i?.mother || i?.subMother)).map(i=>{
            if (answers.findIndex(fi=>fi.questionId==i.id) == -1 || (answers.findIndex(fi=>fi.questionId==i.id) != -1 && !answers[answers.findIndex(fi=>fi.questionId==i.id)]?.selected)) mother = true
        })
        if (mother) return data.filter(i=>i?.mother || i?.subMother)
        if (/* checklist.data[categoryIndex].groups.length > 1 &&  */allGroups().length>0) return ['initial',...data]
        return data
    }

    return (
    <View style={{height:CARD_HEIGHT,marginTop:10}}>
        {cardsData().map((item,index)=> {return <Card key={item?.id ?? item} item={item} index={index}/>}
        )}
    </View>
  )
}