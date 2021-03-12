import firestore from '@react-native-firebase/firestore';

export const userActionsSign = (userLogin,navigationActions,onModalVisible) => {

  return async (dispatch) => {
    var usersDocRef = firestore().collection('user').doc(userLogin.uid);
    if (userLogin) {
      await usersDocRef
      .get().then((docData) => {
        if (docData.exists) {
          dispatch(addUserSuccess(docData.data()))
          if (docData.data().emailVerified) {
            onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','TabStack'),true,0,'loadSucess')
          } else {
            onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','VerificationStack'),true,0,'loadSucess')
          }
          console.log('Document data:', docData.data());
        } else {
          const addUser = async () => {
            var userData = {
              userId:userLogin.uid,
              email:userLogin.email,
              emailVerified:userLogin.emailVerified,
              providerId:['password'],
              metadata:userLogin.metadata,
              photoURL:false,
              name:null,
              givenName:null,
              familyName:null,
            }
            await usersDocRef.set(userData)
            .then(()=>{
              dispatch(addUserSuccess(userData))
              if (!userLogin.emailVerified) {
                onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','VerificationStack'),true,0,'loadSucess')
              } else {
                onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','TabStack'),true,0,'loadSucess')
              }
            })
            .catch(err=>{
              onModalVisible(true,'info',err,'Erro no Login')
              console.log('err',err)
            })
          }
          addUser()
        }
      }).catch((error) => {
        // Either
        onModalVisible(true,'info',error,'Erro no Login')
        console.log('error',error)
        // 1. failed to read due to some reason such as permission denied ( online )
        // 2. failed because document does not exists on local storage ( offline )
      });
    }
    
  } 
}

export const userActionsGoogle = (userLogin,navigationActions,onModalVisible) => {

  return async (dispatch) => {
    var usersDocRef = firestore().collection('user').doc(userLogin.user.uid);
    if (userLogin) {
      await usersDocRef
      .get().then((docData) => {
        if (docData.exists) {
          if (docData.data().providerId.includes("google.com")) {
            dispatch(addUserSuccess(docData.data()))
            onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','TabStack'),true,0,'loadSucess')
          } else {
            var userUpdate = {
              providerId: [...userLogin.providerId],
              emailVerified:true
            }
            if (!docData.data()?.name || !docData.data().name) {
              userUpdate = {...userUpdate,name:userLogin.additionalUserInfo.profile.name}
            }
            if (!docData.data()?.givenName || !docData.data().givenName) {
              userUpdate = {...userUpdate,givenName:userLogin.additionalUserInfo.profile.given_name}
            }
            if (!docData.data()?.familyName || !docData.data().familyName) {
              userUpdate = {...userUpdate,familyName:userLogin.additionalUserInfo.profile.family_name}
            }
            if (!docData.data()?.photoURL || !docData.data().photoURL) {
              userUpdate = {...userUpdate,photoURL:userLogin.additionalUserInfo.profile.picture}
            }
            usersDocRef.update({...userUpdate}).then(()=>{
              dispatch(addUserSuccess({...docData.data(),...userUpdate}))
              if ([...userLogin.providerId].length <= 1) onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','TabStack'),true,0,'loadSucess')
            }).catch(erro=>{
              onModalVisible(true,'info',erro,'Erro no Login')
              console.log('erro',erro)
            })
          }
          console.log('Document data:', docData.data());
        } else {
          var userData = {
            userId:userLogin.user.uid,
            emailVerified:true,
            email:userLogin.user.email,
            providerId:["google.com"],
            photoURL:userLogin.additionalUserInfo.profile.picture,
            name:userLogin.additionalUserInfo.profile.name,
            givenName:userLogin.additionalUserInfo.profile.given_name,
            familyName:userLogin.additionalUserInfo.profile.family_name,
            metadata:userLogin.user.metadata,
          }
            usersDocRef.set(userData)
            .then(()=>{
              dispatch(addUserSuccess(userData))
              onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','TabStack'),true,0,'loadSucess')
            })
            .catch(err=>{
              onModalVisible(true,'info',err,'Erro no Login')
              console.log('err',err)
            })
        }
      }).catch((error) => {
        // Either
        onModalVisible(true,'info',error,'Erro no Login')
        console.log('error',error)
        // 1. failed to read due to some reason such as permission denied ( online )
        // 2. failed because document does not exists on local storage ( offline )
      });
    }
  } 
}

export const userActionsCreate = (userLogin,navigationActions,onModalVisible) => {
  return async (dispatch) => {
    if (userLogin) {
      var userData = {
        userId:userLogin.uid,
        email:userLogin.email,
        emailVerified:userLogin.emailVerified,
        providerId:['password'],
        metadata:userLogin.metadata,
        photoURL:false,
        name:null,
        givenName:null,
        familyName:null,
      }
      await firestore().collection('user').doc(userLogin.uid).set(userData)
      .then(()=>{
        dispatch(addUserSuccess(userData))
        onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','VerificationStack'),true,0,'loadSucess')
      })
      .catch(err=>{
        onModalVisible(true,'info',err,'Erro no Login')
        console.log('err',err)
      })
    }
  } 
} 

export const userActionsDataChange = (data,navigationActions,onModalVisible) => {

  return async (dispatch) => {
    await firestore().collection('user').doc(data.uid).update({...data.changeData}).then(()=>{
      dispatch(changeUserSuccess({...data.changeData}))
      if (data?.action && data.action == 'navigate') {
        onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','TabStack'),true,0,'sucess')
      } else if (data?.action && data.action == 'navigateEmail') {
        onModalVisible(true,'loaderScreen',()=>navigationActions('DrawerStack','VerificationStack'),true,0,'emailSent')
      } else if (data?.action && data.action == 'name') {
        onModalVisible(true,'info','Nome de usuário trocado com sucesso','Sucesso')
      }
    }).catch(erro=>{
      onModalVisible(true,'info',erro.message,'Erro de Servidor')
      console.log('erro',erro)
    })
  }
}


export const addUserSuccess = (userData) => {
  return {
    type: 'LOGIN_USER',
    payload:userData
  }
}

export const changeUserSuccess = (userData) => {
  return {
    type: 'CHANGE_USER',
    payload:userData
  }
}