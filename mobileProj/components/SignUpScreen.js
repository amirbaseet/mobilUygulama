import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, firestore } from '../firebase'; // firebase.js'den auth import edildi
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SignUpScreen({ navigation }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // Add this state
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the picker
    if (selectedDate) {
      setDateOfBirth(selectedDate); // Set the selected date
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
     const userCredential =  await auth.createUserWithEmailAndPassword(email, password);
     alert('Account created successfully!');
         // Save user role and email in Firestore
             // Format date of birth to 'yy-mm-dd'
    const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0].substring(2);


         const NewUser ={
          userId: userCredential.user.uid,
          email:email,
          role: 'user',
          dateOfBirth: formattedDateOfBirth, 
         }
        //  console.log(NewUser);
         await firestore.collection('users').add(NewUser);
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="eposta adresinizi giriniz"
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
       <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{dateOfBirth.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
  