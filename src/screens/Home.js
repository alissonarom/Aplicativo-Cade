import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, Image, FlatList, Text, SafeAreaView} from "react-native";
import { Searchbar, TextInput, useTheme, Button, Card, Avatar, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FabHome from '../components/FabHome';
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
      // Flat List Item
      
      //adicionar no card left condição (user)
  
      <View style={styles.boxItens}
      >
        <Card 
          onPress={() => navigation.navigate("Modal", {
            empresa: item.empresa,
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
         title={item.empresa}
         titleStyle={{marginStart: 60, fontSize: 17, marginTop: -20, color: colors.cinzaEscuro}}
         subtitleStyle={{marginStart: 60, marginEnd: 10, fontSize: 13, lineHeight: 15 }}
         subtitleNumberOfLines={2}
         subtitle={item.detalhes+" ..."}
         left={(props) => <Avatar.Image {...props} size={100} source={{uri: item.avatar}}/>}
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffd300" />
      <Logomarca/>
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
        <View style={styles.boxFilters}>
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
        <Button mode="contained" style={{ margin: 10}} labelStyle={{color: colors.accent}} onPress={ () => navigation.navigate("Register")}>
          CADASTRE-SE E ANUNCIE
        </Button>
      </View>
        <FlatList 
          style={{paddingHorizontal: 5}}
          keyExtractor={(item, index) => index.toString()}
          data={filteredDataSource}
          renderItem={ItemView}
        />
      <FabHome/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignContent: "center",

  },
  image: {
    marginVertical:10,
    width: 100,
    height: 60,
  },
  boxItens: {
    backgroundColor: "white",
    marginVertical: 5,
    paddingTop: 20,
    marginHorizontal: 5,
    borderRadius: 10
  },
  boxItensContent:{
    backgroundColor: "#ffd300",
  },
  topHome: {
    backgroundColor: "#ffd300",
    alignItems: "center"
  },
  boxFilters: {
    flexDirection:"row",
    marginHorizontal: 15
  },
  inputSearch: {
    backgroundColor: "#fff",
    height: 50,
    flex: 1,
    margin: 5,
    
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});