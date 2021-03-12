import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import AddUser from '../../screens/Verification/AddUser';
import EmailVerify from '../../screens/Verification/EmailVerify';


const VerificationStack = createStackNavigator();

const VerificationStackNav = ({navigation}) => {
  const user = useSelector(state => state.user);
    
    return (
        <VerificationStack.Navigator headerMode='none' initialRouteName={user?.name && user.name ? "EmailVerify":'AddUser'}>
            <VerificationStack.Screen name="EmailVerify" component={EmailVerify} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
            <VerificationStack.Screen name="AddUser" component={AddUser} options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}/>
        </VerificationStack.Navigator>
    );
}
export default VerificationStackNav;