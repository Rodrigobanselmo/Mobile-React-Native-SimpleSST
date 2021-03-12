import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Preload from '../screens/Preload.js';
import DrawerStack from './Stacks/DrawerStack';
import SignStack from './Stacks/SignStack';
import TabStack from './Stacks/TabStack';
import VerificationStack from './Stacks/VerificationStack';

const MainStack = createStackNavigator();


export default () => {
  
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  
  return (
      
      <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="DrawerStack" component={DrawerStack} options={{ cardStyleInterpolator: forFade }} />
      <MainStack.Screen name="Preload" component={Preload} options={{ cardStyleInterpolator: forFade }} />
      <MainStack.Screen name="SignStack" component={SignStack} options={{ cardStyleInterpolator: forFade }} />
      <MainStack.Screen name="TabStack" component={TabStack} options={{ cardStyleInterpolator: forFade }} />
      <MainStack.Screen name="VerificationStack" component={VerificationStack} options={{ cardStyleInterpolator: forFade }} />
    </MainStack.Navigator>
  );

}