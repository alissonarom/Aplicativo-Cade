import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image, FlatList, ScrollView, SafeAreaView } from "react-native";
import { Header, Icon, SearchBar, Card, ListItem, Avatar, Button, Overlay } from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import 'firebase/firestore';
import "firebase/auth";
import * as firebase from "firebase";
require('firebase/firestore');
import moment from 'moment';
import 'moment/locale/pt-br';
moment().format();
import Fire from '../config/Fire';


export default function Home() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {setVisible(!visible);};
  const [infos, setInfos] = useState({});

  useEffect(() => {
    console.disableYellowBox = true;
    const DataSearch = 
    firebase.firestore().collection("users")
    .onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setFilteredDataSource();
      setMasterDataSource(users);
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
        const itemData = item.detalhes
          ? item.detalhes.toUpperCase()
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
      <StatusBar barStyle={'dark-content'} backgroundColor={"#ffd300"}/>
      <Header
        containerStyle={{
          backgroundColor: '#ffd300',
          justifyContent: 'space-around',
          height: 120 ,
          borderBottomWidth: 0,
          marginTop: 20
        }}
          centerComponent={<Logomarca/>}
      />
      <ScrollView>
      <View style={styles.topHome}>
        <SearchBar
          platform="android"
          containerStyle={{
            marginHorizontal: 40,
            marginVertical: 5,
            backgroundColor: "white",
            alignSelf: "center",
            height: 45
          }}
          inputContainerStyle={{
            top: -8
          }}
          searchIcon={{
            color: "black",
          }}
          cancelIcon={false}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Pesquise um serviço"
          placeholderTextColor="grey"
          value={search}
        />
        <SearchBar
          platform="android"
          containerStyle={{
            marginHorizontal: 40,
            marginVertical: 5,
            backgroundColor: "white",
            alignSelf: "center",
            height: 45
          }}
          inputContainerStyle={{
            top: -8
          }}
          searchIcon={false}
          cancelIcon={false}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Filtre por Cidade"
          placeholderTextColor="grey"
        />
        <SearchBar
          platform="android"
          containerStyle={{
            marginHorizontal: 40,
            marginVertical: 5,
            backgroundColor: "white",
            alignSelf: "center",
            height: 45
          }}
          inputContainerStyle={{
            top: -8
          }}
          searchIcon={false}
          cancelIcon={false}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Filtre por Bairro"
          placeholderTextColor="grey"
        />
        <Button  
        title= "Buscar"
        titleStyle={{color: "#fff", fontSize: 20}}
        containerStyle={{marginHorizontal: 50, marginVertical: 10, borderColor: "white", borderWidth: 2}}
        type="clear"
        />
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={filteredDataSource}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#000000",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },
  image: {
    marginVertical:20,
    width: 140,
    height: 80
  },
  topHome: {
    backgroundColor: "#ffd300",
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