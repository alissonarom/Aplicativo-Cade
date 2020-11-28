import React, { useState, useEffect } from 'react';
import { FAB, Portal, Provider, useTheme } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import * as firebase from "firebase";

const FabHome = () => {
  const [state, setState] = useState({ open: false });
  const { colors } = useTheme();
  const navigation = useNavigation(); 
  const [userOn,setUserOn] = useState(false);


  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
     if(user){
        setUserOn(true);
     } else {
       setUserOn(false)
     }
    });    
    
      }, []);

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  function singOutUser () {
    firebase.auth().signOut();
      navigation.navigate("Home");
  };

  return (
      <Provider>
        <Portal>
          {
            userOn ? (<FAB.Group
              color={colors.text}
              fabStyle={{
                backgroundColor: colors.primary
              }}
              open={open}
              icon={open ? 'close' : 'menu'}
              actions={[
                { icon: 'account', label: 'Perfil', onPress: () => navigation.navigate("Profile")},
                { icon: 'plus-circle', label: 'Sair', onPress: () => singOutUser()},
              ]}
              onStateChange={onStateChange}
            />):( <FAB
              color={colors.accent}
              style={{
                backgroundColor: colors.primary,
                position: 'absolute',
                margin: 16,
                right: 0,
                bottom: 0
              }}
              icon="account"
              label="Entrar"
              onPress={ () => navigation.navigate("Login")}
            />
          )
          }
          
        </Portal>
      </Provider>
    );
  };
  
  export default FabHome;