import {wordUpper} from '../../../helpers/StringHandle' 
import {AddUserData} from '../../../services/firestoreUser'
import {addPhotoToStorage} from '../../../services/FirebaseStorage'
import {infoNet} from '../../../helpers/infoNet'

export const onAddPhotoToStorage = ({photo,reactModal,dispatch,user,imageId,itemId,groupId}) => {


    if (!photo?.path) {return reactModal.alert({text:'Essa imagem possui diretório inexistente, isso pode ocorrer caso tenha apagado a imagem de seu dispositivo antes de ter sido completado o upload no servidor',title:'Error de Upload'});}
    
    //dispatch({type: 'ANSWER_PHOTO_UPDATED_TRY',payload:{imageId,itemId,groupId}})
    
    infoNet(()=>addPhotoToStorage({pathToFile:photo.path,filename:photo.id,user,setPercentage,checkSuccess,checkError}),reactModal,true,()=>dispatch({type: 'ANSWER_PHOTO_UPDATED_PERCENTAGE',payload:{imageId,itemId,groupId,percentage:0,isUploading:false}}))

    function setPercentage(perc) {
        dispatch({type: 'ANSWER_PHOTO_UPDATED_PERCENTAGE',payload:{imageId,itemId,groupId,percentage:perc}})
    }

    console.log('skop');
    function checkSuccess() {
        dispatch({type: 'ANSWER_PHOTO_UPDATED',payload:{imageId,itemId,groupId}})
/*         setTimeout(() => {
            reactModal.animated({title:'Sucesso', text:'Nome de usuário alterado com sucesso',type:'Check'})
        }, 500); */
    }

    function checkError(error) {
        dispatch({type: 'ANSWER_PHOTO_UPDATED_PERCENTAGE',payload:{imageId,itemId,groupId,percentage:0,isUploading:false}})
/*         setTimeout(() => {
            reactModal.animated({text:error,title:"Não foi possivel envisr a foto.",type:'Check'})
        }, 500); */
    }

};
