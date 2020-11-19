import React, {useState} from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, useTheme, Menu, List } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

const MenuPerfil = () => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
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
          <List.Section>
            <List.Accordion
              title="Editar perfil"
              left={props => <List.Icon {...props} icon="account-edit" />}
              expanded={expanded}
              onPress={handlePress}>
              <List.Item 
                title="Nome do perfil"
                onPress={() => {navigation.navigate('EditNome'); hideDialog()}}
              />
              <List.Item
                title="Categoria"
                onPress={() => {navigation.navigate('EditCategoria'); hideDialog()}}
              />
              <List.Item title="Endereço" />
              <List.Item title="Sobre a empresa" />
            </List.Accordion>
            <List.Item
              onPress={() => {singOutUser(); hideDialog()}}
              title="Sair"
              left={props => <List.Icon {...props} icon="exit-to-app" style={{marginLeft: 5}}/>} />
          </List.Section>
        </Dialog>
      </Portal>
    </View>
  );
};

export default MenuPerfil;

//onPress={() => {navigation.navigate('EditPerfil'); hideDialog() || onPress={() => {singOutUser(); hideDialog()}} 