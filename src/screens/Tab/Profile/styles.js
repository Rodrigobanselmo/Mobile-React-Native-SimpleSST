import styled from 'styled-components/native';


export const Label = styled.Text`
  font-size: 16px;
  color: ${({theme})=>theme.primary.strong};
`;


export const ContaineSafe = styled.SafeAreaView`
  background-color: ${({theme})=>theme.background.back};
  flex:1;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${({theme})=>theme.background.line};
  width: 100%;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  height: 40px;
  margin: 3px 0px;
`;

export const Title = styled.Text`
  font-size: 18px;
  padding-left: 5px;
  margin-top: 18px;
  margin-bottom: 10px;
  color: ${({theme})=>theme.text.secondary};
`;

export const Divider = styled.View`
  width: 100%;
  border-bottom-color: ${({theme})=>theme.background.line};
  border-bottom-width: 1px;
  height: 20px;
  margin-bottom: 20px;
`;