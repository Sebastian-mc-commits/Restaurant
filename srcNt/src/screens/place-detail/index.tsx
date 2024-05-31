import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import RootPlacesStackParamList from '../../types/stackTypes/Places.type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type PlaceProps = NativeStackScreenProps<RootPlacesStackParamList, "PlaceDetail">

export default function PlaceDetail({ route }: PlaceProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Places </Text>
      <Text>Param {route.params.id}</Text>
    </View>
  );
}
