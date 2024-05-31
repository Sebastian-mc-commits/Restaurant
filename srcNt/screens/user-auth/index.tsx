import React, {useId, useState} from 'react';
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Card, Input} from '../../components';
import {InputComponentProps} from '../../components/Input';
import styles from './styles';
import colors from '../../utils/themes/colors';

export default function UserAuth(): React.JSX.Element {
  interface RenderInputType extends InputComponentProps {
    inputKey: string;
  }

  const [isLogged, setIsLogged] = useState(false);

  const inputData: RenderInputType[] = [
    {
      errorMessage: '',
      hasError: false,
      isTouched: false,
      label: 'Name',
      inputKey: useId(),
      placeholder: 'Write your name here',
    },
    {
      errorMessage: '',
      hasError: false,
      isTouched: false,
      label: 'Last Name',
      inputKey: useId(),
      placeholder: 'Write your last name here',
    },
  ];

  const inputDataLogin: RenderInputType[] = [
    {
      errorMessage: '',
      hasError: false,
      isTouched: false,
      label: 'Email',
      inputKey: useId(),
      placeholder: '@gmail.com',
    },
    {
      errorMessage: '',
      hasError: false,
      isTouched: false,
      label: 'Password',
      inputKey: useId(),
      placeholder: '****',
      secureTextEntry: true,
      autoCorrect: false,
    },
  ];

  const renderItem = ({item}: {item: RenderInputType}) => <Input {...item} />;

  const buttonMessageAuth = isLogged ? 'Sign Up' : 'Log in';
  const changeAuthBehavior = isLogged
    ? 'Do you already have an account?'
    : 'Do not you have an account?';

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={styles.authenticateText}>Authentication</Text>
      {isLogged && (
        <Card styles={styles.cardContainer}>
          <FlatList
            data={inputData}
            renderItem={renderItem}
            keyExtractor={(item: RenderInputType) => item.inputKey}
          />
        </Card>
      )}
      <Card styles={styles.cardContainer}>
        <FlatList
          data={inputDataLogin}
          renderItem={renderItem}
          keyExtractor={(item: RenderInputType) => item.inputKey}
        />
      </Card>

      <Button
        title={buttonMessageAuth}
        color={isLogged ? colors.deepNavy : colors.deepOceanBlue}
      />

      <TouchableOpacity onPress={() => setIsLogged(prev => !prev)}>
        <Text>{changeAuthBehavior}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
