import styled, {css} from "styled-components/native";
import * as Animatable from 'react-native-animatable';

export const ContainerSafe = styled.SafeAreaView`
  justify-content: flex-start;
  flex: 1;
  background-color:${({theme})=>theme.background.back};
  padding:0px 0px;
`;

export const Container = styled.View`
  padding:0px 0px 50px 0px;
  overflow: visible;
`;

export const ContainerCard = styled.View`
  margin: 10px 15px 20px 15px;
  background-color:${({theme})=>theme.background.card};
  border-radius: 15px;
  elevation: 16;
  padding: 10px 0px;
`;

export const Circle = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 20px;
  margin-right: 0px;

  ${props => props.fill==='1' && css`
  background-color:${({theme})=>theme.status.success};
  `}
  ${props => props.fill==='2' && css`
    background-color:${({theme})=>theme.status.fail};
  `}
  ${props => props.fill==='3' && css`
    background-color:${({theme})=>theme.status.warn};
  `}
  
  ${props => props.fill==='confirmed' && css`
    opacity:0.8;
    background-color:${({theme})=>theme.primary.lighter};
    border:1px ${({theme})=>theme.primary.main} solid;
  `}

  ${props => props.inactive && css`
    background-color:${({theme})=>theme.background.hover};
    opacity:0.7;

  `}
  ${(props) => (props.fill==='yes' || props.fill==='no' || props.fill==='na') && css`
    border: 4px ${({theme})=>theme.primary.lighter} solid;
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
    font-size:19px;
    color:${({theme})=>theme.text.fourth};
    margin:0px 15px;
  `}
`;
