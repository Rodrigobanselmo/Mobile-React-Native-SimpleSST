import {SendEmailVerification,getCurrentUserReload,getCurrentUserEmailVerify} from '../../../services/firebaseAuth'
import {infoNet} from '../../../helpers/infoNet'

export function onUserReload(reactModal,navigationReset) {

    reactModal.loader()
    infoNet(()=>getCurrentUserReload(checkSuccess,checkError),reactModal)
    
    function checkSuccess() {
        if (getCurrentUserEmailVerify()) reactModal.close(), navigationReset({screen:'TabStack'})
        else reactModal.animated({text:'Endereço de email ainda não foi verificado',type:'Warn'})
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}

export function onSendVerification(reactModal,user,SendNow) {
    if (SendNow) {
        console.log('sssikjsosi')
        infoNet(()=>SendEmailVerification(checkSuccess,checkError),reactModal)
    } else reactModal.alert({title:'Reenviar Email',text:`Você deseja reenviar um email de verificação ao endereço: ${user.email}`,warn:false,onConfirm:()=>{
        infoNet(()=>SendEmailVerification(checkSuccess,checkError),reactModal)
        reactModal.loader()
    }})
    function checkSuccess() {
        console.log('dadsasdasa')
        setTimeout(() => {
            reactModal.loaderScreen({onFunc:()=>setTimeout(() => {reactModal.alert({text:'Email enviado com sucesso, verifique em sua caixa de entrada e "SPAM", caso contrário entre em contato com nosso suporte pelo site.',title:"Email Enviado!",warn:false})}, 800),animation:'emailSent',background:'#eee'})  
        }, 300);
    }

    function checkError(error) {
        setTimeout(() => {
            reactModal.alert({text:error,title:"Alerta de Erro"})
        }, 500);
    }

}