import * as firebase from "firebase";
const firebaseConfig  = {
  apiKey: "AIzaSyBL3bmg94GhzXKmDYO1cVXql7veeitMd1E",
  authDomain: "cade-4b71d.firebaseapp.com",
  databaseURL: "https://cade-4b71d.firebaseio.com",
  projectId: "cade-4b71d",
  storageBucket: "cade-4b71d.appspot.com",
  messagingSenderId: "191813841026",
  appId: "1:191813841026:web:49c9829d5f2c6035a3849b"
};
import 'firebase/firestore';
import 'firebase/storage';
import "firebase/auth";

class Fire{
 constructor() {
   if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
   }
  }

  addPost = async ({ text, localUri, avatar, autor}) => {
    const remoteUri =  await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`)
          return new Promise((res, rej) => {
          this.firestore
            .collection("posts")
            .add({
                  text,
                  uid: this.uid,
                  timestamp: this.timestamp,
                  image: remoteUri,
                  avatar,
                  autor

          })
          .then(ref => {
            res(ref)
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

  createUser = async user => {
    let remoteUri = null

    try {
      await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        name: user.name,
        email: user.email,
        avatar: user.avatar
      });

      if (user.avatar) {
          remoteUri =  this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);

          db.set({avatar: remoteUri}, {merge: true});
      }
    } catch (error) {
        alert("Erro: ", error);
      }
  };

  get singOut() {
    return firebase.auth().signOut();
  }

  get firestore() {
    return firebase.firestore();
  }

  get userInfos() {
    return firebase.firestore().collection("users").doc(this.uid) ;
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;