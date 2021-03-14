import styled, {css} from "styled-components/native";
import * as Animatable from 'react-native-animatable';

export const ContainerSafe = styled.SafeAreaView`
  justify-content: flex-start;
  flex: 1;
  background-color:${({theme})=>theme.background.card};
  padding:0px 0px;
`;

export const Container = styled.View`
  padding:10px 25px 50px 25px;
`;

export const Circle = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 10px;
  margin-right: 10px;

  ${props => props.fill==='yes' && css`
    background-color:${({theme})=>theme.status.success};
  `}
  ${props => props.fill==='no' && css`
    background-color:${({theme})=>theme.status.fail};
  `}
  ${props => props.fill==='na' && css`
    background-color:${({theme})=>theme.status.warn};
  `}
  ${props => props.fill==='ok' && css`
    background-color:${({theme})=>theme.primary.lighter};
  `}
  ${props => props.fill==='pendding' && css`
    border: 3px ${({theme})=>theme.primary.lighter} solid;
  `}
  ${props => props.fill==='none' && css`
    border: 2px ${({theme})=>theme.background.line} solid;
  `}


  ${props => props.large && css`
    height: 24px;
    width: 24px;
  `}

  ${props => props.title && css`
    height: 32px;
    width: 32px;
    justify-content: center;
    align-items: center;
    background-color:${({theme})=>theme.background.inactive};
    border-radius: 10px;
  `}
`;

export const TextTitle = styled.Text`
  font-size:18px;
  color:${({theme})=>theme.text.third};
`;

export const TextNum = styled.Text`
  width: 30px;
  text-align: center;
  color:${({theme})=>theme.text.fourth};

  ${props => props.title && css`
    font-size:17px;
    color:${({theme})=>theme.primary.light};
  `}
`;
