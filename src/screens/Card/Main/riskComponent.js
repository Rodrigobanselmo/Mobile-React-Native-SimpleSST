/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import styled, {css,ThemeContext}from "styled-components/native";
import { lighten } from 'polished';
import Icons from '../../../components/Icons'


export const TitleText = styled.Text`
  text-align:center;
  color:${({theme})=>theme.text.third};
  margin-bottom:15px;
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

const RiskText = styled.Text`
  padding-right: 55px;
  text-align:left;
  color:${({theme})=>theme.text.third};
`;

const NoRiskText = styled.Text`
  text-align:center;
  padding:20px 0px;
  color:${({theme})=>theme.text.third};
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
`;


const ItemRiskContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
/*   ${props => props.type == 'fis' && css`
      background-color: ${({theme})=>lighten(0.58,theme.risk.fis)};
  `}
  ${props => props.type == 'qui' && css`
      background-color: ${({theme})=>lighten(0.49,theme.risk.qui)};
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

const Container = styled.View`
  width: 100%;
  padding: 10px 15px;
  border-radius:15px;
  elevation: 12;
  background-color: ${({theme})=>theme.background.paper};
  margin-bottom:5px;
`;

const NoItemRiskContainer = styled.View`
  width: 100%;
  border-radius:15px;
  align-items: center;
  justify-content:center;
  border-color:${({theme})=>theme.text.third};
  border-style:dashed; 
  border-width:1px;
  padding: 0px 20px;
`;
const AddRecContainer = styled.TouchableOpacity`
  width: 100%;
  border-radius:15px;
  align-items: center;
  justify-content:center;
  border-color:${({theme})=>theme.text.third};
  border-style:dashed; 
  border-width:1px;
  padding: 0px 20px;
  margin-bottom:10px;
  margin-top:5px;
`;

const AddRecText = styled.Text`
  text-align:center;
  padding:5px 0px;
  color:${({theme})=>theme.text.third};
`;

export function RiskComponent({type='qui',text='',children,...props}) {

  const themeContext = useContext(ThemeContext);

  return (
    <Container>
    <ItemRiskContainer activeOpacity={0.8} type={type} {...props}>
      <IconRiskContainer type={type}>
        <Icons  name={type} fill={themeContext.status.text} />
      </IconRiskContainer>
      <RiskText>{text}</RiskText>
    </ItemRiskContainer>
    {children}
    </Container>

  )
}

export function NoRiskComponent({text='Nenhuma sugestão',...props}) {

  return (
    <NoItemRiskContainer {...props}>
      <NoRiskText>{text}</NoRiskText>
    </NoItemRiskContainer>

  )
}

export function AddRecComponent({text='Adicionar',...props}) {

  return (
    <AddRecContainer {...props}>
      <AddRecText>{text}</AddRecText>
    </AddRecContainer>

  )
}

