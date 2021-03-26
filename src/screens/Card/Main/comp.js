import React, {useState,useContext,useRef,useEffect} from 'react';
import {TouchableHighlight, StatusBar,Dimensions,Animated as AnimatedReact,View,StyleSheet,Text} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonAnimated,ButtonInitial} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import { Directions, FlingGestureHandler,ScrollView, State } from 'react-native-gesture-handler';
import {CardCheckList} from './cardCheckList'
import {CardContainer} from './cardContainer'
import {BackCard} from './backCard'
import {CardCamera} from './cardCamera'
import {CardObservation} from './cardObservation'
import {BackGroupView,CardView,Container,ContainerSafe,SheetHandle,SheetHeaderCont,SheetHeader,SheetBody} from './styles';
import { lighten } from 'polished';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import styled, {css}from "styled-components/native";

const RiskText = styled.Text`
  padding-right: 55px;
  text-align:left;
  color:${({theme})=>theme.text.third};
`;

const TitleText = styled.Text`
  text-align:center;
  color:${({theme})=>theme.text.third};
  margin-bottom:15px;
`;


const IconRiskContainer = styled.View`
  width: 45px;
  height: 45px;
  margin-right: 15px;
  align-items: center;
  border-radius:25px;
  justify-content: center;
  background-color: #ffffff;

  ${props => props.type == 'fis' && css`
      background-color:${({theme})=>theme.risk.fis};
  `}
  ${props => props.type == 'qim' && css`
      background-color:${({theme})=>theme.risk.qim};
  `}
  ${props => props.type == 'bio' && css`
      background-color:${({theme})=>theme.risk.bio};
  `}
  ${props => props.type == 'erg' && css`
      background-color:${({theme})=>theme.risk.erg};
  `}
  ${props => props.type == 'aci' && css`
      background-color:${({theme})=>theme.risk.aci};
  `}
`;


const ItemRiskConatiner = styled.View`
  width: 100%;
  padding: 10px 15px;
  flex-direction: row;
  border-radius:15px;
  align-items: center;
  elevation: 12;
  background-color: ${({theme})=>lighten(0.58,theme.background.paper)};
/*   ${props => props.type == 'fis' && css`
      background-color: ${({theme})=>lighten(0.58,theme.risk.fis)};
  `}
  ${props => props.type == 'qim' && css`
      background-color: ${({theme})=>lighten(0.49,theme.risk.qim)};
  `}
  ${props => props.type == 'bio' && css`
      background-color: ${({theme})=>lighten(0.64,theme.risk.bio)};
  `}
  ${props => props.type == 'erg' && css`
      background-color: ${({theme})=>lighten(0.49,theme.risk.erg)};
  `}
  ${props => props.type == 'aci' && css`
      background-color: ${({theme})=>lighten(0.485,theme.risk.aci)};
  `} */
`;
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
      if (route.params?.groupId && route.params?.cardIndex) {
        setId(route.params.groupId)
        setactiveSlide(route.params?.cardIndex)
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
      /* <FlingGesture> */
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
      /* </FlingGesture> */
    );
}

Card.BottomSheet = function Sheet({sheetRef,answers,riskAnswer,risk}) {

  let fall = useRef(new Animated.Value(1)).current;
  const themeContext = useContext(ThemeContext);

  var groupIndex = answers.data.findIndex((i)=>i?.id && i.id===riskAnswer.position.groupId)
  var itemIndex = answers.data[groupIndex]?.questions.findIndex((i)=>i?.id && i.id===riskAnswer.position.itemId)
  var peek = riskAnswer.position.peek

  if (groupIndex >= 0 && itemIndex >= 0 && peek && answers.data[groupIndex].questions[itemIndex].action[peek]?.risk) console.log(answers.data[groupIndex].questions[itemIndex].action[peek]);

  const renderContent = () => {
    return (
      <SheetBody >
        <TitleText>Fatorres de Risco Selecionados</TitleText>
        
        <ItemRiskConatiner type='fis' style={{marginBottom:20}}>
          <IconRiskContainer type='fis'>
            <Icons  name={'Fis'} fill={themeContext.status.text} />
          </IconRiskContainer>
          <RiskText>Pisos, passagens, passarelas, plataformas, rampas e corredores com saliências, descontinuidades, aberturas ou obstruções, ou escorregadios;</RiskText>
        </ItemRiskConatiner>

        <TitleText>Sugestões de Fatorres de Risco</TitleText>

        <ItemRiskConatiner type='bio' style={{marginTop:20}}>
          <IconRiskContainer type='bio' >
            <Icons name={'Bio'} fill={themeContext.status.text} />
          </IconRiskContainer>
          <RiskText>Movimentação de materiais.</RiskText>
        </ItemRiskConatiner>
        
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
        snapPoints={[0, 350, 500]}
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
