import styled from "styled-components/native";


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
  padding:10px 10px;
  align-items: center;
  border: 1px ${props=>props.theme.background.line} solid;
  background-color: ${({theme})=>theme.background.paper};
  border-radius:10px;
  elevation:3;
  min-height:60px;
  margin-bottom: ${({last})=>last?'20px':'10px'};
/*   background-color: ${({theme})=>theme.text.third}; */
`;

export const TextGroup = styled.Text`
  color: ${({theme})=>theme.text.fourth};
  flex: 1;
  margin-left: 20px;
  font-size:20px;
/*   background-color: ${({theme})=>theme.text.primary}; */
`;
