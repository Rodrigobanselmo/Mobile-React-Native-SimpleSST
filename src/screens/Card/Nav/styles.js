import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';

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