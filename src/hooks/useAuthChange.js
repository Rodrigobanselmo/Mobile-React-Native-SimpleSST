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
  const checklist = useSelector(state => state.checklist);
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
        reactModal.close()
      } else if (userLogin.emailVerified && doc.name) {
        //reactModal.loaderScreen({onFunc:()=>navigationReset({screen:'TabStack'}),background:'#fff'})
        if (checklist && checklist.name) navigationReset({screen:'Card'})
        else navigationReset({screen:'TabStack'})
        reactModal.close()
      } else {
          //reactModal.loaderScreen({onFunc:()=>navigationReset({screen:'VerificationStack'}),background:'#fff'})
          navigationReset({screen:'VerificationStack'})
          reactModal.close()
      }
    } 
    if (initializing) setInitializing(false);
      
/*     if (newUser) {
      setTimeout(() => {reactModal.animated({text:'Seja bem-vindo!'})}, 1000);
    }
    if (newUser !== true && newUser) {
      setTimeout(() => {reactModal.animated({text:`Parabens, agora você é membro da empresa ${newUser}`})}, 3000);
    } */
    
  }

  function checkError(error) {
    setTimeout(() => {
    reactModal.alert({text:error,title:'Erro de Acesso'})}, 600);
    LogOut(()=>{},()=>{})
    dispatch({type: 'LOGOUT_USER',})
  }

  function AuthStateChanged(userLogin) {
    //console.log('user',user)
    //console.log('userLogin',userLogin)

    if(!userLogin && user?.email && user.email) {dispatch({type: 'LOGOUT_USER',});}
    else if (userLogin && !user?.email) {
    GetUserData(userLogin,checkSuccess,checkError)
    } else {
      if (initializing) setInitializing(false);
    }
    console.log('userLogin?.email',userLogin?.email)
    if (setUser && userLogin?.email) setUser(userLogin)
  }


  useEffect(() => {

    const subscriber = auth().onAuthStateChanged(AuthStateChanged);
    
    return subscriber // unsubscribe on unmount
  }, []);

  return [navigationActions,navigationReset];
}
export default useAuth
