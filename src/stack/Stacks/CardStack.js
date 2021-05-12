import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import CardMain from '../../screens/Card/Main';
import CardConfig from '../../screens/Card/Config';
import CardSummary from '../../screens/Card/Summary';
import CardEmployee from '../../screens/Card/Employee';
import ChooseCompany from '../../screens/NewCheck/ChooseCompany';

const CardStack = createStackNavigator();

const CardStackNav = ({navigation}) => {

  //const user = useSelector(state => state.user);
    
    return (
        <CardStack.Navigator headerMode='none' initialRouteName={'CardMain'}>
            <CardStack.Screen name="CardMain" component={CardMain} options={{cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid}}/>
            <CardStack.Screen name="CardConfig" component={CardConfig} options={{cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid}}/>
            <CardStack.Screen name="CardSummary" component={CardSummary} options={{cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid}}/>
            <CardStack.Screen name="CardEmployee" component={CardEmployee} options={{cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid}}/>
            <CardStack.Screen name="CardChose" component={ChooseCompany} options={{cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid}}/>
        </CardStack.Navigator>
    );
}
export default CardStackNav;
   