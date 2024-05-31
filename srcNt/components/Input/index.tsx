import React from 'react';
import {Text, TextInput, TextInputProps, View, ViewStyle} from 'react-native';
import styles from './styles';

export interface InputComponentProps extends TextInputProps {
  label: string;
  inputStyles?: ViewStyle;
  inputContainer?: ViewStyle;
  hasError: boolean;
  errorMessage: string;
  isTouched: boolean;
}

const Input: React.FC<InputComponentProps> = ({
  label,
  inputStyles,
  errorMessage,
  hasError,
  inputContainer,
  isTouched,
  ...textInputProps
}): React.JSX.Element => {
  return (
    <View style={[styles.container, inputContainer]}>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>{label}</Text>
        <TextInput
          style={[styles.inputStyle, inputStyles]}
          {...textInputProps}
        />
      </View>
      {hasError && isTouched && (
        <View style={styles.errorContainerStyle}>
          <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
