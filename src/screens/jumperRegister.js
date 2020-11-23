import * as React from 'react';
import { Button } from 'react-native-paper';
import {
    StyleSheet,
    LayoutAnimation,
    View,
    Image,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";

export default function JumperRegister () {
  const navigation = useNavigation();
  LayoutAnimation.easeInEaseOut();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/icone.neo.png')}
      />
      <Image source={require('../../assets/imgjrscreen.png')} />
      <View style={{
        flexDirection: "row",
      }}>
        <Button mode="outlined" labelStyle={{color: "white"}} style={styles.ButtonJumper} onPress={() => navigation.navigate("RegisterUser")}>
            membro
        </Button>
        <Button mode="outlined" labelStyle={{color: "white"}} style={styles.ButtonJumper} onPress={() => navigation.navigate("Register")}>
            empreendedor
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFD300",
      flex: 1,
      alignItems: "center",
      alignContent: "center"
    },
    ButtonJumper:{
      flex: 1,
      marginHorizontal: 10,
      borderWidth: 2,
      borderColor: "#fff"
    },
    image:{
      marginVertical:10,
      width: 100,
      height: 60,
    }
  });