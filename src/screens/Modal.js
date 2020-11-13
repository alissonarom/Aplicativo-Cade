
import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar,  } from 'react-native';
import { Header, Icon, Button, Avatar } from 'react-native-elements';
//import 'firebase/firestore';

export default function Modal({ route, navigation }) {
  const { empresa, bairro, cidade, avatar, estado, detalhes} = route.params;
  const [postServices, setPostServices] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={"#ffe700"}/>
      <Header
        containerStyle={{
          backgroundColor: '#ffe700',
          borderBottomWidth: 0
        }}
        leftComponent={<Button
          type= "clear"
          icon={{
            name: "arrow-back",
            size: 25,
            color: "black",
            
          }}
          onPress={() => navigation.goBack()}
        />}
        centerComponent={{ text: 'Detalhes do Prestador', style: { color: 'black', fontSize: 20}}}
      />
      <View style={{backgroundColor: "#ffe700", width: "100%", alignItems:"center"}}>
        <Avatar 
          containerStyle={{
          top: 30 
          }}
          rounded
          source={{ uri: avatar }} 
          size="xlarge"
          backgroundColor="#C8C8C8"
        />
      </View>
      <Text style={{ fontSize: 30, marginTop: 30 }}>{empresa}</Text>
      <View style={{flexDirection: "row", paddingBottom: 10}}>
        <Icon
          name='location-on'
          type='material'
          color='#C8C8C8'
          size= {20}
        />
        <Text style={{color: "#9e9e9e"}}>{bairro}{' - '}{cidade}{' - '}{estado}</Text>
      </View>
      <View style={styles.cardPerfil}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Icon
              name="domain"
              size={25}
              color="black"
            />
          <Text style={styles.titleDetalhes}>Serviços Oferecidos</Text>
        </View>
        <Text style={{color: "#6d6d6d", textAlign: "left", fontSize: 17, marginLeft: 35}}>{detalhes}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center'
  },
  cardPerfil: {
    alignItems: "flex-start",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 3,
    width: "95%",
    padding: 20
  },
  titleDetalhes:{
    fontWeight: "bold",
    marginStart: 10
  },

});
 