import styled, {css} from "styled-components/native";



export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme})=>theme.background.back};
`;
export const ComponentView = styled.ScrollView`
`;

export const TextArea = styled.TextInput`
  color: ${({theme})=>theme.text.secondary};
  margin: 0 20px 20px 20px;
  padding:8px 10px 20px 10px;
  font-size:16px;
  border-radius:5px;
  background-color: ${({theme})=>theme.background.paper};
  border: 1px solid ${({theme})=>theme.background.line};
`;

export const TouchableOpacityAdd = styled.TouchableOpacity`
  color: ${({theme})=>theme.text.secondary};
  margin: 0 20px 20px 20px;
  opacity:0.7;
  padding:15px 10px 15px 10px;
  justify-content:center;
  align-items: center;
  font-size:16px;
  border-radius:5px;
  border: 1px dashed ${({theme})=>theme.text.fourth};

  ${props => props.edit && css`
    padding:10px 10px 10px 10px;
    border: 2px solid ${({theme})=>theme.text.fourth};
    background-color:${({theme})=>theme.background.line};
  `}

`;
export const TextAreaShow = styled.Text`
  color: ${({theme})=>theme.text.secondary};
  margin: 0 20px 20px 20px;
  padding:8px 10px 20px 10px;
  font-size:16px;
  border-radius:5px;
  background-color: ${({theme})=>theme.background.paper};
  border: 1px solid ${({theme})=>theme.background.line};
`;

export const TextTitle = styled.Text`
  color: ${({theme})=>theme.text.third};
  opacity:0.7;
  margin: 0 0px 8px 20px;
  font-size:14px;
`;

export const TextInfo = styled.Text`
  color: ${({theme})=>theme.text.third};
  margin: 0 20px 15px 20px;
  padding-bottom:5px;
  font-size:15px;
  border-bottom-color: ${({theme})=>theme.background.line};
  border-bottom-width: 1px;
`;
export const TextAdd = styled.Text`
  color: ${({theme})=>theme.text.third};
  font-size:15px;
`;
