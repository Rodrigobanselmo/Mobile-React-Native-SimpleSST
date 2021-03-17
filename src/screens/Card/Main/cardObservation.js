/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {ThemeContext} from "styled-components";
import {Dimensions,View, } from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled,{css} from "styled-components/native";
import Icons from '../../../components/Icons'

import { TouchableOpacity,TextInput } from 'react-native-gesture-handler';


const TextProgress = styled.Text`
  width:auto;
  color: ${({theme})=>theme.text.third};
  ${props => props.windowHeight >700 && css`
    font-size:16px;
  `}
  ${props => props.windowHeight >800 && css`
    font-size:17px;
  `}
`;

export function CardObservation({onAnimatedFlip,setValue,value,model}) {

  const windowHeight = Dimensions.get('window').height

  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();

  function onChengeTextInput(value) {
    setValue(value)
  }
  function onConfirm(value) {
    setValue(model?.obs ?? '')
  }

  return (
    <View style={{flex: 1,paddingHorizontal:15,paddingVertical:10}}>
      <View>
        <View style={{flexDirection:'row',alignItems:'center'}} >
          <Icons style={{marginRight:5}} name={'Doc'} color={themeContext.text.third} size={30*windowHeight/1000+0.1}/>
          <TextProgress windowHeight={windowHeight}>Observações</TextProgress>
        </View>
        <TextInput
          value={value}
          onChangeText={(value)=>{onChengeTextInput(value)}}
          placeholder="Faça uma observação"
          style={{flex: 1,paddingLeft: 10,fontSize:15*windowHeight/1000+4.9,color: themeContext.text.primary,backgroundColor:themeContext.background.paper,marginTop:10,borderRadius:10,height:(35/83*(windowHeight)-82.5301)}}
          autoCapitalize="none"
          returnKeyType="next"
          textAlign="justify"
          numberOfLines={10}
          multiline={true}
          maxLength={300}
          textAlignVertical='top'
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection:'row',alignItems:'center',marginTop:10}} >
          <Icons style={{marginRight:5}} name={'Help'} color={themeContext.text.third} size={30*windowHeight/1000+0.1}/>
          <TextProgress windowHeight={windowHeight}>Sugestões</TextProgress>
        </View>
        <View style={{flex: 1,marginTop:5}}>
          {model?.obs &&
          <TouchableOpacity onPress={()=>reactModal.alert({text:'Deseja reescrever suas observações pelo sugestão selecioanda?',warn:false,title:'Copiar Texto',onConfirm:onConfirm})}>
            <TextProgress windowHeight={windowHeight}>{model?.obs ?? ''}</TextProgress>
          </TouchableOpacity>
          }
        </View>
      </View>
      <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingTop:10}} onPress={()=>onAnimatedFlip(0)}>
        <Icons name={'ArrowBack'} color={themeContext.text.third} size={19*windowHeight/1000+8.0}/>
        <TextProgress windowHeight={windowHeight}>Voltar</TextProgress>
      </TouchableOpacity>
    </View>

  );
}
