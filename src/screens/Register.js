import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import Fire from '../config/Fire'
import userPermissions from "../utils/UserPermissions";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default class Register extends React.Component {
    state = {
        user: {
          name: "",
          email: "",
          password: "",
          avatar: null,
          loading: false
      },
      errorMessage: null
    };
  
  handlePickAvatar = async () => {
    userPermissions.getCameraPermissions()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  handleSignUp = () => {
    Fire.shared.createUser(this.state.user);
  } 

  render() {

    return (
      <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffd700" />
          <View style={{ top: 50, alignItems: "center", width: "100%"}}>
            <Text style={styles.greeting}>{`Olá !\nCadastre-se para iniciar`}</Text>
            <TouchableOpacity style={styles.avatarPlaceholder} onPress= { this.handlePickAvatar }>
              <Image source={{uri: this.state.user.avatar}} style={styles.avatar} />
              <Ionicons name="ios-add" size={40} style={styles.iconAvatar} />
            </TouchableOpacity>
          </View>
  
          <Text>{this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}</Text>
          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Nome</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="words"
                value={this.state.user.name}
                onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
              />
            </View>
  
            <View style={{ marginTop: 15 }}>
              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                value={this.state.user.email}
                onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
              />
            </View>
  
            <View style={{ marginTop: 15 }}>
              <Text style={styles.inputTitle}>Senha</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                value={this.state.user.password}
                onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
              />
            </View>
          </View>
  
          <TouchableOpacity onPress= { this.handleSignUp } style={styles.button}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Entrar</Text>
            )}
          </TouchableOpacity>
  
          
          <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-round-back" size={32} color="#000" />
          </TouchableOpacity>
        </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFD300",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    marginVertical: 10,
    marginHorizontal: 10,
    width: "80%",
    top: 30
  },
  inputTitle: {
    color: "#000",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#000",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 4,
    height: 52,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 45
  },
  back: {
    position: "relative",
    width: 42,
    height: 42,
    borderRadius: 26,
    backgroundColor: "rgba(21,22,48,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(21,22,48,0.1)",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 60
  },
  iconAvatar: {
    color: "rgba(21,22,48,0.3)"
  }
});