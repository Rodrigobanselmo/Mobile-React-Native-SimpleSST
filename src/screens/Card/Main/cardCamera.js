/* eslint-disable no-unused-vars */
import React, {useContext,useState,useEffect} from 'react';
import {ThemeContext} from "styled-components";
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
import {CardUploaded} from './cardUploaded'
import {v4} from "uuid";
import { useSelector } from 'react-redux';

import { TouchableOpacity,TextInput,FlatList } from 'react-native-gesture-handler';

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
const TextNoImages = styled.Text`
  width:200px;
  color: ${({theme})=>theme.text.grey};
  font-size:17px;
  text-align:center;
  
  ${props => props.windowHeight >700 && css`
    font-size:20px;
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

const AddImage = styled.Image`
    width: 100%;
    height: 200px;
    margin-bottom: 15px;
`;

const windowHeight = Dimensions.get('window').height

export function CardCamera({onDeletePhotoFromStorage,onAddPhotoToStorage,dispatch,item,groupId,onAnimatedFlip}) {
    const [image, setImage] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [data, setData] = useState({desc:'',title:''})

    const themeContext = useContext(ThemeContext);
    const reactModal = useReactModal();
    const user = useSelector(state => state.user);
    const answers = useSelector(state => state.answer);
    const photos = useSelector(state => state.photo);

    function onTakePhoto() {
      ImagePicker.openCamera({
        width: 720,
        height: 540,
        compressImageQuality:0.8,
        cropping: true,
      }).then(img => {
        //setImage([...images,image]);
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        setImage(imageUri);
        setModalVisible(true)
        setData({desc:'',title:''})
      }).catch((error)=>{
        console.log(error);
      })
    }
    
    function onChooseFoto() {
      ImagePicker.openPicker({
        width: 720,
        compressImageQuality:0.8,
        height: 540,
        cropping: true
      }).then(img => {
        if (img.size >2000000) {reactModal.alert({text:'Imagem está muito pessada (maior que 2 MB), verifique com o supporte para não haver um aumento de cobranças.'})}
        console.log(img);
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        setImage(imageUri);
        setModalVisible(true)
        setData({desc:'',title:''})
      }).catch((error)=>{
        console.log(error);
      })
    }

    function addQuestionPhoto(data) {
      if( image == null ) {
        return null;
      }
      const photo = {
        id:v4(),
        groupId,
        itemId:item.id,
        ...data,
        uploadedTry:false,
        percentage:0,
        uploaded:false,
      }
      dispatch({type: 'PHOTO_ADD_EDIT',payload:{data:photo}})
    }

    function onOpenModal(open,onFunc) {
      setModalVisible(open)
      if(onFunc) onFunc()
    }

    function onDeleteImage() {
      setModalVisible(false)
      if (data?.imageId && !data.uploaded) dispatch({type: 'PHOTO_DELETED',payload:{imageId:data.imageId}})
      else {
        onDeletePhotoFromStorage({data,dispatch,reactModal})
      }
    }

    return (
      <View style={{flex: 1,paddingHorizontal:15,paddingVertical:10}}>
        <View style={{flex: 1,marginBottom:10}}>
          <View style={{flexDirection:'row',alignItems:'center'}} >
            <Icons style={{marginRight:5}} name={'Camera'} color={themeContext.text.third} size={30*windowHeight/1000+0.1}/>
            <TextProgress windowHeight={windowHeight}>Fotos Adicionadas</TextProgress>
          </View>
          <View style={{flex: 1,paddingLeft: 10,backgroundColor:themeContext.background.paper,marginTop:10,borderRadius:10}}> 
          {console.log(photos)}
          {photos.length > 0  ?
            <FlatList
              data={photos.filter(i=>(i.groupId === groupId && i.itemId === item.id) )}
              renderItem={({item:images,index})=>{return <CardUploaded checkListId={answers.id} photos={photos} images={images} index={index} item={item} onAddPhotoToStorage={onAddPhotoToStorage} reactModal={reactModal} user={user} groupId={groupId} dispatch={dispatch} onOpenModal={onOpenModal} setData={setData} setImage={setImage} themeContext={themeContext}/>}}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              style={{paddingTop:10}}
            />
          :
            <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
              <Icons name={'NoImages'}  color={themeContext.text.grey} size={100}/>
              <TextNoImages numberOfLines={2} windowHeight={windowHeight}>Nenhuma Foto Adicionada</TextNoImages>
            </View>
          }
          </View>
        </View>
        <ButtonInitial
          secondary={true}
          onPress={onTakePhoto}
          scale={0.65*windowHeight/1000+0.23}
          elevation={true}
          text='Tirar Foto'
        />
        <ButtonInitial
          secondary={true}
          onPress={onChooseFoto}
          scale={0.65*windowHeight/1000+0.23}
          elevation={true}
          text='Escolher da Biblioteca'
        />
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingTop:10}} onPress={()=>onAnimatedFlip(0)}>
          <Icons name={'ArrowBack'} color={themeContext.text.third} size={19*windowHeight/1000+8.0}/>
          <TextProgress windowHeight={windowHeight}>Voltar</TextProgress>
        </TouchableOpacity>
        <CardModal onDeleteImage={onDeleteImage} photos={photos} image={image} setData={setData} data={data} modalVisible={modalVisible} setModalVisible={setModalVisible} addQuestionPhoto={addQuestionPhoto}/>
      </View>

    );
}

const styles = StyleSheet.create({

  textInput: {flex: 1,paddingLeft: 10,color: '#000',},
});
