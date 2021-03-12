export function AbreviarNome(fullName,limit) {

    function abreviarControl() {
        if (fullName.length > limit) {
            return abreviar(fullName,limit);
        }
        return fullName;
    }
      
    function abreviar(str) {
        const [nome, ...sobrenomes] = str.split(' ');
        const abreviaturas = sobrenomes.reduce((arr, str) => {
            const letraGrande = str.match(/[A-ZÖÄÅÀÁÂÃÌÍÒÓÉÊÚ]/);
            if (!letraGrande) return arr;
                return arr.concat(`${letraGrande[0]}.`);
        }, []);
        var abr = abreviaturas.slice(0,abreviaturas.length-1)
        var latName = sobrenomes.slice(-1)
        if([nome, ...abr,latName].join(' ').length> limit) {
            return [nome, ...abreviaturas].join(' ');
        } else {
            return [nome, ...abr,latName].join(' ');
        }
    }
            
    return abreviarControl()
}

export function AbreviarSobrenome(fullName,limit) {

    function abreviarControl() {
        if (fullName.length > limit) {
            return abreviar(fullName,limit);
        }
        return fullName;
    }
      
    function abreviar(str) {
        const [...sobrenomes] = str.split(' ');
        const abreviaturas = sobrenomes.reduce((arr, str) => {
            const letraGrande = str.match(/[A-ZÖÄÅÀÁÂÃÌÍÒÓÉÊÚ]/);
            if (!letraGrande) return arr;
                return arr.concat(`${letraGrande[0]}.`);
        }, []);
        var abr = abreviaturas.slice(0,abreviaturas.length-1)
        var latName = sobrenomes.slice(-1)
        if([...abr,latName].join(' ').length> limit) {
            return [...abreviaturas].join(' ');
        } else {
            return [...abr,latName].join(' ');
        }
    }
            
    return abreviarControl()
}

export function Colocar3dots(value,maxlimit) {

    if ((value).length > maxlimit) {
        return (((value).substring(0,maxlimit-3)) + '...')
    } else {
        return value
    }
            
}
   
//Aqui verifica se email é valido, se for poe o ICON CHECK TRUE e se não for, coloca ICON CHECK FALSE -- aqui nao faz nada se vc sair do input (OUTRO FUNÇÃO)
export function textInputChange(val,data,setData) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(val.trim()) ) { //   if( val.trim().length >= 4 ) {
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

// Aqui ao sair do input ele verifica se ta certo e avisa se estiver errado
export function handleValidUser(val,data,setData) {
    
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if ( re.test(val.trim()) ) {
        setData({
            ...data,
            isValidUser: true
        });
    }
    else if (val.trim().length != 0) {
        setData({
            ...data,
            isValidUser: false
        });
    }
}

//////////referente ao INPUT de SENHA 
//Aqui verifica se password é valido, se for poe o 'Valid Password' TRUE e se não for, coloca 'Valid Password' FALSE
export  const handlePasswordChange = (val,data,setData,onAnimatedButton,expanded) => {
    if( val.trim().length < 6 && data.password.length < val.trim().length && !data.isWarn) {
        console.log('d')
        setData({
            ...data,
            password: val.trim(),
            isWarn: false,
        });
    } else if( val.trim().length >= 6) {
        if (!data.isValidPassword && expanded && expanded != 'cadastro') onAnimatedButton(1)
        if (expanded && expanded == 'cadastro' && data.confirmPassword === val.trim()) onAnimatedButton(1)
        if (data.isIqualPassword && expanded && expanded == 'cadastro' && data.confirmPassword != val.trim()) onAnimatedButton(0)
        setData({
            ...data,
            password: val.trim(),
            isValidPassword: true,
            isIqualPassword: data.confirmPassword === val.trim(),
            isConfirmeWarn: !(data.confirmPassword === val.trim()),
            isWarn: false,
        });
    } else {
        if (data.isValidPassword && expanded && expanded != 'cadastro') onAnimatedButton(0)
        if (data.isIqualPassword && expanded && expanded == 'cadastro' && data.confirmPassword != val.trim()) onAnimatedButton(0)

        setData({
            ...data,
            password: val.trim(),
            isValidPassword: false,
            isWarn: true,
        });
    }
}

export const confirmeHandlePasswordChange = (val,data,setData,onAnimatedButton,expanded) => {
    if( val.trim().length < data.password.length && data.confirmPassword.length < val.trim().length && !data.isConfirmeWarn ) {
        setData({
            ...data,
            confirmPassword: val.trim(),
            isConfirmeWarn: false,
        });
    } else if( data.password == val && data.isValidPassword) {
        if (!data.isIqualPassword && expanded && data.isValidPassword && data.password === val.trim()) onAnimatedButton(1)
        setData({
            ...data,
            confirmPassword: val.trim(),
            isIqualPassword: true,
            isConfirmeWarn: false,
        });
    } else {
        if (data.isIqualPassword && expanded && data.password != val.trim()) onAnimatedButton(0)
        setData({
            ...data,
            confirmPassword: val.trim(),
            isIqualPassword: false,
            isConfirmeWarn: true,
        });
    }
}

//ao clicar no olho de segurança revela ou retira a senha segura
export const updateSecureTextEntry = (data,setData) => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
}

export const updateConfirmSecureTextEntry = (data,setData) => {
    setData({
        ...data,
        confirmSecureTextEntry: !data.confirmSecureTextEntry
    });
} 