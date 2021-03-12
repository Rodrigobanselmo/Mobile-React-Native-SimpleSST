//Aqui verifica se email é valido, se for poe o ICON CHECK TRUE e se não for, coloca ICON CHECK FALSE -- aqui nao faz nada se vc sair do input (OUTRO FUNÇÃO)
export function handleEmailChange(val,data,setData) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(val.trim()) ) { 
        setData({
            ...data,
            username: val.trim(),
            check_textInputChange: true,
            isValidUser: true
        });
    } else {
        setData({
            ...data,
            username: val.trim(),
            check_textInputChange: false,
        });
    }  
}

//Aqui verifica se password é valido, se for poe o 'Valid Password' TRUE e se não for, coloca 'Valid Password' FALSE
export  const handlePasswordChange = (val,data,setData,onAnimatedButton,expanded) => {
    if( val.trim().length < 6 && data.password.length < val.trim().length && !data.isWarn ) {
        setData({
            ...data,
            password: val.trim(),
            isWarn: false,
        });
    } else if( val.trim().length >= 6) {
        if (!data.isValidPassword && expanded && expanded !== 'register') onAnimatedButton(1)
        else if (expanded && expanded === 'register' && data.confirmPassword === val.trim()) onAnimatedButton(1)
        else if (data.isEqualPassword && expanded && expanded === 'register' && data.confirmPassword !== val.trim()) onAnimatedButton(0)
        setData({
            ...data,
            password: val.trim(),
            isValidPassword: true,
            isEqualPassword: data.confirmPassword === val.trim(),
            isConfirmWarn: !(data.confirmPassword === val.trim()),
            isWarn: false,
        });
    } else {
        if (data.isValidPassword && expanded && expanded !== 'register') onAnimatedButton(0)
        if (data.isEqualPassword && expanded && expanded === 'register' && data.confirmPassword !== val.trim()) onAnimatedButton(0)

        setData({
            ...data,
            password: val.trim(),
            isValidPassword: false,
            isWarn: true,
        });
    }
}

export const confirmHandlePasswordChange = (val,data,setData,onAnimatedButton,expanded) => {
    
    if( val.trim().length < data.password.length && data.confirmPassword.length < val.trim().length && !data.isConfirmWarn ) {
        setData(data=>({
            ...data,
            confirmPassword: val.trim(),
            isConfirmWarn: false,
        }));
    } else if( data.password == val && data.isValidPassword) {
        if (!data.isEqualPassword && expanded && data.isValidPassword && data.password === val.trim()) onAnimatedButton(1)
        setData(data=>({
            ...data,
            confirmPassword: val.trim(),
            isEqualPassword: true,
            isConfirmWarn: false,
        }));
    } else {
        if (data.isEqualPassword && expanded && data.password != val.trim()) onAnimatedButton(0)
        setData(data=>({
            ...data,
            confirmPassword: val.trim(),
            isEqualPassword: false,
            isConfirmWarn: true,
        }));
    }
}

// Aqui ao sair do input ele verifica se ta certo e avisa se estiver errado
export function checkValidUser(val,setData,reactModal) {
    
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if ( re.test(val.trim()) ) {
        setData(data=>({
            ...data,
            isValidUser: true
        }));
        return true
    }
    else if (val.trim().length !== 0) {
        reactModal.animated({text:'E-mail com formatação inválida',type:'Warn'})
        setData(data=>({
            ...data,
            isValidUser: false
        }));
        /* setError('Email inserido com formatação inválida') */
        return false
    } else {
        reactModal.animated({text:'E-mail não pode ser nulo',type:'Warn'})
        /* setError('Por favor, insira seu email para continuar') */
        return false
    }
}

export const checkPass = (data,reactModal) => {

    if (data.isValidPassword && data.isValidUser) return  true
    else if (data.password === '' || data.username ==="") {
        reactModal.animated({text:'Preencha todos os campos para se cadastrar.',type:'Warn'})
        return  false
    }
    else if (data.password.length < 6) {
        reactModal.animated({text:'Senha deve conter no mínimo 6 dígitos.',type:'Warn'})
        return  false
    }
}

export const checkConfirmPass = (data,reactModal) => {

    if (data.password == data.confirmPassword && data.isValidPassword && data.isValidUser) return  true
    else if (data.password === '' || data.confirmPassword === '' || data.username === '') {
        reactModal.animated({text:'Preencha todos os campos para se cadastrar.',type:'Warn'})
        return  false
    }
    else if (data.password !== data.confirmPassword) {
        reactModal.animated({text:'As senhas devem ser iguais.',type:'Warn'})
        return  false
    }
    else if (data.password.length < 6) {
        reactModal.animated({text:'Senha deve conter no mínimo 6 dígitos.',type:'Warn'})
        return  false
    }
}
