import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';  

import {v4} from "uuid";

export const errorCatch = (error) => {

  let errorMessage = error

  if (error.code === 'storage/unknown') {
    errorMessage = 'Ocorreu um erro desconhecido.'
  }
  else if (error.code === 'storage/object-not-found') {
    errorMessage = 'Não é possivel encontrar este arquivo em nosso banco de dados!'
  }
  else if (error.code === 'storage/retry-limit-exceeded') {
    errorMessage = 'O limite máximo de tempo em uma operação foi excedido. Envie novamente.'
  }
  else if (error.code === 'storage/quota-exceeded') {
    errorMessage = 'Sua cota de upload foi exedida, por favor, entre em contato com o suporte.'
  }
  else if (error.code === 'storage/unauthenticated') {
    errorMessage = 'O usuário não está autenticado. Faça a autenticação e tente novamente.'
  }
  else if (error.code === 'storage/canceled') {
    errorMessage = 'O usuário cancelou a operação.'
  }
  else if (error.code === 'storage/cannot-slice-blob') {
    errorMessage = 'Em geral, isso ocorre normalmente quando o arquivo local é alterado (excluído, salvo novamente etc.). Tente fazer o upload novamente após verificar que o arquivo não foi alterado.'
  }
  else if (error.code === 'storage/server-file-wrong-size') {
    errorMessage = 'O arquivo no cliente não corresponde ao tamanho do arquivo recebido pelo servidor. Envie novamente.'
  }
  else if (error.code === 'storage/unauthorized') {
    errorMessage = 'Você não possui permisão para realizar essa ação!'
  }
  else if (error.code === 'permission-denied') {
    errorMessage = 'Você não possui permisão para realizar essa ação!'
  }
  else {
    errorMessage = error.message
  }

  console.log('error',error)
  console.log('error code',error.code)

  return errorMessage
}

export const addPhotoToStorage = async ({pathToFile,checkListId,filename,user,photo,setPercentage,checkSuccess,checkError}) => {
  
  //console.log(user);
  const storageRef = storage().ref(`${user.company.id}/${filename}`);

  const task = storageRef.putFile(pathToFile);

  task.on('state_changed', (taskSnapshot) => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );

    setPercentage(
      Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
    );
  });

  try {

    await task;
    const url = await storageRef.getDownloadURL();
    const meta = await storageRef.getMetadata();
    const readData = {
      url,
      contentType:meta.contentType,
      timeCreated:meta.timeCreated,
      fullPath:meta.fullPath,
      title:photo.title,
      description:photo.desc,
      checkListId:checkListId
    }
    addPhotoToFirestore({readData,user,url,meta,checkSuccess,checkError})
    //checkSuccess(url,meta);

  } catch (error) {
    checkError(errorCatch(error))
  }

}; 

export const deletePhotoFromStorage = async ({data,checkSuccess,checkError}) => {
  
  //console.log(user);
  const storageRef = storage().ref(data.fullPath);

  storageRef.delete().then(function() {
    checkSuccess();
  }).catch(function(error) {
    checkError(errorCatch(error))
});



}; 

export function addPhotoToFirestore({readData,user,url,meta,checkSuccess,checkError}) {
  
  const Ref = firestore().collection("company").doc(user.company.id)
  const reduceRef = Ref.collection('reduceRead')
  let docId = null;
  const batch = firestore().batch();
  
  reduceRef.where("id", "==", 'photo').get()
  .then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
      if(doc.data().data.length < 500) docId=doc.id
    })
    if (docId !== null) {
      batchCreate()
    } else {
      docId = v4()
      reduceRef.doc(docId).set({
        id:'photo',
        data:[]
      }).then(()=>{
        batchCreate()
      })
    }
    }).catch((error) => {
      checkError(errorCatch(error))
  });

  function batchCreate() {
    batch.update(reduceRef.doc(docId),{data:firebase.firestore.FieldValue.arrayUnion({...readData})})
    batch.commit().then(() => {
      checkSuccess(url,meta);
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }

/*   firestore()
    .collection('posts')
    .add({
      userId: user.uid,
      post: post,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    }) */
  
/*   .then(() => {
    checkSuccess(url,meta);
  })
  .catch((error) => {
    checkError(errorCatch(error))
    console.error("Error updating document: ", error);
  });   */

} 

