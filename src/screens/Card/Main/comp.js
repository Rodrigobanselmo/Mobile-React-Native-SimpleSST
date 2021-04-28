import React, {useState,useContext,useRef,useEffect} from 'react';
import {TouchableHighlight, StatusBar,Dimensions,Animated as AnimatedReact,View,StyleSheet,Text, TouchableOpacity} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonAnimated,ButtonInitial} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import { Directions, FlingGestureHandler,ScrollView, State } from 'react-native-gesture-handler';
import {CardContainer} from './cardContainer'
import {BackCard} from './backCard'
import {NoRiskComponent,RiskComponent,TitleText} from './riskComponent'
import {BackGroupView,CardView,Container,ContainerSafe,SheetHandle,SheetHeaderCont,SheetHeader,SheetBody} from './styles';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Card({title,children,navigation, ...restProps }) {
  const themeContext = useContext(ThemeContext);
  return (
        <ContainerSafe {...restProps}>
          <StatusBar backgroundColor={themeContext.background.card} barStyle="dark-content"/>
          <Header text={title} type="Close" secondScreenName={'CardSummary'} navigation={navigation} secondIcon /* iconProps={{color:themeContext.primary.lighter}}  */secondIconProps={{color:themeContext.primary.lighter}}/>
          <View style={{height:(windowHeight-60),width:'100%'}}>
            {children}
          </View>
        </ContainerSafe>
    );
}

Card.Component = function ComponentCard({onDeletePhotoFromStorage,onAddPhotoToStorage,CheckListData,dispatch,CHECK_LIST_MODEL=[],route,sheetRef}) {
  
    const [secondary, setSecondary] = useState(false);
    const [backCardGroup, setBackCardGroup] = useState(false)
    const [activeIndex, setactiveIndex] = useState(0)
    const [previewIndex, setPreviewIndex] = useState(0)
    const [_id, setId] = useState(CheckListData.data[0].id);

    const _key = CheckListData.data.findIndex(i=>i.id==_id)
    const data = CheckListData.data[_key].questions.filter(i=>!(i?.hide&&i.hide))
    const group = CheckListData.data[_key].group
    const groupId = CheckListData.data[_key].id ?? _id

    const CARD_WIDTH =windowWidth*0.85
    const CARD_HEIGHT =(windowHeight-70)*0.85;
    const CONTROLLER_HEIGHT =(windowHeight-70)*0.15;
    const VISIBLE_ITEMS =1;

    const themeContext = useContext(ThemeContext);
    const reactModal = useReactModal();

    const animatedValue = useRef(new AnimatedReact.Value(0)).current
    const reactiveAnimated = useRef(new AnimatedReact.Value(0)).current
    const animatedButton = useRef(new AnimatedReact.Value(0)).current;

    useEffect(() => {
      AnimatedReact.timing(animatedValue, {
        toValue:reactiveAnimated,
        duration:300,
        useNativeDriver:true
        }).start();
    }, [])

    useEffect(() => {
      //console.log(route.params);
      if (route.params?.groupId && route.params?.cardIndex >= 0) {
        setId(route.params.groupId)
        setactiveSlide(route.params.cardIndex)
      } else if (route.params?.groupId)  {
        setId(route.params.groupId)
      }
    }, [route])

    useEffect(() => {
      if(data[activeIndex]?.selected && (data[activeIndex].selected === 'yes' || data[activeIndex].selected === 'na' || data[activeIndex].selected === 'no')) onAnimatedButton(1)
      else onAnimatedButton(0)
    }, [CheckListData,activeIndex,_id])

    useEffect(() => {
      console.log(backCardGroup);
    }, [backCardGroup])

    const setactiveSlide = (newIndex) => {
        setactiveIndex(newIndex);
        reactiveAnimated.setValue(newIndex)
        setPreviewIndex(activeIndex)
        if (activeIndex == data.length-1) {
          if (!backCardGroup) setBackCardGroup(true)
        }
        if (backCardGroup) setBackCardGroup(false)
    }

    const onConfirmed = () => {
      if(data[activeIndex]?.selected && (data[activeIndex].selected === 'yes' || data[activeIndex].selected === 'na' || data[activeIndex].selected === 'no')) {
        dispatch({type: 'ANSWER_CONFIRM',payload:{itemId:data[activeIndex].id,groupId}})
      } else reactModal.animated({text:'Selecione uma resposta para confirmar.'})
    };

    const animatedInitialButton = animatedButton.interpolate({
      inputRange:[0,1],
      outputRange:[themeContext.status.inactive,themeContext.primary.lighter]
    })

    function onAnimatedButton(toValue) {
      if(toValue == 1) setSecondary(true)
      if(toValue == 0) setSecondary(false)
      AnimatedReact.timing(animatedButton, {
          toValue,
          duration: 600,
          useNativeDriver: false,
      }).start();
    }

    function FlingGesture({children}) {
      return (
        <FlingGestureHandler key='LEFT' direction={Directions.LEFT} onHandlerStateChange={ev=>{
          if (ev.nativeEvent.state === State.END) {
            if (activeIndex === data.length) {
                return;
            } else {
              setactiveSlide(activeIndex+1)
            }
          }
        }}>
          <FlingGestureHandler key='RIGHT' direction={Directions.RIGHT} onHandlerStateChange={ev=>{
              if (ev.nativeEvent.state === State.END) {
              if (activeIndex === 0) {
                return;
              }
              setactiveSlide(activeIndex-1)
            }
          }} >
            {children}
          </FlingGestureHandler>
        </FlingGestureHandler> 
      )
    }

    return (
      <FlingGesture>
        <Container >
          {backCardGroup &&
            <BackGroupView animation="fadeIn" duration={1000} style={{height:CARD_HEIGHT+23}}>
              <BackCard setId={setId} setactiveSlide={setactiveSlide} groupIndex={_key} data={CheckListData.data}/>
            </BackGroupView>
          }
        
          <CardContainer onDeletePhotoFromStorage={onDeletePhotoFromStorage} onAddPhotoToStorage={onAddPhotoToStorage} sheetRef={sheetRef} group={group} groupId={groupId} CARD_WIDTH={CARD_WIDTH} previewIndex={previewIndex} data={data} CARD_HEIGHT={CARD_HEIGHT} activeIndex={activeIndex} dispatch={dispatch} CHECK_LIST_MODEL={CHECK_LIST_MODEL} animatedValue={animatedValue} VISIBLE_ITEMS={VISIBLE_ITEMS}  />

          <View style={{height:CONTROLLER_HEIGHT,width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <TouchableHighlight activeOpacity={0.5} underlayColor={themeContext.background.hover} style={{zIndex:1000,padding:9,borderRadius:30}} onLongPress={() => {setactiveSlide(0)}} onPress={() => {if (activeIndex!== 0) setactiveSlide(activeIndex-1)}}>
                <Icons  name={'ArrowLeft'} size={25*windowHeight/1000+8.0} color={themeContext.text.third} />
            </TouchableHighlight>
            <ButtonAnimated
            secondary={secondary}
            style={{backgroundColor:animatedInitialButton,marginHorizontal:20}}
            textStyle={{fontWeight:'bold'}}
            onPress={()=>onConfirmed()}
            scale={windowHeight/1000}
            elevation={true}
            text='Adicionar'
            disabled={!secondary}
            />
            <TouchableHighlight activeOpacity={0.5} underlayColor={themeContext.background.hover} style={{zIndex:1000,padding:9,borderRadius:30}} onLongPress={() => {setactiveSlide(data.length-1)}} onPress={() => {if (activeIndex < data.length) setactiveSlide(activeIndex+1)}}>
                <Icons  name={'ArrowRight'} size={25*windowHeight/1000+8.0} color={themeContext.text.third} />
            </TouchableHighlight>
          </View>
        </Container>
      </FlingGesture>
    );
}

Card.BottomSheet = function Sheet({sheetRef,dispatch,riskAnswer,risk}) {

  let fall = useRef(new Animated.Value(1)).current;
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  
  const risks = riskAnswer.risks[`${riskAnswer.position.groupId}-${riskAnswer.position.itemId}`]?.data

  function onChooseRisk(fator,riskId,) {
    reactModal.alert({
      title:'Adicionar Fator de Risco',
      text:`Você deseja adicionar o fator de risco ${fator}?`,
      confirmButton:'Adicionar',
      warn:false,
      option:true,
      onConfirm:()=>dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{riskId:riskId,itemId:`${riskAnswer.position.groupId}-${riskAnswer.position.itemId}`}}),
    })
  }

  const renderContent = () => {
    return (
      <SheetBody >
        {Array.isArray(risks) && risks.filter(i=>i.choosen).map((item,index)=>{
          return(
            <View key={item.id}>
              {index == 0 && <TitleText>Fatorres de Risco Selecionados</TitleText>}
              <RiskComponent key={item} text={risk[item.id]?.name} type={risk[item.id]?.type} style={{marginBottom:index+1 == risks.filter(i=>i.choosen).length? 25:15}}/>
            </View>
          );
        })}
        <TitleText>Sugestões de Fatorres de Risco</TitleText>
        {Array.isArray(risks) && risks.filter(i=>!i.choosen).map((item,index)=>{
          return(
            <View key={item.id}>
              <RiskComponent onPress={()=>onChooseRisk(risk[item.id]?.name,item.id)} text={risk[item.id]?.name} type={risk[item.id]?.type} style={{marginTop:index==0 ? 0 : 15,marginBottom:0}}/>
            </View>
          );
        })}
        {Array.isArray(risks) && risks.filter(i=>!i.choosen).length == 0  &&
          <NoRiskComponent style={{marginTop:15}}/>
        }


        
        <View style={{flex:1}}/>

        <ButtonInitial
          secondary={false}
          textStyle={{color:themeContext.text.third}}
          style={{marginTop:35,marginBottom:5}}
          /* onPress={onTakePhoto} */
          scale={0.80}
          elevation={true}
          text='Adicionar Outro'
        />
      </SheetBody>
    )
  };

  const renderHeader = () => (
    <SheetHeader >
      <SheetHeaderCont >
        <SheetHandle  />
      </SheetHeaderCont>
    </SheetHeader>
  );

  const RenderShadow = () => {
    const animatedShadowOpacity = Animated.interpolate(fall, {
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    })

    return (
      <Animated.View
        pointerEvents="none"
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            opacity: animatedShadowOpacity,
            backgroundColor: '#000',
          },
        ]}
      />
    )
  }

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 450]}
        springConfig={{        
          stiffness: 25,
        }}
        callbackNode={fall}
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
      <RenderShadow/>
    </>
  );
}
