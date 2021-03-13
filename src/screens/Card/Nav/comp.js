import React, {useState,useContext,useRef,useEffect} from 'react';
import {TouchableHighlight, StatusBar,Dimensions,Animated,View} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import { Directions, FlingGestureHandler,ScrollView, State } from 'react-native-gesture-handler';
import {BackGroupView,CardView,Container,ContainerSafe} from './styles';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Card({title,children, ...restProps }) {
  const themeContext = useContext(ThemeContext);
  return (
        <ContainerSafe {...restProps}>
          <StatusBar backgroundColor={themeContext.background.card} barStyle="dark-content"/>
          <Header text={title} type="Back" secondIcon/>
          <View style={{height:(windowHeight-60),width:'100%'}}>
            {children}
          </View>
        </ContainerSafe>
    );
}

Card.Component = function ComponentCard({CheckListData,dispatch,CHECK_LIST_MODEL=[]}) {

  
  const themeContext = useContext(ThemeContext);

  return (
      <Container >
      </Container>
  );
}
