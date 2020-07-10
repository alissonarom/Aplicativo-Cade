import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Post from "./src/screens/Post";
import Register from "./src/screens/Register";
import Loading from "./src/screens/Loading"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#161F3D",
        inactiveTintColor: "#B8BBc4",
        showLabel: false,
        style: {
          height: 45
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="pluscircleo"
              color="#ffd300"
              size={36}
              style={{
                shadowColor: "#E9446A",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 10,
                shadowOpacity: 0.3,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="login">
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name="loading" component={Loading} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AppTab" component={AppTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
