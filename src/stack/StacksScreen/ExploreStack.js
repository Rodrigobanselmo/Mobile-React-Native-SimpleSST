import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../../Screen/Tab/ExploreScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const ExploreStack = createStackNavigator();


 export default function ExploreStackScreen({navigation}) {
  
    return (
      <ExploreStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#01402E',
        },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold'
      }
  
      }>
        <ExploreStack.Screen name="Explore" component={ExploreScreen}options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#01402E" onPress={() => navigation.openDrawer()}> </Icon.Button>
          ),
          headerTitleAlign: 'center',
          headerShown: true
        }}/>
      </ExploreStack.Navigator>
    );
  }

  