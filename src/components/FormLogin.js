import React, {useState} from "react";
import { TextInput, ActivityIndicator, useTheme, IconButton } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
import * as firebase from "firebase";

const FormLog = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [passBool, setPassBool] = useState(true);
    const [passIcon, setPassIcon] = useState("eye");
    const { colors } = useTheme();
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
        setPassIcon("eye");
        setPassBool(true)
      } else {
        setPassIcon("eye-off");
        setPassBool(false)
      }
    }
    LayoutAnimation.easeInEaseOut();
    return(
          <View style={{ alignItems: "center"}}>
              <View style={styles.errorMessage}>
              <Text>{error && <Text style={styles.error}>Email ou senha inválidos</Text>}</Text>
              </View>
          <View style={styles.form}>
              <View style={styles.boxViewsInput}>
                <TextInput
                  mode= "flat"
                  placeholder= "Email"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  >
                </TextInput>
              </View>
              <View style={styles.inputLogin}>
                 <TextInput
                  mode= "flat"
                  placeholder= "Senha"
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
          <TouchableOpacity onPress= {()=> handleLogin() } style={styles.button}>
              {loading ? (
                <ActivityIndicator animating={true} size="small" color= {colors.accent} style={{ marginVertical: 10 }}/>
              ) : (
                <Text style={{ color: colors.accent, fontWeight: "500", fontSize: 16, marginVertical: 10 }}>ENTRAR</Text>
              )}
            </TouchableOpacity>        
          <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate("JumperRegister")}>
           <Text style={{ color: colors.accent, fontSize: 16 }}>Cadastrar</Text>
          </TouchableOpacity>
          </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 30,
      alignItems: "center",
      backgroundColor: "#ffd300"
    },
    image: {
      width: 250,
      height: 140,
      marginTop: 30
    },
    errorMessage: {
      alignItems: "center",
      justifyContent: "center",
    },
    error: {
      color: "#E9446A",
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    },
    form: {
        width: "90%",
        marginVertical: 20,
         justifyContent: 'space-around',
    },
    button: {
      borderRadius: 5,
      height: 52,
      alignItems: "center",
      borderWidth: 2,
      borderColor: "white",
      color: "black",
      width: "80%"
    },
    boxViewsInput: {
        marginVertical: 7,
    },
    buttonLogin: {
      height: 42,
      alignItems: "center",
      marginTop: 20,
    },  
  });

  export default FormLog;