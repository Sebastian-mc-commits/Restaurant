import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import ButtonTabs from '../../types/buttonTabs';
import {TasksStack} from '../stacks';
import {UserAuth} from '../../screens';

export default function ButtonTabNavigator(): React.JSX.Element {
  const ButtonTab = createBottomTabNavigator<ButtonTabs>();
  return (
    <ButtonTab.Navigator>
      <ButtonTab.Screen name="Tasks" component={TasksStack} />
      <ButtonTab.Screen name="User" component={UserAuth} />
    </ButtonTab.Navigator>
  );
}
