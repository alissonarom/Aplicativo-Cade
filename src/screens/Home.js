import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, Image, FlatList, ScrollView, SafeAreaView} from "react-native";
import { Searchbar, TextInput, useTheme, Button, Avatar, Card, IconButton } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FabHome from '../components/FabHome'
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
      <View style={{ alignItems: "center", paddingVertical: 10, backgroundColor: colors.primary}}>
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
      <Card.Title
        style={{height: 100, borderRadius: 10, margin: 10, backgroundColor: colors.accent, padding: 0}}
        title={item.empresa}
        subtitle={item.detalhes}
        subtitleStyle={{maxWidth: 300, backgroundColor: "red"}}
        left={() => <Avatar.Image 
              size={85}
              source={item.avatar}
              style={{
                marginVertical: 5,
                marginHorizontal: -10
              }}
            />}
        right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
      />
      //<View
      //  style={{flexDirection: "row"}}
      //  onPress={() => navigation.navigate('Modal', {
      //    empresa: item.empresa,
      //    bairro: item.bairro,
      //    cidade: item.cidade,
      //    avatar: item.avatar,
      //    detalhes: item.detalhes,
      //    estado: item.estado
      //  })}
      //>
      //  <Avatar.Image 
      //    size={100}
      //    source={item.avatar}
      //    style={{
      //      marginVertical: 5,
      //      marginHorizontal: 10
      //    }}
      //  />
      //  <View>
      //    <Text>{item.empresa}</Text>
      //    <Text>{item.detalhes}</Text>
      //    <View style={{flexDirection: "row"}}>
      //    <Button icon="star" style={{backgroundColor: "red"}}>
      //      4.3
      //    </Button>
      //    <Button icon="map-marker" style={{backgroundColor: "red"}}>
      //      {item.bairro}{'-'}{item.cidade}
      //    </Button>
      //    </View> 
      //  </View>  
      //  <View></View>
      //  <View></View> 
      //</View>        
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffd300" />
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
            placeholder= "Filtre por Cidade"
            style={styles.inputSearch}
            autoCapitalize="none"
            onChangeText={(bairro) => newSearchFilterFunction(bairro)}
            onClear={() => newSearchFilterFunction('')}
            value={searchBairro}
            disabled={enable}
          />
          <TextInput
            mode="flat"
            placeholder= "Filtre por Bairro"
            style={styles.inputSearch}
            autoCapitalize="none"
            onChangeText={(bairro) => newSearchFilterFunction(bairro)}
            onClear={() => newSearchFilterFunction('')}
            value={searchBairro}
            disabled={enable}
          />
        </View>
        <Button mode="contained" style={{ borderWidth: 1, borderColor: colors.accent, marginHorizontal: 20, marginTop: 20}} labelStyle={{color: colors.accent}} onPress={ () => navigation.navigate("Register")}>
          CADASTRE-SE E ANUNCIE
        </Button>
      </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={filteredDataSource}
          renderItem={ItemView}
        />
      </ScrollView>
      <FabHome/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignContent: "center"
  },
  image: {
    marginVertical:10,
    width: 100,
    height: 60,
  },
  topHome: {
    paddingVertical: 5,
    backgroundColor: "#ffd300"
  },
  filtersInput: {
    flex: 1,
    flexDirection:"row" ,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  inputSearch: {
    flex: 1,
    backgroundColor: "#fff",
    height: 50,
    margin: 3
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});