import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const SnackSucess = () => {
  const [visible, setVisible] = React.useState(true);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
      <Snackbar
        duration={2500}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'ok',
          onPress: () => {
            // Do something
          },
        }}>
        Beleza deu certo!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default SnackSucess;