import {wordUpper} from '../../../helpers/StringHandle' 
import {AddUserData} from '../../../services/firestoreUser'
import {addPhotoToStorage,deletePhotoFromStorage} from '../../../services/FirebaseStorage'
import {infoNet} from '../../../helpers/infoNet'
import { GetAllRisks,GetAllPer,AddRisks,GetAllRisksFromCache } from '../../../services/FirestoreCard'
import {v4} from "uuid";

export const onAddPhotoToStorage = ({photo,checkListId,reactModal,dispatch,user,imageId,itemId,groupId,setErrorMessage}) => {


    if (!photo?.path) {return reactModal.alert({text:'Essa imagem possui diretório inexistente, isso pode ocorrer caso tenha apagado a imagem de seu dispositivo antes de ter sido completado o upload no servidor',title:'Error de Upload'});}
    
    
    infoNet(()=>addPhotoToStorage({checkListId,pathToFile:photo.path,filename:photo.id,user,photo,setPercentage,checkSuccess,checkError}),reactModal,true,()=>{
        setErrorMessage('Falha em conectar-se com a internet')
        dispatch({type: 'PHOTO_UPDATED_PERCENTAGE',payload:{imageId,itemId,groupId,percentage:0,isUploading:false}})})

    function setPercentage(perc) {
        dispatch({type: 'PHOTO_UPDATED_PERCENTAGE',payload:{imageId,itemId,groupId,percentage:perc,isUploading:true}})
    }

    function checkSuccess(url,meta) {
        console.log('meta',meta);
        console.log('url',url);
        const data = {
            url,
            contentType:meta.contentType,
            timeCreated:meta.timeCreated,
            fullPath:meta.fullPath,
        }
        dispatch({type: 'PHOTO_UPDATED',payload:{imageId,itemId,groupId,data}})
    }

    function checkError(error) {
        dispatch({type: 'PHOTO_UPDATED_PERCENTAGE',payload:{imageId,itemId,groupId,percentage:0,isUploading:false}})
        setErrorMessage(error)
    }

};

export const onDeletePhotoFromStorage = ({data,reactModal,dispatch}) => {

    infoNet(
        ()=>{
            deletePhotoFromStorage({data,checkSuccess,checkError})
            dispatch({type: 'PHOTO_TO_DELETE',payload:{imageId:data.imageId,delete:'deletando imagem..'}})
        },
        reactModal,
        true,
        ()=>{
            reactModal.alert({text:'Falha em conectar-se com a internet',title:'Erro ao Deletar'})
    })



    function checkSuccess() {
        dispatch({type: 'PHOTO_DELETED',payload:{imageId:data.imageId}})
    }

    function checkError(error) {
        reactModal.alert({text:error,title:'Erro ao Deletar',type:'Warn'})
        dispatch({type: 'PHOTO_TO_DELETE',payload:{imageId:data.imageId,delete:'Não foi possível deletar a imagem, tente novamente.'}})
    }

};

export const onGetAllRisks = ({user,reactModal,dispatch}) => {
    
    GetAllRisks({companyId:user?.company?.id,checkSuccess,checkError})

    function checkSuccess(response) {
        dispatch({ type: 'CREATE_RISKS_DATA', payload: [...response.data] })
        dispatch({type: 'CREATE_RISKS',payload:[...response.risks]})
    }

    function checkError(error) {
        reactModal.alert({text:error,title:'Erro ao Tentar Buscar os Fatores de Risco',type:'Warn'})
    }
};

export const onGetAllPer = ({user,reactModal,dispatch}) => {
    
    GetAllPer({companyId:user?.company?.id,checkSuccess,checkError})

    function checkSuccess(response) {
        dispatch({type: 'CREATE_RISKS',payload:[...response.data]})
        dispatch({ type: 'CREATE_PER_DATA', payload: {...response.info} })
    }

    function checkError(error) {
        reactModal.alert({text:error,title:'Erro ao Tentar Buscar os Atividades Periculosas',type:'Warn'})
    }
};

export const onAddRisks = ({user,reactModal,dispatch}) => {

    var readData = {
        name:`Risco ${Math.floor(Math.random()*1000)}`,
        type:'aci',
        id:v4(),
      }

    //AddRisks({data:readData,readData,companyId:user?.company?.id,checkSuccess,checkError})

    function checkSuccess() {
        onGetAllRisks({user,reactModal,dispatch})
    }

    function checkError(error) {
        reactModal.alert({text:error,title:'Erro ao Criar Fator de Risco',type:'Warn'})
    }

};