/* eslint-disable no-unused-vars */
import React, {useContext,useState,useEffect} from 'react';
import {StyleSheet,Dimensions,View,ScrollView } from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled,{css} from "styled-components/native";
import {ButtonInitial,IconButton} from '../../../components/basicComponents/Button';
import ReactModal from '../../../components/modalComponents/ModalAlert';
import {ProgresseBar} from '../../../components/basicComponents/ProgresseBar';
import {ProgresseValue} from '../../../components/basicComponents/ProgresseValue';
import Icons from '../../../components/Icons'
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';
import {CardModal} from './cardModal'
import {v4} from "uuid";
import { useSelector } from 'react-redux';

import { TouchableOpacity,TextInput,FlatList } from 'react-native-gesture-handler';

const SmallImage = styled.Image`
  margin-right: 8px;
  height: 25px;
  width: 25px;
`;


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

const AnimatableTextProgress = styled(Animatable.Text)`
  width:auto;
  color: ${({theme})=>theme.text.third};
  ${props => props.windowHeight >700 && css`
    font-size:16px;
  `}
  ${props => props.windowHeight >800 && css`
    font-size:17px;
  `}
`;

export function CardUploaded({images,index,item,dispatch,groupId,user,onAddPhotoToStorage,reactModal,onOpenModal,setData,setImage,themeContext,answers}) {

  const [errorMessage, setErrorMessage] = useState('Upload falhou, Tente Novamente.')

  useEffect(() => {
    console.log(item.image);
    if ((images?.uploadedTry && images.uploadedTry) || images.uploaded) {console.log('uploaded');} 
    else {
      onAddphoto()
    }
  }, [])

  function onAddphoto() {
    if (!images.uploaded) {
      dispatch({type: 'ANSWER_PHOTO_UPDATED_TRY',payload:{imageId:images.id,itemId:item.id,groupId}})
      onAddPhotoToStorage({photo:images,reactModal,dispatch,user,itemId:item.id,groupId,imageId:images.id,setErrorMessage})
    }
  }

  function EditImage() {
    //let groupIndex = answers.data.findIndex((i)=>i?.id && i.id===groupId)
    //let itemIndex = answers.data[groupIndex].questions.findIndex((i)=>i?.id && i.id===item.id)
    //let imageIndex = answers.data[groupIndex].questions[itemIndex].image.findIndex((i)=>i?.id && i.id===images.id)
    onOpenModal(true,onAddphoto)
    setImage(images.path)
    setData({desc:images.desc,title:images.title,groupId,itemId:item.id,imageId,imageId:images.id})
  }

  return (
    <View style={{width:'100%',justifyContent:'flex-start',paddingTop:0,paddingBottom:0,marginBottom:10,paddingRight:10}} >
      <View style={{flexDirection:'row',alignItems:'center',marginBottom:0}} >
        <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={EditImage}>
          {images?.uploaded && images.uploaded ? 
            <SmallImage style={{resizeMode: 'contain'}} source={{uri: images.path}}  />
            :
            <Icons name={'Image'} style={{marginRight:8}} color={themeContext.text.third} size={25}/>
          }
            <TextProgress numberOfLines={1} ellipsizeMode='tail' style={{paddingRight:10}}>{images?.title ? images.title : `Imagem sem título ${index+1}`}</TextProgress>
        </TouchableOpacity>
        <View style={{flex:1,alignItems:'flex-end'}}>
          {!images.isUploading && images.percentage  != '100' ?
            (images?.uploadedTry && images.uploadedTry && !images?.uploaded) ?
              <TouchableOpacity onPress={onAddphoto}>
                <Icons name={'UploadFail'} style={{paddingVertical:7,paddingLeft:20}} color={themeContext.text.third} size={24}/>
              </TouchableOpacity>
            :
                <Icons name={'Upload'} style={{paddingVertical:7}} color={themeContext.text.third} size={24}/>
          :
            <ProgresseValue percentage={images.percentage} style={{fontSize:13,color:themeContext.text.third,height:40}}/>
          }
        </View>
      </View>
      <ProgresseBar percentage={images.percentage} style={{height:8,borderColor:themeContext.background.line}}/>
      {(!images.isUploading && images?.uploadedTry && images.uploadedTry && !images?.uploaded) ?
        <AnimatableTextProgress animation="fadeInLeft" duration={1000} numberOfLines={1} ellipsizeMode='tail' style={{flex:1,paddingRight:10,color:themeContext.status.fail2,fontSize:10}}>
          {errorMessage}
        </AnimatableTextProgress>
      :
        null
      }
  </View>
  );
}
