import {wordUpper} from '../../../helpers/StringHandle' 
import {AddUserData} from '../../../services/firestoreUser'
import {addPhotoToStorage} from '../../../services/FirebaseStorage'
import {infoNet} from '../../../helpers/infoNet'

export const onAddPhotoToStorage = ({photo,reactModal,dispatch,user,imageId,itemId,groupId,setErrorMessage}) => {


    if (!photo?.path) {return reactModal.alert({text:'Essa imagem possui diretório inexistente, isso pode ocorrer caso tenha apagado a imagem de seu dispositivo antes de ter sido completado o upload no servidor',title:'Error de Upload'});}
    
    
    infoNet(()=>addPhotoToStorage({pathToFile:photo.path,filename:photo.id,user,setPercentage,checkSuccess,checkError}),reactModal,true,()=>{
        console.log('123');
        setErrorMessage('Falha em conectar-se com a internet')
        dispatch({type: 'ANSWER_PHOTO_UPDATED_PERCENTAGE',payload:{imageId,itemId,groupId,percentage:0,isUploading:false}})})

    function setPercentage(perc) {
        dispatch({type: 'ANSWER_PHOTO_UPDATED_PERCENTAGE',payload:{imageId,itemId,groupId,percentage:perc,isUploading:true}})
    }

    function checkSuccess() {
        dispatch({type: 'ANSWER_PHOTO_UPDATED',payload:{imageId,itemId,groupId}})
    }

    function checkError(error) {
        console.log('456');
        dispatch({type: 'ANSWER_PHOTO_UPDATED_PERCENTAGE',payload:{imageId,itemId,groupId,percentage:0,isUploading:false}})
        setErrorMessage(error)
    }

};
