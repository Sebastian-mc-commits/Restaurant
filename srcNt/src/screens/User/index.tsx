import React, {useReducer} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getUserByCredentials} from '../../store/services/user-slice/user.service';

export default function User(): React.JSX.Element {
  interface UserState {
    email: string;
    password: string;
  }

  enum UserActionKind {
    UPDATE_FORM = 'UPDATE_FORM',
  }

  interface UserAction {
    type: UserActionKind;
    payload: {
      name: string;
      value: string;
    };
  }

  const initialState: UserState = {
    email: '',
    password: '',
  };

  const reducer = (state: UserState, action: UserAction) => {
    const {payload, type} = action;
    const {UPDATE_FORM} = UserActionKind;

    switch (type) {
      case UPDATE_FORM: {
        return {
          ...state,
          [payload.name]: payload.value,
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchStore = useAppDispatch();

  const {error, isLoading, currentUser} = useAppSelector(state => state.user);

  const onInputChange = (text: string, formType: string) => {
    dispatch({
      type: UserActionKind.UPDATE_FORM,
      payload: {
        name: formType,
        value: text,
      },
    });
  };

  const submit = () => {
    dispatchStore(getUserByCredentials(state));
    console.log(currentUser);
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={state.email}
        onChangeText={(text: string) => onInputChange(text, 'email')}
      />
      <TextInput
        placeholder="Password"
        value={state.password}
        onChangeText={(text: string) => onInputChange(text, 'password')}
      />

      <Button title="Enviar Datos" onPress={submit} />

      {!isLoading && !error && currentUser !== null && (
        <Text>User Set Name {currentUser.name}</Text>
      )}

      <Text>
        Error {error ? 'Error (Sadness)' : 'No errors :)'} | Loading{' '}
        {isLoading ? '...' : 'All Set'}
      </Text>
    </View>
  );
}
//sm93491677@example.com
