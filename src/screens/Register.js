import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import Fire from '../config/Fire';
import userPermissions from "../utils/UserPermissions";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  LayoutAnimation,
  ScrollView
} from "react-native";
import { Icon, Button, Input, Header } from 'react-native-elements';
import cep from 'cep-promise';


export default function Register () {
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detalhes, setDetalhes] = useState("");
  const [cnpjcpf, setCnpjcpf] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [cepInput, setCepInput] = useState("");
  const [infoCep, setInfoCep] = useState({});
  const navigation = useNavigation();

  LayoutAnimation.easeInEaseOut();

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
  });
  setLoading(false);
} 

return (
    <SafeAreaView style={styles.container}>
      <Header
          containerStyle={{
            backgroundColor: '#ffd300',
            borderBottomWidth: 0
          }} 
          leftComponent={<Button
            type= "clear"
            icon={{
              name: "arrow-back",
              size: 25,
              color: "black",
            }}
            onPress={()=> navigation.goBack()}
          />}
          centerComponent={{ text: 'Cadastrar', style: { color: 'black', fontSize: 20 } }}
        />
      <ScrollView >
        <StatusBar barStyle="dark-content" backgroundColor="#ffd300" />
        <View style={{ alignItems: "center", width: "100%"}}>
          <Text>{errorMessage && <Text>{errorMessage}</Text>}</Text>
          <View style={styles.form}>
            <View style={styles.boxViewsInput}>
              <Input
                label= "CNPJ ou CPF"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#bbb",
                }}
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5
                }}
                inputStyle={{
                  fontSize: 18,
                  paddingStart: 20
                }}
                autoCapitalize="words"
                value={cnpjcpf}
                onChangeText={setCnpjcpf}
              />
            </View>
            <View style={styles.boxViewsInput}>
              <Input
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5
                }}
                clearButtonMode= "while-editing"
                label= "Nome da Empresa"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                inputStyle={{
                  fontSize: 18,
                  paddingStart: 20
                }}
                placeholder="Como aparecerá nos anúncios"
                placeholderTextColor="rgba(0,0,0,0.2)"
                autoCapitalize="words"
                value={empresa}
                onChangeText={setEmpresa}
              />
            </View>
            <View style={styles.boxCep}>
              <Input
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5
                }}
                label= "CEP"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                inputStyle={{
                  fontSize: 18,
                  paddingStart: 20
                }}
                autoCompleteType= "postal-code"
                autoCapitalize="none"
                value={cepInput}
                onChangeText={setCepInput}
              />
              <Button
                buttonStyle={{
                  borderColor: "#ffd300",
                  borderWidth: 1,
                  marginTop: 24,
                  paddingVertical: 12,
                  paddingHorizontal: 23,
                }}
                titleStyle={{
                  color: "#696969",
                  fontSize: 14,
                }}
                title="BUSCAR"
                type="outline"
                onPress={() => cepController()}
              />
            </View>
            <View style={styles.boxViewsInput}>
              <Input
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5
                }}
                label= "Estado"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                inputStyle={{
                  fontSize: 18,
                  paddingStart: 20
                }}
                autoCapitalize="words"
                value={infoCep.state}
              />
            </View>
            <View style={styles.boxViewsInput}>
              <Input
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5
                }}
                label= "Cidade"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                inputStyle={{
                  fontSize: 18,
                  paddingStart: 20
                }}
                autoCapitalize="words"
                value={infoCep.city}
              />
            </View>
            <View style={styles.boxViewsInput}>
              <Input
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5
                }}
                label= "Bairro"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                inputStyle={{
                  fontSize: 18,
                  paddingStart: 20
                }}
                autoCapitalize="words"
                value={infoCep.neighborhood}
              />
            </View>
            <View style={styles.boxViewsInput}>
              <Input
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5
                }}
                label= "Rua"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                inputStyle={{
                  fontSize: 18,
                  paddingStart: 20
                }}
                autoCapitalize="words"
                value={infoCep.street}
              />
            </View>
            <View style={styles.boxViewsInput}>
              <Input
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5,
                  paddingHorizontal: 20
                }}
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                label="Serviços prestados"
                multiline
                autoCapitalize="none"
                value={detalhes}
                onChangeText={setDetalhes}
              />
            </View>
            <View style={styles.boxViewsInput}>
              <Input
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5
                }}
                label= "Email"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                inputStyle={{
                  fontSize: 18,
                  paddingStart: 20
                }}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.boxViewsInput}>
              <Input
                inputContainerStyle={{
                  borderColor:"#ffd300",
                  borderWidth: 1,
                  borderRadius: 3,
                  paddingVertical: 5
                }}
                label= "Senha"
                labelStyle={{
                  fontWeight: "bold",
                  color: "#696969",
                }}
                inputStyle={{
                  fontSize: 18,
                  paddingStart: 20
                }}
                secureTextEntry={true}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="rgba(0,0,0,0.2)"
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={{ color: "#797979", fontSize: 16, fontWeight: "bold" }}>Foto do Perfil</Text>
            <TouchableOpacity style={styles.avatarPlaceholder} onPress= {() => handlePickAvatar()}>
              <Image source={{uri:avatar}} style={styles.avatar} />
              <Icon
                size= {45}
                name='add-a-photo'
                type='material'
                color="rgba(21,22,48,0.07)"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress= {()=> handleSignUp() } style={styles.button}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={{ color: "#000000", fontSize: 20 }}>Cadastrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFf",
    flex: 1,
    paddingBottom: 30
  },
  form: {
    marginHorizontal: 10,
    width: "90%",
  },
  boxViewsInput: {
    marginBottom: -20
  },
  boxCep: {
    flexDirection: "row",
    maxWidth: 250,
    marginBottom: -20
  },
  button: {
    marginHorizontal: 30,
    borderRadius: 4,
    borderBottomWidth: 2,
    borderColor: "#E3B200",
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    backgroundColor: "#FFd300"
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "rgba(21,22,48,0.1)",
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 10
  },
});