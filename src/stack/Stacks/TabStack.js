import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../components/stackComponents/CustomTabBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tab_1 from '../../screens/Tab/Tab_1';
import Tab_2 from '../../screens/Tab/Tab_2';
import Tab_3 from '../../screens/Drawer/Drawer_2';
import Tab_4 from '../../screens/Tab/Tab_4';
import Tab_5 from '../../screens/Tab/Tab_5';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const Tab = createBottomTabNavigator();


export default () => {
    
    changeNavigationBarColor('#333333', false)
    
    return (
    <Tab.Navigator tabBar={props=> <CustomTabBar {...props} />}>
        <Tab.Screen name="Tab_1" component={Tab_1} />
        <Tab.Screen name="Tab_2" component={Tab_2} />
        <Tab.Screen name="Tab_3" component={Tab_3} />
        <Tab.Screen name="Tab_4" component={Tab_4} />
        <Tab.Screen name="Tab_5" component={Tab_5} />
    </Tab.Navigator>
)};