import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback} from 'react-native';
import styled,{css} from "styled-components";

const Container = styled(View)`
  justify-content: center;
  align-items: center;
  flex:1;
  background-color: ${({theme})=>theme.background.semi};

`;


const ViewContainer = styled(View)`
  padding:20px 25px;
  background-color: ${({theme})=>theme.background.paper};
  max-width: 450px;
  min-width: 250px;
  margin: 0px 25px ;
  border-radius:6px;
`;


const TextTitle = styled(Text)`
  font-size: 20px;
  text-align: left;
  margin-bottom: 10px;
  font-weight: 700;
  color: ${({theme})=>theme.text.secondary};
`;


const TextSub = styled(Text)`
  font-size: 15px;
  text-align: left;
  margin-bottom: 25px;
  color: ${({theme})=>theme.text.third};;
`;

const ContainerButtons = styled(View)`
  flex-direction: row;
  justify-content: flex-end;

  ${props => props.invert && css`
    flex-direction:row-reverse;
    justify-content: flex-start;
  `}
`;

const ButtonOk = styled(TouchableOpacity)`
  background-color: ${({theme,warn})=> warn? theme.status.fail2:theme.status.success};
  justify-content: center;
  align-items: center;
  margin-top: ${({option})=>option?'7px':'0px'};
  flex:1;
  padding: 4px 10px;
  border-radius:5px;
`;

const ButtonCancel = styled(ButtonOk)`
  background-color: transparent;
  border: ${({theme})=> theme.status.inactive};
  justify-content: center;
  align-items: center;
  margin-right:10px;

  ${props => props.invert && css`
    margin-right:0px;
    margin-left:10px;
  `}
`;

const TextOk = styled(Text)`
  color: ${({theme,warn})=> theme.status.text};
`;

const TextCancel = styled(TextOk)`
  color: ${({theme})=>theme.text.third};
`;

const ReactModal = ({text,title,option=false,warn=true,invert=false,onConfirm=false,open,onClose,confirmButton='Confirmar',cancelButton='Cancelar'}) => {

  function onConfirmPress() {
    if (onConfirm) {
      onConfirm()
      onClose()
    } else {
      onClose()
    }
  }

  const ModalAlertTitle = () => {
    return(
      <TouchableWithoutFeedback onPress={onClose}>
        <Container>
          <TouchableWithoutFeedback onPress={()=>{}}>
            <ViewContainer style={styles.shadow}>
                <TextTitle >{title}</TextTitle>
                <TextSub >{text}</TextSub>
                <ContainerButtons invert={invert} >
                    {option ?
                    <ButtonCancel option={option} invert={invert} activeOpacity={0.5} onPress={onClose}>
                        <TextCancel>{cancelButton}</TextCancel>
                    </ButtonCancel>
                    :null }
                    <ButtonOk option={option} warn={warn} activeOpacity={0.7} onPress={onConfirmPress} >
                        <TextOk>{confirmButton}</TextOk>
                    </ButtonOk>
                </ContainerButtons>
            </ViewContainer>
          </TouchableWithoutFeedback>
        </Container>
      </TouchableWithoutFeedback>
    )
  }

    return (
      <Modal animationType={'fade'}  visible={open} transparent={true} onRequestClose={onClose}>
          <ModalAlertTitle/>
      </Modal>
    );

}

export default ReactModal

  const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,

      elevation: 24,
    },
  });
