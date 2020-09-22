import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image, FlatList, LayoutAnimation, ActivityIndicator, SafeAreaView } from "react-native";
//import * as firebase from "firebase";
import Header from "../header/Header"
import styles from "../estilos/Styles"
import 'firebase/firestore';
import "firebase/auth";

import Fire from '../config/Fire';
import { AntDesign } from '@expo/vector-icons';
const firebase = require('firebase');
require('firebase/firestore');
import moment from 'moment';
import 'moment/locale/pt-br';
import { TouchableOpacity } from "react-native-gesture-handler";
moment().format();

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [infos, setInfos] = useState({});
  const [likeColor, setLikeColor] = useState("#aeafb5");
  const [follow, setFollow] = useState("checkcircleo");
  const [seguirColor, setSeguirColor] = useState("#aeafb5");

  LayoutAnimation.easeInEaseOut();

  useEffect(() => {
    console.disableYellowBox = true;
    const user = firebase.auth().currentUser.uid;
    const feed = 
    firebase.firestore().collection("posts/" + user + "/userPosts")
    .orderBy('timestamp', 'desc')
    .onSnapshot(querySnapshot => {
      const posts = [];

      querySnapshot.forEach(documentSnapshot => {
        posts.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setPosts(posts);
      setLoading(false);
    });

    Fire.shared.userInfos
      .get()
      .then(function (doc) {
        setInfos(doc.data());
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  return () => feed();

  }, []);


if (loading) {
    return <ActivityIndicator />;
  }
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardLeft}>
          <Image
            source={{uri: infos.avatar}}
            style={styles.avatar}
          />
          <View>
            <Text style={{fontSize: 15, fontWeight: "900"}}>{infos.name} {""}
            <Text style={styles.cardTime}>
            <AntDesign name="enviroment" size={15} color="#ffd300" />Shangri-lá A</Text>
            </Text>
            
            <Text style={styles.cardTime}>
              {moment(item.timestamp).locale('pt-br').fromNow(true)}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => seguir(item)} style={styles.cardLeft}>
          <AntDesign
            name={follow}
            size={25}
            color={seguirColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
          <Text style={{color: '#000000', fontSize: 13 }}>
            {item.text}
          </Text>
        </View>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
      />
      <View style={styles.cardFooter}>
          <View style={styles.cardIconsCount}>
            <TouchableOpacity onPress={() => like(item)}>
              <AntDesign
                name={"heart"}
                size={18}
                color={likeColor}
              />
            </TouchableOpacity>
            <Text style={styles.textCount}>
                35
              </Text>
            <TouchableOpacity>
              <AntDesign
                name={"message1"}
                size={18}
                color={"#aeafb5"}
              />
            </TouchableOpacity>
              <Text style={styles.textCount}>
                12
              </Text>
          </View>
        <View style={styles.cardIcons}>
            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => like(item)}>
              <AntDesign
                name={"like2"}
                size={22}
                color={"#000000"}
                style={{ marginRight: 5 }}
              />
              <Text style={{fontSize: 13}}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => like(item)}>
              <AntDesign
                name={"message1"}
                size={22}
                color={"#000000"}
                style={{ marginRight: 5 }}
              />
              <Text style={{fontSize: 13}}>Comentar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => like(item)}>
              <AntDesign
                name={"sharealt"}
                size={22}
                color={"#000000"}
                style={{ marginRight: 5 }}
              />
              <Text style={{fontSize: 13}}>Compartilhar</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // botão like
  function like(item) {
    if (likeColor === "#aeafb5") {
      setLikeColor("#ed2c09");
    } else {
      setLikeColor("#aeafb5");
    }
    item.site_admin = true;
  }

  function likeCount(){
    if()
  }

  // botão seguir
  function seguir(item) {
    if (follow === "checkcircleo") {
      setFollow("checkcircle");
      setSeguirColor("#0080ff");
    } else {
      setFollow("checkcircleo");
      setSeguirColor("#d1d1d1");
    }
    item.site_admin = true;
  }

  return (
    <SafeAreaView style={styles.containerHome}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"#ffd300"}/>
      <View style={styles.about}>
        <Header />
        <View >
          <FlatList style={styles.flatHome}
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
    
  );
}
