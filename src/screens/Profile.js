import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Fire from '../config/Fire';
import { Ionicons } from "@expo/vector-icons";


export default class Profile extends React.Component {
  state = {
    user: {}
  }

  unsubscribe = null;

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid
    
    this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(doc => {
        this.setState({user: doc.data() });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

    render () {
      return (
        <View style={styles.container}>
          <View style={{ marginTop: 64, alignItems: "center", }}>
            <View style={styles.avatarContainer}>
              <Image 
                style={styles.avatar}
                source={
                  this.state.user.avatar
                    ? { uri: this.state.user.avatar }
                    : <Ionicons name="ios-add" size={40} style={styles.iconAvatar} />
                  }
              /> 
            </View>
            <Text style={styles.name}>{this.state.user.name}</Text>
          </View> 
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 60,
    },
    name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600"
    }
  });