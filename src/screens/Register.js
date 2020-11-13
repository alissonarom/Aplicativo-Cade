import React from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  LayoutAnimation
} from "react-native";
import FormRegister from '../components/FormRegister';

export default function Register () {
  LayoutAnimation.easeInEaseOut();
return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffd300" />
        <FormRegister/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFf",
    flex: 1
  }
});