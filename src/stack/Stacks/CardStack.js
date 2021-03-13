import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import CardMain from '../../screens/Card/Main';
import CardNav from '../../screens/Card/Nav';

const CardStack = createStackNavigator();

const CardStackNav = ({navigation}) => {

  //const user = useSelector(state => state.user);
    
    return (
        <CardStack.Navigator headerMode='none' initialRouteName={'CardMain'}>
            <CardStack.Screen name="CardMain" component={CardMain} options={{cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid}}/>
            <CardStack.Screen name="CardNav" component={CardNav} options={{cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid}}/>
        </CardStack.Navigator>
    );
}
export default CardStackNav;
  