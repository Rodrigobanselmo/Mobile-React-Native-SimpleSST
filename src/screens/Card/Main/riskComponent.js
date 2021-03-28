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
  ${props => props.type == 'qim' && css`
      background-color:${({theme})=>theme.risk.qim};
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


const ItemRiskConatiner = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 15px;
  flex-direction: row;
  border-radius:15px;
  align-items: center;
  elevation: 12;
  background-color: ${({theme})=>theme.background.paper};
/*   ${props => props.type == 'fis' && css`
      background-color: ${({theme})=>lighten(0.58,theme.risk.fis)};
  `}
  ${props => props.type == 'qim' && css`
      background-color: ${({theme})=>lighten(0.49,theme.risk.qim)};
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

const NoItemRiskConatiner = styled.View`
  width: 100%;
  border-radius:15px;
  align-items: center;
  justify-content:center;
  border-color:${({theme})=>theme.text.third};
  border-style:dashed; 
  border-width:1px;
`;

export function RiskComponent({type='qui',text='',...props}) {

  const themeContext = useContext(ThemeContext);

  return (
    <ItemRiskConatiner activeOpacity={0.8} type={type} {...props}>
      <IconRiskContainer type={type}>
        <Icons  name={type} fill={themeContext.status.text} />
      </IconRiskContainer>
      <RiskText>{text}</RiskText>
    </ItemRiskConatiner>

  )
}

export function NoRiskComponent({...props}) {

  return (
    <NoItemRiskConatiner {...props}>
      <NoRiskText>Nenhuma sugestão</NoRiskText>
    </NoItemRiskConatiner>

  )
}

