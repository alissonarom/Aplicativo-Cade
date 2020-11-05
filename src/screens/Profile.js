import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, LayoutAnimation, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from "react-native";
import { Header, Icon, Image, Avatar, Button, Card, Accessory } from 'react-native-elements';
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

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [infos, setInfos] = useState({});
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [likeColor, setLikeColor] = useState("#aeafb5");

  useEffect(() => {
    //Fire.shared.userInfos
    //      .get()
    //      .then(function (doc) {
    //        setInfos(doc.data());
    //      })
    //      .catch(function (error) {
    //        console.log("Error getting document:", error);
    //      });
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

  function singOutUser () {
    firebase.auth().signOut();
    navigation.navigate("Login")
  } 
  LayoutAnimation.easeInEaseOut();

  if (loading) {
        return <ActivityIndicator />;
      }
  
  const renderItem = ({ item }) => (
    <Card containerStyle={{
      margin: 0,
      borderWidth: 0,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    }}>
      <View style={{flexDirection: "row",alignItems: "center"}}>
        <Avatar
          size= "medium"
          rounded
          source={{ uri: item.avatar }}
        />
        <View style={{marginHorizontal: 10}}>
          <Text style={{ fontSize: 16}}>{item.autor}</Text>
          <View style={{ flexDirection: "row", alignItems: "center"}}>
            <Icon
              type='material'
              name='history'
              size= {15}
              color="grey"
              containerStyle={{marginRight: 5}}
              />
            <Text style={{ color: "grey"}}>
                  {moment(item.timestamp).locale('pt-br').fromNow(true)}
            </Text>
          </View>
        </View>
        
      </View>
      <Text style={{marginVertical: 10}}>{item.text}</Text>
      <Text style={{marginVertical: 5}}>{item.description}</Text>
      <Card.Image source={{ uri: item.image }} />
    </Card> 
);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"#ffd300"}/>
      <Header
        containerStyle={{
          backgroundColor: '#ffd300',
          borderBottomWidth: 0
        }}
        leftComponent={<Button
          type= "text"
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
          type= "text"
          title="Sair"
          titleStyle= {{color: "black"}}
          onPress={() => singOutUser()}
        />}
      />
       
      <View style={{ width: "100%", alignItems:"center"}}>
        <Image
          containerStyle={{
            width: "100%"
          }}
          source={{ uri: infos.avatar }}
          style={{ resizeMode: "cover",height: 200 }}
        />
        <View style={styles.cardPerfil2}>
          <View style={styles.headCard}>
          <Button
            onPress={() => navigation.navigate('Post')}
            color= "white"
            type= "contained"
            title="Postar"
            buttonStyle={{
              backgroundColor:"white",
              marginHorizontal: 20
            }}
            titleStyle= {{color: "white"}}

          />
          <Avatar
            containerStyle={{
            marginTop: -40,
            marginHorizontal: 20
            }}
            rounded
            source={{ uri: infos.avatar }} 
            size= {100}
          >
            <Accessory
              activeOpacity={0.7}
              name="camera-alt"
              size={30}
              style={{
                backgroundColor: "#ffc300"
              }}
              
              onPress={() => console.log("Works!")}
            />
          </Avatar>
          <Button
            onPress={() => navigation.navigate('Post')}
            color= "black"
            type= "clear"
            title="Postar"
            buttonStyle={{
              backgroundColor:"orange",
              width: 110
              
            }}
            titleStyle= {{color: "black"}}

          />
          </View>
          
          <View style={{alignItems: "center"}}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>{infos.empresa}</Text>
          <View style={{flexDirection: "row"}}>
            <Icon
              name="location-on"
              size={20}
              color="#C8C8C8"
            />
            <Text style={{color: "#9e9e9e"}}>{infos.bairro}{" - "}{infos.cidade}{" - "}{infos.estado}</Text>
          </View>
        </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{alignItems: "center"}}>
      <View style={styles.cardPerfil}>
        <View style={{flexDirection: "row", marginStart: 15}}>
          <Icon
              name="domain"
              size={25}
              color="black"
            />
          <Text style={styles.titleDetalhes}>Sobre</Text>
        </View>
        <Text style={{color: "#6d6d6d", textAlign: "left", fontSize: 17, marginLeft: 35}}>{infos.detalhes}</Text>
      </View>
      <View style={styles.cardPosts}>
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
    </SafeAreaView>
  );
    }

    const styles = StyleSheet.create({
      container:{
        flex: 1
      },
      cardPerfil: {
        backgroundColor: "white",
        marginBottom: 20,
        borderRadius: 3,
        width: "100%",
        paddingTop: 10
      },
      cardPosts: {
        backgroundColor: "#f2f2f2",
        borderRadius: 3,
        width: "100%",
      },
      titleDetalhes:{
        fontWeight: "bold",
        marginStart: 10
      },
      cardPerfil2: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        borderRadius: 3,
        width: "95%",
        marginTop: -50,
        shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      },
      headCard:{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
      }
    });
 