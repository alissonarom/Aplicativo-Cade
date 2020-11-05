import * as React from 'react';
import { FAB, Portal, Provider, useTheme } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import * as firebase from "firebase";


const Faab = () => {
  const [state, setState] = React.useState({ open: false });
  const { colors } = useTheme();
  const navigation = useNavigation();

function singOutUser () {
  firebase.auth().signOut();
    navigation.navigate("Login");
} 
  

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
      <Provider>
        <Portal>
          <FAB.Group
            color={colors.text}
            fabStyle={{
              backgroundColor: colors.primary
            }}
            open={open}
            icon={open ? 'close' : 'menu'}
            actions={[
              { icon: 'account', label: 'Perfil', onPress: () => navigation.navigate("Profile")},
              { icon: 'plus-circle', label: 'Postar', onPress: () => navigation.navigate("Post") },
              { icon: 'account-off', label: 'Sair', onPress: () => {singOutUser()} },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </Provider>
    );
  };
  
  export default Faab;