import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from 'react-native-paper';
import FormLog from '../components/FormLogin';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  LayoutAnimation
} from "react-native";

export default function Login() {
    const { colors } = useTheme();
    const navigation = useNavigation();
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor= {colors.primary} barStyle="dark-content" />
          <Image source={require('../../assets/icone.neo.png')} style={styles.image} />
          <View style={{ width: "100%"}}>
            <FormLog/>
          </View>
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 30,
      alignItems: "center",
      backgroundColor: "#ffd300"
    },
    image: {
      width: 250,
      height: 140,
      marginTop: 60
    },
  });