import {checkValidUser,checkConfirmPass,checkPass} from './valid'
import {CheckEmailExists,CreateEmail,RecoveryPass,SignInEmail,LogOut} from '../../services/firebaseAuth'
import {infoNet} from '../../helpers/infoNet'

export function onCheckEmail({data,setData,onAnimatedInput,reactModal}) {
    //LogOut()
    function checkSuccess(response) {
      if (response.length == 0) {
        reactModal.animated({text:'Seja bem vindo!',type:'check'})
        onAnimatedInput('register')
      }
      else {
        reactModal.animated({text:'Bem vindo de volta!',type:'check'});
        onAnimatedInput('login')
      }
      setTimeout(() => {reactModal.close()}, 500); 
    }
  
    function checkError(error) {
      reactModal.alert({text:error,title:'Erro de Login'})
    }


    if (checkValidUser(data.username,setData,reactModal)) {
      reactModal.loader()
      infoNet(()=>CheckEmailExists(data.username,checkSuccess,checkError),reactModal)
    }
}

export function onLoginUser({data,reactModal}) {

  function checkSuccess() {
    //reactModal.close()
  }

  function checkError(error) {
    reactModal.alert({text:error,title:'Erro de Login'})
  }

  if (checkPass(data,reactModal)) {
      reactModal.loader()
      infoNet(()=>SignInEmail(data.username,data.password,checkSuccess,checkError),reactModal)
  }

}

export function onCreateAccount({data,reactModal}) {

  function checkSuccess() {
    //reactModal.close()
  }
  
  function checkError(error) {
    reactModal.alert({text:error,title:'Erro de Login'})
  }

    if (checkConfirmPass(data,reactModal)) {
      reactModal.loader()
      infoNet(()=>CreateEmail(data.username,data.password,checkSuccess,checkError),reactModal)
    }
}

 export function onRecoveryPass({data,reactModal,setModalVisible}) {

      function checkSuccess() {
        setModalVisible(false)
        reactModal.alert({text:'Email enviado com sucesso, verifique em sua caixa de entrada e/ou span',title:'Email Enviado',warn:false})
    }

    function checkError(error) {
        reactModal.alert({text:error,title:'Alerta de Erro'})
        setModalVisible(false)
    }

    if (data) {
        reactModal.loader()
        infoNet(()=>RecoveryPass(data,checkSuccess,checkError),reactModal)
    } else {
      reactModal.animated({text:'Não foi possivel identificar seu endereço de email',type:'Warn'})
    }
} 