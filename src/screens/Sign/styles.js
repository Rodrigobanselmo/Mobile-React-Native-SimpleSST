import {Animated} from 'react-native';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme})=>theme.background.back};
  flex:1;
`;

export const TextForgotPass = styled.Text`
  color:grey;
  font-size:14px;
  width:100%;
  text-align:right;
  margin:2px 0px 10px 0px;
  
`;

export const TextBold = styled.Text`
  font-weight: bold;
  text-decoration-line: underline;
  text-decoration-color: ${({theme})=>theme.text.fourth};
`;

export const TextPrivacy = styled.Text`
  font-size: 12px;
  color: ${({theme})=>theme.text.grey};
  text-align:justify;
  margin-top: 10px;
  
  ${props => props.windowHeight >700 && css`
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 4px;
  `}
`;


export const ContainerPass = styled.View`
  background-color:${({theme})=>theme.background.paper};
`;


export const TextHeaderFooter = styled.Text`
  color: ${({theme})=>theme.text.third};
  flex: 1;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 5px;
  font-size: 14px;
  ${props => props.windowHeight >700 && css`
    font-size: 16px;
    margin-bottom: 25px;
  `}
`;


export const FooterView = styled(Animated.View)`
  background-color:${({theme})=>theme.background.paper};
  margin-top:20px;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  elevation:16;
`;