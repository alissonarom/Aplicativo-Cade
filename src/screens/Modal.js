
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Header, Icon, Button, Avatar } from 'react-native-elements';


export default function Modal({ route, navigation }) {
  const { name, bairro, cidade, avatar} = route.params;
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
        centerComponent={{ text: 'Detalhes do Perfil', style: { color: 'black', fontSize: 20}}}
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
      <Text style={{ fontSize: 30, marginTop: 30 }}>{name}</Text>
      <View style={{flexDirection: "row", paddingTop: 10}}>
        <Icon
          name='location-on'
          type='material'
          color='#C8C8C8'
        />
        <Text style={{color: "#9e9e9e"}}>{bairro}{' - '}{cidade}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center'
  },

});
 