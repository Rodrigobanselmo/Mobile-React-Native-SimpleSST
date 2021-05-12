import React, {useContext} from 'react';
import styled, {css,ThemeContext} from "styled-components/native";
import * as Animatable from 'react-native-animatable';
import Icons from '../../../components/Icons'

export const ContainerSafe = styled.SafeAreaView`
  justify-content: flex-start;
  flex: 1;
  background-color:${({theme})=>theme.background.back};
  padding:20px 0px;
`;

// export const Container = styled.View`
//   padding:0px 0px 50px 0px;
//   overflow: visible;
// `;


export const ProbabilityTouch = styled.TouchableOpacity`
  justify-content: center;
  align-items: flex-start;
  padding-left:20px;
  height: 40px;
  flex: 1;
  margin-right: ${({last})=>last?0:'5px'}; 
  border: 1px solid ${({theme})=>theme.background.line};
  background-color: ${({theme,active})=>!active?theme.background.paper:theme.primary.lighter};
  border-radius:6px;
  elevation:2;
`;

export const ExpoTouch = styled(ProbabilityTouch)`
  max-height: 40px;
  margin-right: 0; 
  min-height: 40px;
  margin-Bottom: 7px; 
`;


export const ButtonOk = styled.TouchableOpacity`
  background-color: ${({theme})=>theme.status.success};
  justify-content: center;
  align-items: center;
  margin-top: 7px;  
  flex:1;
  padding: 4px 10px;
  border-radius:5px;

  ${props => props.disable && css`
    background-color: ${({theme})=> theme.status.inactive};
  `}
`;

export const ButtonCancel = styled(ButtonOk)`
  background-color: transparent;
  border: ${({theme})=> theme.status.inactive};
  justify-content: center;
  align-items: center;
  margin-right:10px;
`;

export const TextOk = styled.Text`
  color: ${({theme,warn})=> theme.status.text};
`;

export const TextCancel = styled(TextOk)`
  color: ${({theme})=>theme.text.third};
`;

export const ProbText = styled.Text`
  color:${({theme,active})=>!active?theme.text.third:theme.primary.textInside};
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const AddRecContainer = styled.TouchableOpacity`
  width: 100%;
  border-radius:15px;
  align-items: center;
  justify-content:center;
  border-color:${({theme})=>theme.text.third};
  border-width:1px;
  padding: 0px 20px;
  margin-bottom:10px;
  margin-top:5px;
  border-style:dashed; 
  opacity:0.6;
  ${props => props.button && css`
  border-color:${({theme})=>theme.text.fourth};
    border-style:solid; 
    opacity:0.9;
  `}
`;

export const AddRecText = styled.Text`
  text-align:center;
  padding:5px 0px;
  color:${({theme})=>theme.text.third};
`;

export const Checkbox = styled.View`
  height: 20px;
  width: 20px;
  border: 1px solid ${({theme})=>theme.background.line};
  background-color: ${({theme,active})=>!active?theme.background.paper:theme.primary.lighter};
  border-radius:20px;
  elevation:2;
`;

export const TitleRecText = styled.Text`
  text-align:left;
  color:${({theme})=>theme.text.third};
  margin-bottom:7px;
  margin-top:15px;
  font-weight:bold;
  font-size:16px;

  ${props => props.sub && css`
    font-size:15px;
    text-align:left;
    font-weight:normal;
    margin-bottom:7px;
    margin-top:5px;
  `}
`;



const Container = styled.View`
  width: 100%;
  padding: 10px 15px;
  border-radius:15px;
  elevation: 4;
  background-color: ${({theme})=>theme.background.paper};
  margin-bottom:0px;
`;

const ItemRiskContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const IconRiskContainer = styled.View`
  width: 45px;
  height: 35px;
  margin-right: 15px;
  align-items: center;
  border-radius:15px;
  justify-content: center;
  background-color: #ffffff;

  ${props => props.type == 'fis' && css`
      background-color:${({theme})=>theme.risk.fis};
  `}
  ${props => props.type == 'qui' && css`
      background-color:${({theme})=>theme.risk.qui};
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
  ${props => props.type == 'simple' && css`
      background-color:${({theme})=>theme.primary.lighter};
      width: 35px;
  `}
`;

const RiskText = styled.Text`
  padding-right: 55px;
  text-align:left;
  color:${({theme})=>theme.text.third};
`;

export function RiskComponent({type,text='',children,...props}) {

  const themeContext = useContext(ThemeContext);

  return (
    <Container>
    <ItemRiskContainer activeOpacity={0.8} type={type} {...props}>
      <IconRiskContainer type={type || 'simple'}>
       {type && <Icons  name={type} fill={themeContext.status.text} />} 
      </IconRiskContainer>
      <RiskText>{text}</RiskText>
    </ItemRiskContainer>
    {children}
    </Container>

  )
}

export function AddRecComponent({text='Adicionar',...props}) {

  return (
    <AddRecContainer {...props}>
      <AddRecText>{text}</AddRecText>
    </AddRecContainer>

  )
}


export const IconsPlusMinus = styled(Icons)`
  position: absolute;
  bottom:5px;
  right:7px;
  opacity:0.88;
`;


export const RecText = styled.Text`
  color:${({theme})=>theme.text.secondary};
`;


export  const RecView = styled.TouchableOpacity`
  background-color: ${({theme})=>theme.background.back};
  border: 2px solid ${({theme})=>theme.background.line};
  margin-top:5px;
  border-radius:10px;
  padding:10px 10px 23px 10px;
  background-color: ${({theme,rec})=>!rec?theme.background.back:theme.background.paper};
  elevation:3;
  position:relative;
`;
