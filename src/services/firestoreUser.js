import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';  
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

/* export function CreatePendingUser(data,checkSuccess,checkError) {

  const array = []
  var batch = firestore().batch();
  data.array.map((item)=>{
    if (item?.id && item.id) {
      var pendingUsers = firestore().collection("users").doc(item.id);
      batch.update(pendingUsers,{
        company: {name:data.currentUser.company.name, id:data.currentUser.company.id},
        type: item.type,
        creation:{start:(new Date() - 1),end:0},
        admin:data.currentUser.company.name,
        status: 'Ativo',
        access:item.access,
        image:item.icon,
      })
    } else {
      var pendingUsers = firestore().collection("users").doc(item.email);
      batch.set(pendingUsers,{
        email: item.email,
        company: {name:data.currentUser.company.name, id:data.currentUser.company.id},
        type: item.type,
        creation:{start:(new Date() - 1),end:0},
        admin:data.currentUser.company.name,
        status: 'Aguardando Autenticação',
        access:item.access,
        name:'Aguardando Autenticação',
        image:item.icon,
        uid:''
      })
    }
    array.push({
      email: item.email,
      company: {name:data.currentUser.company.name, id:data.currentUser.company.id},
      type: item.type,
      creation:new Date(),
      admin:data.currentUser.company.name,
      status: 'Aguardando Autenticação',
      access:item.access,
      name:'Aguardando Autenticação',
      image:item.icon,
      uid:''
    })
  })


  batch.commit().then(() => {
    checkSuccess(array)
  }).catch((error) => {
    checkError(errorCatch(error))
  });
} */

export function AddUserData(data,uid,checkSuccess,checkError) {

  var userRef = firestore().collection("users").doc(uid);

  userRef.update({
    ...data
  })
  .then(() => {
    checkSuccess("Document successfully updated!");
  })
  .catch((error) => {
    checkError(errorCatch(error))
    console.error("Error updating document: ", error);
  });  

} 

export function GetUserData(userLogin,checkSuccess,checkError) {
  var usersRef = firestore().collection("users").doc(userLogin.uid);


  function checkPendingUser() {
    let usersEmailRef = firestore().collection("users").doc(userLogin.email)
    usersEmailRef.get().then((docSnapshots) => {
      if (docSnapshots.exists) {
        let docSnapshot = docSnapshots.data()
        firestore().collection("users").doc(userLogin.uid).set({
          uid:userLogin.uid,
          email:userLogin.email,
          company: docSnapshot.company,
          type: docSnapshot.type,
          creation:{start:(new Date() - 1),end:0},
          admin:docSnapshot.admin,
          status: 'Ativo',
          access:docSnapshot.access,
          image:docSnapshot.image,
          name:'',
        })
        .then(()=>{
          checkSuccess({
            uid:userLogin.uid,
            email:userLogin.email,
            company: docSnapshot.company,
            type: docSnapshot.type,
            creation:{start:(new Date() - 1),end:0},
            admin:docSnapshot.admin,
            status: 'Ativo',
            access:docSnapshot.access,
            name:'',
            image:docSnapshot.image,
          },userLogin,docSnapshot.company.name)
          usersEmailRef.delete().then(()=>console.log('user deleted'))
        }).catch((err)=>{
          checkError(errorCatch(err))
        })
      } else {
        usersRef.set({
          company:{id:false,name:false},
          email:userLogin.email,
          name:"",
          uid:userLogin.uid,
          info:{},
        }).then(()=>{
          checkSuccess({
            company:{id:false,name:false},
            email:userLogin.email,
            uid:userLogin.uid,
            name:"",
            info:{},
          },userLogin,true)
        }).catch((err)=>{
          checkError(errorCatch(err))
        })
      }
    }).catch((err)=>{
      checkError(errorCatch(err))
    })
  }


  usersRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      checkSuccess(docSnapshot.data(),userLogin)
    } else {
      checkPendingUser()
    }
  }).catch((error) => {
    checkError(errorCatch(error))
  });
}

/* export function SeeIfUserExists(email,companyId,checkSuccess,checkError) {
  
  var usersRef = firestore().collection("users")

  usersRef.where("email", "==", email).get()
  .then(function(querySnapshot) {
    let response = [false,false]
    querySnapshot.forEach(function(doc) {
        var companyId = doc.data() && doc.data()?.company && doc.data().company?.id ? doc.data().company.id : false
        if(doc.id !== email) response = [doc.id,companyId]
      })
      checkSuccess(response)
    }).catch((error) => {
      checkError(errorCatch(error))
  });
} */

/* export function GetAllUsersCompany(companyId,checkSuccess,checkError) {
  
  var usersRef = firestore().collection("users")

  usersRef.where("company.id", "==", companyId).get()
  .then(function(querySnapshot) {
    let response = []
    querySnapshot.forEach(function(doc) {
      var docx = doc.data()
      docx.company = docx.company.name
      docx.creation = docx.creation.start
      response.push(docx)
    })
    checkSuccess(response)
  })
  .catch((error) => {
      checkError(errorCatch(error))
  });
} */