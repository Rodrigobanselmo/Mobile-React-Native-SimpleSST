import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../../components/stackComponents/DrawerContent';
import { CardStyleInterpolators } from '@react-navigation/stack';
import TabStack from './TabStack';
import ConfigScreen from '../../screens/Drawer/ConfigScreen';
import Drawer_2 from '../../screens/Drawer/Drawer_2';
import Card from '../../screens/Card/Main';
import VerificationStack from './VerificationStack';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();

export default function App({route}) {
  return (                                                                               //tabStack
      <Drawer.Navigator initialRouteName={route.params?.screen ? route.params.screen : "Drawer_2"}  drawerStyle={{backgroundColor: '#fff', width: '80%', maxWidth:330,minWidth:310}} drawerContent={props => <View {...props} />} >
          <Drawer.Screen name="Card" component={Card} />
          <Drawer.Screen name="TabStack" component={TabStack} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
          <Drawer.Screen name="ConfigScreen" component={ConfigScreen} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
          <Drawer.Screen name="VerificationStack" component={VerificationStack} />
      </Drawer.Navigator>
  );
}