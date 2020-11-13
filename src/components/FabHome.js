import * as React from 'react';
import { FAB, Portal, Provider, useTheme } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';


const FabHome = () => {
  const [state, setState] = React.useState({ open: false });
  const { colors } = useTheme();
  const navigation = useNavigation();  

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
            ]}
            onStateChange={onStateChange}
          />
        </Portal>
      </Provider>
    );
  };
  
  export default FabHome;