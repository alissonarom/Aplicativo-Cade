
import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import Fire from '../config/Fire'
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import { Header, Button,Input, Icon } from 'react-native-elements';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar
} from "react-native";

export default function Post() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  
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
        .addPost({text: text.trim(),  localUri: image, description: description })
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
      <StatusBar barStyle="dark-content" backgroundColor="#a38800" />
      <View style={styles.inputContainer}>
        <View style={styles.photoContainer}>
          <TouchableOpacity style={styles.photo} 
          onPress={() => pickImage()}
          >
            <Icon 
            type="material"
            name="photo-camera" 
            size={45} 
            scolor="#D8D9D2" />
            <Text style={styles.textInput}>
              Incluir uma foto
            </Text >
            <Image
            source={{ uri: image }} fadeDuration={800} style={{ width:"100%", height:260, top: -150, borderRadius: 10}}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.titlePost}>
          <Input
            label= "Título do serviço*"
            placeholder= "Ex: Consultoria financeira"
            labelStyle={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16
            }}
            inputContainerStyle={{borderBottomColor: "black"}}
            value={text}
            onChangeText={setText}
          />
          <Input
            label= "Descrição*"
            placeholder= "Ex: Detalhes relevantes da Consultoria Financeira"
            multiline
            numberOfLines={3}
            labelStyle={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16
            }}
            inputContainerStyle={{borderBottomColor: "black"}}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
      <View>
        <Button
          type= "solid"
          title= "Postar"
          titleStyle={{color: "black", fontSize: 17, fontWeight: "normal"}}
          buttonStyle={{
            backgroundColor: "#ffd300",
          }}
          onPress={() => handlePost()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink"
    
  },
  inputContainer: {
    backgroundColor: "white",
    flex: 1
  },
  photoContainer:{
    backgroundColor: "#e6e6e6",
    height: 300,
    padding: 20
  },
  photo: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    alignItems: "center",
    paddingTop: 80
  },
  textInput:{
    fontWeight: "bold",
    fontSize: 15
  },
  titlePost: {
    margin: 10
  }
});