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


class Fire {
 constructor() {
   if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
     
   }
   console.ignoredYellowBox = true;
  }

  addPost = async ({ text, localUri}) => {
    const remoteUri =  await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`)
      return new Promise((res, rej) => {
          this.firestore
            .collection("posts")
            .add({
                  text,
                  uid: this.uid,
                  timestamp: this.timestamp,
                  image: remoteUri
                  
                  
          })
          .then(ref => {
            res(ref)
          })
          .catch((error) => {
            rej(error);
          });
    });
  };

//  addPost = async ({ text, localUri }) => {
//    this.uploadPhotoAsync(localUri)
//      .then((uri) => {
//        new Promise(async (res, rej) => {
//         
//          const response = await firebase
//            .firestore()
//            .collection("posts")
//            .doc(this.uid)
//            ({
//                  text,
//                  uid: this.uid,
//                  timestamp: new Date().getTime(),
//                  image: uri,
//                  userName: this.userName
//              });
//          console.log("resposta do addPost(): ", response);
//          return res(response);
//        });
//      })
//      .catch((err) => {
//        rej(err);
//        console.log("erro : ", err);
//      });
//  };
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

  
//  sendMessage = (messages) => {
//    messages.forEach((item) => {
//      const message = {
//        text: item.text,
//        timestamp: this.timestamp,
//        user: item.user,
//      };
//
//      this.db.push(message);
//    });
//  };
//
//  parse = (message) => {
//    const { user, text, timestamp } = message.val();
//    const { key: _id } = message;
//    const createdAt = new Date(timestamp);
//
//    return {
//      _id,
//      createdAt,
//      text,
//      user,
//    };
//  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get singOut() {
    return firebase.auth().signOut();
  }

  get firestore() {
    return firebase.firestore();
  }

  get userInfos() {
    return firebase.firestore().collection("users").doc(this.uid);
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