import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightLeft, faChartColumn} from '@fortawesome/free-solid-svg-icons';
import {NavigationContainer} from '@react-navigation/native';

import Convert from '../screens/converter';
import Rates from '../screens/rates';

type DashboardParamsList = {
  Convert: React.JSX.Element;
  Rates: React.JSX.Element;
};

const Tab = createBottomTabNavigator<DashboardParamsList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: '#EB7824',
          tabBarInactiveTintColor: 'black',
          tabBarLabelStyle: {color: '#25313C'},
          tabBarStyle: {
            height: '8%',
            backgroundColor: '#F2F0EC',
            paddingBottom: 5,
          },
          tabBarShowLabel: true,
          tabBarHideOnKeyboard: false,
        })}>
        <Tab.Screen
          component={Convert}
          name="Convert"
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <FontAwesomeIcon icon={faRightLeft} color="orange" />
              ) : (
                <FontAwesomeIcon icon={faRightLeft} />
              ),
            tabBarLabel: 'CONVERTER',
            tabBarLabelStyle: {color: 'black', fontWeight: 900, lineHeight: 10},
          }}
        />
        <Tab.Screen
          component={Rates}
          name="Rates"
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <FontAwesomeIcon icon={faChartColumn} color="orange" />
              ) : (
                <FontAwesomeIcon icon={faChartColumn} />
              ),
            tabBarLabel: 'RATES',
            tabBarLabelStyle: {color: 'black', fontWeight: 900, lineHeight: 10},
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
