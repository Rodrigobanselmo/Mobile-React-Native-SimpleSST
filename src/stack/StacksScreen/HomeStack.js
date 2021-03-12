import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screen/Tab/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
  
  

const HomeStack = createStackNavigator();

 export default function HomeStackScreen({navigation}) {
  
    return (
      <HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#262626',
        },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold'
      }
  
      }>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#262626" onPress={() => navigation.openDrawer()}> </Icon.Button>
          ),
          headerTitleAlign: 'center',
          headerShown: true
        }}/>
      </HomeStack.Navigator>
    );
  }


  