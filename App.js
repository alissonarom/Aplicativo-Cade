import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Post from "./src/screens/Post";
import Register from "./src/screens/Register";
import Modal from "./src/screens/Modal";
import theme from "./src/customs/themes";
import MenuPerfil from './src/components/MenuPerfil';
import EditNome from './src/screens/EditNome';
import EditCategoria from './src/screens/EditCategoria';
import JumperRegister from './src/screens/jumperRegister';
import RegisterUser from './src/screens/RegisterUser';
import EditEndereco from './src/screens/EditEndereco';

const Stack = createStackNavigator();


export default function App() {
      return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator mode="card">
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{headerStyle: { backgroundColor: '#ffd300'}, title: 'Inserir Post'}}
            name="Post"
            component={Post}
          />
          <Stack.Screen
            options={{headerStyle: { backgroundColor: '#ffd300'}, title: 'Detalhes do prestador'}}
            name="Modal"
            component={Modal}
          />
          <Stack.Screen
            options={{headerStyle: { backgroundColor: '#ffd300'}, headerRight: () => <MenuPerfil/>, title: 'Perfil'}}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
           />
          <Stack.Screen
            options={{headerStyle: { backgroundColor: '#ffd300'}, title: 'Cadastre seu negócio'}}
            name="Register"
            component={Register}
          />
          <Stack.Screen
            options={{headerStyle: { backgroundColor: '#ffd300'}, title: 'Editar nome'}}
            name="EditNome"
            component={EditNome}
          />
          <Stack.Screen
            options={{headerStyle: { backgroundColor: '#ffd300'}, title: 'Editar ramo de atividade'}} 
            name="EditCategoria"
            component={EditCategoria}
          />
          <Stack.Screen
            options={{headerStyle: { backgroundColor: '#ffd300'}, title: 'Editar nome'}}
            name="EditEndereco"
            component={EditEndereco}
          />
          <Stack.Screen
            options={{headerShown: false}} 
            name="JumperRegister"
            component={JumperRegister}
          />
          <Stack.Screen
            options={{headerStyle: { backgroundColor: '#ffd300'}, title: 'Cadastro'}} 
            name="RegisterUser"
            component={RegisterUser}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}