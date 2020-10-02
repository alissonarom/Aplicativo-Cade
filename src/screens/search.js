
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from '@expo/vector-icons';
import Constants from "expo-constants";
import "firebase/firestore";
import Fire from '../config/Fire'

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
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const [infos, setInfos] = useState({}); 

  useEffect(() => {
    getPhotoPermissions();
    console.disableYellowBox = true;
    Fire.shared.userInfos
      .get()
      .then(function (doc) {
        setInfos(doc.data());
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

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
        .addPost({text: text.trim(),  localUri: image, avatar: infos.avatar, autor: infos.name })
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
      <StatusBar barStyle="dark-content" backgroundColor="#ffd700" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={32} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePost()}>
          <Text style={{ fontWeight: "bold" }}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image
          style={{ height: 50, width: 50, borderRadius: 75 / 2, marginEnd: 30 }}
          source={{uri: infos.avatar}}
        />
        <TextInput
          autoFocus
          multiline
          numberOfLines={4}
          style={{ flex: 1 }}
          placeholder="Compartilhe algo?"
          value={text}
          onChangeText={setText}
        />
      </View>

      <TouchableOpacity style={styles.photo} onPress={() => pickImage()}>
        <AntDesign name="camerao" size={32} color="#D8D9D2" />
      </TouchableOpacity>

      <View style={{ marginHorizontal: 32, marginTop: 32, height: 250 }}>
        <Image
          source={{ uri: image }} fadeDuration={1000} style={{ width:"100%", height:"100%"}}>
        </Image>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    backgroundColor: "#ffd700"
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});