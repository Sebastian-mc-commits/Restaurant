import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';
import RootPlacesStackParamList from '../../types/stackTypes/Places.type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../../store/hooks';

type PlaceListProps = NativeStackScreenProps<RootPlacesStackParamList, "Places">
export default function PlaceList({ navigation }: PlaceListProps): React.JSX.Element {

  const onSelected = () => {
    navigation.navigate("PlaceDetail", {
      id: 2
    })
  }

  const { places } = useAppSelector(state => state.place)

  return (
    <View style={styles.container}>
      <Text>Places </Text>
      <Button title='Go to Place' onPress={onSelected} />
    </View>
  );
}
