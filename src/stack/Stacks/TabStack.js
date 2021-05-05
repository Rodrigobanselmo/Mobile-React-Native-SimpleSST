import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../components/stackComponents/CustomTabBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../../screens/Tab/Home';
// import Tab_2 from '../../screens/Tab/Tab_2';
import Profile from '../../screens/Tab/Profile';
// import Tab_4 from '../../screens/Tab/Tab_4';
// import Tab_5 from '../../screens/Tab/Tab_5';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const Tab = createBottomTabNavigator();


export default () => {
    
    changeNavigationBarColor('#333333', false)
    
    return (
    <Tab.Navigator initialRouteName={'Home'} tabBar={props=> <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        {/* <Tab.Screen name="Tab_5" component={Tab_5} /> */}
    </Tab.Navigator>
)};