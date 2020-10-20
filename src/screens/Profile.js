import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, LayoutAnimation, SafeAreaView, StatusBar} from "react-native";
import { Header, Icon, SearchBar, Card, ListItem, Image, Avatar, Button } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

import Fire from '../config/Fire';
import 'firebase/firestore';


export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [infos, setInfos] = useState({});
  const navigation = useNavigation();
  function singOutUser () {
    firebase.auth().signOut();
  } 
  LayoutAnimation.easeInEaseOut();

  useEffect(() => {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"#ffd300"}/>
      <Header
        containerStyle={{
          backgroundColor: '#ffd300',
          borderBottomWidth: 0
        }}
        leftComponent={<Button
          type= "clear"
          icon={{
            name: "arrow-back",
            size: 25,
            color: "black",
          }}
          onPress={() => navigation.goBack()}
        />}
        centerComponent={{ text: 'Perfil', style: { color: 'black', fontSize: 20}}}
        rightComponent={<Button
          color= "black"
          type= "clean"
          title="Sair"
          titleStyle= {{color: "black"}}
          onPress={() => singOutUser()}
        />}
      />
       
      <View style={{ width: "100%", alignItems:"flex-start"}}>
        <Image
          containerStyle={{
            width: "100%"
          }}
          source={{ uri: infos.avatar }}
          style={{ resizeMode: "cover",height: 200 }}
        />
        <View style={{flexDirection: "row"}}>
          <Avatar 
            containerStyle={{
            marginHorizontal: 20,
            top: -20
            }}
            rounded
            source={{ uri: infos.avatar }} 
            size= "large"
            backgroundColor="#C8C8C8"
          />
          <View>
          <Text style={{ fontSize: 20 }}>{infos.name}</Text>
          <View style={{flexDirection: "row", paddingTop: 0}}>
            <Text style={{color: "#9e9e9e"}}>{infos.bairro}{' - '}{infos.cidade}{' - '}{infos.estado}</Text>
          </View>
        </View>
        </View>
      </View>
      <View style={styles.cardDetalhes}>
        <Text style={{color: "#6d6d6d", textAlign: "center", fontSize: 17}}>{infos.detalhes}</Text>
      </View>
    </SafeAreaView>
  );
    }

    const styles = StyleSheet.create({
      container:{
        flex: 1,
        alignItems:"center"
      },
      cardDetalhes: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "white"

      }
    });
 