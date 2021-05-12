import styled, {css} from "styled-components/native";


export const CheckFlatList = styled.FlatList`
  flex: 1;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme})=>theme.background.back};
`;



export const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin:8px 12px;
  padding:12px 10px;
  align-items: center;
  border: 1px ${props=>props.theme.background.line} solid;
  background-color: ${({theme})=>theme.background.paper};
  border-radius:10px;
  elevation:3;
  min-height:${props=>props.tree?'60px':'75px'};
  margin-bottom: ${({last})=>last?'20px':'10px'};
  
  ${props => props.employee && css`
      background-color: ${({theme})=>'transparent'};
      elevation:0;
      border: 2px ${props=>props.theme.background.line} solid;
  `}
`;

export const ItemContainerButton = styled.TouchableOpacity`
  /* margin:8px 12px; */
  /* padding:12px 10px; */
  opacity:0.8;
  align-items: center;
  justify-content: center;
  height:30px;
  width:30px;
  /* border: 1px ${props=>props.theme.background.line} solid; */
  background-color: ${({theme})=>theme.primary.lighter};
  border-radius:20px;
  elevation:3;
`;

export const TextGroup = styled.Text`
  color: ${({theme})=>theme.text.third};
  flex: 1;
  margin-left: 20px;
  font-size:18px;
/*   background-color: ${({theme})=>theme.text.primary}; */
`;
