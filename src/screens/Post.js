
import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import Fire from '../config/Fire'
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { TextInput, IconButton, useTheme } from "react-native-paper";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from "react-native";

export default function Post({ route, navigation }) {
  const { autor} = route.params;
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const { colors } = useTheme();
  
  useEffect(() => {
    getPhotoPermissions();
  }, []);
  
  async function getPhotoPermissions() {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("Nos precisamos do acesso a sua camera para isso");
      }
    }
  };

  async function handlePost () {      
    Fire.shared
        .addPost({text: text.trim(),  localUri: image, description: description,autor: autor })
        .then(ref => {
          setText("");
          setImage(null);
        navigation.goBack();
    })
    .catch((error) => {
      Alert.alert("erro", JSON.stringify(error));
    });
  };

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 20}}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <TouchableOpacity style={styles.fotoPerfil} onPress= {() => pickImage()}>
          <Image source={{ uri: image }} fadeDuration={800} style={styles.avatar} />
          <View style={{ alignItems: "center", paddingTop: 50}}>
            <IconButton  icon="camera" color={colors.accent} size={40} />
            <Text style={{ color: colors.accent, fontSize: 16}}>Carregar uma imgem Top</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          mode="flat"
          placeholder= "Capricha nos detalhes, cuide os erros e não esqueça a figurinha ; )"
          multiline
          numberOfLines={3}
          style={{marginVertical: 10, backgroundColor: colors.accent}}
          value={description}
          onChangeText={setDescription}
        />
      </View>
        <TouchableOpacity onPress= {()=> handlePost()} style={styles.button}>
          {loading ? (
            <ActivityIndicator animating={true} color={colors.accent} />
          ) : (
            <Text style={{ color: "white", fontSize: 18,  marginVertical: 15 }}>CONCLUIR</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "white"
  },
  avatar:{
    position: "absolute",
    width: 350,
    height: 200,
    borderRadius: 10,
    zIndex: 2 
  },
  button: {
    height: 60,
    width: 200,
    backgroundColor: "#00b009",
    width: "100%",
    alignItems:"center",
    borderRadius: 10,

    
  },
  fotoPerfil:{
    backgroundColor: "#ffd24d",
    borderRadius: 10,
    alignSelf: "center",
    width: 350,
    height: 200,
    marginVertical: 20
  },
});