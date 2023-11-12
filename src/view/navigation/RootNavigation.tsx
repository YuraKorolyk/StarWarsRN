import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PersonScreen from '../screens/PersonScreen';
import {IPerson} from '../../interfaces/people.interface';

type ScreenRouteParams = {
  people: IPerson;
};

export type RootStackParamList = {
  HomeScreen: undefined;
  PersonScreen: ScreenRouteParams;
};

const RootNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PersonScreen"
          component={PersonScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
