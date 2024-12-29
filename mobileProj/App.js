import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import ToDoScreen from './components/ToDoScreen';
import DataScreen from './components/dataPage';
import AgeScreen from './components/AgeScreen';
import EnterDataScreen from './components/EnterDataScreen';
import UserScreen from './components/UserScreen';
import AdminAddResultScreen from './components/AdminAddResultScreen';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
const Stack = createStackNavigator();
function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
          name="ToDo" 
          component={ToDoScreen} 
          options={{ headerShown: false }} 
        />        
       
          <Stack.Screen 
          name="EnterDataScreen" 
          component={EnterDataScreen} 
          options={{ headerShown: false }} 
        />      
                <Stack.Screen 
          name="Age" 
          component={AgeScreen} 
          options={{ headerShown: false }} 
        />      
        <Stack.Screen 
          name="Data" 
          component={DataScreen} 
          options={{ headerShown: false }} 
        />       
        <Stack.Screen 
          name="AddResultScreen" 
          component={AdminAddResultScreen} 
          options={{ headerShown: false }} 
        />       

    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator>
        
        <Stack.Screen 
          name="UserScreen" 
          component={UserScreen} 
          options={{ headerShown: false }} 
        />       
    </Stack.Navigator>
  );
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
      {/* Placeholder stacks */}
      <Stack.Screen name="AdminStack" component={AdminStack} options={{ headerShown: false }} />
        <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
