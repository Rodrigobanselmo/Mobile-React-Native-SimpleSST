import styled from "styled-components/native";

export const ButtonOp = styled.TouchableOpacity`
  background-color: ${({theme})=>theme.background.paper};
  margin:20px 20px 20px 20px;
  padding:20px 20px 20px 20px;
  border-radius:20px;
  elevation:3;
`;


export const ButtonText = styled.Text`
  font-size:18px;
`;


export const Title = styled.Text`
  text-align:center;
  margin-bottom:10px;
  font-size:17px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme})=>theme.background.back};
`;
export const ComponentView = styled.SafeAreaView`
  flex: 1;
  justify-content:center;
  margin-bottom:50px;
`;

export const TextArea = styled.TextInput`
  color: ${({theme})=>theme.text.third};
  margin: 0 20px 5px 20px;
  font-size:20px;
  padding-bottom:30px;
  border-radius:10px;
  elevation:3;
  background-color: ${({theme})=>theme.background.paper};
  border-bottom-color: ${({theme})=>theme.background.line};
  border-bottom-width: 1px;
`;
