import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Sign from '../../screens/Sign';

const SignInStack = createStackNavigator();

const SignStack = ({navigation}) => (
    <SignInStack.Navigator headerMode='none' initialRouteName={"Sign"}>
        <SignInStack.Screen name="Sign" component={Sign}/>
    </SignInStack.Navigator>
);

export default SignStack;
