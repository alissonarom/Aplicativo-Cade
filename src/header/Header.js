import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import * as firebase from "firebase";

export default function Header() { 
  const navigation = useNavigation();

  function singOutUser() {
    firebase.auth().signOut();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnRow}>
        <AntDesign name="search1" size={20} color="#000000" onPress={() => navigation.navigate("Search")} style={styles.searchbtn}/>
      </TouchableOpacity>
      <Image source={require('../../assets/icone.neo.png')} style={styles.image} />
      <TouchableOpacity>
      <AntDesign 
        name="search1"
        size={20} color="#000000" 
        onPress={() => singOutUser()}
      />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffd700',
    justifyContent: 'space-between',
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 2,
    paddingHorizontal: 32,
    flexDirection: "row",
    paddingVertical: 10,
    paddingTop: 45,
    borderBottomColor: "#D8D9DB",
    backgroundColor: "#ffd700",
    alignItems: "center",
  },

  image: {
    width: "18%",
    height: 30
    },

  searchbtn: {
    padding: 5,
    backgroundColor: "#D8D9DB"
  }
});