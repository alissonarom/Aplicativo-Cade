import * as React from 'react';
import { Button, useTheme } from 'react-native-paper';
import {
    StyleSheet,
    LayoutAnimation,
    View,
    Image,
    SafeAreaView,
    StatusBar,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";

export default function JumperRegister () {
  const navigation = useNavigation();
  const { colors } = useTheme();

  LayoutAnimation.easeInEaseOut();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
      
        <Image
          style={styles.image}
          source={require('../../assets/icone.neo.png')}
        />
        <Image source={require('../../assets/imgjrscreen.png')} style={styles.image2} />
        <View style={{
          flexDirection: "row"
        }}>
          <Button mode="outlined" labelStyle={{color: "white"}} style={styles.ButtonJumper} onPress={() => navigation.navigate("RegisterUser")}>
              membro
          </Button>
          <Button mode="outlined" labelStyle={{color: "white"}} style={styles.ButtonJumper} onPress={() => navigation.navigate("Register")}>
              empreendedor
          </Button>
        </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFD300",
      alignItems: "center",
      flex: 1
    },
    ButtonJumper:{
      marginHorizontal: 10,
      borderWidth: 2,
      borderColor: "#fff",
      flex: 1
    },
    image:{
      marginVertical:10,
      width: 100,
      height: 60,
    },
    image2:{
      height: 400,
      width: 400
    }
  });