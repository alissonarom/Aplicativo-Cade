import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Fire from '../config/Fire';
import 'firebase/firestore';
import "firebase/auth";
require('firebase/firestore');
import PerfilEmpresa from '../components/PerfilEmpresa';
import PerfilMembro from '../components/PerfilMembro';

export default function Profile() {
  const [infos, setInfos] = useState({});
  const key = infos.chave;

  useEffect(() => {
    Fire.shared.userInfos
          .get()
          .then(function (doc) {
            setInfos(doc.data());
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
  }, []);

  LayoutAnimation.easeInEaseOut();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"#ffd300"}/>
      {
        key ? 
        (<PerfilEmpresa/>) :
        (<PerfilMembro/>)
      }
    </SafeAreaView>
  );
    }

    const styles = StyleSheet.create({
      container:{
        flex: 1,     
      }
    });
 