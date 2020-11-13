import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

export default function Loading() {
  const navigation = useNavigation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? "Home" : "Login");
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{color:"#fff"}}>Carregando App</Text>
      <ActivityIndicator size="large" color="#fff"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFD300",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});