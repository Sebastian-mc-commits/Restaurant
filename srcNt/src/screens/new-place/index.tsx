import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import styles from './styles';
import RootPlacesStackParamList from '../../types/stackTypes/Places.type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../store/hooks';
import { addPlace } from '../../store/features/place.slice';
import colors from '../../utils/themes/colors';

type PlaceProps = NativeStackScreenProps<RootPlacesStackParamList, "NewPlace">

export default function NewPlace({ navigation }: PlaceProps): React.JSX.Element {

  const [title, setTitle] = useState("")

  const dispatchStore = useAppDispatch()

  const onHandleChangeText = (text: string) => {
    setTitle(text)
  }

  const onHandleSubmit = () => {
    dispatchStore(addPlace({ id: Date.now().toString(), title }))
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder='New location'
          onChangeText={onHandleChangeText}
          value={title}
        />

        <Button
          title='Record location'
          color={colors.primary}
          onPress={onHandleSubmit}
        />
      </View>
    </ScrollView>
  );
}
