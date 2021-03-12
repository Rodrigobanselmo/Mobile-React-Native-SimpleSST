import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../../Screen/Tab/DetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';

const DetailsStack = createStackNavigator();


 export default function DetailsStackScreen({navigation}) {
  
    return (
      <DetailsStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor:'#038C8C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: 'bold'
      }
  
      }>
        <DetailsStack.Screen name="Details" component={DetailsScreen}options={{
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#038C8C" color='#fff' onPress={() => navigation.openDrawer()}> 
                <Text style={{ fontFamily: 'Arial', fontSize: 20, color: '#000' }}>.</Text>
            </Icon.Button>
          ),
          title: 'Detalhes',
          headerTitleAlign: 'center',
        }}/>
      </DetailsStack.Navigator>
    );
  }

  