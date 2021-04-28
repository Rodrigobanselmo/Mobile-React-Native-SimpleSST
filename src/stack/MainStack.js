import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import Preload from '../screens/Preload.js';
import CardStack from './Stacks/CardStack';
import NewCheckStack from './Stacks/NewCheckStack';
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
      <MainStack.Screen name="Preload" component={Preload} options={{ cardStyleInterpolator: forFade }} />
      <MainStack.Screen name="Card" component={CardStack} options={{cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid}} />
      <MainStack.Screen name="NewCheck" component={NewCheckStack} options={{cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid}} />
      <MainStack.Screen name="DrawerStack" component={DrawerStack} options={{ cardStyleInterpolator: forFade }} />
      <MainStack.Screen name="SignStack" component={SignStack} options={{ cardStyleInterpolator: forFade }} />
      <MainStack.Screen name="TabStack" component={TabStack} options={{ cardStyleInterpolator: forFade }} />
      <MainStack.Screen name="VerificationStack" component={VerificationStack} options={{ cardStyleInterpolator: forFade }} />
    </MainStack.Navigator>
  );

}