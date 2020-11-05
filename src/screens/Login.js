import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme, TextInput } from 'react-native-paper';
import * as firebase from "firebase";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Login(props) {
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passBool, setPassBool] = useState(true);
    const [passColor, setPassColor] = useState("#bdbdbd");
    const [passIcon, setPassIcon] = useState("visibility-off");

    const navigation = useNavigation();
  
  
    function handleLogin() {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function () {
          setLoading(false);
          navigation.navigate("Home");
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }

    function toggleIconPass() {
        if (passBool === false) {
          setPassColor("#bdbdbd");
          setPassIcon("visibility-off");
          setPassBool(true)
        } else {
          setPassColor("#00a31c");
          setPassIcon("visibility");
          setPassBool(false)
        }
      }
  
    return (
      <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.select({
        ios: 'padding',
        android: null,
    })}
      >
        <StatusBar backgroundColor= {colors.primary} barStyle="dark-content" />
        <Image source={require('../../assets/icone.neo.png')} style={styles.image} />
        <View style={{ width: "100%"}}>
          <View style={styles.errorMessage}>
            {error && <Text style={styles.error}>Email ou senha inválidos</Text>}
          </View>
          <View style={styles.form}>
          <View style={styles.inputLogin}>
              <TextInput
                
               
               
                label= "Email"
                icon="camera"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.inputLogin}>
              <TextInput
                inputContainerStyle={{
                  backgroundColor: colors.accent,
                  borderRadius: 5,
                  borderBottomWidth: 0,
                  paddingVertical: 5
                }}
                leftIcon={{ type: 'material', name: 'vpn-key', marginHorizontal: 10, color: "#ffd300"  }}
                rightIcon={
                  <Icon
                    iconStyle={{
                      marginHorizontal: 5
                    }}
                    name={passIcon}
                    color={passColor}
                    onPress={() => toggleIconPass()}
                  />
                }
                label= "Senha"
                labelStyle={{
                  fontWeight: "bold",
                  color: "white",
                }}
                inputStyle={{
                  fontSize: 18,
                }}
                secureTextEntry={passBool}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
  
          <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: colors.primary, fontWeight: "500", fontSize: 16 }}>Entrar</Text>
            )}
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#ffd300", fontSize: 16 }}>
              Cadastrar
            </Text>
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 30,
      alignItems: "center",
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
      marginHorizontal: 20,
    },
    inputLogin: {
      height: 90
    },
    button: {
      marginHorizontal: 100,
      marginTop: 20,
      borderRadius: 5,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "white"
    },
    buttonLogin: {
      height: 42,
      alignItems: "center",
      marginTop: 20,
      marginHorizontal: 30
    },  
  });