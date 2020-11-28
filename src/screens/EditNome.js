import React, {useState, useEffect} from 'react';
import { TextInput, ActivityIndicator, useTheme } from 'react-native-paper';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import Fire from '../config/Fire';
import { useNavigation } from "@react-navigation/native";

export default function EditNome({ route }) {
  const {nome} = route.params;
  const [newName, setNewName] = useState("");
  const [infos, setInfos] = useState({});
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation();

  
  async function updateName() {
    setLoading(true);
    Fire.shared.updateUserName({
    nome: newName
    });
    setLoading(false)
    navigation.navigate("Home");
  };

  return (
    <View style={styles.boxViewsInput}>
      <Text style={{margin: 15, fontSize: 20}}>Digite o novo nome</Text>
      <TextInput
        mode= "flat"
        placeholder= {nome}
        autoCapitalize="words"
        value={newName}
        onChangeText={setNewName}
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
