import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';  
import {v4} from "uuid";
/* firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
}) */

export const errorCatch = (error) => {

  let errorMessage = error

  if (error.code === 'storage/unknown') {
    errorMessage = 'Ocorreu um erro desconhecido.'
  }
  else if (error.code === 'storage/object-not-found') {
    errorMessage = 'Não é possivel encontrar este arquivo em nosso banco de dados!'
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

export function GetAllRisks({companyId,checkSuccess,checkError}) {

  var dataRef = firestore().collection("company").doc(companyId).collection('reduceRead')
  let risks = []
  let data = []

  function getData() {
    dataRef.where("id", "==", 'risksData').get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          data.push(...doc.data().data)
      })
      checkSuccess({risks,data})
    })
    .catch((error) => {
        checkError(errorCatch(error))
    });
  }

  dataRef.where("id", "==", 'risks').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      risks.push(...doc.data().data)
    })
    getData()
  })
  .catch((error) => {
      checkError(errorCatch(error))
  });


}

export function GetAllPer({companyId,checkSuccess,checkError}) {

  var dataRef = firestore().collection("company").doc(companyId).collection('risks').doc('000periculosos')


  dataRef.get().then(function(docSnapshots) {
    if (docSnapshots.exists) {
      checkSuccess({...docSnapshots.data()})
    } else {
      checkError(`Atividades Periculosas não encontrado em seu banco de dados.`)
    }
  }).catch((error) => {
    checkError(errorCatch(error))
  });

}

export function AddRisks({data,readData,companyId,checkSuccess,checkError}) {
  const riscRef = firestore().collection("company").doc(companyId)
  const risksRef = riscRef.collection('risks')
  const reduceRef = riscRef.collection('reduceRead')

  let docId = null;

  const batch = firestore().batch();

  //verifica se possui reduceRead doc com espaco vazio se nao ele cria
  reduceRef.where("id", "==", 'risks').get()
  .then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
      if(doc.data().data.length < 500) docId=doc.id
    })
    if (docId !== null) {
      batchCreate()
    } else {
      docId = v4()
      reduceRef.doc(docId).set({
        id:'risks',
        data:[]
      }).then(()=>{
        batchCreate()
      })
    }
    }).catch((error) => {
      checkError(errorCatch(error))
  });

  function batchCreate() {

    batch.set(risksRef.doc(v4()),{...data})
    batch.update(reduceRef.doc(docId),{data:firebase.firestore.FieldValue.arrayUnion({...readData})})
    batch.commit().then(() => {
      checkSuccess({...readData})
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }
}



export function GetAllRisksFromCache({companyId,checkSuccess,checkError}) {

  const dataRef = firestore().collection("company").doc(companyId).collection('reduceRead')
  let risks = []
  let data = []
  const getOptions = {
    source: 'cache'
  };


  dataRef.where("id", "==", 'risks').get(getOptions)
  .then(function(querySnapshot) {
    console.log(companyId);
    let query = true
    querySnapshot.forEach(function(doc) {
      query = false
      console.log(query);
      if (doc.data().data === []) server()
      else risks.push(...doc.data().data)
    })
    if (risks.length>0) getData('cache')
    else if (query) {
      console.log('server()');
      server()
    }
  })
  .catch((error) => {
    console.log(error);
    server()
  });

  function server() {
    dataRef.where("id", "==", 'risks').get()
    .then(function(querySnapshot) {
      let risks = []
      querySnapshot.forEach(function(doc) {
        risks.push(...doc.data().data)
      })
      getData('server')
    })
    .catch((error) => {
        checkError(errorCatch(error))
    });
  }
  
  function getData(options) {
    dataRef.where("id", "==", 'risksData').get({source: options})
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          data.push(...doc.data().data)
      })
      checkSuccess({risks,data})
    })
    .catch((error) => {
        checkError(errorCatch(error))
    });
  }
}