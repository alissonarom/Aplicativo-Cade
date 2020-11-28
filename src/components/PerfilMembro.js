import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  ActivityIndicator,
  FlatList
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {useTheme, IconButton, Avatar, Card} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import Fire from '../config/Fire';
import 'firebase/firestore';
import "firebase/auth";
require('firebase/firestore');
import moment from 'moment';
import 'moment/locale/pt-br';
moment().format();

export default function PerfilMembro() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [infos, setInfos] = useState({});
  const [seguindo, setSeguindo] = useState([])
  
  useEffect(() => {
    Fire.shared.userInfos
          .get()
          .then(function (doc) {
            setInfos(doc.data());
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
    firebase.firestore().collection("users")
    .onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      
      setLoading(false);
      setSeguindo(users);
    });
  }, []);

  LayoutAnimation.easeInEaseOut();

  if (loading) {
    return <ActivityIndicator color={colors.primary} size="large" />;
  }

      const ItemView = ({item}) => {
        return (
          // Flat List Item
          
          //adicionar no card left condição (user)
      
          <View style={styles.boxItens}
          >
            <Card 
              onPress={() => navigation.navigate("Modal", {
                nome: item.nome,
                bairro: item.bairro,
                cidade: item.cidade,
                avatar: item.avatar,
                detalhes: item.detalhes,
                estado: item.estado,
                uid: item.uid,
                categoria: item.categoria,
                avaliação: item.avaliação
              })}
            >
            {
             <Card.Title
             title={item.nome}
             titleStyle={{marginStart: 60, fontSize: 17, marginTop: -20, color: colors.cinzaEscuro}}
             subtitleStyle={{marginStart: 60, marginEnd: 10, fontSize: 13, lineHeight: 15 }}
             subtitleNumberOfLines={2}
             subtitle={item.detalhes+" ..."}
             left={(props) => <Avatar.Image {...props} size={100} source={{uri: item.avatar}}/>}
             right={(props) => <IconButton {...props} icon="check-decagram" size={30} color={colors.seguindo} onPress={() => {}} />}
           />
            }
            <View style={{flexDirection: "row"}}>
              <View 
                style={{
                flexDirection: "row",
                maxHeight: 30,
                alignItems: "center",
                marginStart: 45,
                padding: 5,
                borderRadius: 30,
                backgroundColor: colors.accent
                }}
              >
                <Text style={{ color: colors.cinzaEscuro, fontSize: 15}}>{item.evaluation ? (item.evaluation): ("0")}</Text>
                <IconButton
                icon="star"
                color={colors.primary}
                size={18}
                />
              </View>
              <View style={{flexDirection: "row", alignItems: "center", marginTop: -5}}>
                    <IconButton
                      icon="map-marker-outline"
                      size={15}
                      color={colors.cinzaMedio}
                    />
                    <Text style={{color:colors.cinzaMedio, fontSize: 11 }}>{item.bairro}{" - "}{item.cidade}{" - "}{item.estado}</Text>
                  </View >
            </View>
            </Card>
          </View>    
        );
      };
  return (
      <View style={styles.container}>
        <View style={styles.cardPerfil}>
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
                <IconButton
                  icon="checkbox-blank-circle"
                  color={colors.online}
                  size={25}
                  style={{marginLeft: -35}}
                />
              </View>
            <View style={{flexDirection: "column", maxWidth: "70%"}}>
              <Text style={{ fontSize: 17, textAlign: "left",marginLeft: 10 }}>{infos.nome}</Text>
              <View style={{flexDirection: "row", alignItems: "center", maxWidth: "93%"}}>
                <IconButton
                  icon="map-marker-outline"
                  size={15}
                  color={colors.cinzaMedio}
                />
                <Text style={{color:colors.cinzaMedio}}>{infos.bairro}{" - "}{infos.cidade}{" - "}{infos.estado}</Text>
              </View >
            </View>
          </View>
        </View>
        <ScrollView>
        <View style={styles.cardPosts}>
          <Text style={{margin: 10, fontSize: 15}}>Seguindo</Text>
          <View>
            <FlatList
            data={seguindo}
            renderItem={ItemView}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
      </View>
  );
    }

    const styles = StyleSheet.create({
      container:{
        flex: 1,     
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
      boxItens: {
        backgroundColor: "white",
        marginVertical: 5,
        paddingTop: 20,
        marginHorizontal: 5,
        borderRadius: 10
      },
      headCard:{
        flexDirection: "row",
        padding: 5,
        alignItems:"center"
      }
    });
 