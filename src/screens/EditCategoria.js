import React, {useState, useEffect} from 'react';
import { TextInput, ActivityIndicator, useTheme, Menu, Button } from 'react-native-paper';
import {TouchableOpacity, View, StyleSheet, Text, ScrollView} from 'react-native';
import Fire from '../config/Fire';
import { useNavigation } from "@react-navigation/native";

const EditNome = () => {
  const [categoria, setCategoria] = useState("");
  const [infos, setInfos] = useState({});
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

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

  async function updateCategoria() {
    Fire.shared.updateUserCategoria({
    categoria: categoria
    });
    navigation.navigate("Home");
  };

  return (
          <View style={styles.boxViewsInput}>
           <Menu
              style={{
                width: "90%"
              }}
              contentStyle={{
                maxHeight: 300,
              }}
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <Button
                  icon="menu-down"
                  contentStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.cinzaMedio,
                    margin: 15
                  }}
                  color={colors.cinzaMedio}
                  mode="flat"
                  onPress={() => {
                    setVisible(true);
                  }}>
                  selecione um ramo de atividade{' '}
                </Button>
            }>
              <ScrollView>
              <Menu.Item
                onPress={() => {
                  setCategoria('Cantor, animador de festa');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Cantor, animador de festa"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Consultoria');
                  setVisible(false);
                }}
                contentStyle={{
                  width: 300
                }}
                titleStyle={{
                  width:340
                }}
                title="Consultoria"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Construção, reparos, reformas');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Construção, reparos, reformas"
              />
               <Menu.Item
                onPress={() => {
                  setCategoria('Cursos e treinamentos online');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                titleStyle={{
                  width:340
                }}
                title="Cursos e treinamentos online"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Cozinheiro, churrasqueiro profissional');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Cozinheiro, churrasqueiro profissional"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Diarista, freelancer');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Diarista, freelancer"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Freteiro, montador de móveis');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Freteiro, montador de móveis"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Locação ambiente de festas');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Locação ambiente de festas"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Limpeza jardinagem');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Limpeza jardinagem"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Marido de aluguel');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Marido de aluguel"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Serviços mecânicos');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Serviços mecânicos"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Saúde, estética e beleza');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Saúde, estética e beleza"
              />
              <Menu.Item
                onPress={() => {
                  setCategoria('Marketing');
                  setVisible(false);
                }}
                titleStyle={{
                  width:340
                }}
                title="Marketing"
              />
              </ScrollView>
            </Menu>
            <TextInput
              mode= "outlined"
              placeholder= {infos.categoria ? (infos.categoria):("Nome da Empresa")}
              autoCapitalize="characters"
              value={categoria.toUpperCase()}
              onChangeText={setCategoria}
              style={{margin: 20}}
            />
            <TouchableOpacity onPress= {()=> updateCategoria() } style={styles.button}>
              {loading ? (
                <ActivityIndicator animating={true} color= "white" size="small" />
              ) : (
                <Text style={{ color: colors.accent, fontSize: 16, marginVertical: 10}}>CONCLUIR</Text>
              )}
            </TouchableOpacity>
          </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center"
  },
  boxViewsInput: {
    marginVertical: 7
  },
  button: {
    height: 60,
    width: 200,
    backgroundColor: "#00b009",
    width: "100%",
    alignItems:"center"
  },
});

export default EditNome;