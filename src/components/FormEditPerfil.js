import React, { useState } from "react";
import { IconButton, TextInput, ActivityIndicator, Button, Provider, useTheme, Menu  } from 'react-native-paper';
import userPermissions from "../utils/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import Fire from '../config/Fire';
import cep from 'cep-promise';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";


const FormEditPerfil = () => {
    const [empresa, setEmpresa] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [detalhes, setDetalhes] = useState("");
    const [cnpjcpf, setCnpjcpf] = useState("");
    const [categoria, setCategoria] = useState("");
    const [cepInput, setCepInput] = useState("");
    const [infoCep, setInfoCep] = useState({});
    const [visible, setVisible] = useState(false);
    const { colors } = useTheme();
    const [infos, setInfos] = useState({});

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

  async function handleSignUp() {
    setLoading(true);
    Fire.shared.createUser({
    empresa: empresa,
    email: email,
    password: password,
    avatar: avatar,
    detalhes: detalhes,
    cnpjcpf: cnpjcpf,
    infoCep: infoCep,
    categoria: categoria,
    });
    setLoading(false);
  } 
  function cepController() {
    cep(cepInput).then(function (result) {
      setInfoCep(result);
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
  };

  async function handlePickAvatar(){
    userPermissions.getCameraPermissions()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
};

    return(
      <Provider>
          <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 20}}>
          <View style={styles.form}>
            <TouchableOpacity style={styles.fotoPerfil} onPress= {() => handlePickAvatar()}>
              <Image source={{uri:avatar}} fadeDuration={800} style={styles.avatar} />
              <View style={{ alignItems: "center", paddingTop: 30}}>
                <IconButton  icon="camera" color="black" size={40} />
                <Text style={{ color: "black", fontSize: 16}}>Carregar imagem</Text>
              </View>
            </TouchableOpacity>        
            <View style={styles.boxViewsInput}>
              <TextInput
                mode= "flat"
                placeholder= "CNPJ / CPF"
                autoCapitalize="words"
                value={cnpjcpf}
                onChangeText={setCnpjcpf}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= "Nome da Empresa"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                autoCapitalize="words"
                value={empresa}
                onChangeText={setEmpresa}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= "CEP"
                autoCapitalize="none"
                value={cepInput}
                onChangeText={setCepInput}
              />
            </View>
            <View style={{marginBottom: 10, marginHorizontal: -5, flexDirection: "row"}}>
            <TextInput
                mode= "flat"
                placeholder= "Cidade"
                autoCapitalize="words"
                value={infoCep.city}
                style={{flex:1, marginHorizontal: 5}}
              />
              <TextInput
                mode= "flat"
                placeholder= "Estado"
                autoCapitalize="words"
                value={infoCep.state}
                style={{flex:1, marginHorizontal: 5}}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= "Bairro"
                autoCapitalize="words"
                value={infoCep.neighborhood}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= "Rua*"
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
                top: -100
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
                disabled={true}
                mode= "flat"
                placeholder= "-"
                autoCapitalize="words"
                value={categoria.toUpperCase()}
                onChangeText={setCategoria}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder="Serviços prestados*"
                multiline
                autoCapitalize="none"
                value={detalhes}
                onChangeText={setDetalhes}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= "Email*"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= "Senha*"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <TouchableOpacity onPress= {()=> handleSignUp() } style={styles.button}>
            {loading ? (
              <ActivityIndicator animating={true} color= "white" />
            ) : (
              <Text style={{ color: "white", fontSize: 18,  marginVertical: 15}}>CONCLUIR</Text>
            )}
          </TouchableOpacity>
          </ScrollView>
        </Provider>
    );
}
const styles = StyleSheet.create({
    form: {
      width: "100%",
      marginVertical: 20
    },
    boxViewsInput: {
      marginVertical: 7,
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
        borderRadius: 10,
        alignSelf: "center",
        width: 350,
        height: 200
      },
    avatar: {
        position: "absolute",
        width: 350,
        height: 200,
        borderRadius: 10,
        zIndex: 2 
    },
  });
export default FormEditPerfil;
