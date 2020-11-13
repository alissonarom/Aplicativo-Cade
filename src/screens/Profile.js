import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, LayoutAnimation, SafeAreaView, StatusBar, ActivityIndicator, FlatList, ImageBackground } from "react-native";
import { Avatar, Card } from 'react-native-elements';
import {useTheme, IconButton, FAB, Portal, Provider } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import Fire from '../config/Fire';
import 'firebase/firestore';
import "firebase/auth";
require('firebase/firestore');
import moment from 'moment';
import 'moment/locale/pt-br';
import { ScrollView } from "react-native-gesture-handler";
moment().format();
import AvatarComponent from '../components/avatar';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [likeColor, setLikeColor] = useState("#aeafb5");
  const { colors } = useTheme();
  const [infos, setInfos] = useState({});

  const FabPost = () => {  
    return (
        <Provider>
          <Portal>
            <FAB
              color={colors.text}
              style={{
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0,
                backgroundColor: colors.primary
              }}
              onPress={() => navigation.navigate('Post', {
                autor: infos.empresa
              })}
              icon='plus'
            />
          </Portal>
        </Provider>
      );
    };  

  useEffect(() => {
    Fire.shared.userInfos
          .get()
          .then(function (doc) {
            setInfos(doc.data());
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
    const uid = Fire.shared.uid 
    firebase.firestore().collection("posts/" + uid + "/userPosts")
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
  
  }, []);
  LayoutAnimation.easeInEaseOut();
  if (loading) {
        return <ActivityIndicator />;
      }
  
  const renderItem = ({ item }) => (
    <Card containerStyle={{
      margin: 0,
      borderWidth: 0,
      marginBottom: 15,
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    }}>
      <View style={{flexDirection: "row",alignItems: "center"}}>
       <AvatarComponent/>
        <View style={{marginHorizontal: 10}}>
          <Text style={{ fontSize: 16}}>{item.autor}</Text>
          <Text style={{ color: colors.primaryEscuro, fontSize: 12}}>{item.categoria}</Text>
          <View style={{ flexDirection: "row", alignItems: "center"}}>
          <IconButton
                icon="clock"
                color={colors.primary}
                size={15}
                style={{marginHorizontal: -5}}
                />
            <Text style={{ color: colors.cinzaMedio, fontSize: 12}}>
                  {moment(item.timestamp).locale('pt-br').fromNow(true)}
            </Text>
          </View>
        </View>
        
      </View>
      <Text style={{marginVertical: 5}}>{item.description}</Text>
      <Card.Image source={{ uri: item.image }} />
    </Card> 
);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"#ffd300"}/>
      <ScrollView>
        
        <View style={styles.cardPerfil}>
          <ImageBackground
            source={require('../../assets/capafake.png')}
            style={{alignItems:"center", height: 100}}
          />
          <View style={styles.headCard}>
            <Avatar
              containerStyle={{
              marginTop: 0,
              marginHorizontal: 10,
              backgroundColor: "#ffd300" //remover 
              }}
              rounded
              size= {70}
            >
              <View 
                style={{
                flexDirection: "row",
                maxHeight: 30,
                width: "100%",
                alignItems: "center",
                marginStart: 50,
                padding: 5,
                borderRadius: 20,
                backgroundColor: colors.accent
                }}
              >
                <Text style={{ color: colors.cinzaEscuro, fontSize: 15}}>4,3</Text>
                <IconButton
                icon="star"
                color={colors.primary}
                size={18}
                style={{marginHorizontal: -5}}
                />
              </View>
            </Avatar>
            <View style={{flexDirection: "column", marginStart: 30, marginVertical: 5, maxWidth: "70%"}}>
              <Text style={{ fontSize: 17, textAlign: "left" }}>{infos.empresa}</Text>
              <View style={{flexDirection: "row", alignItems: "center", maxWidth: "93%"}}>
                <IconButton
                  icon="map-marker-outline"
                  size={15}
                  color={colors.cinzaMedio}
                />
                <Text style={{color:colors.cinzaMedio}}>{infos.bairro}{" - "}{infos.cidade}{" - "}{infos.estado}</Text>
              </View >
            <View style={{flexDirection: "row",}}>
              <IconButton
                icon="linkedin-box"
                size={20}
                color={colors.cinzaMedio}
              />
              <IconButton
                icon="facebook-messenger"
                size={20}
                color={colors.cinzaMedio}
              />
              <IconButton
                icon="instagram"
                size={20}
                color={colors.cinzaMedio}
              />
              <IconButton
                icon="facebook-box"
                size={20}
                color={colors.cinzaMedio}
              />
              <IconButton
                icon="web"
                size={20}
                color={colors.cinzaMedio}
              />
            </View>
            </View>
          </View>
        </View>
        <Text style={{margin: 10, fontSize: 15, }}>Sobre</Text>
        <View style={styles.cardAbaout}>
          <Text style={{color: colors.cinzaMedio, textAlign: "left", fontSize: 16}}>{infos.detalhes}</Text>
        </View>
        <View style={styles.cardPosts}>
          <Text style={{margin: 10, fontSize: 15}}>Publicações</Text>
          <View>
            <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            />
          </View>
      </View>
    </ScrollView> 
    <FabPost/> 
    </SafeAreaView>
  );
    }

    const styles = StyleSheet.create({
      container:{
        flex: 1,
        alignItems: "center"       
      },
      cardAbaout: {
        backgroundColor: "white",
        borderRadius: 3,
        padding: 15,
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      cardPosts: {
        backgroundColor: "#f2f2f2",
        borderRadius: 3,

      },
      cardPerfil: {
        backgroundColor: "white",
        borderRadius: 5,
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      headCard:{
        flexDirection: "row",
        padding: 5
      }
    });
 