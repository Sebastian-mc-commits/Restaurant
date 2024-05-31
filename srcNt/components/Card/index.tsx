import React, {PropsWithChildren} from 'react';
import {View, ViewStyle} from 'react-native';
import styles from './styles';

type Props = PropsWithChildren<{
  styles?: ViewStyle;
}>;

const Card: React.FC<Props> = ({
  children,
  styles: _styles,
}): React.JSX.Element => {
  return <View style={(styles.container, _styles)}>{children}</View>;
};

export default Card;
