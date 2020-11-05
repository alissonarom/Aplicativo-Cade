import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image, FlatList, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Icon,  ListItem, Avatar } from 'react-native-elements';
import { Searchbar, TextInput, useTheme } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Faab from '../components/Faab'
import 'firebase/firestore';
import "firebase/auth";
import * as firebase from "firebase";
require('firebase/firestore');
import moment from 'moment';
import 'moment/locale/pt-br';
moment().format();

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchBairro, setSearchBairro] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [newFilteredDataSource, setNewFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [enable, setEnable] = useState(true)

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
    
  }, []);

  const Logomarca = () => {
    return(
      <View style={{backgroundColor: colors.primary, alignItems: "center"}}>
        <Image style={styles.image}
          source={require('../../assets/icone.neo.png')}
          />
      </View>
    );
    }   

  const searchFilterFunction = (text) => {
    //Verifique se o texto pesquisado não está em branco
    if (text) {
      setEnable(false)
      // O texto inserido não está em branco
      // Atualizar FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData =item.detalhes
          ? item.detalhes.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setNewFilteredDataSource(newData);
      setSearch(text);
    }  else {
      // O texto inserido está em branco
      // Atualize FilteredDataSource com masterDataSource
      setFilteredDataSource('');
      setSearch(text);
      setEnable(true)
  }};

//  filtro por CIDADE
//   const newSearchFilterFunctionCity = (text, cidade) => {
//    //Verifique se o texto pesquisado não está em branco
//    if (text, cidade) {
//      // O texto inserido não está em branco
//      // Atualizar FilteredDataSource
//      const newDataFilterCity = filteredDataSource.filter(function (item) {
//        const itemData = item.cidade
//          ? item.cidade.toUpperCase()
//          : ''.toUpperCase();
//        const newTextData = cidade.toUpperCase();
//        return itemData.indexOf(newTextData) > 3;
//      });
//      setFilteredDataSource(newDataFilterCity);
//      setSearchCidade(cidade);
//    } else {
//      // O texto inserido está em branco
//      // Atualize FilteredDataSource com masterDataSource
//      setFilteredDataSource(newFilteredDataSource);
//      setSearchCidade(cidade);
//    }
//  };
    

//  filtro por BAIRRO
    const newSearchFilterFunction = (bairro) => {
    //Verifique se o texto pesquisado não está em branco
    if (bairro) {
      // O texto inserido não está em branco
      // Atualizar FilteredDataSource
      const newDataFilter = filteredDataSource.filter(function (item) {
        const itemData = item.bairro
          ? item.bairro.toUpperCase()
          : ''.toUpperCase();
        const newTextData = bairro.toUpperCase();
        return itemData.indexOf(newTextData) > -1;
      });
      setFilteredDataSource(newDataFilter);
      setSearchBairro(bairro);
    } else {
      // O texto inserido está em branco
      // Atualize FilteredDataSource com masterDataSource
      setFilteredDataSource(newFilteredDataSource);
      setSearchBairro(bairro);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
    <View style={{backgroundColor: "white", marginVertical: 3, marginHorizontal: 10, padding: 0, borderRadius: 10}}>
        <View
          containerStyle={{alignItems: "center"}}
         >
        {
          <ListItem 
            key={item.uid} 
            containerStyle={{flexDirection:"row", padding: 0, borderRadius: 10}}
            onPress={() => navigation.navigate('Modal', {
              empresa: item.empresa,
              bairro: item.bairro,
              cidade: item.cidade,
              avatar: item.avatar,
              detalhes: item.detalhes,
              estado: item.estado
            })}
          >
            <Avatar 
              source={{ uri: item.avatar }} 
              size="large"
           />
            <ListItem.Content
              containerStyle={{}}
            >
            <ListItem.Title>{item.empresa}</ListItem.Title>
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
        </View>
      </View>
    );
  };
      
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary} />
      <Logomarca/>
      <ScrollView>
      <View style={styles.topHome}>
        <Searchbar
          platform="android"
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction('')}
          placeholder="Cadê?"
          placeholderTextColor= "grey"
          value={search}
          style={{
            marginHorizontal: 20
          }}
        />
        <View style={styles.filtersInput}>
          <TextInput
            mode="flat"
            placeholder= "Filtre por Bairro"
            style={{
              flex: 1,
              backgroundColor: colors.accent,
              height: 50,
            }}
            autoCapitalize="none"
            onChangeText={(bairro) => newSearchFilterFunction(bairro)}
            onClear={() => newSearchFilterFunction('')}
            value={searchBairro}
            disabled={enable}
          />
        </View>
      </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={filteredDataSource}
          renderItem={ItemView}
        />
      </ScrollView>
      <Faab/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  image: {
    marginVertical:10,
    width: 90,
    height: 50,
  },
  topHome: {
    paddingVertical: 10
  },
  filtersInput: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});