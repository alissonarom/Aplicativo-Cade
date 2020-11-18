import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, useTheme, Menu } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

const MenuPerfil = () => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const { colors } = useTheme();
  const navigation = useNavigation()

  function singOutUser () {
    firebase.auth().signOut();
      navigation.navigate("Login");
  };

  return (
    <View>
        <Button
            icon="settings-outline"
            onPress={showDialog}
            labelStyle={{
                color:colors.preto, fontSize: 27 }}
        />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Actions style={{flexDirection: "column", padding: 0, width: "90%"}}>
            <Menu.Item onPress={() => {navigation.navigate('EditPerfil'); hideDialog()}} title="Editar Perfil" style={{ width: "100%", margin: 0 }} />
            <Menu.Item onPress={() => {singOutUser(); hideDialog()}} title="Sair" style={{ width: "100%", margin: 0 }} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default MenuPerfil;