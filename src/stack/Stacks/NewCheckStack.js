import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import ChooseCheck from '../../screens/NewCheck/ChooseCheck';
import ChooseCompany from '../../screens/NewCheck/ChooseCompany';
import ChooseName from '../../screens/NewCheck/ChooseName';
import ChooseCargo from '../../screens/NewCheck/ChooseCargo';

const NewCheck = createStackNavigator();

const NewCheckNav = ({navigation}) => {

  //const user = useSelector(state => state.user);
    
    return (
        <NewCheck.Navigator headerMode='none' initialRouteName={'ChooseCheck'}>
            <NewCheck.Screen name="ChooseCheck" component={ChooseCheck} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
            <NewCheck.Screen name="ChooseCompany" component={ChooseCompany} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
            <NewCheck.Screen name="ChooseCargo" component={ChooseCargo} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
            <NewCheck.Screen name="ChooseName" component={ChooseName} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
        </NewCheck.Navigator>
    );
}
export default NewCheckNav;
   