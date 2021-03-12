import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../Screen/Tab/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
  
  

const ProfileStack = createStackNavigator();

 export default function ProfileStackScreen({navigation}) {
  
    return (
      <ProfileStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#04D9B2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold'
      }
  
      }>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#04D9B2" onPress={() => navigation.openDrawer()}> </Icon.Button>
          ),
          headerTitleAlign: 'center',
          headerShown: true
        }}/>
      </ProfileStack.Navigator>
    );
  }


  