import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import ToDoScreen from './components/ToDoScreen';
import { setupDatabase } from './src/database/setup';
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    setupDatabase();
  }, []);
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
