import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image, FlatList, SafeAreaView } from "react-native";
import { Header, Icon, SearchBar, Card, ListItem, Avatar, Button } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import 'firebase/firestore';
import "firebase/auth";
const firebase = require('firebase');
require('firebase/firestore');
import moment from 'moment';
import 'moment/locale/pt-br';
moment().format();

export default function Home() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();



  useEffect(() => {
    console.disableYellowBox = true;
    const DataSearch = 
    firebase.firestore().collection("users")
    .onSnapshot(querySnapshot => {
      const posts = [];
      querySnapshot.forEach(documentSnapshot => {
        posts.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setFilteredDataSource();
       setMasterDataSource(posts);
      setLoading(false);
    });
    
  }, []);

  const Logomarca = () => {
    return(
      <View>
        <Image
            source={require('../../assets/icone.neo.png')}
            style={styles.image}
          />
      </View>
    );
    }   

  const searchFilterFunction = (text) => {
    //Verifique se o texto pesquisado não está em branco
    if (text) {
      // O texto inserido não está em branco
      // Atualizar FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // O texto inserido está em branco
      // Atualize FilteredDataSource com masterDataSource
      setFilteredDataSource();
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <View >
        <Card
          containerStyle={{padding: 0, margin: 7}}
         >
        {
          <ListItem 
            key={item.uid} 
            containerStyle={{maxWidth: 400, padding:0, flexDirection:"row"}}
            onPress={() => navigation.navigate('Modal', {
              name: item.name,
              bairro: item.bairro,
              cidade: item.cidade,
              avatar: item.avatar,
            })}

          >
            <Avatar 
              source={{ uri: item.avatar }} 
              size="large"
              backgroundColor="#C8C8C8"
           />
            <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
              <View style={{flexDirection: "row", paddingTop: 10}}>
                <Icon
                  name='location-on'
                  type='material'
                  color='#C8C8C8'
                />
                <Text style={{color: "#9e9e9e"}}>{item.bairro}{' - '}{item.cidade}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
          
        }
        
        </Card>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
      
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"#ffd700"}/>
      <Header
        containerStyle={{
          backgroundColor: '#ffd700',
          justifyContent: 'space-around',
          height: 120 ,
        }}
          leftComponent={<Button
            icon={{
              name: "menu",
              size: 30,
              color: "black",
              
            }}
            onPress={() => navigation.toggleDrawer()}
          />}
          centerComponent={<Logomarca/>}
          
      />
      <View style={styles.topHome}>
          <Text style={styles.topHomeText}>
              Busque ou anuncie serviços{"\n"}para Londrina e região
          </Text>
        </View>
        
      <SearchBar
          platform="android"
          containerStyle={{backgroundColor:"#ffe700", color: "black", paddingHorizontal: 10}}
          searchIcon={{color:"black"}}
          cancelIcon={{color:"black"}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Buscar..."
          placeholderTextColor="black"
          underlineColorAndroid="black"
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  image: {
    width: 110,
    height: 60
  },
  topHome: {
    backgroundColor: "#ffe700"
  },
  topHomeText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 23,
    margin: 30,
    fontWeight: "bold"
  },
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
});