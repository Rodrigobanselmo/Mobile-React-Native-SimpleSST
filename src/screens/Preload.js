import React, { useState, useEffect } from 'react';
import { View, StatusBar,Image} from 'react-native';
import LottieView from 'lottie-react-native';
import useAuth from'../hooks/useAuthChange';
import { StackActions } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { useSelector, useDispatch } from 'react-redux';

export default ({navigation}) => {

    const [initializing, setInitializing] = useState(true);
    const [userLogin, setUserLogin] = useState(false);
    const [_,navigationReset] = useAuth(initializing,setInitializing,setUserLogin)
    const checklist = useSelector(state => state.checklist);

    useEffect(()=> {

      changeNavigationBarColor('#0d0d0d', false)

      setUserLogin(false);
      if (initializing) {null}
      else if (!userLogin) {
      //else if (false) {
        navigationReset({screen:'SignStack'})
      } else if (userLogin.emailVerified) {
        if (checklist && checklist.name) navigationReset({screen:'Card'})
        else navigationReset({screen:'TabStack'})
        //navigationReset({screen:'TabStack'})
        // navigationReset({screen:'Card'})
      } else {
        // navigationReset({screen:'Card'})
        navigationReset({screen:'VerificationStack'})
      }
    }, [initializing]);

    return (
    <View style={{flex:1, backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center'}}>
    <StatusBar backgroundColor='#F27329' barStyle="dark-content"/>
      {initializing ?
        <View style={{flex:1,justifyContent:'center',alignItems:"center"}} >
        <Image animation="bounceIn" duraton="1500" source={require('../assets/logo.png')} style={{height:250,width:250,resizeMode:`contain`, marginTop:0}}/>
        </View>
      :
        null
      }
    </View>
    );
}
//<Image source={require('../../assets/gamma.png')} resizeMode='contain' style={{width: 250, height: 250}}/>
//<Text>Gamma jr. App</Text>
