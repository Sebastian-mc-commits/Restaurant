import React, {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  ViewStyle
} from 'react-native';
import colors from '../../utils/themes/colors';
import styles from './styles';

type Props = PropsWithChildren<{
  styles?: ViewStyle;
  hasError: boolean;
  isLoading: boolean;
  onHandleReloadData: () => void;
}>;
const LoaderView: React.FC<Props> = ({
  children,
  styles: _styles,
  hasError,
  isLoading,
  onHandleReloadData,
}): React.JSX.Element => {
  if (isLoading) {
    return <ActivityIndicator size={100} style={styles.activityIndicator} />;
  } else if (hasError) {
    return (
      <View style={styles.errorView}>
        <Text style={styles.errorMessage}>Something went wrong</Text>
        <Button
          title="Try Again"
          onPress={onHandleReloadData}
          color={colors.skyBlue}
        />
      </View>
    );
  }

  return <View style={_styles}>{children}</View>;
};

export default LoaderView;
