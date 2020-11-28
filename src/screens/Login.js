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
  LayoutAnimation,
  ScrollView
} from "react-native";

export default function Login() {
    const { colors } = useTheme();
    const navigation = useNavigation();
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={styles.container}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor= {colors.primary} barStyle="dark-content" />
          <Image source={require('../../assets/icone.neo.png')} style={styles.image} />
          <View style={{ width: "100%"}}>
            <FormLog/>
          </View>
        </ScrollView>
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffd300",
      alignContent: "center"
    },
    image: {
      marginTop: 70,
      width: 170,
      height: 100,
      alignSelf: "center"
    },
  });