import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ButtonTabNavigator from './tabs';

export default function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ButtonTabNavigator />
    </NavigationContainer>
  );
}
