import styled from "styled-components/native";



export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme})=>theme.background.back};
`;
export const ComponentView = styled.SafeAreaView`
  flex: 1;
  justify-content:center;
  margin-bottom:100px;
`;

export const TextArea = styled.TextInput`
  color: ${({theme})=>theme.text.third};
  margin: 0 20px 5px 20px;
  font-size:20px;
  border-radius:5px;
  border-bottom-color: ${({theme})=>theme.background.line};
  border-bottom-width: 1px;
`;
