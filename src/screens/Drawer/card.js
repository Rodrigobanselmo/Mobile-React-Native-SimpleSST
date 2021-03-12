import React , { useContext, useState,useRef,useEffect } from 'react';
import { Dimensions, View, SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity,  RefreshControl, Image, Animated,Easing, TouchableHighlight } from 'react-native';
import { Directions, FlingGestureHandler,ScrollView, State,TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {ButtonInitial} from '../../components/basicComponents/Button';
import Icons from '../../components/Icons'
import {ThemeContext} from "styled-components";
import styled from "styled-components";
import {CheckList,Observation} from './cardContent'
import BackCard from './backCardContent'
import * as Animatable from 'react-native-animatable';

const BackGroupView = styled(Animatable.View)`
  position: absolute;
  top: 0;
  width: 100%;
`;


const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${({theme})=>theme.background.card};
`;


const CardView = styled.View`
  border-radius: 16px;
  background-color: ${({theme})=>theme.background.back};
  border-color: ${({theme})=>theme.background.line};
  border-width: 4px;
  padding:10px 0px;
`;

const Principal = ({CheckListData,navigation,dispatch,CHECK_LIST_MODEL=[]}) => {

    const [secondary, setSecondary] = useState(false);
    const [backCardGroup, setBackCardGroup] = useState(false)
    const [activeIndex, setactiveIndex] = useState(0)
    const [previewIndex, setPreviewIndex] = useState(0)
    const [_id, setId] = useState('1');

    const _key = CheckListData.data.findIndex(i=>i.id==_id)
    const data = CheckListData.data[_key].questions.filter(i=>!(i?.hide&&i.hide))
    const group = CheckListData.data[_key].group
    const groupId = CheckListData.data[_key].id ?? _id

    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height
    console.log(windowHeight);
    const CARD_WIDTH =windowWidth*0.85
    const CARD_HEIGHT =(windowHeight-60)*0.85;
    const CONTROLLER_HEIGHT =(windowHeight-70)*0.13;
    const VISIBLE_ITEMS =3;


    const themeContext = useContext(ThemeContext);

    const animatedValue = useRef(new Animated.Value(0)).current
    const reactiveAnimated = useRef(new Animated.Value(0)).current
    const animatedButton = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.timing(animatedValue, {
        toValue:reactiveAnimated,
        duration:300,
        useNativeDriver:true
        }).start();
    }, [])


    const animatedInitialButton = animatedButton.interpolate({
        inputRange:[0,1],
        outputRange:[themeContext.status.inactive,themeContext.primary.lighter]
    })

    function onAnimatedButton(toValue) {
        if(toValue == 1) setSecondary(true)
        if(toValue == 0) setSecondary(false)
        Animated.timing(animatedButton, {
            toValue,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }

    const setactiveSlide = React.useCallback((newIndex) => {
        setactiveIndex(newIndex);
        reactiveAnimated.setValue(newIndex)
        setPreviewIndex(activeIndex)
        if (activeIndex === data.length-1) {
          if (!backCardGroup) setBackCardGroup(true)
        }
        if (backCardGroup) setBackCardGroup(false)
      })

    function CardContainer() {
      return (
/*           <FlingGestureHandler key='LEFT' direction={Directions.LEFT} onHandlerStateChange={ev=>{
              if (ev.nativeEvent.state === State.END) {
              if (activeIndex === data.length) {
                  return;
              } else {
                setactiveSlide(activeIndex+1)
              }
            }
          }} >
              <FlingGestureHandler key='RIGHT' direction={Directions.RIGHT} onHandlerStateChange={ev=>{
                  if (ev.nativeEvent.state === State.END) {
                  if (activeIndex === 0) {
                    return;
                  }
                  setactiveSlide(activeIndex-1)
                }
              }} > */
                  <Container >
                    {backCardGroup &&
                      <BackGroupView animation="fadeIn" duration={1000} style={{height:CARD_HEIGHT+23}}>
                        <BackCard setId={setId} setactiveSlide={setactiveSlide} groupIndex={_key} data={CheckListData.data}/>
                      </BackGroupView>
                    }
                      <View style={{height:CARD_HEIGHT,marginTop:10}}>
                          {data.map((item,index)=> {

                              const [isFront, setIsFront] = useState(true);
                              const [value, setValue] = useState(data?.obs ? data.obs:'')

                              useEffect(() => {
                                if (previewIndex==index && (activeIndex-1 === index || activeIndex+1 === index)) {
                                    if (!isFront) onAnimatedFlip(0);
                                    if (value!=='' && (data?.obs||value!==data.obs)) dispatch({type: 'ANSWER_OBS',payload:{value,itemId:item.id,groupId}})
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
                                  outputRange:[1-1/(VISIBLE_ITEMS*1.5),1,0]
                              })

                              const scale = animatedValue.interpolate({
                                  inputRange,
                                  outputRange:[0.88,1,1.2]
                              })

                              const animatedFlip = useRef(new Animated.Value(0)).current

                              const animatedFlipFront = animatedFlip.interpolate({
                                  inputRange:[0,180],
                                  outputRange:['0deg','180deg']
                              })

                              const animatedFlipBack = animatedFlip.interpolate({
                                  inputRange:[0,180],
                                  outputRange:['180deg','360deg']
                              })

                              function onAnimatedFlip(toValue) {
                                  if(toValue == 180) setTimeout(() => { setIsFront(false)}, 80);
                                  if(toValue == 0) setTimeout(() => { setIsFront(true)}, 80);
                                  Animated.spring(animatedFlip, {
                                      toValue,
                                      friction:8,
                                      tension:10,
                                      useNativeDriver: true,
                                  }).start();
                              }

                              if (index >= activeIndex - 1 && index <= activeIndex+VISIBLE_ITEMS) {

                                  return (
                                      <View key={item.id}>
                                          <Animated.View  style={{position:'absolute',backfaceVisibility:'hidden', transform: [{translateY},{rotateY:animatedFlipBack},{translateX},{scale}],opacity,zIndex:data.length*2-index*2+(isFront?0:1),elevation:data.length*2-index*2+(isFront?0:1), left:(windowWidth-CARD_WIDTH)/2, top:0}}>
                                              <CardView style={{height:CARD_HEIGHT, width:CARD_WIDTH,}} >
                                                  <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%'}}>
                                                      <Observation model={model} value={value} setValue={setValue} setIsFront={setIsFront} onAnimatedFlip={onAnimatedFlip} group={'group'} item={item}/>
                                                  </ScrollView>
                                              </CardView>
                                          </Animated.View>
                                          <Animated.View  style={{position:'absolute',backfaceVisibility:'hidden', transform: [{translateY},{rotateY:animatedFlipFront},{translateX},{scale}],opacity,zIndex:data.length*2-index*2 ,elevation:data.length*2-index*2, left:(windowWidth-CARD_WIDTH)/2, top:0}}>
                                              <CardView style={{height:CARD_HEIGHT, width:CARD_WIDTH,}} >
                                                  <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%',flex:1}}>
                                                      <CheckList index={index} data={data} setIsFront={setIsFront} onAnimatedFlip={onAnimatedFlip} group={group} groupId={groupId} item={item} dispatch={dispatch}/>
                                                  </ScrollView>
                                              </CardView>
                                          </Animated.View>
                                      </View>
                                  )
                              }

                          })}
                      </View>
                      <View style={{height:CONTROLLER_HEIGHT,width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                          <TouchableHighlight activeOpacity={0.5} underlayColor={themeContext.background.hover} style={{zIndex:1000,padding:9,borderRadius:30}} onLongPress={() => {setactiveSlide(0)}} onPress={() => {if (activeIndex!== 0) setactiveSlide(activeIndex-1)}}>
                              <Icons  name={'ArrowLeft'} size={25*windowHeight/1000+8.0} color={themeContext.text.third} />
                          </TouchableHighlight>
                          <ButtonInitial
                          secondary={secondary}
                          style={{backgroundColor:animatedInitialButton,marginHorizontal:20}}
                          textStyle={{fontWeight:'bold'}}
                  /*           onPress={onAdd} */
                          scale={windowHeight/1000}
                          elevation={true}
                          text='Adicionar'
                          disabledButton={true}
                          />
                          <TouchableHighlight activeOpacity={0.5} underlayColor={themeContext.background.hover} style={{zIndex:1000,padding:9,borderRadius:30}} onLongPress={() => {setactiveSlide(data.length-1)}} onPress={() => {if (activeIndex < data.length) setactiveSlide(activeIndex+1)}}>
                              <Icons  name={'ArrowRight'} size={25*windowHeight/1000+8.0} color={themeContext.text.third} />
                          </TouchableHighlight>
                      </View>
                  </Container>
/*               </FlingGestureHandler>
          </FlingGestureHandler> */
      )
    }

    return (
      <CardContainer/>
    );
};

export default Principal;

const styles = StyleSheet.create({
container: {
    flex: 1,
},
});
