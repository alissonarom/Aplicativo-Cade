import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, useTheme, List } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import Fire from '../config/Fire';

const MenuPerfil = () => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const { colors } = useTheme();
  const navigation = useNavigation()
  const [infos, setInfos] = useState({});
  const key = infos.chave;

  useEffect(() => {
    Fire.shared.userInfos
          .get()
          .then(function (doc) {
            setInfos(doc.data());
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
  }, []);


  function singOutUser () {
    firebase.auth().signOut();
      navigation.navigate("Login");
  };
  const SectionMembro = () => {  
    return (
      <List.Section>
      <List.Accordion
        title="Editar perfil"
        left={props => <List.Icon {...props} icon="account-edit" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item 
          title="Nome do perfil"
          onPress={() => {navigation.navigate("EditNome", {nome: infos.nome}); hideDialog()}}
        />
        <List.Item
          title="Endereço"
          onPress={() => {navigation.navigate("EditEndereco", {
            nome: infos.nome,
            rua: infos.rua,
            bairro: infos.bairro,
            cidade: infos.cidade,
            estado: infos.estado,
            userCep: infos.cep,});
            hideDialog()}}
        />
      </List.Accordion>
      <List.Item
            onPress={() => {singOutUser(); hideDialog()}}
            title="Sair"
            left={props => <List.Icon {...props} icon="exit-to-app" style={{marginLeft: 5}}/>} />
    </List.Section>
      );
    };
    const SectionEmpresa = () => {  
      return (
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
            <List.Item
              title="Endereço"
              onPress={() => {navigation.navigate('EditEndereco', {
                rua: infos.rua,
                bairro: infos.bairro,
                cidade: infos.cidade,
                estado: infos.estado,
                cep: infos.cep,});
                hideDialog()}}
            />
            <List.Item
              title="Sobre a empresa"
              onPress={() => {navigation.navigate("EditSobre")}}
            />
          </List.Accordion>
          <List.Item
            onPress={() => {singOutUser(); hideDialog()}}
            title="Sair"
            left={props => <List.Icon {...props} icon="exit-to-app" style={{marginLeft: 5}}/>} />
        </List.Section>
        );
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
        {
        key ? 
        (<SectionEmpresa/>) :
        (<SectionMembro/>)
      }
        </Dialog>
      </Portal>
    </View>
  );
};

export default MenuPerfil;

//onPress={() => {navigation.navigate('EditPerfil'); hideDialog() || onPress={() => {singOutUser(); hideDialog()}} 