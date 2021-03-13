import React, {useState,useContext} from 'react';
import {View,Text,Image,TouchableOpacity, Dimensions,TextInput,Platform,StyleSheet,ScrollView,Animated,Easing, Keyboard,Modal,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputInitial} from '../../components/basicComponents/Input';
import Icons from '../Icons'
import {isEqual} from 'lodash';
import styled, {ThemeContext} from "styled-components/native";



const Container = styled.View`
      background-color: ${({theme})=>theme.background.paper};
      padding: 15px;
      max-width:500px;
      align-self:center;
      border-radius:10px;
`;

const InputContainer = styled.View`
      flex-direction: row;
      margin-top: 14px;
      border-bottom-width: 1px;
      border-bottom-color: ${({theme,focused})=>!focused?theme.background.line:theme.background.lineActive};
      align-items:center;
`;

const Input = styled.TextInput`
      flex: 1;
      color: ${({theme})=>theme.text.primary};
      font-size: 16px;
`;

const TextHeader = styled.Text`
      color: ${({theme})=>theme.text.primary};
      text-align: left;
      font-size: 20px;
      margin-bottom:5px;
`;

const TextSubHeader = styled(TextHeader)`
    color: ${({theme})=>theme.text.fourth};
    font-size: 15px;
    margin-bottom:0px;
`;

const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;

  ${props => props.invert && css`
    flex-direction:row-reverse;
    justify-content: flex-start;
  `}
`;

const ButtonOk = styled.TouchableOpacity`
  background-color: ${({theme,warn,isValid})=> isValid? warn? theme.status.fail2:theme.status.success : theme.background.inactive};
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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


const TextOk = styled.Text`
  color: ${({theme,warn})=> theme.status.text};
`;

const TextCancel = styled(TextOk)`
  color: ${({theme})=>theme.text.third};
`;

const windowWidth = Dimensions.get('window').width; 
const windowHeight = Dimensions.get('window').height; 

const ininialStateData = {
  isValidInput: [],
  text0: '',
  text1: '',
  text2: '',
}

  
  function ReactInputModal({title,subTitle, modalVisible, setModalVisible,
  onPress,returnKeyType=['done'],buttonSentTitle='Confirmar',buttonCancelTitle='Cancelar',animationType='fade',
  placeholder=[],typeInput=['normal'],preLoaded=null,invert=false,warn=false}) {

    const ref1 = React.useRef(false)
    const ref2 = React.useRef(false)

    const [invalidEmail, setinvalidInput] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState([true,true,true])
    const [focus, setFocus] = useState(0);
    const [data, setData] = useState({...ininialStateData});
    const themeContext = useContext(ThemeContext);

    React.useEffect(() => {
      if (preLoaded) {
        let array = ['','','']
        preLoaded.forEach((e,i) => {
          array[i] = e
          onChangeText(e,i,typeInput[i])
        });

        setData({...data,text0:array[0],text1:array[1],text2:array[2]})
      }
    }, [preLoaded])

    const onClose = () => {
      setModalVisible(false)
      setData({...ininialStateData,isValidInput:[]})
      setinvalidInput(false)
    }

    const onChangeText = (val,index,item) => {

      let regex = /^[0-9.,]+$/;
      var TEXT_INPUT = {...data}
      if (item == 'name') {
        TEXT_INPUT['text'+index.toString()] = val
      } else {
        TEXT_INPUT['text'+index.toString()] = val.trim()
      }
      
      if(item == 'pass') {
          if (typeInput.length > index+1 ? typeInput[index+1] == 'confirmePass' : false) {
            TEXT_INPUT.isValidInput[index+1] = (TEXT_INPUT['text'+(parseInt(index+1)).toString()] == val && TEXT_INPUT.isValidInput[parseInt(index)])
          }
          TEXT_INPUT.isValidInput[index] = val.trim().length >= 6
      } else if(item == 'email' ||item == 'emailOnly') {
          let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          TEXT_INPUT.isValidInput[index] = re.test(val.trim())
      } else if(item == 'confirmePass') {
          TEXT_INPUT.isValidInput[index] = (TEXT_INPUT['text'+(parseInt(index)-1).toString()] == val && TEXT_INPUT.isValidInput[parseInt(index)-1])
      } else if(item == 'num') {
            TEXT_INPUT.isValidInput[index] = val.trim().length >= 6 
      } else if(item == 'name') {
            TEXT_INPUT.isValidInput[index] = val.trim().length >= 1
      } else if(item == 'normal') {
            TEXT_INPUT.isValidInput[index] = val.trim().length >= 1
      } else if(item == 'cpf') {
            TEXT_INPUT.isValidInput[index] = val.trim().length == 14
      } else {
            TEXT_INPUT.isValidInput[index] = true
      }
      
      if (!invalidEmail) {
        setinvalidInput(true)
      }
      if (item == 'num' && !regex.test(val.trim())) {null} 
      else {
          setData({...TEXT_INPUT})
      }
    }

    function onEnviar() {
        if (onPress) onPress(data.text0,data.text1,data.text2,data.isValidInput,onClose)
        else onClose()
        setinvalidInput(false)
    }

    function onSubmit(index) {
      if (index == typeInput.length-1) {
        onEnviar()
      } else if (index == 0) {
        ref1.current.focus()
      } else if (index == 1) {
        ref2.current.focus()
      } else {
      }
    }

    function onSecureTextEntry(index) {
      var  secure = [...secureTextEntry]
      secure[index] = !secure[index]
      setSecureTextEntry([...secure])
    }
    
    return (
      <Modal animationType={animationType}  visible={modalVisible} transparent={true} onRequestClose={onClose}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""} style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.7)',width:'100%'}} >
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={{flex:1}}></View>
        </TouchableWithoutFeedback>
          <Container style={{width:windowWidth*(1-2*0.04)}}>
            <TextHeader style={styles.header}>{title}</TextHeader>
            {subTitle && <TextSubHeader style={styles.subHeader}>{subTitle}</TextSubHeader>}

            {typeInput.map((item,index)=>{

                    var TYPE = {};
                    if (item=='pass') {
                      TYPE = {
                        autoCompleteType:'off',
                        textContentType:'none',
                        keyboardType:'default'
                      }
                    } else if (item=='email') {
                      TYPE = {
                        autoCompleteType:'email',
                        textContentType:'emailAddress',
                        keyboardType:'email-address'
                      }
                    } else if (item=='emailOnly') {
                      TYPE = {
                        autoCompleteType:'off',
                        textContentType:'none',
                        keyboardType:'email-address'
                      }
                    } else if (item=='num') {
                      TYPE = {
                        autoCompleteType:'off',
                        textContentType:'none',
                        keyboardType:'numeric'
                      }
                    } else if (item=='cpf') {
                      TYPE = {
                        autoCompleteType:'off',
                        textContentType:'none',
                        keyboardType:'numeric',
                        mask:true,
                        maxLength:14,
                        type:'cpf'
                      }
                    } else {
                      TYPE = {
                        autoCompleteType:'off',
                        textContentType:'none',
                        keyboardType:'default'
                      }
                    }

                    return(
                    <InputContainer key={index} focused={focus == index+1 && typeInput.length > 1}>
                      <InputInitial
                        inputRef={index == 1 ? ref1 : index == 2 ? ref2 : null} 
                        onChangeText={(val) => onChangeText(val,index,item)}
                        placeholder={placeholder[index]}
                        autoCapitalize={item != 'name'?'none':'words'}
                        clearButtonMode='always'
                        autoFocus={index == 0 ? true : false }
                        returnKeyType={returnKeyType[index]}
                        blurOnSubmit={false}
                        value={data['text'+index.toString()]}
                        secureTextEntry={item != 'pass' && item !='confirmePass' ? false:secureTextEntry[index]}
                        onFocus={()=>setFocus(index+1)}
                        onBlur={()=>setFocus(0)}
                        icon={false}
                        blurOnSubmit={false}
                        allowFontScaling={true}
                        onSubmitEditing={()=>onSubmit(index)}
                        {...TYPE}
                      />
                      
                      {item == 'pass' || item =='confirmePass' ? 
                        <TouchableOpacity style={{padding:10,transform:[{translateX:-50}]}} onPress={()=>onSecureTextEntry(index)} >
                        {(secureTextEntry[index]) ? 
                          <Icons name="SecureOn" color={themeContext.text.fourth} size={20}/>
                        :
                          <Icons name="SecureVisible" color={themeContext.text.fourth} size={20}/>
                        }
                        </TouchableOpacity> 
                      : null}
                      {data.isValidInput[index] && invalidEmail && item != 'name' && item!='normal' ? 
                        <Animatable.View animation="bounceIn" >
                            <Icons name="Check" color={themeContext.status.success} size={20} />
                        </Animatable.View>
                      : null}
                    </InputContainer>
                    )
            })}
            <ContainerButtons invert={invert} >
              <ButtonCancel  invert={invert} activeOpacity={0.5} onPress={onClose}>
                  <TextCancel>{buttonCancelTitle}</TextCancel>
              </ButtonCancel>
              <ButtonOk disabled={!(data.isValidInput.findIndex(i=>i===false)== -1 && data.isValidInput.length == typeInput.length)} warn={warn} activeOpacity={0.7} onPress={onEnviar} isValid={data.isValidInput.findIndex(i=>i===false)== -1 && data.isValidInput.length == typeInput.length}>
                  <TextOk>{buttonSentTitle}</TextOk>
              </ButtonOk>
            </ContainerButtons>
          </Container>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{flex:1,alignItems:'center'}}>
          </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    );
  }


export default React.memo(ReactInputModal,isEqual)

  const styles = StyleSheet.create({
    textInput: {
  },
    header: {
  },
  subHeader: {
},

  buttons: {

  },
  button: {

    },
    textInputView: {

   },
    container: {
   },
  });
