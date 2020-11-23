import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  LayoutAnimation,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { IconButton, TextInput, ActivityIndicator, Button, Provider, useTheme, Menu  } from 'react-native-paper';
import userPermissions from "../utils/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Fire from '../config/Fire';
import cep from 'cep-promise';

export default function RegisterUser () {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passIcon, setPassIcon] = useState("eye");
  const [passBool, setPassBool] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cepInput, setCepInput] = useState("");
  const [infoCep, setInfoCep] = useState({});
  const { colors } = useTheme();
  const navigation = useNavigation();


  function cepController() {
    cep(cepInput).then(function (result) {
      setInfoCep(result);
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
  };
  
  const onPressItemHandler = (value) => {
    setCategoria(value);
  };

  function toggleIconPass() {
    if (passBool === false) {
      setPassIcon("eye");
      setPassBool(true)
    } else {
      setPassIcon("eye-off");
      setPassBool(false)
    }
  };

  LayoutAnimation.easeInEaseOut();

  async function handleSignUpUser() {
    setLoading(true);
    Fire.shared.createMembro({
    nome: username,
    email: email,
    password: password,
    avatar: avatar,
    infoCep: infoCep,
    });
    navigation.navigate("Home");
    setLoading(false);
  } 

  async function handlePickAvatar(){
    userPermissions.getCameraPermissions()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
};

  LayoutAnimation.easeInEaseOut();
return (
  <Provider>
    <SafeAreaView style={styles.container}>
      <ScrollView  showsVerticalScrollIndicator={false} style={{marginHorizontal: 20}}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffd300" />
        <View style={styles.form}>
            <TouchableOpacity style={styles.fotoPerfil} onPress= {() => handlePickAvatar()}>
              <Image source={{uri:avatar}} fadeDuration={800} style={styles.avatar} />
              <View style={{ alignItems: "center", top : 40}}>
                <IconButton  icon="camera" color="black" size={40} />
                <Text style={{ color: "black", fontSize: 16}}>Foto de perfil</Text>
              </View>
            </TouchableOpacity> 
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= "Nome Completo"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                autoCapitalize="words"
                value={username}
                onChangeText={setUserName}
              />
            </View>
            <View style={{flexDirection:"row", marginBottom: 10}}>
            <TextInput
                mode= "flat"
                placeholder= "CEP"
                autoCapitalize="none"
                value={cepInput}
                onChangeText={setCepInput}
                style={{flex:1}}
              />
              <Button
                size={20}
                mode="contained"
                color={colors.primary}
                labelStyle={{
                  color:colors.preto,
                }}
                type="outline"
                onPress={() => cepController()}
              >BUSCAR</Button>
            </View>
            <View style={{marginBottom: 10, marginHorizontal: -5, flexDirection: "row"}}>
            <TextInput
                mode= "flat"
                placeholder= "Cidade*"
                autoCapitalize="words"
                value={infoCep.city}
                style={{flex:1, marginHorizontal: 5}}
              />
              <TextInput
                mode= "flat"
                placeholder= "Estado*"
                autoCapitalize="words"
                value={infoCep.state}
                style={{flex:1, marginHorizontal: 5}}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= "Bairro*"
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
                secureTextEntry={passBool}
                onChangeText={setPassword}
              />
              <IconButton
                 icon={passIcon}
                 color= "#bdbdbd"
                 size={30}
                 onPress={() => toggleIconPass()}
                 style={{
                   position: "absolute",
                   right: 1
                 }} />
            </View>
          </View>
          <TouchableOpacity onPress= {()=> handleSignUpUser() } style={styles.button}>
            {loading ? (
              <ActivityIndicator animating={true} color= "white" />
            ) : (
              <Text style={{ color: "white", fontSize: 18,  marginVertical: 15}}>CONCLUIR</Text>
            )}
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFf",
    flex: 1
  },
  form: {
    width: "100%",
  },
  boxViewsInput: {
    marginBottom: 10,
  },
  button: {
    height: 60,
    width: 200,
    backgroundColor: "#00b009",
    width: "100%",
    alignItems:"center",

  },
  fotoPerfil:{
      backgroundColor: "#ffd300",
      borderRadius: 100,
      alignSelf: "center",
      width: 200,
      height: 200,
      margin: 10
    },
  avatar: {
      position: "absolute",
      width: 195,
      height: 195,
      borderRadius: 100,
      zIndex: 2 
  },
});