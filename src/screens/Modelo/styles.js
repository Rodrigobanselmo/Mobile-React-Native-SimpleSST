import styled from "styled-components/native";
import * as Animatable from 'react-native-animatable';

export const ContainerSafe = styled.SafeAreaView`
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  background-color:${({theme})=>theme.background.card};
`;

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${({theme})=>theme.background.card};
`;

