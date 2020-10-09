import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, LayoutAnimation, SafeAreaView, StatusBar} from "react-native";
import { Header, Icon, SearchBar, Card, ListItem, Avatar, Button } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";

import Fire from '../config/Fire';
import 'firebase/firestore';


export default function Profile(navigation) {
  const [loading, setLoading] = useState(true);
  const [infos, setInfos] = useState({});


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
          backgroundColor: '#ffd700'
        }}
        leftComponent={<Button
          type= "clear"
          icon={{
            name: "arrow-back",
            size: 30,
            color: "black",
            
          }}
          onPress={() => navigation.goBack()}
        />}
        centerComponent={{ text: 'Perfil', style: { color: 'black', fontSize: 20}}}
      />
      <View style={{backgroundColor: "#ffe700", width: "100%", alignItems:"center"}}>
        <Avatar 
          containerStyle={{
          top: 30 
          }}
          rounded
          source={{ uri: infos.avatar }} 
          size="xlarge"
          backgroundColor="#C8C8C8"
        />
      </View>
      <Text style={{ fontSize: 30, marginTop: 30 }}>{infos.name}</Text>
      <View style={{flexDirection: "row", paddingTop: 10}}>
        <Icon
          name='location-on'
          type='material'
          color='#C8C8C8'
        />
        <Text style={{color: "#9e9e9e"}}>{infos.bairro}{' - '}{infos.cidade}</Text>
      </View>
    </SafeAreaView>
    
  );
    }

    const styles = StyleSheet.create({
      container:{
        flex: 1,
        alignItems:"center"
      },
    });
 