import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import ToDoScreen from './components/ToDoScreen';
import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();

// 📂 Veritabanını asenkron şekilde aç
let db;

async function openDatabase() {
  db = await SQLite.openDatabaseAsync('example.db');
}

export default function App() {
  

  


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ToDo" 
          component={ToDoScreen} 
          options={{ headerShown: false }} 
        />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
