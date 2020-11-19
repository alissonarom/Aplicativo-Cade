import React, { useState, useEffect } from "react";
import { TextInput, ActivityIndicator, Button, Provider, useTheme, Menu  } from 'react-native-paper';
import userPermissions from "../utils/UserPermissions";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Fire from '../config/Fire';
import cep from 'cep-promise';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";


const EditPerfil = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [categoria, setCategoria] = useState("");
    const [cepInput, setCepInput] = useState("");
    const [infoCep, setInfoCep] = useState({});
    const [visible, setVisible] = useState(false);
    const [detalhes, setDetalhes] = useState("");
    const { colors } = useTheme();
    const [infos, setInfos] = useState({});
    
    const navigation = useNavigation();

    const onPressItemHandler = (value) => {
      setCategoria(value);
    };
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

  function cepController() {
    setLoading(true);
    cep(cepInput).then(function (result) {
      setInfoCep(result);
      setLoading(false);
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
  };

    return(
      <Provider>
          <ScrollView>
          <View style={styles.form}>
            <View style={styles.boxViewsInput}>
              <TextInput
                disabled={true}
                mode= "flat"
                placeholder= {infos.cnpjcpf}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= {infos.empresa ? (infos.empresa):("Nome da Empresa")}
                autoCapitalize="words"
                value={empresa}
                onChangeText={setEmpresa}
              />
            </View>
            <View style={{flexDirection:"row", marginBottom: 10, alignItems: "center"}}>
            <TextInput
                mode= "flat"
                placeholder= {infos.cep}
                autoCapitalize="none"
                value={cepInput}
                onChangeText={setCepInput}
                style={{flex:1}}
              />
              <TouchableOpacity onPress= {()=> cepController()} style={styles.buttonCep}>
                {loading ? (
                  <ActivityIndicator animating={true} color= {colors.primary} size="small" style={{ paddingHorizontal: 18}} />
                ) : (
                  <Text >BUSCAR</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 7, marginHorizontal: -5, flexDirection: "row"}}>
            <TextInput
                mode= "flat"
                placeholder= {infos.cidade}
                autoCapitalize="words"
                value={infoCep.city}
                style={{flex:1, marginHorizontal: 5}}
              />
              <TextInput
                mode= "flat"
                placeholder= {infos.estado}
                autoCapitalize="words"
                value={infoCep.state}
                style={{flex:1, marginHorizontal: 5}}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= {infos.bairro}
                autoCapitalize="words"
                value={infoCep.neighborhood}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= {infos.rua}
                autoCapitalize="words"
                value={infoCep.street}
              />
            </View>
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
                    borderBottomColor: colors.cinzaMedio
                  }}
                  color={colors.cinzaMedio}
                  mode="flat"
                  onPress={() => {
                    setVisible(true);
                  }}>
                  selecione seu ramo de atividade{' '}
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
            <View style={styles.boxViewsInput}>
              <TextInput
                color
                disabled={true}
                mode= "flat"
                placeholder= {infos.categoria}
                autoCapitalize="characters"
                value={categoria}
                onChangeText={setCategoria}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder={infos.detalhes}
                multiline
                maxLength={280}
                autoCapitalize="sentences"
                value={detalhes}
                onChangeText={setDetalhes}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                disabled
                placeholder= {infos.email}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                disabled
                placeholder= "Senha*"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <TouchableOpacity  style={styles.button}>
            {loading ? (
              <ActivityIndicator animating={true} color= "white" size="small" />
            ) : (
              <Text style={{ color: colors.accent, fontSize: 16, marginVertical: 10}}>CONCLUIR</Text>
            )}
          </TouchableOpacity>
          </ScrollView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    form: {
      marginHorizontal: 20
    },
    boxViewsInput: {
      marginVertical: 7
    },
    buttonCep:{
      color: "#ffd300",
      height: 63,
      paddingVertical: 20,
      paddingHorizontal: 20,
      marginLeft: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#ffd300"
    },
    button: {
      height: 60,
      width: 200,
      backgroundColor: "#00b009",
      width: "100%",
      alignItems:"center"
    },
    fotoPerfil:{
        backgroundColor: "#ffd24d",
        borderRadius: 100,
        alignSelf: "center",
        height: 200,
        width: 200,
        marginTop: 10
      }
  });
  export default EditPerfil;