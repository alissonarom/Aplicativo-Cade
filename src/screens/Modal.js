
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, LayoutAnimation, FlatList } from 'react-native';
import { useTheme, IconButton, Avatar, Button, Card, Paragraph, Dialog, Portal, TextInput} from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { Rating } from 'react-native-ratings';
import * as firebase from "firebase";
import moment from 'moment';
import 'moment/locale/pt-br';
moment().format();

export default function Modal({ route }) {
  const {nome, bairro, cidade, avatar, estado, detalhes, uid, categoria, avaliação} = route.params;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [textAvaliação, setTextAvaliação] = useState("");
  const [contRate, setCountRate] = useState("");

const RatingsForm = () => {
  
  return (
    <View>
      <Rating
        type='star'
        ratingColor={colors.primary}
        defaultRating={1}
        imageSize={40}
        onFinishRating={setCountRate}
        style={{ paddingVertical: 10 }}
        count={contRate}
      />
    </View>
  )
}

const Ratings = () => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title >Avaliação do prestador</Dialog.Title>
          <Dialog.Content>
            <RatingsForm/>
            <TextInput
                label="Resenha..."
                value={textAvaliação}
                onChangeText={setTextAvaliação}
              />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={hideDialog} color={"green"}>Concluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

  useEffect(() => {
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
            subtitle={(bairro)+(" - ")+(cidade)}
            left={(props) => <Avatar.Image {...props} source={{uri: avatar}} style={{marginTop: 20}}/>}
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
                  {avaliação}
                </Text>
            <IconButton
              icon="comment-text-multiple"
              color={colors.cinzaMedio}
              size={25}
            />
                <Text style={{ color: colors.cinzaMedio, fontSize: 18}}>
                  {avaliação}
                </Text>
          </Card.Actions>
        </Card> 
    );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.primary}/>
      <ScrollView>
      <View style={{backgroundColor: colors.primary, width: "100%", flexDirection: "row", marginBottom: 10}}>
        <Avatar.Image
          size={120}
          source={{uri: avatar}}
          style={{backgroundColor:colors.cinzaMedio, marginHorizontal: 40, marginVertical: 5}}
        />
        <View>
        <View 
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin:10
            }}
          >
            <Text>{contRate}</Text>
            <IconButton
            icon="star"
            color={colors.accent}
            size={30}
            />
        </View>
        <Ratings/>
        <Button mode="outlined" onPress={showDialog} color={colors.preto}>
          AVALIE
        </Button>
        </View>
        
      </View>
      <View style={styles.cardPerfil}>
      <Text style={{ fontSize: 30, color: colors.cinzaEscuro }}>{nome}</Text>
      <Text style={{ fontSize: 12, color: colors.primary }}>{categoria}</Text>
      <View style={{flexDirection: "row", alignItems:"center"}}>
        <IconButton
          icon="map-marker-outline"
          size={17}
          color={colors.cinzaMedio}
        />
        <Text style={{color:colors.cinzaMedio}}>{bairro}{' - '}{cidade}{' - '}{estado}</Text>
      </View>
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
      <Text style={{margin: 10, marginHorizontal: 20, fontSize: 15, alignSelf: "flex-start"}}>Sobre</Text>
      <View style={styles.cardPerfil}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Text style={{color: colors.cinzaMedio, textAlign: "left", fontSize: 16}}>{detalhes}</Text>
        </View>
      </View>
      <Text style={{margin: 10, marginHorizontal: 20, fontSize: 15, alignSelf: "flex-start"}}>Publicações</Text>
      <View>
            <FlatList
              data={posts}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
              showsVerticalScrollIndicator={false}
            />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  cardPerfil: {
    alignItems: "center",
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