import React, {useState, useEffect} from 'react';
import { TextInput, ActivityIndicator, useTheme } from 'react-native-paper';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import Fire from '../config/Fire';
import { useNavigation } from "@react-navigation/native";

const EditNome = () => {
  const [empresa, setEmpresa] = useState("");
  const [infos, setInfos] = useState({});
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
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

  async function updateName() {
    setLoading(true);
    Fire.shared.updateUserName({
    empresa: empresa
    });
    navigation.navigate("Home");
  };

  return (
          <View style={styles.boxViewsInput}>
            <Text style={{margin: 15, fontSize: 20}}>Digite o novo nome</Text>
            <TextInput
              mode= "flat"
              placeholder= {infos.empresa ? (infos.empresa):("Nome da Empresa")}
              autoCapitalize="words"
              value={empresa}
              onChangeText={setEmpresa}
              style={{margin: 20}}
            />
            <TouchableOpacity onPress= {()=> updateName() } style={styles.button}>
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