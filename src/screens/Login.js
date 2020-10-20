import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon, Avatar, Button, Input } from 'react-native-elements';
import * as firebase from "firebase";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
  
  
    function handleLogin() {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function () {
          setLoading(false);
          navigation("AppTab", { screen: "home" });
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#ffd300" barStyle="dark-content" />
        <Image source={require('../../assets/icone.neo.png')} style={styles.image} />
        <View style={{ width: "100%" }}>
          <View style={styles.errorMessage}>
            {error && <Text style={styles.error}>Email ou senha inválidos</Text>}
          </View>
  
          <View style={styles.form}>
            <View>
              <Input
                inputContainerStyle={{
                  borderColor:"black"
                }}
                leftIcon={{ type: 'material', name: 'email', marginHorizontal: 10 }}
                placeholder="Email"
                placeholderTextColor="black"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                errorStyle={{ color: 'red' }}
              />
            </View>
  
            <View >
              <Input
                inputContainerStyle={{
                  borderColor:"black"
                }}
                leftIcon={{ type: 'material', name: 'vpn-key', marginHorizontal: 10  }}
                secureTextEntry={true}
                placeholder="Senha"
                placeholderTextColor="black"
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
  
          <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFd300" />
            ) : (
              <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 16 }}>Entrar</Text>
            )}
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate("register")}>
            <Text style={{ color: "#000", fontSize: 16 }}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#ffd300"
    },
    image: {
      width: 250,
      height: 140,
      marginTop: 70
    },
    errorMessage: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 30,
    },
    error: {
      color: "#E9446A",
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    },
    form: {
      marginBottom: 0,
      marginHorizontal: 30,
    },
    button: {
      marginHorizontal: 30,
      backgroundColor: "#000000",
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonLogin: {
      backgroundColor: "transparent",
      height: 42,
      alignItems: "center",
      marginTop: 20,
      marginHorizontal: 30
    },  
  });