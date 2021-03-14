import React, {useState,useContext,useRef,useEffect} from 'react';
import {Dimensions,Text,View,TouchableOpacity,Animated} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import {Container,ContainerSafe} from './styles';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Summary({title,children,navigation, ...restProps }) {
  //const themeContext = useContext(ThemeContext);
  return (
        <ContainerSafe {...restProps}>
          <Header navigation={navigation} text={'Sumário'} type="Back"/>
          {children}
        </ContainerSafe>
    );
}

Summary.Info = function SummaryInfo({children}) {

  return (
      <Container >
        {children}
      </Container>
  );
}
