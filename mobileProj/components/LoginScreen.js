import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, firestore } from '../firebase'; // firebase.js'den auth import edildi

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
     const userCredential =  await auth.signInWithEmailAndPassword(email, password);
     const uid = userCredential.user.uid;
     
     // Debugging: Check UID
     console.log('User UID:', uid);

     // Fetch the user's data from Firestore
     const userQuery = await firestore
       .collection('users')
       .where('userId', '==', uid)
       .get(); // Note: Use .get() to fetch the query result
 
     // Check if the user exists in Firestore
     if (userQuery.empty) {
       alert('User document does not exist in Firestore!');
       return;
     }
 
     // Extract user data (assuming a single document for the UID)
     const userDoc = userQuery.docs[0]; // Get the first document
     const userData = userDoc.data();
 
     // Debugging: Check fetched user data
     console.log('Fetched User Data:', userData);
 
     // Get the role from user data
     const role = userData.role;

     if (role === 'admin') {
      alert(`User logged in with role: Admin`);
       navigation.navigate('AdminStack');
     } else if (role === 'user') {
     alert(`User logged in with role: User`);

       navigation.navigate('UserStack');
     } else {
       alert('Role not recognized!');
     }   
     // Display success message
  // Debugging: Log the fetched data
      navigation.navigate('ToDo');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#4caf50',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    link: {
      color: '#1e90ff',
      marginTop: 20,
      fontSize: 16,
    },
  });