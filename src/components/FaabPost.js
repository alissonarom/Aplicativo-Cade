import * as React from 'react';
import { FAB, Portal, Provider, useTheme } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';


const FabPost = () => {
  const { colors } = useTheme();
  const navigation = useNavigation(); 

  return (
      <Provider>
        <Portal>
          <FAB
            color={colors.text}
            style={{
              position: 'absolute',
              margin: 16,
              right: 0,
              bottom: 0,
              backgroundColor: colors.primary
            }}
            onPress={() => navigation.navigate('Post', {
              autor: infos.empresa
            })}
            icon='plus'
          />
        </Portal>
      </Provider>
    );
  };  
  export default FabPost;