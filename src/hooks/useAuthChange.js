import {useEffect,useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useReactModal} from '../context/ModalContext'
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions, useNavigation,StackActions } from '@react-navigation/native';
import {GetUserData} from '../services/firestoreUser'
import {LogOut} from '../services/firebaseAuth'

const useAuth = (initializing,setInitializing,setUser) => {

 //LogOut()
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  const reactModal = useReactModal();

  function navigationActions(screen,screenName) {
    let subScreen = screenName ? screenName : 'TabStack'
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: screen, params: {screen:subScreen} }
        ],
      })
    );
  }

  function navigationReset({screen,param={}}) {
    navigation.dispatch(
      StackActions.replace(screen, param)
    );
  }

  function checkSuccess(doc,userLogin,newUser) {
    dispatch({type: 'LOGIN_USER',payload:{email:userLogin.email,emailVerified:userLogin.emailVerified,uid:userLogin.uid,...doc}})
    //reactModal.close()
    //console.log('user',{...doc})
    
    if (!setInitializing) {
      if ( !userLogin ) {
        navigationReset({screen:'SignStack'})
      } else if (userLogin.emailVerified && doc.name) {
        setTimeout(() => {
          reactModal.loaderScreen({onFunc:()=>navigationReset({screen:'TabStack'}),background:'#fff'})
        }, 700);
      } else {
        setTimeout(() => {
          reactModal.loaderScreen({onFunc:()=>navigationReset({screen:'VerificationStack'}),background:'#fff'})
        }, 700);
      }
    }
      
/*     if (newUser) {
      setTimeout(() => {reactModal.animated({text:'Seja bem-vindo!'})}, 1000);
    }
    if (newUser !== true && newUser) {
      setTimeout(() => {reactModal.animated({text:`Parabens, agora você é membro da empresa ${newUser}`})}, 3000);
    } */
    if (initializing) setTimeout(() => {setInitializing(false)}, 1000);
  }

  function checkError(error) {
    setTimeout(() => {
    reactModal.alert({text:error,title:'Erro de Acesso'})}, 600);
    LogOut(()=>{},()=>{})
    dispatch({type: 'LOGOUT_USER',})
  }

  function AuthStateChanged(userLogin) {
    console.log('user',user)
    console.log('userLogin',userLogin)

    if(!userLogin && user) dispatch({type: 'LOGOUT_USER',})
    else if (userLogin && !user) {
      console.log('object')
      GetUserData(userLogin,checkSuccess,checkError)
    } else {
      if (initializing) setTimeout(() => {setInitializing(false)}, 1000);
    }
    
    if (setUser && userLogin?.email) setUser(userLogin)
  }

  useEffect(() => {

    const subscriber = auth().onAuthStateChanged(AuthStateChanged);
    
    return subscriber //,()=>console.log('unsubscribe'); // unsubscribe on unmount
  }, []);

  return [navigationActions,navigationReset];
}
export default useAuth
