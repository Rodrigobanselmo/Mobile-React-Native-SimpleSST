import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Text,StyleSheet,View,TouchableOpacity } from 'react-native';
import {ThemeContext} from "styled-components";
import styled from "styled-components";

const ContainerTabArea = styled(View)`
    height: 52px;
    background-color: ${({theme})=>theme.tabBar.background};
    flex-direction:row;
/*     border-bottom-color:#e2e2e2;
    border-bottom-width:1px; */
`;

export default ({ state, navigation }) => {


  const themeContext = useContext(ThemeContext);
  
  const goTo = (screenName) => {
      navigation.navigate(screenName);
  }

  return (
    <ContainerTabArea style={styles.TabArea}>  
      <TouchableOpacity onPress={()=>goTo('Home')} style={styles.TabItem} >
          <Ionicons name="ios-home" color={themeContext.tabBar.icons} size={23} style={{opacity: state.index===0? 1 : 0.5}} />
      </TouchableOpacity>
      <View style={{backgroundColor:themeContext.tabBar.backButton, marginTop: -20,borderRadius:40}}>
        <TouchableOpacity onPress={()=>goTo('NewCheck')} style={styles.TabItemCenter} >
          <Ionicons name="add" color={themeContext.tabBar.plus} size={40} style={{opacity: state.index===2? 1 : 0.7,backgroundColor:themeContext.tabBar.backButton,borderRadius:50,padding:0}} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>goTo('Profile')} style={styles.TabItem} >
        <Ionicons name="ios-person" color={themeContext.tabBar.icons} size={23} style={{opacity: state.index===3? 1 : 0.5}} />
      </TouchableOpacity>
    </ContainerTabArea>
  );
}
const styles = StyleSheet.create({
  TabArea: {
    elevation:29,
  },
  TabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TabItemCenter: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2e2e2',
    borderRadius: 35,
    borderColor: '#d2d2d2',
    borderWidth: 1,
    elevation:26,
    borderStyle: 'solid',	
  },
  TextTab: {
    fontSize:12,
    color: '#fff',
  },
  AvatarIcon: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
});
