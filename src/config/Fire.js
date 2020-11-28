import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import "firebase/auth";

const firebaseConfig  = {
  apiKey: "AIzaSyAriVRKItA4FUI1--bnwfWRV6i6yGmYIDM",
  authDomain: "cade-22fb5.firebaseapp.com",
  databaseURL: "https://cade-22fb5.firebaseio.com",
  projectId: "cade-22fb5",
  storageBucket: "cade-22fb5.appspot.com",
  messagingSenderId: "812991704086",
  appId: "1:812991704086:web:7f0d808114cbfb63c29937",
  measurementId: "G-0BG86C62KT"
};
//firebase.analytics();

import { useNavigation } from "@react-navigation/native";
import {Alert} from "react-native";

class Fire{

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
   }

  addPost = async ({ text, localUri, description, autor}) => {    
    const remoteUri =  await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}.jpg`)
          return new Promise((res, rej) => {
          this.firestore
            .collection("posts/" + this.uid + "/userPosts")
            .add({
                  text,
                  uid: this.uid,
                  timestamp: this.timestamp,
                  image: remoteUri,
                  description,
                  autor
          })
          .then(ref => {
            res(ref);
          })
          .catch((error) => {
            rej(error);
          });
    });
  };

  uploadPhotoAsync = async (uri, filename) => {  
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase
        .storage()
        .ref(filename)
        .put(file);

        upload.on(
          "state_changed",
          snapshot => {},
          err => {
            rej(err);
          },
          async () => {
            const url = await upload.snapshot.ref.getDownloadURL();
            res(url);
          }
        );
    });
  };

updateUserEndereco = async ({infoCep}) => {
  try {
    let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        bairro:infoCep.neighborhood,
        cep: infoCep.cep,
        cidade: infoCep.city,
        estado: infoCep.state,
        rua: infoCep.street,
    }, {merge: true});
  } catch (error) {
    Alert.alert("Categoria atualizada com sucesso!");
    }
};

updateUserCategoria = async ({categoria}) => {
  try {
    let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        categoria: categoria
    }, {merge: true});
  } catch (error) {
    Alert.alert("Categoria atualizada com sucesso!");
    }
};

updateUserName = async ({nome}) => {
  try {
    let db = this.firestore.collection("users").doc(this.uid);

      db.set({
      nome: nome
    }, {merge: true});
  } catch (error) {
    Alert.alert("Nome atualizado com sucesso!");
    }
};

createUser = async ({nome, email, password, avatar, detalhes, cnpjcpf, infoCep, categoria }) => {
  let remoteUri = null

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  
    let db = this.firestore.collection("users").doc(this.uid);

    db.set({
      nome: nome,
      email: email,
      avatar: avatar,
      detalhes: detalhes,
      cnpjcpf: cnpjcpf,
      bairro:infoCep.neighborhood,
      cep: infoCep.cep,
      cidade: infoCep.city,
      estado: infoCep.state,
      rua: infoCep.street,
      categoria: categoria,
      avaliação: 0,
      chave: true,
      
    });

    if (avatar) {
        remoteUri =  this.uploadPhotoAsync(avatar, `avatars/${this.uid}`);

        db.set({avatar: remoteUri}, {merge: true});
    }
    
  } catch (error) {
    Alert.alert("Estamos carregando suas informações");
    }
};

createMembro = async ({nome, email, password, avatar, infoCep}) => {
  let remoteUri = null

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  
    let db = this.firestore.collection("users").doc(this.uid);
    
    db.set({
      nome: nome,
      email: email,
      avatar: avatar,
      bairro:infoCep.neighborhood,
      cep: infoCep.cep,
      cidade: infoCep.city,
      estado: infoCep.state,
      rua: infoCep.street,
      uid: this.uid
    });

    if (avatar) {
        remoteUri =  this.uploadPhotoAsync(avatar, `avatars/${this.uid}`);

        db.set({avatar: remoteUri}, {merge: true});
    }
    
  } catch (error) {
    Alert.alert("Beleza deu certo!");
    }
};


  signOutUser () {
    const navigation = useNavigation();
    this.signOut
    navigation.navigate('Login');
  };

  get signOut() {
    return firebase.auth().signOut();
  }

  get firestore() {
    return firebase.firestore();
  }
  

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get userInfos() {
    return firebase.firestore().collection("users").doc(this.uid);
  }

  get userRef(){
  return firebase.firestore().collection("users");
}
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;