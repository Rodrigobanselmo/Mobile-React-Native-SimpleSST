import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';
import { transparentize } from 'polished';

export const ContainerSafe = styled.SafeAreaView`
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  background-color:${({theme})=>theme.background.card};
`;

export const BackGroupView = styled(Animatable.View)`
  position: absolute;
  top: 0;
  width: 100%;
`;


export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${({theme})=>theme.background.card};
`;


export const CardView = styled.View`
  border-radius: 16px;
  background-color: ${({theme})=>theme.background.back};
  border-color: ${({theme})=>theme.background.line};
  border-width: 4px;
  padding:10px 0px;
`;


export const SheetHandle = styled.View`
  width: 40px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({theme})=>transparentize(0.7,theme.text.title)};
  margin-bottom: 10px;
`;


export const SheetHeaderCont = styled.View`
  align-items: center;
  /* flex-direction:row;
  justify-content:space-between;
  padding:0 10px;
  margin-bottom: 4px; */
`;

export const SheetHeader = styled.View`
  background-color: ${({theme})=>theme.background.back};
  /* padding-top: 7px; */
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
export const SheetBody = styled.View`
  background-color: ${({theme})=>theme.background.back};
  padding: 3px 16px 16px 16px;
  min-height: ${({windowHeight})=>windowHeight?`${windowHeight*0.92-40}px`:'560px'};
  flex-grow:1;
`;