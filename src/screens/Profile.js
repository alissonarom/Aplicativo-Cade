import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, LayoutAnimation, FlatList, SafeAreaView, StatusBar, TouchableOpacity} from "react-native";
import Fire from '../config/Fire';
import * as firebase from "firebase";
import { AntDesign } from '@expo/vector-icons';
import styles from "../estilos/Styles"
import moment from 'moment';
import 'moment/locale/pt-br';

import 'firebase/firestore';


export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [infos, setInfos] = useState({});
  const [likeColor, setLikeColor] = useState("#aeafb5");
  const [follow, setFollow] = useState("checkcircleo");
  const [seguirColor, setSeguirColor] = useState("#aeafb5");

  LayoutAnimation.easeInEaseOut();

  useEffect(() => {
    console.disableYellowBox = true;
    const feed = 
    firebase.firestore().collection("posts")
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
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardLeft}>
          <Image
            source={{uri: item.avatar}}
            style={styles.avatar}
          />
        </View>
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

//  function likeCount(){
//  if(){
//      
//    }
//  }

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
 