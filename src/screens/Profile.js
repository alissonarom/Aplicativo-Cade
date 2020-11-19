import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList,
  ImageBackground
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {useTheme, IconButton, FAB, Portal, Provider, Avatar, Card, Paragraph} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import Fire from '../config/Fire';
import 'firebase/firestore';
import "firebase/auth";
require('firebase/firestore');
import moment from 'moment';
import 'moment/locale/pt-br';
moment().format();

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [likeColor, setLikeColor] = useState("#aeafb5");
  const { colors } = useTheme();
  const [infos, setInfos] = useState({});

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
  LayoutAnimation.easeInEaseOut();
  if (loading) {
        return <ActivityIndicator />;
      }
  
      const renderItem = ({ item }) => (
        <Card style={{
          margin: 10,
          borderWidth: 0,
          marginBottom: 15,
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}>
          <Card.Title
            title={item.autor}
            titleStyle={{fontSize: 17, color: colors.cinzaEscuro}}
            subtitleStyle={{fontSize: 13, lineHeight: 15 }}
            subtitleNumberOfLines={2}
            subtitle={(infos.bairro)+(" - ")+(infos.cidade)}
            left={(props) => <Avatar.Image {...props} source={{uri: infos.avatar}} style={{marginTop: 20}}/>}
            right={(props) => <IconButton {...props} icon="check-decagram" size={30} color={colors.cinzaMedio} onPress={() => {}} />}
          />
          <Card.Content>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: -15, marginLeft: 55}}>
                <IconButton
                  icon="clock"
                  color={colors.cinzaMedio}
                  size={15}
                  style={{marginHorizontal: -1}}
                  />
                <Text style={{ color: colors.cinzaMedio, fontSize: 12}}>
                  {moment(item.timestamp).locale('pt-br').fromNow(true)}
                </Text>
              </View>
            <Paragraph>{item.description}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: item.image }} style={{height: 300}} />
          <Card.Actions style={{alignItems: "center"}}>
            <IconButton
              icon="checkbox-multiple-marked-circle"
              color={colors.cinzaMedio}
              size={25}
            />
             <Text style={{ color: colors.cinzaMedio, fontSize: 18}}>
                  {infos.avaliação}
                </Text>
            <IconButton
              icon="comment-text-multiple"
              color={colors.cinzaMedio}
              size={25}
            />
                <Text style={{ color: colors.cinzaMedio, fontSize: 18}}>
                  {infos.avaliação}
                </Text>
          </Card.Actions>
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
            <Avatar.Image
              containerStyle={{
              marginTop: 0,
              marginHorizontal: 20,
              backgroundColor: "#ffd300" //remover 
              }}
              rounded
              size= {90}
              source={{uri:infos.avatar}}
            />
              <View 
                style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 70
                }}
              >
                <Text style={{ color: colors.cinzaEscuro, fontSize: 15}}>{infos.avaliação}</Text>
                <IconButton
                icon="star"
                color={colors.primary}
                size={18}
                style={{marginLeft: -5}}
                />
              </View>
            <View style={{flexDirection: "column", maxWidth: "70%"}}>
              <Text style={{ fontSize: 17, textAlign: "left",marginLeft: 10 }}>{infos.empresa}</Text>
              <Text style={{ color: colors.primary, textAlign: "left",marginLeft: 10 }}>{infos.categoria}</Text>
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
      },
      cardAbaout: {
        backgroundColor: "white",
        borderRadius: 3,
        padding: 15,
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginHorizontal: 1
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
        elevation: 4
      },
      headCard:{
        flexDirection: "row",
        padding: 5,
        alignItems:"center"
      }
    });
 