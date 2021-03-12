import React, {useState} from 'react';
import { View, StyleSheet,Image,Text,Switch,Dimensions,Platform,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'
import {DrawerContentScrollView} from '@react-navigation/drawer';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
/* import {LogOut} from '../../services/FirebaseAuth'; */
import useAuth from '../../hooks/useAuthChange';
import {AbreviarNome} from '../../services/StringHandle';
import useReactModal from '../modalComponents/ModalAlert';

export function DrawerContent(props) {

    const [ dark, setDark ] = useState(false);
        
    const screenHeight = Dimensions.get('window').height;
    const user = useSelector(state => state.user);
    const [navigationActions] = useAuth()
    const [callBack, setCallBack] = useState(0);
    const [MainModal,onModalVisible] = React.useCallback(useReactModal(setCallBack),[callBack]);

    const toggleTheme = () => {
        setDark(!dark);
    }
    const onLogOutFunc = (screenName) => {
     /*  LogOut(navigationActions,screenName,onModalVisible) */
    }
    
    const MenuDrawer = () => {

        return(
            <View style={{flexDirection:'row', maxHeight:45,minHeight:40,height:screenHeight*0.048, backgroundColor:'transparent',marginTop:0/* ,alignItems:`flex-start` */}}>
                <MaterialCommunityIcons.Button /* underlayColor={`transparent`} activeOpacity={0.5} */ name="close" color={'#000'} backgroundColor='transparent' size={20} onPress={() => {props.navigation.closeDrawer()}}/> 
                <View style={{flex:1,alignItems:'center',justifyContent:'center',marginBottom:0}}>
                    <Text style={{color: '#000', fontSize:15}} >MENU</Text>
                </View>
                <MaterialCommunityIcons.Button /* underlayColor={`transparent`} activeOpacity={0.5} */ name="crown-outline" color={'#000'} backgroundColor='transparent' size={20} onPress={() => {props.navigation.navigate('Home')}}/> 
            </View>
        )
    }

    const FotoNameEmail = () => {
        
        const Radius = screenHeight*0.12
        var FontNameSize = screenHeight*0.026
        if (FontNameSize<24 && FontNameSize>20) {}  else if (FontNameSize<20) {FontNameSize = 20}  else {FontNameSize = 24}

        return(
                <View style={{alignItems:'center',justifyContent:'flex-start',marginBottom:0,marginTop:10,marginHorizontal:20,minHeight:170,flex:1}}>
                  <View style={{maxHeight:110,maxWidth:110,minHeight:90,minWidth:90,marginBottom:10, alignItems:'center',justifyContent:'center',borderColor:'#000',height:Radius,width:Radius,borderRadius:55,borderWidth:2.5}}>
                      {user?.photoURL && user.photoURL ? 
                        <Image  style={{maxHeight:100,maxWidth:100,minHeight:80,minWidth:80,marginTop:0,height:Radius*0.90,width:Radius*0.90,borderRadius:50}} source={{ uri: user.photoURL }} />
                      :
                        <Image  style={{maxHeight:100,maxWidth:100,minHeight:80,minWidth:80,marginTop:0,height:Radius*0.90,width:Radius*0.90,borderRadius:50}} source={{ uri: null }} />
                      }
                  </View>
                  <Text style={{color: '#000', fontSize:FontNameSize,fontWeight:'700',textAlign:`center`}}>{user && user?.givenName ? AbreviarNome(user.givenName + " " + user.familyName,22): 'Usuário'}</Text>
                  <Text style={{color: '#151515', fontSize:FontNameSize*0.66, alignItems:'center',justifyContent:'center'}} numberOfLines={1}>{user.email}</Text>
                </View>
        )
    }

    const IconsNavigate = ({iconName,screenName,backColor = '#000',iconColor = '#fff', marginTop=5, name,onSwitch=false, onLogOut=false}) => {
        
      const HeightIcon = screenHeight*0.06
      var FontNameSize = screenHeight*0.02
      if (FontNameSize<22 && FontNameSize>18) {}  else if (FontNameSize<18) {FontNameSize = 18}  else {FontNameSize = 22}

      return(
        <TouchableOpacity onPress={() => {onSwitch ? toggleTheme() : onLogOut ? onLogOutFunc(screenName) : props.navigation.navigate(screenName)}} style={{height:50, flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:marginTop,backgroundColor:'transparent'}} >
          <View style={{height:40,width:40,backgroundColor:backColor,justifyContent:'center',alignItems:'center',borderRadius:20,marginRight:15,marginLeft:50}}>
              <MaterialCommunityIcons style={{marginTop:0}} name={iconName} color={iconColor} backgroundColor='transparent' size={30} /> 
          </View>
          <Text style={{color: '#000', fontSize:FontNameSize,fontWeight:'300', flex:1}} >{name}</Text>
          {onSwitch === true ? 
            <View pointerEvents="none" style={{marginRight:10}}>
              <Switch value={dark} ios_backgroundColor={`#ddd`}/>
            </View>
          :null}
        </TouchableOpacity>  
      )
  }
  
    return(
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <DrawerContentScrollView bounces={false} style={{marginTop:Platform.OS === 'ios' ? -15 : 0}} {...props}>
                <MenuDrawer/>
                <FotoNameEmail/>  
                <IconsNavigate iconName={'crown-outline'} screenName={`TabStack`} name={'Home'} marginTop={25}/>
                <IconsNavigate iconName={'theme-light-dark'} screenName={`Home`} name={'Darkmode'} onSwitch={true} />
                <IconsNavigate iconName={'cog-outline'} screenName={`ConfigScreen`} name={'Configurações'} />
                <IconsNavigate iconName={'exit-to-app'} onLogOut={true} screenName={`SignStack`} name={'Log Out'} backColor={'#fff'} iconColor={'#000'} />
            </DrawerContentScrollView>
            <MainModal/>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
  });
