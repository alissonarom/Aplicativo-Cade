import React, { useState } from "react";
import { TextInput, ActivityIndicator, Provider, useTheme } from 'react-native-paper';
import Fire from '../config/Fire';
import cep from 'cep-promise';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import SnackSucess from '../components/SnackSucess';


export default function EditEndereco ({navigation, route}) {
  const { nome, bairro, cidade, estado, rua, userCep} = route.params;
    const [loading, setLoading] = useState(false);
    const [cepInput, setCepInput] = useState("");
    const [infoCep, setInfoCep] = useState({});
    const { colors } = useTheme();

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

  async function updateEndereco() {
    Fire.shared.updateUserEndereco({
      infoCep: infoCep
    });
    setLoading(false);
    navigation.navigate("Home");
  };
    return(
      <Provider>
          <ScrollView>
          <View style={{margin: 15, alignItems:"center"}}>
              <Text style={{margin: 15, fontSize: 20, fontWeight: "bold"}}>{nome}!</Text>
              <Text style={{fontSize: 17}}>Digite o novo endereço</Text>
            </View>
          <View style={styles.form}>
            <View style={{flexDirection:"row", marginBottom: 10, alignItems: "center"}}>
              <TextInput
                mode= "flat"
                placeholder= {userCep}
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
                placeholder= {cidade}
                autoCapitalize="words"
                value={infoCep.city}
                style={{flex:1, marginHorizontal: 5}}
              />
              <TextInput
                mode= "flat"
                placeholder= {estado}
                autoCapitalize="words"
                value={infoCep.state}
                style={{flex:1, marginHorizontal: 5}}
              />
            </View>
            <View style={styles.boxViewsInput}>
            <TextInput
                mode= "flat"
                placeholder= {bairro}
                autoCapitalize="words"
                value={infoCep.neighborhood}
              />
            </View>
            <View style={styles.boxViewsInput}>
              <TextInput
                mode= "flat"
                placeholder= {rua}
                autoCapitalize="words"
                value={infoCep.street}
              />
            </View>
          </View>
          <TouchableOpacity onPress= {()=> updateEndereco() } style={styles.button}>
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
